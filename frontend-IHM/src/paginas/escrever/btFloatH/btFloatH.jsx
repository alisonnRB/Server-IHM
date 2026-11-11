import React, { useState, useEffect } from "react";
import './btFloatH.css';
import { Link } from "react-router-dom";


export default function BtFloat() {
    const [theme, setTheme] = useState('light');

    useEffect(()=>{
        let a = localStorage.getItem('tema');
        if(a){
            setTheme(a);
        }
    },[])
    return (
        <>
            <Link id="linnk" to='/IHM/perfil'>
                <div className={`btFloat ${theme == 'light' ? null : 'dark'}`}>

                </div>
            </Link>
        </>
    );

}