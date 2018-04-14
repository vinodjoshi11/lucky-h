
<template>
<div class="page-container md-layout-column">
<div class="md-layout-item md-size-100 md-small-size-100">
  <div class="test col-md-8 col-md-offset-2"> 
  <div class="alert alert-info" >
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      <strong>Information</strong> 
      You can update your answers.
  </div>
  <div class="panel panel-default">
    <div class="panel-heading"><h2>{{ quiz.title }}</h2> </div>
      <div class="panel-body"> 
          <div  class="question-content" 
          v-for="(question, index) in quiz.questions" v-bind:id="question.id" v-if="index == questionIndex">  {{index}}
                    <h4>{{question.id}} {{ question.qst }}</h4>
                <ol> 
                  <li   v-for="response in question.responses">
                      <!--<md-field  v-bind:id="response.id" v-if="response.optionType == 'textarea'">
                        <label>{{response.option}}</label>
                        <md-input  v-model="question.userResponses"   v-bind:name="userResponses"
                        v-bind:placeholder="response.option"  v-bind:value="userResponses" md-counter="200"></md-input>
                      </md-field> -->
                      <md-field v-bind:id="response.id"  v-if="response.optionType == 'textarea'">
                        <label>{{response.option}}</label>
                        <md-textarea v-model="question.userResponses" v-on:keyup="keymonitor()" autofocus  v-bind:name="index"
                        v-bind:placeholder="response.option"  v-bind:value="question.userResponses" md-counter="200"></md-textarea>
                        </md-field>
                   <!--<div  v-bind:id="response.id" ref="radioButton"   class="onchecked" v-else >
                        <md-radio v-bind:id="'option'+ response.id" v-on:click="checkedval($event)"
                        v-bind:class="{ 'md-checked': isActive, 'text-danger': hasError }"
                        v-bind:name="index" 
                        v-bind:value="response.option" v-model="question.userResponses"
                          class="md-primary"  v-bind:checked="question.userResponses">
                      {{response.option}} </md-radio>  
                  </div>-->  
                 
                <div v-else class="radio radio-success" 
                    v-on:click="checkedval($event)"
                    v-bind:id="response.id" ref="radioButton">
                        <input type="radio" v-bind:id="'option'+ response.id"  v-bind:name="index" 
                        v-bind:value="response.option" v-model="question.userResponses"
                        v-if="question.id" 
                        v-bind:checked="question.userResponses=userAnswer">
                        <label v-bind:for="'option'+ response.id"  >
                                        {{response.option}}
                        </label>
                    </div>  
                 </li>
            save answer {{userAttemptID}} and json {{question.userResponses}} 
                <br>  <br>   
                 
                   {{question}} 
                </ol>  
                <md-button v-if="questionIndex > 0" v-on:click="prev"
                  class="md-dense md-raisedbtn md-accent"> Prev</md-button>
                <md-button v-on:click="next"  v-if="!userAttemptID==''"
                  class="md-dense md-raised  md-primary"> Next</md-button> 
        </div> 
        {{getstorageQuestions}}
    </div>          
  </div> 
</div>
</div>
</div>

</template>

