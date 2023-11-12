document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Resposta do servidor não está ok.');
    }

    const data = await response.json();
    console.log(data);
    alert("Login bem-sucedido!");
    // Redirecionar para a página index.html após o login
    window.location.href = "index.html";
  } catch (error) {
    console.error('Erro:', error);
    alert("Credenciais inválidas. Tente novamente ou registre-se.");
  }
});
