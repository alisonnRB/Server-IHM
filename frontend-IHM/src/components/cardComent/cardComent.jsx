import React from "react";
import './cardComent.css';
import { useState, useEffect } from "react";


import api from '../../backend/controler/api_info';
import curtida from '../../backend/controler/api_curtir';
import like from '../../imgs/like.png';
import likeD from '../../imgs/like-dark.png';
import enviar from '../../imgs/enviar.png';

import noF from '../../imgs/perfil.png';
import words from './cardComent.json';

import audioSrc from '../../sounds/curtida.mp3';

export default function Comentarios(props) {
    const [audio] = useState(new Audio(audioSrc));

    const CurtiPlay = () => {
        if (!curtido) {
            audio.play();
        }

    };

    const [theme, setTheme] = useState('light');
    const [infos, setInfos] = useState('');
    const [data, setData] = useState('');
    const [dataTime, setDataTime] = useState('');

    const [curt, setCurt] = useState(0);
    const [auxCurti, setAuxCurt] = useState(false);
    const [statInit, setStatInit] = useState(false);

    const [user, setUser] = useState('');
    const [foto, setFoto] = useState('');

    const [resposta, setResposta] = useState('');

    const [salva, setSalva] = useState(false);

    const [nomeRes, setNomeRes] = useState(false);

    const [curtido, setCurtido] = useState(false);
    const [quantCurti, setQuantCurti] = useState(0);

    const [Uword, setUword] = useState("en");

    useEffect(() => {
        select_idioma();
        let a = localStorage.getItem('tema');
        if (a) {
            setTheme(a);
        }
    }, [])

    const select_idioma = () => {
        let idi = localStorage.getItem('idioma');
        if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
            idi = "en";
        }
        let word = words[idi];
        setUword(word);
    }

    const Busca = async (i) => {
        if (i) {
            const response = await api.enviar(infos.user);
            if (response.ok) {
                setUser(response.informacoes);
            }
        } else {
            const response = await api.enviar(props.idRes);
            if (response) {
                setNomeRes(response.informacoes.nome);
            }
        }
    }


    const respondendo = (event) => {
        event.preventDefault();

        props.setTexto(resposta);
        props.setResposta(true);
        props.setIdResposta(infos.id);
        props.setConversa(props.idConv);
        setResposta('');

        setSalva(true);
    }

    const curtir = async () => {
        const resposta = await curtida.enviar(infos.id_ref, props.tipo, infos.id);
        if (resposta.ok) {
            props.setCurtindo(true);
        }
    }


    useEffect(() => {
        if (props.curtidas != 'none') {
            let keys = Object.keys(props.curtidas).length;
            let id = localStorage.getItem('id');
            for (let i = 0; i < keys; i++) {
                if (props.curtidas[i].id_user == id && infos.id == props.curtidas[i].coment) {
                    setCurtido(true);
                    if (curt !== 1) {
                        setStatInit(true);
                    }
                    return;
                }
            }
        }
        setCurtido(false);

    }, [props.curtidas, infos]);

    useEffect(() => {
        if (infos['curtidas'] && typeof infos['curtidas'] != "number") {
            infos['curtidas'] = JSON.parse(infos['curtidas']);
        }
        if (curt === 1) {
            let a = infos['curtidas'];
            if (statInit) {
                if (curtido) {
                    a -= 1;
                }
            } else {
                if (!curtido) {
                    a += 1;
                }
            }

            if (infos['curtidas'] > 1000000) {
                a = infos['curtidas'] / 1000000 + 'M';
            }
            else if (infos['curtidas'] > 1000) {
                a = infos['curtidas'] / 1000 + 'K';
            }
            setQuantCurti(a);
        }
    }, [auxCurti])

    useEffect(() => {
        if (props.res) {
            Busca(false);
        }
    }, [props.res]);

    useEffect(() => {
        setResposta(props.rest);
    }, [props.rest])

    useEffect(() => {
        if (salva) {
            props.Comentar();
            setSalva(false);
        }

    }, [salva])

    useEffect(() => {
        setInfos(props.infos);

    }, [props.infos]);

    useEffect(() => {
        if (infos && infos['curtidas']) {
            let a = infos['curtidas'];
            if (infos['curtidas'] > 1000000) {
                a = infos['curtidas'] / 1000000 + 'M';
            }
            else if (infos['curtidas'] > 1000) {
                a = infos['curtidas'] / 1000 + 'K';
            }
            setQuantCurti(a);
        }
    }, [infos]);

    useEffect(() => {
        if (infos.user) {
            Busca(true);
        }
    }, [infos.user]);

    useEffect(() => {
        if (typeof user.fotoPerfil == "string") {
            setFoto("https://server-ihm.onrender.com/imagens/" + user.fotoPerfil);
        }
    }, [user.fotoPerfil]);

    useEffect(() => {
        if (infos.tempo) {
            const dataAtual = new Date();
            const dataFornecida = new Date(infos.tempo);
            const diferencaEmMilissegundos = dataAtual - dataFornecida;
            const diasDecorridos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            let tempo = 0;
            let time = '';

            if (diasDecorridos > 365) {
                tempo = diasDecorridos % 365;
                time = tempo > 1 ? Uword.ano : Uword.anos;
            }
            else if (diasDecorridos > 30) {
                tempo = diasDecorridos % 30;
                time = tempo > 1 ? Uword.mes : Uword.meses;
            }
            else if (diasDecorridos > 7) {
                tempo = diasDecorridos % 7;
                time = tempo > 1 ? Uword.semana : Uword.semanas;
            }
            else {
                tempo = diasDecorridos;
                time = tempo < 2 ? Uword.hoje : Uword.dias;

            }

            setData(tempo);
            setDataTime(time);
        }
    }, [infos.tempo]);

    const style = {
        backgroundColor: curtido
            ? (props.cor ? props.cor : '#C4BFB2') : null
    };

    return (
        <>
            <span id="comentary">
                <img className="userComent" src={foto} onError={(e) => { e.target.src = noF; }} />

                <div className="boxComent" >
                    <span className="nomeComent">{user.nome && !props.res ? user.nome : `${user.nome} > ${nomeRes}`}</span>
                    <div className="coment">{infos.texto ? infos.texto : '...'}</div>
                </div>

                <div className="btsCurti" >
                    <div className={`boxDEimg ${curtido ? 'c' : ''}`} style={style}>
                        <img src={theme == 'light' ? like : likeD} className={`core`} onClick={() => { curtir(); CurtiPlay(); setCurt(1); setAuxCurt(!auxCurti); }} />
                    </div>
                    <span className="likeNUM">{quantCurti}</span>
                </div>
            </span>

            <span id="infosComent" onClick={(e) => { e.stopPropagation() }} >
                <p>{`${dataTime != Uword.hoje ? Uword.ha : ''} ${dataTime != Uword.hoje ? data : ''} ${dataTime}`} </p>
                <p className="reply" onClick={() => { props.setOpenRes(props.chave) }} style={props.cor && props.cor != '' ? { color: props.cor } : { color: '#0A6E7D' }}>{Uword.reply}</p>
                {!props.res ? <p className="seeReply" style={{ color: props.cor ? props.cor : '' }} onClick={() => {
                    if (props.setVerMais) {
                        if (props.verMais === props.idConv) {
                            props.setVerMais('');
                        } else {
                            props.setVerMais(props.idConv);
                        }
                    }
                }}>{props.verMais == props.idConv ? <>&#8743;</> : <>&#8744;</>}</p> : null}
            </span>

            {props.openRes == props.chave ?
                <form id="resposta" onClick={(e) => { e.stopPropagation() }} onSubmit={(event) => { respondendo(event) }}>
                    <input type="text" placeholder={Uword.place} value={resposta} onChange={(event) => { setResposta(event.target.value) }} /><img id="enviaRes" onClick={(event) => { respondendo(event) }} src={enviar} />
                </form> : null}


        </>
    );
}