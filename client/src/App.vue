<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <transition mode="out-in" name="login">
      <LoginForm @login="startChat" v-if="!isLoggedIn" />
      <AppChat v-else :username="username" :userId="userId" @logout="endChat" />
    </transition>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import AppChat from "./components/Chat";

export default {
  name: "app",
  components: {
    LoginForm,
    AppChat
  },
  data() {
    return {
      isLoggedIn: false,
      username: "",
      userId: null
    };
  },
  methods: {
    startChat(data) {
      this.isLoggedIn = true;
      this.username = data.user;
      this.userId = data.userId;
    },
    endChat() {
      this.isLoggedIn = false;
      this.username = "";
    }
  }
};
</script>

<style>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
}

img {
  display: block;
  margin: 3rem auto;
}

.login-enter {
  opacity: 0;
}

.login-enter-active {
  transition: opacity 0.3s;
}
</style>
