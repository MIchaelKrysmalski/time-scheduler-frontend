<template>
  <card-component title="Login">
    <form @submit.prevent="submit">
      <b-field horizontal label="Email" message="Required. Email">
        <b-input name="email" type="email" v-model="form.email" required autocomplete="email"/>
      </b-field>
      <b-field horizontal label="Password" message="Required. Please Password">
        <b-input name="password" type="password" v-model="form.password" required
        autocomplete="password"/>
      </b-field>
      <hr>
      <b-field grouped>
        <div class="control">
          <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
            Submit
          </button>
        </div>
        <div class="control">
          <button class="button is-info is-outlined" @click.prevent="resetPassword">Forget Password</button>
        </div>
      </b-field>
      <p v-if="incorrectInput"> Please Enter a Valid Password</p>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  created() {
    if(this.$store.getters.isAuthenticated) { 
      this.$router.replace(`/client/dashboard:${this.$store.getters.getUserId}`);
    }
  },
  data () {
    return {
      isLoading: false,
      form: {
        email: null,
        password: null
      },
      incorrectInput: false,
    }
  },
  methods: {
    async resetPassword () {
      this.$router.replace('/client/password-reset')
    },
    async submit () {
      
      if(this.form.password && this.form.email) {
        this.incorrectInput = false;
        const loggedInUser = await this.$store.dispatch('getUser',this.form) 
        if(loggedInUser) {
          this.$buefy.snackbar.open({
            message: `Hallo ${loggedInUser.firstname}`,
            type: 'is-danger',
          });
          this.$router.replace(`/client/dashboard:${this.$store.getters.getUserId}`);
        }
      } else {
        this.incorrectInput = true;
        this.form.password = '';
        this.form.password_confirmation = '';

        this.$buefy.snackbar.open({
        message: 'Incorrect Input',
        type: 'is-danger',
        });
        return;
      }
    }
  }
}
</script>
