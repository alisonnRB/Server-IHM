import React from "react";
import './novoLivro.css';


import Header from "../../components/header/header";
import Create from './createLivro/createLivro.jsx';


export default function NovoLivro() {
    return (
        <div className="boxNewBook">
            <Header create={true}/>
            <div className="ConfigBook">
                <Create />
            </div>
        </div>
    );

}