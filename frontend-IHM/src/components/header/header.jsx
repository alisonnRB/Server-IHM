import React from 'react';
import './header.css';
import { useState, useEffect } from 'react';

import logo from '../../imgs/logo.png';
import logoD from '../../imgs/logo-dark.png';

function Header(props) {
    const [theme, setTheme] = useState('light');

    useEffect(()=>{
        if(props.create){
            let a = localStorage.getItem('tema');
            if(a){
                setTheme(a);
            }
        }
    },[props])

 return (
    <header>
        <img id='logoH' src={theme == 'dark' ?  logoD : logo}></img>
    </header>
 );
}

export default Header;