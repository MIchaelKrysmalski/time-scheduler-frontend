<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'AppComponent',
  data () {
    return {
      id: null
    }
  },
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    menu () {
      if(this.isAuthenticated) {
        return [
        'General',
        [
          {
            to: `/timeEntry/new:${this.id}`,
            icon: 'clock',
            label: 'New Entry'
          },
          {
            to: `/client/dashboard:${this.id}`,
            icon: 'home',
            label: 'Dashboard'
          },
          {
            to: `/client/report:${this.id}`,
            icon: 'flag',
            label: 'Report'
          },
        ],
        'Administration',
        [
          {
            to: '/client/dashboard',
            icon: 'account',
            label: 'Employee Dashboard'
          },
          {
            to: '/project/dashboard',
            icon: 'clipboard',
            label: 'Project Dashboard'
          },
          {
            to: '/project/reports',
            icon: 'desktop-mac',
            label: 'Report'
          },
        ],
      ]
      } else {
        return [
        'Auth',
        [
          {
            to: '/client/login',
            icon: 'account',
            label: 'Login'
          },
        ],
        ]
      }
      
    }
  },
  async created () {
    this.$store.dispatch("tryLogin");
    this.id = this.$store.getters.getUserId;
  },
  methods: {
  }
}
</script>
