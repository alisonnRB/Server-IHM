import React from 'react';
import './conversas.css';
import { useEffect, useState } from 'react';


import api from '../../../../backend/controler/api_buscaamigos';

import Card from './cardAmigo/cardAmigo';

export default function Conversas(props) {
  const [amigos, setAmigos] = useState({});
  const [selecionado, setSelecionado] = useState(0);
  const [att, setAtt] = useState(false);

  useEffect(() => {
    Busca();
  }, [])
 
  useEffect(() => {
    if(props.att){
      setAtt(true);
    }
  }, [props.att]);

  useEffect(()=>{
    if(!att){
      props.setAtt(false);
    }
  },[att])
  

  useEffect(() => {
    props.setSelecionado(selecionado);
  }, [selecionado])

  const Busca = async () => {
    const resposta = await api.enviar();
    if (resposta.ok) {
      setAmigos(resposta.informacoes);
    }
  }

  const gera_amigos = () => {
    const list = [];

    

    for(let i = 0; i<Object.keys(amigos).length;i++){
      let a = <Card key={i} amigo={amigos[i]} setAtt={setAtt} att={att} selecionado={selecionado} setSelecionado={setSelecionado}/>;

      list.push(a);
    }

    return list;
  }




  return (
    <div className='conversas'>
      <ul className='listaC'>

        {gera_amigos()}

      </ul>
    </div>
  );
}
