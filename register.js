import 'dotenv/config'
import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

const conn = connect(config)

document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Verificar se o usuário já existe
    const checkUserQuery = 'SELECT * FROM Usuarios WHERE email = ?';

    conn.execute(checkUserQuery, [email], (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (row) {
            alert("Este email já existe. Por favor faça o login.");
        } else {
            // Inserir novo usuário no banco de dados
            const insertUserQuery = 'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)';

            conn.execute(insertUserQuery, [username, email, password], (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Usuário registrado com sucesso!');
                    alert("Registro bem-sucedido! Faça login com suas novas credenciais.");
                    // Redirecionar para a página de login
                    window.location.href = "login.html";
                }
            });
        }
    });
});