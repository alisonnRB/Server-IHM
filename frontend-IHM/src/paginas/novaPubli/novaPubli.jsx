import React from "react";
import './novaPubli.css';
import { useNavigate } from "react-router-dom";

import x from "../../imgs/cancel.png";

import Header from '../../components/header/header';
import Card from './cardPubli/cardPubli.jsx';

export default function NovaPubli() {
    const navigate = useNavigate();


    return (
        <div className="telaPubli">
            <Header create={true}/>
            <span id="cancelPubli">
                <img src={x} id="cancelar" onClick={()=>{navigate(-1)}} />
            </span>
            <div className="boxPubli">
                <Card/>
            </div>
        </div>
    );
}