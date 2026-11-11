import React, { useEffect, useState } from 'react';
import './enquete.css';

import x from '../../../imgs/cancel.png';
import mais from '../../../imgs/mais.png';

import words from './enquete.json';

export default function Enquete(props) {
    const [content, setContent] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
    });

    const [mais1, setMais1] = useState(false);
    const [mais2, setMais2] = useState(false);

    const [title, setTitle] = useState('');

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


    const handleInputChange = (e, index, tag) => {
        let newValue = "";
        if (tag == 'insert') {
            newValue = e.target.value;
        }
        setContent((prevContent) => ({
            ...prevContent,
            [index]: newValue,
        }));
    };

    const save = () => {
        props.setEnquete(content);
        props.setCancel(true);
        props.setEnqueteTem(true);
        props.setTitle(title);
    }

    useEffect(() => {
        if (props.enquete != '') {
            setContent(props.enquete);
            setTitle(props.title);
        }
    }, [props.enquete])

    useEffect(() => {
        if (content != '') {
            if (content[2] != '') {
                setMais1(true);
            }
            if (content[3] != '') {
                setMais2(true);
            }
        }
    }, [content])

    return (
        <div className="enquete">
            <div id="cardEnquete">
                <span className="cancelIMG">
                    <img src={x} id="cancelaEnquete" onClick={() => { props.setCancel(true) }} />
                </span>
                <span className="tagBox">{Uword.nova}</span>

                <span className="titleEnquete">
                    <input type="text" className="titleEnqueteBox" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </span>

                <div className="contentEnquete">

                    <span>
                        <input
                            type="text"
                            className="enqueteBox"
                            value={content[0]}
                            onChange={(e) => handleInputChange(e, 0, 'insert')}
                        />
                        <div className='apagaEn' onClick={() => { handleInputChange('', 0, '') }}>X</div>
                    </span>

                    <span>
                        <input
                            type="text"
                            className="enqueteBox"
                            value={content[1]}
                            onChange={(e) => handleInputChange(e, 1, 'insert')}
                        />
                        <div className='apagaEn' onClick={() => { handleInputChange('', 1, '') }}>X</div>
                    </span>

                    {mais1 ? <span>
                        <input
                            type="text"
                            className="enqueteBox"
                            value={content[2]}
                            onChange={(e) => handleInputChange(e, 2, 'insert')}
                        />
                        <div className='apagaEn' onClick={() => { handleInputChange('', 2, ''); setMais1(false) }}>X</div>
                    </span> : <img className='mais' src={mais} onClick={() => { setMais1(true) }} />}

                    {mais2 ? <span>
                        <input
                            type="text"
                            className="enqueteBox"
                            value={content[3]}
                            onChange={(e) => handleInputChange(e, 3, 'insert')}
                        />
                        <div className='apagaEn' onClick={() => { handleInputChange('', 3, ''); setMais2(false) }}>X</div>
                    </span> : <img className='mais' src={mais} onClick={() => { setMais2(true) }} />}


                    <p id='pronto' onClick={() => { save() }}>{Uword.pronto}</p>

                </div>

            </div>
        </div>
    );
}