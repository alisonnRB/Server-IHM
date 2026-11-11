import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import api from "../../../../backend/controler/api_searchFeed";
import Load from "../../../loading/loading.jsx";

import Card from '../cardPost/cardPost.jsx';

export default function Seguindo(props) {
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
        const resposta = await api.enviar(num.current);
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
            <div className='renderPosts'>
                {gera_posts()}
            </div>

            <div className='disparador' ref={ref}>
                {publis == 'nao' ? <p id='notMore'>{props.Uword.noMore}</p> : null}
                {Loadi ? <Load /> : null}
            </div>
        </>
    );
}