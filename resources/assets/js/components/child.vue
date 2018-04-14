<template>
 <div class="flex md xs12">{{childcurrentQuestion}}
     <v-form v-model="valid" ref="form" lazy-validation>
  <div class="flex md xs12"  v-for="(child, k) in this.$store.state.survey.questions[this.$store.state.currentQuestion].child"
       v-bind:id="child.id" v-if="childcurrentQuestion === k && !showPerent" :key="k" >
        <div v-if="child.childIndex=='Yes'">
            <div v-if="store.state.currentQuestion=='9'">
            <h1 v-if="childcurrentQuestion==0"> {{child.qst}}{{childcurrentQuestion+2}}nd child</h1>
            <h1 v-if="childcurrentQuestion==2"> {{child.qst}}{{childcurrentQuestion+1}}rd child</h1>
            <h1 v-if="childcurrentQuestion==4"> {{child.qst}}{{childcurrentQuestion}}th child</h1>
          </div>
            <div v-if="store.state.currentQuestion=='10'">
                <h1 v-if="childcurrentQuestion==0"> {{child.qst}}{{store.state.childQuestionIndex+1}}st child</h1>
                <h1 v-if="childcurrentQuestion==2"> {{child.qst}}{{store.state.childQuestionIndex+1}}nd child</h1>
                <h1 v-if="childcurrentQuestion==4"> {{child.qst}}{{store.state.childQuestionIndex}}rd child</h1>
                <h1 v-if="childcurrentQuestion>4"> {{child.qst}}{{store.state.childQuestionIndex-1}}rd child</h1>
            </div>
        </div>
            <div v-if="child.childIndex=='No'">
                <h1> {{child.qst}}</h1>
            </div>
            <div class="flex md xs12">
                <div  v-for="response in child.responses">
                    <div v-if="response.inputType == 'radio'"
                         class="radio radio-success"
                         v-bind:id="response.childcurrentQuestion" >
                        <!--<v-radio-group v-model="child.childResponses" >
                            <v-radio v-bind:rules="[v => !!v || 'You must agree to continue!']"
                                     v-bind:key="response"
                                     v-bind:label="`${response.option}`"
                                     v-bind:value="response"
                                     v-bind:checked="child.childResponses"
                            ></v-radio>
                        </v-radio-group>-->
                        <input type="radio" v-bind:id="'child'+childcurrentQuestion+response.id"
                               v-bind:name="index"
                                v-bind:value="response.option" v-model="child.childResponses"
                                v-on:click="updateResponses"
                                v-bind:checked="child.childResponses">
                        <label v-bind:for="'child'+childcurrentQuestion+response.id"  >
                            {{response.option}}
                        </label>
                    </div>
                    <div v-bind:id="response.id" v-if="response.inputType == 'textBox'">
                        <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                                      v-bind:rules="birthRules"  v-bind:value="response.Name"
                                      v-model="response.Name"
                                      @focus="getUserInput" required maxlength="50"></v-text-field>
                    </div>
                    <div v-bind:id="response.id" v-if="response.inputType == 'datePick'">
                      <v-menu ref="menu" @click.native="getDate" lazy offset-y full-width :close-on-content-click="false"
                                v-model="menu" transition="scale-transition"
                                v-bind:nudge-right="40"  min-width="290px">
                            <v-text-field slot="activator" v-bind:label="response.option"
                                          v-bind:rules="birthRules"
                                          v-bind:value="child.dateofbirth"
                                          @focus="getUserInput"
                                          required v-model="child.dateofbirth" prepend-icon="event"
                                          readonly ></v-text-field>
                            <v-date-picker ref="picker" v-bind:min="mindate"  v-bind:max="maxdate"
                                             v-model="child.dateofbirth">
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
                </div>
            </div>
            {{child}}
        <div v-if="selectinput" class="errorred">Please select your options</div>
        <v-btn color="info" v-on:click="prev(e)" >prev</v-btn>
        <v-btn color="success" v-on:click="next()" v-bind:disabled="!valid">Next</v-btn>
  </div>
     </v-form>
     <login v-if="Islogin"></login>
 </div>
