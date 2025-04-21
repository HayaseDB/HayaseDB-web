<template>
  <div
    v-if="field && field.value !== null"
    :class="card ? 'bg-white border border-gray-200 rounded-xl p-6' : ''"
  >
    <component :is="getComponent(resolvedType)" :field="field" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import UuidField from "../fields/UuidField.vue";
import StringField from "../fields/StringField.vue";
import TextField from "../fields/TextField.vue";
import DateField from "../fields/DateField.vue";
import ArrayField from "../fields/ArrayField.vue";
import EnumField from "../fields/EnumField.vue";
import UrlField from "../fields/UrlField.vue";
import ImageField from "../fields/ImageField.vue";
import EmbedField from "@/components/main/explorer/animes/fields/EmbedField.vue";

const props = defineProps({
  field: {
    type: Object,
    required: false,
    default: null,
  },
  card: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: null,
  },
});

const getComponent = (type) => {
  switch (type) {
    case "Uuid":
      return UuidField;
    case "String":
      return StringField;
    case "Text":
      return TextField;
    case "Date":
      return DateField;
    case "Embed":
      return EmbedField;
    case "Array":
      return ArrayField;
    case "Enum":
      return EnumField;
    case "Url":
      return UrlField;
    case "Image":
      return ImageField;
    default:
      console.warn(`Unsupported field type: ${type}`);
      return null;
  }
};

const resolvedType = computed(() => props.type || props.field?.type);
</script>
