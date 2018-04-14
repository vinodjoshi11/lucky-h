<template>
<div class="flex md xs12">
    <div class="flex md xs12"  v-for="(question, index) in  this.$store.state.childs"
    v-bind:id="question.id" v-if="currentQuestion === index"
    :key="index" >{{question.qst}}
<h1> {{question.qst}}</h1>
<div class="flex md xs12">
    <div  v-for="response in question.responses">
    <div v-if="response.inputType == 'radio'"  v-model="response.next"
class="radio radio-success"
v-bind:id="response.currentQuestion" >
    <input  type="radio" v-bind:id="'child'+currentQuestion+response.id"  v-bind:name="index"
v-bind:value="response.option" v-model="question.childResponses"
v-on:click="updateResponses"
v-bind:checked="question.childResponses">
    <label v-bind:for="'child'+currentQuestion+response.id"  >
    {{response.option}}
</label>
</div>
<div v-bind:id="response.id" v-if="response.inputType == 'textbox'">
    <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
v-bind:value="response.Name"
v-model="response.Name" v-bind:rules="nameRules"
@focus="getUserInput" required maxlength="50"></v-text-field>
    </div>
    <div v-bind:id="response.id" v-if="response.inputType == 'datepick'">
    <v-menu lazy offset-y full-width :close-on-content-click="false"
v-model="menu" transition="scale-transition"
v-bind:nudge-right="40"  min-width="290px">
    <v-text-field slot="activator" v-bind:label="response.option"
required v-model="question.childResponses" prepend-icon="event"
readonly ></v-text-field>
<v-date-picker min="1950-01-01"
:max="new Date().toISOString().substr(0, 10)"
show-current class="" v-model="question.childResponses">
    <template slot-scope="{ save, cancel }">
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn flat color="primary"  @click="cancel">Cancel</v-btn>
    <v-btn flat color="primary"  @click="save">OK</v-btn>
    </v-card-actions>
    </template>
    </v-date-picker>
    </v-menu>
    </div>
    </div>
    </div>
{{question}}
</div>
<v-btn color="info"
v-on:click="prev(e)" >prev</v-btn>
    <v-btn color="success"
v-on:click="next()">Next</v-btn>
    <main v-if="showPerent"></main>
    </div>
    </template>
    <script>
//import Auth from '../services/Auth';
    import main from '../components/survey'
import store from '../utils/store'
import {mapGetters,mapState} from 'vuex';
export default {
    name: "create", props: ['my-props'],
    components: {
        main,
    },
    data: function () {
        return {showPerent:false,
            childQuestion:[],jsonQuiz:[],childs:[],
            radio:[],
            childResponses:'',currentQuestion:0,
            childDetail:[],dob:'',
            store:store,
            inputs: [],childQuestion2:[],
            valid: false,
        }
    },beforeMount(){
    },
    created: function(){ alert('child');
        if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null) {
            this.progress = store.state.currentQuestion
            this.currentQuestion=JSON.parse(localStorage.getItem('child'));
            console.log(this.currentQuestion);
        }else {
            this.$store.dispatch("loadResponse").then(() => {
                console.log("This would be printed after dispatch!!")
                for (var i = 0; i <= store.state.survey.childQuestions.length-1; i++) {
                    //this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.$store.state.survey.childQuestions[i]);
                    this.$store.state.childs.push(this.$store.state.survey.childQuestions[i]);
                    //  console.log(this.$store.state.survey.childQuestions)
                }this.childs=this.$store.state.childs;
                // console.log(this.childs)
            })
            // store.dispatch('addchild');

        }

        //  store.state.childs.push(store.state.survey.childQuestions);
    },
    computed:{
        ...mapState(['survey','questions','loading']),
        ...mapGetters([
            'getquestionsByFilter'
        ]),childResponses: {
            get() {
                return this.$store.state.childs[this.currentQuestion].childResponses;
            },
            set(value) {
                this.$store.commit("childResponses", value);
            }
        }
    },mounted: function () {

    }, methods: {
        updateResponses(e){
            this.valid=true; //console.log(e.target.value);
            this.$store.commit('updateChildResponses', e.target.value)
            console.log(this.$store.state.childs[this.currentQuestion].childResponses );
            console.log(this.$store.state.childs[this.currentQuestion].nextChild);
            if (this.$store.state.childs[this.currentQuestion].nextChild=='secondChild') {
                if (this.$store.state.childs[this.currentQuestion].childResponses === 'Yes') {

                    console.log('vvvv');
                }else{
                    console.log('else');
                    //this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                    // this.$store.commit('nextquestions', this.nextQuestion)
                }
            }else{
                console.log('ssss');
                // this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                // this.$store.commit('nextquestions', this.nextQuestion)
            }
            try {
                const serializedState = JSON.stringify(this.store.state);
                localStorage.setItem('quiz', serializedState);
                localStorage.setItem('child',this.currentQuestion);
            } catch (err) {
                console.error(`Something went wrong: ${err}`);
            }
        },
        next(){ this.$store.dispatch("loadResponse")
            if (this.$store.state.childs[this.currentQuestion].nextChild=='secondChild') {
                if (this.$store.state.childs[this.currentQuestion].childResponses === 'Yes') {
                    console.log('ss');
                    //this.nextQuestion= e.path[0].attributes.next.value;
                    //this.$store.commit('nextquestions', this.nextQuestion)
                    for (var i = 0; i <= store.state.survey.childQuestions.length-1; i++) {
                        // this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.$store.state.survey.childQuestions[i]);
                        this.$store.state.childs.push(this.$store.state.survey.childQuestions[i]);
                        //console.log(this.$store.state.survey.childQuestions)
                    }
                }else{
                    console.log('else');
                    // this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                    // this.$store.commit('nextquestions', this.nextQuestion)
                }
            }
            console.log(this.$store.state.survey.questions[this.$store.state.currentQuestion]);
            //this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(store.state.childs[this.currentQuestion])
            this.currentQuestion++;

            // }
            try {
                const serializedState = JSON.stringify(this.store.state);
                localStorage.setItem('quiz', serializedState);
                localStorage.setItem('child', JSON.stringify(this.currentQuestion));

            } catch (err) {
                console.error(`Something went wrong: ${err}`);
            }
            this.$store.commit('childQuestion', this.currentQuestion)
        },
        prev(){
            if (this.currentQuestion == 0) {
                this.currentQuestion=this.$store.state.currentQuestion;
                this.showPerent=true;
                // this.$router.push('/survey')
                //console.log(this.$store.state.currentQuestion);
                // console.log(this.$store.state.survey.questions[this.currentQuestion]);
                //console.log(this.currentQuestion);
            } else {
                this.currentQuestion--;console.log('ssss');
            }
            localStorage.setItem('child', JSON.stringify(this.currentQuestion));
        }
    }
}
</script>

