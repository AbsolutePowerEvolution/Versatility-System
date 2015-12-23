<?php

namespace Tests\Api\User\Property;

class PermissionTest extends PropertyTest
{
    /** @test */
    public function visit_classroom_with_not_sign_in()
    {
        $this->call('GET', '/classrooms');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function visit_others_with_not_sign_in()
    {
        $this->call('GET', '/others');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function visit_others_show_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->call('GET', "/others/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function visit_others_classroom_show_with_not_sign_in()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->call('GET', "/others/{$propertyId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('GET', '/others/forbidden_first');
        $this->assertResponseForbidden();
    }
}
