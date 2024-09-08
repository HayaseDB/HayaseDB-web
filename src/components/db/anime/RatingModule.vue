<template>
  <div class="rating-module background-card-child">
    <label class="card-title">Rating:</label>
    <div class="rating-container">
      <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ filled: star <= (hoveredRating || rating) }"
          @click="updateRating(star)"
          @mouseover="previewRating(star)"
          @mouseleave="resetPreview"
      >
        ★
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingModule',
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hoveredRating: null
    };
  },
  methods: {
    updateRating(newRating) {
      this.$emit('update-rating', newRating);
    },
    previewRating(star) {
      this.hoveredRating = star;
    },
    resetPreview() {
      this.hoveredRating = null;
    }
  }
};
</script>

<style scoped>
.rating-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}

.star {
  cursor: pointer;
  font-size: 24px;
  color: #ccc;
  transition: color 0.2s ease-in-out;
}

.star.filled {
  color: #f39c12;
}
</style>
