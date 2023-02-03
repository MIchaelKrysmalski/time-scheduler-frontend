<template>
    <card-component title="Reset Password">
      <form @submit.prevent="submit">
        <b-field horizontal label="New password" message="Required. New password">
          <b-input name="password" type="password" v-model="form.password" required autocomplete="new-password"/>
        </b-field>
        <b-field horizontal label="Confirm password" message="Required. Please repeat your password">
          <b-input name="password_confirmation" type="password" v-model="form.password_confirmation" required
          autocomplete="new-password"/>
        </b-field>
        <hr>
        <b-field horizontal>
          <div class="control">
            <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
              Submit
            </button>
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
    data () {
      return {
        isLoading: false,
        form: {
          password: null,
          password_confirmation: null
        },
        incorrectInput: false,
      }
    },
    methods: {
      async submit () {
        
        if(this.form.password == this.form.password_confirmation && this.form.password.length > 6) {
          this.incorrectInput = false;
          const currentUser = await this.$store.dispatch('getUserById',this.$route.params.id) 
          const response = await this.$store.dispatch('resetPassword', this.form, currentUser);
          if(response) {
            this.$buefy.snackbar.open({
              message: 'Incorrect Input',
              type: 'is-danger',
            });
            this.$router.replace('/client/login');
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
  