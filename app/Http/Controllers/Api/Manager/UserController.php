<?php

namespace App\Http\Controllers\Api\Manager;

use DB;
use Excel;
use App\Affair\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? $request->input('length') : 10;

        // get user list
        $user_list = DB::table('users')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', $request->input('role', 'manager'))
            ->paginate($length);

        return response()->json($user_list);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $user = new User;

        $user->username = $request->input('username');
        $user->password = bcrypt($request->input('password'));
        $user->nickname = $request->input('nickname');
        $user->email    = $request->input('email');
        $user->phone    = $request->input('phone');
        $user->group    = $request->input('group', 'other');
        $user->save();

        $user->role()->save(Role::where('name', $request->input('role')));

        return response()->json(['status' => 0]);
    }

    /**
     * Import students account data with excel
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function import(Request $request)
    {
        // get tmp xlsx file path
        $file_path = $request->file('studentData')->getRealPath();

        // extract student data from the file uploaded
        $student_data = Excel::load($file_path)->toArray();

        // processing & storing student data
        foreach($student_data as $data) {
            $user = new User;
            $user->username = $data['學號'];
            $user->password = str_random(96);
            $user->nickname = $data['姓名'];
            $user->email    = $data['信箱'];
            $user->phone    = $data['電話'];
            $user->group    = $data['班級'];
            $user->save();

            $user->role()->save(Role::where('name', 'student')->first());
        }

        return response()->json(['status' => 0]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user  = User::find($id);
        $user_data = array_merge($user, $user->roles()->first());

        return response()->json($user_data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //public function edit($id)
    //{
    //    //
    //}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $affect_row = User::where('id', '=', $id)->update([
            'role' => $request->input('role'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'nickname' => $request->input('nickname'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'group' => $request->input('group'),
        ]);

        return response()->json(['status' => ($affect_row == 1) ? 0 : 2]);
    }

    /**
     * Remove the specified resource from storage.
         *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $result = User::whereIn('username', $request->input('usernames'))
            ->delete();

        return response()->json(['status' => ($result ? 0 : 2)]);
    }
}
