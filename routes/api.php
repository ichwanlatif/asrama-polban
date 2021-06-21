<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\PerizinanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function() {
    // manggil controller sesuai bawaan laravel 8
    Route::post('logout', [AuthController::class, 'logout']);
    // manggil controller dengan mengubah namespace di RouteServiceProvider.php biar bisa kayak versi2 sebelumnya
    Route::post('logoutall', [AuthController::class, 'logoutall']);

    // Route::prefix('user')->group(function () {
    //     Route::get('/', [UserController::class, 'index']);
    //     Route::post('/create', [UserController::class, 'create']);
    //     Route::put('/update', [UserController::class, 'update']);
    //     Route::post('/delete', [UserController::class, 'delete']);
    // });
});
//Mahasiswa
Route::get('/mahasiswaByUser/{id}', [MahasiswaController::class, 'getMahasiswaByUserId']);

//Presensi
Route::post('/presensi/create', [PresensiController::class, 'store']);
Route::get('/presensi/user/{id}', [PresensiController::class, 'getKehadiranByUser']);
Route::get('/presensi/kehadiranToday/{id}', [PresensiController::class, 'checkKehadiranToday']);

//Perizinan
Route::post('/perizinan/create', [PerizinanController::class, 'store']);
Route::get('/perizinan/checkPerizinan/{id}', [PerizinanController::class, 'checkPerizinanToPresensi']);
Route::put('/perizinan/approval', [PerizinanController::class, 'approvalPerizinan']);
Route::get('/perizinan', [PerizinanController::class, 'getAllPengajuanPerizinan']);
Route::get('/perizinan/{id}', [PerizinanController::class, 'getRiwayatPerizinan']);
Route::get('/perizinan/detail/{id}', [PerizinanController::class, 'getDetailPerizinan']);
Route::put('/kembali', [PerizinanController::class, 'kembali']);