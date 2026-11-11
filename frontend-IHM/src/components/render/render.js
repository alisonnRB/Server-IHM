import React from 'react';
import {Routes, Route} from 'react-router-dom';


import './render.css';

import Perfil from './perfil/perfil.jsx';
import Livros from './livros/livros.jsx';
import Chat from './chat/chat.jsx';
import Feed from './feed/feed.jsx';
import Option from './option/option.jsx';
import Gender from './favGender/gender.jsx';
import MeusLivros from './perfil/meusLivros/meusLivros.jsx';
import MeusFav from './perfil/meusFav/meusFav.jsx';
import EditaLivros from './editaLivros/editaLivros.jsx';
import Busca from './busca/busca.jsx';
import User from './busca/perfisUser/perfisUser.jsx';
//? o componente render é reponsavel por renderizar as paginas do site

function Render(props) {
  //? o render está recebendo os paramentors por props para fazer a construção da page
  return (
    <div className='render' id='render'>
      <Routes>
        <Route path='/perfil' element={<Perfil />}></Route>
        <Route path='/perfil/gender' element={<Gender user={props.user}/>}></Route>
        <Route path='/perfil/MeusLivros' element={<MeusLivros/> }></Route>
        <Route path='/perfil/MeusFavoritos' element={<MeusFav/> }></Route>
        <Route path='/perfil/editaLivros' element={<EditaLivros/> }></Route>
        <Route path='/Busca' element={<Busca user={props.user}/> }></Route>
        <Route path='/Busca/user' element={<User/>}></Route>
        <Route path='/Livros' element={<Livros />}></Route>
        <Route path='/Chat' element={<Chat />}></Route>
        <Route path='/Feed' element={<Feed />}></Route>
        <Route path='/Config' element={<Option />}></Route>
      </Routes>
    </div>
    );
  }
  
  export default Render;