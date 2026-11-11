import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import './caixa_publi.css';

import Card from '../../feed/cardPost/cardPost.jsx';
import api from "../../../../backend/controler/api_minhasPublis.js";
import Load from "../../../../components/loading/loading.jsx";

export default function Caixa_publi(props) {
    const [publis, setPublis] = useState({});
    const [publicacoes, setPublicacoes] = useState([]);
    const num = useRef(0);
    const [ref, inView] = useInView();

    const [Loadi, setLoad] = useState(false);


    let init = false;

    useEffect(() => {
        if (!init) {
            Busca();
        }

        init = true;
    }, []);

    useEffect(() => {
        if (inView && !Loadi) {
            Busca();
        }
    }, [inView, Loadi]);

    const Busca = async () => {
        if (Loadi || publis == 'nao') {
            return;
        }

        setLoad(true);
        const resposta = await api.enviar('i',num.current);
        if (resposta.ok) {
            setPublis(resposta.informacoes);
            if (resposta.informacoes == 'nao') {
                setLoad(false);
                return;
            } else {
                setPublicacoes((prevPublicacoes) => [
                    ...prevPublicacoes,
                    ...Object.values(resposta.informacoes),
                ]);

                num.current += 20;
            }

        }


        setLoad(false);

    };

    const gera_posts = () => {
        return publicacoes.map((post, index) => (
            <Card key={index} publi={post} />
        ));
    };

    return (
        <>
            <section className='boxMeuPubli'>

                <div className='MyPosts'>
                    {gera_posts()}
                </div>

                <div className='disparador' ref={ref}>
                    {publis == 'nao' ? <p id='notMore'>{props.Uword.noMore}</p> : null}
                    {Loadi ? <Load /> : null}
                </div>


            </section>
        </>
    );
}