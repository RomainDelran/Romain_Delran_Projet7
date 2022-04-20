<template>
  <div >

      <div class="menu-signup-login">
        <nav class="signUpLogin">
          <a class="login" v-on:click="basculeEnLogin()"> Login </a>
          <p>|</p>
          <a class="signUp" v-on:click="basculeCreateAccount()"> Sign-Up </a> 
        </nav>
    </div>

    <h1 v-if="mode == 'login'">Login</h1>
    <h1 v-else>Create account</h1>
    
    <div class="formulaire">
      <label for="mail">Mail:</label>
      <br/>
      <input v-model="email" type="text" id="mail" name="mail" size="20">
      <br/><br/> 
      <label for="password">Password:</label>
      <br/>
      <input  v-model="password" type="password" id="password" name="password" size="20">
      <br/> <br/>  
      <p  class="message" >{{ this.$store.state.messageDeConnection }}</p>
      <input @click="login()" class="boutonCreerLogin" v-bind:class="{'boutonCreerLogin--disable' : !validatedFields}" type="button" value="Submit" v-if="mode == 'login'" href = "http://localhost:8080/profil">
      <input @click="createAccount()" class="boutonCreerLogin" v-bind:class="{'boutonCreerLogin--disable' : !validatedFields}" type="button" value="Create" v-else>
      
    </div>
 
  </div>
  

  
</template>



<script>



export default {
	name: 'LoginView',
	
  
  data: function (){
    return{
      mode:'login',
      email : '',
      password:'',
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create'){
        if (this.email != "" &&  this.password != ""){
          return true;
        }else{
          return false;
        }
      }else{
        if (this.email != "" &&  this.password != ""){
          return true;
        }else{
          return false;
        }
      }
    },
    
  },
  
  mounted() {
        let identifiantLoginJSON = localStorage.getItem('identifiantLogin');
        let identifiantLoginAvantMontage = JSON.parse(identifiantLoginJSON);
        
        if (identifiantLoginAvantMontage !== null) {
          this.email = identifiantLoginAvantMontage.email;
          this.password = identifiantLoginAvantMontage.password;
          this.$store.state.user.token = identifiantLoginAvantMontage.token ;
          this.$store.state.user.user_id = identifiantLoginAvantMontage.user_id ;
        }
        console.log(identifiantLoginAvantMontage);
        if ((this.email !=="" && this.password !=="") ){
          this.login();
        }
        
        
        },
  



  methods:{

    basculeCreateAccount: function (){
      this.mode = 'create';
    },
    basculeEnLogin : function(){
      this.mode= 'login';
    },
    login : function (){
      const self = this;
      const identifiantLoginAvantMontage = {
        email: this.email,
        password: this.password,
        token : this.$store.state.user.token,
        user_id: this.$store.state.user.user_id
      }
      localStorage.setItem('identifiantLogin',JSON.stringify(identifiantLoginAvantMontage));
      
      this.$store.dispatch('login', identifiantLoginAvantMontage)
      .then (function (reponse){
        

        self.$router.push({ name: 'filactualite' });
        console.log(reponse);
      }, function (error) {
        
        console.log(error);
      })
    },
    createAccount: function (){
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        password: this.password
      }).then (function (reponse){
        self.login();
        console.log(reponse);
      }, function (error) {
        console.log(error);
      })
    }
  }
}
</script>


<style lang="scss">
.boutonCreerLogin{
  background-color: red;
  padding: 0.5em 1em 0.5em 1em;
  border-radius: 1em;
  cursor: pointer;
}

.boutonCreerLogin--disable{
  background-color: gray;
}
</style>