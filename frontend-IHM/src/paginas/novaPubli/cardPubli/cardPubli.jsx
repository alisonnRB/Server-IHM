import React from "react";
import './cardPubli.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Enquete from '../enquete/enquete.jsx';
import LinkLivro from "../linkLivros/linkLivro.jsx";

import livroT from '../../../imgs/livro-true.png';
import livroTD from '../../../imgs/link-dark.png';
import livroF from '../../../imgs/livro-false.png';

import enqueteT from '../../../imgs/enquete-true.png';
import enqueteTD from "../../../imgs/enquete-dark.png";
import enqueteF from '../../../imgs/enquete-false.png';

import abaX from '../../../imgs/aba_cancel.png';

import api from '../../../backend/controler/api_publicacao';

import words from './cardPubli.json';

export default function CardPubli() {
    const navigate = useNavigate();

    const [semIMG, setSemImg] = useState(false);

    //TODO conteudo ou não
    const [theme, setTheme] = useState('light');

    const [livro, setlivro] = useState(false);
    const [enqueteTem, setEnqueteTem] = useState(false);


    //TODO janelas abertas
    const [aba, setAba] = useState(false);

    const [Livro, setLivro] = useState(false);
    const [cancelLivro, setCancelLivro] = useState(false);

    const [enquete, setEnquete] = useState(false);
    const [cancelEnquete, setCancelEnquete] = useState(false);



    //TODO content
    const [texto, setTexto] = useState('');
    const [limitTXT, setLimitTXT] = useState(0);
    const [linkLivro, setLinkLivro] = useState('');

    const [EnqueteS, setEnqueteS] = useState('');
    const [titleEnquete, setTitleEnquete] = useState('');

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
        let a = localStorage.getItem('tema');
        if (a) {
            setTheme(a);
        }
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
        var textarea = document.getElementById("textoPubli");
        textarea.focus();
    }, [])

    useEffect(() => {
        setLimitTXT(texto.length);
    }, [texto])


    useEffect(() => {
        if (linkLivro && linkLivro.id) {
            setLivro(false);
            setlivro(true);
        } else {
            setLivro(false);
        }
    }, [linkLivro])

    useEffect(() => {
        if (EnqueteS != '') {
            for (let i = 0; i < 3; i++) {
                if (EnqueteS[i] != '') {
                    setEnqueteTem(true);
                    return;
                } else {
                    setEnqueteTem(false);
                }
            }
        }
    }, [EnqueteS])

    useEffect(() => {
        if (cancelLivro) {
            setLivro(false);
            setCancelLivro(false);
        }
    }, [cancelLivro])

    useEffect(() => {
        if (cancelEnquete) {
            setEnquete(false);
            setCancelEnquete(false);
        }
    }, [cancelEnquete])



    const geraEnquete = () => {
        const list = [];

        for (let i = 0; i < Object.keys(EnqueteS).length; i++) {
            if (EnqueteS[i] != '') {
                let a = <span className="enqueteB">{EnqueteS[i]}</span>
                list.push(a);
            }
        }

        return list;
    }


    const publicar = async () => {
        const response = await api.enviar(texto, linkLivro, EnqueteS, titleEnquete);
        if (response.ok) {
            navigate(-1);
        }
    }

    useEffect(() => {
        if (linkLivro && linkLivro.imagem) {
            setSemImg(false);
        } else {
            setSemImg(true);
        }
    }, [linkLivro.imagem])

    return (
        <div className="cardPubli">

            {Livro ? <LinkLivro setLinkLivro={setLinkLivro} setCancel={setCancelLivro} /> : null}
            {enquete ? <Enquete setCancel={setCancelEnquete} setEnquete={setEnqueteS} setEnqueteTem={setEnqueteTem} enquete={EnqueteS} setTitle={setTitleEnquete} title={titleEnquete} /> : null}

            <span >
                {livro ?
                    <>
                        {semIMG ? <div className="noIMAGE a" onMouseEnter={() => { setAba(true) }} onMouseLeave={() => { setAba(false) }} onClick={() => { setlivro(false); setLinkLivro('') }}>
                            {linkLivro.nome}
                        </div> : <div className="campoImgPubli" onMouseLeave={() => { setAba(false) }} onClick={() => { setlivro(false); setLinkLivro('') }}>
                            <img src={linkLivro.imagem} id="capaSelect" onMouseEnter={() => { setAba(true) }} />
                        </div>}
                    </>
                    : null}


                <div className="textPubli" >
                    <textarea
                        className={`textoPubli ${linkLivro !== '' ? 'Com' : ''}`}
                        id="textoPubli"
                        value={texto}
                        onChange={(e) => {
                            if (e.target.value.length <= 306) {
                                setTexto(e.target.value);
                            }
                        }}
                        maxLength="306"
                    />

                    {enqueteTem ?
                        <div className="caixaEnM">
                            <span id="quest" >{enqueteTem && titleEnquete ? titleEnquete : null}</span>
                            <div className="caixaEnquete">
                                {geraEnquete()}
                            </div>
                        </div> : null}

                </div>

            </span>
            <span className={`btPubli ${linkLivro != '' ? 'Com' : ''}`}>
                <span id="btss">
                    <img src={livro ? livroT : theme == 'dark' ? livroTD : livroF} onClick={() => { setLivro(true) }} />
                    <img src={enqueteTem ? enqueteT : theme == 'dark' ? enqueteTD : enqueteF} onClick={() => { setEnquete(true) }} />
                </span>

                <p style={limitTXT >= 260 && limitTXT <= 290 ? { color: '#DBB931' } : { color: '#FF3131' }} >{limitTXT >= 260 ? `${limitTXT}/306` : null}</p>
            </span>

            <p id="Publicar" onClick={() => { publicar() }}>{Uword.publicar}</p>

        </div>
    );
}