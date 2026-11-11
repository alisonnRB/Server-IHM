import React, { useState, useEffect } from "react";
import "./content.css";
import Editor from "../../../components/editor/editor.js";

import api from '../../../backend/controler/api_contentCap';

export default function Paginas(props) {
    const [content, setContent] = useState('');
    const [titulo, setTitulo] = useState('');
    const [sinopse, setSinopse] = useState('');
    const id = localStorage.getItem('id');
    

    useEffect(() => {
        props.setContent(content);
    }, [content]);

    useEffect(() => {
        if (typeof props.titulo === 'string') {

            const tituloObj = JSON.parse(props.titulo);
            if (tituloObj && tituloObj[props.selected]) {
                setTitulo(tituloObj[props.selected]);
                props.setTitulo(tituloObj[props.selected]);
            }
            if (tituloObj[props.selected] === '' || tituloObj[props.selected] == null) {
                setTitulo('');
            }
        }
    }, [props.titulo, props.selected]);

    const title = (event) => {
        setTitulo(event.target.value);
        props.setTitulo(event.target.value);
    };

    useEffect(() => {
        if (props.selected == 0) {
            setSinopse(props.sinopse);
            setContent(props.sinopse);
        } else {
            if (id && props.selected && props.idLivro && props.info.nome) {
                conteudo();
            }

        }
    }, [props.selected, props.sinopse]);

    const conteudo = async () => {
        const response = await api.enviar(id, props.selected, props.idLivro, props.info.nome);
        if (response.ok === true) {
            setContent(response.informacoes);
        } else {
            setContent('');
        }
    };

    return (
        <div className="content-page">
            {props.selected !== 0 ? (
                <span className="caixaCap">
                    <input type="text" value={titulo} onChange={title} />
                </span>
            ) : (
                <span className="caixaCap"></span>
            )}

            <Editor setContent={setContent} sinopse={sinopse} content={content} />
        </div>
    );
}
