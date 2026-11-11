import React from "react";
import './interruptor.css';




export default function Interruptor(props) {


    return (

            <center onClick={props.func ? () => props.func() : null}>
                <h1>{props.title}</h1>
                <input
                    type="checkbox"
                    id={`switch${props.id}`}
                    className="checkbox" 
                    checked={props.alvo} 
                    onChange={()=>{props.setAlvo(!props.alvo)}}/>
                <label htmlFor={`switch${props.id}`} className="toggle">
                </label>
            </center>
   
    );
}