import Vue from 'vue'
const api = 'quiz.json'
const state = {
     child:[],childIndex:1,PostQuestions:[],
     childQuestionIndex:0,showsubchild:false,
};
const actions={
    childResponse({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get(api)
                .then((response) => { console.log(response.data);
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
    savechildResponse(state, child){ //console.log(state.child);
        state.child=child;
    },
     getUsername(state, Name){
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
}
export default  {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}