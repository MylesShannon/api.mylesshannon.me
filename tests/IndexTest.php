<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class IndexTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testRootApiRoute()
    {
      // should see a string of 'API is available' and a HTTP status of 200
        $this->visit('/')
             ->see('API is available');
    }
}
