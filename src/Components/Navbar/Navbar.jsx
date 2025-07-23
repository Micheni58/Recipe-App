import { useState } from 'react';
import "./Navbar.css"
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleAuthClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return(
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/recipes">About</a></li>
                <li><a href="/categories">Contacts</a></li>
                <li><a href="/favorites">Favorites</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;

