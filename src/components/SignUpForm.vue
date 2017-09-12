<template>
  <div>
    <form class="form" @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class="errorMessage">{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignUpForm',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      signUp() {
        let {username, password} = this.formData;
        var user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.signUp().then(() => {
          this.$emit('success', getAVUser())
        }, (error) => {
          this.errorMessage = getErrorMessage(error);
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  form {
    .row {
      label {
        display: block;
      }
      input {
        margin: 16px 0;
        border: 1px solid #ddd;
        box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        width: 100%;
        height: 40px;
        padding: 0 8px;
      }
    }
    .actions {
      input {
        width: 64px;
        height: 32px;
        margin-top: 16px;
        color: #3E94E4;
        background-color: white;
        border: 1px solid #3E94E4;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          color: white;
          background-color: #3E94E4;
        }
      }
    }
  }
</style>
