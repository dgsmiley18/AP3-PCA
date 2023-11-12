document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Login bem-sucedido!");
        // Redirecionar para a página index.html após o login
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error('Erro:', error);
        alert("Credenciais inválidas. Tente novamente ou registre-se.");
      });
});
