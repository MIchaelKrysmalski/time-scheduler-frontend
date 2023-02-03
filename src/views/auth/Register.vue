<template>
  <card-component title="Register">
    <form @submit.prevent="submit">
      <b-field horizontal label="Firstname" message="Required. Firstname">
        <b-input name="firstname" type="text" v-model="form.firstname" required autocomplete="firstname"/>
      </b-field>
      <b-field horizontal label="Lastname" message="Required. Lastname">
        <b-input name="lastname" type="text" v-model="form.lastname" required autocomplete="lastname"/>
      </b-field>
      <b-field horizontal label="Email" message="Required. Email">
        <b-input name="email" type="email" v-model="form.email" required autocomplete="email"/>
      </b-field>
      <b-field horizontal label="Password" message="Required. Please Password">
        <b-input name="password" type="password" v-model="form.password" required
        autocomplete="password"/>
      </b-field>
      <b-field horizontal label="Repeat Password" message="Required. Please Password">
        <b-input name="repeat password" type="password" v-model="form.passwordValidation" required
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
          <button class="button is-info is-outlined" @click.prevent="login">Login</button>
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
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        passwordValidation: null,
      },
      incorrectInput: false,
    }
  },
  methods: {
    async resetPassword () {
      this.$router.replace('/client/password-reset')
    },
    async submit () {
      
      if(this.form.password && this.form.email && this.form.password === this.form.passwordValidation) {
        this.incorrectInput = false;
        const response = await this.$store.dispatch('register',this.form) 
        if(response) {
          this.$buefy.snackbar.open({
            message: `Successfully registered`,
            type: 'is-success',
          });
          this.$router.replace(`/client/login`);
        }
      } else {
        this.incorrectInput = true;
        this.form.password = '';
        this.form.passwordValidation = '';

        this.$buefy.snackbar.open({
        message: 'Incorrect Input',
        type: 'is-danger',
        });
        return;
      }
    },
    login() {
      this.$router.replace(`/client/login`);
    }
  }
}
</script>
