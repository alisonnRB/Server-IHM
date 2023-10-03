<?php
date_default_timezone_set('America/Sao_Paulo');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');

// Função que encerra as operações e envia uma resposta para a API trabalhar
function resposta($codigo, $ok, $msg, $livros) {
    http_response_code($codigo);
    header('Content-Type: application/json');

    $response = [
        'ok' => $ok,
        'msg' => $msg,
        'livros' => $livros,
    ];

    echo(json_encode($response));
    die;
}

// Recebe os inputs da API
$body = file_get_contents('php://input');
$body = json_decode($body);

function criaPesquisa($body) {
    $search = 'publico = 1';
    $params = array(); // Para armazenar os parâmetros seguros

    if (!empty($body->nome) && $body->nome != '') {
        $search .= ' AND nome LIKE :nome';
        $params[':nome'] = $body->nome . '%';
    }

    if (!empty($body->Finalizado)) {
        $search .= ' AND finalizado = :finalizado';
        $params[':finalizado'] = $body->Finalizado ? 1 : 0;
    }
    if (!empty($body->selecao)) {
        $generoSelecionado = null;
    
        foreach ($body->selecao as $index => $valor) {
            if ($valor == true) {
                $generoSelecionado = $index;
                break;
            }
        }
    
        if (!is_null($generoSelecionado)) {
            // Verifica se o índice selecionado está presente na lista de gêneros
            $search .= " AND JSON_CONTAINS(genero, :generoSelecionado)";
            $params[':generoSelecionado'] = json_encode($generoSelecionado);
        }
    }
    if (!empty($body->Novo)) {
        $search .= " AND DATEDIFF(NOW(), tempo) <= 7";
    }

    quaisLivros($search, $params);
}

function quaisLivros($search, $params){
    try {
        $conexao = new PDO("mysql:host=localhost;dbname=ihm", "root", "");

        $sql = "SELECT id, user_id, nome, imagem, genero, sinopse, classificacao FROM livro_publi WHERE $search";
        $stmt = $conexao->prepare($sql);
        $stmt->execute($params);
        $livros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        resposta(200, true, "deu certo", $livros);
    } catch (Exception $e) {
        resposta(500, false, null, null);
    }
}

criaPesquisa($body);
?>