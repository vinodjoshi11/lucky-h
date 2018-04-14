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
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-flex md xs12 offset-xs1 v-for="question, index in store.state.survey.questions"
                        v-bind:id="question.id"  v-if="currentQuestion === index && !showsubchild" :key="index" >
                  <h4> {{currentQuestion}} {{question.qst}} </h4>
                  <ol class="flex md xs12  ">
                    <li   v-for="response in question.responses" >
                      <div v-if="response.inputType == 'radio'"  v-model="response.next" class="radio radio-success"
                           v-bind:id="response.id" >
                        <input  type="radio" v-bind:id="'option'+ response.id"  v-bind:name="index"
                                v-bind:next="response.next"
                                v-bind:rules="[v => !!v || 'You must agree to continue!']" v-bind:value="response.option" v-model="question.userResponses"
                                v-on:click="updateResponses" v-bind:checked="question.userResponses">
                        <label v-bind:for="'option'+ response.id"  >
                          {{response.option}}
                        </label>
                      </div>
                      <div v-bind:id="response.id" v-if="response.inputType == 'textbox'">
                        <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                      v-bind:value="response.Name" v-bind:next="response.next"
                                      v-model.textbox="response.Name" v-bind:rules="nameRules"
                                      @focus="getUserInput" required maxlength="50"></v-text-field>
                      </div>
                      <div v-bind:id="response.id" v-if="response.inputType == 'datepick'">
                        <v-menu @click.native="getDate" lazy offset-y full-width :close-on-content-click="false"
                                v-bind:next="response.next"  v-model="menu" transition="scale-transition"
                                v-bind:nudge-right="40"  min-width="290px">
                          <v-text-field slot="activator" v-bind:label="response.option"
                                        @focus="getUserInput" v-bind:next="response.next"
                                        required v-model="question.userResponses" prepend-icon="event" readonly ></v-text-field>
                          <v-date-picker min="1950-01-01" v-bind:next="response.next" @click.native="getDate"
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
                                      @focus="getUserInput" v-model.number="question.userResponses" mask="###########"
                                      required ></v-text-field>
                      </div>
                      <div v-bind:id="response.id" v-if="response.inputType == 'Email'">
                        <v-text-field v-bind:name="response.option"
                                      @focus="getUserInput" v-bind:next="response.next"
                                      v-bind:label="response.option" v-bind:rules="emailRules" v-bind:value="question.userResponses"
                                      v-model="question.userResponses" required ></v-text-field>
                      </div>
                    </li>
                  </ol>
                  {{question}}<br>
                  <!--<create>  </create> <login > </login>-->
                  <v-btn color="info" v-bind:id="question.prev" v-if="currentQuestion > 0"
                         v-on:click="goToPreviousQuestion(e)" >prev</v-btn>
                  <v-btn color="success"
                         v-on:click="goToNextQuestion()">Next</v-btn>
                </v-flex>
              </v-form>
              <child v-if="showsubchild">
              </child>
              {{store.state.survey.questions}}
              {{currentQuestions}}
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
    //import Auth from '../services/Auth';
    import child from '../components/child'
    //import create from "./components/create";
    import login from '../components/user/login'
    import store from '../utils/store'
    import {mapGetters, mapActions,mapState} from 'vuex';

    export default {
        name: "quiz",
        components: {
            login,child
        },
        data: function () {
            return {Questions:[],subchild:[],showsubchild:false,
                progressshow: true,isvaluefilled:false,
                valid: false,date: null,
                menu: false,
                Name:'',FirstName:'',middleName:'',lastName:'',
                store: store, currentQuestion:store.state.currentQuestion,attemptQuestion:0, //userResponses:'',
                datetime: null,index:0,arrprevQuestion:[],storeQuestion:[],nextQuestion:0,
                isAnswerfilled:false,
                nameRules: [
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
        },
        created: function() {
            if (localStorage.getItem('attemptQuestion') !== 'undefined' && localStorage.getItem('attemptQuestion') !== null) {
                this.progress = store.state.currentQuestion
                this.currentQuestion=JSON.parse(localStorage.getItem('attemptQuestion'));
                //this.childQuestion=JSON.parse(localStorage.getItem('child'));
                this.Questions = store.state.survey.questions;
                if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null)
                {
                    this.showsubchild=true;
                }
            }else {
                this.$store.dispatch("loadResponse").then(() => {
                    console.log("This would be printed after dispatch!!")
                    this.Questions = store.state.survey.questions;
                })
            }
        },
        computed: {
            ...mapState(['survey','questions','loading']),
            ...mapGetters([
                'getquestionsByFilter'
            ]),userResponses: {
                get() {
                    return this.$store.state.survey.questions[state.currentQuestion].userResponses;
                },
                set(value) {
                    this.$store.commit("userResponses", value);
                }
            },
            nextquestions: {
                get() {
                    return this.$store.state.survey.questions[state.currentQuestion].nextquestions;
                },
                set(value) {
                    this.$store.commit("nextquestions", value);
                }
            },
            /*...mapState({
               userResponses: state => state.survey.questions[state.currentQuestion].userResponses
           })*/
        },mounted: function () {

        }, methods: {
            save (date) {
                this.$refs.menu.save(date)
            },
            updateResponses (e){  this.valid=true; //console.log(e.target.value);
                this.$store.commit('updateResponses', e.target.value)
                //console.log(store.state.survey.questions.length)
                /*for(var k=0; k<=this.$store.state.survey.questions[this.currentQuestion].responses.length-1;k++)
                {   //if(this.Questions[this.currentQuestion].responses[k].typeofChild!=' ') {
                     if (this.$store.state.survey.questions[this.currentQuestion].responses[k].next==='secondChild') {
                         this.subchild=this.$store.state.survey.questions[this.currentQuestion].responses[k].next;
                         console.log('if')
                         //this.nextQuestion=this.subchild;
                         //console.log(this.nextQuestion)
                         this.$store.commit('subchild',this.subchild)
                     }else{

                     }
                   //}
                }*/console.log(this.$store.state.survey.questions[this.currentQuestion]);
                if (this.$store.state.survey.questions[this.currentQuestion].nextChild=='secondChild') {
                    if (this.$store.state.survey.questions[this.currentQuestion].userResponses === 'Yes') {
                        // console.log(e.path[0].attributes.next.value);
                        this.nextQuestion= e.path[0].attributes.next.value;
                        this.$store.commit('nextquestions', this.nextQuestion)
                    }else{
                        console.log('else');
                        this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                        this.$store.commit('nextquestions', this.nextQuestion)
                    }
                }else{
                    console.log('ssss');
                    this.nextQuestion= parseInt(e.path[0].attributes.next.value);
                    this.$store.commit('nextquestions', this.nextQuestion)
                }
                try {
                    const serializedState = JSON.stringify(this.store.state);
                    localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('attemptQuestion',this.currentQuestion);

                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
                this.isAnswerfilled=true;
            },getUserInput (e){
                this.event = e;
                this.$store.commit('getUserInput', this.event.target.value)
                this.nextQuestion=parseInt(this.event.target.attributes.next.value);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.isAnswerfilled=true;
            },getDate (e) {
                this.event = e; //console.log(this.event.path);
                this.nextQuestion=parseInt(this.$store.state.survey.questions[this.currentQuestion].responses[0].next);
                this.$store.commit('nextquestions', this.nextQuestion)
                this.isAnswerfilled=true;
            },
            goToNextQuestion() { //console.log(this.$refs.form.validate());
                //if (this.$refs.form.validate()) {
                if (this.isAnswerfilled) {
                    if(this.nextQuestion==this.currentQuestion+.1)
                    {   this.showsubchild=true;
                        this.nextQuestion= parseInt(this.nextQuestion);
                        this.currentQuestion= parseInt(this.currentQuestion);
                    }else {
                        this.currentQuestion = this.nextQuestion
                        this.$store.commit('currentQuestion', this.currentQuestion)
                        this.isAnswerfilled = false;
                        this.query = false
                        this.progressshow = true
                        this.progress = store.state.currentQuestion
                    }
                }else {
                    console.log('else')
                    this.currentQuestion = this.$store.state.survey.questions[this.currentQuestion].nextQuestion;
                }
                try {
                    //const serializedState = JSON.stringify(this.store.state);
                    //localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('attemptQuestion', JSON.stringify(this.currentQuestion));

                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
                // }
            },
            goToPreviousQuestion() {
                // console.log(this.$store.state.survey.questions[this.currentQuestion].prev);
                this.currentQuestion=this.$store.state.survey.questions[this.currentQuestion].prev;
                this.$store.commit('currentQuestion',this.currentQuestion)
                console.log(this.currentQuestion);
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
<style>
  .primary {
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
  }

</style>
