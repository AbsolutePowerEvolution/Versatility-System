<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use Auth;
use App\Affair\Property;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PropertyController extends Controller
{
    /**
     * Display a listing of the normal property.
     *
     * @return Json
     */
    public function index()
    {
        // get property list
        $property_list = Property::with(['category', 'status'])
            ->where('category', Category::getCategoryId('property', 'others'))
            ->get();

        return response()->json($property_list);
    }

    /**
     * Display the specified property.
     *
     * @param  int $id
     * @return Json
     */
    public function show($id)
    {
        // get property detail
        $property_detail = Property::with(['category', 'status'])
            ->where('category', Category::getCategoryId('property', 'others'))
            ->find($id);

        return response()->json($property_detail);
    }

    /**
     * Display a listing of the normal classroom.
     *
     * @return
     */
    public function indexClassroom()
    {
        $classroom_list = Property::with([
                'category',
                'status',
                'loanClassroom'
            ])
            ->where('category', Category::getCategoryId('property', 'classroom'))
            ->get();

        return response()->json($classroom_list);
    }
}
