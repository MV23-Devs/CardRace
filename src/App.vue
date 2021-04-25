<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/collection">Collection</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 40px;
  padding: 0px;
  background-color: #444;
  color: white;
}

#nav a {
  border-right: 1px solid white;
  padding: 10px;
  font-weight: bold;
  color: #fff;
  text-emphasis: none;
  text-decoration: none;
  font-size: 25px;
  /* height: 60px; */
}

#nav a:last-of-type {
  border-right: 0px solid white;
}

#nav a:hover {
  font-weight: bold;
  background-color: #000;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
