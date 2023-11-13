const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Criando a conexão usando a URL do banco de dados do ambiente
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Adicionando um tratamento de erro para a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Rota /login acionada');

  try {
    const [row] = await executeQuery(connection, 'SELECT * FROM Usuarios WHERE email = ? AND senha = ?', [email, password]);

    if (row) {
      console.log('Login bem-sucedido!');
      res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
      console.log('Login mal-sucedido. Credenciais inválidas.');
      res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro na rota /login:', error.message);
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
});

async function executeQuery(connection, query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

app.listen(3000, () => {
  console.log(`Servidor iniciado em http://localhost:3000`);
});
