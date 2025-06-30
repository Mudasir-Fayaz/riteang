import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">ABOUT US</h3>
          <p className="text-sm leading-relaxed">
            RITE Education is a premier institution dedicated to providing top-notch computer education to students of
            all ages and backgrounds. Established with a vision to create a transformative learning environment, we
            offer a wide array of courses designed to meet the diverse needs of today's tech-savvy learners.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-custom-blue transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-custom-blue transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-custom-blue transition-colors">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/student-zone" className="hover:text-custom-blue transition-colors">
                Student Zone
              </Link>
            </li>
            <li>
              <Link href="/student-jobs" className="hover:text-custom-blue transition-colors">
                Student Jobs
              </Link>
            </li>
            <li>
              <Link href="/franchise" className="hover:text-custom-blue transition-colors">
                Franchise
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-custom-blue transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Policy Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">POLICY LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-custom-blue transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-custom-blue transition-colors">
                Terms And Conditions
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-custom-blue transition-colors">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Social */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">CONTACT INFO</h3>
          <div className="space-y-2">
            <p className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-custom-blue" />
              <span>+91-70066 92395 , 9906885152</span>
            </p>
            <p className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-custom-blue" />
              <span>contact@riteeducation.in</span>
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook" className="hover:text-custom-blue transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-custom-blue transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} RITE Education. All rights reserved.</p>
      </div>
    </footer>
  )
}
