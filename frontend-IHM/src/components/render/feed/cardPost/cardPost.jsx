import React from 'react';
import './cardPost.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import curti from '../../../../imgs/core-like.png';
import curtiT from '../../../../imgs/curtiT.png';
import curtiD from '../../../../imgs/curti-dark.png';
import curtiTD from '../../../../imgs/curtiN-dark.png';

import opPubli from '../../../../imgs/opPubli.png';
import lixo from '../../../../imgs/lixeira.png';

import coment from '../../../../imgs/bal-coment.png';
import comentD from '../../../../imgs/coments-dark.png';

import curtida from '../../../../backend/controler/api_curtir';
import curtiram from '../../../../backend/controler/api_buscaCurtidas';

import vote from '../../../../backend/controler/api_votar';
import SearchVote from '../../../../backend/controler/api_BuscaVotos';

import Comentarios from '../../../../paginas/ler/comentarios/comentarios.jsx';

import api from '../../../../backend/controler/api_enqueteVote';
import dell from '../../../../backend/controler/api_dellPubli.js';

import audioSrc from '../../../../sounds/curtida.mp3';

import words from './cardPost.json';

import noF from '../../../../imgs/perfil.png';

export default function Card(props) {
  const [audio] = useState(new Audio(audioSrc));

  const CurtiPlay = () => {
    if (!curtido) {
      audio.play();
    }

  };

  const [semIMG, setSemImg] = useState(false);

  const id = localStorage.getItem('id');
  const [deletar, setDeletar] = useState(false);

  const [theme, setTheme] = useState('light');

  const [hover, setHover] = useState(false);

  //TODo coment function 
  const [openRes, setOpenRes] = useState('');
  const [curtidas, setCurtidas] = useState('');
  const [curtido, setCurtido] = useState(false);
  const [curtindo, setCurtindo] = useState(false);

  const [abreComent, setAbreComent] = useState(false);
  const [abrir, setAbrir] = useState(true);
  const [votado, setVotado] = useState(false);

  const [texto, setTexto] = useState('');
  const [link, setLink] = useState('');
  const [enquete, setEnquete] = useState('');
  const [voteEn, setVoteEn] = useState('');
  const [autor, setAutor] = useState('');

  const [Uword, setUword] = useState("en");


  const [auxiliar, setAux] = useState(0);


  useEffect(() => {
    Busca();
    select_idioma();
    let a = localStorage.getItem('tema');
    if (a) {
      setTheme(a)
    }
  }, [props])

  useEffect(() => {
    if (votado) {
      changeVoto();
    }
  }, [votado])

  useEffect(() => {
    if (props.publi) {

      if (props.publi.texto) {
        setTexto(props.publi.texto);
      }
      if (props.publi.infos_link) {
        setLink(props.publi.infos_link[0]);
      }
      if (props.publi.infos_user) {
        setAutor(props.publi.infos_user[0]);
      }
      if (props.publi.enquete) {
        setEnquete(props.publi.enquete[0]);
        changeVoto();
      }
    }
  }, [props.publi])

  useEffect(() => {
    if (curtindo) {
      Busca();
      setCurtindo(false);
    }
  }, [curtindo])

  useEffect(() => {
    if (curtidas != undefined) {
      let keys = Object.keys(curtidas).length;
      for (let i = 0; i < keys; i++) {
        if (curtidas[i].coment == 0 && curtidas[i].id_user == id) {
          setCurtido(true);
          return;
        }
      }
    }
    setCurtido(false);
  }, [curtidas]);

  useEffect(() => {
    if (abreComent) {
      setAbrir(true)
    } else {
      setAbrir(false);
    }
  }, [abreComent]);

  useEffect(() => {
    if (auxiliar < 2) {
      Busca();
    }
  }, [auxiliar]);

  useEffect(() => {
    if (link.imagem) {
      setSemImg(false);
    } else {
      setSemImg(true);
    }
  }, [link.imagem])

  const changeVoto = async () => {
    if (enquete.id !== undefined) {
      const resposta = await api.enviar(enquete.id);
      if (resposta.ok) {
        setVoteEn(resposta.informacoes);
      }
    }

  }


  const gera_enquete = () => {
    const list = [];
    let en = JSON.parse(enquete.quest);



    for (let i = 0; i < Object.keys(en).length; i++) {
      if (votado) {
        if (voteEn && voteEn[0]) {
          var votados = JSON.parse(voteEn);
          var total = votados[0] + votados[1] + votados[2] + votados[3];

        } else {
          return () => { gera_enquete() };
        }

        if (en[i] && en[i] != undefined) {
          let a = <span key={i} className='selectBox vote'><div className='vote' style={{ width: `${votados[i] / total * 100}%` }}><span className='votes'><p>{en[i]}</p><p>{`${Math.round(votados[i] / total * 100)}%`}</p></span></div></span>

          list.push(a);
        }

      } else {

        if (en[i] && en[i] != undefined) {
          let a = <span key={i} className='selectBox' onClick={() => { votar(i); changeVoto(); }}>{en[i]}</span>

          list.push(a);
        }
      }


    }

    return list;
  }




  const Busca = async () => {
    setAux(auxiliar + 1);

    if (enquete && enquete != undefined && enquete.id) {
      const respost = await SearchVote.enviar(enquete.id);
      if (respost.informacoes) {
        setVotado(true);
      }
    }

    if (props.publi.id) {
      const resposta = await curtiram.enviar(id, props.publi.id, 'publi');
      if (resposta.ok) {
        setCurtidas(resposta.informacoes);
      }
    }

  }

  const curtir = async () => {
    const resposta = await curtida.enviar(props.publi.id, 'publi', 0);
    if (resposta.ok) {
      Busca();
    }
  }

  const votar = async (key) => {
    const resposta = await vote.enviar(enquete.id, key);
    if (resposta.ok) {
      Busca();
    }
  }

  const fechar_dell = (e) => {
    e.stopPropagation();
    setDeletar(false);
  }

  const dell_Publi = async () => {
    const resposta = await dell.enviar(props.publi.id);
    if (resposta.ok) {
      window.location.reload();
    } else {
      setDeletar(false);
    }
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
    <>
      <div className='cardPost'>
        <span className='infosPost'>

          <span className='publiUser'>
            <img className='perfilPubli' src={autor && autor.fotoPerfil ? "https://server-ihm.onrender.com/imagens/" + autor.fotoPerfil : ""} onError={(e) => { e.target.src = noF; }} />
            <Link to={autor && id != autor.id ? `/IHM/Busca/user?id=${encodeURIComponent(JSON.stringify(autor.id))}` : '/perfil'}><p id='nom'>{`@${autor ? autor.nome : '...'}`}</p></Link>
          </span>

          {autor && id === autor.id ? <img src={opPubli} className='opPubli' onClick={() => { setDeletar(true) }} /> : null}

          {deletar ? (
            <div className='deletePubli' onClick={(e) => { fechar_dell(e) }}>
              <span className={`boxDellPubli ${hover ? 'hovered' : null}`} onClick={(e) => { e.stopPropagation(); dell_Publi() }}>
                <p onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>{Uword.dell}</p>
                <div onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}><img src={lixo} /></div>
              </span>
            </div>
          ) : null}

          {link && link != undefined ? <Link to={`/Ler/?id=${encodeURIComponent(JSON.stringify(link.id))}`}>
            <div className='imgLinkBox'>

              {semIMG ? <div className="noIMAGE" >
                {link.nome}
              </div> : <img src={link.imagem ? "https://server-ihm.onrender.com/livros/" + link.user_id + '/' + link.nome + '_' + link.id + '/' + link.imagem : ""} className='imgLink' />}

            </div>
          </Link> : null}


          <div className='textContent'>
            <div className='publiText' style={!link || link == undefined && !enquete || enquete == undefined ? { fontSize: '2.3em' } : null}>
              {texto != '' ? texto : '...'}
            </div>
            {enquete && enquete != undefined && enquete.quest ?
              <div className='enquetePubli'>
                <span className='enqueteTitle'>{enquete.titulo}</span>
                <div className='enquet'>
                  <div className='renderEnquete'>
                    {gera_enquete()}
                  </div>
                </div>
              </div> : null}
          </div>

        </span>
        <span className='curtiComent'>
          <img src={theme == 'light' ? coment : comentD} onClick={() => { setAbreComent(!abreComent) }} />
          <img src={curtido ? (theme == 'light' ? curtiT : curtiD) : (theme == 'light' ? curti : curtiTD)} className={curtido ? 'Nom' : 'Sin'} onClick={() => { CurtiPlay(); curtir(); setCurtido(!curtido) }} />
        </span>
      </div>

      <div className="comportComenta">
        {abrir ? <Comentarios setCurtindo={setCurtindo} curtidas={curtidas} idLivro={props.publi.id} tipo={'publi'} cor={'#087F97'} setOpenRes={setOpenRes} openRes={openRes} /> : null}
      </div>
    </>
  );
}
