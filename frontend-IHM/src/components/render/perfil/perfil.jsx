import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';

import edit from '../../../imgs/lapis.png';
import editD from '../../../imgs/lapis-dark.png';

import Edicao from './edicao/edicao.jsx';
import apiGender from '../../../backend/controler/api_gender';
import FloatBt from '../../BtFloat/btFloat.jsx';

import apiCapa from "../../../backend/controler/api_meusLivros";
import api from '../../../backend/controler/api_info';

import MeusFav from '../../../backend/controler/api_meusFavoritos';

import comum from '../../../imgs/comum.png';
import bronze from '../../../imgs/bronze.png';
import prata from '../../../imgs/prata.png';
import ouro from '../../../imgs/ouro.png';
import diamante from '../../../imgs/diamante.png';

import words from './perfil.json';

import Caixa_livros from './caixa_livros/caixa_livros.jsx';
import Caixa_publi from './caixa_publi/caixa_publi.jsx';


//? componente que comporta o perfil

function Perfil() {
  const [theme, setTheme] = useState('light');
  const [infos, setInfos] = useState(null);
  const [Uword, setUword] = useState("en");

  const [name, setName] = useState('');
  const [seguidores, setSeguidores] = useState(0);
  const [seguidoresS, setSeguidoresS] = useState('');
  const [medalha, setMedalha] = useState(comum);
  const [Perfil, setPerfil] = useState('');
  const [edita, setEdita] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [listF, setListF] = useState([]);

  const [livro, setLivro] = useState([]);
  const [livroF, setLivroF] = useState([]);

  const [select, setSelect] = useState(false);

  const Busca = async () => {
    const resposta = await apiGender.enviar();
    if (resposta.ok == true) {
      setGeneros(resposta.informacoes);
    }

    const respostaIMG = await apiCapa.enviar('i', 0);
    if (respostaIMG.ok == true) {
      setLivro(respostaIMG.informacoes);
    }

    const respontaFav = await MeusFav.enviar('i', 0);
    if (respontaFav.ok == true) {
      setLivroF(respontaFav.informacoes);
    }

    const respost = await api.enviar("i");
    if (respost.ok) {
      setInfos(respost.informacoes);
    }

  };
  //TODO responsavel por controlar as informações mostradas na tela de acordo com o carregamento da page sem ficar recarregando infinitamente
  useEffect(() => {
    if (infos) {
      if (infos.genero) {
        const genero = JSON.parse(infos.genero);
        setaFavoritos(genero);
      }
      setName(infos.nome);
      if (infos.fotoPerfil) {
        setPerfil("https://server-ihm.onrender.com/imagens/" + infos.fotoPerfil);
      }
      if (infos.seguidores) {
        const seguidores = JSON.parse(infos.seguidores);
        setSeguidores(seguidores);
      }

    }
  }, [infos]);

  useEffect(() => {
    Busca();
    select_idioma();

    let a = localStorage.getItem('tema');
    if (a) {
      setTheme(a);
    }
  }, []);

  useEffect(() => {
    if (seguidores >= 1000000) {
      setSeguidoresS(` ${seguidores / 1000000} MI`);
      setMedalha(diamante);
    }
    else if (seguidores >= 50000) {
      setSeguidoresS(` ${seguidores / 1000} K`);
      setMedalha(ouro);
    }
    else if (seguidores >= 1000) {
      setSeguidoresS(` ${seguidores / 1000} K`);
      setMedalha(prata);
    }
    else if (seguidores >= 500) {
      setSeguidoresS(seguidores);
      setMedalha(bronze);
    }
    else {
      setSeguidoresS(seguidores);
      setMedalha(comum);
    }
  }, [seguidores]);

  const setaFavoritos = (genero) => {
    const listT = []
    for (let i = 0; i < genero.length; i++) {
      listT.push(genero[i]);
    }
    setListF(listT);
  }

  const fecharEdicao = (e) => {
    setEdita(false);
    if (e == true) {
      window.location.reload();
    }

  };

  const mostraGender = (index) => {
    return generos[parseInt(listF[index]) + 1] ? generos[parseInt(listF[index]) + 1] : '...';
  }

  const select_idioma = () => {
    let idi = localStorage.getItem('idioma');
    if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
      idi = "en";
    }
    let word = words[idi];
    setUword(word);
  }

  return (

    <div className='perfilpagep'>
      <section className='boxName'>
        <span id='titlePerfil' className={`${theme == 'light' ? null : 'dark'}`}>{Uword.title}</span>
        <img id='fotoPerfil' src={Perfil} style={Perfil !== '' ? { backgroundColor: 'transparent', backgroundImage: 'none' } : null} onClick={() => setEdita(true)} />
        <span>
          <div id='nome' >
            <p>{name}</p>
          </div>
          <img className='edit' src={theme == 'light' ? edit : editD} alt='Editar' onClick={() => setEdita(true)} />
        </span>
        <span className='numS'><img id='medalha' src={medalha} />{seguidoresS}</span>
      </section>

      {edita && <Edicao fecharEdicao={fecharEdicao} user={infos.nome} ft={Perfil} />}

      <section className='boxGenero'>
        <span className='boxtitleGender'>
          <Link to='/IHM/perfil/gender'><p id='titleGen'>{Uword.genero}</p></Link>
          <Link to='/IHM/perfil/gender'><img className='edit' src={theme == 'light' ? edit : editD} /></Link>
        </span>
        <div className='favGen'>
          <span>
            <div className='boxGen'>{mostraGender(0)}</div>
            <div className='boxGen'>{mostraGender(1)}</div>
          </span>
          <span>
            <div className='boxGen'>{mostraGender(2)}</div>
            <div className='boxGen'>{mostraGender(3)}</div>
            <div className='boxGen'>{mostraGender(4)}</div>
          </span>
          <span>
            <div className='boxGen'>{mostraGender(5)}</div>
            <div className='boxGen'>{mostraGender(6)}</div>
          </span>
        </div>
      </section>


      <span className='btPB'>
        <p onClick={() => { setSelect(false) }} className={`btL ${!select ? 'sets' : null}`}>{Uword.livros}</p>
        <p onClick={() => { setSelect(true) }} className={`btL ${select ? 'sets' : null}`}>{Uword.publi}</p>
      </span>

      {!select ?
        <Caixa_livros Uword={Uword} theme={theme} livro={livro} livroF={livroF} />
        : <Caixa_publi Uword={Uword} />}


      <FloatBt />
    </div>
  );
}

export default Perfil;