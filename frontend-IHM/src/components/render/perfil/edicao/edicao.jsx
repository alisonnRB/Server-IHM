import { useState, useEffect } from 'react';
import React from "react";
import './edicao.css';

import api from '../../../../backend/controler/api_edição';
import sair from '../../../../imgs/sair.png';

import words from './edicao.json';

export default function Edit(props) {
    const [imagePreview, setImagePreview] = useState(props.ft);
    const [file, setFile] = useState(null);
    const [respost, setRespost] = useState('');

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


    //TODO função que atualiza dos estados da imagem e nome em tempo real para ter uma preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null); // Adicione esta linha para lidar com nenhum arquivo selecionado
        }
    };



    //TODO manda para a api para que seja feito o update no banco de dados
    const alterar = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const userName = event.target.newName.value;

        const resposta = await api.enviar(formData, userName);

        setFile(null);
        setImagePreview(null);

        if (resposta.ok) {
            props.fecharEdicao(true);
        } else {
            setRespost(resposta.informacoes);
        }
    };

    return (
        <div className='edicao' onClick={() => { props.fecharEdicao(false) }}>

            <div className='boxEdita' onClick={(event) => event.stopPropagation()}>
                <span id='fechaEdita' ><img src={sair} id='sairEdita' onClick={props.fecharEdicao} /></span>
                <form onSubmit={alterar}>

                    <div id='fileBox'>
                        <label htmlFor="editFile" className='labelBt'>
                            <div className="custom-input" style={imagePreview ? { backgroundImage: 'none' } : null}>
                                {imagePreview ? <img src={imagePreview} style={{ width: '100%', height: '100%', borderRadius: '100%', objectFit: 'cover' }} /> : null}
                            </div>
                        </label>
                    </div>
                    <input type="file" id="editFile" name="editFile" onChange={handleImageChange} />

                    <input type="text" id="editNome" name="newName" placeholder={props.user} />

                    <p className='msgEdicao'>{respost}</p>

                    <div className='enviaBox'>
                        <input type="submit" className="btOculto" value={Uword.enviar} />
                    </div>

                </form>
            </div>
        </div>
    );
}
