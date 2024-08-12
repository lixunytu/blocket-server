<template>
  <div>
    <div v-if="!isEditing">
      <p>Username: {{ profile.username }}</p>
      <p>Email: {{ profile.email }}</p>
      <p>Phone: {{ profile.phone }}</p>
      <button @click="editProfile">Edit</button>
    </div>
    <div v-else>
      <input v-model="profile.username" placeholder="Username" />
      <input v-model="profile.email" placeholder="Email" />
      <input v-model="profile.phone" placeholder="Phone" />
      <button @click="saveProfile">Save</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: {
        username: '',
        email: '',
        phone: ''
      },
      isEditing: false
    };
  },
  methods: {
    async fetchProfile() {
      const response = await axios.get('http://localhost:3000/api/profile');
      this.profile = response.data;
    },
    editProfile() {
      this.isEditing = true;
    },
    async saveProfile() {
      await axios.post('http://localhost:3000/api/profile', this.profile);
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchProfile();
  }
};
</script>

