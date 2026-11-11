import React, { useEffect, useState } from 'react';
import './index.css';

import { useNavigate } from 'react-router-dom';

import api from '../../../backend/controler/api_login';
import api_google from "../../../backend/controler/api_loginGoogle";

import { setVariavelGlobal } from '../../../GvarAuth';

import Load from '../../../components/loading/loading.jsx';
import certo from '../../../imgs/marcado.png';
import errado from '../../../imgs/xis.jpeg';

import ver from '../../../imgs/visualizar.png';
import desver from '../../../imgs/desvisualizar.png';

export default function Login() {
  const [visualizar, setVisualizar] = useState(false);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [respondido, setRespondido] = useState(false);
  const [certo_erro, setCerto_erro] = useState('');

  async function handleCallbackResponse(response) {
    var userOBJ = response.credential;

    setLoad(true);

    const resposta = await api_google.enviar(userOBJ);
    setRespondido(true);
    if (resposta.ok) {

      setCerto_erro('certo');
      sessionStorage.setItem('session', resposta.informacoes);
      setVariavelGlobal(false);;
      setTimeout(() => {
        setRespondido(false);
        setLoad(false);
        setCerto_erro('');
        navigate('/IHM/perfil');
      }
        , 1000)

    } else {
      setCerto_erro('erro');
      setErro(resposta.informacoes);
    }

    setTimeout(() => {
      setRespondido(false);
      setLoad(false);
      setCerto_erro('');
    }
      , 980);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "592499016939-fat3h1m0beidscm4qfsnafamh4rj94of.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        type: "icon",
        shape: "circle",
        theme: "outline",
        text: "signin_with",
        size: "large"
      }
    )
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoad(true);

    //? prepara os valores para enviar a api
    const email = event.target.email.value;
    const senha = event.target.senha.value;

    const resposta = await api.enviar(email, senha);
    setRespondido(true);
    if (resposta.ok) {

      setCerto_erro('certo');
      sessionStorage.setItem('session', resposta.informacoes);
      setVariavelGlobal(false);;
      setTimeout(() => {
        setRespondido(false);
        setLoad(false);
        setCerto_erro('');
        navigate('/IHM/perfil');
      }
        , 1000)

    } else {
      setCerto_erro('erro');
      setErro(resposta.informacoes);
    }

    setTimeout(() => {
      setRespondido(false);
      setLoad(false);
      setCerto_erro('');
    }
      , 980);
  };

  //TODO abre a janela de cadastro caso click
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <p className='err'>{erro}</p>

        <label htmlFor="email">E-MAIL</label>
        <input className="form_pass" id='email' type="email" name="email" placeholder="Digite aqui..." />

        <label htmlFor="senha">SENHA</label>
        <span className='pan'><input className="form_pass" id='senha' type={visualizar? 'text' : 'password'} name="senha" placeholder="Digite aqui..." /><img src={visualizar? desver : ver} onClick={()=>{setVisualizar(!visualizar)}} className='visualizando'/></span>

        <span className='contain-butt'>
          <input className="form_button" type="submit" value="ENTRAR" />
          <div id='signInDiv' className="form_button gog">
          </div>
        </span>

      </form>

      {load ? <div className={`fundoAWAIT ${certo_erro == 'erro' ? 'err' : null}`}>
        <Load virar={respondido} />
        <img src={certo} className={`certinho ${certo_erro == 'certo' ? 'vire' : null}`} />
        <img src={errado} className={`erradinho ${certo_erro == 'erro' ? 'vire' : null}`} />

        {certo_erro == 'certo' ? <p className='msgC'>BEM VINDO</p> : null}
      </div> : null}

    </>
  );
}