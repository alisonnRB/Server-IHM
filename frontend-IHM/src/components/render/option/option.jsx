import React from 'react';
import './option.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import sol from '../../../imgs/sol.png';
import solD from '../../../imgs/sol-dark.png';

import lua from '../../../imgs/lua.png';
import luaD from '../../../imgs/lua-dark.png';

import api from "../../../backend/controler/api_newSenha";
import verify from "../../../backend/controler/api_verificaTipo.js";


import Warning from './warning/warning.jsx';
import WarningG from './warningG/warning.jsx';
import words from './option.json';

//? componente que comporta as opções

export default function Option() {
  const navigate = useNavigate();
  const [typeA, setTypeA] = useState('');

  const [tema, setTema] = useState('light');
  const [idioma, setIdioma] = useState("en");


  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [message, setMessage] = useState('');

  const [pronto, setPronto] = useState(false);

  const [abreWindow, setAbreWindow] = useState(false);

  const [Uword, setUword] = useState("en");

  useEffect(() => {
    select_idioma();
    verify_tipoConta();
  }, [])

  const select_idioma = () => {
    let idi = localStorage.getItem('idioma');
    if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
      idi = "en";
    }
    let word = words[idi];
    setUword(word);
  }

  useEffect(() => {
    qual_tema();
    qual_idioma();
  }, [])

  useEffect(() => {
    if (senhaNova === senhaConfirma && senhaNova != '' && senhaConfirma != '' && senhaAntiga != '') {
      setPronto(true);
    } else {
      setPronto(false);
    }
  }, [senhaNova, senhaConfirma, senhaAntiga]);

  const qual_tema = () => {
    let themes = localStorage.getItem('tema');
    if (themes) {
      setTema(themes);
    }
  }

  const qual_idioma = () => {
    let idioma = localStorage.getItem('idioma');
    if (idioma) {
      setIdioma(idioma);
    }
  }

  const change_idioma = (e) => {
    let idi = e.target.value;
    if (idi !== '' && idi != idioma) {
      localStorage.setItem('idioma', idi);
      window.location.reload();
    }
  }

  const Troca_senha = async (e) => {
    e.preventDefault();
    const resposta = await api.enviar(senhaAntiga, senhaNova, typeA);
    if (resposta.ok) {
      setMessage(resposta.informacoes);
      setSenhaAntiga('');
      setSenhaNova('');
      setSenhaConfirma('');
      setPronto(false);
    } else {
      setMessage(resposta.informacoes);
    }
  }

  const verify_tipoConta = async () => {
    const resposta = await verify.enviar();
    if (resposta.ok) {
      setTypeA(resposta.informacoes);
    }
  }

  return (
    <div className='option'>
      <span id='titlePerfil' className={`${tema == 'light' ? null : 'dark'}`}>{Uword.title}</span>

      <div className='comport'>

        <div className="com">
          <label htmlFor="idioma">{Uword.idioma}</label>
          <select value={idioma} onChange={(e) => { change_idioma(e) }} name="idioma" id="idioma">
            <option value="pt" className="idi">{Uword.PT}</option>
            <option value="en" className="idi">{Uword.EN}</option>
            <option value="es" className="idi">{Uword.ES}</option>
          </select>
        </div>

        <div className="com">
          <label htmlFor="tema">{Uword.tema}</label>
          <span id='tema'>
            <img src={tema == 'light' ? sol : solD} className="tema" onClick={() => { localStorage.setItem('tema', 'light'); window.location.reload() }} style={tema === 'light' ? tema == 'light' ? { backgroundColor: '#EBECF0' } : { backgroundColor: '#023440' } : null} />
            <img src={tema == 'light' ? lua : luaD} className="tema" onClick={() => { localStorage.setItem('tema', 'dark'); window.location.reload() }} style={tema === 'dark' ? tema == 'light' ? { backgroundColor: '#EBECF0' } : { backgroundColor: '#023440' } : null} />
          </span>
        </div>

        <div className="com">
          <label htmlFor="newSenha">{Uword.alterar}</label>
          <form id="newSenha" onSubmit={pronto ? (e) => { Troca_senha(e) } : (e) => { e.preventDefault() }}>
            <input type="password" value={senhaAntiga} onChange={(e) => { setSenhaAntiga(e.target.value) }} placeholder={Uword.atual} />
            <input type="password" value={senhaNova} onChange={(e) => { setSenhaNova(e.target.value) }} placeholder={Uword.nova} />
            <input type="password" value={senhaConfirma} onChange={(e) => { setSenhaConfirma(e.target.value) }} placeholder={Uword.confirma} />

            <span className='errorBOX' style={message == 'senha alterada' ? { color: 'green' } : null}>{message}</span>

            <button type='submit' id='newSe' style={pronto ? { cursor: 'pointer', backgroundColor: '#0B637D' } : null}>{Uword.pronto}</button>
          </form>
        </div>

        <div className="com">
          <label htmlFor="conta">{Uword.conta}</label>
          <span id='conta'>
            <button id='sair' onClick={() => { sessionStorage.clear(); navigate('/') }}>{Uword.sair}</button>
            <button id='excluir' onClick={() => { setAbreWindow(true) }}>{Uword.excluir}</button>
          </span>

          {abreWindow ? typeA == 'google' ? <WarningG setAbre={setAbreWindow} /> : <Warning setAbre={setAbreWindow} /> : null}
        </div>

      </div>
    </div>
  );
}
