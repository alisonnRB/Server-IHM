import React, { useEffect, useState, useRef } from 'react';
import './feed.css';

import BtFloat from '../../BtFloat/btFloat.jsx';

import Seguindo from './seguindo/seguindo.jsx';
import ForYou from './fy/fy.jsx';


import words from './feed.json';

export default function Feed() {
  const [select, setSelect] = useState(true);

  const [theme, setTheme] = useState('light');
  const [Uword, setUword] = useState("en");


  useEffect(() => {
    select_idioma();
    let a = localStorage.getItem('tema');
    if (a) {
      setTheme(a);
    }
  }, []);

  const select_idioma = () => {
    let idi = localStorage.getItem('idioma');
    if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
      idi = "en";
    }
    let word = words[idi];
    setUword(word);
  }

  return (
    <div className='feed'>
      <span id='titlePerfil' className={`${theme == 'light' ? null : 'dark'}`}>FEED</span>

      <span className='btPBF'>
        <p onClick={() => { setSelect(false) }} className={`btLF ${!select ? 'sets' : null}`}>{Uword.segue}</p>
        <p onClick={() => { setSelect(true) }} className={`btLF ${select ? 'sets' : null}`}>{Uword.fy}</p>
      </span>

      {!select ? <Seguindo Uword={Uword} /> : <ForYou Uword={Uword} />}

      <BtFloat />

    </div>
  );
}
