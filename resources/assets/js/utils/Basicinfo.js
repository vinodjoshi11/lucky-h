import Vue from 'vue'
const api = 'quiz.json'
const dbapi = 'db.json'
const SET_LOADING = 'SET_LOADING'
import Auth from '../services/Auth';
const  state = {
    loading: false,currentQuestion:0, nextQuestion:0,prevQuestion:0,
    filter: 'all',
    IsloginComponents:true,  child:[],childIndex:1,PostQuestions:[],
    childQuestionIndex:0,showsubchild:false,
};
const actions = {
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
};

const mutations = {
    saveResponse(state, questions) {
        state.questions = questions;
    },savechildResponse(state, child){ //console.log(state.child);
        state.child=child;
    },updateResponses (state,userResponses){   console.log(state.currentQuestion);
        state.questions[state.currentQuestion].userResponses= userResponses
    },getUserInput(state, userResponses) {
        state.questions[state.currentQuestion].userResponses= userResponses
    } ,currentQuestion(state, currentQuestion) {
        state.currentQuestion=currentQuestion
    },nextquestions(state, nextQuestion) {
        state.nextQuestion=nextQuestion
        state.questions[state.currentQuestion].nextQuestion= nextQuestion
        // console.log(state.survey.questions[state.currentQuestion].nextQuestion)
    },prevquestion(state, prevQuestion){
        state.prevQuestion=prevQuestion
        //console.log(state.prevQuestion);
        state.questions[state.nextQuestion].prevQuestion= prevQuestion
    }/*,setUsers(state,users){ state.users.users=users
         //console.log(state.users);
    }*/,isValid(state,valid)
    {   state.questions[state.currentQuestion].valid=valid;
        console.log(state.survey.questions[state.currentQuestion].valid)
    },  getUsername(state, Name){
        state.questions[state.currentQuestion].Name= Name
        console.log(state.survey.questions[state.currentQuestion].Name);
    },childQuestionIndex(state, childQuestionIndex) {
        state.childQuestionIndex=childQuestionIndex
    },updateChildResponses(state,childResponses){   console.log(state.childQuestionIndex);
        state.questions[state.currentQuestion].child[state.childQuestionIndex].childResponses=childResponses
    },questionId(state,id)
    {   state.questions[state.currentQuestion].child[state.childQuestionIndex].id=id;
        // console.log(state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].id)
    },childValidForm(state,valid)
    {
        state.questions[state.currentQuestion].child[state.childQuestionIndex].valid=valid;
        console.log(state.survey.questions[state.currentQuestion].child[state.childQuestionIndex].valid)
    }
};
const getters = {
    getquestionsByFilter: state =>{    console.log(state.questions)
        switch (state.filter) {
            case 'all':
                return state.questions
            case 'complete':
                return state.questions.filter(questions => questions.status == 2)
            case 'uncomplete':
                return state.questions.filter(questions => questions.status == 1)
            default:
                return this.$store.state.survey.questions;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};