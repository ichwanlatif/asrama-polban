import api from './api';


export const createPerizinan = (props) => {
    // console.log(props);
    api().post('api/perizinan/create', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/riwayatperizinan')
        }
        else{
            alert(response.data.msg)
        }
    })
}

export const updatePerizinan = (props) => {
    api().put('api/perizinan/approval', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/dataperizinan')
        }
        else{
            alert(response.data.msg)
        }
    })
}