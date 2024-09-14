<template>
  <div class="long-text-module background-card-child">
    <label class="card-title">{{ label }}</label>
    <div v-if="isEditMode || isCreateMode">
      <textarea @input="emitUpdate" v-model="editableText" class="input-field" rows="5"></textarea>
    </div>
    <div v-else>
      <div class="text-container">
        <div class="text-content" :class="{ 'collapsed': isCollapsed }">
          {{ value }}
        </div>
        <div class="fade-out" v-if="isCollapsed && isContentOverflowing"></div>
      </div>
      <div class="arrow-container" v-if="isContentOverflowing">
        <font-awesome-icon
          @click="toggleCollapse"
          :icon="['fa', 'chevron-down']"
          class="arrow"
          :class="{ 'rotate': !isCollapsed }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'LongTextModule',
  components: {
    FontAwesomeIcon
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
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
      isCollapsed: true,
      isContentOverflowing: false,
      editableText: this.value
    };
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit';
    },
    isCreateMode() {
      return this.mode === 'create';
    }
  },
  watch: {
    value(newVal) {
      if (!this.isEditMode && !this.isCreateMode) {
        this.editableText = newVal;
        this.checkContentOverflow();
      }
    },
    mode(newMode) {
      if (newMode === 'read') {
        this.editableText = this.value;
        this.isCollapsed = true;
        this.checkContentOverflow();
      } else if (newMode === 'edit') {
        this.editableText = this.value;
      } else if (newMode === 'create') {
        this.editableText = '';
      }
    }
  },
  mounted() {
    this.checkContentOverflow();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableText);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      this.checkContentOverflow();
    },
    checkContentOverflow() {
      this.$nextTick(() => {
        const content = this.$el.querySelector('.text-content');
        if (content) {
          this.isContentOverflowing = content.scrollHeight > content.clientHeight;
        }
      });
    }
  }
});
</script>

<style scoped>
.card-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-800);
}

.text-container {
  position: relative;
  overflow: hidden;
}

.text-content {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
  line-height: 1.6;
  word-break: break-word;
  font-size: 15px;
  transition: height 0.4s ease, opacity 0.3s ease;
}

.text-content.collapsed {
  height: 100px;
  overflow: hidden;
}

.text-content:not(.collapsed) {
  height: auto;
  opacity: 1;
}

.fade-out {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--background-card-child));
  pointer-events: none;
}

.arrow-container {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.arrow {
  font-size: 20px;
  color: var(--accent-300);
  cursor: pointer;
  transition: transform 0.4s ease, color 0.3s ease;
}

.arrow.rotate {
  transform: rotate(180deg);
}

.arrow:hover {
  color: var(--primary);
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
