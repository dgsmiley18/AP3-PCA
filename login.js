import 'dotenv/config'
import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

const conn = connect(config)

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Consulta SQL para verificar as credenciais no banco de dados
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (row) {
            console.log('Login bem-sucedido!');
            alert("Login bem-sucedido! Bem-vindo, " + username + "!");
            
            // Redirecionar para a página index.html após o login
            window.location.href = "index.html";
        } else {
            alert("Credenciais inválidas. Tente novamente ou registre-se.");
        }
    });
});
