import React from "react";
import { Link } from "react-router-dom";

import MeusLivros from '../slideLivro/slideLivro.jsx';

import edit from '../../../../imgs/lapis.png';
import editD from '../../../../imgs/lapis-dark.png';

export default function Caixa_livros(props) {

    return (
        <>
            <section className='boxMeulivro'>
                <span className='boxTitle'>
                    <span>
                        <p id='titleLivro'>{props.Uword.meusLivros}</p>
                        <Link to='/IHM/perfil/MeusLivros'><img className='edit' src={props.theme == 'light' ? edit : editD} /></Link>
                    </span>
                </span>

                <Link to='/IHM/perfil/MeusLivros' id='link'><MeusLivros meusOrFav={'meus'} livro={props.livro} comp={'1'} /></Link>

            </section>

            <section className='boxMeulivro'>
                <span className='boxTitle favoo'>
                    <span>
                        <p id='titleLivro'>{props.Uword.meusFavoritos}</p>
                        <Link to='/IHM/perfil/MeusFavoritos'><img className='edit' src={props.theme == 'light' ? edit : editD} /></Link>
                    </span>
                </span>

                <Link to='/IHM/perfil/MeusFavoritos' id='link'><MeusLivros meusOrFav={'fav'} livro={props.livroF} comp={'2'} /></Link>

            </section>

            <div className="space">

            </div>
        </>
    );
}