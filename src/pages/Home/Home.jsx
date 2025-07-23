import "./Home.css";

function HomePage() {
  return (
    <>
      {/* This is the landing page /Web page where users are landed first */}
      {/* Should have the navbar component here*/}

      <div className="hero-section">
        <div className="home-content">
          <h1>Search for any recipe</h1>
          <p>Get any recipe in just one search! Explore thousands of dishes from around the world.</p>
          <div className="hero-buttons">
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Body of this page */}

      <section className="about-section">
        <h2>About RecipeFinder</h2>
        <p>
          RecipeFinder is your one-stop solution for finding the best recipes across the globe.
          Whether you're craving desserts, healthy meals, or quick snacks, we've got something for everyone!
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: support@recipefinder.com</p>
        <p>Phone: +254 712 345 678</p>
      </section>

      {/* Should have the footer component */}
    </>
  );
}

export default HomePage;
