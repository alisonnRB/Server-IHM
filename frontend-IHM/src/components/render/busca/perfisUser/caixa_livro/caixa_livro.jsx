import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';


import Livro from '../../../../cardLivro/cardLivro.jsx';
import Load from "../../../../../components/loading/loading.jsx";
import apiLivros from '../../../../../backend/controler/api_meusLivros.js';

export default function Caixa_publi(props) {
    const [livro, setLivro] = useState([]);
    const [livros, setLivros] = useState([]);
    const num = useRef(0);
    const [ref, inView] = useInView();

    const [Loadi, setLoad] = useState(false);

    let init = false;

    useEffect(() => {
        if (!init && props.idUser) {
            Busca();
        }

        init = true;
    }, [props.idUser]);

    useEffect(() => {
        if (inView && !Loadi && props.idUser) {
            Busca();
        }
    }, [inView, Loadi]);

    const Busca = async () => {
        if (Loadi || livro == 'nao') {
            return;
        }

        setLoad(true);

        const livrinhos = await apiLivros.enviar(props.idUser, num.current);
        if (livrinhos.ok) {
            setLivro(livrinhos.informacoes);
            if (livrinhos.informacoes == 'nao') {
                setLoad(false);
                return;
            } else {
                setLivros((prevLivros) => [
                    ...prevLivros,
                    ...Object.values(livrinhos.informacoes),
                ]);

            }

            num.current += 18;
        }

        setLoad(false);
    }

    const renderizarItens = () => {
        const elementos = [];
        let tempRow = [];
        let count = 0;

        for (let i = 0; i < livros.length; i++) {
            count++;
            tempRow.push(<div className="coluna" key={i}><Livro mine={false} info={livros[i]} text={'vizualizar em modo leitura'} /></div>);

            if (count === 3 || i === livro.length - 1) {
                count = 0;
                elementos.push(<span className="linha" key={i}>{tempRow}</span>);
                tempRow = [];
            }
        }

        return elementos;
    };

    return (
        <section className='boxMeulivroUser' >
            <span className='boxTitleUser'>
            </span>
            <div className='livrosUser'>

                {renderizarItens()}

                <div className='disparador' ref={ref}>
                    {livro == 'nao' ? <p id='notMore'>NÃO HÁ Novas publicações</p> : null}
                    {Loadi ? <Load /> : null}
                </div>

            </div>
        </section>
    );
}