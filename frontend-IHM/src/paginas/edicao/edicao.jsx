import React from "react";
import './edicao.css';


import Header from "../../components/header/header";
import Att from './att/att.jsx';


export default function NovoLivro() {
    return (
        <div className="boxNewBook">
            <Header create={true}/>
            <div className="ConfigBook">
                <Att />
            </div>
        </div>
    );

}