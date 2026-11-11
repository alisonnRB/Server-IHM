import React from "react";
import './cardLivro.css';
import { useState, useEffect } from "react";



export default function CardLink(props) {
    const [semIMG, setSemImg] = useState(false);
    const [livro, setLivro] = useState();
    const [foto, setFoto] = useState('');

    useEffect(() => {
        setLivro(props.livro);
    }, [props]);

    useEffect(() => {
        if (livro && livro.imagem) {
            setSemImg(false);
            setFoto("https://server-ihm.onrender.com/livros/" + livro.user_id + '/' + livro.nome + '_' + livro.id + '/' + livro.imagem);
        } else {
            setSemImg(true);
        }
    }, [livro]);


    const selecionar = () => {
        let selecao = {
            'id': livro.id,
            'imagem': foto,
            'nome': livro.nome
        }
        props.setSelecionado(selecao);
    }

    return (
        <div className="CardLink" onClick={() => { selecionar() }}>
            <span className="content">
                {semIMG ? null : <img src={foto} id="capa" />}

                {semIMG ?
                    <div className="noIMAGE">
                        {livro && livro.nome ? livro.nome : null}
                    </div> : null}

                <div className="caixaInfo">
                    <span className="boxNome" >{livro && livro.nome ? livro.nome : null}</span>
                    <span className="boxSinopse" dangerouslySetInnerHTML={{ __html: livro && livro.sinopse ? livro.sinopse : null }}></span>
                </div>
            </span>
        </div>
    );
}