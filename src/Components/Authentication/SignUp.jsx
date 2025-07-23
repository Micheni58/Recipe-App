import "./SignUp.css"
function SignUp(){
    return(
        <>
        <div>
            <form className="signup-form-container">
                
                <div className="sign-up-inputs">
                <h1 id="signup-header">Register Here</h1>
                <label>FirstName</label><br />
                <input type="text" name="firstname" id="firstname" placeholder="Enter your Firstname" required/><br />

                <label>SecondName</label><br />
                <input type="text" name="secondname" id="secondname" placeholder="Enter your Secondname"  required/><br />
                <label>Email</label><br />
                <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" required /><br />

                <label>Password</label><br />
                <input type="password" name="password" id="password" placeholder="Enter Password" required/><br />

                <label>Confirm Password</label><br />
                <input type="password" name="password" id="password" placeholder="Confirm Password" required/><br />
                <button type="submit" id="btn">Sign Up!</button>
                <p>Already have an account?<a href="#login" > Back to Login </a></p>
               
                </div>

                <div className="sign-up-image">
                <img src="https://st5.depositphotos.com/1558912/64667/i/450/depositphotos_646673554-stock-photo-easter-food-background-white-plate.jpg" alt="Fried salmon" />
                </div>
            </form>

               
            
        </div>
        </>

    )
}
export default SignUp;