<template>
  <div class="rating-module background-card-child">
    <label class="card-title">Rating:</label>
    <div class="rating-container">
      <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ filled: star <= (hoveredRating || currentRating) }"
          @click="updateRating(star)"
          @mouseover="previewRating(star)"
          @mouseleave="resetPreview"
      >
        ★
      </span>
    </div>
    <div v-if="errorMessage" class="error-message" @click="handleErrorClick">{{ errorMessage }}</div>
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
      currentRating: this.rating,
      errorMessage: null,
      errorCode: null
    };
  },
  methods: {
    async updateRating(newRating) {
      this.currentRating = newRating;
      this.errorMessage = null;

      try {
        await updateRating(this.id, newRating);
        console.log(`Rating for item ${this.id} updated to: ${newRating}`);
      } catch (error) {
        console.error('Error updating rating:', error.message);
        this.errorCode = error.code;
        if (error.code === 401) {
          this.errorMessage = "you need to login";
        }

        this.currentRating = this.rating;
      }
    },
    previewRating(star) {
      this.hoveredRating = star;
    },
    resetPreview() {
      this.hoveredRating = null;
    },
    handleErrorClick() {
      if (this.errorCode === 401) {
        this.$router.push('/login');
      }
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

.error-message {
  margin-top: 10px;
  color: #e74c3c;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
</style>
