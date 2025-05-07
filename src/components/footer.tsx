import {
  FaFacebookF,
  FaInstagram,
  FaTimes,
  FaGoogle,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#ed722e] text-black px-6 py-10 pt-30 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Contact Support */}
        <div className="space-y-4">
          <div className="">
            <img src="/elephant.png" alt="Elfo's Pizza" className="w-26" />
          </div>
          <div className="text-gray-900">
            <h3 className="font-bold text-black [font-family:'Barlow_Condensed',Helvetica] text-2xl">CONTACT SUPPORT</h3>
            <div className="">
              <h4 className="font-semibold  [font-family:'Barlow_Condensed',Helvetica] text-2xl ">ADDRESS</h4>
              <p>Dolor Sit Amet Loren Ipsum</p>
            </div>
            <div>
              <h4 className="font-semibold  [font-family:'Barlow_Condensed',Helvetica] text-2xl">CONTACTS</h4>
              <p>(601) 468-7817</p>
              <p>info@elfospizza.com</p>
            </div>
            <p className="text-xs pt-4">
              INDIA Limited
              <br />© 2025 ESBY'S PIZZA
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-bold  [font-family:'Barlow_Condensed',Helvetica] text-2xl">QUICK LINKS</h3>
          <ul className="space-y-1 text-gray-900">
            <li>Home</li>
            <li>Current page</li>
            <li>Menu</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Meet Our Team</li>
            <li>Gift Cards</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Elfo's Menu */}
        <div className="space-y-2">
          <h3 className="font-bold  [font-family:'Barlow_Condensed',Helvetica] text-2xl">ELFO’S MENU</h3>
          <ul className="space-y-1 text-gray-900">
            <li>Cheese Pizza</li>
            <li>Tandoori Feast Pizza</li>
            <li>Stuffed garlic Sticks!</li>
            <li>Cheese Pizza</li>
            <li>Tandoori Feast Pizza</li>
            <li>Stuffed garlic Sticks!</li>
            <li>Cheese Pizza</li>
            <li>Tandoori Feast Pizza</li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h3 className="font-bold  [font-family:'Barlow_Condensed',Helvetica] text-2xl">LEGAL</h3>
          <ul className="space-y-1 text-gray-900">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Accessibility Statement</li>
            <li>Applicant Privacy Noitice</li>
            <li>MP Transparency In</li>
            <li>Supply Chains Act</li>
            <li>FSSAI LICENSE</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-2 flex flex-col items-center justify-center">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">SOCIAL LINKS</h3>
          <div className="flex gap-3 text-xl justify-center items-center">
            <img src="/fb.png" alt="Facebook" className="w-9 h-9" />
            <img src="/insta.png" alt="Instagram" className="w-9 h-9" />
            <img src="/twitter.png" alt="Twitter" className="w-9 h-9" />
            <img src="/google.png" alt="Google" className="w-9 h-9" />
            <img src="/youtube.png" alt="YouTube" className="w-9 h-9" />
          </div>
        </div>
      </div>
    </footer>
  );
}
