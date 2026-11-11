import React, { useEffect, useState } from "react";
import Livro from "../../../cardLivro/cardLivro.jsx";
import words from './mostrarLivros.json';

export default function MostraLivros(props) {
    const [livros, setLivros] = useState([]);
    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
    }, []);

    useEffect(() => {
        if (props.mude) {
            setLivros([]);
            props.num.current = 0;

            props.setAtt(true)
        }
    }, [props.mude]);

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi !== "pt" && idi !== "en" && idi !== "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    };

    useEffect(() => {
        if (props.Livro) {
            if (Object.keys(props.Livro).length > 0) {
                setLivros((prevLivros) => {
                    const novosLivros = Object.values(props.Livro);
                    const livrosNaoDuplicados = novosLivros.filter(
                        (novoLivro) => !prevLivros.some((livro) => livro.id === novoLivro.id)
                    );
                    return [...prevLivros, ...livrosNaoDuplicados];
                });
            }
        }
    }, [props.Livro]);

    const renderizarItens = () => {

        const elementos = [];
        let tempRow = [];
        let count = 0;

        for (let i = 0; i < livros.length; i++) {
            count++;
            tempRow.push(<div className="coluna" key={i}><Livro mine={false} info={livros[i]} text={Uword.ler} /></div>);

            if (count === 3 || i === livros.length - 1) {
                count = 0;
                elementos.push(<span className="linha" key={i}>{tempRow}</span>);
                tempRow = [];
            }
        }

        return elementos;
    };

    return (
        <>
            {renderizarItens()}
            <div id="margem"></div>
        </>
    );
}
