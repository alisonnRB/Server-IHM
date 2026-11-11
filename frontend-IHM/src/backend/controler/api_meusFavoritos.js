import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
    enviar: async () => {
        const id = sessionStorage.getItem("session");
        if (!id) {
            setVariavelGlobal(false);
            await auth.enviar();

        }
        //? prepara o objeto para enviar no padrão RESTful
        let user = {
            id: id
        };

        //? prepara as informações de methodo e cabeçalhos para fazer a requisição
        let requisição = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            //? converte para json
            body: JSON.stringify(user),

        };
        //TODO faz a requisição
        //! coloque o seu ip ali
        const response = await fetch('https://server-ihm.onrender.com/server/meusFavoritos.php', requisição);


        //TODO espera a resposta do servidor e armazena para retornar ao cliente
        const data = await response.json(); //* aguarda um resposta json
        if (data.informacoes == "não autorizado") {
            await auth.enviar();
        }
        return data;
    },
};