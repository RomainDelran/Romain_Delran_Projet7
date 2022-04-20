<template>
<img id= "logo" alt="logo" src="./assets/logo.png">
  
  <router-view/>
</template>





<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
 
}

#logo{
  width:90%;
  object-fit: cover;
    margin: 0.5em 0.5em 0.5em 0.5em  ;
}

.signUpLogin {
  
  padding-top: 2em;
  display: flex;
  justify-content:center;
  
  p {
    margin-bottom:2em ;
    margin-top: 0;
    margin-left: 1em;
    margin-right: 1em;
  }
  a {
    font-weight: bold;
    text-decoration:none;
    cursor: pointer;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#app{
  margin: 0em;
  padding: 0em;
}
body {
  margin: 0em;
  padding: 0em;
}

</style>
