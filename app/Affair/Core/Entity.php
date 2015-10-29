<?php

namespace App\Affair\Core;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
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
