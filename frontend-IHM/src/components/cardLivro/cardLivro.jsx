import React, { useEffect, useState } from "react";
import './cardLivro.css';

import { Link } from "react-router-dom";

import Visu from "../../imgs/olho.png";
import Fav from "../../imgs/estrela.png";
import Curti from "../../imgs/coracao.png";

import livre from '../../imgs/livre.jpeg';
import dez from '../../imgs/dez.jpeg';
import doze from '../../imgs/doze.jpeg';
import quatorze from '../../imgs/quatorze.jpeg';
import dezeseis from '../../imgs/dezeseis.jpeg';
import dezoito from '../../imgs/dezoito.jpeg';

import words from './cardLivro.json';


export default function Livro(props) {
    const [semIMG, setSemImg] = useState(false);
    const [Uword, setUword] = useState("en");

    const [id, setId] = useState('')
    const [fotoCapa, setFotoCapa] = useState('');
    const [nome, setNome] = useState('...');
    const [livro, setLivro] = useState('');
    const [sinopse, setSinopse] = useState('<p></p>');

    const [classificacao, setClassificacao] = useState('');
    const [visuClass, setVisuClass] = useState(livre);

    const [aberto, setAberto] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const [curtidas, setCurtidas] = useState(0);
    const [favoritos, setFavoritos] = useState(0);
    const [visus, setVisus] = useState(0);

    useEffect(() => {
        select_idioma();
    }, [])

    useEffect(() => {
        if (props.info.user_id) {
            setId(props.info.user_id);
        }
        if (props.info && props.info['nome']) {
            setNome(props.info['nome']);
        } else {
            setNome('...');
        }
        if (props.info && props.info['sinopse']) {
            setSinopse(props.info['sinopse']);
        }
        if (props.info && props.info['classificacao']) {
            setClassificacao(props.info['classificacao']);
        }

        if (props.info && props.info['curtidas']) {
            let a = props.info['curtidas'];
            if (props.info['curtidas'] > 1000000) {
                a = props.info['curtidas'] / 1000000 + 'M';
            }
            else if (props.info['curtidas'] > 1000) {
                a = props.info['curtidas'] / 1000 + 'K';
            }
            setCurtidas(a);
        }

        if (props.info && props.info['favoritos']) {
            let a = props.info['favoritos'];
            if (props.info['favoritos'] > 1000000) {
                a = props.info['favoritos'] / 1000000 + 'M';
            }
            else if (props.info['favoritos'] > 1000) {
                a = props.info['favoritos'] / 1000 + 'K';
            }
            setFavoritos(a);
        }

        if (props.info && props.info['visus']) {
            let a = props.info['visus'];
            if ((props.info['visus']) > 1000000) {
                a = (props.info['visus']) / 1000000 + 'M';
            }
            else if ((props.info['visus']) > 1000) {
                a = (props.info['visus']) / 1000 + 'K';
            }
            setVisus(Math.round(a));
        }

        setLivro(props.info);

    }, [props.info]);

    useEffect(() => {
        if (props.info && props.info['imagem'] && id) {
            setFotoCapa("https://server-ihm.onrender.com/livros/" + id + '/' + nome + '_' + props.info['id'] + '/' + props.info['imagem']);
        } else {
            setFotoCapa('');
        }
    }, [id]);

    function botao(mine) {
        if (mine == true) {
            return (
                <Link to={`/IHM/perfil/MeusLivros/escreva?id=${encodeURIComponent(JSON.stringify(livro.id))}`} className="link">
                    <button className="Edicao bt">{Uword.edit}</button>
                </Link>
            );
        }
    };

    const TimerAbrir = () => {
        const id = setTimeout(() => {
            setAberto('abre');
        }, 400);

        setTimeoutId(id);
    };

    const TimerCancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        setAberto('');
    };

    useEffect(() => {
        switch (classificacao) {
            case 'livre':
                setVisuClass(livre);
                break;
            case 'dez':
                setVisuClass(dez);
                break;
            case 'doze':
                setVisuClass(doze);
                break;
            case 'quatorze':
                setVisuClass(quatorze);
                break;
            case 'dezeseis':
                setVisuClass(dezeseis);
                break;
            case 'dezoito':
                setVisuClass(dezoito);
                break;
        }
    }, [classificacao]);

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }

    useEffect(() => {
        if (props.info['imagem']) {
            setSemImg(false);
        } else {
            setSemImg(true);
        }
    }, [props.info['imagem']])

    return (
        <span className={`CardLivro ${aberto}`} onMouseEnter={() => { TimerAbrir() }} onMouseLeave={() => { TimerCancel() }}>

            <div className="IMGbox">
                <span className="IMGbox_Classifica" >
                    <img id="classifica" src={visuClass} />
                </span>
                {semIMG ? null : <img id="capa" src={fotoCapa} />}
                {semIMG ?
                    <div className="noIMAGE">
                        {nome}
                    </div> : null}
            </div>

            <div className="infos">

                <span id="nomeLivro">
                    {nome}
                </span>

                <span id="VisuLivro">
                    <div className="BoxVisu visu">
                        <span><img src={Visu} /></span><span>{visus}</span>
                    </div>
                    <div className="BoxVisu fav">
                        <span><img src={Fav} /></span><span>{favoritos}</span>
                    </div>
                    <div className="BoxVisu curti">
                        <span><img src={Curti} /></span><span>{curtidas}</span>
                    </div>
                </span>

                <div id="Box_text" dangerouslySetInnerHTML={{ __html: sinopse }}>
                </div>

                <span id="BTs">

                    <Link className="link" to={`/Ler/?id=${encodeURIComponent(JSON.stringify(livro.id))}`}><button className="Read bt">{props.mine ? Uword.visu : props.text}</button></Link>

                    {botao(props.mine)}

                </span>
            </div>
        </span >
    );
}