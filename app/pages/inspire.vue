<template>
  <v-row>
    <v-col class="text-center">
      <img
        :src="`${useRuntimeConfig().app.baseURL}v.png`"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default defineComponent({
  name: 'InspirePage'
})
</script>
