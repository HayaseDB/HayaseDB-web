<template>
  <div class="cover-image-container background-card-sm">
    <input 
      v-if="isEditMode || isCreateMode" 
      type="file" 
      accept="image/*" 
      @change="handleFileChange" 
      class="file-input"
    />
    <img v-if="currentImageUrl" :src="currentImageUrl" alt="Cover Image" class="cover-image" />
    <div v-else class="cover-placeholder">No Image</div>
  </div>
</template>

<script>
export default {
  name: 'CoverModule',
  props: {
    url: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      required: true,
      validator(value) {
        return ['read', 'edit', 'create'].includes(value);
      }
    }
  },
  data() {
    return {
      localImageUrl: this.url
    };
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit';
    },
    isCreateMode() {
      return this.mode === 'create';
    },
    currentImageUrl() {
      return this.localImageUrl;
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
.cover-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  overflow: hidden;
  position: relative;
}

.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
}

.cover-placeholder {
  width: 100%;
  height: 450px;
  background-color: var(--background-100);
  color: var(--text-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  text-align: center;
  border-radius: inherit;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
