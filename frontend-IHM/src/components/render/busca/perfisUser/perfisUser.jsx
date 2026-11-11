import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './perfisUser.css';

import comum from '../../../../imgs/comum.png';
import bronze from '../../../../imgs/bronze.png';
import prata from '../../../../imgs/prata.png';
import ouro from '../../../../imgs/ouro.png';
import diamante from '../../../../imgs/diamante.png';

import api from '../../../../backend/controler/api_info';
import apiGender from '../../../../backend/controler/api_gender';

import Seguir from '../../../../backend/controler/api_seguir';
import Seguindo from '../../../../backend/controler/api_buscaSeguidores';

import FloatBt from '../../../BtFloat/btFloat.jsx';

import Caixa_livros from './caixa_livro/caixa_livro.jsx';
import Caixa_publi from './caixa_publi/caixa_publi.jsx';

import words from './perfisUser.json';
import noF from '../../../../imgs/perfil.png';

export default function User() {
    const [select, setSelect] = useState(false);

    const location = useLocation();
    const [idUser, setIdUser] = useState('');
    const id = localStorage.getItem('id');

    const [seguidores, setSeguidores] = useState(0);
    const [seguidoresS, setSeguidoresS] = useState('');
    const [seguindo, setSeguindo] = useState(false);
    const [medalha, setMedalha] = useState(comum);

    const [infos, setInfos] = useState('');
    const [generos, setGeneros] = useState([]);
    const [meusGen, setMeusGen] = useState([]);
    const [listF, setListF] = useState([]);
    const [name, setName] = useState('');
    const [Perfil, setPerfil] = useState('');

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


    const Busca = async () => {
        const resposta = await api.enviar(idUser);
        if (resposta.ok && resposta.informacoes.id) {
            setInfos(resposta.informacoes);
        }
        const response = await apiGender.enviar();
        if (response.ok) {
            setGeneros(response.informacoes);
        }

        const responseSeg = await Seguindo.enviar(idUser);
        if (responseSeg.informacoes) {
            setSeguindo(true);
        }
    };


    const seguir = async () => {
        const resposta = await Seguir.enviar(idUser);
        if (resposta.ok) {
            Busca();
        }
    }

    const setaFavoritos = (genero) => {
        const listT = []
        for (let i = 0; i < genero.length; i++) {
            listT.push(genero[i]);
        }
        setListF(listT);
    }

    useEffect(() => {
        const idUsers = new URLSearchParams(location.search).get('id');
        setIdUser(JSON.parse(idUsers));
    }, []);

    useEffect(() => {
        Busca();
    }, [idUser]);

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

        }
        if (infos.genero) {
            setMeusGen(infos.genero);
        }
        if (infos.seguidores) {
            setSeguidores(infos.seguidores);
        }
    }, [infos]);

    useEffect(() => {
        try {
            setaFavoritos(JSON.parse(meusGen));
        } catch {
            return;
        }
    }, [generos, meusGen]);


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


    const mostraGender = (index) => {
        return generos[parseInt(listF[index]) + 1] ? generos[parseInt(listF[index]) + 1] : '...';
    }




    return (
        <div className='perfilpagep'>

            <section className='boxNameUser'>
                <img id='fotoPerfilUser' src={Perfil} onError={(e) => { e.target.src = noF; }} style={Perfil !== '' ? { backgroundColor: 'transparent', backgroundImage: 'none' } : null} />
                <div id='medalhasBox'>
                    <div id='nomeUser'>
                        <p>{`@${name}`}</p>
                    </div>

                    <span className='numS'><img id='medalha' src={medalha} />{seguidoresS}</span>

                    <span className='seguir' onClick={() => { seguir(); setSeguindo(!seguindo) }}>{seguindo ? Uword.seguindo : Uword.seguir}</span>

                </div>
            </section>

            <section className='boxGenero'>
                <span className='boxtitleGender'>
                    <p id='titleGen'>{Uword.generos}</p>
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
                <p onClick={() => { setSelect(false) }} className={`btL ${!select ? 'sets' : null}`}>LIVROS</p>
                <p onClick={() => { setSelect(true) }} className={`btL ${select ? 'sets' : null}`}>PUBLICAÇÕES</p>
            </span>

            {!select ? <Caixa_livros idUser={idUser} /> : <Caixa_publi idUser={idUser} />}

            <FloatBt />
        </div>
    );
}