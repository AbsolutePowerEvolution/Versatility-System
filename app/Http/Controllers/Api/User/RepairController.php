<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Repair;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    /**
     * get property repair list
     *
     * @param int page
     * @param int length (not required)
     * @return response repair list
     */
    public function getPropertyRepairList(Request $request)
    {
        // get length
        $length = ($request->has('length'))? $request->input('length'):10;

        // query
        $repair_list = Repair::with([
            'property' => function($query){
                $query->get(['name']);
            },
        ])
        ->where('user_id', '=', Auth::user()->id)
        ->paginate($length, [
            'id',
            'user_id',
            'property_id',
            'type',
            'remark',
            'status',
            'created_at'
        ]);

        // response
        $response = [
            'data'        => $repair_list->jsonSerialize(),
            'data_length' => $repair_list->perPage(),
            'last_page'   => $repair_list->lastPage(),
            'status'      => 0
        ];

        // return
        return response()->json($response);
    }

    /**
     * create property repair request
     *
     * @param
     * @return
     */
    public function postPropertyRepair(Request $request)
    {
        $response = [];

        if (
            !$request->has('id') ||     //property_id
            !$request->has('type') ||
            !$request->has('remark')
        ) {
            // create repair query
            Repair::create([
                'user_id'     => Auth::user()->id,
                'property_id' => $request->input('id'),
                'type'        => $request->input('type'),
                'remark'      => $request->input('remark'),
                'status'      => Category::getCategoryIds(['repair.status' => 'summited'])[0],
            ]);
        }

        $response['status'] = 0;

        return reponse()->json($response);
    }
}
