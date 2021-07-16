import api from './api';


export const getRiwayatPresensi = () => {
    api().get('api/presensi/user/' + localStorage.getItem('user_id')).then(response =>{
        if(response.data.status === 'success'){
            return response.data.data;
        }
        else{
            alert(response.data.msg);
        }
    })
}