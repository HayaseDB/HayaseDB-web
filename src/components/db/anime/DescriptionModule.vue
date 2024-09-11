<template>
  <div class="background-card-child">
    <label class="card-title">Description</label>
    <div v-if="editMode">
      <textarea @input="emitUpdate" v-model="editableDescription" class="input-field" rows="5" />
    </div>
    <div v-else>
      <div class="description-container">
        <div class="description-content" :class="{ 'collapsed': isCollapsed }">
          {{ description }}
        </div>
        <div class="fade-out" v-if="isCollapsed && isContentOverflowing"></div>
      </div>
      <div class="arrow-container" v-if="isContentOverflowing">
        <fontAwesomeIcon
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
  name: 'DescriptionModule',
  components: {
    FontAwesomeIcon
  },
  props: {
    description: {
      type: String,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: true,
      isContentOverflowing: false,
      editableDescription: this.description
    };
  },
  watch: {
    description(newVal) {
      this.editableDescription = newVal;
    },
    editMode(newMode) {
      if (!newMode) {
        this.editableTitle = '';
      } else {
        this.editableTitle = this.title;
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
      this.$emit('update', this.editableDescription);
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      this.isCollapsed = true;
      this.checkContentOverflow();
    },
    checkContentOverflow() {
      this.$nextTick(() => {
        const content = this.$el.querySelector('.description-content');
        if (content) {
          this.isContentOverflowing = content.scrollHeight > content.clientHeight;
        }
      });
    },
    updateDescription() {
      this.$emit('update-description', this.editableDescription);
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

.description-container {
  position: relative;
  overflow: hidden;
}

.description-content {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
  line-height: 1.6;
  font-size: 15px;
  transition: height 0.4s ease, opacity 0.3s ease;
}

.description-content.collapsed {
  height: 100px;
  overflow: hidden;
}

.description-content:not(.collapsed) {
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
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
