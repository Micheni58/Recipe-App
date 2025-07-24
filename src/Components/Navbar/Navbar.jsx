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
                <li><a href="/about">About</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/add recipes">Add Recipes</a></li>
            </ul>            
        </nav>
    );
};

export default Navbar;

