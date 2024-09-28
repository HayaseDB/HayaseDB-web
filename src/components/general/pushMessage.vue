<template>
  <transition name="slide-fade">
    <div v-if="visible" class="message-box" :class="variant">
      <div class="message" v-html="message"></div>
      <button class="close-button" @click.stop="close">✖</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    message: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'danger',
      validator: (value) => {
        return ['primary', 'secondary', 'accent', 'danger'].includes(value);
      },
    },

  },
  data() {
    return {
      visible: true,
    };
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.message-box {
  max-width: 600px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 4px;
  color: #fff;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.danger {
  background-color: #e74c3c;
}

.primary {
  background-color: #3498db;
}

.secondary {
  background-color: #2ecc71;
}

.accent {
  background-color: #9b59b6;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}




@media (max-width: 700px) {
  .message-box{
    width: 70%;
  }
}
</style>
