<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'
import { ref } from 'vue'
import * as api from '@/assets/api.js'

const props = defineProps(['user', 'token'])

const error = ref('')

const remaining = ref([])
const played = ref([])

getMatches()

function getMatches() {
  api.apiGet(`group_match/info/?token=${props.token}`, function(data, res) {
    if (!res) {
      error.value = 'Kunde inte hämta gruppspel'
      return
    }
    remaining.value = []
    played.value = []
    for (let match of data.groups_matches) {
      const name = {name: `${match.team1_name} - ${match.team2_name}`}
      if (match.is_completed) {
        played.value.push({...match, ...name})
      } else {
        remaining.value.push({...match, ...name})
      }
    }
  })
}
</script>

<template>
  <h1>Gruppspel</h1>
  <div v-if="error" class="label error">{{ error }}</div>
  <AdminDropdown
    @addclick="console.log('add')"
    @itemclick="
      (e) => {
        team = e.name
        console.log(e.name)
      }
    "
    noadd="y"
    title="Återstående"
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
        <path d='M5 14h14v-9h-14v16' />
      </svg>
    `"
    :items="remaining"
  />
  <AdminDropdown
    @addclick="console.log('add')"
    @itemclick="
      (e) => {
        team = e.name
        console.log(e.name)
      }
    "
    noadd="y"
    title="Avklarade"
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
        <path
          d='M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z'
          stroke-width='0'
          fill='currentColor'
        />
      </svg>
    `"
    :items="played"
  />
</template>

<style scoped></style>