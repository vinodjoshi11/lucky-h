<!--suppress ALL -->
<template>
    <v-container fluid grid-list-xl>
        <v-layout row wrap>
            <v-flex xs8 offset-xs2 class="my-3">
                <v-card>
                    <v-toolbar color="primary">
                        <v-card-title>
                            <h1 style="color:white">My Quiz</h1>
                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-toolbar>
                    <v-container fluid class="px-3">
                        <v-layout row wrap>
                            <v-progress-linear :indeterminate="query"  :query="true" v-model="progress" :active="progressshow"></v-progress-linear>
                            {{index}} {{currentQuestion}}


                            <v-flex md xs12 offset-xs1 v-for="question, index in store.state.survey.questions"
                                    v-bind:id="question.id"  v-if="currentQuestion === index && !store.state.showsubchild" :key="index" >
                                <h4> {{currentQuestion}} {{question.qst}} </h4>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <ol class="flex md xs12  ">
                                        <li   v-for="response in question.responses" >

                                            <div v-if="response.inputType == 'radio'"
                                                 v-bind:id="response.id"     class="radio radio-success">
                                                <!--<v-radio-group v-model="question.userResponses"
                                                 v-bind:next="response.next" @change="updateResponses"
                                                 v-bind:rules="[v => !!v || 'You must agree to continue!']">
                                                    <v-radio v-bind:key="response"
                                                             v-bind:label="`${response.option}`"
                                                             v-bind:value="response.option"
                                                             v-bind:checked="question.userResponses"
                                                    ></v-radio>
                                                </v-radio-group>-->
                                                <input type="radio" v-bind:id="'option'+ response.id"  v-bind:name="index"
                                                       v-bind:next="response.next"
                                                       v-bind:value="response.option" v-model="question.userResponses"
                                                       v-on:click="updateResponses" v-bind:checked="question.userResponses"  required>
                                                <label v-bind:for="'option'+ response.id"  >
                                                    {{response.option}}
                                                </label>

                                            </div>
                                            <div v-bind:id="response.id" v-if="response.inputType == 'textBox'">
                                                <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                                              v-bind:value="response.Name" v-bind:next="response.next"
                                                              v-model="response.Name" v-bind:rules="arrvalidation.nameRules"
                                                              @focus="getUserInput" required maxlength="50"></v-text-field>
                                            </div>
                                            <div ref="menu"  v-bind:id="response.id" v-if="response.inputType == 'datePick'">
                                                <v-menu ref="menu" @click.native="getDate" lazy offset-y full-width :close-on-content-click="false"
                                                        v-model="menu" transition="scale-transition" v-bind:next="response.next"
                                                        v-bind:nudge-right="40"  min-width="290px">
                                                    <v-text-field slot="activator" v-bind:label="response.option"
                                                                  v-bind:value="question.dateofbirth"
                                                                  @focus="getUserInput"v-bind:rules="arrvalidation.birthRules"
                                                                  v-bind:next="response.next"
                                                                  required v-model="question.dateofbirth" prepend-icon="event"
                                                                  readonly ></v-text-field>
                                                    <v-date-picker v-bind:min="mindate"  v-bind:max="maxdate" ref="picker"  v-model="question.dateofbirth">
                                                        <template slot-scope="{ save, cancel }">
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn flat color="primary"  @click="menu = false">Cancel</v-btn>
                                                                <v-btn flat color="primary"  @click="$refs.menu[0].save(date)">OK</v-btn>
                                                            </v-card-actions>
                                                        </template>
                                                    </v-date-picker>
                                                </v-menu>
                                            </div>
                                            <div v-bind:id="response.id" v-if="response.inputType == 'number'">
                                                <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                                              v-bind:next="response.next" v-bind:prev="response.prev" v-bind:value="question.userResponses"
                                                              v-bind:rules="arrvalidation.phonenumber"
                                                              @focus="getUserInput" v-model="question.userResponses" mask="###########"
                                                              required ></v-text-field>
                                            </div>
                                            <div v-bind:id="response.id" v-if="response.inputType == 'Email'">
                                                <v-text-field v-bind:name="response.option"
                                                              @focus="getUserInput" v-bind:next="response.next"
                                                              v-bind:label="response.option" v-bind:rules="arrvalidation.emailRules" v-bind:value="question.userResponses"
                                                              v-model="question.userResponses" required ></v-text-field>
                                            </div>
                                        </li>
                                    </ol>
                                    <div v-if="selectinput" class="errorred">Please select your options</div>
                                    {{question}}<br>
                                    <v-btn color="info" v-bind:id="question.prev" v-if="currentQuestion > 0"
                                           v-on:click="goToPreviousQuestion(e)" >prev</v-btn>
                                    <v-btn color="success"
                                           v-on:click="goToNextQuestion(question)"  v-bind:disabled="!valid">Next</v-btn>

                                </v-form></v-flex>
                            <child v-bind:whenApplied="arrvalidation" v-if="!store.state.IsloginComponents">
                            </child>
                            <login v-if="Islogin" >
                            </login>
                        </v-layout>

                    </v-container>

                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>
