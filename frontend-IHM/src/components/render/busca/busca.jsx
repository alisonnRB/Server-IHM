import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from 'react-intersection-observer';
import './busca.css';

import api from '../../../backend/controler/api_Usuarios';

import CardPessoa from "./cardPessoa/cardPessoa.jsx";
import Load from "../../loading/loading.jsx";

import words from './busca.json';

export default function Busca() {
    const num = useRef(0);
    const [ref, inView] = useInView();
    const [Loadi, setLoad] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [control, setControl] = useState(false);


    const [theme, setTheme] = useState('light');
    const [pesquisa, setPesquisa] = useState('');

    const [users, setUsers] = useState('');

    const [Uword, setUword] = useState("en");

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }

    const Busca = async () => {
        if (Loadi || users == 'nao' || (users == 'naoM' && num.current != 0)) {
            return;
        }

        setLoad(true);

        const resposta = await api.enviar(pesquisa, num.current);
        if (resposta.ok) {
            setUsers(resposta.informacoes);
            if (resposta.informacoes == 'naoM') {
                setLoad(false);
                return;
            }

            setUsersList((prevPublicacoes) => [
                ...prevPublicacoes,
                ...Object.values(resposta.informacoes),
            ]);

            num.current += 20;
        }


        setLoad(false);
    }
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce(() => {
            setUsersList([]);
            setUsers('');
            num.current = 0;
            setControl(true);
        }, 1000),
        []
    );


    useEffect(() => {
        select_idioma();
        let a = localStorage.getItem('tema');
        if (a) {
            setTheme(a);
        }
    }, []);


    useEffect(() => {
        setUsersList([]);
        num.current = 0;
        debouncedSearch();
    }, [pesquisa, debouncedSearch]);

    useEffect(() => {
        if (control) {
            setControl(false);
            Busca();
        }
    }, [control]);

    const geraUser = () => {
        return usersList.map((usuario, index) => (
            <CardPessoa key={index} user={usuario} />
        ));
    }

    useEffect(() => {
        if (inView && !Loadi) {
            Busca();
        }
    }, [inView, Loadi]);

    return (
        <div className='TelaBusca'>
            <span id='titlePerfil' className={`${theme == 'light' ? null : 'dark'}`}>{Uword.title}</span>
            <span className='boxLivros'>
                <input type='text' id='searchText' placeholder={Uword.buscar} value={pesquisa} onChange={(e) => { setPesquisa(e.target.value) }} />
                <div id='searchImg' className={`${theme == 'light' ? '' : 'dark'}`}></div>
            </span>
            <div className="pessoasBOX">

                {users == 'nao' ? <p id='notFound'>{Uword.not}</p> : geraUser()}

            </div>

            <div className='disparador' ref={ref}>
                {users == 'naoM' ? <p id='notMore'>{Uword.noMore}</p> : null}
                {Loadi ? <Load /> : null}
            </div>
        </div>
    );
}