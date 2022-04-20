<template>
  <div class="filActualite">

    <div id="menuFilActualite">
        <h2 @click="goProfil ()" id="nomUtilisateur">{{this.email}}</h2>
        
        <img @click="deconnection()" id= "deconnectionFilActualite" alt="icone deconnection" src="../assets/IconeDeconnection.jpg">
    </div>

    <div id="ligneDebutFilActualite"> 
    </div>

    <div >
        <h2 v-if="modeCreerUnPost == 'normal'" @click="creerUnPost ()" id="creerUnPost">Créer un post</h2>

        <div v-if="modeCreerUnPost == 'creerUnPost'" id="conteunerCreerUnPost">
            <h2 v-if="modeCreerUnPost == 'creerUnPost'" @click="annulerCreerUnPost ()" 
                id="AnnulerCreerUnPost">Annuler</h2>
            
            <textarea v-if="modeCreerUnPost == 'creerUnPost'" v-model="textePostAEnvoyer" 
                name="textePostAEnvoyer" id="textePostAEnvoyer"></textarea>

            <input v-if="modeCreerUnPost == 'creerUnPost'" @change="chargementImage"  
             type="file" id="imagePoste"  name="imagePoste" accept="image/png, image/jpeg, image/gif">
            
            <input v-if="modeCreerUnPost == 'creerUnPost'" @click="validerPost()"  type="button" value="Valider" id="boutonValiderPost">
        </div>
    </div>
<div id="partieDynamiqueFilActualite">
    
</div>


    

  </div>
</template>


<script>
import FormData from 'form-data';


