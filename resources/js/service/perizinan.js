import api from './api';


export const kembali = (props) => {
    api().put('api/kembali', props).then(response => {
        if(response.data.status === 'success'){
            console.log(response.data.message)
            window.location.reload()
        }
        else{
            alert(response.data.message)
        }
    })

}