<script>
import store from '../utils/store'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)   
 export default { 
        data: function () { 
            return { 
                 userAnswer:[],tokenKey:'quiz',activeuser:false,store,
                // ischecked:'',
                 getstorageQuestions:'',
                 textarea: null,nextQuestion:'',
                 storeQuestions:[],arrquestionIndex:[],arrprevstorequiz:[],
                 quiz: [],index:0,arrpreviusQuestion:[], 
                 questionIndex: 0,Attemptquestion:0, 
                 currentQuestion:0,previusQuestion:0, storageQuestionNo:0,
                 restoredoption:'', hasError: false,
                 userResponses:'',isActive: '',hasError: false, 
                 updateoption:[], userAttemptID:'', prevQuestion:0,
            }
        },
        created: function() {   
              var _this = this;  
           store.watch(   
             (state) => {     
                  console.log(state); 
                   //saveState(state);
                }
              )  
              var localstoragedata=JSON.parse(Vue.localStorage.get('quiz'));
              this.storeQuestions=localstoragedata; 
             // console.log(this.storeQuestions);
          if (this.storeQuestions !== 'undefined' && this.storeQuestions !== null)
             {     this.questionIndex= JSON.parse(Vue.localStorage.get('questionIndex'));
                   this.index= this.questionIndex;
                   console.log(this.questionIndex); 
                    this.userAnswer = this.storeQuestions[0].userResponses; 
                   // console.log(this.Attemptquestion);
                   for(let i=0; i<=this.questionIndex-1;i++)
                   {
                      console.log(this.storeQuestions[i].userResponses); 
                   }
                     //console.log(this.questionIndex); 
             }

          var quizapi='quiz.json'; 
            var app = this;
             axios.get(quizapi).then(function (resp) {
                    app.questions = resp.data;
                    app.quiz =  app.questions; 
                    //app.quiz =JSON.parse(app.questions); 
                    //console.log(app.questions); 
                }).catch(function (resp) {
                    console.log(resp); 
                }); 
            
        }, beforeCompiled() { console.log(this) },
        mounted() {
        },
        methods: { // Go to Next question
          next: function() {     
            this.previusQuestion=this.questionIndex; 
            this.Attemptquestion++;
            this.questionIndex++;
            //this.currentQuestion++;   
            this.updateoption=this.quiz.questions;    
              var data = this.updateoption.map((item,index) => { 
                    if(item.id == this.questionIndex){
                        item.useranswer = this.quiz.questions[0].userResponses;     
                      return item;   
                    }else {
                       return item;   
                    }
                  });    
              Vue.localStorage.set(this.tokenKey, JSON.stringify(data));  
             this.questionIndex=this.nextQuestion;
            /*for(var i=0; i<=this.quiz.questions[this.currentQuestion].responses.length-1; i++){  
            console.log(this.quiz.questions[this.currentQuestion].responses[i].nextquiz); 
                  if(this.quiz.questions[this.currentQuestion].responses[i].nextquiz==this.nextQuestion)
                   { // console.log(this.nextQuestion);
                      this.prevQuestion=this.nextQuestion;
                      this.questionIndex=this.nextQuestion;
                       //console.log('sssssssss '+this.questionIndex)
                   } else {
                     this.questionIndex;
                     // console.log('question No '+this.questionIndex);
                   }
                }  */ 
                console.log('vvv'+this.questionIndex)
                this.arrpreviusQuestion.push(parseInt(this.previusQuestion)); 
                Vue.localStorage.set('questionIndex', JSON.stringify(this.questionIndex));
                Vue.localStorage.set('previusQuestion', JSON.stringify(this.arrpreviusQuestion)); 
              this.currentQuestion++; 
        },
        // Get Radio button checked question value 
        checkedval: function(event) {
          // this.currentQuestion++; 
           this.userAttemptID = event.currentTarget.id;  
            this.userAnswer =  event.currentTarget.firstChild.value;
            //console.log(this.userAttemptID-1); 
            this.nextQuestion=this.quiz.questions[this.currentQuestion].responses[this.userAttemptID-1].nextquiz;
              console.log(this.nextQuestion); 
          },
          // Get textArea question value 
          keymonitor: function(event) {
              console.log(this.$children[0].$children[0].$attrs.value); 
               this.userAnswer=this.$children[0].$children[0].$attrs.value;
               console.log(this.userAnswer);
          }, 
        // Go to previous question
        prev: function() { 
          this.arrprevstorequiz=JSON.parse(Vue.localStorage.get('previusQuestion'));
           
          for(let i=0;i<=this.arrprevstorequiz.length-1; i++)
          {
              console.log('***************');   
          } 

          //var lastItem = this.arrprevstorequiz.pop();
          //console.log(lastItem);
             //this.questionIndex=this.arrprevstorequiz.pop();  
              this.questionIndex--; 
         },
         localstoragequiz:function(){
            console.log(this.storeQuestions);
          if (this.storeQuestions !== 'undefined' && this.storeQuestions !== null)
             {

             }
        } 
      }    
    }
  </script>
<style>
.page-container{ 
    min-height: 85vh;
}
</style>
