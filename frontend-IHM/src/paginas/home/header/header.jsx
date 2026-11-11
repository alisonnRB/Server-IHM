import React, { useEffect, useState } from 'react';
import './header.css';

import { Link } from 'react-router-dom';
import logo from '../../../imgs/logo.png';

function head() {
  //TODO passa como propriedades as informações(user) do usuario para os elementos filhos acessarem
  return (
    <header className='MAIN'>
      <span className='caixa-left'>
        <img src={logo} id='logoMAIN' />

        <Link to='/login/?cadView=0'><button className='btMA'>Login</button></Link>
        <Link to='/login?cadView=1'><button className='btMA'>Cadastre-se</button></Link>
      </span>
    </header>
  );
}

export default head;
