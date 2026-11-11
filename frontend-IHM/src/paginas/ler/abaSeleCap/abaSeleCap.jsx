import React from "react";
import './abaSeleCap.css';
import { useState, useEffect } from "react";

import words from './abaSeleCap.json';

export default function Aba(props) {
    const [Caps, setCaps] = useState(0);
    const [titleCap, setTitleCap] = useState('');

    const [cor, setCor] = useState('#fffff');

    const [ishovered, setIsHovered] = useState(null);

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

    const Capitulos = () => {
        if (props.pronto) {
            const list = [];
            let p = JSON.parse(props.pronto);
            for (let i = 1; i <= Caps; i++) {
                if (p[i]) {
                    let a = <span
                        key={i}
                        onMouseEnter={() => setIsHovered(i)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={props.selecionado == i || ishovered == i ? { backgroundColor: cor, color: "white" } : null}
                        className={`abaT`}
                        onClick={() => { props.setSelecionado(i) }}>
                        {`Cap ${i} - ${titleCap[i]}`}
                    </span>;
                    list.push(a);
                }
            }
            return list;
        }
    }

    useEffect(() => {
        setCaps(props.Cap);
    }, [props.Cap]);

    useEffect(() => {
        setTitleCap(props.titleCap);
    }, [props.titleCap]);

    useEffect(() => {
        if (props.cor) {
            setCor(props.cor)
        } else {
            setCor('#0A6E7D')
        }
    }, [props.cor])

    return (
        <div id="abaDeCap">
            <span
                key={0}
                onMouseEnter={() => setIsHovered(0)}
                onMouseLeave={() => setIsHovered(null)}
                className={`abaT`}
                style={props.selecionado == 0 || ishovered == 0 ? { backgroundColor: cor, color: "white" } : null}
                onClick={() => { props.setSelecionado(0) }}>
                {Uword.sinopse}
            </span>

            {Capitulos()}
        </div>
    );
}