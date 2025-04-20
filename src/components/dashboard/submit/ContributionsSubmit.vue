<template>
  <div
    class="bg-white mt-12 relative rounded-2xl border border-gray-200 overflow-hidden"
  >
    <div class="p-4 sm:p-8">
      <h2 class="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6">
        Submit Form
      </h2>
      <div>
        <LoadingOverlay :is-loading="loading" />
        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
          @submit.prevent="submitForm"
        >
          <template v-for="field in formSchema" :key="field.name">
            <component
              :is="getComponent(field.type)"
              v-if="
                [
                  'Text',
                  'String',
                  'Date',
                  'Array',
                  'Image',
                  'Enum',
                  'Url',
                ].includes(field.type)
              "
              v-model="form[field.name]"
              :label="field.label"
              :options="field.options"
              :is-changed="id && modifiedFields.has(field.name)"
              :error="errors[field.name]"
              :type="field.type"
              :class="{
                'col-span-full': field.fullWidth || field.type === 'Text',
              }"
              :required="field.required"
              @update:model-value="
                (val) => {
                  form[field.name] = val;
                  trackFieldChange(field.name);
                }
              "
            />
          </template>

          <div v-if="id" class="col-span-full mt-4 text-sm">
            <div
              v-if="modifiedFields.size > 0"
              class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md"
            >
              <p class="flex items-center text-blue-700">
                <InfoIcon class="w-4 h-4 mr-2" />
                <span
                  >Fields with
                  <span class="font-semibold">blue highlight</span> have been
                  modified</span
                >
              </p>
            </div>
          </div>

          <div class="col-span-full flex justify-between mt-4">
            <button
              type="reset"
              class="flex space-x-2 items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
              @click="resetForm"
            >
              <RotateCcw class="h-4.5 w-4.5" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              :disabled="loading || (id && modifiedFields.size === 0)"
              class="flex space-x-2 items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send class="h-4.5 w-4.5" />
              <span>{{ id ? "Update" : "Submit" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { RotateCcw, Send, Info as InfoIcon } from "lucide-vue-next";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import TextField from "@/components/dashboard/submit/components/fields/TextField.vue";
import SelectField from "@/components/dashboard/submit/components/fields/SelectField.vue";
import DateField from "@/components/dashboard/submit/components/fields/DateField.vue";
import ImageField from "@/components/dashboard/submit/components/fields/ImageField.vue";
import ArrayField from "@/components/dashboard/submit/components/fields/ArrayField.vue";
import TextareaField from "@/components/dashboard/submit/components/fields/TextareaField.vue";
import UrlField from "@/components/dashboard/submit/components/fields/UrlField.vue";
import { ContributionService, MediaService } from "@/services";

const props = defineProps({
  initialValues: {
    type: [Object, String],
    default: () => null,
  },
});
const router = useRouter();
const loading = ref(false);
const errors = reactive({});
const modifiedFields = reactive(new Set());

const form = reactive({});
const initialData = ref({});
const id = ref(null);

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function resetForm() {
  modifiedFields.clear();
  Object.keys(errors).forEach((k) => delete errors[k]);

  if (id.value) {
    Object.keys(form).forEach((key) => delete form[key]);
    Object.assign(form, deepClone(initialData.value));
  } else {
    Object.keys(form).forEach((key) => delete form[key]);
  }

  localStorage.removeItem("formData");
}

function processInitialValues(values) {
  if (!values) return;

  const extractedData = {};
  Object.entries(values).forEach(([key, fieldData]) => {
    extractedData[key] = fieldData?.value ?? null;
  });

  id.value = extractedData.id;
  initialData.value = deepClone(extractedData);

  Object.keys(form).forEach((key) => delete form[key]);
  Object.assign(form, deepClone(initialData.value));

  modifiedFields.clear();
}

watch(
  () => props.initialValues,
  (values) => {
    processInitialValues(values);
  },
  { immediate: true },
);

onMounted(async () => {
  const savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    Object.assign(form, parsedFormData);
  }

  try {
    loading.value = true;
    formSchema.value = await ContributionService.getSchema();
    if (props.initialValues) {
      processInitialValues(props.initialValues);
    }
  } catch (error) {
    toast.error("Failed to load form schema. Please try again later.");
    console.error("Schema load error:", error);
  } finally {
    loading.value = false;
  }
});

watch(
  form,
  (newForm) => {
    if (newForm) {
      localStorage.setItem("formData", JSON.stringify(newForm));
    }
  },
  { deep: true },
);

function trackFieldChange(fieldName) {
  if (id.value) {
    modifiedFields.add(fieldName);

    if (!hasValueChanged(form[fieldName], initialData.value[fieldName])) {
      modifiedFields.delete(fieldName);
    }
  }
}

const componentMap = {
  String: TextField,
  Enum: SelectField,
  Date: DateField,
  Array: ArrayField,
  Text: TextareaField,
  Image: ImageField,
  Url: UrlField,
  Uuid: TextField,
};

function getComponent(type) {
  return componentMap[type] || TextField;
}

function validateForm() {
  let valid = true;
  Object.keys(errors).forEach((k) => delete errors[k]);

  for (const field of formSchema.value) {
    if (field?.required) {
      const fieldValue = form[field.name];
      const fieldEmpty =
        fieldValue === undefined ||
        fieldValue === null ||
        (Array.isArray(fieldValue) && fieldValue.length === 0) ||
        (typeof fieldValue === "string" && fieldValue.trim() === "");

      if (fieldEmpty && (!id.value || modifiedFields.has(field.name))) {
        errors[field.name] = `${field.label} is required.`;
        valid = false;
      }
    }
  }

  return valid;
}

function hasValueChanged(newVal, oldVal) {
  if (newVal === oldVal) return false;
  if (newVal === null && oldVal === undefined) return false;
  if (newVal === "" && oldVal === null) return false;
  if (newVal === undefined && oldVal === null) return false;

  if (newVal instanceof Date && oldVal instanceof Date) {
    return newVal.getTime() !== oldVal.getTime();
  }

  if (Array.isArray(newVal) && Array.isArray(oldVal)) {
    if (newVal.length !== oldVal.length) return true;
    return JSON.stringify(newVal) !== JSON.stringify(oldVal);
  }

  if (
    newVal &&
    oldVal &&
    typeof newVal === "object" &&
    typeof oldVal === "object"
  ) {
    return JSON.stringify(newVal) !== JSON.stringify(oldVal);
  }

  return true;
}

async function submitForm() {
  if (!validateForm()) {
    toast.error("Please fix the errors in the form.");
    return;
  }

  loading.value = true;
  try {
    const imageFields = formSchema.value.filter(
      (f) => f?.type === "Image" && form[f.name] instanceof File,
    );
    for (const field of imageFields) {
      try {
        if (form[field.name]) {
          const res = await MediaService.upload(form[field.name]);
          form[field.name] = res.id;
        }
      } catch (error) {
        toast.error(`Failed to upload ${field?.label}. Please try again.`);
        console.error("Upload error:", error);
        loading.value = false;
        return;
      }
    }

    if (id.value) {
      const changedData = {};
      let hasRealChanges = false;

      for (const fieldName of modifiedFields) {
        if (hasValueChanged(form[fieldName], initialData.value[fieldName])) {
          const value = form[fieldName];
          changedData[fieldName] =
            typeof value === "string" && value.trim() === "" ? null : value;
          hasRealChanges = true;
        }
      }

      if (!hasRealChanges) {
        toast.info("No changes detected to submit.");
        loading.value = false;
        return;
      }

      await ContributionService.suggestEdit(id.value, changedData);
      await router.push("/dashboard/contributions");
      toast.success("Contribution updated successfully!");
    } else {
      const completeData = {};
      for (const field of formSchema.value) {
        if (field.name === "id") continue;

        const value = form[field.name];
        if (
          value !== undefined &&
          value !== null &&
          (typeof value !== "string" || value.trim() !== "") &&
          (!Array.isArray(value) || value.length > 0)
        ) {
          completeData[field.name] = value;
        }
      }

      await ContributionService.createContribution(completeData);
      await router.push("/dashboard/contributions");
      toast.success("Contribution created successfully!");
    }
  } catch (err) {
    console.error("Submission error:", err);
  } finally {
    loading.value = false;
    localStorage.removeItem("formData");
  }
}

const formSchema = ref([]);

onMounted(async () => {
  try {
    loading.value = true;
    formSchema.value = await ContributionService.getSchema();
    if (props.initialValues) {
      processInitialValues(props.initialValues);
    }
  } catch (error) {
    toast.error("Failed to load form schema. Please try again later.");
    console.error("Schema load error:", error);
  } finally {
    loading.value = false;
  }
});
</script>