<style scoped>

</style>





<template>
<div class="flex md xs12">{{childcurrentQuestion}}
<div class="flex md xs12"  v-for="(child, k) in   childs"
    v-bind:id="child.id" v-if="childcurrentQuestion === k && !showPerent"
    :key="k" >
    <h1> {{child.qst}}</h1>
<div class="flex md xs12">
    <div  v-for="response in child.responses">
    <div v-if="response.inputType == 'radio'"  v-model="response.next"
class="radio radio-success"
v-bind:id="response.childcurrentQuestion" >
    <input  type="radio" v-bind:id="'child'+childcurrentQuestion+response.id"  v-bind:name="index"
v-bind:value="response.option" v-model="child.childResponses"
v-on:click="updateResponses"
v-bind:checked="child.childResponses">
    <label v-bind:for="'child'+childcurrentQuestion+response.id"  >
    {{response.option}}
</label>
</div>
<div v-bind:id="response.id" v-if="response.inputType == 'textbox'">
    <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
v-bind:value="response.Name"
v-model="response.Name" v-bind:rules="nameRules"
@focus="getUserInput" required maxlength="50"></v-text-field>
    </div>
    <div v-bind:id="response.id" v-if="response.inputType == 'datepick'">
    <v-menu lazy offset-y full-width :close-on-content-click="false"
v-model="menu" transition="scale-transition"
v-bind:nudge-right="40"  min-width="290px">
    <v-text-field slot="activator" v-bind:label="response.option"
required v-model="child.childResponses" prepend-icon="event"
readonly ></v-text-field>
<v-date-picker min="1950-01-01"
:max="new Date().toISOString().substr(0, 10)"
show-current class="" v-model="child.childResponses">
    <template slot-scope="{ save, cancel }">
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn flat color="primary"  @click="cancel">Cancel</v-btn>
    <v-btn flat color="primary"  @click="save">OK</v-btn>
    </v-card-actions>
    </template>
    </v-date-picker>
    </v-menu>
    </div>
    </div>
    </div>
{{child}}
</div>
<v-btn color="info"
v-on:click="prev(e)" >prev</v-btn>
    <v-btn color="success"
v-on:click="next()">Next</v-btn>
    <survey v-if="showPerent"></survey>
    <login v-if="Islogin"></login>
    </div>
    </template>
    <script>
    import Auth from '../services/Auth';
