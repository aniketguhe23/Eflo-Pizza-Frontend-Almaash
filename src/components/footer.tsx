import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#ed722e] text-black px-6 py-10 pt-30 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Contact Support */}
        <div className="space-y-4">
          <div>
            <Image src="/elephant.png" alt="Elfo's Pizza" width={104} height={104} />
          </div>
          <div className="text-gray-900">
            <h3 className="font-bold text-black [font-family:'Barlow_Condensed',Helvetica] text-2xl">CONTACT SUPPORT</h3>
            <div>
              <h4 className="font-semibold [font-family:'Barlow_Condensed',Helvetica] text-2xl">ADDRESS</h4>
              <p>Dolor Sit Amet Loren Ipsum</p>
            </div>
            <div>
              <h4 className="font-semibold [font-family:'Barlow_Condensed',Helvetica] text-2xl">CONTACTS</h4>
              <p>(601) 468-7817</p>
              <p>info@elfospizza.com</p>
            </div>
            <p className="text-xs pt-4">
              INDIA Limited
              <br />© 2025 ESBY&apos;S PIZZA
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">QUICK LINKS</h3>
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
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">ELFO&apos;S MENU</h3>
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
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">LEGAL</h3>
          <ul className="space-y-1 text-gray-900">
            <li>Terms &amp; Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Accessibility Statement</li>
            <li>Applicant Privacy Notice</li>
            <li>MP Transparency In</li>
            <li>Supply Chains Act</li>
            <li>FSSAI LICENSE</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-2 flex flex-col items-center justify-center">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">SOCIAL LINKS</h3>
          <div className="flex gap-3 text-xl justify-center items-center">
            <Image src="/fb.png" alt="Facebook" width={36} height={36} />
            <Image src="/insta.png" alt="Instagram" width={36} height={36} />
            <Image src="/twitter.png" alt="Twitter" width={36} height={36} />
            <Image src="/google.png" alt="Google" width={36} height={36} />
            <Image src="/youtube.png" alt="YouTube" width={36} height={36} />
          </div>
        </div>
      </div>
    </footer>
  );
}
