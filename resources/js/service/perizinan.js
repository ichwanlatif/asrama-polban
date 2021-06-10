import api from './api';


export const createPresensi = (props) => {
    api().post('api/presensi/create', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/riwayatpresensi')
        }
        else{
            alert("Gagal Absensi")
        }
    })
}