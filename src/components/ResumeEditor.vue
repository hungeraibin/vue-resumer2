<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config"
            :class="{active: item.field === selected}"
            @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resume.config" v-show="item.field === selected">
        <div v-if="resume[item.field] instanceof Array">
          <div class="subitem" v-for="(subitem, index) in resume[item.field]">
            <span class="close" @click="removeItem(index, item.field)">x</span>
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{key}} </label>
              <input type="text" :value="value"
                     @input="changeResumeField(`${item.field}.${index}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
          <button class="button primary" @click="addItem(item.field)">添加一项</button>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{key}} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
          <hr>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',

    computed: {
      selected: {
        get() {
          return this.$store.state.selected;
        },
        set(value) {
          return this.$store.commit('switchTab', value);
        }
      },
      resume () {
        return this.$store.state.resume;
      }
    },
    methods: {
      changeResumeField(path, value) {
        this.$store.commit('updateResume', {
          path,
          value
        })
      },
      addItem(field) {
        this.$store.commit('addItem', field);
      },
      removeItem(index, field) {
        this.$store.commit('removeItem', {index, field});
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  #resumeEditor {
    min-width: 35%;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav {
      width: 80px;
      background-color: white;
      color: #222;
      cursor: pointer;
      border-right: 1px solid #ccc;
      > ol {
        > li {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active {
            background-color: white;
            color: #3E94E4;
          }

        }
      }
    }
    > .panels {
      flex-grow: 1;
      > li {
        padding: 24px;
        .resumeField {
          > label {
            display: block;
          }
          input[type=text] {
            margin: 16px 0;
            border: 1px solid #ddd;
            box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);
            width: 100%;
            height: 40px;
            padding: 0 8px;
          }
        }
      }
    }
  }

  ol {
    list-style: none;
  }

  svg.icon {
    width: 24px;
    height: 24px;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
  .close {
    line-height: 1.2;
    color: #3E94E4;;
    margin-left: 350px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
</style>
