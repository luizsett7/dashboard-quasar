<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn flat icon="menu" v-if="isAuthenticated" @click="toggleDrawer" aria-label="Menu" />
        <q-btn flat label="Dashboard" @click="$router.push('/dashboard')" v-if="isAuthenticated" />
        <q-btn flat label="Usuários" @click="$router.push('/users')" v-if="isAuthenticated" />
        <q-btn flat label="Sair" @click="logout" v-if="isAuthenticated" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page v-if="isAuthenticated">
        <router-view />
      </q-page>
      <q-page v-else>
        
      </q-page>
    </q-page-container>

    <q-drawer v-model="drawer" bordered>
      <q-list>
        <q-item clickable @click="$router.push('/dashboard')" v-if="isAuthenticated">
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/users')" v-if="isAuthenticated">
          <q-item-section>Usuários</q-item-section>
        </q-item>
        <q-item clickable @click="logout" v-if="isAuthenticated">
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
  },
  computed: {
    userSession() {
      return this.$store.state.userSession;
    },
    isAuthenticated() {
      return this.userSession !== null;
    },
  },
  watch: {
    isAuthenticated(newVal) {
      if (!newVal) {
        this.redirectToLogin();
      }
    },
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.redirectToLogin();
    }
  },
};
</script>

<style scoped>
.q-header {  
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.q-toolbar {
  padding: 0 20px;
}

.q-btn {
  font-weight: bold;
}

.q-page-container {
  background-color: #f4f4f4;
}

.q-drawer {
  background-color: #ffffff;
}

.q-drawer .q-list {
  padding: 0;
}

@media (max-width: 600px) {
  .q-header {
    padding: 0 10px;
  }

  .q-btn {
    font-size: 14px;
  }

  .q-toolbar {
    justify-content: space-between;
  }
}
</style>
