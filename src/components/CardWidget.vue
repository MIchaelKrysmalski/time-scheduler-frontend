<template>
  <card-component>
    <h3 class="subtitle is-spaced">
            {{ label }}
    </h3>
    <b-progress 
            type="is-info" 
            :value="Number(value)" 
            show-value
            :max="Number(max)"
        >
      {{ value }}Hr / {{ max }}Hr</b-progress>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'CardWidget',
  components: { CardComponent },
  props: {
    value: {
      type: String,
      default: '0'
    },
    max: {
      type: String,
      default: '0'
    },
    label: {
      type: String,
      default: null
    },
  }
}
</script>
