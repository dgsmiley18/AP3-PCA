const sqlite3 = require('sqlite3').verbose();
const dbPath = 'website.db'; // nome do arquivo do banco de dados

// Criar uma instância do banco de dados SQLite
const db = new sqlite3.Database(dbPath);

// Criar uma tabela chamada "usuarios" com colunas "id", "nome" e "email"
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, nome TEXT, email TEXT)');

  // Inserir dados de exemplo na tabela
  const stmt = db.prepare('INSERT INTO usuarios (nome, email) VALUES (?, ?)');
  stmt.run('João', 'joao@example.com');
  stmt.run('Maria', 'maria@example.com');
  stmt.finalize();

  // Consultar e exibir os dados da tabela
  db.each('SELECT id, nome, email FROM usuarios', (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${row.id}: ${row.nome} - ${row.email}`);
    }
  });
});

// Fechar a conexão com o banco de dados ao final
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conexão com o banco de dados fechada.');
  }
});
