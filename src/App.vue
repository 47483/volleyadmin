<script setup>
import { ref } from 'vue'
import GroupGames from './GroupGames.vue'
import * as api from '@/assets/api.js'

const user = ref(null)
const token = ref(null)

const userIn = ref('')
const mailIn = ref('')
const passIn = ref('')
const passAgainIn = ref('')

const popupError = ref('')

window.onload = function() {
  const sUser = sessionStorage.getItem('user')
  const sToken = sessionStorage.getItem('token')
  if (sUser && sToken) {
    user.value = sUser
    token.value = sToken
  }
};

function openPopup(name) {
  document.getElementById(name).style.display = null
  popupError.value = null
}

function closePopup(e) {
  if (e.target.classList.contains('popup')) {
    e.target.style.display = 'none'
  }
}

function login() {
  if (!userIn.value) {
    popupError.value = 'Användarnamn saknas'
    return
  }
  if (!passIn.value) {
    popupError.value = 'Lösenord saknas'
    return
  }
  api.post(`user/token/?username=${userIn.value}&password=${passIn.value}`, function (data, res) {
    if (!res) {
      popupError.value = 'Fel inloggningsuppgifter'
      return
    }

    user.value = userIn.value
    token.value = data.token
    sessionStorage.setItem('user', user.value)
    sessionStorage.setItem('token', token.value)
  })
}

function logout() {
  user.value = null
  token.value = null
  sessionStorage.clear()
}

function signup() {
  if (!userIn.value) {
    popupError.value = 'Användarnamn saknas'
    return
  }
  if (!mailIn.value) {
    popupError.value = 'Epost-address saknas'
    return
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mailIn.value)) {
    popupError.value = 'Epost-addressen måste vara giltig'
    return
  }
  if (!passIn.value) {
    popupError.value = 'Lösenord saknas'
    return
  }
  if (!passAgainIn.value) {
    popupError.value = 'Du måste fylla i lösenordet igen'
    return
  }
  if (passIn.value !== passAgainIn.value) {
    popupError.value = 'Lösenorden måste matcha'
    return
  }
  api.post(
    `user/?username=${userIn.value}&password=${passIn.value}&email=${mailIn.value}`,
    function (data, res) {
      if (!res) {
        console.log(data)
        if (data?.detail == 'User already exists') {
          popupError.value = 'Användarnamnet används redan'
          return
        }
        popupError.value = 'Kunde inte skapa konto'
        return
      }

      user.value = data.username
      token.value = data.token
      sessionStorage.setItem('user', user.value)
      sessionStorage.setItem('token', token.value)
    }
  )
}
</script>

<template>
  <div id="bg" class="cover" />
  <div class="cover" style="background-color: hsla(0, 0%, 0%, 0.1)" />
  <main>
    <div id="wrapper">
      <template v-if="user">
        <div class="bar">
          <h1>Tournament</h1>
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
        <div class="bar-two">
          <div class="btn" @click="logout">Logga ut</div>
          <div class="btn" @click="openPopup('usermanageP')">Hantera konto</div>
        </div>
        <div id="usermanageP" style="display: none" class="popup" @click="closePopup">
          <div>
            <h3>Framtida användarmöjligheter</h3>
          </div>
        </div>
        <GroupGames />
      </template>
      <template v-else>
        <div class="label">Logga in för att kunna skapa och hantera dina egna turneringar</div>
        <div class="bar-two">
          <div class="btn" @click="openPopup('loginP')">Logga in</div>
          <div class="btn" @click="openPopup('signupP')">Skapa konto</div>
        </div>
        <div id="loginP" style="display: none" class="popup" @mousedown="closePopup">
          <div>
            <h3>Välkommen tillbaka!</h3>
            <div class="label">Användarnamn:</div>
            <input
              class="btn pop-input"
              type="text"
              :value="userIn"
              @blur="function(e) {userIn = e.target.value}"
            />
            <div class="label">Lösenord:</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passIn"
              @blur="function(e) {passIn = e.target.value}"
            />
            <div class="btn" @click="login">Logga in</div>
            <div class="label error">{{ popupError }}</div>
            <a href="https://www.urbandictionary.com/define.php?term=skill%20issue" class="label">
              Glömt ditt lösenord?
            </a>
          </div>
        </div>
        <div id="signupP" style="display: none" class="popup" @mousedown="closePopup">
          <div>
            <h3>Välkommen till VBT!</h3>
            <div class="label">Användarnamn:</div>
            <input
              class="btn pop-input"
              type="text"
              :value="userIn"
              @blur="function(e) {userIn = e.target.value}"
            />
            <div class="label">Epost:</div>
            <input
              class="btn pop-input"
              type="text"
              :value="mailIn"
              @blur="function(e) {mailIn = e.target.value}"
            />
            <div class="label">Lösenord:</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passIn"
              @blur="function(e) {passIn = e.target.value}"
            />
            <div class="label">Lösenord (igen):</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passAgainIn"
              @blur="function(e) {passAgainIn = e.target.value}"
            />
            <div class="btn" @click="signup">Skapa konto</div>
            <div class="label error">{{ popupError }}</div>
          </div>
        </div>
        <div class="title" style="margin: 3rem">
          As a wise man (Bill Murray) once said: Whatever you do, always give 100%. Unless you're
          donating blood.
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  user-select: none;
  color: white;
}

#wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 720px;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#bg {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 20%), hsl(0, 0%, 30%));
  background-position: center;
  background-size: cover;
}

.label {
  color: white;
  margin: 0.5rem;
}

.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem;
}

.bar > * {
  margin: 0.25rem;
}

.bar-two {
  width: 100%;
  display: flex;
}

.bar-two > * {
  width: 50%;
}

.btn {
  background-color: hsl(0, 0%, 40%);
  margin: 0.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  font-weight: bold;
  transition: filter 0.125s linear;
}

.btn:hover {
  filter: brightness(105%);
  cursor: pointer;
}

.pop-input {
  background-color: white;
  border: 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background-color: hsla(0, 0%, 0%, 0.75);
}

.error {
  color: red;
}
</style>