</template>
<script>
    // import Auth from '../services/Auth';
    import login from '../components/user/login'
    import store from '../utils/store'
    import {mapState} from 'vuex';
    export default {
        name: "create",props: ["arrvalidation"],
        components: {
            login
        },
        data: function () {
            return{
                maxdate:"2000-01-01",mindate:"1950-01-01",
                date: null,
                menu: false,
                Islogin:false,childIndex:0,
                childs:[],id:0,valid:false,selectinput:false,
                childResponses:'',childcurrentQuestion:0,
                store:store,childQuiz:[],
                valid: false,
                birth:'',
                birthRules:[v => !!v || 'Your Date of Birth is required'],
                nameRules: [v => !!v || 'Your Name is required', (v) => v && v.length >= 5 || 'Your Name  must be grater than 5 characters'],
             }
        },watch: {
            menu (val) {
               val && this.$nextTick(() => (this.$refs.picker[0].activePicker = 'YEAR'))
               // console.log(this.$refs.picker[0].activePicker)
            }
        },beforeMount(){
        },
        created: function(){
            if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null) {
                this.progress = store.state.currentQuestion
                this.childcurrentQuestion=JSON.parse(localStorage.getItem('child'));
                this.childs=this.$store.state.survey.questions[this.$store.state.currentQuestion].child;
            }else {
                  //localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
                 this.$store.dispatch("childResponse").then(() => {
                    console.log("This would be printed after dispatch!!")
                   for (var i = 0; i <= this.$store.state.child.childQuestions.length-1; i++) {
                       this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.$store.state.child.childQuestions[i]);
                       this.childs=this.$store.state.survey.questions[this.$store.state.currentQuestion].child;
                    }
                })
            }this.valid=true;
           /* var j = this.childcurrentQuestion % 10,
                k = this.childcurrentQuestion % 100;
            if (j == 1 && k != 11) {
                return this.childcurrentQuestion + "st";
            }
            if (j == 2 && k != 12) {
                return this.childcurrentQuestion + "nd";
            }
            if (j == 3 && k != 13) {
                return this.childcurrentQuestion + "rd";
            }
            return this.childcurrentQuestion + "th";
            console.log(this.childcurrentQuestion)*/
        },
        computed:{
            ...mapState({
                childResponses: state => state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses,
                questionId: state => state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].questionId,
                childValidForm: state => state.survey.questions[state.currentQuestion].childValidForm
            })
           },mounted(){
           }, methods: {
            updateResponses(e){
                this.valid = true;  console.log(this.valid);
                this.$store.commit('childValidForm', this.valid)
                this.$store.commit('updateChildResponses', e.target.value)
                //console.log(this.$store.state.childs[this.childcurrentQuestion].childResponses );
                if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].nextChild=='secondChild') {
                    if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'Yes') {
                        console.log('vvvv');
                    }else{
                        console.log('else'); //this.store.state.auth.loginDialog = true;
                    }
                }else{
                    console.log('ssss');
                }this.selectinput=false;
                try {
                    const serializedState = JSON.stringify(this.$store.state);
                    localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('child',this.childcurrentQuestion);
                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
            },getUserInput (e) {
                this.event = e;this.valid = true; //console.log(this.event.path);
                //this.$store.commit('validForm', this.valid)
                try {
                    const serializedState = JSON.stringify(this.$store.state);
                    localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('child',this.childcurrentQuestion);
                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
             },getDate(e){
                //val && this.$nextTick(() => (this.$refs.form.picker.activePicker = 'YEAR'))
                this.event = e;this.valid = true; //console.log(this.event.path);
               // this.$store.commit('validForm', this.valid)
                try {
                    const serializedState = JSON.stringify(this.$store.state);
                    localStorage.setItem('quiz', serializedState);
                    localStorage.setItem('child',this.childcurrentQuestion);
                } catch (err) {
                    console.error(`Something went wrong: ${err}`);
                }
            },
            loadData()
              {
                this.$http.get('quiz.json')
                    .then(result => {
                        this.childQuiz = result.data.childQuestions;
                        console.log( this.childQuiz)
                        for (var i = 0; i <= this.childQuiz.length-1; i++) {
                            this.$store.state.survey.questions[this.$store.state.currentQuestion].child.push(this.childQuiz[i]);
                            this.childs=this.$store.state.survey.questions[this.$store.state.currentQuestion].child;
                        }
                    })
            },
            next(){  console.log('wwwwww'); //console.log(this.$refs.form)
                if (this.$refs.form.validate()) {  console.log('sss');
                    this.$store.commit("childQuestionIndex", this.childcurrentQuestion)
                    this.$store.state.childQuestionIndex = this.childcurrentQuestion;
                    this.id = this.childcurrentQuestion + this.$store.state.currentQuestion + 1;
                    this.$store.commit('questionId', this.id)
                    if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].nextChild == 'secondChild') {
                        if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'Yes') {
                            this.loadData();
                            this.childcurrentQuestion++;
                            console.log('copy');
                        }else if (this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].childResponses === 'No'){
                            console.log('Islogin');
                            this.Islogin = true;
                            this.selectinput=false;
                            this.store.state.auth.loginDialog = true;
                            //this.childcurrentQuestion=this.$store.state.childQuestion;
                        }else if(this.$store.state.survey.questions[this.$store.state.currentQuestion].child[this.childcurrentQuestion].valid!==true) {
                            console.log('sss');
                            this.selectinput=true;
                        }
                    }else{
                        console.log('childcurrentquestion');
                        this.childcurrentQuestion++;
                    }
                   /* if (this.childcurrentQuestion == 0)
                    {
                        this.childIndex=this.childcurrentQuestion+1;
                    }else{
                        if (this.childcurrentQuestion == 2)
                        {
                            this.childIndex=this.childcurrentQuestion;
                        }else{
                            this.childIndex=this.childcurrentQuestion-1;
                        }

                    }*/

                    //this.$store.state.child = [];
                    try {
                        const serializedState = JSON.stringify(this.store.state);
                        localStorage.setItem('quiz', serializedState);
                      localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
                    } catch (err) {
                        console.error(`Something went wrong: ${err}`);
                    }
                }
            },
            prev(){
                if (this.childcurrentQuestion == 0) {
                    this.store.state.IsloginComponents=true;
                    this.store.state.showsubchild=false;
                    console.log(this.store.state.IsloginComponents)
                    console.log('showPerent');
                } else {
                  /*  if(this.Islogin=true)
                    {this.Islogin=false;}*/
                    this.childcurrentQuestion--;console.log('ssss');
                    this.$store.commit('childQuestionIndex', this.childcurrentQuestion)
                    localStorage.setItem('child', JSON.stringify(this.childcurrentQuestion));
                }
                this.selectinput=false;
                this.valid = true;
            }
        }
    }
</script>

<style scoped>

</style>