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
import { updateRating } from '@/services/rateService';

export default {
  name: 'RatingModule',
  props: {
    id: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hoveredRating: null,
      currentRating: this.rating
    };
  },
  methods: {
    async updateRating(newRating) {
      this.currentRating = newRating;

      try {
        await updateRating(this.id, newRating);
        console.log(`Rating for item ${this.id} updated to: ${newRating}`);
      } catch (error) {
        console.error('Error updating rating:', error.message);
      }
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
