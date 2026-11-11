import React from "react";
import './pagina.css';

import { useEffect, useState } from "react";
import api from '../../../backend/controler/api_InfosLivro';
import apiC from '../../../backend/controler/api_contentCap';

import Aba from '../abaSeleCap/abaSeleCap.jsx';
import Comentarios from "../comentarios/comentarios.jsx";

import words from './page.json';

export default function Ler(props) {
    const [info, setInfo] = useState('');
    const [Sinopse, setSinopse] = useState('');
    const [titleCap, setTitleCap] = useState(null);
    const [Cap, setCap] = useState(0);

    const [content, setContent] = useState('');

    const [pronto, setPronto] = useState();

    const [selecionado, setSelecionado] = useState(0);

    const [openRes, setOpenRes] = useState('');

    const [Curtindo, setCurtindo] = useState(false);

    const [auxiliar, setAux] = useState(false);

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
        props.setOpenRes(openRes);
    }, [openRes])

    useEffect(() => {
        if (Curtindo) {
            props.setCurtindo(true);
            setCurtindo(false);
        }
    }, [Curtindo])

    useEffect(() => {
        setOpenRes(props.openRes);
    }, [props.openRes]);

    useEffect(() => {
        if (info) {

        } else {
            setAux(!auxiliar);
            Busca();
        }

    }, [auxiliar, info]);

    const Busca = async () => {

        const respostaBook = await api.enviar(props.idLivro);
        if (respostaBook.ok === true) {
            setInfo(respostaBook.informacoes);

            if (respostaBook.informacoes && respostaBook.informacoes.sinopse) {
                setSinopse(respostaBook.informacoes.sinopse);
            }
            if (respostaBook.informacoes && respostaBook.informacoes.pronto) {
                setPronto(respostaBook.informacoes.pronto);
            }

            if (respostaBook.informacoes && respostaBook.informacoes.texto) {
                if (respostaBook.informacoes.texto != null) {
                    let titulo = JSON.parse(respostaBook.informacoes.texto);
                    setTitleCap(titulo);
                }

                const cont = Object.keys(JSON.parse(respostaBook.informacoes.texto));
                let contador = 0;
                for (let chaves of cont) {
                    contador++;
                }
                setCap(contador);
            }
        }
    };

    const conteudo = async () => {
        const response = await apiC.enviar(info.user_id, selecionado, info.id, info.nome);
        if (response.ok === true) {
            setContent(response.informacoes);

        } else {
            setContent('');
        }
    };

    useEffect(() => {
        Busca();
    }, [props.idLivro, Curtindo]);

    useEffect(() => {
        if (info.user_id && selecionado && info.id && info.nome) {
            conteudo();
        }
    }, [titleCap, selecionado]);

    useEffect(() => {
        if (info.tema) {
            props.setCor(info.tema);
        } else {
            props.setCor('#fffff')
        }
    }, [info.tema]);

    useEffect(() => {
        if (info.nome) {
            props.setTituloL(info.nome);
        }
        if (info.user_id) {
            props.setUserId(info.user_id);
        }
    }, [info.nome, info.user_id])


    return (
        <>
            <Aba Cap={Cap} titleCap={titleCap} selecionado={selecionado} setSelecionado={setSelecionado} cor={info.tema} pronto={pronto} />
            <div className="paginaLer">
                <span className="tituloLer">{selecionado == 0 ? Uword.sinopse : titleCap[selecionado]}</span>

                <div className="contentPagina" dangerouslySetInnerHTML={{ __html: selecionado == 0 ? Sinopse : content }}>
                </div>

                <span className="interval">. . .</span>

                <div className="comportComent">
                    <Comentarios setCurtindo={setCurtindo} curtidas={props.curtidas} idLivro={props.idLivro} tipo={'livro'} setOpenRes={setOpenRes} openRes={openRes} cor={info.tema} />
                </div>
            </div>
        </>
    );
}