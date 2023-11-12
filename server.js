const express = require('express');
const cors = require('cors');
const { connect } = require('@planetscale/database');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const conn = connect(config);

app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const row = await executeQuery(conn, 'SELECT * FROM Usuarios WHERE email = ? AND senha = ?', [email, password]);

    if (row) {
      console.log('Login bem-sucedido!');
      res.json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

async function executeQuery(connection, query, values) {
  return new Promise((resolve, reject) => {
    connection.execute(query, values, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

app.listen(3000, () => {
  console.log(`Servidor iniciado em http://localhost:3000`);
});
