import React, { useState } from 'react';
import './form_cadastro.css';
import api from '../../../backend/controler/api_cadastro';


//* as propriedades do elemento pai são recebidas no args props
export default function Cadastro(props) {

  const [Erro, setErro] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault(); //? previne o comportamento padrão da pagina de recarregar ao envio de form
    
    //? prepara os avlores para a api
    const nome = event.target.nome.value;
    const email = event.target.email.value;
    const senha = event.target.senha.value;
    const confSenha = event.target.confsenha.value;



    const resposta = await api.enviar(nome, email, senha, confSenha);

    if (resposta.ok) {
      const confirmacao = window.confirm('Cadastro realizado com sucesso!');
      //? caso a resposta do server seja positiva emite um alert e fecha a janela

      if (confirmacao) {

        props.fecharCadastro();
      }
    } else {
      setErro(resposta.msg);
    }
  };

  return (
    <div id="box_cadastro">
      <form onSubmit={handleSubmit}>
        <fieldset className='field_cad'>
          <span>
            <h1>Cadastre-se</h1>
            <p id="fechar" onClick={props.fecharCadastro}>X</p>
          </span>
          <div id="infos">
            <span className='Error_msg'><p>{Erro}</p></span>
            <input className="cad" type="text" name="nome" placeholder="Nome:" />
            <input className="cad" type="email" name="email" placeholder="E-mail:" />
            <input className="cad" type="password" name="senha" placeholder="Senha: " />
            <input className="cad" type="password" name="confsenha" placeholder="Confirmar Senha: " />
            <input className="cad cad_button" type="submit" value="Cadastrar" />
          </div>
        </fieldset>
      </form>
    </div>
  );
}