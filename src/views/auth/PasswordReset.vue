<template>
  <card-component title="Reset Password">
    <form @submit.prevent="submit">
      <b-field horizontal label="Enter your Email" message="Required. Your Email Adress from this Account">
        <b-input name="email" type="email" v-model="form.email" required autocomplete="email"/>
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
        email: null
      },
      incorrectInput: false,
    }
  },
  methods: {
    async submit () {
      
      if(this.form.email && this.form.email.includes('@')) {
        this.incorrectInput = false;
        const response = await this.$store.dispatch('sendResetMail', this.form);
        if(response) {
          this.$buefy.snackbar.open({
            message: 'Mail Send',
            type: 'is-success',
          });
          this.$router.replace('/client/password-reset/verification');
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
