<script setup>
import AdminDropdown from '@/components/AdminDropdown.vue'
import {ref} from 'vue'
import * as api from '@/assets/api.js'

const props = defineProps(['user', 'token'])

const tournamentIn = ref('')
const tournament = ref(null)
const error = ref('')

const popupError = ref('')
const popupMessage = ref('')
const teamIn = ref('')
const team = ref('')

getTournament()

function getTournament() {
  api.apiGet(`tournament/info/?token=${props.token}`, function(data, res) {
    if (res) {
      tournament.value = data.tournament[0]
    }
  })
}

function openPopup(name) {
  closePopup('')
  popupError.value = null
  popupMessage.value = null
  document.getElementById(name).style.display = null
}

function closePopup(e) {
  if (typeof e == 'string') {
    if (e == '') {
      const popups = document.getElementsByClassName('popup')
      for (let popup of popups) {
        popup.style.display = 'none'
      }
      return
    }

    document.getElementById(e).style.display = 'none'
    return
  }
  if (e.target.classList.contains('popup')) {
    e.target.style.display = 'none'
  }
}

function createTournament() {
  api.apiPost(`tournament/?tournament_name=${tournamentIn.value}&token=${props.token}`, function(data, res) {
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
  if (!tournamentIn.value) {
    popupError.value = 'Turneringen måste ha ett namn'
    return
  }
  api.apiPut(`tournament/${tournament.value.name}/?new_tournament_name=${tournamentIn.value}&token=${props.token}`, function(data, res) {
    if (!res) {
      if (data.detail == 'Tournament name already exists') {
        popupError.value = 'Turneringsnamnet används redan'
        return
      }
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
}

function deleteTournament() {
  api.apiDelete(`tournament/${tournament.value.name}/?token=${props.token}`, function(data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    closePopup('')
    tournament.value = null
  })
}

function createTeam() {
  if (teamIn.value == '') {
    popupError.value = 'Laget måste ha ett namn'
    return
  }
  api.apiPost(`team/?team_name=${teamIn.value}&token=${props.token}`, function(data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
}

function updateTeam() {
  api.apiPut(`team/${team.value}/?new_name=${teamIn.value}&token=${props.token}`, function(data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    team.value = teamIn.value
    getTournament()
    closePopup('')
  })
}

function deleteTeam() {
  api.apiDelete(`team/?token=${props.token}&team_name=${team.value}`, function(data, res) {
    if (!res) {
      popupError.value = 'Något gick fel'
      return
    }
    getTournament()
    closePopup('')
  })
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
    <div v-if="error" class="label error">{{ error }}</div>
  </template>
  <template v-else>
    <div id="createteamP" style="display: none;" class="popup" @mousedown="closePopup">
      <div>
        <h2>Skapa lag</h2>
        <input type="text" class="btn pop-input" placeholder="Lagnamn" @blur="e=>{teamIn = e.target.value}">
        <div v-if="popupError" class="label error">{{ popupError }}</div>
        <div class="btn" @click="createTeam">Skapa lag</div>
      </div>
    </div>
    <div id="teamP" style="display: none" class="popup" @mousedown="closePopup">
      <div>
        <h2>Laguppgifter, {{ team }}</h2>
        <div class="label">Lagnamn:</div>
        <input type="text" class="btn pop-input" :value="team" placeholder="Lagnamn" @blur="e=>{teamIn = e.target.value}">
        <div class="btn" @click="updateTeam">Spara</div>
        <div class="btn" @click="deleteTeam">Ta bort {{ team }}</div>
        <div v-if="popupError" class="label error">{{ popupError }}</div>
      </div>
    </div>
    <div id="tournamentP" style="display: none" class="popup" @mousedown="closePopup">
      <div>
        <h2>{{ tournament.name }}</h2>
        <div class="label">Turneringsnamn:</div>
        <input type="text" class="btn pop-input" :value="tournament.name" placeholder="Turneringsnamn" @blur="e=>{tournamentIn = e.target.value}">
        <div class="btn" @click="updateTournament">Spara</div>
        <div class="btn" @click="deleteTournament">Ta bort {{ tournament.name }}</div>
        <div v-if="popupError" class="label error">{{ popupError }}</div>
      </div>
    </div>
    <div id="tournament-edit" class="bar" @click="openPopup('tournamentP')">
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
    <AdminDropdown @addclick="openPopup('createteamP')" @itemclick="e=>{team=e.name; openPopup('teamP')}"
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
    <div class="btn">Gruppera lag slumpmässigt</div>
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

#tournament-edit {
  cursor: pointer;
}
</style>
