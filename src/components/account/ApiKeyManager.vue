<template>
  <div class="api-key-manager">
    <h2>API Key Management</h2>

    <form @submit.prevent="createApiKey" class="create-form">
      <div class="form-group">
        <label for="key-title">Key Title:</label>
        <input type="text" v-model="newKeyTitle" id="key-title" placeholder="Enter a title for your API key" required />
      </div>
      <button type="submit" class="btn btn-primary">Create API Key</button>
    </form>

    <div v-if="keys.length" class="keys-list">
      <div class="table-container">
        <table class="key-table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Last Request</th>
            <th>Requests</th>
            <th>Rate Limit (per minute)</th>
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
            <td class="actions">
              <div class="actions-container">
                <button @click="regenerateKey(key._id)" class="btn-warning"><fontAwesomeIcon :icon="['fa', 'rotate']" /></button>
                <button @click="revokeKey(key._id)" class="btn-danger"><fontAwesomeIcon :icon="['fa', 'trash']" /></button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="no-keys">
      <p>No API keys found.</p>
    </div>

    <!-- Modal for displaying API key -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <p>Your API key is:</p>
        <input type="text" :value="newApiKey" readonly />
        <div class="modal-footer">
          <button @click="copyToClipboard">Copy</button>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createApiKey, listApiKeys, regenerateApiKey, revokeApiKey } from '@/services/apiKeyService';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      newKeyTitle: '',
      keys: [],
      newApiKey: '',
      showModal: false,
      modalTitle: ''
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
        const response = await createApiKey(this.newKeyTitle);
        this.newApiKey = response.key;
        this.newKeyTitle = '';
        await this.fetchKeys();
        this.modalTitle = 'API Key Created';
        this.showModal = true;
      } catch (error) {
        console.error(error.message);
      }
    },
    async regenerateKey(keyId) {
      try {
        const response = await regenerateApiKey(keyId);
        this.newApiKey = response.key;
        await this.fetchKeys();
        this.modalTitle = 'API Key Regenerated';
        this.showModal = true;
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
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.newApiKey)
          .then(() => alert('API key copied to clipboard'))
          .catch(err => console.error('Failed to copy API key: ', err));
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.fetchKeys();
  }
};
</script>


<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2em;
  position: relative;
  top: 40px;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  width: 80%;
  height: 220px;
  max-width: 500px;
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-footer{

  flex-direction: row;
}

.modal-content input {
  padding: 0.5em;
  margin: 1em 0;
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
}

.modal-content button {
  padding: 0.5em 1em;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  margin: 0.5em;
}

.modal-content button:first-of-type {
  background: var(--primary);
  color: white;
}

.modal-content button:last-of-type {
  background: var(--danger);
  color: white;
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
  }
}

@media (max-width: 650px) {
  .modal-content {
    padding: 1em;
  }


}

.api-key-manager {
  padding: 2em;
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  max-width: 100%;
  box-shadow: var(--shadow-md);
  overflow-x: hidden;
}

.create-form {
  margin-bottom: 2em;
}

.form-group {
  display: flex;
  margin-bottom: 1em;
  margin-top: 1em;
  flex-direction: column;
}

.form-group input {
  padding: 0.75em;
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  background-color: var(--background-50);
  color: var(--text);
  font-size: 1em;
}


.keys-list {
  margin-top: 2em;
}

.table-container {
  overflow-x: auto;
  width: 100%;
}

.key-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.key-table th, .key-table td {
  padding: 1em;
  text-align: left;
  border-bottom: 1px solid var(--background-300);
  font-size: 0.875em;
}

.key-table th {
  background-color: var(--background-200);
  font-size: 0.9em;
}

.key-table td {
  white-space: normal;
  word-wrap: break-word;
}

.key-table td.actions {
  width: 120px;
}



.key-table tr:nth-child(even) {
  background-color: var(--background-50);
}

.rate-limit-active {
  color: var(--success);
}

.no-keys {
  padding: 1em;
  background-color: var(--background-50);
  border-radius: var(--border-radius-md);
  text-align: center;
}

.actions-container{
  display: flex;
  flex-direction: row;
  gap: 1em;
}

@media (max-width: 768px) {
  .api-key-manager {
    padding: 1.5em;
    margin: 0;
  }

  .create-form {
    gap: 0.5em;
  }

  .btn {
    width: 100%;
  }

  .key-table {
    font-size: 0.8em;
  }

  .key-table th, .key-table td {
    padding: 0.75em;
  }

  h2 {
    font-size: 1.5em;
    text-align: center;
  }
}

@media (max-width: 650px) {
  .api-key-manager {
    padding: 1em;
  }

  .btn {
    padding: 0.5em;
    font-size: 0.9em;
  }

  .key-table {
    display: block;
  }

  .key-table thead {
    display: none;
  }

  .key-table tbody {
    display: block;
  }

  .key-table tr {
    display: block;
    margin-bottom: 1em;
    border: 1px solid var(--background-300);
    border-radius: var(--border-radius-md);
    padding: 1em;
  }

  .key-table td {
    display: block;
    text-align: left;
    padding: 0.5em;
    border-bottom: 1px solid var(--background-300);
  }

  .key-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: var(--text-300);
    display: block;
    margin-bottom: 0.5em;
  }

  .table-container {
    overflow-x: visible;
  }

  .form-group input {
    padding: 0.5em;
    font-size: 0.9em;
  }

  .no-keys {
    font-size: 0.85em;
  }

  h2 {
    font-size: 1.5em;
  }

  .actions-container {
    flex-direction: column;
  }

  .actions-container button {
    margin-bottom: 0.5em;
  }

  .actions-container button:last-child {
    margin-bottom: 0;
  }
}
</style>