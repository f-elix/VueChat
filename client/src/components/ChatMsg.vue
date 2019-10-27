<template>
  <div class="msg-ctn" :class="{ 'current-user': isCurrentUser }">
    <p class="username">{{ user }}</p>
    <p class="msg">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isCurrentUser: {
      type: Boolean
    }
  }
};
</script>

<style scoped>
.msg-ctn {
  width: fit-content;
}

.current-user {
  margin-left: auto;
  text-align: right;
}

.current-user .msg {
  background-color: #202020;
  border-radius: 20px 3px 20px 20px;
}

.username {
  margin: 0;
  font-size: 0.75rem;
  color: grey;
}

.msg {
  background-color: #999;
  padding: 0.5rem;
  border-radius: 3px 20px 20px;
}
</style>