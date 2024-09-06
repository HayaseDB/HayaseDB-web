<template>
  <div class="profile-settings">
    <h1 class="text-primary gradient-animation">Profile Settings</h1>
    <form @submit.prevent="submitForm">
      <div class="form-header">
        <div class="form-header-left">
          <!-- Profile Picture -->
          <div class="form-group profile-picture-container">
            <label class="profile-picture-upload">
              <img :src="profilePicture" alt="Profile Picture" class="profile-picture-preview" />
              <input type="file" id="profile-picture" @change="handlePictureChange" accept="image/*" class="file-input" />
              <span class="change-pfp-message">Change Profile Picture</span>
            </label>
          </div>
        </div>
        <div class="form-header-right">
          <!-- Username -->
          <div class="form-group">
            <label for="username" class="text-secondary">Username</label>
            <input
                autocomplete="username"
                type="text"
                id="username"
                v-model="username"
                class="input-field"
                :aria-invalid="errors.username ? 'true' : 'false'"
                aria-describedby="username-error"
            />
            <p v-if="errors.username" id="username-error" class="error-message">{{ errors.username }}</p>
          </div>

          <!-- Roles -->
          <div class="form-group">
            <label class="text-secondary">Roles</label>
            <div class="roles-tags">
              <span v-for="role in roles" :key="role" class="role-tag">{{ role }}</span>
              <p v-if="roles.length === 0" class="no-roles-message">No roles assigned.</p>
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="text-secondary">Email</label>
            <input
                type="email"
                id="email"
                v-model="email"
                class="input-field"
                :aria-invalid="errors.email ? 'true' : 'false'"
                aria-describedby="email-error"
            />
            <p v-if="errors.email" id="email-error" class="error-message">{{ errors.email }}</p>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <!-- Old Password -->
        <div class="form-group">
          <label for="password" class="text-secondary">Old Password</label>
          <input
              autocomplete="current-password"
              type="password"
              id="password"
              v-model="password"
              class="input-field"
              placeholder="Enter old password"
              :aria-invalid="errors.password ? 'true' : 'false'"
              aria-describedby="password-error"
          />
          <p v-if="errors.password" id="password-error" class="error-message">{{ errors.password }}</p>
        </div>

        <!-- New Password and Confirm Password -->
        <div class="password-group">
          <div class="form-group">
            <label for="new-password" class="text-secondary">New Password</label>
            <input
                autocomplete="new-password"
                type="password"
                id="new-password"
                v-model="newPassword"
                class="input-field"
                placeholder="Enter new password"
                :aria-invalid="errors.newPassword ? 'true' : 'false'"
                aria-describedby="new-password-error"
            />
            <p v-if="errors.newPassword" id="new-password-error" class="error-message">{{ errors.newPassword }}</p>
          </div>
          <div class="form-group">
            <label for="confirm-password" class="text-secondary">Confirm Password</label>
            <input
                autocomplete="new-password"
                type="password"
                id="confirm-password"
                v-model="confirmPassword"
                class="input-field"
                placeholder="Re-enter new password"
                :aria-invalid="errors.confirmPassword ? 'true' : 'false'"
                aria-describedby="confirm-password-error"
            />
            <p v-if="errors.confirmPassword" id="confirm-password-error" class="error-message">{{ errors.confirmPassword }}</p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group submit-group">
        <button type="submit" class="btn-primary btn-save rounded-lg">Save Changes</button>
        <p v-if="submissionError" class="error-message">{{ submissionError }}</p>
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
      roles: ["test", "user"],
      password: '',
      newPassword: '',
      confirmPassword: '',
      errors: {},
      submissionError: ''
    };
  },
  methods: {
    handlePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePicture = URL.createObjectURL(file);
      }
    },
    validateForm() {
      this.errors = {};

      if (this.newPassword || this.confirmPassword) {
        if (!this.password) this.errors.password = 'Old password is required.';
        if (!this.newPassword) this.errors.newPassword = 'New password is required.';
        if (this.newPassword !== this.confirmPassword) this.errors.confirmPassword = 'Passwords do not match.';
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        console.log('Form submitted', {
          username: this.username,
          email: this.email,
          roles: this.roles,
          password: this.password,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });
        // Submit the form
      } else {
        this.submissionError = 'Please fix the errors above and try again.';
      }
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
  position: relative;
}


.profile-picture-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}


.profile-picture-preview {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}
.file-input {
  display: none;
}

.change-pfp-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 40px;
  overflow: hidden;
}


.profile-picture-upload:hover .change-pfp-message {
  opacity: 1;
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

.error-message {
  color: var(--danger);
  position: relative;
  font-size: var(--text-sm);
  margin-top: 0.5em;
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

.form-header {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.form-header-right {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-header-left {
  flex: 0 0 auto;
  width: 30%;
}

.roles-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.role-tag {
  background-color: var(--primary-200);
  color: var(--primary-800);
  padding: 6px 12px;
  border-radius: var(--border-radius-md);
  font-size: var(--text-sm);
  display: inline-block;
}

.no-roles-message {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}
</style>
