import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../interceptors/axios.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    firstname: null,
    lastname: null,
    email: null,
    userId: null,
    isPasswordReset: null,
    token: null,
    refreshToken: null,
    isAuthenticated: null,

    projects: [],
    timeEntries: [],
    allTimeEntries: [],
    users: [],



    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

    /* Dark mode */
    isDarkModeActive: false
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUserId(state) {
      return state.userId;
    },
    getTokens(state) {
      return {
        accessToken: state.token,
        refreshToken: state.refreshToken
      }
    },
    getAllTimeEntriesByUser(state) {
      return state.timeEntries;
    },
    getAllTimeEntries() {

    }
  },
  mutations: {

    getUserById (state, payload) {
      if(payload) {
        state.userName = payload.userName;
        state.email = payload.email;
        state.userId = payload.userId;
        return payload;
      }
    },

    setTimeEntries(state, payload) {
      state.allTimeEntries = payload
    },
    setUserTimeEntries(state, payload) {
      console.log("Payload",payload);
      state.timeEntries = payload
    },

    refresh(state, payload) {
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;

      localStorage.setItem('token', payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },

    setUser(state, payload) {
        state.firstname = payload.firstname;
        state.lastname = payload.lastname
        state.email = payload.email;
        state.userId = payload.userId;
        state.token = payload.accessToken;
        state.refreshToken = payload.refreshToken

      //check if login succesfull
      state.isAuthenticated = true;
    },

    setProjects(state, payload) {
      state.projects = payload;
    },

    setUserId (state, payload) {
      if(payload) {
        state.userId = payload;
        return payload;
      }
      return null;
    },

    setUsers (state, payload) {
      state.users = payload
    },

    resetPassword (state, payload) {
      if(payload) {
        state.userId = "1";
      }
      return true;
    },

    isPasswordReset(state) {
      state.isPasswordReset = true;
    },

  },
  actions: {
    resetPassword(context, payload) {
      if(payload)
      //Axios here resetPassword
      context.commit("isPasswordReset")
    },

    async sendResetMail(context) {
      //Axios here sendResetPasswordMail
      const user = {
        name: 'Michael',
        email: 'mk@bitsandlikes.de',
        id: "1"
      }
      context.commit("setUserId", user.id);
      return user.id;
    },

    async newEntry(context, payload) {
      await axios.post(`http://localhost:3000/time-entry/${context.getters.getUserId}`, {
        task: payload.task,
        startTime: payload.startTime,
        endTime: payload.endTime,
        description: payload.description
      })
    },

    async editEntry(context, payload) {
      console.log(payload.startTime);
      await axios.patch(`http://localhost:3000/time-entry/${context.getters.getUserId}`, {
        task: payload.task,
        startTime: payload.startTime,
        endTime: payload.endTime,
        timeSpent: payload.timeSpent,
        description: payload.description
      })
    },

    async getProjects(context) {
      const response = await axios.get('http://localhost:3000/project')
      context.commit("setProjects",response.data);
      return response.data;
    },

    async getUserTimeEntries(context) {
      const response = await axios.get(`http://localhost:3000/time-entry/${context.state.userId}`)
      context.commit("setUserTimeEntries",response.data);
      return response.data;
    },
    async getTimeEntries(context) {
      const response = await axios.get(`http://localhost:3000/time-entry`)
      context.commit("setTimeEntries",response.data);
      return response.data;
    },
    async getAllUsers(context) {
      const response = await axios.get(`http://localhost:3000/user`)
      context.commit("setUsers",response.data);
      return response.data;
    },

    async newProject(context, payload) {
      const response = await axios.post(`http://localhost:3000/project`,
        payload
      );
      context.state.projects.push(response.data);
      return response.data;
    },

    async editProject(context, payload) {
      const response = await axios.patch(`http://localhost:3000/project/${payload.id}`,
        payload
      );
      return response.data;
    },

    async register(context, payload) {
      const response = await axios.post('http://localhost:3000/auth/register', {
          email: payload.email,
          password: payload.password,
          firstname: payload.firstname,
          lastname: payload.lastname
      })
      if(response.status === 201){
        return true
      } else {
        throw new Error(`Registration failed with status code ${ response.status }`);
      }
    },

    async getUser(context, payload) {

      const response = await axios.post('http://localhost:3000/auth/login', {
        email: payload.email,
        password: payload.password,
      })

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('firstname', response.data.firstname);
      localStorage.setItem('lastname', response.data.lastname);
      localStorage.setItem('email', response.data.email);

      context.commit("setUserTimeEntries",{
        ...response.data.timeEntries
      })
      context.commit("setUser", {
        ...response.data,
        userId: response.data.id,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    },

    async tryLogin(context) {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId');
      const firstname = localStorage.getItem('firstname');
      const lastname = localStorage.getItem('lastname');
      const email = localStorage.getItem('email');
        context.commit('setUser', {
          accessToken: token,
          refreshToken: refreshToken,
          userId: userId,
          firstname: firstname,
          lastname: lastname,
          email: email
        })
    },

    async logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('email');

      context.commit('setUser',{
        token: null,
        refreshToken: null,
        userId: null,
        firstname: null,
        lastname: null,
        email: null
      });
    }
  }
})
