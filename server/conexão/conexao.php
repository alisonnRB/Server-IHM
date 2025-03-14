<?php
function conecta_bd()
{
    // Configurações do PostgreSQL no Render
    $host = 'dpg-cv a3upij1k6c739eiv6g-a.oregon-postgres.render.com'; // Host do Render
    $port = '5432'; // Porta padrão do PostgreSQL
    $dbname = 'ihm_database_hj0b'; // Nome do banco de dados
    $user = 'ihm_database_hj0b_user'; // Usuário do banco
    $password = 'W0xFFuLHLvCAsDHTUmc1IvE5mu4syt0m'; // Senha do banco

    try {
        // DSN para PostgreSQL
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
        $conexao = new PDO($dsn, $user, $password);
        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Habilita exceções
        return $conexao;  // Retorna a conexão PDO
    } catch (PDOException $e) {
        // Log do erro
        error_log("Erro ao conectar ao banco de dados: " . $e->getMessage());
        return [
            "ok" => false,
            "informacoes" => "Erro ao conectar ao banco de dados: " . $e->getMessage()
        ];
    }
}
?>