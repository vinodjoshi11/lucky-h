<template>
    <v-layout row justify-center>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn color="primary" dark slot="activator">login</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" value="Input text" class="input-group--focused"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="lock"  name="password" v-model="pass" label="Password" value="Input text" type="password" class="input-group--focused"></v-text-field>
                                </v-flex>
                            </v-layout>

                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="success darken-1" flat @click.native="dialog = false">Next</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>

</template>

<script>

    export default {
        data: () => ({
            date: null,email: 'vinod.joshi@surmountsoft.com',
            pass: '1234',
            menu: false,dialog: false
        }),
        watch: {
            menu (val) {
                val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        methods: {
            save (date) {
                this.$refs.menu.save(date)
            },
            login () {
                auth.login(this.email, this.pass, (loggedIn, err) => {
                    if (err) {
                        console.log('login', err)
                        this.error = true
                        this.text = err
                    } else if (loggedIn === false) {
                        console.log('login', loggedIn)
                        this.error = true
                        this.text = 'Bad login information'
                    } else {
                        console.log(this.$route)
                        this.$router.push(this.$route.query.redirect || '/')
                    }
                })
            }
        }
    }
</script>