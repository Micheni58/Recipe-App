function AddForm () {
    return(
        <form className="form">
            <input type="text" placeholder="Enter your name" />
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <button type="submit">Submit</button>
        </form> 
    )
}
export default AddForm;