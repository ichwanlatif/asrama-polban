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

export const getRiwayatPresensi = () => {
    api().get('api/presensi/user/' + localStorage.getItem('user_id')).then(response =>{
        if(response.data.status === 201){
            // console.log(response.data.data)
            return response.data.data;
        }
        else{
            alert('Gagal load data');
        }
    })
}