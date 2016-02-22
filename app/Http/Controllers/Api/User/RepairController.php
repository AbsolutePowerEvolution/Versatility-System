<?php

namespace App\Http\Controllers\Api\User;

use Auth;
use App\Affair\Repair;
use App\Affair\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    /**
     * Display a listing of the repair request.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? ($request->input('length')) : 10;

        $repair_list = Repair::with([
                'type',
                'status',
            ])
            ->where('user_id', Auth::user()->id)
            ->paginate($length);

        return response()->json($repair_list);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // To avoid user to request for repair two or more times.
        Repair::create(array_merge(array_only($request->all(), [
                'title',
                'remark',
            ]), [
                'user_id' => Auth::user()->id,
                'type' => Category::getCategoryId('repair.type', $request->input('type')),
                'status' => Category::getCategoryId('repair.status', 'submitted'),
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $repair = Repair::where('user_id', Auth::user()->id)->find($id);

        if ($repair === null) {
            return response()->json(['status' => 2]);
        }

        $repair->status = Category::getCategoryId('repair.status', 'canceled');
        $result = $repair->save();

        return response()->json(['status' => ($result === true) ? 0 : 2]);
    }
}
