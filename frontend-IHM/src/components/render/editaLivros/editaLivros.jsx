import React from "react";
import { useState, useEffect } from "react";

import x from '../../../imgs/x.png';
import Selecao from '../.././../components/seleçãoGenero/seleciona.jsx';
import api from '../../../backend/controler/api_newLivro';

import words from './editaLivros.json';

export default function EditaLivros() {

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

    const enviar = async (event) => {
        const formData = new FormData();
        formData.append('image', file);

        const nameBook = event.target.livroNome.value;

        const idUsuario = localStorage.getItem('id');

        const resposta = await api.enviar(idUsuario, formData, nameBook, selecao);

        setFile(null);
        setImagePreview(null);

    };

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

    return (
        <>
            <div className="boxNewBookC">
                <span className="topTitle">
                    <p>{Uword.title}</p>
                    <img src={x} id="xSair" />
                </span>
                <form className="formCreateBook" onSubmit={enviar}>

                    <div className="nomeDoLivro">
                        <input type="text" name="livroNome" className="livroNome" />
                    </div>

                    <div className="capaDoLivro">
                        <div id='fileBoxC'>
                            <label htmlFor="editFile" className='labelBt'>
                                <div className="custom-input">
                                    {imagePreview && <img src={imagePreview} style={{ width: '100%', height: '100%' }} />}
                                </div>
                            </label>
                        </div>

                        <input type="file" id="editFile" name="editFile" onChange={handleImageChange} />
                    </div>

                    <span id="contadora"><p>{conta + '/3'}</p></span>

                    <div className="generosLivro">
                        <Selecao Limit={3} setConta={setConta} setSelecao={setSelecao} />
                    </div>

                    <div className="salvaLivro">
                        <button type="submit">{Uword.continuar}</button>
                    </div>
                </form>
            </div>
        </>
    );
}