// import survey from '../components/survey'
import login from '../components/user/login'
import store from '../utils/store'
import {mapGetters,mapState} from 'vuex';
export default {
    name: "create", props: ['survey'],
    components: {
        //survey,
        login
    },
    data: function () {
        return{Islogin:false,
            showPerent:false,
            childQuestion:[],jsonQuiz:[],childs:[],
            radio:[],
            childResponses:'',childcurrentQuestion:0,
            childDetail:[],dob:'',
            store:store,
            inputs: [],childQuestion2:[],
            valid: false,
            childata:[
                {
                    "id":"0",
                    "qst": "Name of  2nd  child ",
                    "responses": [
                        {
                            "id":"1",
                            "inputType":"textbox",
                            "option": "Enter your First Name"
                        },
                        {
                            "id":"2",
                            "inputType":"textbox",
                            "option": "Enter your middle Name"
                        },
                        {
                            "id":"3",
                            "inputType":"textbox",
                            "option": "Enter your last Name"
                        },
                        { "id":"4",
                            "inputType":"datepick",
                            "option": "Enter your date of birth"
                        }
                    ]
                },{
                    "id":"1",
                    "qst": "Do you have another child?",
                    "nextChild":"secondChild",
                    "responses": [
                        {
                            "id":"1",
                            "inputType":"radio",
                            "option": "Yes"
                        },
                        {
                            "id":"2",
                            "inputType":"radio",
                            "option": "No"
                        }
                    ]
                }
            ],
        }
    },beforeMount(){
    },
    created: function(){ alert('child');this.$store.state.currentQuestion=9;
        if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null) {
            this.progress = store.state.currentQuestion
            this.childcurrentQuestion=JSON.parse(localStorage.getItem('child'));
            this.childs=this.$store.state.survey.questions[this.$store.state.currentQuestion].child;
        }else {
            this.$store.dispatch("loadResponse").then(() => {
                console.log("This would be printed after dispatch!!")
                for (var i = 0; i <= store.state.survey.childQuestions.length-1; i++) {
                    this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.$store.state.survey.childQuestions[i]);
                    // this.$store.state.childs.push(this.$store.state.survey.childQuestions[i]);
                    //  console.log(this.$store.state.survey.childQuestions)
                    this.childs=this.$store.state.survey.questions[this.$store.state.currentQuestion].child;
                } localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
            })
            // store.dispatch('addchild');
        }

        //console.log(this.childs);
        //  store.state.childs.push(store.state.survey.childQuestions);
    },
    computed:{
        ...mapState(['survey','questions','loading']),
        ...mapGetters([
            'getquestionsByFilter'
        ]),childResponses: {
            get() {
                return this.this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses;
            },
            set(value) {
                this.$store.commit("childResponses", value);
            }
        },...mapState({
            updateChildQuiz: state => state.survey.questions[state.currentQuestion].updateChildQuiz
        })
    },mounted: function () {

    }, methods: {
        updateResponses(e){
            this.valid=true; //console.log(e.target.value);
            this.$store.commit('updateChildResponses', e.target.value)
            //console.log(this.$store.state.childs[this.childcurrentQuestion].childResponses );
            //console.log(this.$store.state.childs[this.childcurrentQuestion].nextChild);
            if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].nextChild=='secondChild') {
                if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'Yes') {
                    console.log('vvvv');

                }else{
                    console.log('else');
                }
            }else{
                console.log('ssss');
            }
            try {
                const serializedState = JSON.stringify(this.$store.state);
                localStorage.setItem('quiz', serializedState);
                localStorage.setItem('child',this.childcurrentQuestion);
            } catch (err) {
                console.error(`Something went wrong: ${err}`);
            }
        },
        next(){ console.log(this.childcurrentQuestion)
            if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].nextChild== 'secondChild') {
                if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'Yes') {
                    this.$store.dispatch("loadResponse")
                    for (var i = 0; i <= this.childata.length - 1; i++) {
                        // this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.$store.state.survey.childQuestions[i]);
                        this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.childata[i]);
                        console.log(this.$store.state.survey.questions[this.$store.state.currentQuestion].child)
                        console.log(this.childata[i])
                        this.$store.commit('updateChildQuiz', this.childata[i])
                        // console.log(this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.$store.state.childQuestion]);
                    }console.log('copy');
                    this.childcurrentQuestion++;
                }if(this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'No') {
                    this.Islogin=true;
                    this.dialog = true;
                    //this.childcurrentQuestion=this.$store.state.childQuestion;
                }
            }else{ console.log('childcurrentquestion');
                this.childcurrentQuestion++;
            }
            //console.log(this.$store.state.survey.questions[this.$store.state.currentQuestion]);
            //this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(store.state.childs[this.currentQuestion])

            // }
            try {
                const serializedState = JSON.stringify(this.store.state);
                localStorage.setItem('quiz', serializedState);
                localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));

            } catch (err) {
                console.error(`Something went wrong: ${err}`);
            }
            this.$store.commit('childQuestion', this.childcurrentQuestion)
        },
        prev(){
            if (this.childcurrentQuestion == 0) {
                localStorage.removeItem('child');
                //this.showPerent=true;store.dispatch("loadResponse")
                this.showsubchild=false;
                //this.currentQuestion=this.$store.state.currentQuestion;
                // this.$router.push('/survey')
                //console.log(this.$store.state.currentQuestion);
                // console.log(this.$store.state.survey.questions[this.currentQuestion]);
                console.log('showPerent');
            } else {
                if(this.Islogin=true)
                {this.Islogin=false;}
                this.childcurrentQuestion--;console.log('ssss');
                this.$store.commit('childQuestion', this.childcurrentQuestion)
                localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
            }
        }
    }
}
</script>

<style scoped>

</style>