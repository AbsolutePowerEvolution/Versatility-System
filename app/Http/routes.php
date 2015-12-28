<?php

/** @var Router $router */

use Illuminate\Routing\Router;

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$router->group(['middleware' => ['web', 'header']], function (Router $router) {
    $router->get('/', ['as' => 'home', 'uses' => 'HomeController@home']);
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

$router->group(['middleware' => ['web'], 'prefix' => 'api', 'namespace' => 'Api'], function (Router $router) {
    $router->group(['prefix' => 'auth', 'as' => 'api.auth.'], function (Router $router) {
        $router->get('oauth', ['as' => 'oauth', 'uses' => 'OAuthController@OAuth']);
        $router->get('oauth/{verify}', ['as' => 'oauth.verify', 'uses' => 'OAuthController@verifyToken']);
    });

    $router->group(['middleware' => ['user'], 'prefix' => 'user'], function (Router $router) {
        $router->get('login', 'User\UserAuthController@login');

        $router->group(['prefix' => 'property'], function (Router $router) {
            $router->get('others', ['as' => 'api.user.other.list', 'uses' => 'User\PropertyController@index']);
            $router->get('classrooms', ['as' => 'api.user.class.list', 'uses' => 'User\PropertyController@indexClassroom']);
            $router->get('others/{id}', ['as' => 'api.user.other.detail', 'uses' => 'User\PropertyController@show']);
        });

        $router->group(['prefix' => 'repair'], function (Router $router) {
            $router->get('/', ['as' => 'api.user.repair.list', 'uses' => 'User\RepairController@index']);
            $router->post('create', ['as' => 'api.user.repair.create', 'uses' => 'User\RepairController@store']);
            $router->delete('delete/{id}', ['as' => 'api.user.repair.delete', 'uses' => 'User\RepairController@destroy']);
        });

        $router->group(['middleware' => ['manager'], 'prefix' => 'loan'], function (Router $router) {
            $router->get('others', ['as' => 'api.user.loan.other.list', 'uses' => 'User\LoanController@index']);
            $router->get('classrooms', ['as' => 'api.user.loan.class.list', 'uses' => 'User\LoanController@indexClassroomBorrow']);
            $router->post('create', ['as' => 'api.user.loan.class.create', 'uses' => 'User\LoanController@storeClassroomBorrow']);
            $router->delete('delete/{id}', ['as' => 'api.user.loan.class.delete', 'uses' => 'User\LoanController@destroyClassroomBorrow']);
        });
    });

    $router->group(['prefix' => 'manager'], function (Router $router) {
        $router->get('login', 'Manager\ManagerAuthController@login');

        $router->group(['prefix' => 'property'], function (Router $router) {
            $router->get('others', ['as' => 'api.man.other.list', 'uses' => 'Manager\PropertyController@index']);
            $router->get('classrooms', ['as' => 'api.man.class.list', 'uses' => 'Manager\PropertyController@indexClassroom']);
            $router->get('others/{id}', ['as' => 'api.man.other.detail', 'uses' => 'Manager\PropertyController@show']);
            $router->post('create', ['as' => 'api.man.pro.create', 'uses' => 'Manager\PropertyController@store']);
            $router->put('update/{id}', ['as' => 'api.man.pro.update', 'uses' => 'Manager\PropertyController@update']);
            $router->delete('delete/{id}', ['as' => 'api.man.pro.delete', 'uses' => 'Manager\PropertyController@destroy']);
        });

        $router->group(['prefix' => 'repair'], function (Router $router) {
            $router->get('/', ['as' => 'api.man.repair.list', 'uses' => 'Manager\RepairController@index']);
            $router->put('/', ['as' => 'api.man.repair.update', 'uses' => 'Manager\RepairController@update']);
        });

        $router->group(['prefix' => 'loan'], function (Router $router) {
            $router->get('others', ['as' => 'api.man.loan.other.list', 'uses' => 'Manager\LoanController@index']);
            $router->get('classrooms', ['as' => 'api.man.loan.class.list', 'uses' => 'Manager\LoanController@indexClassroomBorrow']);
            $router->post('other-create', ['as' => 'api.user.loan.other.create', 'uses' => 'Manager\LoanController@store']);
            $router->post('class-create', ['as' => 'api.user.loan.class.create', 'uses' => 'Manager\LoanController@storeClassroomBorrow']);
            $router->put('class-verify/{id}', ['as' => 'api.user.loan.class.verify', 'uses' => 'Manager\LoanController@update']);
            $router->put('other-restitution/{id}', ['as' => 'api.user.loan.other.resti', 'uses' => 'Manager\LoanController@update']);
        });

        $router->group(['prefix' => 'setting'], function (Router $router) {
            $router->get('/', ['as' => 'api.man.setting.get', 'uses' => 'Manager\LoanController@getClassroomBorrowInfo']);
            $router->put('/', ['as' => 'api.man.setting.set', 'uses' => 'Manager\LoanController@setClassroomBorrowInfo']);
        });

        $router->group(['prefix' => 'user'], function (Router $router) {
            $router->get('/', ['as' => 'api.man.user.list', 'uses' => 'Manager\UserController@index']);
            $router->get('/{id}', ['as' => 'api.man.user.detail', 'uses' => 'Manager\UserController@show']);
            $router->post('/', ['as' => 'api.man.user.create', 'uses' => 'Manager\UserController@create']);
            $router->put('/{id}', ['as' => 'api.man.user.update', 'uses' => 'Manager\UserController@update']);
            $router->delete('/{id}', ['as' => 'api.man.user.delete', 'uses' => 'Manager\UserController@destroy']);

        });
    });
});
