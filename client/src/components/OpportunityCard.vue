<script setup>
import MapIcon from '@/components/icons/MapIcon.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import BuildingIcon from '@/components/icons/BuildingIcon.vue'
import { truncateDate } from '@/utils/utils.js'

defineProps({
  id: String,
  title: String,
  description: String,
  date: String,
  address: String,
  organization: String
})
</script>

<template>
  <div class="card h-100">
    <div class="card-body d-flex flex-column">
      <h5 class="card-name fs-4 fw-semibold">{{ title }}</h5>
      <p class="card-text text-secondary">
        {{ description }}
      </p>
      <ul class="text-body-secondary list-unstyled">
        <li><CalendarIcon /> {{ truncateDate(date) }}</li>
        <li><MapIcon /> {{ address }}</li>
        <li v-if="organization"><BuildingIcon /> {{ organization }}</li>
      </ul>
      <router-link
        :to="`/opportunities/${id}`"
        class="btn border-secondary-subtle w-100 btn-light"
        >Read more</router-link
      >
    </div>
  </div>
</template>
