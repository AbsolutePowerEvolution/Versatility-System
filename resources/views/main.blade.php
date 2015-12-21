<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <meta id="csrf-token" name="csrf-token" content="{{ csrf_token() }}">
        <title>系務系統</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700">
        <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanstc.css">
        <link rel="stylesheet" href="{{ asset('styles.css') }}">
    </head>
    <body>
        <div id="main"></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.4/js/materialize.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.js" defer> </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.6/sammy.js" defer></script>
        <script src="{{ asset('vendors.js') }}" defer></script>
        <script src="{{ asset('bundle.js') }}" defer></script>
    </body>
</html>
