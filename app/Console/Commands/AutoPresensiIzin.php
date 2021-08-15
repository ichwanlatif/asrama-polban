<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use App\Models\Presensi;
use App\Models\Mahasiswa;
use App\Models\Perizinan;

use Carbon\Carbon;

class AutoPresensiIzin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Day:AutoIzin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mengisi Presensi secara auto setiap hari jika izin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $mahasiswas = DB::table('mahasiswa')
        ->where('status_keaktifan', '=', 1)
        ->get();
        foreach($mahasiswas as $mahasiswa){
            $perizinan = Perizinan::where('id_mhs', '=', $mahasiswa->id_mhs)
            ->whereIn('status_izin', [3, 5, 6, 7, 9])
            ->whereDate('tanggal_pulang', '>=', date("Y-m-d"))
            ->first();
            
            if($perizinan != null || $perizinan != ''){
                Presensi::create([
                    'status_presensi' => 2,
                    'latitude' => 0,
                    'longitude' => 0,
                    'id_mhs' => $mahasiswa->id_mhs,
                    'suhu_badan' => 36.2,
                    'kondisi_kesehatan' => "Tidak Ada Keterangan"
                ]);
            }
        }
        return "Semua Presensi Berhasil Diisi";
    }
}
