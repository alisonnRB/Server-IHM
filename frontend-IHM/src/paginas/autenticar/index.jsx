import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

import logo from "../../imgs/logo.png";
import x from "../../imgs/x.png";

import LoginForm from "./login/index.jsx";
import Cadastro from './forms/form_cadastro.jsx';

export default function Login() {
    const [select, setSelect] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const volta = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fn = new URLSearchParams(location.search).get('cadView');
        if(fn === '1'){
            setSelect(true);
        }else{
            setSelect(false);
        }
    }, [location]);

    return (
        <div id="box">

            <div className='card-log'>
                <span id="head-log">
                    <img src={logo} className='logo-log' />
                    <img src={x} className='x-log' onClick={() => { volta() }} />
                </span>

                <span id="bt-log">
                    <button onClick={() => { setSelect(false) }} className={`bt-log ${!select ? 'this' : ''}`}>LOG-IN</button>
                    <button onClick={() => { setSelect(true) }} className={`bt-log ${select ? 'this' : ''}`}>CADASTRE-SE</button>
                </span>

                <div id='cotente-form-log'>
                    {!select ? <LoginForm /> : <Cadastro setSelect={setSelect} />}
                </div>
            </div>

        </div>
    );
}