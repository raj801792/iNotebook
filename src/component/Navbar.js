import React,{useEffect} from 'react'
import { Link,useHistory,useLocation } from "react-router-dom";

const Navbar = () => {
    let history=useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    let location=useLocation();
    useEffect(()=>{
        console.log(location.pathname);
    },[location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                <i className="fa-solid fa-book-open-reader mx-2"></i>
                    <Link className="navbar-brand" href="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active":""}`}aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/About"? "active":""}`} to="About">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link role="button" className="btn btn-warning mx-1" to="/Login">Login</Link>
                        <Link role="button" className="btn btn-warning mx-1" to="/Signup">Sign up</Link>
                        </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
