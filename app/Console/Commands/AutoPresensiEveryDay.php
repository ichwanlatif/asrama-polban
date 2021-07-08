<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;


use Illuminate\Support\Facades\DB;
use App\Models\Presensi;
use App\Models\Mahasiswa;
use App\Models\Perizinan;

class AutoPresensiEveryDay extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Day:AutoPresensi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mengisi Presensi secara auto setiap hari jika lupa';

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
            $kehadiran = Presensi::where([
            ['id_mhs', '=', $mahasiswa->id_mhs],
            ])
            ->whereDate('created_at', date("Y-m-d"))
            ->first();

            if($kehadiran == null || $kehadiran == ''){
                $perizinan = Perizinan::where('id_mhs', '=', $mahasiswa->id_mhs)
                ->whereIn('status_izin', [3, 5, 6, 7, 8])
                ->whereDate('tanggal_pulang', '>=', date("Y-m-d"))
                ->first();

                if($perizinan == null || $perizinan == ''){
                    Presensi::create([
                        'status_presensi' => 0,
                        'latitude' => "-",
                        'longitude' => "-",
                        'id_mhs' => $mahasiswa->id_mhs,
                        'suhu_badan' => 0,
                        'kondisi_kesehatan' => "-"
                    ]);
                }
                else{
                    Presensi::create([
                        'status_presensi' => 2,
                        'latitude' => "-",
                        'longitude' => "-",
                        'id_mhs' => $mahasiswa->id_mhs,
                        'suhu_badan' => 0,
                        'kondisi_kesehatan' => "-"
                    ]);
                }
            }
        }
        return "Semua Presensi Berhasil Diisi";
    }
}
