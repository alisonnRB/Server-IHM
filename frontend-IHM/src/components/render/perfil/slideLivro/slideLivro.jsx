import React from "react";
import { useState, useEffect } from "react";
import './slideLivro.css';

export default function MeusLivros(props) {
    const [hover, setHover] = useState('');
    const [livro, setLivro] = useState([<div key={0}></div>]);
    const [starDeFundo, setstarDeFundo] = useState([]);
    const [starDeFront, setstarDeFront] = useState([]);
    const [mineOrFav, setMineOrFav] = useState('');

    function createStar(classe, i) {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5 + 1}s`,
        };

        return (
            <div key={`star-${i}${props.comp}`} className={`${classe} ${mineOrFav}`} style={style}></div>
        );
    }

    useEffect(() => {
        const classe = ['star', 'starFundo'];
        const numStars = 10;
        const listStarFundo = [];
        const listStar = [];

        if (props.meusOrFav) {
            setMineOrFav(props.meusOrFav);
        }

        for (let i = 0; i < numStars; i++) {
            const star = createStar(classe[0], i);
            listStar.push(star);
        }
        for (let i = 0; i < numStars * 3; i++) {
            const starFundo = createStar(classe[1], i);
            listStarFundo.push(starFundo);
        }
        if (props.livro && props.meusOrFav == 'meus') {
            setLivro(meusLivros(props.livro, localStorage.getItem('id')));
        }
        if (props.livro && props.meusOrFav == 'fav') {
            setLivro(MeusFav(props.livro));
        }
        setstarDeFundo(listStarFundo);
        setstarDeFront(listStar);

    }, [props]);

    const passarLiga = () => {

        setHover('hover');

        setTimeout(() => {
            if (hover != 'hover') {
                setHover('');
            }
        }, 10000);

    }

    const meusLivros = (livros) => {
        const tempRow = [];
        for (let i = 0; i < livros.length; i++) {
            const a = "https://server-ihm.onrender.com/livros/" + livros[i].user_id + '/';
            tempRow.push(<img key={`livro-${i}`} className='imagemCapa' src={a + livros[i]['nome'] + '_' + livros[i]['id'] + '/' + livros[i]['imagem']} />);
            if (i >= 6) {
                break;
            }
        }
        return tempRow;
    }

    const MeusFav = (livros) => {

        const tempRow = [];
        for (let i = 0; i < Object.keys(livros).length; i++) {
            let a = "https://server-ihm.onrender.com/livros/" + livros[i].user_id + '/';


            tempRow.push(<img key={`livro-${i}`} className='imagemCapa' src={a + livros[i]['nome'] + '_' + livros[i]['id'] + '/' + livros[i]['imagem']} />);
            if (i >= 6) {
                break;
            }
        }
        return tempRow;
    }

    return (
        <span className='slidersLivros'>

            <div className={'caixaDeLivros'} onMouseEnter={passarLiga}>
                <div className='animation'>
                    {starDeFront}{starDeFundo}

                    <div className={`content ${hover}`}>
                        <span className='roler'>
                            {livro}
                        </span>
                    </div>
                </div>
            </div>

        </span>
    );
}