<template>
  <div
      :class="['md:' + getFieldSizeClass(fieldKey), ...statusClasses]"
      class="border col-span-1 p-4 rounded-lg"
  >
    <h3 class="text-sm text-gray-500 capitalize mb-2">
      {{ fieldValue.label }}
    </h3>

    <div v-if="isImage" class="mt-2">
      <img
          :src="fieldValue.value.url"
          :alt="fieldValue.label"
          class="rounded-md h-48 w-full object-cover"
      />
    </div>

    <div v-else-if="isArray" class="flex flex-wrap gap-1 mt-1">
      <span
          v-for="(item, index) in fieldValue.value"
          :key="index"
          class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
      >
        {{ item }}
      </span>
    </div>

    <div v-else-if="isId" class="mt-2">
      <code
          class="text-xs bg-gray-100 text-gray-800 px-3 py-2 rounded-sm block shadow-inner"
      >
        {{ fieldValue.value }}
      </code>
    </div>

    <div v-else-if="isUrl" class="mt-1">
      <a
          :href="fieldValue.value"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline break-all"
      >
        {{ fieldValue.value }}
      </a>
    </div>

    <div v-else class="mt-1">
      <p class="font-medium text-gray-800">{{ fieldValue.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import lodash from "lodash";

type FieldStatus = "created" | "changed" | "deleted" | "default";

const props = defineProps({
  fieldKey: {
    type: String,
    required: true,
  },
  fieldValue: {
    type: Object,
    required: true,
  },
  fieldStatus: {
    type: String as () => FieldStatus,
    default: "default",
  },
  getFieldSizeClass: {
    type: Function,
    required: true,
  },
  contribution: {
    type: Object,
    default: null,
  }
});

const isImage = computed(
    () =>
        typeof props.fieldValue?.value === "object" &&
        !!props.fieldValue?.value?.url,
);

const isArray = computed(() => Array.isArray(props.fieldValue?.value));

const isId = computed(() => props.fieldValue.label === "Id");

const isUrl = computed(() => props.fieldValue.type === "Url");

const isDifferentFromOriginal = computed(() => {
  if (!props.contribution?.originalAnime) return false;

  const originalValue = lodash.get(props.contribution.originalAnime, props.fieldKey);
  const currentValue = props.fieldValue;

  if (!originalValue && currentValue) return true;
  if (originalValue && !currentValue) return true;

  return !lodash.isEqual(originalValue, currentValue);
});
const statusClasses = computed(() => {
  const classes = [];

  switch (props.fieldStatus) {
    case "created":
      classes.push("bg-green-50", "border-green-400");
      break;
    case "changed":
      classes.push("bg-yellow-50", "border-yellow-400");
      break;
    case "deleted":
      classes.push("bg-red-50", "border-red-400");
      break;
    default:
      classes.push("bg-gray-50", "border-gray-200");
  }

  if (isDifferentFromOriginal.value) {
    classes.push(
        "border-dashed",
        "border-2",
        "border-gray-400"
    );
  } else {
    classes.push("border-solid");
  }

  return classes;
});

</script>