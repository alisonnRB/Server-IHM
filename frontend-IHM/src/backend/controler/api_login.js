
export default {
  enviar: async (email, senha) => {
    //? prepara o objeto para enviar no padrão RESTful
    let login = {
      email: email,
      senha: senha,
    };

    //? prepara as informações de methodo e cabeçalhos para fazer a requisição
    let requisição = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login),
    };

    //TODO faz a requisição
    //! coloque o seu ip ali
    const response = await fetch('https://server-ihm.onrender.com/server/login.php', requisição);

    //TODO espera a resposta do servidor e armazena para retornar ao cliente
    const data = await response.json();
    return data;
  },
};

