import mysql from "mysql2/promise"
import cors from "cors"
import express from "express"
import fs from "fs"

const app = express();
const PORT = 80;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"password",
    database: "SO2"
})

pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database with threadId: ' + connection.threadId);
    connection.release(); // release connection
  })
  .catch(err => {
    console.error('Database connection failed: ' + err.stack);
    process.exit(1); // exit with failure
  });

// Routes
// Create a sala
app.post('/salas', async (req, res) => {
    try {
        const { salaNome, salaLocal, salaDataUso, salaHoraInicio, salaHoraFinal, salaResponsavel, salaMotivo, salaInfo, salaConvidados } = req.body;
        const caminhoImagem = req.file ? '/uploads/' + req.file.filename : ''; // Store path to uploaded image
        const query = 'INSERT INTO Salas (salaNome, caminhoImagem, salaLocal, salaDataUso, salaHoraInicio, salaHoraFinal, salaResponsavel, salaMotivo, salaInfo, salaConvidados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [salaNome, caminhoImagem, salaLocal, salaDataUso, salaHoraInicio, salaHoraFinal, salaResponsavel, salaMotivo, salaInfo, JSON.stringify(salaConvidados)];
        const result = await pool.query(query, values);
        res.status(201).json({ salaID: result.insertId, message: 'Sala created successfully' });
      } catch (error) {
        console.error('Error creating sala: ' + error.message);
        res.status(500).json({ error: 'Error creating sala' });
      }
});

// Read all salas
app.get('/salas', async (req, res) => {
  try {
    const query = 'SELECT * FROM Salas';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching salas: ' + error.message);
    res.status(500).json({ error: 'Error fetching salas' });
  }
});

// Read a single sala by ID
app.get('/salas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM Salas WHERE salaID = ?';
    const [rows] = await pool.query(query, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Sala not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching sala: ' + error.message);
    res.status(500).json({ error: 'Error fetching sala' });
  }
});

// Update a sala by ID
app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { salaNome, salaLocal, salaDataUso, salaHoraInicio, salaHoraFinal, salaResponsavel, salaMotivo, salaInfo, salaConvidados } = req.body;
        const caminhoImagem = req.file ? '/uploads/' + req.file.filename : ''; // Update path to uploaded image if provided
        const query = 'UPDATE Salas SET salaNome = ?, caminhoImagem = ?, salaLocal = ?, salaDataUso = ?, salaHoraInicio = ?, salaHoraFinal = ?, salaResponsavel = ?, salaMotivo = ?, salaInfo = ?, salaConvidados = ? WHERE salaID = ?';
        const values = [salaNome, caminhoImagem, salaLocal, salaDataUso, salaHoraInicio, salaHoraFinal, salaResponsavel, salaMotivo, salaInfo, JSON.stringify(salaConvidados), id];
        await pool.query(query, values);
        res.json({ salaID: id, message: 'Sala updated successfully' });
      } catch (error) {
        console.error('Error updating sala: ' + error.message);
        res.status(500).json({ error: 'Error updating sala' });
      }
});

// Delete a sala by ID
app.delete('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fetch the sala to get the image path
        const selectQuery = 'SELECT caminhoImagem FROM Salas WHERE salaID = ?';
        const [rows] = await pool.query(selectQuery, [id]);
    
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Sala not found' });
        }
    
        const caminhoImagem = rows[0].caminhoImagem;
    
        // Delete image file from server
        if (caminhoImagem) {
          const imagePath = __dirname + caminhoImagem; // Assuming caminhoImagem is the full path to the image
          fs.unlinkSync(imagePath); // Delete the image file synchronously
        }
    
        // Delete sala record from database
        const deleteQuery = 'DELETE FROM Salas WHERE salaID = ?';
        await pool.query(deleteQuery, [id]);
    
        res.json({ salaID: id, message: 'Sala deleted successfully' });
      } catch (error) {
        console.error('Error deleting sala: ' + error.message);
        res.status(500).json({ error: 'Error deleting sala' });
      }
});

app.get('/login/:usuarioLogin/:usuarioSenha', async (req, res) => {
    try {
        const { usuarioLogin, usuarioSenha } = req.params; // Retrieve credentials from URL parameters
    
        const query = 'SELECT * FROM Usuario WHERE usuarioLogin = ? AND usuarioSenha = ?';
        const [rows] = await pool.query(query, [usuarioLogin, usuarioSenha]);
    
        if (rows.length === 1) {
          const user = rows[0];
          res.json({
            message: 'Login successful'
          });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error verifying user: ' + error.message);
        res.status(500).json({ error: 'Error verifying user' });
      }
    });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
