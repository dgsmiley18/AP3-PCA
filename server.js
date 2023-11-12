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

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  conn.execute(query, [email, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro no servidor' });
      return;
    }

    if (row) {
      console.log('Login bem-sucedido!');
      res.json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

app.listen(3000, () => {
  console.log(`Servidor iniciado em http://localhost:3000`);
});
