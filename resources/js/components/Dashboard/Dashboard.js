import React from 'react'

function Dashboard(){
    console.log(localStorage.getItem('user_id'));
    console.log(localStorage.getItem('user_role'));
    return (
        <h1>Hallo Dashboard</h1>
    )
}

export default Dashboard;