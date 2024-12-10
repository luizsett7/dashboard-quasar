import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
    userSession: JSON.parse(localStorage.getItem('userSession')) || null,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users)); 
    },
    ADD_USER(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(state.users)); 
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(state.users)); 
    },
    SET_SESSION(state, user) {
      state.userSession = user;
      localStorage.setItem('userSession', JSON.stringify(user)); 
    },
    DESTROY_SESSION(state) {
      state.userSession = null;
      localStorage.removeItem('userSession'); 
    },
  },
  actions: {
    fetchUsers({ commit }) {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        commit('SET_USERS', JSON.parse(savedUsers));
      } else {
        fetch('https://reqres.in/api/users?page=1')
          .then((response) => response.json())
          .then((data) => {
            const usersWithPassword = data.data.map(user => ({
              ...user,
              password: '123456', 
            }));
            commit('SET_USERS', usersWithPassword);
          });
      }
    },
    async editUser({ commit }, { userId, userData }) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`Erro ao editar usuário: ${response.status}`);
        }

        commit('UPDATE_USER', { id: userId, ...userData });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    login({ commit, state }, { email, password }) {
      const user = state.users.find(user => user.email === email && user.password === password);

      if (user) {
        commit('SET_SESSION', user);
        return true;
      } else {
        return false;
      }
    },
    logout({ commit }) {
      commit('DESTROY_SESSION');
    },
  },
});
