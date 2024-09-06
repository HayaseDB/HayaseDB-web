<template>
  <div class="profile-settings">
    <h1 class="text-primary gradient-animation">Profile Settings</h1>
    <form @submit.prevent="submitForm">
      <!-- Profile Picture -->
      <div class="form-group profile-picture-container">
        <label for="profile-picture" class="text-secondary">Profile Picture</label>
        <div class="profile-picture-upload">
          <img :src="profilePicture" alt="Profile Picture" class="profile-picture-preview" />
          <input type="file" id="profile-picture" @change="handlePictureChange" accept="image/*" class="file-input" />
        </div>
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="username" class="text-secondary">Username</label>
        <input autocomplete="username" type="text" id="username" v-model="username" class="input-field" />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email" class="text-secondary">Email</label>
        <input type="email" id="email" v-model="email" class="input-field" />
      </div>

      <!-- Old Password -->
      <div class="form-group">
        <label for="password" class="text-secondary">Old Password</label>
        <input autocomplete="current-password" type="password" id="password" v-model="password" class="input-field" placeholder="Enter old password" />
      </div>

      <!-- New Password and Confirm Password -->
      <div class="password-group">
        <div class="form-group">
          <label for="new-password" class="text-secondary">New Password</label>
          <input autocomplete="new-password" type="password" id="new-password" v-model="password" class="input-field" placeholder="Enter new password" />
        </div>
        <div class="form-group">
          <label for="confirm-password" class="text-secondary">Confirm Password</label>
          <input autocomplete="new-password" type="password" id="confirm-password" v-model="confirmPassword" class="input-field" placeholder="Re-enter new password" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group submit-group">
        <button type="submit" class="btn-primary btn-save rounded-lg">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePicture: 'https://api.picscape.xyz/image/view/73501',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handlePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePicture = URL.createObjectURL(file);
      }
    },
    submitForm() {
      console.log('Form submitted', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
    }
  }
};
</script>

<style scoped>
.profile-settings {
  max-width: 650px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
}

h1 {
  font-size: var(--text-2xl);
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 1.8em;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.profile-picture-container {
  text-align: center;
}

.profile-picture-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.profile-picture-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: var(--shadow-md);
}

.file-input {
  cursor: pointer;
  font-size: var(--text-sm);
}

.input-field {
  padding: 12px;
  font-size: var(--text-base);
  border-radius: var(--border-radius-md);
  transition: box-shadow 0.3s ease;
}

.input-field:focus {
  box-shadow: 0 0 0 3px var(--primary-400);
}

.submit-group {
  text-align: center;
}

.btn-save {
  padding: 12px;
  font-size: var(--text-base);
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.btn-save:hover {
  background-color: var(--primary-500);
  box-shadow: var(--shadow-lg);
}

.password-group {
  display: flex;
  gap: 20px;
  flex-direction: row;
}
</style>
