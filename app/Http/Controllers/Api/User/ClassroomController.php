<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Property;
use App\Affair\Category;
use App\Affair\Loan;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    /**
     * get classroom list with data
     *
     * @return Response $rsponse
     *  @return array classroom data
     *  @return int status
     */
    public function getClassroomList()
    {
        // get classroom list
        $classroom_list = Property::with([
            'loans' => function ($query) {
                $query
                    ->with([
                        'type' => function ($query) {
                            $query->get(['id', 'name']);
                        }
                    ])
                    ->where('date_ended_at', '>=', date('Y-m-d', time()))
                    // what status should be selected?
                    ->whereIn('status', Category::getCategoryIds([
                        'loan.status' => [
                            'summited',
                            'processing',
                            'accepted'
                        ]
                    ]))
                    // what type should be selected?
                    ->whereIn('type', Category::getCategoryIds([
                        'loan.type' => [
                            'meeting',
                            'course',
                            'speech',
                            'interview',
                            'others'
                        ]
                    ]))
                    ->orderBy('long_term_token', 'asc')
                    ->get([
                        'id',
                        'property_id',
                        'type',
                        'date_began_at',
                        'date_ended_at',
                        'time_began_at',
                        'time_ended_at',
                        'long_term_token'
                    ]);
            },
            'status'
        ])
        ->where('category', '=', Category::getCategoryIds(['property' => 'classroom'])[0])
        ->get([
            'id',
            'name',
            'status'
        ]);

        // response
        $response = [
            'data'   => $classroom_list->jsonSerialize(),
            'status' => 0
        ];

        // return
        return response()->json($response);
    }

    /**
     * create classroom borrow request
     *
     * @param Reqeust $request
     *  @param int id (property.id)
     *  @param int type ()
     * @return Response $response
     *  @param int status
     */
    public function postClassroomBorrow(Request $request)
    {
        // parse & create classroom borrow
        if (
            !$request->has('id') ||
            !$request->has('date_began_at') ||
            !$request->has('date_ended_at') ||
            !(
                $request->has('type') &&
                // check is type in the loan.types
                in_array($request->input('type', Category::getCategoryIds([
                    'loan.types' => []
                ])))
            )
        ) {
            Loan::create([
                'user_id'          => Auth::user()->id,
                'property_id'      => $request->input('id'),
                'type'             => $request->input('type'),
                'date_began_at'    => $request->input('date_began_at'),
                'date_ended_at'    => $request->input('date_ended_at'),
                'status'           => Category::getCategoryIds(['loan.status' => 'submitted'])[0],

                // choosable feild
                'time_began_at'    => $request->input('time_began_at'),
                'time_ended_at'    => $request->input('time_ended_at'),
                'long_term_token'  => $request->input('long_term_token')
            ]);
        }

        // gen response
        $response = [
            'status' => 0
        ];

        // return
        return response()->json($response);
    }

    /**
     * get classroom borrow list
     *
     * @param Request $request
     * @return Json $response
     *  @return mixed $borrow_list
     *  @return int $status
     */
    public function getClassroomBorrowList(Request $request)
    {
        // get length
        $length = ($request->has('length'))? $request->input('length'):10;

        // get borrow list
        $borrow_list = Loan::with([
            'property',
            'type',
            'status'
        ])
        ->where('user_id', '=', Auth::user()->id)
        // please tell me how to limit the main query with relation,
        // if there is no choice without using join,
        // why can't I use Query Builder to build by query!!
        ->join('properties', function ($join) {
            $join->on('property_id', '=', 'properties.id')
                ->where('properties.category', '=', Category::getCategoryIds(['property' => 'classroom'])[0]);
        })
        ->paginate($length, [
            'loans.id',
            'loans.property_id',
            'loans.type',
            'loans.status',
            'loans.date_began_at',
            'date_ended_at',
            'time_began_at',
            'time_ended_at'
        ]);

        // gen response
        $response = [
            'data' => $borrow_list->jsonSerialize(),
            'status' => 0
        ];

        // return
        return response()->json($response);
    }

    /**
     * delete classroom borrow
     *
     * @param Request $request
     *  @param int id
     */
    public function deleteClassroomBorrow(Request $request)
    {
        $response = [];

        // check param, and return while fail.
        if (!$request->has('id')) {
            $response['status'] = 2;
            return response()->json($response);
        }

        // delete loans require
        $affected_rows = Loan::where('id', '=', $request->input('id'))
            ->where('user_id', '=', Auth::user()->id)
            ->delete();

        // gen response data
        $response['status'] = ($affected_rows==1)? 0:1;

        // return
        return response()->json($response);
    }
}
