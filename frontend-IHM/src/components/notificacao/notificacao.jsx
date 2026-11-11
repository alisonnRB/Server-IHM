import React, { useEffect, useRef, useState } from "react";
import './notificacao.css';
import noti from "../../imgs/notofica.png";
import Card from "./card/card.jsx";

import api from "../../backend/controler/api_notificacao.js";
import ver from "../../backend/controler/api_visuNotifica.js";

import audioSrc from '../../sounds/notificacao.mp3';
import words from './notificacao.json';

export default function Notificações() {
    const [audio] = useState(new Audio(audioSrc));
    const init = useRef(0)

    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [notificar, setNotficar] = useState({});
    const [New, setNew] = useState(false);

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        if (New && init.current > 2) {
            audio.play();
        }
    }, [New])

    useEffect(() => {
        Busca();
        select_idioma();
        const intervalId = setInterval(() => {
            Busca();
        }, 30000);
        return () => clearInterval(intervalId);
    }, []);

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }

    const handleBackgroundClick = (event) => {
        // Verifica se o clique ocorreu no elemento com a classe "fundo-notifica"
        if (event.target.classList.contains("fundo-notifica")) {
            setIsWindowOpen(false);
        }
    };

    const gera_notificacao = () => {
        const list = [];

        if (!notificar || typeof notificar !== 'object') {

            return list;
        }

        const tiposNotificacoes = ['seguidores', 'curtidas-livro', 'curtidas-coment', 'curtidas-publi', 'curtidas-Pcoment', 'livros-coment', 'coment-coment', 'publi', 'favoritos'];

        tiposNotificacoes.forEach((tipo) => {
            if (notificar[tipo] && Array.isArray(notificar[tipo])) {
                notificar[tipo].forEach((info, i) => {
                    let a = <Card key={`${tipo}_${i}`} tipo={tipo} info={info} />;
                    list.push(a);
                });
            }
        });

        function comparacaoAleatoria() {
            return Math.random() - 0.5;
        }

        list.sort(comparacaoAleatoria);
        return list;
    }

    const Busca = async () => {
        const resposta = await api.enviar();
        if (resposta.ok) {
            setNotficar(resposta.informacoes);
            const hasNotifications = resposta.informacoes && typeof resposta.informacoes === 'object' &&
                (Object.values(resposta.informacoes).some(notifArray => notifArray && notifArray.length > 0));
            setNew(hasNotifications);
            init.current += 1;
        }

    }

    const visualizar = async () => {
        const resposta = await ver.enviar();
        if (resposta.ok) {
            setNew(false);
            Busca();
        }
    }

    return (
        <>
            <div className="content-notifica" onClick={() => { setIsWindowOpen(true); }}>
                <img src={noti} />
                {New ? <div className="not-cot"></div> : null}
            </div>

            {isWindowOpen && (
                <div className="fundo-notifica" onClick={(e) => { handleBackgroundClick(e); visualizar(); }}>
                    <div className="box-notifica">
                        <span className="title-notifica">{Uword.noti}</span>
                        <div className="cards-notifica">
                            {gera_notificacao()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
