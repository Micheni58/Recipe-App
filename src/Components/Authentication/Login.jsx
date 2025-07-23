import "./Login.css"
function Login(){
    return(
        <>
        <div className="login-form">
            <form className="login-form-container">
                <div className="login-inputs">
                <h1 id="login-header">Login</h1>
                <label>Enter Email:</label><br />
                <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" /><br />

                <label>Password:</label><br />
                <input type="password" name="password" id="password"  placeholder="Enter Password"/><br />
                <button className="btn">Login</button>
                <p>Don't have an account? <a href="#">Sign Up here!</a></p>
                </div>

                <div className="login-image">
                <img src="https://cdn.pixabay.com/photo/2016/11/18/19/00/bread-1836411_640.jpg" alt="" />
                </div>
               
            </form>

        </div>
        </>
    )
}
export default Login;