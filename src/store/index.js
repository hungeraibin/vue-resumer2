import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        {field: 'profile', icon: 'id'},
        {field: 'workHistory', icon: 'work'},
        {field: 'education', icon: 'book'},
        {field: 'projects', icon: 'heart'},
        {field: 'awards', icon: 'cup'},
        {field: 'contacts', icon: 'phone'}
      ],
      profile: {
        name: '王爱彬',
        city: '天津',
        title: '前端工程师',
        birthday: '1995-11-20'
      },
      workHistory: [
        {company: 'AB', content: '实习'}
      ],
      education: [
        {school: '科大', content: '本科'}
      ],
      projects: [
        {name: 'Vue', content: '在线简历'}
      ],
      awards: [
        {name: '中美创客', content: '一等奖'}
      ],
      contacts: [
        {contact: 'qq', content: '1149299088'}
      ]
    }
  },
  mutations: {
    initState (state, payload) {
      Object.assign(state, payload);
    },
    switchTab (state, payload) {
      state.selected = payload;
      localStorage.setItem('state', JSON.stringify(state));
    },
    updateResume(state, {path, value}) {
      objectPath.set(state.resume, path, value);
      localStorage.setItem('state', JSON.stringify(state));
    },
    setUser(state, payload) {
      Object.assign(state.user, payload);
      console.log(state.user);
    },
    removeUser(state) {
      state.user.id = null;
    },
    addItem(state, field) {
      if (field === 'workHistory') {
        state.resume.workHistory.push({company: '', content: ''});
      }
      if (field === 'education') {
        state.resume.education.push({school: '', content: ''},);
      }
      if (field === 'projects') {
        state.resume.projects.push( {name: '', content: ''});
      }
      if (field === 'awards') {
        state.resume.awards.push( {name: '', content: ''});
      }
      if (field === 'contacts') {
        state.resume.contacts.push({contact: '', content: ''});
      }
    },
    removeItem(state, {index, field}) {
      if (field === 'workHistory') {
        state.resume.workHistory.splice(index, 1);
      }
      if (field === 'education') {
        state.resume.education.splice(index, 1);
      }
      if (field === 'projects') {
        state.resume.projects.splice(index, 1);
      }
      if (field === 'awards') {
        state.resume.awards.splice(index, 1);
      }
      if (field === 'contacts') {
        state.resume.contacts.splice(index, 1);
      }
    }
  }
})
