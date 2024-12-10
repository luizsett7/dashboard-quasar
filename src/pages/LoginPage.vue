<template>
  <q-layout>
    <q-page-container>
    <q-page class="login-page">
      <q-card class="login-card shadow-3">
        <q-card-section>
          <div class="text-h6 text-center text-primary">Login</div>
          <div class="text-subtitle2 text-center text-grey">Acesse sua conta</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="email" label="Email" outlined dense clearable />
          <q-input v-model="password" label="Password" type="password" outlined dense clearable />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Login" color="primary" class="full-width" @click="login" />
        </q-card-actions>
      </q-card>
    </q-page>
  </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const success = await this.$store.dispatch('login', { email: this.email, password: this.password });

      if (success) {
        this.$router.push('/dashboard');
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Email ou senha inválidos.',
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>

<style scoped>
.login-page {
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background-color: #ffffff;
}

.q-input {
  margin-bottom: 1rem;
}

.q-btn {
  border-radius: 6px;
}

.text-primary {
  font-weight: bold;
  color: #1976d2;
}

.text-grey {
  color: #757575;
}

.full-width {
  width: 100%;
}
</style>
