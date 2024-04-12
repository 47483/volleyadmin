<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'
import {ref} from 'vue'
import * as api from '@/assets/api.js'

const props = defineProps(['user', 'token'])

const tournamentIn = ref('')
const tournament = ref(null)
const error = ref('')

const popupError = ref(null)
const oldnameIn = ref('')
const nameIn = ref('')

getTournament()

function getTournament() {
  api.get(`tournament/info/?token=${props.token}`, function(data, res) {
    if (res) {
      tournament.value = data.tournament[0]
    }
  })
}

function openPopup(name) {
  document.getElementById(name).style.display = null
  popupError.value = null
}

function closePopup(e) {
  if (e.target.classList.contains('popup')) {
    e.target.style.display = 'none'
  }
}

function createTournament() {
  api.post(`tournament/?tournament_name=${tournamentIn.value}&token=${props.token}`, function(data, res) {
    if (!res) {
      if (data?.detail == 'User already has a tournament') {
        error.value = 'Något gick fel, du borde inte vara här'
        return
      }
      error.value = 'Kunde inte skapa turnering, försök igen senare'
      return
    }
    tournament.value = data
  })
}

function updateTournament() {

}

function deleteTournament() {

}

function createTeam() {

}

function updateTeam(team) {
  api.put(`team/${team}/?new_name=${nameIn.value}&token=${props.token}`, function(data, res) {
    if (res) {
      getTournament()
    }
  })
}

function deleteTeam() {

}

function bulkGroup() {

}

function createGroup() {

}

function updateGroup() {

}

function deleteGroup() {

}
</script>

<template>
  <template v-if="!tournament">
    <div class="label">Du har inte skapat en turnering ännu</div>
    <input type="text" class="full" id="tname-input" placeholder="Turneringsnamn" :value="tournamentIn" @blur="e=>{tournamentIn = e.target.value}">
    <div class="full btn" @click="createTournament">Skapa Turnering</div>
    <div class="label error">{{ error }}</div>
  </template>
  <template v-else>
    <div id="teamP" style="display: none" class="popup" @mousedown="closePopup">
      <div>
        <h2>Laguppgifter, {{ nameIn }}</h2>
        <div class="label">Lagnamn:</div>
        <input type="text" class="btn pop-input" :value="nameIn" placeholder="Lagnamn" @blur="e=>{oldnameIn = nameIn; nameIn = e.target.value; updateTeam(oldnameIn)}">
      </div>
    </div>
    <div class="bar">
      <h1>{{ tournament.name }}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    </div>
    <AdminDropdown @addclick="console.log('add')" @itemclick="e=>{nameIn=e.name; openPopup('teamP')}"
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
      :items="tournament.teams"
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
      :items="tournament.groups"
    />
  </template>
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

#tname-input {
  padding: 1.25rem;
  margin: 0.5rem;
  border: 0;
  border-radius: 1rem;
  font-weight: bold;
}
</style>
