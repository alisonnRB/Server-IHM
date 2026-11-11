import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
    enviar: async (idLivro, formData, nome, selecao, classificacao, publico, finalizado, color, tag) => {
        //? recebe um objeto formData e adiciona as informações que faltam 
        const id = sessionStorage.getItem('session');

        if (!id) {
            setVariavelGlobal(false);
            await auth.enviar();

        }

        formData.append('id', id);
        formData.append('color', color);
        formData.append('tags', JSON.stringify(tag));
        formData.append('idLivro', idLivro);
        formData.append('nome', nome);
        formData.append('selecao', JSON.stringify(selecao));
        formData.append('classificacao', classificacao);
        formData.append('publico', publico);
        formData.append('finalizado', finalizado);


        //TODO faz a requisição
        //! coloque o seu ip ali
        const response = await fetch('https://server-ihm.onrender.com/server/UpdateLivro.php', {
            method: 'POST',
            body: formData,
        });

        //TODO espera a resposta do servidor e armazena para retornar ao cliente
        const data = await response.json();
        if (data.informacoes == "não autorizado") {
            await auth.enviar();
        }
        return data;
    },
};
