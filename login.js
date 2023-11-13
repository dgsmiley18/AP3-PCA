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

    // Exibir mensagem de login concluído
    const mensagemDiv = document.createElement('div');
    mensagemDiv.innerHTML = 'Login concluído. Redirecionando...';
    document.body.appendChild(mensagemDiv);

    // Atraso de 3 segundos antes do redirecionamento
    setTimeout(() => {
      // Redirecionar para a página index.html após o login
      window.location.replace("../index.html");
    }, 3000); // 3000 milissegundos (3 segundos)

  } catch (error) {
    console.error('Erro:', error);
    alert("Credenciais inválidas. Tente novamente ou registre-se.");
  }
});