import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"

export default function AboutUsPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Courses", href: "/courses" },
    { name: "Franchise", href: "/franchise" },
    { name: "Student Zone", href: "/login-zone" },
    { name: "Verify Certificate", href: "/#verify-certificate" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader navLinks={navLinks} />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-custom-red mb-8 text-center">About RITE Education</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-custom-blue mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At RITE Education, our mission is to empower individuals with the essential computer skills and knowledge
            needed to thrive in the digital age. We are committed to providing high-quality, accessible, and
            industry-relevant education that fosters innovation, critical thinking, and lifelong learning. We believe
            that technology should be a tool for empowerment, and we strive to equip our students with the expertise to
            leverage it effectively.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-custom-blue mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To be a leading computer education institute recognized for excellence in teaching, cutting-edge curriculum,
            and a profound impact on the career trajectories of our graduates. We envision a future where every
            individual has the opportunity to harness the power of technology to achieve their personal and professional
            aspirations.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-custom-blue mb-4">Our History</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in Anantnag, RITE Education began with a simple goal: to bridge the digital divide and make computer
            literacy accessible to everyone. Over the years, we have grown from a small training center to a
            comprehensive institute offering a wide range of courses, from foundational computer skills to advanced
            programming and data science. Our journey has been marked by a dedication to student success, continuous
            curriculum updates, and a passionate team of educators.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            We pride ourselves on our practical, hands-on approach to learning, ensuring that our students not only
            understand theoretical concepts but can also apply them in real-world scenarios. Our alumni have gone on to
            achieve success in various industries, a testament to the quality of education provided at RITE.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-custom-blue mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Experienced and dedicated faculty</li>
            <li>State-of-the-art infrastructure</li>
            <li>Industry-relevant curriculum</li>
            <li>Hands-on practical training</li>
            <li>Career guidance and placement assistance</li>
            <li>Flexible learning options</li>
          </ul>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