<script>
    import Auth from '../services/Auth';
    import child from '../components/child'
    import login from '../components/user/login'
    import store from '../utils/store'
    import {mapGetters, mapActions,mapState} from 'vuex';
    export default {
        name: "quiz",
        components: {
            login,child
        },
        props: ['whenApplied'],
        data: function () {
            return {
                maxdate:"2000-01-01",mindate:"1950-01-01",
                Islogin:false,
                Questions:[],subchild:[],//showsubchild:false,
                progressshow: true,isvaluefilled:false,
                date: null,PostQuestions:[],
                menu: false,valid:false,selectinput:false,
                Name:'',
                store: store, currentQuestion:store.state.currentQuestion,attemptQuestion:0, //userResponses:'',
                datetime: null,index:0,arrprevQuestion:[],storeQuestion:[],nextquestion:0,prevQuestion:0,
                isAnswerfilled:false,
                arrvalidation: {
                    nameRules: [v => !!v || 'Your Name is required', (v) => v && v.length >= 5 || 'Your Name  must be grater than 5 characters'],
                    birthRules:[v => !!v || 'Your Date of Birth is required'],
                    phonenumber: [v => !!v || 'Phone Number is required', (v) => v && v.length >= 9 || 'Phone Number must be grater than 10 characters'],
                    email: '',
                    emailRules: [
                        v => !!v || 'Your E-mail is required',
                        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                    ]
                }
            }
        },watch: {
            menu (val) {
                val && this.$nextTick(() => (this.$refs.picker[0].activePicker = 'YEAR'))
                //console.log(this.$refs.form);
                //console.log(this.$refs.form.$el.children[0].children[1].children[0].children[0].children[0].children[0].activePicker);
            }
        },beforeMount(){
        },
        created: function() { // this.$store.state.currentQuestion=9;
            if (localStorage.getItem('attemptQuestion') !== 'undefined' && localStorage.getItem('attemptQuestion') !== null) {
                this.progress = store.state.currentQuestion
                this.currentQuestion=JSON.parse(localStorage.getItem('attemptQuestion'));
                //this.childQuestion=JSON.parse(localStorage.getItem('child'));
                this.Questions = store.state.survey.questions;
                if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null)
                {
                    //this.store.state.showsubchild = true;
                }
                // this.PostQuestions=JSON.parse(localStorage.getItem('PostQuestions'))
                this.valid=true;
            }else {
                this.$store.dispatch("loadResponse").then(() => {
                    console.log("This would be printed after dispatch!!")
                    //this.Questions = storesavechildResponse.state.survey.questions;
                })
            }
        },
        computed: {
            ...mapState(['survey','questions']),
            ...mapGetters([
                'getquestionsByFilter'
            ]),userResponses: {
                get() {
                    return this.$store.state.survey.questions[state.currentQuestion].userResponses;
                }, set(value) {
                    this.$store.commit("userResponses", value);
                }
            },
            nextquestions: {
                get() {
                    return this.$store.state.survey.questions[state.currentQuestion].nextquestions;
                }, set(value) {
                    this.$store.commit("nextquestions", value);
                }
            },
            ...mapState({
                auth: state => state.loggedin,
                getUsername:state=>state.survey.questions[state.currentQuestion].getUsername,
                prevquestion: state => state.survey.questions[state.currentQuestion].prevquestion,
                isValid: state => state.survey.questions[state.currentQuestion].isValid
            })
        }, mounted: function () {

        }, methods: {
            save (date) {
                this.$refs.menu[0].save(date)
            },
            updateResponses (e){
                this.event = e; //console.log(this.event.target);
                this.valid = true; this.selectinput=false;
                if (this.$store.state.survey.questions[this.currentQuestion].nextChild=='secondChild') {
                    if (this.$store.state.survey.questions[this.currentQuestion].userResponses === 'Yes') {
                        this.$store.commit('isValid', this.valid)
                        this.$store.commit('updateResponses', this.event.target.value)

                    }
                    console.log('if');
                }else{ this.$store.commit('isValid', this.valid)
                    this.$store.commit('updateResponses', this.event.target.value)
                    this.nextQuestion= parseInt(this.event.path[0].attributes.next.value);
                    this.$store.commit('nextquestions', this.nextQuestion)
                    this.prevQuestion=this.currentQuestion;
                    this.$store.commit('prevquestion', this.prevQuestion)
                }try {
                    const serializedState = JSON.stringify(this.store.state);
                    localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('attemptQuestion',this.currentQuestion);
                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
                this.isAnswerfilled=true;
            },getUsername(e){this.selectinput=true;     console.log(e);
                this.event = e;
                this.Name=this.event.target.value;
                this.valid = true;
                this.$store.commit('isValid', this.valid)
                this.$store.commit('getUsername', this.Name)

                this.nextQuestion=parseInt(this.event.target.attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.prevQuestion= this.currentQuestion;
                this.$store.commit('prevquestion', this.prevQuestion)
                this.isAnswerfilled=true;
            },getUserInput (e){
                this.event = e;this.valid = true;
                this.$store.commit('isValid', this.valid)
                this.$store.commit('getUserInput', this.event.target.value)
                this.nextQuestion=parseInt(this.event.target.attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.prevQuestion= this.currentQuestion;
                this.$store.commit('prevquestion', this.prevQuestion)
                this.isAnswerfilled=true;
            },getDate(e){
                this.event = e;this.valid = true; //console.log(this.event.path);
                this.$store.commit('isValid', this.valid)
                this.nextQuestion=parseInt(this.$store.state.survey.questions[this.currentQuestion].responses[0].next);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.prevQuestion= this.currentQuestion;
                this.$store.commit('prevquestion', this.prevQuestion)
                this.isAnswerfilled=true;
            },
            goToNextQuestion(question) {  console.log(this.$refs.form[0].validate());
                if (this.$refs.form[0].validate()) {
                    if (this.$store.state.survey.questions[this.currentQuestion].nextChild == 'secondChild') {
                        if (this.$store.state.survey.questions[this.currentQuestion].userResponses === 'Yes') {
                            this.store.state.IsloginComponents = false;
                            this.store.state.showsubchild = true;
                            this.nextQuestion = parseInt(this.nextQuestion);
                            this.currentQuestion = parseInt(this.currentQuestion);
                            localStorage.removeItem('child');this.$store.dispatch("childResponse")
                            //localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
                        }if (this.$store.state.survey.questions[this.currentQuestion].valid!== true) {
                            this.selectinput=true;
                        } if (this.$store.state.survey.questions[this.currentQuestion].userResponses === 'No'){
                            console.log('login');
                            this.Islogin = true;this.selectinput=false;
                            this.store.state.auth.loginDialog = true;
                            console.log(this.store.state.auth.loginDialog);
                        }
                    } else if (this.$store.state.survey.questions[this.currentQuestion].isLogin == true) {
                        if (this.$store.state.survey.questions[this.currentQuestion].userResponses === 'No') {
                            this.Islogin = true;
                            this.store.state.auth.loginDialog = true;
                            //console.log(this.store.state.auth.loginDialog);
                        }if (this.$store.state.survey.questions[this.currentQuestion].valid!== true) {
                            this.selectinput=true;
                        }if(this.$store.state.survey.questions[this.currentQuestion].userResponses === 'Yes')  {
                            //console.log('ssss');
                            this.selectinput=false;
                            this.currentQuestion = this.nextQuestion
                            this.$store.commit('currentQuestion', this.currentQuestion)
                            this.isAnswerfilled = false;
                            this.query = false
                            this.progressshow = true
                            this.progress = store.state.currentQuestion
                        }
                    }
                    else {
                        if (this.isAnswerfilled) { //console.log('noraml');
                            this.currentQuestion = this.nextQuestion
                            this.$store.commit('currentQuestion', this.currentQuestion)
                            this.isAnswerfilled = false;
                            this.query = false
                            this.progressshow = true
                            this.progress = store.state.currentQuestion
                        }else{
                            if (this.$store.state.survey.questions[this.currentQuestion].valid== true){
                                this.currentQuestion = this.$store.state.survey.questions[this.currentQuestion].nextQuestion;
                            }else{
                                this.selectinput=true;
                            }

                        }
                    }
                    try {
                        const serializedState = JSON.stringify(this.store.state);
                        localStorage.setItem('quiz', serializedState);
                        localStorage.setItem('attemptQuestion', JSON.stringify(this.currentQuestion));

                    } catch (err) {
                        console.error(`Something went wrong: ${err}`);
                    }
                    /*  console.log(question);
                      console.log(this.PostQuestions);
                     if(this.PostQuestions.indexOf(question) === -1) {
                         this.PostQuestions.push(question);
                          //console.log(this.PostQuestions)
                         // return question;
                      }
                      if ( !( question in this.PostQuestions ) ) {
                          localStorage.setItem('PostQuestions', JSON.stringify(this.PostQuestions));
                      }*/

                }//this.valid = false;

            },
            goToPreviousQuestion() {
                // console.log(this.$store.state.survey.questions[this.currentQuestion].prev);
                this.currentQuestion=this.$store.state.survey.questions[this.currentQuestion].prevQuestion;
                this.$store.commit('currentQuestion',this.currentQuestion)
                this.valid = true;  this.selectinput=false;
                console.log(this.currentQuestion);
            },
            ...mapActions([
                'login',
            ])
        }
    }
</script>
<style>
    .primary {
        background-color: #1867c0 !important;
        border-color: #1867c0 !important;
    }

</style>
