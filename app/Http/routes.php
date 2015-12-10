<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/** @var Router $router */

use Illuminate\Routing\Router;

$router->get('/', ['as' => 'home', 'uses' => 'HomeController@home']);

$router->group(['prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
    $router->group(['prefix' => 'auth', 'as' => 'api.auth.'], function (Router $router) {
        $router->get('oauth', ['as' => 'oauth', 'uses' => 'OAuthController@OAuth']);
        $router->get('oauth/{verify}', ['as' => 'oauth.verify', 'uses' => 'OAuthController@verifyToken']);
    });

    $router->group(['prefix' => 'user', 'as' => 'api.user'], function(Router $router){
        $router->get('propertyList', ['as' => 'getPropertyList', 'uses' => 'User\PropertyController@getPropertyList']);
        $router->get('property/{property_id}', ['as' => 'getPropertyDetail', 'uses' => 'User\PropertyController@getPropertyDetail']);
        $router->get('repairList', ['as' => 'getPropertyRepairList', 'uses' => 'User\RepairController@getPropertyRepairList']);
    });
});
