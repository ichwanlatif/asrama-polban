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

export const approve = (props) => {
    api().put('api/resign/approval', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/data-resign')
        }
        else{
            alert(response.data.msg)
        }
    })
}