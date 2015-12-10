<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Property;
use App\Affair\Loan;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * get property list with page & category
     *
     * @param Request $request
     *  @param int page
     *  @param int category
     *  @param int length
     * @return JSON-array $property_list
     */
    public function getPropertyList(Request $request)
    {
        // get length
        $length = ($request->has('length'))? $request->input('length'):10;

        // get query
        $property_query = new Property;

        // where category if provided
        if ($request->has('category')) {
            $property_query = Property::where('category', '=', $request->input('category'));
        }

        // get data with query
        $property_list = $property_query->paginate($length, [
            'id',
            'name',
            'status',
            'code',
            'category'
        ]);

        $response = [
            'data'        => $property_list->jsonSerialize(),
            'data_length' => $property_list->perPage(),
            'last_page'   => $property_list->lastPage(),
            'status'      => 0
        ];

        // return data
        return response()->json($response);
    }

    /**
     * get property detail with property_id
     *
     * @param int property_id
     * @return mixed all of property data
     */
    public function getPropertyDetail($property_id)
    {
        // get property detail
        $property_detail = Property::find($property_id);

        // gen response
        $response = [
            'data' => $property_detail,
            'status' => ($property_detail === null)? 2:0
        ];

        // return
        return response()->json($response);
    }

    /**
     * get user's property borrow log
     *
     * @param Request request
     *  @param int page
     *  @param int length
     * @return mixed all of borrow
     */
    public function getPropertyBorrowList(Request $request)
    {
        // get length
        $length = ($request->has('length'))? $request->input('length'):10;

        // get borrow list
        $borrow_list = Loan::with([
            'property' => function ($query) {
                $query->get([
                    'id',
                    'name',
                    'code'
                ]);
            },
            'status' => function ($query) {
                $query->get([
                    'id',
                    'name'
                ]);
            }
        ])
        ->where('user_id', '=', Auth::user()->id)
        ->orderBy('status', 'asc')
        ->paginate($length, [
            'id',
            'property_id',
            'user_id',
            'status',
        ]);

        // response
        $response = [
            'data'        => $borrow_list->jsonSerialize(),
            'data_length' => $borrow_list->perPage(),
            'last_page'   => $borrow_list->lastPage(),
            'status'      => 0
        ];

        // return
        return response()->json($response);
    }
}
