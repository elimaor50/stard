import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">STRAD</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section className="hero">
        <h1>Engineering the Future of Automotive</h1>
        <p>STRAD - Austrian excellence in car engineering and parts development for leading auto companies.</p>
        <button className="cta">Learn More</button>
      </section>
      <section id="about" className="about">
        <h2>About STRAD</h2>
        <p>Based in Austria, STRAD specializes in developing and engineering cars and car parts for major automotive companies. While we primarily work with Ford, our expertise extends to partnerships with other industry leaders.</p>
      </section>
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service">
            <h3>Car Engineering</h3>
            <p>Innovative design and engineering solutions for next-generation vehicles.</p>
          </div>
          <div className="service">
            <h3>Parts Development</h3>
            <p>Custom development of high-performance car parts for OEMs.</p>
          </div>
          <div className="service">
            <h3>Collaboration</h3>
            <p>Partnering with big auto companies to bring cutting-edge technology to the road.</p>
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Ready to innovate? Get in touch with STRAD.</p>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <footer className="footer">
        <p>&copy; 2026 STRAD. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
