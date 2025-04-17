<template>
  <section class="bg-white w-full py-16 px-4">
    <div
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        ref="statElementsRef"
        class="bg-white p-6 rounded-md border border-gray-200 text-center transition-all duration-300"
      >
        <div v-if="loading" class="animate-pulse">
          <div class="h-10 bg-gray-200 rounded mb-2" />
          <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
        <template v-else>
          <h3 class="text-4xl font-bold text-indigo-600 mb-2">
            <span>{{ stat.display }}</span>
          </h3>
          <p class="text-sm text-gray-600">
            {{ stat.label }}
          </p>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { StatsService } from "@/services/endpoints/stats.service.js";

const loading = ref(true);
const stats = ref([
  { label: "Users", value: 0, display: "0", previousValue: 0 },
  { label: "Animes", value: 0, display: "0", previousValue: 0 },
  { label: "Media", value: 0, display: "0", previousValue: 0 },
  { label: "Total Requests", value: 0, display: "0", previousValue: 0 },
]);
const statElementsRef = ref([]);
let intervalId = null;
let observer = null;
const animationFrames = {};

const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  } else {
    return num.toString();
  }
};

const parseFormattedNumber = (displayStr) => {
  if (!displayStr) return 0;
  const match = displayStr.match(/^([\d.]+)([kMB])?$/);
  if (!match) return 0;
  const numPart = parseFloat(match[1]);
  const suffix = match[2] || "";
  switch (suffix) {
    case "k":
      return numPart * 1e3;
    case "M":
      return numPart * 1e6;
    case "B":
      return numPart * 1e9;
    default:
      return numPart;
  }
};

const animateValue = (stat, index) => {
  if (animationFrames[index]) {
    cancelAnimationFrame(animationFrames[index]);
  }
  const duration = 800;
  const start = performance.now();
  const startValue = parseFormattedNumber(stat.display);
  const endValue = stat.value;
  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(
      startValue + (endValue - startValue) * easeProgress,
    );
    stat.display = formatNumber(current);
    if (progress < 1) {
      animationFrames[index] = requestAnimationFrame(step);
    } else {
      stat.display = formatNumber(endValue);
      animationFrames[index] = null;
    }
  };
  animationFrames[index] = requestAnimationFrame(step);
};

const fetchStats = async () => {
  try {
    const data = await StatsService.getStats();
    const newStats = [
      {
        label: "Users",
        value: data.totalUsers,
        display: stats.value[0]?.display || "0",
        previousValue: stats.value[0]?.value || 0,
      },
      {
        label: "Animes",
        value: data.totalAnimes,
        display: stats.value[1]?.display || "0",
        previousValue: stats.value[1]?.value || 0,
      },
      {
        label: "Media",
        value: data.totalMedia,
        display: stats.value[2]?.display || "0",
        previousValue: stats.value[2]?.value || 0,
      },
      {
        label: "Total Requests",
        value: data.totalRequests,
        display: stats.value[3]?.display || "0",
        previousValue: stats.value[3]?.value || 0,
      },
    ];
    loading.value = false;
    await nextTick(() => {
      newStats.forEach((newStat, index) => {
        if (newStat.value !== newStat.previousValue) {
          stats.value[index] = {
            ...newStat,
            display: stats.value[index]?.display || "0",
          };
          animateValue(stats.value[index], index);
        }
      });
    });
  } catch {
    loading.value = false;
  }
};

const setupIntersectionObserver = () => {
  if (observer) {
    observer.disconnect();
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = statElementsRef.value || [];
          const index = elements.indexOf(entry.target);
          if (index !== -1 && stats.value[index]) {
            animateValue(stats.value[index], index);
          }
        }
      });
    },
    { threshold: 0.2 },
  );
  nextTick(() => {
    if (statElementsRef.value) {
      statElementsRef.value.forEach((el) => {
        if (el) observer.observe(el);
      });
    }
  });
};

onMounted(() => {
  fetchStats();
  intervalId = setInterval(fetchStats, 10000);
  nextTick(() => {
    setupIntersectionObserver();
  });
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  if (observer) observer.disconnect();
  Object.values(animationFrames).forEach((frameId) => {
    if (frameId) cancelAnimationFrame(frameId);
  });
});
</script>
