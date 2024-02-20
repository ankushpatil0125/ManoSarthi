const FooterComponent = () => {
    return (
      <footer className="bg-dark text-white  py-4 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5>Company</h5>
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
            </div>
            <div className="col-lg-4">
              <h5>Services</h5>
              <p>Web Development</p>
              <p>Graphic Design</p>
              <p>Marketing</p>
            </div>
            <div className="col-lg-4">
              <h5>Connect</h5>
              <p>Email: info@example.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default FooterComponent;