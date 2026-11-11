import React from "react";
import './linklivro.css';
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from 'react-intersection-observer';

import api from "../../../backend/controler/api_search";

import Card from "./cardLivro/cardLivro.jsx";
import x from "../../../imgs/cancel.png";

import words from './linkLivro.json';

import Load from "../../../components/loading/loading";

export default function LinkLivro(props) {
    const [livro, setLivro] = useState('');
    const [livros, setLivros] = useState([]);
    const [selecionado, setSelecionado] = useState('');

    const [busca, setBusca] = useState('');

    const num = useRef(0);
    const [ref, inView] = useInView();
    const [Loadi, setLoad] = useState(false);
    const [Responsed, setResponsed] = useState(false);

    const [Uword, setUword] = useState("en");

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce(() => {
            setLivro('');
            setLivros([])
            setResponsed(true);
            num.current = 0;
        }, 1000),
        []
    );

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
        if (selecionado && selecionado.id) {
            props.setLinkLivro(selecionado);
        }
    }, [selecionado])

    useEffect(() => {
        debouncedSearch();
    }, [busca, debouncedSearch])

    useEffect(() => {
        if (Responsed) {
            setResponsed(false);
            Pesquisa();
        }
    }, [Responsed])

    const Pesquisa = async () => {
        if (Loadi) {
            return;
        } else if (livro == 'nao' || (livro == 'naoM' && num.current != 0)) {
            return;
        }

        setLoad(true);
        const resposta = await api.enviar(busca, null, null, null, null, num.current);
        if (resposta.ok) {
            setLivro(resposta.informacoes);

            if (Object.keys(livro).length > 0) {
                setLivros((prevLivros) => {
                    const novosLivros = Object.values(livro);
                    const livrosNaoDuplicados = novosLivros.filter(
                        (novoLivro) => !prevLivros.some((livro) => livro.id === novoLivro.id)
                    );
                    return [...prevLivros, ...livrosNaoDuplicados];
                });
            }

            num.current += 18;
        }

        setLoad(false);

    }


    const geraLivros = () => {
        const list = [];

        for (let i = 0; i < Object.keys(livros).length; i++) {
            let a = <Card key={i} livro={livros[i]} setSelecionado={setSelecionado} />
            list.push(a);
        }

        return list;
    }


    useEffect(() => {
        if (inView && !Loadi) {
            Pesquisa();
        }
    }, [inView, Loadi]);


    return (
        <div className="BuscaLivros">
            <div className="abaPesquisa">
                <img id="cancelB" src={x} onClick={() => { props.setCancel(true) }} />
                <span className="titleBox">{Uword.anexo}</span>
                <span className="boxLivros">
                    <input type='text' id='searchText' value={busca} placeholder={Uword.place} onChange={(e) => { setBusca(e.target.value) }} />
                </span>

                <div className="Buscas">
                    {geraLivros()}
                    <div className="disparato" style={{ height: '300px', width: '50px' }} ref={ref}></div>
                    {livro == 'naoM' ? <p id='notMore'>{Uword.noMore}</p> : null}
                    {Loadi ? <Load /> : null}
                </div>



            </div>
        </div>
    );
}