import React, { useState, useEffect } from "react";
import './tags.css';


import x from '../../../imgs/sair.png';
import fecha from '../../../imgs/tags_fecha.png';
import abre from '../../../imgs/tags_abre.png';
import enviar from '../../../imgs/enviar.png'

import words from './tags.json';

export default function Tags(props) {
    const [abreTag, setAbreTag] = useState(false);
    const [tags, setTags] = useState('');
    const [conta, setConta] = useState(0);
    const [novaTag, setNovaTag] = useState("");

    const [att, setAtt] = useState(false);

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
        setTags(props.tags);
    }, [props.tags]);

    useEffect(() => {
        if (tags) {
            let count = 0;
            for (let i = 0; i < 10; i++) {
                if (tags[i] !== '') {
                    count++;
                }
            }
            setConta(count);
        }
    }, [tags]);

    useEffect(() => {
        if (att) {
            props.setTags(tags);
            setAtt(false);
        }
    }, [att])

    const updateValue = (event, valor, chave) => {
        if (event) {
            event.preventDefault();
        }
        let index = 0;
        if (chave != 'chave') {
            index = chave;
        } else {
            for (let i = 0; i < 10; i++) {
                if (conta < 10 && tags[i] == '') {
                    index = i;
                    break;
                }
            }
        }
        if (conta >= 10 && chave != '') {
            return;
        }
        const updatedData = { ...tags };
        updatedData[index] = valor;
        setTags(updatedData);

        setNovaTag('');
        setAtt(true);
    };

    function Geratags() {
        const list = [];
        if (tags) {
            for (let i = 0; i < 10; i++) {
                if (tags[i] !== '') {
                    list.push(
                        <span key={i} className="TAGt">
                            <span className="contentTAGt">
                                <p>{tags[i]}</p>
                                <img src={x} onClick={() => { updateValue(false, '', i) }} />
                            </span>
                        </span>
                    );
                }
            }
        }
        return list;
    }

    return (
        <div className={`tag ${abreTag ? 'abre' : null}`}>
            <span className='abaTAG' onClick={() => { setAbreTag(!abreTag) }}>
                <img id="fechaTAG" src={abreTag ? abre : fecha} />
            </span>

            <div id="contentTAG">
                <span className="titleTAG"> TAGS </span>
                <form className="criaTAG" onSubmit={(event) => { updateValue(event, novaTag, 'chave') }}>
                    <input type="text" name="tag" placeholder={Uword.escrever} value={novaTag} onChange={(e) => { setNovaTag(e.target.value) }} />
                    <img id="enviaTAG" src={enviar} onClick={(event) => { updateValue(event, novaTag, 'chave') }} />
                </form>
                <span className="contTAG"> <p>{`${conta}/10`}</p> </span>
                <div className="mostraTAG">
                    {Geratags()}
                </div>
            </div>
        </div>
    );
}