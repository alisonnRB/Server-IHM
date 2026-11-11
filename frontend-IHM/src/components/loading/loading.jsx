import React from 'react';
import { useState, useEffect } from 'react';
import './loading.css';

import load from './loading.gif';

export default function Loading(props) {
    const [vira, setVira] = useState(false);
    useEffect(()=>{
        if(props.virar){
            setVira(props.virar);
        }else{
            setVira(false)
        }
    },[props])
    return (
        <div className={`content-load ${vira? 'vira' : null}`}>
            <img src={load} id='loading'/>
        </div>
    );
}