import "./Footer.css"
function Footer(){
    return(
        <>
        <div className="footer">
            <div>
            <h1>Get in Touch</h1>
            </div>
            <div className="sitemap">
            <h1>Our site map</h1>
            <a href="#">Recipes</a><br />
            <a href="#">Ingridients</a><br />
            <a href="#">About Us</a><br />                        

            </div>
            
            <div className="footer-links">
            <h2>Give us you feedback</h2>
            <a href="#">Contact Us:</a><br />
            <a href="#">Email Us</a><br />
            
            </div>
            <div className="footer-input">
            <label>Share feedback and thoughts with us!</label><br />
            <input type="email" name="" id="" placeholder="Enter here" />
            <button type="submit" id="btn-send">Send</button>
            </div>
            
        </div>
        </>
    )
}
export default Footer;
