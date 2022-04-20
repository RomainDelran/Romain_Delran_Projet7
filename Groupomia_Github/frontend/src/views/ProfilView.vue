<template>
  <div class="profil">
    

    <div class="ProfilFilActualite">
        <h2 class="menuFilActualite" id="deconnection" @click="deconnection()">Déconnection </h2> 
        <h2 class="menuFilActualite" id="filActualite" @click="filActualite()">Fil d'actualite </h2> 
    </div>

    <img id= "profilVisuel" alt="Photo" src='../../../backend/visuels/profile.jpg'>

    <p class="nomProfilTexte">nom:</p>
    <div class="ProfilTexte">
        <h2 v-if="mode == 'normal'" id="Nom">{{this.$store.state.utilisateur.nom}} </h2>
        <input v-else v-model="nom" type="text" id="nom" name="nom" size="20" placeholder="nom"> 
    </div>
    <p class="nomProfilTexte">prenom:</p>
    <div class="ProfilTexte">
        <h2 v-if="mode == 'normal'" id="Prenom">{{this.$store.state.utilisateur.prenom}}</h2> 
        <input v-else v-model="prenom" type="text" id="prenom" name="prenom" size="20" placeholder="prenom">
    </div>
    <p class="nomProfilTexte">Adresse email:</p>
    <div class="ProfilTexte">
        <h2  id="Mail">{{this.$store.state.utilisateur.email}}</h2> 
    </div>

    <input  v-if="mode == 'normal'" @click="modeModifierAccount()" class="ModifierCompte" type="button" value="Modifier compte">
    <div class="modification">
      <input  v-if="mode == 'modifier'" @click="validerModification()" class="ModifierCompte" type="button" value="Valider modification">
      <input  v-if="mode == 'modifier'" @click="annulerModification()" class="ModifierCompte" type="button" value="Annuler">
    </div>
    <br/><br/><br/>


    <input @click="deleteOne()" class="SupprimerCompte" type="button" value="Supprimer compte">

  </div>
</template>



<script>


export default {
	name: 'ProfilView',

data: function (){
    return{
      user_id:-1,
      mode:'normal',
      nom:'',
      prenom:'',
      email : '',
      password:'',
      urlPhoto:''
    }
  },
  beforeMount() { 


      let identifiantLoginJSON = localStorage.getItem('identifiantLogin');
      let identifiantLoginAvantMontage = JSON.parse(identifiantLoginJSON);
        
      this.email = identifiantLoginAvantMontage.email;
      this.password = identifiantLoginAvantMontage.password;
      this.$store.state.user.token = identifiantLoginAvantMontage.token ;
      this.$store.state.user.user_id = identifiantLoginAvantMontage.user_id ;



      this.$store.dispatch('recupererAccount', {
        user_id: this.$store.state.user.user_id,

      }).then (function (reponse){
        
        console.log(reponse);
      }, function (error) {
        console.log(error);
      })
 
    },

  



  methods:{


    modeModifierAccount: function (){
      this.mode = 'modifier';
    },

    validerModification: function (){
      const self = this;
      this.$store.dispatch('modifierAccount', {
        user_id: this.$store.state.user.user_id,
        email: this.email,
        prenom: this.prenom,
        nom: this.nom,
        urlPhoto: this.urlPhoto,
        token: this.$store.state.user.token

      }).then (function (reponse){
        self.mode ='normal';
        
        if (self.prenom != ''){
          self.$store.state.utilisateur.prenom = self.prenom;
        }
        if (self.nom != ''){
          self.$store.state.utilisateur.nom = self.nom;
        }
        if (self.urlPhoto != ''){
          self.$store.state.utilisateur.urlPhoto = self.urlPhoto;
        }

        console.log(reponse);
      }, function (error) {
        console.log(error);
      })
    },

    annulerModification: function (){
      this.mode = 'normal';
    },


    deconnection (){
      const identifiantLogin = {
        email: "",
        password: "",
        token:"",
        user_id:-1
      }

      localStorage.setItem('identifiantLogin',JSON.stringify(identifiantLogin));
      localStorage.setItem('postMasque',JSON. stringify([]));
      this.$router.push({ name: 'login' });
    },

    filActualite(){
      this.$router.push({ name: 'filactualite' });
    },



    deleteOne : function (){
      const self = this;
      this.$store.dispatch('DeleteAccount', {
        user_id: this.user_id
      }).then (function (reponse){
        const identifiantLogin = {
        email: "",
        password: "",
        token:"",
        user_id:-1
      }

      localStorage.setItem('identifiantLogin',JSON.stringify(identifiantLogin));
      
        self.$router.push({ name: 'login' });
        console.log(reponse);
      }, function (error) {
        console.log(error);
      })
    }

  },
  
}

</script>


<style lang="scss">

.modification{
  display: flex;
  justify-content: space-around;
}

.ProfilFilActualite{
  display: flex;
  justify-content: space-around;
}

#profilVisuel{
    width: 50%;
    object-fit: cover;
    margin: 0 0 2em 0;
}

.nomProfilTexte{
  margin: 0;
}

.ProfilTexte{
    display: flex;
    justify-content:center;
    margin:0 0 2em 0;
}

.menuFilActualite{
    display: flex;
    justify-content:right;
    font-size: 1em;
    cursor: pointer;
}

#Nom{
    margin: 0em;
  padding: 0em;
}
#Prenom{
    margin: 0em;
  padding: 0em;
}

#Mail{
    margin: 0em;
  padding: 0em;
}

#PassWord{
    margin: 0em;
  padding: 0em;
}

</style>