export default {
	name: 'filActualiteView',

      data: function (){
    return{
      email : '',
      password:'',
      modeCreerUnPost: "normal",
      textePostAEnvoyer:"",
      imageSelectionnee:null,
      postutilisateur_imageok:false,

      texteCommentaireAEnvoyer:"",
    
      
    }
  },

  


  beforeMount () {


    let identifiantLoginJSON = localStorage.getItem('identifiantLogin');
    let identifiantLoginAvantMontage = JSON.parse(identifiantLoginJSON);
        
    this.email = identifiantLoginAvantMontage.email;
    this.password = identifiantLoginAvantMontage.password;
    this.$store.state.user.token = identifiantLoginAvantMontage.token ;
    this.$store.state.user.user_id = identifiantLoginAvantMontage.user_id ;

    this.visualisationPost();

    },

    mounted (){

      
},

  methods:{

    chargementImage(event){
        this.imageSelectionnee = event.target.files[0];
        this.postutilisateur_imageok = true
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


    goProfil (){
        this.$router.push({ name: 'profil' });
    },

    creerUnPost (){
        this.modeCreerUnPost = "creerUnPost";
    },

    annulerCreerUnPost (){
        this.modeCreerUnPost = "normal";
        this.postutilisateur_imageok = false;

        this.textePostAEnvoyer= "";
        this.imageSelectionnee=null;

    },

    validerPost(){
        const self = this;
        const donne = {
            token : this.$store.state.user.token,
            user_id: this.$store.state.user.user_id,
            postutilisateur_mailcreateur: this.email,
            postutilisateur_idcreateur: this.$store.state.user.user_id,
            postutilisateur_texte: this.textePostAEnvoyer,

        }; 
        let fd = new FormData();
        if (this.postutilisateur_imageok){
            fd.append('image',this.imageSelectionnee,this.imageSelectionnee.name);
            fd.append('postutilisateur_mailcreateur',donne.postutilisateur_mailcreateur);
            fd.append('postutilisateur_idcreateur',donne.postutilisateur_idcreateur);
            fd.append('postutilisateur_texte',donne.postutilisateur_texte);
        }

        if (this.postutilisateur_imageok){
                
                this.$store.dispatch('confirmationLogin', {token:this.$store.state.user.token, user_id: this.$store.state.user.user_id})
                        .then (function (reponse){


                        self.$store.dispatch('createPostAvecImage', fd)
                            .then (function (reponse){

                                console.log(reponse);
                                window.location.reload();
                            }, function (error) {
                                console.log(error);
                            })


                            console.log(reponse);

                            
                        }, function (error) {
                            console.log(error);
                        })
                
                
        } else {

            this.$store.dispatch('createPostSansImage', donne)
                .then (function (reponse){
                console.log(reponse);
                    //faire recharger la page
                    window.location.reload();
                }, function (error) {
                    console.log(error);
                })
        
        }

      
    },

    supprimerPost (n){
        console.log("post bientot suprimé");

        let infoPost = n;
        let requeteInfoPost = {
            postutilisateur_id: infoPost.postutilisateur_id,
            postutilisateur_imageok: infoPost.postutilisateur_imageok,
            postutilisateur_urlimage: infoPost.postutilisateur_urlimage,
            token : this.$store.state.user.token,
            user_id: this.$store.state.user.user_id,
        }
        
        this.$store.dispatch('supprimerPost', requeteInfoPost)
        .then (function (reponse){
        console.log(reponse);
        //faire recharger la page
        window.location.reload();
        }, function (error) {
        console.log(error);
        })





    },

    supprimerCommentaire(n){

        let commentaire_id =n;
        let infoCommentaire = {
            commentaire_id: commentaire_id,
            token : this.$store.state.user.token,
            user_id: this.$store.state.user.user_id,
        }
        
        this.$store.dispatch('supprimerCommentaire', infoCommentaire)
        .then (function (reponse){
        console.log(reponse);
        //faire recharger la page
        window.location.reload();
        }, function (error) {
        console.log(error);
        })


    },

    ajouterUnCommentaire( n){

        if (this.modeCreerUnPost == "normal"){
        let texteAjouterUnCommentaire = document.getElementsByClassName('partiCreationDeCommentaire'+n);
        texteAjouterUnCommentaire[0].hidden = false;
        let aireCommentaire = document.getElementsByClassName('aireCommentaire'+n);
        let validerCommentaire = document.getElementsByClassName('validerCommentaire'+n);
        let annulerCommentaire = document.getElementsByClassName('annulerCommentaire'+n);

        aireCommentaire[0].hidden = false;
        validerCommentaire[0].hidden = false;
        annulerCommentaire[0].hidden = false;
        this.modeCreerUnPost = "creerUnCommentaire";
        }
    },
    annulerUnCommentaire(n){

        let texteAjouterUnCommentaire = document.getElementsByClassName('partiCreationDeCommentaire'+n); 
        texteAjouterUnCommentaire[0].hidden = true;
        let aireCommentaire = document.getElementsByClassName('aireCommentaire'+n);
        let validerCommentaire = document.getElementsByClassName('validerCommentaire'+n);
        let annulerCommentaire = document.getElementsByClassName('annulerCommentaire'+n);

        aireCommentaire[0].hidden = true;
        validerCommentaire[0].hidden = true;
        annulerCommentaire[0].hidden = true;
        this.modeCreerUnPost = "normal";
    
    },

    validerUnCommentaire( n){

        let aireCommentaire = document.getElementsByClassName('aireCommentaire'+n.postutilisateur_id);
       
        let donneCommentaire = {
            token : this.$store.state.user.token,
            user_id: this.$store.state.user.user_id,
            commentaire_emailcreateur: this.email,
            commentaire_idcreateur: this.$store.state.user.user_id,
            commentaire_texte: aireCommentaire[0].value,
            commentaire_postreference: n.postutilisateur_id,
        }; 


        this.$store.dispatch('createCommentaire', donneCommentaire)
        .then (function (reponse){
        console.log(reponse);
        //faire recharger la page
        window.location.reload();
        }, function (error) {
        console.log(error);
        })
    },

    masquerLesCommentaires(n){
        let commentairesDuPoste = document.getElementsByClassName('commentaire'+n);
        let afficherOuMasquerUnCommentaire = document.getElementsByClassName("iMasquerLesCommentaires"+n);
        let idDuPoste = n;
        
        let postMasqueJSON = localStorage.getItem('postMasque');
        postMasqueJSON = JSON.parse(postMasqueJSON);

        //si le commentaire n'est pas masqué alors on le masque
        if (commentairesDuPoste[0].hidden ==false){
            
            postMasqueJSON.push(idDuPoste);
            console.log("le commentaire vient d'etre masque"+idDuPoste, postMasqueJSON);
            localStorage.setItem('postMasque',JSON. stringify(postMasqueJSON));


            afficherOuMasquerUnCommentaire[0].className = 'iMasquerLesCommentaires fa-solid fa-caret-up iMasquerLesCommentaires'+n;
            for (let i=0; i<commentairesDuPoste.length;i++){
                commentairesDuPoste[i].hidden = true;
            }
        }

        //sinon on l'affiche
        else {

            for (let j=0; j<postMasqueJSON.length;j++){
                if (postMasqueJSON[j] == idDuPoste){
                    postMasqueJSON.splice(j, 1);
                    j = j-1;
                }
            }
            localStorage.setItem('postMasque',JSON. stringify(postMasqueJSON));
            console.log(postMasqueJSON);




            afficherOuMasquerUnCommentaire[0].className = 'iMasquerLesCommentaires fa-solid fa-caret-down iMasquerLesCommentaires'+n;
            for (let i=0; i<commentairesDuPoste.length;i++){
                commentairesDuPoste[i].hidden = false;
            }
        }

    },


    visualisationCommentaire (id_post){

        let self =this;

        this.$store.dispatch('recupererCommentaire', {
        token : this.$store.state.user.token,
        user_id: this.$store.state.user.user_id,
        commentaire_postreference: id_post,
        

      }).then (function (reponse){

        if (reponse.data !== [] || reponse.data !== null){
        for (let i=(reponse.data.length-1); i>=0 ;i--){
        let infoSurLeCommentaire=reponse.data[i];
        let numeroCommentaire = infoSurLeCommentaire.commentaire_postreference;

        let commentaire = document.getElementsByClassName('commentaire'+infoSurLeCommentaire.commentaire_postreference);
        
        let ensembleDUnCommentaire= document.createElement('div');
        ensembleDUnCommentaire.className = "ensembleDUnCommentaire";
        commentaire[0].appendChild(ensembleDUnCommentaire);

        let enteteCommentaire = document.createElement('div');
        enteteCommentaire.className = "enteteCommentaire enteteCommentaire"+numeroCommentaire;
        let emailCreateurCommentaire = document.createElement('p');
        emailCreateurCommentaire.className = "emailCreateurCommentaire";

        let pEmailCreateurCommentaire = document.createTextNode(infoSurLeCommentaire.commentaire_emailcreateur);
        emailCreateurCommentaire.appendChild(pEmailCreateurCommentaire);
        enteteCommentaire.appendChild(emailCreateurCommentaire);

        if (infoSurLeCommentaire.commentaire_idcreateur == self.$store.state.user.user_id || self.$store.state.user.user_id == 1){
            let effacerCommentaire = document.createElement('i');
            effacerCommentaire.id="supprimerCommentaire" +infoSurLeCommentaire.commentaire_id;
            effacerCommentaire.className = "fa-solid fa-trash-can supprimer";
            effacerCommentaire.addEventListener ("click",function() 
                { self.supprimerCommentaire(infoSurLeCommentaire.commentaire_id);});
            enteteCommentaire.appendChild(effacerCommentaire);
        }

        ensembleDUnCommentaire.appendChild(enteteCommentaire);

        let contenuCommentaire = document.createElement('p');
        contenuCommentaire.className = "contenuCommentaire";
        let pContenuCommentaire = document.createTextNode(infoSurLeCommentaire.commentaire_texte);
        contenuCommentaire.appendChild(pContenuCommentaire);
        ensembleDUnCommentaire.appendChild(contenuCommentaire);

        }

    //masque les commentaire qui doivent être masqué

        let ensembleDesPosteMasque = localStorage.getItem('postMasque');
        if (ensembleDesPosteMasque ==null){
                ensembleDesPosteMasque = [];
        }
        ensembleDesPosteMasque = JSON.parse(ensembleDesPosteMasque);
        if (ensembleDesPosteMasque !== []){
            for (let f = 0; f<ensembleDesPosteMasque.length; f++){
                
                let idDuPoste = ensembleDesPosteMasque[f];
                let commentairesDuPoste = document.getElementsByClassName('commentaire'+idDuPoste);
                let afficherOuMasquerUnCommentaire = document.getElementsByClassName("iMasquerLesCommentaires"+idDuPoste);

                let postMasqueJSON = localStorage.getItem('postMasque');
                postMasqueJSON = JSON.parse(postMasqueJSON);

            //on masque les commentaire idDuPoste
                afficherOuMasquerUnCommentaire[0].className = 'iMasquerLesCommentaires fa-solid fa-caret-up iMasquerLesCommentaires'+idDuPoste;
                for (let i=0; i<commentairesDuPoste.length;i++){
                    commentairesDuPoste[i].hidden = true;
                }
            }

            }
        }
    }, function (error) {
        console.log(error);
      })
    },

    visualisationPost (){
        let self =this;
        this.$store.dispatch('recupererPost', {
        token : this.$store.state.user.token,
        user_id: this.$store.state.user.user_id,
        
        
      }).then (function (reponse){

        for (let n=reponse.data.length-1; n>=0 ;n--){
        let infoSurLePoste=reponse.data[n];
        
        const toutLeFilActualite = document.getElementById ('partieDynamiqueFilActualite');
        let base =  document.createElement('div');
        base.className = 'englobagePost';
        toutLeFilActualite.appendChild(base);
        
        let divBulleActualite =  document.createElement('div');
        divBulleActualite.className = 'bulleActualite';
        base.appendChild(divBulleActualite);


        let divEnteteBulleActualite =  document.createElement('div');
        divEnteteBulleActualite.className = 'enteteBulleActualite';
        divBulleActualite.appendChild(divEnteteBulleActualite);

        let emailCreateurPost = document.createElement('p');
        emailCreateurPost.className = 'mailPersonneAyantPoste';
        let pEmailCreateurPost = document.createTextNode(infoSurLePoste.postutilisateur_mailcreateur);
        emailCreateurPost.appendChild(pEmailCreateurPost);
        divEnteteBulleActualite.appendChild(emailCreateurPost);


        if (infoSurLePoste.postutilisateur_idcreateur == self.$store.state.user.user_id || self.$store.state.user.user_id == 1){
            let imageSupprimerPost = document.createElement('i');
            imageSupprimerPost.className = "fa-solid fa-trash-can supprimer";
            divEnteteBulleActualite.appendChild(imageSupprimerPost);
            imageSupprimerPost.addEventListener ("click",function() 
                { self.supprimerPost(infoSurLePoste);});
        }

        let divContenuDuPoste =  document.createElement('div');
        divContenuDuPoste.className = 'contenuDuPoste';
        base.appendChild(divContenuDuPoste);

        let texteContenuPost = document.createTextNode(infoSurLePoste.postutilisateur_texte);
        let pTexteContenuPost = document.createElement('p');
        pTexteContenuPost.className = 'contenuTexte';
        pTexteContenuPost.appendChild(texteContenuPost);
        divContenuDuPoste.appendChild(pTexteContenuPost);

        if (infoSurLePoste.postutilisateur_imageok){
            let imagePost = document.createElement('img');
            imagePost.alt = 'image envoyé par un utilisateur';
            imagePost.className = 'imagePost';
            imagePost.src = infoSurLePoste.postutilisateur_urlimage;
            divContenuDuPoste.appendChild(imagePost);
        }

        let divBasBulleActualite =  document.createElement('div');
        divBasBulleActualite.className = 'basBulleActualite';
        base.appendChild(divBasBulleActualite);

        let dateDePublication = document.createTextNode(infoSurLePoste.createdAt.substring(0, 10));
        let pDateDePublication = document.createElement('p');
        pDateDePublication.className = 'dateDePublication';
        pDateDePublication.appendChild(dateDePublication);
        divBasBulleActualite.appendChild(pDateDePublication);

        let divLikeDislike =  document.createElement('div');
        divLikeDislike.className = 'likeDislike';
        divBasBulleActualite.appendChild(divLikeDislike);

        let pNombreDeLike = document.createElement('p');
        let nombreDeLike = document.createTextNode("0");
        pNombreDeLike.appendChild(nombreDeLike);
        divLikeDislike.appendChild(pNombreDeLike);

        let imageLikeIcone = document.createElement('i');
        imageLikeIcone.className = "fa-solid fa-thumbs-up likeIcone";
        divLikeDislike.appendChild(imageLikeIcone);

        let pNombreDeDislike = document.createElement('p');
        let nombreDeDislike = document.createTextNode("0");
        pNombreDeDislike.appendChild(nombreDeDislike);
        divLikeDislike.appendChild(pNombreDeDislike);

        let imageDislikeIcone = document.createElement('i');
        imageDislikeIcone.className = "fa-solid fa-thumbs-down dislikeIcone";
        divLikeDislike.appendChild(imageDislikeIcone);


        //ajouter un commentaire
        let divAjouterUnCommentaire =  document.createElement('div');
        divAjouterUnCommentaire.className = 'ajouterUnCommentaire';
        base.appendChild(divAjouterUnCommentaire);

        
        let iAjouterUnCommentaire = document.createElement('i');
        iAjouterUnCommentaire.className = 'iAjouterUnCommentaire fa-solid fa-plus iAjouterUnCommentaire'+infoSurLePoste.postutilisateur_id;
        iAjouterUnCommentaire.title = "Ajouter un commentaire";
        divAjouterUnCommentaire.appendChild(iAjouterUnCommentaire);
        iAjouterUnCommentaire.addEventListener ("click",() => 
            { self.ajouterUnCommentaire( infoSurLePoste.postutilisateur_id);});

        let iMasquerCommentaire = document.createElement('i');
        iMasquerCommentaire.className = 'iMasquerLesCommentaires fa-solid fa-caret-down iMasquerLesCommentaires'+infoSurLePoste.postutilisateur_id;
        iMasquerCommentaire.title = "Masquer les commentaires";
        iMasquerCommentaire.addEventListener ("click",() => 
            { self.masquerLesCommentaires( infoSurLePoste.postutilisateur_id);});
        divAjouterUnCommentaire.appendChild(iMasquerCommentaire);


        let partiCreationDeCommentaire =document.createElement("div");
        partiCreationDeCommentaire.className = 'partiCreationDeCommentaire'+infoSurLePoste.postutilisateur_id;
        let aireCommentaire =  document.createElement("textarea");
        aireCommentaire.className = 'aireCommentaire aireCommentaire'+infoSurLePoste.postutilisateur_id;
     
        aireCommentaire.setAttribute('name', "texteCommentaireAEnvoyer");


        base.appendChild(partiCreationDeCommentaire);
        partiCreationDeCommentaire.appendChild(aireCommentaire);

        let annulerOuValiderUnCommentaire =document.createElement("div");
        annulerOuValiderUnCommentaire.className = "annulerOuValiderUnCommentaire annulerOuValiderUnCommentaire"+infoSurLePoste.postutilisateur_id;
        let annulerCommentaire =document.createElement("input");
        let validerCommentaire =document.createElement("input");
        validerCommentaire.type = "button";
        validerCommentaire.value = "valider";
        validerCommentaire.className = "validerCommentaire validerCommentaire"+infoSurLePoste.postutilisateur_id;
        annulerCommentaire.type = "button";
        annulerCommentaire.value = "Annuler";
        annulerCommentaire.className = "annulerCommentaire annulerCommentaire"+infoSurLePoste.postutilisateur_id;
        base.appendChild(annulerOuValiderUnCommentaire);
        annulerOuValiderUnCommentaire.appendChild(annulerCommentaire);
        annulerOuValiderUnCommentaire.appendChild(validerCommentaire);
        
        
        
        annulerCommentaire.addEventListener ("click",() => { self.annulerUnCommentaire( infoSurLePoste.postutilisateur_id);});
        validerCommentaire.addEventListener ("click",() => { self.validerUnCommentaire( infoSurLePoste);});

        aireCommentaire.hidden = true;
        validerCommentaire.hidden = true;
        annulerCommentaire.hidden = true;

        let commentaire =  document.createElement('div');
        commentaire.className = 'commentaire commentaire'+infoSurLePoste.postutilisateur_id;
        base.appendChild(commentaire);

        self.visualisationCommentaire(infoSurLePoste.postutilisateur_id);


        }
        
      }, function (error) {
        console.log(error);
      })
      
    },
    
   
  },
} 





</script>


<style lang="scss">
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css';




.filActualite{
    margin: 0;
    padding: 0em;
}

.englobagePost{
    border: 0.3em solid #122442;
    border-radius: 1em;
    overflow: hidden;
    margin-bottom: 0.8em;
    margin-top: 1em;
}

#menuFilActualite{
    margin-top:1em ;
    display: flex;
    justify-content:space-between ;
}
#iconeADroite{
    display: flex;
}
#nomUtilisateur{
    padding-top: 0.5em;
    font-size: 01em;
    cursor: pointer;
}
#AnnulerCreerUnPost{
    padding-top: 0.2em;
    font-size: 01em;
    cursor: pointer;
    display: flex;
    justify-content: right;
    margin-right: 1em;
    
}
#creerUnPost{
    background-color: #122442;
    width: 6.6em;
    padding: 0.3em 0.4em 0.3em 0.4em;
    border-radius: 0.5em;
    color: #ffffff;
    margin-left: 0.5em;
    font-size: 01em;
    cursor: pointer;
    display: flex;
}
#conteunerCreerUnPost{
    border: 0.3em solid;
    border-radius: 1em;
    overflow: hidden;
    margin-bottom: 0.8em;
    margin-top: 1em;
}
#textePostAEnvoyer{
    border-radius: 1em;
    width:20em;
    height:10em;
    margin-bottom: 01em;
}


