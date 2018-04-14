// noinspection JSAnnotator
const mutations = {
    saveResponse(state, survey) {
        state.survey = survey;
    },
    [SET_LOADING](state, loading) {
        state.loading = loading;
    },setQuestions(state, questions){
        state.questions = questions
    },updateResponses (state,userResponses){  // console.log(state.currentQuestion);
        state.survey.questions[state.currentQuestion].userResponses= userResponses
    },getUserInput(state, userResponses) {
        state.survey.questions[state.currentQuestion].userResponses= userResponses
        console.log(state.currentQuestion);
    },currentQuestion(state, currentQuestion) {
        state.currentQuestion=currentQuestion
        console.log(state.currentQuestion);
    },nextquestions(state, nextQuestion) {
        state.survey.questions[state.currentQuestion].nextQuestion= nextQuestion
    },setUsers(state,users){ state.users.users=users
        console.log(state.users);
    }
}