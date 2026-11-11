import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
    enviar: async () => {
        const id = sessionStorage.getItem("session");
        if (!id) {
            setVariavelGlobal(false);
            await auth.enviar();

        }

        let idioma = localStorage.getItem("idioma");

        if (!idioma || (idioma != "pt" && idioma != "en" && idioma != "es")) {
            idioma = "en";
        }

        let user = {
            id: id,
            idioma: idioma,
        };

        let requisição = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };

        const response = await fetch('https://server-ihm.onrender.com/server/gender.php', requisição);

        const data = await response.json();
        if (data.informacoes == "não autorizado") {
            await auth.enviar();
        }
        return data;
    },
};

