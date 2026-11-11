import React from "react";
import './btFloat.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import words from './btFloat.json';

export default function FloatBt() {
    const [Uword, setUword] = useState("en");

    function toggleFAB(fab) {
        if (document.querySelector(fab).classList.contains('show')) {
            document.querySelector(fab).classList.remove('show');
        } else {
            document.querySelector(fab).classList.add('show');
        }
    }

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


    return (
        <div className="fab">
            <button className="main" onClick={() => toggleFAB('.fab')}>
            </button>
            <ul>
                <li>
                    <label htmlFor="opcao1">{Uword.op1}</label>
                    <Link to='/novo-livro'>
                        <button id="opcao1"></button>
                    </Link>
                </li>
                <li>
                    <label htmlFor="opcao2">{Uword.op2}</label>
                    <Link to='/novaPubli'>
                        <button id="opcao2">
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}