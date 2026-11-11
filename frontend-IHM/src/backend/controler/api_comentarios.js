import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
    enviar: async (id, tipo) => {
        const it = sessionStorage.getItem('session');

        if (!it) {
            setVariavelGlobal(false);
            await auth.enviar();

        }

        let user = {
            id: id,
            tipo: tipo,
        };

        let requisição = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            //? converte para json
            body: JSON.stringify(user),
        };

        //TODO faz a requisição
        //! coloque o seu ip alii
        const response = await fetch('https://server-ihm.onrender.com/server/busca_comentarios.php', requisição);

        //TODO espera a resposta do servidor e armazena para retornar ao cliente
        const data = await response.json(); //* aguarda um resposta json
        if (data.informacoes == "não autorizado") {
            await auth.enviar();
        }
        return data;
    },
};
