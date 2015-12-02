<?php

namespace App\Affair\Core;

use Eloquent;

class Entity extends Eloquent
{
    /**
     * Get the table name of this model.
     *
     * @return string
     */
    public static function getTableName()
    {
        return (new static)->getTable();
    }
}
