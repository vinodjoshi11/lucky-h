<template>
  <v-app id="app"> 
     
    <template v-if="loggedIn"> 
      <v-toolbar app dark color="cyan">
          <v-toolbar-title>Quiz</v-toolbar-title>
          <v-spacer></v-spacer> 
           <v-toolbar-items dark color="cyan"class="hidden-sm-and-down">
            <v-btn flat v-for="item in Menus" :key="item.title" value="true" :to="item.link"  router> 
              <v-list-tile-title v-text="item.title"></v-list-tile-title></v-btn> 
          </v-toolbar-items>
       <v-list class="pa-0  cyan" dark style="max-width: 15%;">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar dark color="cyan">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> </v-list-tile-title>
            </v-list-tile-content>
            <v-menu bottom left offset-y origin="bottom right" transition="v-slide-y-transition">
              <v-btn icon light slot="activator">
                <v-icon class="whitefont">more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="item in userMenus" :key="item.title" value="true" :to="item.link" router>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
        </v-list> 
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex row>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app dark class="cyan" color="cyan">
        <v-flex xs12 style="text-align: center;"><span>&copy; Surmountsoft 2018 Quiz </span>
        </v-flex>
      </v-footer>
    </template>

  </v-app>

</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        dialogText: '',
        dialogTitle: '',
        loggedIn: true,
        isRootComponent: true,
        // clipped: false,
        drawer: true,
        fixed: false,
        Menus: [
        {
          icon: 'bubble_chart',
          title: 'vuequiz',
          vertical: 'vuequiz',
          link: '/vuequiz'
        },
        {
          icon: 'bubble_chart',
          title: 'questions',
          vertical: 'questions',
          link: '/questions'
        },
        {
          icon: 'bubble_chart',
          title: 'quiz',
          vertical: 'quiz',
          link: '/quiz'
    },{
            icon: 'bubble_chart',
            title: 'BeneficiariesSuccessors',
            vertical: 'BeneficiariesSuccessors',
            link: '/BeneficiariesSuccessors'
        },{
        icon: 'bubble_chart',
        title: 'survey',
        vertical: 'survey',
        link: '/survey'
        }],
        userMenus: [{
          icon: 'bubble_chart',
          title: 'login',
          link: '/login'
        },
        {
          icon: 'bubble_chart',
          title: 'Change Password',
          link: '/changepassword'
        }],
        miniVariant: false,
        right: true,
        menuItem: 'Orders'
      }
    },
    created() { 
       
    },
    computed: { 
      activeMenuItem: function () {
        return this.menuItem
      }
    },
    methods: {
      clickMenu: function (item) {
        this.menuItem = item.title
        this.$router.push({
          name: item.title
        })
        console.log(item.title)
      } 
    },
    mounted() {
     // this.$Progress.finish()
    }
  }
</script>
 
