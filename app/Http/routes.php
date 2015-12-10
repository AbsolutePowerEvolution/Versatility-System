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

    $router->group(['prefix' => 'user', 'as' => 'api.user'], function (Router $router) {
        // property
        $router->get('property', ['as' => 'user.property', 'uses' => 'User\PropertyController@getPropertyList']);
        $router->get('property/{property_id}', ['as' => 'user.property.detail', 'uses' => 'User\PropertyController@getPropertyDetail']);
        $router->get('property-borrowlist', ['as' => 'user.borrowlist', 'uses' => 'User\PropertyController@getPropertyBorrowList']);

        // repair
        $router->get('repair', ['as' => 'user.repairlist', 'uses' => 'User\RepairController@getPropertyRepairList']);
        $router->post('repair', ['as' => 'user.repair.create', 'uses' => 'User\RepairController@postPropertyRepair']);

        // classroom
        $router->get('classroom', ['as' => 'user.classroomlist', 'uses' => 'User\ClassroomController@getClassroomList']);
    });
});
