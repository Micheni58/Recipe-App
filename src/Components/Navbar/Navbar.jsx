import { useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleAuthClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return(
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/favorites">Favorites</a></li>
            </ul>

            <div>
                <input type="text" placeholder="Search recipes"/>
                <button>Search</button>
            </div>
            <div>
                <button>User</button>
                <button onClick={handleAuthClick}>{isLoggedIn ? "Sign out" : "Sign in"}</button>                
            </div>
        </nav>
    );
};

export default Navbar;

