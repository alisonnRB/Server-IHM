import React from 'react';
import './chat.css';
import { useState, useEffect } from 'react';

import Mensagem from './mensagem/mensagem';
import Conversas from './conversas/conversas';
import BtFloat from '../../BtFloat/btFloat.jsx';

import comming from '../../../imgs/comming-soon.png';
//? comporta os componente que montam a pagina de chats

export default function Chat() {
  const [theme, setTheme] = useState('light');
  const [selecionado, setSelecionado] = useState(0);
  const [att, setAtt] = useState(false);

  const soon = false;

  useEffect(() => {
    let a = localStorage.getItem('tema');
    if (a) {
      setTheme(a);
    }
  }, [])

  return (
    <div className='chat'>
      <span id='titlePerfil' className={`${theme == 'light' ? null : 'dark'}`}>CHAT</span>
      {soon ? <div className='coming'><img src={comming} /></div> : <span className='contentMSG'>
        <Conversas setSelecionado={setSelecionado} setAtt={setAtt} att={att} />
        <Mensagem selecionado={selecionado} setAtt={setAtt} />
      </span>}

      <BtFloat />

    </div>
  );
}

