<template>
  <div class="cover-image-container background-card-sm">
    <input
        v-if="isEditMode || isCreateMode"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="file-input"
    />
    <div class="cover-image-overlay" v-if="isEditMode || isCreateMode">
      <span class="overlay-text">Click to select image</span>
    </div>
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
      localImageUrl: this.url,
      file: null
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
      return this.localImageUrl || this.url;
    }
  },
  watch: {
    mode(newMode) {
      if (newMode === 'read') {
        this.localImageUrl = this.url;
      } else {
        this.localImageUrl = null;
      }
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localImageUrl = e.target.result;
          this.$emit('update-cover', file);
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
  z-index: 1;
}

.cover-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-lg);
  font-weight: bold;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.cover-image-container:hover .cover-image-overlay {
  opacity: 1;
}
</style>
