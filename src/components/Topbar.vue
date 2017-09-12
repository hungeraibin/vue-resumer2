<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="buttonWrapper">
        <button class="button primary" @click="saveHref">保存</button>
        <button class="button" @click="preview">预览</button>
      </div>
      <div class="actions">
        <div v-if="logined" class="userActions">
          <span class="welcome">你好, {{user.username}}</span>
          <a class="button" href="#" @click.prevent="signOut">登出</a>
        </div>
        <div v-else class="userActions">
          <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
          <a class="button" href="#" @click.prevent="signInDialogVisible = true">登录</a>
        </div>
      </div>
    </div>
    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="signIn($event)"/>
    </MyDialog>
    <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
  </div>
</template>

<script>
  import MyDialog from './MyDialog.vue'
  import SignUpForm from './SignUpForm.vue'
  import SignInForm from './SignInForm.vue'
  import AV from '../lib/leancloud'

  export default {
    name: 'Topbar',
    data() {
      return {
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      logined() {
        return this.user.id;
      }
    },
    components: {
      MyDialog, SignUpForm, SignInForm
    },
    methods: {
      signOut() {
        AV.User.logOut();
        this.$store.commit('removeUser');
      },
      signIn(user) {
        this.signUpDialogVisible = false;
        this.signInDialogVisible = false;
        this.$store.commit('setUser', user);
      },
      preview() {
        this.$emit('preview');
      },
      saveHref() {
        let href = window.location.href;
        alert(`已保存。链接地址：${href}`);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #topbar {
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    > .wrapper {
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
    }
    > .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .buttonWrapper {
      margin-left: 800px;
    }
    .logo {
      font-family: "Kaushan Script","Helvetica Neue",Helvetica,Arial,cursive;
      font-size: 32px;
      color: #3E94E4;
    }
    .welcome {
      font-family: "Kaushan Script","Helvetica Neue",Helvetica,Arial,cursive;
      font-size: 18px;
      color: #3E94E4;
      margin-right: .5em;
    }
  }

  .button {
    width: 104px;
    height: 40px;
    border: 1px solid #3E94E4;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background-color: #fff;
    color: #3E94E4;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover {
      box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
      opacity: 0.8;
    }
    &.primary {
      color: #fff;
      background-color: #3E94E4;
    }
    .actions {
      display: flex;
      .userActions {
        margin-right: 3em;

      }
    }
  }
</style>
