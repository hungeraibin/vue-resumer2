<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="page" v-bind:class="{previewMode: previewMode}">
    <header>
      <Topbar class="topbar" v-on:preview="preview"/>
    </header>
    <main>
      <ResumeEditor class="resumeEditor"/>
      <ResumePreview/>
    </main>
    <button id="exitPreview" @click="exitPreview" class="button primary">退出预览</button>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'

  import Topbar from './components/Topbar.vue';
  import ResumeEditor from './components/ResumeEditor.vue';
  import ResumePreview from './components/ResumePreview.vue';
  import icons from './assets/icons'

  import store from './store/index'
  import AV from './lib/leancloud'
  import getAVUser from './lib/getAVUser'

  export default {
    name: 'app',
    store,
    components: {Topbar, ResumeEditor, ResumePreview},
    data() {
      return {
        previewMode: false
      }
    },
    methods: {
      exitPreview() {
        this.previewMode = false
      },
      preview() {
        this.previewMode = true;
      }
    },
    created() {
      document.body.insertAdjacentHTML('afterbegin', icons);
      let state = localStorage.getItem('state');
      if (state) {
        state = JSON.parse(state);
      }
      this.$store.commit('initState', state);
      this.$store.commit('setUser', getAVUser())
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #EAEBEC;
    > main {
      flex-grow: 1;
    }
    > main {
      min-width: 1024px;
      max-width: 1440px;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
      align-self: center;
    }
  }

  .previewMode > header >#topbar {
    display: none;
  }

  .previewMode > main > #resumeEditor {
    display: none;
  }

  #exitPreview {
    display: none;
  }

  .previewMode #exitPreview {
    display: inline-block;
    position: fixed;
    right: 128px;
    bottom: 64px;
  }

  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }


</style>
