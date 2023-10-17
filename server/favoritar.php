<?php
include "./conexão/conexao.php";
include "./resposta/resposta.php";
include "./valicações/validacoes.php";
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');


function comentar($body){
    $conexao = conecta_bd();
    if (!$conexao) {
        resposta(500, false, "Houve um problema ao conectar ao servidor");
    } else {
    $id = validar_number($body->id_user);
    $idref = validar_number($body->id_ref);

    if (!$id[0]) {
        resposta(400, false, $id[1]);
    }
    if (!$idref[0]) {
        resposta(400, false, $idref[1]);
    }

    if (!$conexao) {
        resposta(500, false, "Houve um problema ao conectar ao servidor");
    } else {

    $consulta = $conexao->prepare('SELECT * FROM favoritos WHERE user_id = :id_user AND id_livro = :id_ref');
    $consulta->bindParam(':id_user', $id_user);
    $consulta->bindParam(':id_ref', $id_ref);
    $consulta->execute();
    $consulta = $consulta->fetchColumn();

    if($consulta){        
        $stmt = $conexao->prepare('DELETE FROM favoritos WHERE user_id = :id_user AND id_livro = :id_ref');
        $stmt->execute([':id_user' => $body->id_user, ':id_ref' => $body->id_ref]);
    }else{
        $stm = $conexao->prepare('INSERT INTO favoritos(user_id, id_livro) VALUES (:id_user, :id_ref)');
        $stm->bindParam(':id_user', $body->id_user);
        $stm->bindParam(':id_ref', $body->id_ref);
        $stm->execute();
    }


    resposta(200, true);

}
    }
}
$body = file_get_contents('php://input');
$body = json_decode($body);

comentar($body);
?>