import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
    // Armazena a sessão do usuário se disponível no localStorage, ou inicializa como null.
    userSession: JSON.parse(localStorage.getItem('userSession')) || null,
  },
  mutations: {
    // Define o estado global da lista de usuários e salva no localStorage.
    SET_USERS(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users)); 
    },
    // Adiciona um novo usuário à lista e atualiza o localStorage.
    ADD_USER(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    // Atualiza os dados de um usuário existente baseado no ID.
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(state.users)); 
      }
    },
    // Remove um usuário da lista e do localStorage baseado no ID.
    DELETE_USER(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    // Define a sessão do usuário no estado global e salva no localStorage.
    SET_SESSION(state, user) {
      state.userSession = user;
      localStorage.setItem('userSession', JSON.stringify(user)); 
    },
    // Destroi a sessão do usuário no estado global e remove do localStorage.
    DESTROY_SESSION(state) {
      state.userSession = null;
      localStorage.removeItem('userSession'); 
    },
  },
  actions: {
    // Busca os usuários armazenados no localStorage ou faz uma requisição à API.
    fetchUsers({ commit }) {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        // Carrega usuários salvos localmente.
        commit('SET_USERS', JSON.parse(savedUsers));
      } else {
        fetch('https://reqres.in/api/users?page=1')
          .then((response) => response.json())
          .then((data) => {
            const usersWithPassword = data.data.map(user => ({
              ...user,
              password: '123456', // Adiciona a senha padrão para cada usuário.
            }));
            commit('SET_USERS', usersWithPassword); // Salva os usuários retornados da API.
          });
      }
    },
    // Faz uma requisição para editar os dados de um usuário e atualiza o estado global.
    async editUser({ commit }, { userId, userData }) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // Envia os dados atualizados do usuário.
          body: JSON.stringify(userData), 
        });

        if (!response.ok) {
          throw new Error(`Erro ao editar usuário: ${response.status}`);
        }

        // Atualiza os dados do usuário no estado global.
        commit('UPDATE_USER', { id: userId, ...userData }); 
      } catch (error) {
        console.error(error);
        // Lança o erro para ser tratado no componente.
        throw error;
      }
    },
    // Realiza login verificando email e senha na lista de usuários.
    login({ commit, state }, { email, password }) {
      const user = state.users.find(user => user.email === email && user.password === password);

      if (user) {
        // Salva o usuário autenticado no estado global.
        commit('SET_SESSION', user);
        return true;
      } else {
        // Retorna falso caso as credenciais não sejam válidas.
        return false;
      }
    },
    // Faz logout destruindo a sessão do usuário.
    logout({ commit }) {
      // Remove os dados da sessão.
      commit('DESTROY_SESSION');
    },
  },
});
