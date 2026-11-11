import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './home.css';
import { Link } from 'react-router-dom';
import Header from './header/header.jsx';

import apresentation from '../../imgs/apresentation.png';

import publi from '../../imgs/Ppubli.png';
import chat from '../../imgs/Pchat.png';
import pessoas from '../../imgs/Ppessoas.png';
import livro from '../../imgs/Plivro.png';

import pc from "../../imgs/pc-check.png";
import tablet from "../../imgs/tablet.png";
import cell from "../../imgs/cell.png";

import check from "../../imgs/check.png";
import envia from "../../imgs/enviar-preto.png";

function Home() {
  //TODO passa como propriedades as informações(user) do usuario para os elementos filhos acessarem
  const [tempo, setTempo] = useState(0);
  const [control, setControl] = useState(false);
  const list = { 0: pc, 1: cell, 2: tablet };

  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  const TIME = setTimeout(() => {
    if (tempo == 2) {
      setTempo(0)
    } else {
      setTempo(tempo + 1);
    }
    setControl(true);
    clearInterval(TIME);
  }, 5000);

  useEffect(() => {
    if (control) {
      setControl(false);
    }
  }, [control])

  return (
    <div className='HOME'>
      <Header />
      <section className='apresentation'>
        <img src={apresentation} />
        <Link to='/login' className='link'><button className="junte">JUNTE-SE A NÓS</button></Link>
      </section>

      <section className='features'>
        <span className='text-f'>
          <h2>A COMUNIDADE MAIS INSPIRADORA</h2>
          <div className='text_f'>
            <p>O IHM é uma rede social literária que possibilita</p>
            <p>a interação entre criadores e leitores</p>
            <p>de variados gêneros textuais!</p>
          </div>
        </span>

        <span className='frases' ref={ref}>
          <div className={`cont-frase ${inView ? 'anima' : null}`}>
            <img className='catMain' src={livro} />
            <h4>DESCUBRA A ARTE</h4>
            <p>
              Aqui, amadores da criação literária se encontram para desenvolver e descobrir
              novas histórias. Explore as mais variadas formas de expressar arte pelas palavras!
            </p>
          </div>

          <div className={`cont-frase ${inView ? 'anima1' : null}`}>
            <img className='catMain' src={pessoas} />
            <h4>CONSTRUA VÍNCULOS</h4>
            <p>
              Siga autores inspiradores e deixe sua marca na nossa comunidade!
            </p>
          </div>

          <div className={`cont-frase ${inView ? 'anima2' : null}`}>
            <img className='catMain' src={chat} />
            <h4>CONVERSE COM AMIGOS</h4>
            <p>
              Use o Chat para desfrutar de conversas intimistas com outros membros,
              discutir livros, trocar ideias e interagir com pessoas que compartilham
              sua paixão pela escrita ou leitura
            </p>
          </div>

          <div className={`cont-frase ${inView ? 'anima3' : null}`}>
            <img className='catMain' src={publi} />
            <h4>FAÇA PUBLICAÇÕES</h4>
            <p>
              Publique suas ideias e opiniões literárias no Feed, utilizando recursos incríveis
              de inserção de enquetes e anexação de livros! Fique à vontade para curtir
              e comentar nas publicações!
            </p>
          </div>
        </span>
      </section>


      <section className='novidades'>

        <span className='content-novi'>
          <div className='pc-novi'>
            {!control ? <img src={list[tempo]} /> : null}
          </div>


          <div className='text-novi'>
            <img src={check} />
            <p>
              Nossa plataforma se adapta aos<br></br>
              mais variados tamanhos e tipos de<br></br>
              tela, sem prejudicar sua experiência!
            </p>
          </div>
        </span>
      </section>
    </div>
  );
}

export default Home;
