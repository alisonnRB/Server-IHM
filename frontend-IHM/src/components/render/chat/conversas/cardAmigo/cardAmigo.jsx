import React from "react";
import './cardAmigo.css';
import { useState, useEffect, useRef } from "react";

import api from '../../../../../backend/controler/api_info';
import New from '../../../../../backend/controler/api_novaMSG';

import audioSrc from '../../../../../sounds/notificacao.mp3';

import noF from '../../../../../imgs/perfil.png';

export default function CardAmigo(props) {
    const [audio] = useState(new Audio(audioSrc));

    const init = useRef(0);

    const [user, setUser] = useState({});
    const [info, setInfo] = useState({});
    const [foto, setFoto] = useState('');

    const [set, setSet] = useState(false);

    const [novasM, setNovasM] = useState(0);

    const [att, setAtt] = useState(false);


    useEffect(() => {
        if (novasM > 0 && init.current > 2) {
            audio.play();
        }

        init.current += 1;
    }, [novasM])


    useEffect(() => {
        if (props.amigo && props.amigo) {
            setUser(props.amigo);
        }
    }, [props]);

    useEffect(() => {
        if (props.att) {
            setAtt(true);
        }
    }, [props.att]);

    useEffect(() => {
        if (!att) {
            props.setAtt(false);
        } else {
            MSG();
        }
    }, [att])

    useEffect(() => {
        if (user.user_id) {
            Busca();
        }
    }, [user]);

    useEffect(() => {
        if (info && info.id) {
            MSG();
        }
    }, [info])

    useEffect(() => {
        if (props.selecionado === info) {
            setSet(true);
        } else {
            setSet(false);
        }
    }, [props.selecionado])

    useEffect(() => {
        if (typeof info.fotoPerfil == "string") {
            setFoto("https://server-ihm.onrender.com/imagens/" + info.fotoPerfil);
        }
    }, [info.fotoPerfil]);

    const Busca = async () => {
        const resposta = await api.enviar(user.user_id);
        if (resposta.ok) {
            setInfo(resposta.informacoes);
        }
    }

    const MSG = async () => {
        const resposta = await New.enviar(info.id);
        if (resposta.ok) {
            if (resposta.informacoes.New > 99) {
                setNovasM('99+');
            } else {
                setNovasM(resposta.informacoes.New);
            }

            setAtt(false);

        }
    }

    return (
        <li className={`${set ? 'set' : null}`} onClick={() => { props.setSelecionado(info); setNovasM(0); }}>
            <img src={foto} onError={(e) => { e.target.src = noF; }} />
            <div className='nomes'>
                <p>{info.nome ? `@${info.nome}` : '...'}</p>
            </div>

            <div className={`msg-new ${novasM == 0 ? 'not' : null}`} style={novasM < 10 ? { fontSize: '1.2em' } : null}>{novasM != 0 ? novasM : null}</div>
        </li>
    );
}