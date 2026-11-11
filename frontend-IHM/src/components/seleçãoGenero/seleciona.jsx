import React from "react";
import './seleciona.css';

import { useState } from "react";
import { useEffect } from "react";

import api from '../../backend/controler/api_gender';

export default function SelecionaGeneros(props) {
    const [theme, setTheme] = useState('light');
    const [genero, setgenero] = useState('...');
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
    const [limit, setLimit] = useState(0);

    const Busca = async () => {
        const resposta = await api.enviar();
        if (resposta.ok == true) {
            setgenero(resposta.informacoes);
        }

    };



    useEffect(() => {
        if (props.generos) {
            for(let i = 0; i<props.generos.length; i++){
                selecao(props.generos[i]);
            }
            setLimit(props.generos.length);
            props.setConta(props.generos.length);
            
        }
      }, [props.generos]);


    useEffect(() => {
        Busca();
        let a = localStorage.getItem('tema');
        if(a){
            setTheme(a);
        }
    }, []);

    function selecao(index) {
        if (limit < props.Limit) {
            marcador(index, true);
        } else {
            marcador(index, false);
        }
    }
    function marcador(index, livre) {
        if (livre == true) {
            if (selecionados[index] == false) {
                setLimit(limit + 1);
                props.setConta(limit + 1);
                setSelecionado((prevState) => ({
                    ...prevState,
                    [index]: true
                }));
                props.setSelecao((prevState) => ({
                    ...prevState,
                    [index]: true
                }));
            }
        }
        if (selecionados[index] == true) {
            setLimit(limit - 1);
            props.setConta(limit - 1);
            setSelecionado((prevState) => ({
                ...prevState,
                [index]: false
            }));
            props.setSelecao((prevState) => ({
                ...prevState,
                [index]: false
            }));
        }
    }

    const gen = document.getElementsByClassName('gender');
    for (let i = 0; i < gen.length; i++) {
        gen[i].style.backgroundColor = selecionados[i] ? theme == 'light' ? '#3392a6' : '#00414A'  : '';
        gen[i].style.color = selecionados[i] ? 'white' : '';
    }


    return (
        <>
            <span>
                <div className='gender' onClick={() => selecao(0)} >{genero[1]}</div>
                <div className='gender' onClick={() => selecao(1)}>{genero[2]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(2)}>{genero[3]}</div>
                <div className='gender' onClick={() => selecao(3)}>{genero[4]}</div>
                <div className='gender' onClick={() => selecao(4)}>{genero[5]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(5)}>{genero[6]}</div>
                <div className='gender' onClick={() => selecao(6)}>{genero[7]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(7)}>{genero[8]}</div>
                <div className='gender' onClick={() => selecao(8)}>{genero[9]}</div>
                <div className='gender' onClick={() => selecao(9)}>{genero[10]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(10)}>{genero[11]}</div>
                <div className='gender' onClick={() => selecao(11)}>{genero[12]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(12)}>{genero[13]}</div>
                <div className='gender' onClick={() => selecao(13)}>{genero[14]}</div>
                <div className='gender' onClick={() => selecao(14)}>{genero[15]}</div>
            </span>
            <span>
                <div className='gender' onClick={() => selecao(15)}>{genero[16]}</div>
                <div className='gender' onClick={() => selecao(16)}>{genero[17]}</div>
            </span>
        </>

    );
}