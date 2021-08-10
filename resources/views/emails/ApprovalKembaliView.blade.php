<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Approval Perizinan Pergi Asrama</title>
</head>
<body>
    <h1>APPROVAL PERIZINAN KEMBALI KE ASRAMA</h1>
    <h4>Perizinan Kembali pada:</h4>
    <p>Tanggal: {{$details['pengajuan_tanggal_pulang']}}</p>
    <p>Alasan: {{$details['keterangan_kembali']}}</p>
    <p>Asal: {{$details['alamat_izin']}}</p>
    <p>Suhu Badan: {{$details['suhu_badan']}} °C</p>
    <p>Kondisi Badan: {{$details['kondisi_kesehatan']}}</p>
    <p>Kendaraan digunakan: {{$details['jenis_kendaraan']}}</p>
    <br>
    <h4>TELAH DI APPROVAL</h4>

    <p>Segera lihat hasil approval dengan mengklik <a href="https://asrama-polban.herokuapp.com/#/riwayat-perizinan">link ini.</a></p>

</body>
</html>