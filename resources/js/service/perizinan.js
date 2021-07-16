import api from './api';

export const approvalPerizinan = (props) => {
    api().put('api/perizinan/approval', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/data-izin-pulang')
        }
        else{
            alert(response.data.msg)
        }
    })
}

export const approvalPerizinanKembali = (props) => {
    api().put('api/perizinan/approval/kembali', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/data-izin-kembali')
        }
        else{
            alert(response.data.msg)
        }
    })
}

export const izinKembaliPerizinan = (props) => {
    console.log(props)
    api().put('api/perizinan/izinKembali', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.assign('/#/riwayat-perizinan')
        }
        else{
            alert(response.data.msg)
        }
    })
}

export const kembali = (props) => {
    api().put('api/kembali', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.msg)
            window.location.reload()
        }
        else{
            alert(response.data.msg)
        }
    })

}