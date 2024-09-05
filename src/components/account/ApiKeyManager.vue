<template>
  <div class="api-key-manager">
    <h2>API Key Management</h2>

    <form @submit.prevent="createApiKey" class="create-form">
      <div class="form-group">
        <label for="key-title">Key Title:</label>
        <input type="text" v-model="newKeyTitle" id="key-title" required />
      </div>
      <button type="submit" class="btn btn-primary">Create API Key</button>
    </form>

    <div v-if="keys.length" class="keys-list">
      <table class="key-table">
        <thead>
        <tr>
          <th>Title</th>
          <th>Created At</th>
          <th>Last Request</th>
          <th>Requests</th>
          <th>Rate Limit</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="key in keys" :key="key._id">
          <td>{{ key.title }}</td>
          <td>{{ formatDate(key.createdAt) }}</td>
          <td>{{ formatDate(key.lastRequest) }}</td>
          <td>{{ key.requests }}</td>
          <td :class="{ 'rate-limit-active': key.rateLimitActive }">{{ key.rateLimit }}</td>
          <td>
            <button @click="regenerateKey(key._id)" class="btn btn-warning">Regenerate</button>
            <button @click="revokeKey(key._id)" class="btn btn-danger">Revoke</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No API keys found.</p>
    </div>
  </div>
</template>

<script>
import { createApiKey, listApiKeys, regenerateApiKey, revokeApiKey } from '@/services/apiKeyService';

export default {
  data() {
    return {
      newKeyTitle: '',
      keys: []
    };
  },
  methods: {
    async fetchKeys() {
      try {
        this.keys = await listApiKeys();
      } catch (error) {
        console.error(error.message);
      }
    },
    async createApiKey() {
      try {
        await createApiKey(this.newKeyTitle);
        this.newKeyTitle = '';
        await this.fetchKeys();
      } catch (error) {
        console.error(error.message);
      }
    },
    async regenerateKey(keyId) {
      try {
        await regenerateApiKey(keyId);
        await this.fetchKeys();
      } catch (error) {
        console.error(error.message);
      }
    },
    async revokeKey(keyId) {
      try {
        await revokeApiKey(keyId);
        await this.fetchKeys();
      } catch (error) {
        console.error(error.message);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  },
  mounted() {
    this.fetchKeys();
  }
};
</script>

<style scoped>
.api-key-manager {
  padding: 2em;
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
}

.create-form {
  margin-bottom: 2em;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-group input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  background-color: var(--background-50);
  color: var(--text);
}



.keys-list {
  overflow-x: auto;
}

.key-table {
  width: 100%;
  border-collapse: collapse;
}

.key-table th, .key-table td {
  padding: 1em;
  text-align: left;
  border-bottom: 1px solid var(--background-300);
}

.key-table th {
  background-color: var(--background-200);
}

.key-table tr:nth-child(even) {
  background-color: var(--background-50);
}

.key-table td {
  white-space: nowrap;
}

.rate-limit-active {
  color: var(--success);
}
</style>
