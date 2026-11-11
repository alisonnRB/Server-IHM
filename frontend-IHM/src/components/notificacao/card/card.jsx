import React from "react";
import './card.css';

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../../backend/controler/api_info";
import apiL from "../../../backend/controler/api_InfosLivro";

import words from './card.json';

import noF from '../../../imgs/perfil.png';

export default function Card(props) {
    const [infos, setInfos] = useState({});
    const [user, setUser] = useState({});

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        setInfos(props);
        select_idioma();
    }, [props])

    useEffect(() => {
        if (infos && infos.info) {
            Busca();
        }
    }, [infos.info])


    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }

    const Busca = async () => {
        if (infos.tipo == 'seguidores') {
            const resposta = await api.enviar(infos.info.user_id);
            if (resposta.ok) {
                setUser(resposta.informacoes);
            }
        } else if (infos.tipo == 'curtidas-livro' || infos.tipo == 'curtidas-coment' || infos.tipo == 'curtidas-publi' || infos.tipo == "curtidas-Pcoment") {
            const resposta = await api.enviar(infos.info.id_user);
            if (resposta.ok) {
                setUser(resposta.informacoes);
            }
        } else if (infos.tipo == 'livros-coment' || infos.tipo == "coment-coment" || infos.tipo == "publi") {
            const resposta = await api.enviar(infos.info.user);
            if (resposta.ok) {
                setUser(resposta.informacoes);
            }
        } else if (infos.tipo == 'favoritos') {
            const resposta = await apiL.enviar(infos.info.id_livro);
            if (resposta.ok) {
                setUser(resposta.informacoes);
            }
        }

    }

    const Action = () => {
        switch (infos.tipo) {
            case 'seguidores':
                return Uword.seguiu;
            case 'curtidas-livro':
                return Uword.curtiu;
            case "livros-coment":
                return Uword.comentou;
            case "curtidas-coment":
                return Uword.curti_coment;
            case "curtidas-publi":
                return Uword.curti_publi;
            case "curtidas-Pcoment":
                return Uword.coment_publi;
            case "coment-coment":
                return Uword.reply;
            case "publi":
                return Uword.M_Publi;
            case "favoritos":
                return Uword.Novi;

        }
    }


    return (
        <span className="not-card">
            <Link id="linky" to={(infos.tipo === 'favoritos')
                ? `/Ler/?id=${encodeURIComponent(JSON.stringify(user.id))}`
                : `/IHM/Busca/user?id=${encodeURIComponent(JSON.stringify(user.id))}`}>
                <img src={
                    (infos.tipo === 'favoritos' && user.imagem)
                        ? `https://server-ihm.onrender.com/livros/${user.user_id}/${user.nome}_${user.id}/${user.imagem}`
                        : (user.fotoPerfil ? `https://server-ihm.onrender.com/imagens/${user.fotoPerfil}` : '')
                } onError={(e) => { e.target.src = noF; }} />
            </Link>
            <div className="not-content">
                <span className="not-nome">{infos.tipo == 'favoritos' ? user.nome : `@${user.nome}`}</span>
                <span className="not-not">{Action()}</span>
            </div>
        </span>
    );
}