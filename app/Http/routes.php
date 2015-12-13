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
        $router->get('login', 'User\UserAuthController@login');

        $router->group(['prefix' => 'property', 'as' => 'api.user.property'], function ($router) {
            $router->get('others', ['as' => 'user.othersList', 'uses' => 'User\PropertyController@index']);
            $router->get('classrooms', ['as' => 'user.classroomList', 'uses' => 'User\PropertyController@indexClassroom']);
            $router->get('others/{id}', ['as' => 'user.other', 'uses' => 'User\PropertyController@show']);
        });

        $router->group(['prefix' => 'repair', 'as' => 'api.user.repair'], function ($router) {
            $router->get('/', ['as' => 'api.user.repairList', 'uses' => 'User\RepairController@index']);
            $router->post('create', ['as' => 'api.user.repairCreate', 'uses' => 'User\RepairController@store']);
            $router->delete('delete/{id}', ['as' => 'api.user.repairDelete', 'uses' => 'User\RepairController@delete']);
        });

        $router->group(['prefix' => 'loan', 'as' => 'api.user.loan'], function ($router) {
            $router->get('others', ['as' => 'api.user.loan.otherList', 'uses' => 'User\LoanController@index']);
            $router->get('classrooms', ['as' => 'api.user.loan.classroomList', 'uses' => 'User\LoanController@indexClassroomBorrow']);
            $router->post('create', ['as' => 'api.user.loan.create', 'uses' => 'User\LoanController@storeClassroomBorrow']);
            $router->delete('delete/{id}', ['as' => 'api.user.loan.delete', 'uses' => 'User\LoanController@destroyClassroomBorrow']);
        });
    });

    $router->group(['prefix' => 'manager', 'as' => 'api.manager'], function (Router $router) {
        $router->get('login', 'Api\Manager\ManagerAuthController@login');
    });
});
