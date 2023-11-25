<?php

include "./conexão/conexao.php";
include "./resposta/resposta.php";
include "./validações/validacoes.php";
include "./token/decode_token.php";

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');

$body = file_get_contents('php://input');
$body = json_decode($body);

$token = decode_token($body->id);
if (!$token || $token == "erro") {
    resposta(200, false, "não autorizado");
} else {
    salva_cap_pronto($token->id, $body);
}

function salva_cap_pronto($id, $body)
{
    $conexao = conecta_bd();

    if (!$conexao) {
        resposta(200, false, "Houve um problema ao conectar ao servidor");
    } else {
        $consulta = $conexao->prepare('SELECT user_id, pronto FROM livro_publi WHERE id = :id');
        $consulta->execute([':id' => $body->idLivro]);
        $linha = $consulta->fetch(PDO::FETCH_ASSOC);
        if ($linha['user_id'] != $id) {
            resposta(200, false, "você não pode alterar livros que não são seus");
        } else {
            $public = json_decode($linha['pronto'], true);

            $public[$body->cap] = $body->pronto ? 0 : 1;

            $publicJSON = json_encode($public);

            $stmt = $conexao->prepare("UPDATE livro_publi SET pronto = ? WHERE id = ?");
            $stmt->execute([$publicJSON, $body->idLivro]);

            if (!$body->pronto) {
                notifica($conexao, $body->idLivro);
            }


            resposta(200, true, "certo");
        }
    }
}

function notifica($conexao, $id)
{
    $stm = $conexao->prepare('UPDATE favoritos SET visu = 0 WHERE id_livro = ?');
    $stm->execute([$id]);
}

?>