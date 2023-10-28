import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";

const Header = () => {
    const user = useContext(UserContext);
    const auth = localStorage.getItem('bUApp');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('bUApp');
        navigate('/login');
    }

    return(
        <div className="border-b border-gray-500 pb-2 mb-2">
            <h3 className="w-full text-center mt-2 font-semibold">Book App</h3>
            <div className="flex w-full justify-between items-center">
                <ul className="flex pl-1">
                    <li><Link to="/books" className="mx-1 underline">Books</Link></li>
                    <li><Link to="/about" className="mx-1 underline">About</Link></li>
                    <li>{auth ? <Link to='/login' onClick={handleLogout}>Logout</Link> : <Link to="/login">Login</Link>}</li>
                </ul>
                <p className="pr-2">{user?.loggedInUser}</p>
            </div>
        </div>
    )
}

export default Header;