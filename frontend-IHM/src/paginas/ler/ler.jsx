import React from "react";
import './ler.css';

import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import api from '../../backend/controler/api_info';
import vision from '../../backend/controler/api_visuL.js';
import Report from '../../backend/controler/api_reportar.js';

import curtida from '../../backend/controler/api_curtir';
import curtiram from '../../backend/controler/api_buscaCurtidas';

import favorito from '../../backend/controler/api_favoritar';
import favoritou from '../../backend/controler/api_buscaFavoritos';

import Seguir from '../../backend/controler/api_seguir';
import Seguindo from '../../backend/controler/api_buscaSeguidores';

import logo from '../../imgs/logo.png';
import Fav from "../../imgs/estrela.png";
import Curti from "../../imgs/coracao.png";

import Page from "./paginas/page.jsx";
import BtFloatH from "../escrever/btFloatH/btFloatH";

import alert from "../../imgs/alert.png";
import words from './ler.json';

import audioSrc from '../../sounds/curtida.mp3';

import noF from '../../imgs/perfil.png';

export default function Ler() {
    const [audio] = useState(new Audio(audioSrc));

    const CurtiPlay = () => {
        if (!curtido) {
            audio.play();
        }

    };

    const [report, setReport] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const [idLivro, setIdLivro] = useState(0);
    const id = localStorage.getItem('id');

    const [userId, setUserId] = useState(0);
    const [infos, setInfos] = useState('');

    const [cor, setCor] = useState('');

    const [tituloL, setTituloL] = useState('');
    const [foto, setFoto] = useState('');

    const [openRes, setOpenRes] = useState('');

    const [curtidas, setCurtidas] = useState('');
    const [curtido, setCurtido] = useState(false);
    const [curtindo, setCurtindo] = useState(false);

    const [fav, setFav] = useState(false);

    const [seguido, setSeguido] = useState(false);

    const [hoverC, setHoverC] = useState(false);
    const [hoverF, setHoverF] = useState(false);

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
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
        setOpenRes(openRes);
    }, [openRes]);

    useEffect(() => {
        if (curtindo) {
            Busca();
            setCurtindo(false);
        }
    }, [curtindo])

    useEffect(() => {
        if (curtidas != undefined) {
            let keys = Object.keys(curtidas).length;
            let id = localStorage.getItem('id');
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
        const idLivroG = new URLSearchParams(location.search).get('id');
        setIdLivro(JSON.parse(idLivroG));
    }, [location]);

    const ver = async () => {
        const resposta = await vision.enviar(idLivro);
    }

    useEffect(() => {
        if (idLivro) {
            ver();
        }
    }, [idLivro])


    useEffect(() => {
        if (userId && userId != 0) {
            Busca();
        }
    }, [userId]);

    useEffect(() => {
        if (infos && infos != '') {
            setFoto("https://server-ihm.onrender.com/imagens/" + infos.fotoPerfil);
        }
    }, [infos]);

    const Busca = async () => {
        const resposta = await api.enviar(userId);
        if (resposta.ok) {
            setInfos(resposta.informacoes);
        }

        const response = await curtiram.enviar(userId, idLivro, 'livro');
        if (response.ok) {
            setCurtidas(response.informacoes);
        }


        const responseFav = await favoritou.enviar(idLivro);
        if (responseFav.informacoes) {
            setFav(true);
        }

        const responseSeg = await Seguindo.enviar(userId);
        if (responseSeg.informacoes) {
            setSeguido(true);
        }

    };

    const curtir = async () => {
        const resposta = await curtida.enviar(idLivro, 'livro', 0);
        if (resposta.ok) {
            Busca();
        }
    }

    const favoritar = async () => {
        const resposta = await favorito.enviar(idLivro);
        if (resposta.ok) {
            Busca();
        }
    }

    const seguir = async () => {
        const resposta = await Seguir.enviar(userId);
        if (resposta.ok) {
            Busca();
        }
    }

    const Reportar = async (e) => {
        const value = e.target.value;
        const resposta = await Report.enviar(value, idLivro);
        if (resposta.ok) {
            navigate(-1);
        }
    }

    const styleC = {
        backgroundColor: curtido
            ? ('#FF7070')
            : (hoverC ? ('#FF7070') : '#C4BFB2'),
    };

    const styleF = {
        backgroundColor: fav
            ? ('#FFBD59')
            : (hoverF ? ('#FFBD59') : '#C4BFB2'),
    };

    return (
        <div className="PageLer" onClick={() => { setOpenRes('fechado') }}>
            <header>
                <img id="logoP" src={logo} />
                <div id="CurtiL">
                    <span className="tituloBox">{tituloL && tituloL != '' ? tituloL : Uword.load}</span>

                    <span id="BOXCURTI">
                        <div className="BoxVisu fav">
                            <span onClick={() => { favoritar(); setFav(!fav) }} onMouseEnter={() => {
                                if (typeof window.ontouchstart === "undefined") {
                                    setHoverC(true);
                                }
                            }} onMouseLeave={() => { setHoverF(false) }} style={styleF} ><img src={Fav} className={fav ? 'favN' : 'favS'} /><p className="ps">{Uword.fav}</p></span>
                        </div>
                        <div className='BoxVisu curti' >
                            <span onClick={() => { curtir(); CurtiPlay(); }} onMouseEnter={() => {
                                if (typeof window.ontouchstart === "undefined") {
                                    setHoverC(true);
                                }
                            }} onMouseLeave={() => { setHoverC(false) }} style={styleC}><img src={Curti} className={curtido ? 'curtiN' : 'curtiS'} /><p className="ps">{Uword.curti}</p></span>
                        </div>
                    </span>
                </div>

                <span className="alerts" onClick={() => { setReport(true) }}>
                    <img src={alert} />
                    <p>{Uword.alert}</p>
                </span>
            </header>

            {report ?
                <div className="fundoAlert" onClick={() => { setReport(false) }}>
                    <div className="caixaAlert" onClick={(e) => { e.stopPropagation() }}>
                        <span className="titleAlert">
                            <img src={alert} />
                        </span>
                        <div className="contentAlert">
                            <button className="AlertBT" value='Conteudo inapropriado' onClick={(e) => { Reportar(e) }}>{Uword.content}</button>
                            <button className="AlertBT" value='Plagio' onClick={(e) => { Reportar(e) }}>{Uword.plagio}</button>
                            <button className="AlertBT" value='Violacao dos Direitos Autorais' onClick={(e) => { Reportar(e) }}>{Uword.viola}</button>
                            <button className="AlertBT" value='incitacao a ilegalidade' onClick={(e) => { Reportar(e) }}>{Uword.ilegal}</button>
                        </div>
                    </div>
                </div>
                : null}

            <span className="filtro"></span>
            <div className="BOXLER">
                <Page setCurtindo={setCurtindo} curtidas={curtidas} idLivro={idLivro} setCor={setCor} setTituloL={setTituloL} setUserId={setUserId} setOpenRes={setOpenRes} openRes={openRes} />
            </div>

            <div className="infosAutor">
                <Link to={id != infos.id ? `/IHM/Busca/user?id=${encodeURIComponent(JSON.stringify(infos.id))}` : '/IHM/perfil'}><img id="perfil" src={foto} onError={(e) => { e.target.src = noF; }} style={{ border: 'solid 4px' + cor }} /></Link>
                <p>{infos.nome && infos.nome != '' ? infos.nome : Uword.autor}</p>
                {id != userId ? <div className="btSeguir" style={{ backgroundColor: cor }} onClick={() => { seguir(); setSeguido(!seguido) }} >{seguido ? Uword.seguindo : Uword.seguir}</div> : null}
            </div>

            <BtFloatH />
        </div>
    );
}