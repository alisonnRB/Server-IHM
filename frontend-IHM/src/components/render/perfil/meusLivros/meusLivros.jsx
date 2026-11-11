import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './meusLivros.css';

import FloatBt from "../../../BtFloat/btFloat.jsx";
import Livro from "../../../cardLivro/cardLivro.jsx";
import Load from "../../../../components/loading/loading.jsx";

import api from "../../../../backend/controler/api_meusLivros";

import words from './meusLivros.json';

export default function MeusLivros() {
    const [theme, setTheme] = useState('light');
    const [livro, setLivro] = useState('');
    const [Uword, setUword] = useState("en");

    const [livros, setLivros] = useState([]);
    const num = useRef(0);
    const [ref, inView] = useInView();

    const [Loadi, setLoad] = useState(false);

    let init = false;

    const Busca = async () => {
        if (Loadi || livro == 'nao') {
            return;
        }

        setLoad(true);
        const resposta = await api.enviar('i', num.current);
        if (resposta.ok) {
            setLivro(resposta.informacoes);
            if (resposta.informacoes == 'nao') {
                setLoad(false);
                return;
            } else {
                setLivros((prevLivros) => [
                    ...prevLivros,
                    ...Object.values(resposta.informacoes),
                ]);

            }

            num.current += 18;
        }

        setLoad(false);
    }


    const renderizarItens = () => {
        const elementos = [];
        let tempRow = [];
        let count = 0;

        for (let i = 0; i < livros.length; i++) {
            count++;
            tempRow.push(<div className="coluna" key={i}><Livro mine={true} info={livros[i]} /></div>);

            if (count === 3 || i === livro.length - 1) {
                count = 0;
                elementos.push(<span className="linha" key={i}>{tempRow}</span>);
                tempRow = [];
            }
        }

        return elementos;
    };


    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }


    useEffect(() => {
        if (!init) {
            Busca();
        }

        init = true;
        select_idioma();
        let a = localStorage.getItem('tema');
        if (a) {
            setTheme(a);
        }
    }, []);

    useEffect(() => {
        if (inView && !Loadi && livro == 'nao') {
            Busca();
        }
    }, [inView, Loadi]);

    return (
        <div className="boxCardMeusLivro">
            <span id='titlePerfil' className={`${theme == 'light' ? null : 'dark'}`}>{Uword.title}</span>


            {renderizarItens()}

            <div className='disparador' ref={ref}>
                {livro == 'nao' ? <p id='notMore'>NÃO HÁ Novas publicações</p> : null}
                {Loadi ? <Load /> : null}
            </div>

            <FloatBt />
            <div id="margem"></div>
        </div>
    );
}