<template>
  <div class="dialogWrappe" v-show="visible">
    <div class="dialog">
      <header>
        {{title}}
        <span class="close" @click="close">x</span>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyDialog',
    props: ['title', 'visible'],
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .dialogWrappe {
    position: fixed;
    background-color: hsla(0,0,0,0.25);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    background-color: white;
    min-height: 4em;
    min-width: 24em;
    border-radius: 8px;
    padding: 16px 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    > header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #333;
      border-bottom: 1px solid #ddd;
      span {
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
        &:hover {
          color: #000;
        }
      }
    }
    > main {
      padding: 16px;
    }
  }
</style>
