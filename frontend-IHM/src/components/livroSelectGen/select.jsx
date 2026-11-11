import React from "react";
import { useState, useEffect } from "react";
import './select.css';

import api from '../../backend/controler/api_gender';

import words from './select.json';


export default function Selecao(props) {
    const [genero, setgenero] = useState('...');
    const [limit, setLimit] = useState(0);
    const [quantos, setQuantos] = useState(0);
    const [selecionados, setSelecionado] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,

    });

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
        Busca();
        if (props.Quantos) {
            setQuantos(props.Quantos);
        }
    }, []);

    useEffect(() => {
        let conta = 0;
        if (props.Gen) {
            for (let i = 0; i < props.Gen.length; i++) {
                if (!isNaN(props.Gen[i])) {
                    let ind = parseInt(props.Gen[i]);
                    if (!isNaN(props.Gen[i + 1])) {
                        ind = ind + props.Gen[i + 1];
                        i = i + 1;
                    }
                    if (ind != 0) {
                        conta++;
                        selecionando(ind);
                    }
                }
            }
        }
        setLimit(conta);
        props.setConta(conta);
    }, [props.Gen]);

    const Busca = async () => {
        const resposta = await api.enviar();
        if (resposta.ok == true) {
            setgenero(resposta.informacoes);
        }

    };

    const Options = () => {
        const list = [];
        for (let i = 1; i <= Object.keys(genero).length; i++) {
            let a = <option className="op" key={i} value={i}>{genero[i]}</option>;
            list.push(a);
        }
        return list;
    }

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }



    function selecionando(index) {
        if (limit < quantos) {
            if (selecionados[index - 1] == false) {
                setLimit(limit + 1);
                props.setConta(limit + 1);
                setSelecionado((prevState) => ({
                    ...prevState,
                    [index - 1]: true
                }));
                props.setSelecao((prevState) => ({
                    ...prevState,
                    [index]: true
                }));
            }
        }
        if (selecionados[index - 1] == true) {
            setLimit(limit - 1);
            props.setConta(limit - 1);
            setSelecionado((prevState) => ({
                ...prevState,
                [index - 1]: false
            }));
            props.setSelecao((prevState) => ({
                ...prevState,
                [index]: false
            }));
        }

    }

    function mostraGeneros() {
        const list = [];
        for (let i = 0; i < Object.keys(selecionados).length; i++) {
            if (selecionados[i] == true) {
                let a = <span key={i} className="Genero" onClick={() => { selecionando(i + 1) }}>{genero[i + 1]}</span>;
                list.push(a);
            }
        }
        return list;
    }


    return (
        <div>
            <select id="selecao" value='' onChange={(event) => selecionando(event.target.value)}>
                <option value='' hidden>{Uword.title}</option>
                {Options()}
            </select>

            <div className="boxGend">
                {mostraGeneros()}
            </div>

        </div>
    );
}