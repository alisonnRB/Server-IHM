
<?php
include "./conexão/conexao.php";
include "./resposta/resposta.php";
include "./valicações/validacoes.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: *');

// TODO função que encerra as operações e envia uma resposta para a API trabalhar
oque_alterar();

function oque_alterar(){
    $nome = false;
    $foto =  false;
    //TODO verifica se o id veio
    if (isset($_POST['id']) || !empty($_POST['id'])){
        
        //TODO verfica se há nome para alterar
        if(isset($_POST['nome']) && !empty($_POST['nome'])){
            $nome = true;
        }
        if (!empty($_FILES['image']['name']) && isset($_FILES['image']['name'])){
            $foto = true;
        }

    controla($nome, $foto);  
    }else{
        resposta(400, false, "há algo errado, tente movamente mais tarde :(");
    }
}

function controla($nome, $foto){

    $okFoto = false;
    $okNome = false;

    if($nome){
        $Nome = validar_string($_POST['nome'], "nome");
        if(!$Nome[0]){
            $okNome = true;
        }else{
            resposta(400, false, $Nome[1]);
        }
    }

    if($foto == true){
        $Img = validar_img($_FILES['image']);
        if(!$Img[0]){
            $okFoto = true;
        }else{
            resposta(400, false, $Img[1]);
        }
    }

    if($nome == false && $foto == false){
        resposta(400, false, "não quer mudar nada :/");
    }

    $conexao = conecta_bd();
    if(!$conexao[0]){
        resposta(500, false, "algo errado no server");
    }else{
        if($foto == true && $okFoto == true){

        $extensao = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $arquivoTemporario = $_FILES['image']['tmp_name'];
        $nomeUnico = $_POST['id'] . '_' . time() . '.' . $extensao;

        salvaFoto($conexao, $nomeUnico);
        }

    if($nome == true && $okNome == true){
        salvaNome($conexao, $Nome);
    }
    }
        resposta(200, true, "Dados atualizados com sucesso.");  
}

function salvaFoto($conexao, $nomeUnico){

    $destino = '../imagens/';

    //? busca o caminho da foto antiga
    $fotoPerfil = $conexao->prepare("SELECT fotoPerfil FROM usuarios WHERE id = :id");
    $fotoPerfil->execute([':id' => $_POST['id']]);
    $fotoPerfil = $fotoPerfil->fetchColumn();

    $caminhoAntigo = $destino . $fotoPerfil;

    $arquivoTemporario = $_FILES['image']['tmp_name'];


    if (file_exists($caminhoAntigo) && is_file($caminhoAntigo)) {
        unlink($caminhoAntigo);
    }

    if (move_uploaded_file($arquivoTemporario, $destino . $nomeUnico)){
        //? Arquivo antigo foi apagado com sucesso
        $stmt = $conexao->prepare('UPDATE usuarios SET fotoPerfil = ? WHERE id = ?');
        $stmt->execute([$nomeUnico, $_POST['id']]);
    }else{
        resposta(500, false, "Algo deu errado com o arquivo.");
    }
}
function salvaNome($conexao, $Nome){
    $stmt = $conexao->prepare('UPDATE usuarios SET nome = ? WHERE id = ?');
    $stmt->execute([$Nome, $_POST['id']]);
}


?>