<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'icon', 'items'])

const minimized = ref(true)

function toggleMinimized() {
  if (minimized.value) {
    minimized.value = false
  } else {
    minimized.value = true
  }
}
</script>

<template>
  <div class="dropdown" :style="minimized ? 'height: 4rem;' : ''">
    <div class="dropdown-title" @click="toggleMinimized">
      <h2>{{ props.title ? props.title : 'Unnamed' }}</h2>
      <div v-html="props.icon" class="dropdown-icon" />
    </div>
    <div class="dropdown-add btn" @click="$emit('addclick')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
    <div v-if="props.items?.length > 0" class="dropdown-content">
      <div v-for="item in props.items" :key="item.name" class="btn" @click="$emit('itemclick', item)">
        {{ item.name }}
      </div>
    </div>
    <div v-else style="margin: 0.5rem">Här var det tomt.</div>
  </div>
</template>

<style scoped>
.dropdown {
  width: 100%;
  background-color: hsl(0, 0%, 40%);
  text-align: center;
  color: white;
  border-radius: 1rem;
  margin: 0.5rem;
  overflow: hidden;
}

.dropdown-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
}

.dropdown-title:hover {
  cursor: pointer;
}

.dropdown-title > * {
  margin: 0;
  padding: 1rem;
}

.dropdown-icon {
  padding: 0;
}

.dropdown-icon > :deep(*) {
  width: 2rem;
  height: 2rem;
  padding: 1rem;
}

.dropdown-add {
  display: flex;
  justify-content: center;
  background-color: hsl(0, 0%, 35%);
  margin: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.dropdown-content {
  display: flex;
  flex-wrap: wrap;
  margin: 0.25rem;
}

.dropdown-content > * {
  background-color: hsl(0, 0%, 35%);
  flex-grow: 1;
  margin: 0.25rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  font-weight: bold;
}

.btn {
  transition: filter 0.125s linear;
}

.btn:hover {
  filter: brightness(105%);
  cursor: pointer;
}
</style>
