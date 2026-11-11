import React from 'react';
import './warning.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../../backend/controler/api_dellContaG';

import words from './warning.json';

export default function Warning(props) {
    const navigate = useNavigate();
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

    const Dell = async () => {
        const resposta = await api.enviar();
        if (resposta.ok) {
            sessionStorage.clear();
            localStorage.clear();
            navigate('/');
        }
    }

    return (
        <div className='boxWarning'>

            <div className='warning'>
                <div className='titleWarning'>
                    {Uword.confirmar}
                </div>

                <span className='warningBts'>
                    <button className='Wbt canc' onClick={() => { props.setAbre(false) }}>{Uword.cancelar}</button>
                    <button className='Wbt dell' onClick={() => { Dell() }}>{Uword.excluir}</button>
                </span>
            </div>

        </div>
    );
}