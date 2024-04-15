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

const popupError = ref(null)
const popupMessage = ref(null)

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
  popupError.value = null
  popupMessage.value = null
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
  api.apiPost(`user/token/?username=${userIn.value}&password=${passIn.value}`, function (data, res) {
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
  api.apiPost(
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

function forgotPass() {
  if (!mailIn.value) {
    popupError.value = 'Du behöver fylla i epost-addressen för ditt konto'
    return
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mailIn.value)) {
    popupError.value = 'Epost-addressen måste vara giltig'
    return
  }
  api.apiPost(`user/forgot-password/?email=${mailIn.value}`, function(data, res) {
    if (!res) {
      popupError.value = 'Något gick fel, kontrollera din valda epost'
      return
    }

    popupMessage.value = `Ett mejl har skickats till ${mailIn.value}`
  })
}
</script>

<template>
  <div id="bg" class="cover" />
  <div class="cover" style="background-color: hsla(0, 0%, 0%, 0.1)" />
  <main>
    <div id="wrapper">
      <div id="forgotP" style="display: none" class="popup" @click="closePopup">
        <div>
          <h3 class="label">Glömt lösenordet?</h3>
          <div class="label">Vi skickar dig ett återställningsmejl via din epost:</div>
          <input
            class="btn pop-input"
            type="text"
            :value="mailIn"
            @blur="e=>{mailIn = e.target.value}"
            placeholder="minaddress@exempel.com"
          />
          <div v-if="popupError" class="label error">{{ popupError }}</div>
          <div class="btn" @click="forgotPass">Skicka återställningsmejl</div>
          <div v-if="popupMessage" class="label">{{ popupMessage }}</div>
        </div>
      </div>
      <template v-if="user">
        <div class="bar-two">
          <div class="btn" @click="logout">Logga ut</div>
          <div class="btn" @click="openPopup('usermanageP')">Hantera konto</div>
        </div>
        <div id="usermanageP" style="display: none" class="popup" @click="closePopup">
          <div>
            <div>Framtida möjligheter</div>
          </div>
        </div>
        <GroupGames :user="user" :token="token" />
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
              @blur="e=>{userIn = e.target.value}"
            />
            <div class="label">Lösenord:</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passIn"
              @blur="e=>{passIn = e.target.value}"
            />
            <div class="btn" @click="login">Logga in</div>
            <div v-if="popupError" class="label error">{{ popupError }}</div>
            <div class="label" style="text-decoration: underline; cursor: pointer;" @click="closePopup(''); openPopup('forgotP')">Glömt ditt lösenord?</div>
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
              @blur="e=>{userIn = e.target.value}"
            />
            <div class="label">Epost:</div>
            <input
              class="btn pop-input"
              type="text"
              :value="mailIn"
              @blur="e=>{mailIn = e.target.value}"
            />
            <div class="label">Lösenord:</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passIn"
              @blur="e=>{passIn = e.target.value}"
            />
            <div class="label">Lösenord (igen):</div>
            <input
              class="btn pop-input"
              type="password"
              :value="passAgainIn"
              @blur="e=>{passAgainIn = e.target.value}"
            />
            <div class="btn" @click="signup">Skapa konto</div>
            <div v-if="popupError" class="label error">{{ popupError }}</div>
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
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 720px;
}

#bg {
  background-image: linear-gradient(to bottom, hsl(0, 0%, 20%), hsl(0, 0%, 30%));
  background-position: center;
  background-size: cover;
}

.bar-two {
  width: 100%;
  display: flex;
}

.bar-two > * {
  width: 50%;
}
</style>
