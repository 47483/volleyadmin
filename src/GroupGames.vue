<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'

</script>

<template>
  <AdminDropdown @addclick="console.log('add')" @itemclick="e=>{console.log(e)}"
    title="Lag"
    :icon="`
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5rem' height='1.5rem'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke='#ffffff'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
      style='
        background-color: hsl(100, 50%, 50%);
        border-bottom-left-radius: 1rem;
        border-top-left-radius: 0rem;
      '
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
      <path d='M5 14h14l-4.5 -4.5l4.5 -4.5h-14v16' />
    </svg>
    `"
    :items="[{title:'gooba'}]"
  />
  <AdminDropdown
    title="Grupper"
    :icon="`
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5rem'
      height='1.5rem'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke='#ffffff'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
      style='
        background-color: hsl(100, 50%, 50%);
        border-bottom-left-radius: 1rem;
        border-top-left-radius: 0rem;
      '
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
      <path d='M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1' />
      <path d='M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M17 10h2a2 2 0 0 1 2 2v1' />
      <path d='M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M3 13v-1a2 2 0 0 1 2 -2h2' />
    </svg>
    `"
  />
</template>

<style scoped>

#return-btn {
  background-color: hsl(0, 0%, 40%);
  padding: 0.5rem;
  border-radius: 0.5rem;

  cursor: pointer;
  transition: filter 0.125s linear;
}

#return-btn:hover {
  filter: brightness(105%);
}
</style>
