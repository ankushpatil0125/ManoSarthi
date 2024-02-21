import "../css/Footer.css";
const FooterComponent = () => {
  return (
    <footer className="footer_area section_padding_130_0">
      
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              <div className="footer-logo mb-3"></div>
              <p>
                Appland is completely creative, lightweight, clean app landing
                page.
              </p>

              <div className="copywrite-text mb-5">
                <p className="mb-0">
                  Made with <i className="lni-heart mr-1"></i>by
                  <a
                    className="ml-1"
                    href="https://wrapbootstrap.com/user/DesigningWorld"
                  >
                    Designing World
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">About</h5>
              <div className="footer_menu">
                <ul>
                  <li>About Us</li>
                  <li>Terms & Policy</li>
                  <li>Corporate Sale</li>
                  <li>Community</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">Support</h5>

              <div className="footer_menu">
                <ul>
                  <li>Help</li>
                  <li>Support</li>
                  <li>Privacy Policy</li>
                  <li>Term & Conditions</li>
                  <li>Help & Support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">Contact</h5>

              <div className="footer_menu">
                <ul>
                  <li>Call Centre</li>
                  <li>Email Us</li>
                  <li>Term & Conditions</li>
                  <li>Help Center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      
    </footer>
  );
};

export default FooterComponent;
