<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\PerizinanController;
use App\Http\Controllers\ResignController;

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
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/mahasiswaByUser/{id}', [MahasiswaController::class, 'getMahasiswaByUserId']);
Route::group(['middleware' => ['auth:sanctum']], function() {
    // manggil controller sesuai bawaan laravel 8
    Route::post('logout', [AuthController::class, 'logout']);
    // manggil controller dengan mengubah namespace di RouteServiceProvider.php biar bisa kayak versi2 sebelumnya
    Route::post('logoutall', [AuthController::class, 'logoutall']);

    //Mahasiswa
    Route::get('/mahasiswa', [MahasiswaController::class, 'getAllMahasiswa']);
    Route::post('/mahasiswa/store', [MahasiswaController::class, 'store']);
    Route::put('/mahasiswa/update', [MahasiswaController::class, 'update']);
    Route::post('/mahasiswa/delete', [MahasiswaController::class, 'delete']);
    Route::post('/mahasiswa/import', [UserController::class, 'importUser']);
    Route::get('/prodi', [MahasiswaController::class, 'getAllProdi']);
    Route::get('/kamar', [MahasiswaController::class, 'getAllKamar']);
    Route::get('/mahasiswa/{id}', [MahasiswaController::class, 'getMahasiswaById']);

    //Presensi
    Route::post('/presensi/create', [PresensiController::class, 'store']);
    Route::get('/presensi/user/{id}', [PresensiController::class, 'getKehadiranByUser']);
    Route::get('/presensi/kehadiranToday/{id}', [PresensiController::class, 'checkKehadiranToday']);
    Route::get('/presensi/kehadiranToday', [PresensiController::class, 'getPresensiToday']);
    Route::get('/presensi/getRekapitulasiById/{id}', [PresensiController::class, 'getRekapitulasiById']);
    Route::get('/presensi/dashboard', [PresensiController::class, 'dashboard']);
    Route::get('/presensi/getRekapitulasi/{date_from}/{date_to}', [PresensiController::class, 'getRekapitulasi']);

    //Perizinan
    Route::post('/perizinan/create', [PerizinanController::class, 'store']);
    Route::put('/perizinan/izinKembali', [PerizinanController::class, 'izinKembali']);
    Route::get('/perizinan/checkPerizinan/{id}', [PerizinanController::class, 'checkPerizinanToPresensi']);
    Route::put('/perizinan/approval', [PerizinanController::class, 'approvalPerizinan']);
    Route::put('/perizinan/approval/kembali', [PerizinanController::class, 'approvalPerizinanKembali']);
    Route::get('/perizinan/{role}', [PerizinanController::class, 'getAllPengajuanPerizinan']);
    Route::get('/perizinan/riwayatperizinan/{id}', [PerizinanController::class, 'getRiwayatPerizinan']);
    Route::get('/perizinan/detail/{id}', [PerizinanController::class, 'getDetailPerizinan']);
    Route::get('/perizinan/kembali/{role}', [PerizinanController::class, 'getAllPengajuanPerizinanKembali']);
    Route::get('/perizinan/dashboard/{role}', [PerizinanController::class, 'dashboard']);
    Route::put('/kembali', [PerizinanController::class, 'kembali']);

    //Resign
    Route::post('/resign/create', [ResignController::class, 'store']);
    Route::get('/resign/riwayatresign/{id}', [ResignController::class, 'getRiwayatResign']);
    Route::get('/resign/{role}', [ResignController::class, 'getAllResign']);
    Route::put('/resign/approval', [ResignController::class, 'approveResign']);
    Route::get('/resign/detail/{id}', [ResignController::class, 'getDetailResign']);

});