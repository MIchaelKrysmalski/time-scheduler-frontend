<template>
  <nav id="navbar-main" class="navbar is-fixed-top">
    
    <div class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop" @click.prevent="menuNavBarToggle">
        <b-icon custom-size="default"/>
      </a>
    </div>
    <div class="navbar-menu fadeIn animated faster">
      <div class="navbar-end">
        <span class="navbar-item is-desktop-icon-only">{{ userName }}</span>
        <a v-if="isLoggedIn" class="navbar-item is-desktop-icon-only" title="Log out" @click="logout">
          <b-icon icon="logout" custom-size="default"/>
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  components: {
  },
  data () {
    return {
      isLoggedIn: true
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    async logout () {
      //
      await this.$store.dispatch('logout');
      this.$buefy.snackbar.open({
        message: 'Logged out!',
      })
      this.$router.replace('/');
    }
  }
}
</script>
