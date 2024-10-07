<template>
  <div class="mb-3">
    <label for="id" class="form-label"> {{ label }} </label>
    <input id="id" :type="inputType" :v-model="value" :placeholder="placeholder" :required="required" class="form-control" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Input'
    },
    inputType: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style scoped></style>
