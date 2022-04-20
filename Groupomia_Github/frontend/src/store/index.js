
import { createStore } from 'vuex'
const axios = require ('axios');
const instance = axios.create ({baseURL: "http://localhost:3000/" })

export default createStore({
  state: {
    status:'',
    user:{
      user_id:-1,
      token:"",
    },
    messageDeConnection:"",
      utilisateur:{
        email: "Email" ,
        password: "",
        prenom: "Prenom",
        nom:  "Nom",
        urlPhoto :"../../../backend/visuels/profile.jpg",
    },
  },
  getters: {
  },
  mutations: {
    setStatus(state, status){
      state.status = status;
    },
    logUser (state, user){
      state.user=user;
    },
    changementMessageConnection (state, newMessage){
      state.messageDeConnection= newMessage;
    },
    chargementDesInfoUtilisateur(state,info){
      state.utilisateur.email=info.email;
      state.utilisateur.prenom=info.prenom;
      state.utilisateur.nom=info.nom;
      state.utilisateur.urlPhoto=info.urlPhoto;
    },

  },
  actions: {

    supprimerPost:function ({commit}, infoPost) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/supprimerPost',infoPost )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },

    
    supprimerCommentaire:function ({commit}, idCommentaire) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/supprimerCommentaire',idCommentaire )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },


    confirmationLogin:function ({commit}, postInfo) {
      return new Promise ((resolve, reject) => {
        commit;
       
        instance.post('./api/post/identificationOK',postInfo )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },


    createPostAvecImage:function ({commit}, postInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/savePostAvecImage',postInfo )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },
    
    createPostSansImage:function ({commit}, postInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/savePostSansImage',postInfo )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },

    createCommentaire :function ({commit}, commentaireInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/saveCommentaire',commentaireInfo )
        .then(function (response) {
          resolve(response);
          
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },

    recupererCommentaire: function ({commit}, postInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/listeDesCommentaire',postInfo)
        .then(function (response) {
          
          resolve(response);
        })
        .catch(function (error) {
          reject (error);
        });
      });
    },

    recupererPost:function ({commit}, postInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        instance.post('./api/post/listeDesPost',postInfo)
        .then(function (response) {
          //commit('setStatus', 'ok');
          //commit('logUser', response.data);
          //commit("changementMessageConnection", "");
          resolve(response);
          
        })
        .catch(function (error) {
          //commit("changementMessageConnection", "Adresse mail déjà utilisée");
          reject (error);
        });
      });
    },


    createAccount:function ({commit}, userInfo) {
      return new Promise ((resolve, reject) => {
        commit;
        
        //console.log(userInfo);
        instance.post('./api/auth/signup',userInfo)
        .then(function (response) {
          commit('setStatus', 'ok');
          commit('logUser', response.data);
          commit("changementMessageConnection", "");
          resolve(response);
          
        })
        .catch(function (error) {
          commit("changementMessageConnection", "Adresse mail déjà utilisée");
          reject (error);
        });
      });
    },

    login:function ({commit}, userInfo) {
      return new Promise ((resolve, reject) => {
        
        instance.post('./api/auth/login',userInfo)
        .then(function (response) {

          let identifiantLoginJSON = localStorage.getItem('identifiantLogin');
          let identifiantLoginAvantMontage = JSON.parse(identifiantLoginJSON);

          identifiantLoginAvantMontage.token = response.data.token;
          identifiantLoginAvantMontage.user_id = response.data.user_id;
          
          localStorage.setItem('identifiantLogin',JSON. stringify(identifiantLoginAvantMontage));
          

          commit('setStatus', 'ok');
          commit('logUser', response.data);
          commit("changementMessageConnection", "");
          
          resolve(response);
          
        })
        .catch(function (error) {
          
          commit("changementMessageConnection", "user/password invalid");
          reject (error);
        });
        
      });
    },

    modifierAccount:function ({commit},userInfo) {
      return new Promise ((resolve, reject) => {
         
        commit;
        instance.put('./api/auth/modifiOne',userInfo)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject (error);
          });
      });
    },

    recupererAccount: function({commit}){
      return new Promise ((resolve, reject) => {
        const user = this.state.user;
        console.log(user);
        commit;
        instance.post('./api/auth/getOne',user)
          .then(function (response) {
            commit("chargementDesInfoUtilisateur",response.data)
            resolve(response);
          })
          .catch(function (error) {
            reject (error);
          });
        
      });
    },
    DeleteAccount: function({commit}){
      return new Promise ((resolve, reject) => {
        const user = this.state.user;
        commit;
        instance.post('./api/auth/deleteOne',user)
          .then(function (response) {
            
            resolve(response);
          })
          .catch(function (error) {
            reject (error);
          });
        
      });
    }


  },
  modules: {
  }
})
