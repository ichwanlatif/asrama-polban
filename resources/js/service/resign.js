import api from "./api"



export const createResign = (props) => {
    api().post('api/resign/create', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/riwayat-perizinan')
        }
        else{
            alert(response.data.msg)
        }
    })
}