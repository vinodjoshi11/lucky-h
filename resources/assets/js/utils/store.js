import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from "axios"
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex); Vue.use(VueResource);

//import * as actions from './actions'
//import create from '../utils/createquestion'
/*----------  Modules  ----------*/
//import loading from './modules/loading';
//import child from './child';
import users from './modules/users';
import auth from './modules/auth';

const api = 'quiz.json'
const dbapi = 'db.json'
const SET_LOADING = 'SET_LOADING'
const state = {
    loading: false,currentQuestion:0, nextQuestion:0,prevQuestion:0,
    survey:[],
    filter: 'all',
    IsloginComponents:true,  child:[],childIndex:1,PostQuestions:[],
    childQuestionIndex:0,showsubchild:false,
};
const actions={
    loadResponse({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get(dbapi)
                .then((response) => { console.log(response)
                    commit("saveResponse", response.data);
                    resolve();
                })
                .catch((error => {
                    console.log(error);
                }));
        });
    },childResponse({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get(api)
                .then((response) => {
                    commit("savechildResponse", response.data);
                    resolve();
                })
                .catch((error => {
                    console.log(error);
                }));
        });
    }
}
const mutations = {
     saveResponse(state, survey) {
         state.survey = survey;
     },setQuestions(state, questions){ console.log(state.questions)
         state.questions = questions
     },savechildResponse(state, child){ //console.log(state.child);
        state.child=child;
    },updateResponses (state,userResponses){   console.log(state.currentQuestion);
         state.survey.questions[state.currentQuestion].userResponses= userResponses
     },getUserInput(state, userResponses) {
        state.survey.questions[state.currentQuestion].userResponses= userResponses
     } ,currentQuestion(state, currentQuestion) {
        state.currentQuestion=currentQuestion
     },nextquestions(state, nextQuestion) {
         state.nextQuestion=nextQuestion
         state.survey.questions[state.currentQuestion].nextQuestion= nextQuestion
      // console.log(state.survey.questions[state.currentQuestion].nextQuestion)
    },prevquestion(state, prevQuestion){
        state.prevQuestion=prevQuestion
         //console.log(state.prevQuestion);
        state.survey.questions[state.nextQuestion].prevQuestion= prevQuestion
    }/*,setUsers(state,users){ state.users.users=users
         //console.log(state.users);
    }*/,isValid(state,valid)
    {   state.survey.questions[state.currentQuestion].valid=valid;
        console.log(state.survey.questions[state.currentQuestion].valid)
    },  getUsername(state, Name){
        state.survey.questions[state.currentQuestion].Name= Name
        console.log(state.survey.questions[state.currentQuestion].Name);
    },childQuestionIndex(state, childQuestionIndex) {
        state.childQuestionIndex=childQuestionIndex
    },updateChildResponses(state,childResponses){   console.log(state.childQuestionIndex);
        state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].childResponses=childResponses
    },questionId(state,id)
    {   state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].id=id;
        // console.log(state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].id)
    },childValidForm(state,valid)
    {
        state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].valid=valid;
        console.log(state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].valid)
    }
}
const getters={
 getquestionsByFilter: state =>{  console.log(state)
 switch (state.filter) {
     case 'all':
         return state.survey.questions
     case 'complete':
         return state.survey.questions.filter(questions => questions.status == 2)
     case 'uncomplete':
         return state.survey.questions.filter(questions => questions.status == 1)
     default:
         return this.$store.state.survey.questions;
     }
     }
}
export default new Vuex.Store({
  plugins: [createPersistedState({key: 'quiz',})],
 strict: false,
 state,actions,
 mutations,
 getters,
    modules: {
       // child,
        users,
        auth
    }
})