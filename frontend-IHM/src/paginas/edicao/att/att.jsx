import React from "react";
import './att.css';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import apiBook from '../../../backend/controler/api_InfosLivro';
import api from '../../../backend/controler/api_UpdateLivro';
import apiDell from '../../../backend/controler/api_dellLivro';

import livre from '../../../imgs/livre.jpeg';
import dez from '../../../imgs/dez.jpeg';
import doze from '../../../imgs/doze.jpeg';
import quatorze from '../../../imgs/quatorze.jpeg';
import dezeseis from '../../../imgs/dezeseis.jpeg';
import dezoito from '../../../imgs/dezoito.jpeg';
import deletar from '../../../imgs/delete.png';

import Interruptor from '../../../components/interruptor/interruptor';
import Selecao from '../.././../components/livroSelectGen/select.jsx';
import Tag from '../tags/tags.jsx';

import words from './att.json';

export default function NovoLivro() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = localStorage.getItem('id');

    const [window, setWindow] = useState(false);
    const [theme, setTheme] = useState('light');

    const [imagePreview, setImagePreview] = useState('');
    const [file, setFile] = useState(null);

    const [conta, setConta] = useState(0);
    const [selecao, setSelecao] = useState({
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
    const [tags, setTags] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',

    });

    const [idLivro, setIdLivro] = useState('');

    const [classificacao, setClassificacao] = useState('livre');

    const [openClass, setOpenClass] = useState(false);
    const [close, setClose] = useState('');

    const [visuClass, setVisuClass] = useState(livre);

    const [info, setInfo] = useState('');

    const [Gen, setGen] = useState('');
    const [nome, setNome] = useState('');

    const [color, setColor] = useState('#ffffff');


    const [publico, setPublico] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
        let a = localStorage.getItem('tema');
        if (a) {
            setTheme(a)
        }
    }, [])

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }


    const enviar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        const nameBook = event.target.livroNome.value;


        const resposta = await api.enviar(idLivro, formData, nameBook, selecao, classificacao, publico, finalizado, color, tags);
        if (resposta.ok) {
            navigate(-1);
        }

    };

    const DeletaLivro = async () => {

        const resposta = await apiDell.enviar(idLivro);
        if (resposta.ok) {
            navigate('/IHM/perfil/MeusLivros');
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const selecionaClass = () => {
        return (
            <div className="fundo">
                <div className="opsClass">
                    <img className={`imgC ${close}`} src={livre} onClick={() => { setClassificacao('livre'); setClose('close') }} />
                    <img className={`imgC ${close}`} src={dez} onClick={() => { setClassificacao('dez'); setClose('close') }} />
                    <img className={`imgC ${close}`} src={doze} onClick={() => { setClassificacao('doze'); setClose('close') }} />
                    <img className={`imgC ${close}`} src={quatorze} onClick={() => { setClassificacao('quatorze'); setClose('close') }} />
                    <img className={`imgC ${close}`} src={dezeseis} onClick={() => { setClassificacao('dezeseis'); setClose('close') }} />
                    <img className={`imgC ${close}`} src={dezoito} onClick={() => { setClassificacao('dezoito'); setClose('close') }} />
                </div>
            </div>
        );
    };

    const Busca = async () => {
        const respostaBook = await apiBook.enviar(idLivro);
        if (respostaBook.ok === true) {
            setInfo(respostaBook.informacoes);
        }
    };

    useEffect(() => {
        const idLivroG = new URLSearchParams(location.search).get('id');
        setIdLivro(idLivroG);
    }, []);

    useEffect(() => {
        Busca();
    }, [idLivro]);

    useEffect(() => {
        setGen(info.genero);
        if (id && info.nome && info.imagem) {
            const foto = "https://server-ihm.onrender.com/livros/" + id + "/" + info.nome + '_' + info.id + '/' + info.imagem;
            setImagePreview(foto);
        }
        setNome(info.nome);
        if (info.tema) {
            setColor(info.tema);
        }
        setClassificacao(info.classificacao);
        if (info.publico) {
            let a = info.publico == 1 ? true : false;
            setPublico(a);
        }
        if (typeof info.finalizado) {
            let a = info.finalizado == 1 ? true : false;
            setFinalizado(a);
        }
        if (info.tags != undefined && info.tags) {
            let a = JSON.parse(info.tags);
            setTags(a);
        }
    }, [info, Gen]);

    useEffect(() => {
        switch (classificacao) {
            case 'livre':
                setVisuClass(livre);
                break;
            case 'dez':
                setVisuClass(dez);
                break;
            case 'doze':
                setVisuClass(doze);
                break;
            case 'quatorze':
                setVisuClass(quatorze);
                break;
            case 'dezeseis':
                setVisuClass(dezeseis);
                break;
            case 'dezoito':
                setVisuClass(dezoito);
                break;
        }
    }, [classificacao]);

    useEffect(() => {
        if (close === 'close') {
            setTimeout(() => {
                setClose('');
                setOpenClass(false);
            }, 300)
        }
    }, [close]);

    const handleChange = (event) => {
        setNome(event.target.value);
    };
    const colorChange = (event) => {
        setColor(event.target.value);
    };

    const Janela = () => {
        return (
            <div id="janela">
                <div className="Conteudo">
                    <span id="message">
                        {Uword ? Uword.text1 : '...'}<br></br>
                        {Uword ? Uword.text2 : '...'}
                    </span>
                    <div className="BTcomport">
                        <button onClick={() => { DeletaLivro(); setWindow(false) }} className="BTS s">{Uword ? Uword.ss : '...'}</button>
                        <button onClick={() => { setWindow(false) }} className="BTS n">{Uword ? Uword.n : '...'}</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="boxNewBookC">
            <form className="formCreateBook" onSubmit={enviar}>

                <div className="capaDoLivro">

                    <div className="quad" onClick={() => { setOpenClass(true) }} style={{ backgroundImage: `url(${visuClass})` }}>
                        {openClass ? selecionaClass() : null}
                    </div>

                    <div id='fileBoxC'>
                        <label htmlFor="editFile" className='labelBt'>
                            <div className={`custom-input ${theme == 'light' ? null : 'dark'}`}>
                                {imagePreview && <img src={imagePreview} style={{ width: '100%', height: '100%' }} />}
                            </div>
                        </label>
                    </div>

                    <input type="file" id="editFile" name="editFile" onChange={handleImageChange} />

                </div>

                <div className="Infos">

                    <span id="Nome">

                        <div className="nomeDoLivro">
                            <label htmlFor="livroNome">{Uword.nome}</label>
                            <input type="text" name="livroNome" id="livroNome" value={nome} onChange={handleChange} className="livroNome" />
                        </div>

                        <div id="dell">
                            <img src={deletar} onClick={() => { setWindow(true) }} />
                            {window ? Janela() : null}
                        </div>

                    </span>

                    <div className="GenBoxL">

                        <div className="generosLivro">
                            <Selecao setConta={setConta} setSelecao={setSelecao} Gen={Gen} Quantos={3} />

                        </div>
                        <span id="contadora"><p>{conta + '/3'}</p></span>
                    </div>
                </div>

                <div id="selectColor">
                    <div className="contain">
                        <label htmlFor="head">{Uword.tema} </label>
                        <input type="color" id="head" name="head" value={color} onChange={colorChange} />
                        {color == '#087F97' ? <div className="ocupa"></div> : <div className="circuloDellCor" onClick={() => { setColor('#087F97') }}></div>}
                    </div>
                </div>

                <div className="caixaInter">
                    <Interruptor key={1} id={1} title={Uword.publico} alvo={publico} setAlvo={setPublico} />

                    <Interruptor key={2} id={2} title={Uword.finalizado} alvo={finalizado} setAlvo={setFinalizado} />
                </div>

                <div className="salvaLivro">
                    <button type="submit">{Uword.salvar}</button>
                </div>


            </form >

            <Tag tags={tags} setTags={setTags} />


            <button id="cancel" onClick={() => { navigate(-1) }}>{Uword.cancelar}</button>

        </div >
    );

}