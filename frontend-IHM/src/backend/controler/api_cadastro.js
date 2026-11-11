import auth from "./api_autenticar";

export default {
  //TODO de maneira assincrona a api recebe os paramentros e envia
  enviar: async (nome, email, senha, confSenha) => {
    //? prepara o objeto para enviar no padrão RESTful
    let user = {
      nome: nome,
      email: email,
      senha: senha,
      confSenha: confSenha,
    };

    //? prepara as informações de methodo e cabeçalhos para fazer a requisição
    let requisição = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      //? converte para json
      body: JSON.stringify(user),
    };

    //TODO faz a requisição
    //! coloque o seu ip alii
    const response = await fetch('https://server-ihm.onrender.com/server/cadastro.php', requisição);

    //TODO espera a resposta do servidor e armazena para retornar ao cliente
    const data = await response.json(); //* aguarda um resposta json
    if (data.informacoes == "não autorizado") {
      await auth.enviar();
    }
    return data;
  },
};




