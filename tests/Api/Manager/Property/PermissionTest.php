<?php

namespace Tests\Api\Manager\Property;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends PropertyTest
{
    use DatabaseTransactions;

    /** @test */
    public function create_property_with_not_sign_in()
    {
        $this->call('POST', '/create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_property_with_normal_user()
    {
        $this->signIn();
        $this->call('POST', '/create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_property_with_lab_user()
    {
        $this->signInWithLab();
        $this->call('POST', '/create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_property_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_property_with_normal_user()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->signIn();
        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_property_with_lab_user()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->signInWithLab();
        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_classroom_property_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_classroom_property_with_normal_user()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->signIn();
        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_classroom_property_with_lab_user()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->signInWithLab();
        $this->call('PUT', "/update/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_property_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_property_with_normal_user()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->signIn();
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_property_with_lab_user()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->signInWithLab();
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_classroom_property_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_classroom_property_with_normal_user()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->signIn();
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_classroom_property_with_lab_user()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->signInWithLab();
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('PUT', '/update/forbidden_first');
        $this->assertResponseForbidden();

        $this->call('DELETE', '/delete/forbidden_first');
        $this->assertResponseForbidden();
    }
}
