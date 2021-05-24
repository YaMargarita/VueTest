<template>
  <div id="app">
    <MainComponent></MainComponent>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent'
export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Montserrat', sans-serif;
  width: 70%;
  margin: 0 auto;
}
</style>
