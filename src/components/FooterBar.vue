<template>
  <footer class="footer is-fixed-bottom">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ date }}, TimeScheduler</b> &mdash; Your TimeScheduler Frontend <span class="tag">v1.0.0</span>
            </div>
          </div>
        </div>
        <div class="level-right">
          <p>TimeScheduler</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    date () {
      return 2022;
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
