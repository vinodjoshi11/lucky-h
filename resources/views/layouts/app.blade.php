<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title> 
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
   <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
    .justify-center{    display: flex;
    justify-content: center;}
    .navbar-default { 
    margin-bottom: 0;
   }.container { 
    padding: 0;
     }.bg{background:#fff;}.primary{background-color:#2196F3 !important;border-color:#2196F3 !important;}.primary--text{color:#2196F3 !important;}.secondary{background-color:#424242 !important;border-color:#424242 !important;}.secondary--text{color:#424242 !important;}.accent{background-color:#82B1FF !important;border-color:#82B1FF !important;}.accent--text{color:#82B1FF !important;}.error{background-color:#FF5252 !important;border-color:#FF5252 !important;}.error--text{color:#FF5252 !important;}.info{background-color:#2196F3 !important;border-color:#2196F3 !important;}.info--text{color:#2196F3 !important;}.success{background-color:#4CAF50 !important;border-color:#4CAF50 !important;}.success--text{color:#4CAF50 !important;}.warning{background-color:#FFC107 !important;border-color:#FFC107 !important;}.warning--text{color:#FFC107 !important;}.application a{color: #2196F3;}
 .input-group__details:before {
    background-color: rgba(0,0,0,.42);
}.input-group__details:before {
    top: 0;
    height: 1px;
    width: 100%;
    z-index: 0;
}.input-group__details:after, .input-group__details:before {
    content: "";
    position: absolute;
    left: 0;
    -webkit-transition: .3s cubic-bezier(.4,0,.2,1);
    -o-transition: .3s cubic-bezier(.4,0,.2,1);
    transition: .3s cubic-bezier(.4,0,.2,1);
}.loginArea{width: 100%;
    justify-content: center;
    display: flex;
    padding: 60px 0;}.loginArea form{    padding: 30px 20px;}
   .input-group__input .menu{    display: inline-block;
    float: left;
    width: 100%;
    position: absolute;}.menu__content{left: 0!important;
        background: #fff;
    top: 0!important;}
    </style>
</head>
<body> 
 <div id="app">
       <div class="menu"></div>
       
 </div>  
    <!-- Scripts -->
    
    <script src="{{ asset('js/app.js') }}"></script>
    
  <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
</body>
</html>
