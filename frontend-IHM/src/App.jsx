import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/home/home.jsx';
import Login from './paginas/autenticar/index.jsx';
import Homepage from './paginas/homepage/homePage.jsx';
import NovoLivro from './paginas/novoLivro/novoLivro.jsx';
import Escrever from './paginas/escrever/escrever.jsx';
import Edicao from './paginas/edicao/edicao.jsx';
import Ler from './paginas/ler/ler.jsx';
import Publi from './paginas/novaPubli/novaPubli.jsx';
import PrivateRoute from './privateRoute';
import './App.css';

const themes = {
   dark: {
      '--header-bg': '#041114',
      '--background': '#191F27',
      '--caixa-name': '#FFFFFF',
      '--barra': '#010809',
      '--genero': '#00414A',
      '--letra-p': '#000000',
      '--letra-g': '#FFFFFF',
      '--letra': '#FFFFFF',
      '--caixafeed': '#000000',
      '--enquetevazio': '#FFFFFF',
      '--chat-bg': '#023034',
      '--shadow-contato': '#00647E',
      '--info-contato': '#00414A',
      '--balao-envia-msg': '#FFFFFF',
      '--envia-msg': '#000000',
      '--barra-busca': '#131314',
      '--balão-filtro': '#1B2532',
      '--selecionar-filtro': '#01181B',
      '--escreve-book-bg': '#051012',
      '--deleta-cap': '#000000',
      '--genero-edita-livro': '#00414A',
      '--card-edita-livro': '#000000',
      '--config-edita': '#FFFFFF',
      '--header-edita-livro': '#06333C',
      '--header-edita-livro1': '#5C848A',
      '--fracao-edit-livro': '#7EA7AB',
      '--tags-bg': '#00414A',
      '--botao-tag': '#05323C',
      '--botao-publi': '#1E7F96',
      '--publi-enquete': '#010F10',
      '--publi-enquete1': '#000000',
      '--box-publi-livro': '#031C22',
      '--botão-config': '#023440',
      '--sair-conta': '#05323C',
      '--exclui-conta': '#FF3131',
      '--exclui-conta-hover': '#e94949',
      '--slideCor1': '#13505C',
      '--slideCor2': '#0c4550',
      '--slideCor3': '#00414A',
      '--hover-barra': '#215358',
      '--shadow-search': 'transparent',
      '--shadow-select': 'transparent',
      '--shadow-feed': "transparent",
      '--shadow-card': '#2e313677',
      '--card-livro': '#2E3136',
      '--fundo-barra-cap': '#010809',
      '--apagar-cap': '#fff',
      '--borda': '#fff',
      '--header-publi': '#041114',
      '--fundo-msg': '#000000',
      '--FY': '#13505C',
      '--letra-FY': '#fff',
      '--filtro': '#00000069',
      '--dell-publi': '#02181B',
   },
   light: {
      '--header-bg': '#B7CFD3',
      '--background': '#FFFFFF',
      '--caixa-name': '#000000',
      '--barra': '#EEF7FF',
      '--genero': '#74ABBB',
      '--letra-p': '#FFFFFF',
      '--letra-g': '#3392a6',
      '--letra': '#000000',
      '--caixafeed': '#EBF8FF',
      '--enquetevazio': '#000000',
      '--chat-bg': '#7EA7AB',
      '--shadow-contato': '#3CDBB4',
      '--info-contato': '#5CA5B2',
      '--balao-envia-msg': '#022F39',
      '--envia-msg': '#FFFFFF',
      '--barra-busca': '#F0F8FF',
      '--balão-filtro': '#F0F8FF',
      '--selecionar-filtro': '#CFFBFF',
      '--escreve-book-bg': '#FFFFFF',
      '--deleta-cap': '#F5F5F5',
      '--genero-edita-livro': '#087F97',
      '--card-edita-livro': '#BACFD1',
      '--header-edita-livro': '#688DED',
      '--header-edita-livro1': '#BACFD1',
      '--fracao-edit-livro': '#BACFD1',
      '--tags-bg': '#087F97',
      '--botao-tag': '#688DED',
      '--botao-publi': '#00647E',
      '--publi-enquete': '#CDFFD8',
      '--publi-enquete1': '#CCD7ED',
      '--box-publi-livro': '#FFFFFF',
      '--botão-config': '#EBECF0',
      '--sair-conta': '#5CA5B2',
      '--exclui-conta': '#FF7070',
      '--exclui-conta-hover': '#ff7070c4',
      '--slideCor1': '#BACFD2',
      '--slideCor2': '#7eaeb8',
      '--slideCor3': '#13505C',
      '--hover-barra': '#85B2B7',
      '--shadow-search': '#BACFD2',
      '--shadow-select': '#BACFD2',
      '--shadow-card': '#2e313677',
      '--card-livro': '#f5f5f5',
      '--shadow-feed': "#d0e0e9c8",
      '--fundo-barra-cap': "#F5F5F5",
      '--apagar-cap': '#087F97',
      '--borda': '#7EA7AB',
      '--header-publi': '#B8CED3',
      '--fundo-msg': '#98BEC1',
      '--FY': '#5CA5B2',
      '--letra-FY': '#5CA5B2',
      '--filtro': '#ffffff98',
      '--dell-publi': '#0000',
   },
};

function App() {
   const [theme, setTheme] = useState('no');


   const toggleTheme = () => {
      const tema = localStorage.getItem('tema');
      setTheme(tema);
   };

   const applyTheme = () => {

      const selectedTheme = themes[theme];

      Object.entries(selectedTheme).forEach(([property, value]) => {
         document.documentElement.style.setProperty(property, value);
      });
   };

   useEffect(() => {
      toggleTheme();
   }, []); // Chama toggleTheme uma vez quando o componente é montado

   useEffect(() => {
      if (theme && theme !== 'no') {
         applyTheme();
      }
   }, [theme]);

   return (
      <Router>
         <Routes>
            <Route exact path='*' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/IHM/perfil/MeusLivros/escreva/editar/" element={<PrivateRoute><Edicao /></PrivateRoute>} />
            <Route path="/Ler/" element={<PrivateRoute><Ler /></PrivateRoute>} />
            <Route path="/IHM/*" element={<PrivateRoute><Homepage /></PrivateRoute>} />
            <Route path="/novo-livro" element={<PrivateRoute><NovoLivro /></PrivateRoute>} />
            <Route path="/novaPubli" element={<PrivateRoute><Publi /></PrivateRoute>} />
            <Route path="/IHM/Perfil/MeusLivros/escreva/" element={<PrivateRoute><Escrever /></PrivateRoute>} />
         </Routes>
      </Router>
   );
}

export default App;
