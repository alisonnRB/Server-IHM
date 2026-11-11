import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
  enviar: async (idPubli) => {
    const id = sessionStorage.getItem('session');

    if (!id) {
      setVariavelGlobal(false);
      await auth.enviar();

    }

    let user = {
      id: id,
      idPubli: idPubli,
    };


    let requisição = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    const response = await fetch('https://server-ihm.onrender.com/server/dellPubli.php', requisição);

    const data = await response.json();
    if (data.informacoes == "não autorizado") {
      await auth.enviar();
    }
    return data;
  },
};

