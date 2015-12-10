<?php

namespace App\Affair;

use App\Affair\Core\Entity;

class Category extends Entity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['category', 'name'];

    /**
     * get CategoryIds with provided data
     *
     * @param
     * @return
     */
    public static function getCategoryIds($datas)
    {
        $query = self::where('id', '=', -1);

        foreach ($datas as $category => $data) {
            $query->orWhere(function ($query) use ($category, $data) {
                $query->where('category', '=', $category);

                if (is_array($data)) {
                    $query->where(function ($query) use ($data) {
                        $query->where('id', '=', -1);
                        foreach ($data as $name) {
                            $query->orWhere('name', '=', $name);
                        }
                    });
                } else {
                    $query->where('name', '=', $data);
                }
            });
        }

        $ids = [];

        foreach ($query->get(['id']) as $model) {
            array_push($ids, $model->id);
        }

        return $ids;
    }
}