#imagePoste { 
    border: #122442;
}

#deconnectionFilActualite{
    width: 1.5em;
    height: 1.5em;
    margin-top:0.15em ;
    margin-right: 0.5em;
    cursor: pointer;
}



#boutonValiderPost{
    
    margin: 1em 0.5em 1em  0;
    background-color: #122442;;
    padding: 0.5em;
    color: white;
    border-radius: 1em;
    cursor: pointer;
}

#nomUtilisateur{
        margin-top:0em ;
        margin-left: 0.5em;
}

#ligneDebutFilActualite{
    width: 100%;
    height: 0.3em;
    background-color:red ;
}
.bulleActualite{
    clear: right;
    margin-top: 0em;

}
.enteteBulleActualite{
    background-color:#ffd7d7 ;
    height: 2em; 
    display: flex;
    justify-content: space-between;
}
.mailPersonneAyantPoste{
    display: flex;
    margin-top:0.5em ;
    margin-left:0.5em ;
    padding: 0em 0em 0 0.0em;
}
.supprimer{
    width: 1.5em;
    height: 1.5em;
    margin-top:0.6em ;
    margin-right: 0.2em;
    cursor: pointer;
}
.contenuDuPoste{
    padding: 0.5em;
    border:0.3em solid #ffd7d7;
}
.imagePost{
    width: 90%;
    object-fit: cover;
}
.basBulleActualite{
    background-color:#ffd7d7 ;
    height: 2em; 
    margin: 0;
    padding: 0;
}
.dateDePublication{
    padding: 0.4em 0 0 0.4em;
    margin:  0;
    display: flex;
}

