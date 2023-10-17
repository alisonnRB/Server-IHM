<?php

include "./conexão/conexao.php";
include "./resposta/resposta.php";
include "./valicações/validacoes.php";

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');


function comentar($body){
    $conexao = conecta_bd();
    
    $id = validar_number($body->id_user);
    $id_ref = validar_number($body->id_ref);
    $tipo = validar_string($body->tipo);
    $coment = validar_number($body->coment);

    if (!$id[0]) {
        resposta(400, false, $id[1]);
    }
    if (!$tipo[0]) {
        resposta(400, false, $tipo[1]);
    }
    if (!$idref[0]) {
        resposta(400, false, $idref[1]);
    }
    if (!$coment[0]) {
        resposta(400, false, $coment[1]);
    }

    if (!$conexao) {
        resposta(500, false, "Houve um problema ao conectar ao servidor");
    } else {
    $consulta = $conexao->prepare('SELECT * FROM curtidas WHERE id_user = :id_user AND id_ref = :id_ref AND tipo = :tipo AND coment = :coment');
    $consulta->bindParam(':id_user', $id_user);
    $consulta->bindParam(':id_ref', $id_ref);
    $consulta->bindParam(':tipo', $tipo);
    $consulta->bindParam(':coment', $coment);
    $consulta->execute();
    $consulta = $consulta->fetchColumn();

    if($consulta){        
        $stmt = $conexao->prepare('DELETE FROM curtidas WHERE id_user = :id_user AND id_ref = :id_ref AND tipo = :tipo AND coment = :coment');
        $stmt->execute([':id_user' => $body->id_user, ':id_ref' => $body->id_ref, ':tipo'=> $body->tipo, ':coment' => $body->coment]);
    }else{
        $stm = $conexao->prepare('INSERT INTO curtidas(id_user, id_ref, tipo, coment) VALUES (:id_user, :id_ref, :tipo, :coment)');
        $stm->bindParam(':id_user', $body->id_user);
        $stm->bindParam(':id_ref', $body->id_ref);
        $stm->bindParam(':tipo', $body->tipo);
        $stm->bindParam(':coment', $body->coment);
        $stm->execute();
    }


    resposta(200, true, "certo");
    }
}

$body = file_get_contents('php://input');
$body = json_decode($body);
 comentar($body);
?>