<template>
  <q-page padding>
    <div class="q-gutter-md">
      <q-btn label="Adicionar Usuário" color="primary" @click="openAddModal" />
      <q-list bordered class="shadow-2 rounded bg-white">
        <q-item v-for="user in users" :key="user.id" clickable>
          <q-item-section>
            <img :src="user.avatar" alt="Avatar" width="100" />
          </q-item-section>
          <q-item-section>
            <div class="text-weight-medium user-list-name">{{ user.first_name }} {{ user.last_name }}</div>
            <div class="text-caption text-grey user-list-email">{{ user.email }}</div>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="edit" flat @click="openEditModal(user)" color="primary" />
            <q-btn icon="delete" flat color="negative" @click="deleteUser(user.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="addModal">
      <q-card style="max-width: 400px;" class="q-px-md">
        <q-card-section>
          <div class="text-h6">Adicionar Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-input class="modal-input" v-model="newUserForm.first_name" label="Primeiro Nome" outlined dense />
          <q-input class="modal-input" v-model="newUserForm.last_name" label="Último Nome" outlined dense />
          <q-input class="modal-input" v-model="newUserForm.email" label="Email" type="email" outlined dense />
          <q-input class="modal-input" v-model="newUserForm.password" label="Senha" type="password" outlined dense />
        </q-card-section>
        <q-card-actions class="justify-center">
          <q-btn label="Adicionar" color="primary" @click="saveNewUser" class="q-mb-md" />
          <q-btn label="Cancelar" flat @click="closeAddModal" class="q-mb-md" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editModal">
      <q-card style="max-width: 400px;" class="q-px-md">
        <q-card-section>
          <div class="text-h6">Editar Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-input class="modal-input" v-model="editUserForm.first_name" label="Primeiro Nome" outlined dense />
          <q-input class="modal-input" v-model="editUserForm.last_name" label="Último Nome" outlined dense />
          <q-input class="modal-input" v-model="editUserForm.email" label="Email" type="email" outlined dense />
          <q-input class="modal-input" v-model="editUserForm.password" label="Senha" type="text" outlined dense />
        </q-card-section>
        <q-card-actions class="justify-center">
          <q-btn label="Salvar" color="primary" @click="saveUserEdits" class="q-mb-md" />
          <q-btn label="Cancelar" flat @click="closeEditModal" class="q-mb-md" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
  
<script>
export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      newUserForm: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
      editUserForm: {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    openAddModal() {
      this.newUserForm = { first_name: "", last_name: "", email: "", password: "" };
      this.addModal = true;
    },
    closeAddModal() {
      this.addModal = false;
      this.newUserForm = { first_name: "", last_name: "", email: "", password: "" };
    },
    saveNewUser() {
      const newUser = {
        id: Date.now(),
        ...this.newUserForm,
      };
      this.$store.commit("ADD_USER", newUser);
      this.$q.notify({
        type: "positive",
        message: "Usuário adicionado com sucesso!",
      });
      this.closeAddModal();
    },
    openEditModal(user) {
      this.editUserForm = { ...user };
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
      this.editUserForm = { id: null, first_name: "", last_name: "", email: "", password: "" };
    },
    async saveUserEdits() {
    try {
      const updatedUser = await this.$store.dispatch('editUser', {
        userId: this.editUserForm.id,
        userData: this.editUserForm,
      });
      this.$q.notify({
        type: 'positive',
        message: 'Usuário atualizado com sucesso!',
      });
      this.closeEditModal();
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Erro ao atualizar usuário.',
      });
    }
  },
    deleteUser(userId) {
      this.$store.commit("DELETE_USER", userId);
      this.$q.notify({
        type: "negative",
        message: "Usuário deletado.",
      });
    },
  },
  mounted() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>
  
<style>
.q-page {
  max-width: 800px;
  margin: auto;
}
.full-width {
  width: 100%;
}
.q-card {
  border-radius: 8px;
}
.q-list {
  margin-top: 1rem;
}
.q-item {
  display: flex;
  align-items: center;  
}
.q-item-section {
  padding: 0 0.5rem;
}
.user-list-name {
  font-size: 1.2em;
}
.user-list-email {
  font-size: 1em;
}
.modal-input{
  margin-top: 5px;
}
</style>