.basBulleActualite{
    
    display: flex;
    justify-content:space-between ;
}
.likeDislike{
    margin-top: -0.5em;
    display: flex;
}
.likeIcone{
    height: 2.5em;
    margin: 1em 0.5em 0 0.5em;
    
}
.dislikeIcone{
    height: 2.5em;
    margin: 1.2em 0.5em 0 0.5em;
}
.commentaireUtilisateur{
    margin-top: 0.2em;
    background-color: #bfd6ff;
}
.menuCommentaireUtilisateur{
    
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1em solid rgb(104, 104, 104);  ;
}


.ensembleDUnCommentaire{
    border: 0.15em solid #122442;
    border-radius: 1em ;
    overflow: hidden;
    margin-bottom: 0.65em;
    margin-top: 0.65em;
    
}
.commentaire{
    margin: 0 auto;
    width: 90%;
}


.contenuCommentaire{
    color: #000;
    padding: 0.5em;
    background-color: white;
    margin: 0em 0 0em;
    border-bottom: 0.1em solid #122442;
}

.enteteCommentaire{
    display:flex;
    justify-content: space-between;
    background-color: #12244291;
    border-bottom: 0.1em solid black;
    padding: 0 0 0em 0;
    color: white;
}

.emailCreateurCommentaire{
    margin-top: 0.5em;
    margin-left: 0.5em;
    margin-bottom: 0;
}

.ajouterUnCommentaire{
    display:flex;
    justify-content: space-between;
    background-color: red ;
    
}
.iAjouterUnCommentaire{
    margin-left: 0.8em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    color: white;
    cursor: pointer;
    font-size: 01.5em;
}

.iMasquerLesCommentaires{
    margin-right: 0.8em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    color: white;
    cursor: pointer;
    font-size: 01.5em;
}

.aireCommentaire { 
    width:20em;
    height:5em;
    margin-top: 0.5em;

}
.annulerOuValiderUnCommentaire{
    display: flex;
    justify-content: space-between;
    
}
.validerCommentaire{
    margin: 0.5em 0.5em 00.5em  0;
}
.annulerCommentaire{
    margin: 0.5em 0em 00.5em 0.5em;
}




</style>