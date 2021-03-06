<?php

namespace App\Http\Controllers\Api\Manager;

use App\Affair\Property;
use App\Affair\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the normal property.
     *
     * @param Request $request
     * @return Json
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? $request->input('length') : 10;

        // get property list
        $property_list = Property::with(['category', 'status'])
            ->where('category', Category::getCategoryId('property', 'others'))
            ->paginate($length);

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
     * @param Request $request
     * @return Json
     */
    public function indexClassroom(Request $request)
    {
        // get date
        $date = $request->input('date', date('Y-m-d', time()));

        $classroom_list = Property::with([
                'category',
                'status',
                'loanClassroom' => function ($query) use ($date) {
                    $query->where('date_ended_at', '>=', $date);
                },
            ])
            ->where('category', Category::getCategoryId('property', 'classroom'))
            ->get();

        return response()->json($classroom_list);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // get create
        Property::create(array_merge(array_only($request->all(), [
                'name',
                'code',
                'describe',
            ]), [
                'category' => Category::getCategoryId('property', $request->input('category')),
                'status' => Category::getCategoryId('property.status', 'normal'),
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update_array = array_only($request->all(), [
                'name',
                'describe',
                'status',
            ]);

        if ($update_array['status']) {
            $update_array['status'] = Category::getCategoryId('property.status', $update_array['status']);
        }

        $affect_rows = Property::where('id', '=', $id)
            ->update($update_array);

        return response()->json(['status' => ($affect_rows == 1) ? 0 : 2]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $affect_rows = Property::where('id', '=', $id)
            ->update(['status' => Category::getCategoryId('property.status', 'deleted')]);

        return response()->json(['status' => ($affect_rows == 1) ? 0 : 2]);
    }
}
