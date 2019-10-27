<template>
  <form action="" @submit.prevent="login">
    <div class="form-group">
      <label class="col-form-label col-form-label-lg" for="username"
        ><h1>Enter a username</h1></label
      >
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Username..."
        v-model="username"
        id="username"
      />
    </div>
    <button type="submit" class="btn btn-primary btn-lg btn-block btn-success">
      Submit
    </button>
    <p class="text-danger" v-if="invalidInput">
      Please provide a username.
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      invalidInput: false
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
    login() {
      if (this.username.length > 0) {
        this.$emit("login", {
          user: this.username,
          userId: this.generateId()
        });
      } else {
        this.invalidInput = true;
      }
    }
  }
};
</script>

<style scoped>
form {
  text-align: center;
}
</style>