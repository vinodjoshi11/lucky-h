import Vue from 'vue'
const api = 'quiz.json'
const dbapi = 'db.json'
const SET_LOADING = 'SET_LOADING'
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
                    commit("saveBeneficiaries", response.data);
                    resolve();
                })
                .catch((error => {
                    console.log(error);
                }));
        });
    }
};
const mutations = {
    saveBeneficiaries(state, BeneficiariesSuccessors){ console.log(state.BeneficiariesSuccessors)
        state.BeneficiariesSuccessors = BeneficiariesSuccessors
    },setQuestions(state, questions){ console.log(state.questions)
        state.questions = questions
    }, updateBeneficiaries(state,userResponses){   console.log(state.currentQuestion);
        state.survey.BeneficiariesSuccessors[state.currentQuestion].userResponses= userResponses
    },getUserInput(state, userResponses) {
        state.survey.BeneficiariesSuccessors[state.currentQuestion].userResponses= userResponses
    } ,currentQuestion(state, currentQuestion) {
        state.currentQuestion=currentQuestion
    },nextquestions(state, nextQuestion) {
        state.nextQuestion=nextQuestion
        state.survey.BeneficiariesSuccessors[state.currentQuestion].nextQuestion= nextQuestion
    },prevquestion(state, prevQuestion){
        state.prevQuestion=prevQuestion
        state.survey.BeneficiariesSuccessors[state.nextQuestion].prevQuestion= prevQuestion
    },isValid(state,valid)
    {   state.survey.BeneficiariesSuccessors[state.currentQuestion].valid=valid;
        console.log(state.survey.BeneficiariesSuccessors[state.currentQuestion].valid)
    }
}
const getters={
    getBeneficiariesSuccessorsByFilter: state =>{  console.log(state.BeneficiariesSuccessors)
        switch (state.filter) {
            case 'all':
                return state.BeneficiariesSuccessors
            case 'complete':
                return state.BeneficiariesSuccessors.filter(BeneficiariesSuccessors => BeneficiariesSuccessors.status == 2)
            case 'uncomplete':
                return state.BeneficiariesSuccessors.filter(BeneficiariesSuccessors => BeneficiariesSuccessors.status == 1)
            default:
                return this.$store.state.survey.BeneficiariesSuccessors;
        }
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}