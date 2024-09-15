<template>
  <div class="rating-module background-card-child">
    <label class="card-title">
      Rating <span class="ratingsCount">({{ localRatingCount }})</span>
    </label>
    <div v-if="isReadMode" class="rating-container">
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
    <div v-else>
      <p>Rating not available.</p>
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
      default: 0
    },
    ratingCount: {
      type: Number,
      default: 0
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
      hoveredRating: null,
      currentRating: this.rating || 0,
      localRatingCount: this.ratingCount || 0,
      errorMessage: null,
      errorCode: null
    };
  },
  computed: {
    isReadMode() {
      return this.mode === 'read';
    }
  },
  methods: {
    async updateRating(newRating) {
      if (!this.isReadMode) return;

      this.currentRating = newRating;
      this.errorMessage = null;

      try {
        const { data } = await updateRating(this.id, newRating);
        this.localRatingCount = data.UpdatedAnime.ratingCount || 0;
        console.log(`Rating for item ${this.id} updated to: ${newRating}`);
      } catch (error) {
        console.error('Error updating rating:', error.message);
        this.errorCode = error.code;

        if (error.code === 401) {
          this.errorMessage = "You need to log in";
        } else {
          this.errorMessage = "An error occurred while updating the rating.";
        }

        this.currentRating = this.rating || 0;
      }
    },
    previewRating(star) {
      if (!this.isReadMode) return;

      this.hoveredRating = star;
    },
    resetPreview() {
      if (!this.isReadMode) return;

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
  font-size: 20px;
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

.ratingsCount {
  font-weight: 300;
  color: var(--accent-500);
  letter-spacing: 1px;
}
</style>
