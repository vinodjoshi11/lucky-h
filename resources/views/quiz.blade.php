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
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"> 

     <link href="{{ asset('css/quiz.css') }}" rel="stylesheet">
    <style>
    .justify-center{    display: flex;
    justify-content: center;}
    .logincenter{    max-width: 55%;
        margin: auto;} .logincenter .md-card{ overflow: inherit;}
    
  </style>
  <script>
      window.Laravel = <?php echo json_encode([
          'csrfToken' => csrf_token(),
      ]); ?>
  </script>
</head>
<body> 
<main >
    <div id="app">
     
    </div>   
  </main> 
   <!-- Scripts -->  
    <script src="{{ asset('js/app.js?ver=20') }}"></script>
        <script src="{{ asset('js/service-worker-prod.js') }}"></script>

</body>
</html>
