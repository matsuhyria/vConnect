<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <Navbar />
    <InputField label="Email" inputType="email" v-model="model" placeholder="Enter email" required="true"/>
    <router-view />
  </div>
</template>

<script>
import InputField from './components/InputField.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
    InputField,
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
