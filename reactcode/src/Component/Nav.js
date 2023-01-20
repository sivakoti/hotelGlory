import React from 'react'

function Nav() {
    const currentuser = JSON.parse(localStorage.getItem('user'));
    function logout(){
        localStorage.removeItem('user');       
        window.location.href="/";
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <b><a class="navbar-brand" href="/home" style={{color:'white'}}>Hotel Glory</a></b>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav" >
                        {currentuser ? (<div class="btn-group">
                            <button type="button" class="btn btn-Success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentuser.username}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/mybooking">My Bookings</a></li>
                                <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                            </ul>
                        </div>) : (<h1></h1>)};
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav