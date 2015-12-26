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
     * get category id
     *
     * @param string category
     * @param string name
     */
    public static function getCategoryId($category, $name)
    {
        $id = self::where('category', $category)
            ->where('name', $name)
            ->first()['id'];

        return ($id != null)? $id:0;
    }

    /**
     * get CategoryIds with provided data
     *
     * @param array $datas
     * @return array $ids
     */
    public static function getCategoryIds($datas)
    {
        $query = self::where('id', '=', -1);

        foreach ($datas as $category => $data) {
            $query->orWhere(function ($query) use ($category, $data) {
                $query->where('category', '=', $category);

                if (is_array($data) && count($data) > 0) {
                    $query->where(function ($query) use ($data) {
                        $query->where('id', '=', -1);
                        foreach ($data as $name) {
                            $query->orWhere('name', '=', $name);
                        }
                    });
                } else if(!is_array($data)){
                    $query->where('name', '=', $data);
                }
            });
        }

        return $query->get()->pluck('id');
    }
}
