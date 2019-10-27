<template>
  <div class="jumbotron">
    <h1 class="title">Welcome to VueChat</h1>
    <p class="text-center">
      Logged in as <strong>{{ username }}</strong>
    </p>
    <div class="chat-window" id="chatWindow">
      <ChatMsg
        v-for="message in messages"
        :key="message.msgId"
        :user="message.user"
        :message="message.message"
        :isCurrentUser="message.userId === userId"
      />
      <p v-show="typingUser" class="feedback">{{ typingUser }} is typing...</p>
    </div>
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <textarea
          class="form-control"
          id="exampleTextarea"
          rows="2"
          v-model="message"
          @input="emitTyping"
          @keypress.enter.prevent="sendMessage()"
          autofocus
        ></textarea>
        <button type="submit" class="btn btn-primary btn-lg">Send</button>
      </div>
    </form>
    <button
      type="button"
      class="btn btn-outline-info d-block mx-auto"
      @click="$emit('logout')"
      @keypress.enter="$emit('logout')"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import ChatMsg from "./ChatMsg";

export default {
  props: {
    username: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  components: {
    ChatMsg
  },
  data() {
    return {
      message: "",
      messages: [],
      typingUser: null
    };
  },
  methods: {
    generateId() {
      return (
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    },
    updateChatScroll() {
      const chat = document.getElementById("chatWindow");
      const height = chat.clientHeight;
      setTimeout(() => {
        chat.scrollBy(0, height);
      }, 0);
    },
    sendMessage() {
      if (this.message.length > 1) {
        this.$socket.emit("chat", {
          user: this.username,
          message: this.message,
          msgId: this.generateId(),
          userId: this.userId
        });
        this.message = "";
      }
    },
    emitTyping() {
      this.$socket.emit("typing", this.username);
    }
  },
  sockets: {
    chat(data) {
      this.typingUser = null;
      if (this.userId === data.userId) {
        this.messages.push(data);
        this.updateChatScroll();
      } else {
        data.userId = null;
        this.messages.push(data);
        this.updateChatScroll();
      }
    },
    typing(user) {
      this.typingUser = user;
      this.updateChatScroll();
    }
  }
};
</script>

<style scoped>
.title {
  text-shadow: 0 0 3px;
  color: #00bc8c;
}

.chat-window {
  width: 100%;
  max-width: 28rem;
  height: 21rem;
  margin: 1.5rem auto;
  padding: 0.75rem;
  border-radius: 3px;
  background-color: #fff;
  overflow-y: auto;
}

.chat-window p {
  color: #000;
}

.chat-window p.feedback {
  color: grey;
  font-style: italic;
}

.form-group {
  display: flex;
}

.form-group button {
  margin-left: 0.25rem;
}
</style>