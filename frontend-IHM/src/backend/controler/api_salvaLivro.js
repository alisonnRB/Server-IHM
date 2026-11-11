import auth from "./api_autenticar";
import { setVariavelGlobal } from "../../GvarAuth";

export default {
  enviar: async (text, cap, id, titulo) => {
    const id_user = sessionStorage.getItem('session');
    if (!id_user) {
      setVariavelGlobal(false);
      await auth.enviar();

    }
    let user = {
      text: text,
      cap: cap,
      id: id,
      titulo: titulo,
      idUser: id_user,
    };

    if (!id) {
      var resposta = { ok: false };
      return resposta;
    }

    let requisição = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    const response = await fetch('https://server-ihm.onrender.com/server/salvaLivros.php', requisição);

    const data = await response.json();
    if (data.informacoes == "não autorizado") {
      await auth.enviar();
    }
    return data;
  },
};

