import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Progress from '../components/Progress'
import login from '../components/user/login'
import register from '../components/user/register'
import quiz from '../components/quiz'
import vuequiz from '../components/vuequiz'
import questions from '../components/questions'
import survey from '../components/survey'
import child from '../components/child'
import BeneficiariesSuccessors from '../components/BeneficiariesSuccessors'

Vue.use(Router);
Vue.use(VueResource);
Vue.config.debug = false;
Vue.config.silent = true;
let routes = [
    { path: '/', component: survey },
    { path: '/child', component: child },
    { path: '/BeneficiariesSuccessors', component: BeneficiariesSuccessors },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/quiz', component: quiz },
    { path: '/vuequiz', component: vuequiz },
    { path: '/Progress', component: Progress },
    { path: '/questions', component: questions }
];
export default new Router({
    //mode: 'history',
    routes
});
