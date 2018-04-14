import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
const state = {
    project: {
        childs: []
    },
    childsDetails:[
        {
            id: '0',
            qst: 'Enter of your child Name',
            responses: [
                {
                    option:"Enter your First Name",
                    inputType: "textBox",
                },{
                    option:"Enter your middle Name",
                    inputType: "textBox",
                },{
                    option:"Enter your last Name",
                    inputType: "textBox"
                }
            ]
        },{
            id: '0',
            qst: 'Enter of your child Name',
            Yes:'Yes',
            No:'No'
         }
    ],
    project: {
        title: null,
        description: null,
        jobs: []
    },
    defaultJob: {
        FirstName: '',
        title: '',function:'',
        description: '',
        profiles: 1,
        location_id: '',
        category_id: '',
        budget: '',
    }
};

const mutations = {
    addJob(state, job) {
        state.project.jobs.push(job);
    },
    deleteJob(state, index) {
        state.project.jobs.splice(index, 1);
    },
    updatechildValue(state, params) {
        state.project.jobs[params.childIndex][params.field] = params.value;
        console.log(state)
    }
};

const actions = {
    addJob: function (context) {
        context.commit('addJob', Object.assign({}, state.defaultJob));
    },
    deleteJob: function (context, index) {
        context.commit('deleteJob', index);
    },
    updatechildValue: function(context, params) {
        context.commit('updatechildValue', params);
    }
};

const childCreator = {
    state,
    mutations,
    actions
};
export default new Vuex.Store({
    plugins: [createPersistedState({key: 'child',})],
    modules: {
        childCreator: childCreator
    },
});


