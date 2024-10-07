<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <Navbar />
    <!-- Render the content of the current page view -->
    <router-view />
    <InputField label="Email" inputType="email" v-model="model" placeholder="Enter email" required="true"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import InputField from './components/InputField.vue'

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
