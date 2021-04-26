import api from './api';


export const createPresensi = (props) => {
    api().post('api/kehadiran/create', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
        }
        else{
            alert("Gagal Absensi");
            window.location.assign('/#/formpresensi')
        }
    })
}