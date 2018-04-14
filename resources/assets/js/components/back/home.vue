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
                    </v-toolbar>{{index}} {{currentQuestion}}
                    <v-container fluid class="px-3">
                        <v-layout row wrap>
                            <v-flex md xs12 offset-xs1 v-for="(question, index) in  questions"
                                    v-bind:id="question.id"  v-if="currentQuestion === index" :key="index" >

                            </v-flex>
                            <v-flex md xs12 offset-xs1 v-for="question, index in store.state.survey.questions"
                                    v-bind:id="question.id"  v-if="currentQuestion === index" :key="index" >
                                <h4> {{currentQuestion}} {{question.qst}} </h4>
                                <ol class="flex md xs12  ">
                                    <li   v-for="response in question.responses">
                                        <div v-if="response.inputType == 'radio'"  v-model="response.next" class="radio radio-success"
                                             v-bind:id="response.id" >
                                            <input  type="radio" v-bind:id="'option'+ response.id"  v-bind:name="index"
                                                    v-bind:next="response.next" v-bind:value="response.option" v-model="question.userResponses"
                                                    v-if="question.id" v-on:click="updateResponses" v-bind:checked="question.userResponses">
                                            <label v-bind:for="'option'+ response.id"  >
                                                {{response.option}}
                                            </label>
                                        </div>
                                        <div v-bind:id="response.id" v-if="response.inputType == 'textbox'">
                                            <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                                          v-bind:value="response.name" v-bind:next="response.next"
                                                          v-model.textbox="response.name" v-bind:rules="nameRules" @input="getUserInput()"
                                                          required maxlength="50"></v-text-field>
                                        </div>
                                        <div v-bind:id="response.id" v-if="response.inputType == 'datepick'">
                                            <v-menu  lazy offset-y full-width :close-on-content-click="false"
                                                     v-model="menu" transition="scale-transition"
                                                     v-bind:nudge-right="40"  min-width="290px">
                                                <v-text-field slot="activator" v-bind:label="response.option"
                                                              v-on:click="getDate" v-bind:next="response.next"
                                                              required v-model="question.userResponses" prepend-icon="event" readonly ></v-text-field>
                                                <v-date-picker min="1950-01-01"
                                                               :max="new Date().toISOString().substr(0, 10)"
                                                               show-current class="" v-model="question.userResponses">
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
                                        <div v-bind:id="response.id" v-if="response.inputType == 'number'">
                                            <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                                          v-bind:next="response.next" v-bind:prev="response.prev" v-bind:value="question.userResponses"
                                                          @input="getUserInput()" v-model.number="question.userResponses" mask="###########"
                                                          required ></v-text-field>
                                        </div>
                                        <div v-bind:id="response.id" v-if="response.inputType == 'Email'">
                                            <v-text-field v-bind:name="response.option"
                                                          @input="getUserInput()" v-bind:next="response.next"
                                                          v-bind:label="response.option" v-bind:rules="emailRules" v-bind:value="question.userResponses"
                                                          v-model="question.userResponses" required ></v-text-field>
                                        </div>
                                    </li>
                                </ol>
                                {{question}}<br>

                                <v-btn color="info" v-bind:id="question.prev"
                                       v-if="currentQuestion > 0"
                                       v-on:click="goToPreviousQuestion(e)" >prev</v-btn>
                                <v-btn color="success" v-bind:id="question.prev"
                                       v-on:click="goToNextQuestion()"
                                >Next</v-btn>
                                <login > </login>
                            </v-flex>
                            {{store.state}}
                            {{currentQuestions}}
                            <v-btn color="success"
                                   @click="next()"
                            >press</v-btn>

                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>
<script>
    import Auth from '../services/Auth';
    import login from '../components/user/login'
    import store from '../utils/store'
    import {mapGetters, mapActions,mapState} from 'vuex';
    export default {
        name: "quiz",
        components: {
            login
        },
        data: function () {
            return { date: null,
                menu: false,
                name:'',FirstName:'',middleName:'',lastName:'',
                store: store, currentQuestion:store.state.currentQuestion,attemptQuestion:0, //userResponses:'',
                datetime: null,index:0,arrprevQuestion:[],storeQuestion:[],nextQuestion:0,prevQuestion:0,
                isfillQuestion:false,nameRules: [
                    v => !!v || 'Your Name is required'
                ],email: '',
                emailRules: [
                    v => !!v || 'Your E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]
            }
        },watch: {
            menu (val) {
                //val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },beforeMount(){
            if (localStorage.getItem('attemptQuestion') !== 'undefined' && localStorage.getItem('attemptQuestion') !== null) {
                console.log('defined');
                this.currentQuestion=JSON.parse(localStorage.getItem('attemptQuestion'));
            }else{ //this.currentQuestion=0;
                store.dispatch('loadResponse')
            }
        },
        created: function() {
        },
        computed: {
            ...mapState(['survey','questions','loading']),
            ...mapGetters([
                'getquestionsByFilter'
            ]),
            ...mapState({
                userResponses: state => state.survey.questions[state.currentQuestion].userResponses
            })
        },mounted: function () {

        }, methods: {
            save (date) {
                this.$refs.menu.save(date)
            },
            updateResponses (e){   console.log(e.target.value);
                this.$store.commit('updateResponses', e.target.value)
                this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)
                try {
                    //const serializedState = JSON.stringify(this.store.state);
                    //localStorage.setItem('quiz', serializedState);
                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
                //  this.$store.state.survey.questions[this.currentQuestion].push('next',this.currentQuestion)
                this.isfillQuestion=true;
            },getUserInput (e){ //console.log(this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[1].children[0].attributes.next.value);
                this.$store.commit('getUserInput', this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[1].children[0].value)
                this.nextQuestion=parseInt(this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[1].children[0].attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)

                this.isfillQuestion=true;
            },getDate (e) {// console.log(this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[1].max);
                //console.log(this.$children[0].$el.children[1].children[0].children[0].children[1].children[0]);
                this.$store.commit('getUserInput', this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[1].max)
                this.nextQuestion=parseInt(this.$children[0].$el.children[1].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[1].attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.isfillQuestion=true;
            },
            goToNextQuestion() {
                if(this.isfillQuestion)
                {   this.currentQuestion=this.nextQuestion
                    this.$store.commit('currentQuestion', this.currentQuestion)
                    this.isfillQuestion=false;
                    //console.log('if')
                }else{ console.log('else')
                    this.currentQuestion=this.$store.state.survey.questions[this.currentQuestion].nextQuestion;
                }
                try {
                    //const serializedState = JSON.stringify(this.store.state);
                    //localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('attemptQuestion', JSON.stringify(this.currentQuestion));

                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
            },
            goToPreviousQuestion() {
                // console.log(this.$store.state.survey.questions[this.currentQuestion].prev);
                this.currentQuestion=this.$store.state.survey.questions[this.currentQuestion].prev;

            },show(){
                // this.route.go('/home');
                this.$router.push('/home')

            }
            /*...mapActions([
                    'next',
                ])*/
        }
    }
</script>