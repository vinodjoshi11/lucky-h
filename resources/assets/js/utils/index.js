import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Basicinfo from './Basicinfo';
import Beneficiaries from './Beneficiaries';
import users from './modules/users';
import auth from './modules/auth';
Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [createPersistedState({key: 'quiz',})],
    modules: {
        Basicinfo,
        Beneficiaries,
        users,
        auth
    },
});