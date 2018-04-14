<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title> 
 
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
    .justify-center{    display: flex;
    justify-content: center;}
    .logincenter{    max-width: 55%;
        margin: auto;} .logincenter .md-card{ overflow: inherit;}
    </style>
</head>
<body> 
<main>
 <div id="app"> 

 </div>   
 
  </main>  <!-- Scripts -->
    
    <script src="{{ asset('js/app.js') }}"></script>
     
</body>
</html>
