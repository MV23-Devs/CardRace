<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/collection">Collection</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
  background-color: #444;
  color: white;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-emphasis: none;
  text-decoration: none;
  height: 30px;
}

#nav a:hover {
  font-weight: bold;
  background-color: #000;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
