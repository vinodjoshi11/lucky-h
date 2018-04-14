<template>
  <div class="childElements" >
      <!--<div class="flex md xs12"  v-for="(question, index) in store.state.childCreator.childsDetails"
           v-bind:id="question.id" v-if="currentQuestion === index"
           :key="index" > {{index}}
          <h5>{{question.qst}} </h5>
          <!--<div   v-for="(response,key) in question.responses">
              <h5>{{response}} </h5>
              <div v-bind:id="response.id" v-if="response.inputType == 'textBox'">
             <v-text-field v-bind:name="response.option"  v-bind:label="response.option"
                v-bind:value="response.Name"
                v-model="response.Name"
                v-on:keyup="updatechildValue(key, 'Name', $event.target.value)" required maxlength="50"></v-text-field>
              </div>
          </div>

     <v-text-field type="text" v-bind:id="index+1" v-bind:name="index" class="form-control"
                    v-bind:label="FName"
                    v-bind:value="childs[index].responses.FirstName"
                    v-model="childs[index].responses.FirstName"
                    v-on:keyup="updatechildValue(index+1, 'FirstName', $event.target.value)"
      ></v-text-field>
      <v-text-field v-bind:id="index+2" type="text" v-bind:name="index" class="form-control"
                    v-bind:label="MName"
                    v-bind:value="childs[index].responses.MiddleName"
                    v-model="childs[index].responses.MiddleName"
                    v-on:keyup="updatechildValue(index+2, 'MiddleName', $event.target.value)"
      ></v-text-field>
      <v-text-field v-bind:id="index+3" type="text" v-bind:name="index" class="form-control"
                    v-bind:label="LName"
                    v-bind:value="childs[index].responses.LastName"
                    v-model="childs[index].responses.LastName"
                    v-on:keyup="updatechildValue(index+3, 'LastName', $event.target.value)"
      ></v-text-field>
      <div class="col-md-2">
        <button v-if="index == 0" class="btn btn-success btn-sm" @click="addchild">addnext</button>
        <!--<button v-if="index > 0" class="btn btn-danger btn-sm" @click="deletechild(index);">remove
        </button>
      </div>-->

    <!--<div class="child-compact row"
         v-for="(child, index) in childs" v-if="currentQuestion===index"
         :key="index">

      <div class="radio radio-success"
           v-bind:id="index" >
        <input  type="radio" v-bind:id="'Yes'+ index"  v-bind:name="index"
                v-bind:value="childs[index].Yes"
                v-model="childs[index].Yes"
                v-bind:checked="childs[index].Yes">
        <label v-bind:for="'Yes'+ index"  >
          Yes
        </label>
      </div>
      <div class="radio radio-success"
           v-bind:id="index" >
        <input  type="radio" v-bind:id="'No'+ index"  v-bind:name="index"
                v-bind:value="childs[index].No"
                v-model="childs[index].No"
                v-bind:checked="childs[index].No">
        <label v-bind:for="'No'+ index"  >
          No
        </label>
      </div>
    </div>-->{{store.state.childCreator.project.jobs}}
          <div class="job-compact row" v-for="(job, index) in store.state.childCreator.project.jobs" :key="index">
              Here's the index {{ index }}
              <div class="col-md-6">
                  <div class="form-group">
                      <input type="text" name="store.state.childCreator.project.jobs[function][]" class="form-control"
                             value="store.state.childCreator.project.jobs[index].function"
                             v-model="store.state.childCreator.project.jobs[index].function"
                             v-on:keyup="updatechildValue(index, 'function', $event.target.value)"/>
                  </div>
              </div>
              <!--<v-text-field type="text" v-bind:id="index" v-bind:name="index" class="form-control"
                            v-bind:label="FName"
                            v-bind:value="store.state.childCreator.project.jobs[index].FirstName"
                            v-model="store.state.childCreator.project.jobs[index].FirstName"
                            v-on:keyup="updatechildValue(index, 'FirstName', $event.target.value)"
              ></v-text-field>-->

              <div class="col-md-4">
                  <div class="form-group">
                      <input type="number" name="jobs[profiles][]" class="form-control" v-model="store.state.childCreator.project.jobs[index].profiles" @change="updateJobValue(index, 'profiles', $event.target.value)"/>
                  </div>
              </div>
              <div class="col-md-2">
                  <button v-if="index == 0" class="btn btn-success btn-sm" @click="addJob">add</button>
                  <button v-if="index > 0" class="btn btn-danger btn-sm" @click="deleteJob(index);">remove</button>
              </div>
          </div>
      </div>


</template>
<script>
    import store from '../utils/createquestion'
    import {mapState} from 'vuex';
    export default {
        data () {
            return {
                store:store,childs:[],childQuestions:[],currentQuestion:0,
                value: 0,
                questions:[
                  { qst: 'Name of another child Name' },
                  { qst: 'Do you have another child?' }
                ],
                FName:'Enter your First Name',MName:'Enter your middle Name',
                LName:'Enter your last Name',dateofbirth:'Enter your date of birth',
            }
        },
        computed: {
            ...mapState({
            project: state => state.childCreator.project,
        })
       },
        created() {store.dispatch('addJob');
        console.log(store.state.childCreator.project.jobs)
            if (localStorage.getItem('child') !== 'undefined' && localStorage.getItem('child') !== null) {

            }else {

            }
           // this.childs=store.state.childCreator.childs[0];
         //   this.childQuestions=store.state.childCreator.childQuestions;
           // console.log(this.childs);
        },
        mounted () {
        },
        beforeDestroy () {
        },
        methods: {
            addchild() {
                this.$store.dispatch('addchild');
            },
            deletechild(index) {
                this.$store.dispatch('deletechild', index);
            },
            updatechildValue(childIndex, field, value) {
                 console.log(childIndex)
                 console.log(field)
                console.log(this.childs);
               // console.log(value)
                this.$store.dispatch('updatechildValue', {
                    'childIndex': childIndex,
                    'field': field,
                    'value': value
                });
            },keymonitor(event) {
                console.log(event.key);
                if (event.key == "Enter") {
                    console.log("enter key was pressed!");
                }
            }
        }
    }
</script>