<template>
<v-layout row justify-center>
<v-dialog v-model="store.state.auth.loginDialog" persistent max-width="500px">
<v-card>
        <v-tabs icons-and-text centered dark color="cyan">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab href="#tab-1">
                Register<v-icon>account_box</v-icon>
            </v-tab>
            <v-tab href="#tab-2">
                Login <v-icon>account_box</v-icon>
            </v-tab>
            <v-tab-item  id="tab-1"  >
                <v-card flat>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-form v-model="valid" ref="form" lazy-validation>
                                        <v-text-field label="Name" v-model="user.username" :rules="nameRules" :counter="10"
                                                      required ></v-text-field>
                                        <v-text-field label="E-mail" v-model="user.email" :rules="emailRules"
                                                      required ></v-text-field>
                                        <v-text-field name="password"
                                                      v-model="user.password" label="Password" value="Input text"
                                                      type="password"
                                                      :rules="passwordRules"></v-text-field>
                                        <v-btn @click.prevent="register(user)"  >
                                            register
                                        </v-btn>
                                        <v-btn   v-on:click="clear">clear</v-btn>

                                    </v-form>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item  id="tab-2"  >
                <v-card flat>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap><v-flex xs12 sm12 md12>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <v-text-field label="E-mail" v-model="login.email" :rules="emailRules"
                                                  required ></v-text-field>
                                    <v-text-field name="password"
                                                  v-model="login.password" label="Password" value="Input text"
                                                  type="password"
                                                  :rules="passwordRules"></v-text-field>
                                    <v-btn @click.prevent="loginUser(user)" :disabled="!valid" >
                                        Login
                                    </v-btn>
                                    <v-btn @click="clear">clear</v-btn>
                                </v-form>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
</v-card>
</v-dialog>
</v-layout>

</template>

<script>
import Auth from '../../services/Auth';
import store from '../../utils/store'
import {mapActions,mapState} from 'vuex';
export default {
    data: () => ({
        valid: false,store:store,
        login:{
            email: '',
            password:''
        },user:{
            username: '',
            email: '',
            password:''
        },
        nameRules: [
            (v) => !!v || 'Name is required',
            (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        passwordRules:
             [
                v => !!v || 'Password is required',
               (v) => v && v.length >= 8 || 'Password must be grater than 8 characters'
            ],
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        checkbox: false,
    }), computed: {
        ...mapState({
            setUsers: state => state.users.users
        })
    },created() {

    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        /*register (user) {
            if (this.$refs.form.validate()) {
                this.$store.commit('setUsers', this.user)
                 Auth.register(user)
                   .then((data) => this.login({username: user.username, password: user.password}))
                  .then(() => this.$router.push({path: '/'}))
                 .catch((error) =>({message: error.data, type: 'warning'}))
             }*///this.dialog = false;
            register (user) {
                if (this.$refs.form.validate()) {
                    this.$store.commit('setUsers', this.user)
                    Auth.register(user)
                        .then((data) => this.login({username: user.username, password: user.password}))
                        //.then(() => this.$router.push({path: '/'}))
                        .catch((error) => ({message: error.data, type: 'warning'}))
                    console.log(user);
                }
        },loginUser (user) { this.$router.push({path: '/BeneficiariesSuccessors'})
            this.$store.state.currentQuestion=0;
            this.$store.state.prevQuestion=0;
            this.$store.state.nextQuestion=0;
                 /*this.login(user)
                    .then(() => ({message: 'Logged In', type: 'success'}))
                    .then(() => this.$router.push({path: '/BeneficiariesSuccessors'}))
                    .catch((error) => ({message: error.data, type: 'warning'}));*/

        },
        submit () {
            if (this.$refs.form.validate()) {
                axios.post('/api/submit', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
            }
        },
        clear () {
            this.$refs.form.reset()
            this.store.state.auth.loginDialog= false;
            //console.log(this.Islogin);
            //console.log(this.dialog);
        }
    }
}
</script>
<style scoped>

</style>