<?php

namespace Tests\Api;

use App\Affair\Category;
use App\Affair\Property;
use App\Affair\User;
use Auth;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->ensureTestUsersCreated();
    }

    /**
     * 確保測試帳號已建立
     *
     * @return void
     */
    protected function ensureTestUsersCreated()
    {
        if (! User::where('username', 'test')->exists()) {
            factory(User::class)->create(['username' => 'test']);
        }

        if (! User::where('username', 'testLab')->exists()) {
            factory(User::class)->create(['username' => 'testLab']);
        }

        if (! User::where('username', 'testManager')->exists()) {
            factory(User::class)->create(['username' => 'testManager']);
        }
    }

    /**
     * 以一般使用者身份登入
     *
     * @param string $username
     */
    public function signIn($username = 'test')
    {
        Auth::loginUsingId(User::where('username', $username)->first()->getAttribute('id'));
    }

    /**
     * 以 lab 帳號身份登入
     *
     * @return void
     */
    public function signInWithLab()
    {
        $this->signIn('testLab');
    }

    /**
     * 以管理員帳號身份登入
     *
     * @return void
     */
    public function signInWithManager()
    {
        $this->signIn('testManager');
    }

    /**
     * 取得測試財產資料 id
     *
     * @param bool $normal
     * @param bool $classroom
     * @return int
     */
    protected function getTestPropertyId($normal = true, $classroom = false)
    {
        return factory(Property::class)->create([
            'category' => Category::getCategories('property', $classroom ? 'classroom' : 'others', true),
            'status' => Category::getCategories('property.status', $normal ? 'normal' : 'maintenance', true),
        ])->getAttribute('id');
    }

    /**
     * Get random category name.
     *
     * @param string $category
     * @return string
     */
    protected function randomCategoryName($category)
    {
        return Category::getCategories($category)->random()->getAttribute('name');
    }

    /**
     * Assert that the client response has a status code.
     *
     * @param int $status
     * @return void
     */
    public function assertResponseCode($status)
    {
        $actual = $this->response->getStatusCode();

        $this->assertEquals($status, $actual, "Expected status code {$status}, got {$actual}.");
    }

    /**
     * Assert that the client response has an 201 status code.
     *
     * @return void
     */
    public function assertResponseCreated()
    {
        $this->assertResponseCode(Response::HTTP_CREATED);
    }

    /**
     * Assert that the client response has an 403 status code.
     *
     * @return void
     */
    public function assertResponseForbidden()
    {
        $this->assertResponseCode(Response::HTTP_FORBIDDEN);
    }

    /**
     * Assert that the client response has an 404 status code.
     *
     * @return void
     */
    public function assertResponseNotFound()
    {
        $this->assertResponseCode(Response::HTTP_NOT_FOUND);
    }

    /**
     * Assert that the client response has an 409 status code.
     *
     * @return void
     */
    public function assertResponseConflict()
    {
        $this->assertResponseCode(Response::HTTP_CONFLICT);
    }

    /**
     * Assert that the client response has an 422 status code.
     *
     * @return void
     */
    public function assertResponseUnprocessableEntity()
    {
        $this->assertResponseCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
