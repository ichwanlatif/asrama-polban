<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengajuan Perizinan Asrama</title>
</head>
<body>
    <h1>PENGAJUAN RESIGN ASRAMA</h1>
    <h4>{{$details['from']}}, mengajukan resign pada:</h4>
    <p>Tanggal: {{$details['tanggal_resign']}}</p>
    <p>Alasan: {{$details['keterangan_resign']}}</p>
    <p>Suhu Badan: {{$details['suhu_badan']}} °C</p>
    <p>Kondisi Badan: {{$details['kondisi_kesehatan']}}</p>
    <p>Kendaraan digunakan: {{$details['jenis_kendaraan']}}</p>
    <br>
    <p>Segera Approve dengan mengklik <a href="{{$details['link']}}">link ini.</a></p>

</body>
</html>