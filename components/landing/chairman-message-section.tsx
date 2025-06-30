import Image from "next/image"

export function ChairmanMessageSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Message from the Chairman</h2>
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-xl overflow-hidden p-6 md:p-10">
          <div className="lg:w-1/3 flex justify-center mb-8 lg:mb-0">
            <img
              src="https://riteeducation.in/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-27-at-5.25.32-PM.jpeg" // Replaced blob URL
              alt="Chairman"
              width={300}
              height={300}
              className="rounded-full object-cover border-4 border-custom-blue shadow-lg"
            />
          </div>
          <div className="lg:w-2/3 lg:pl-12 text-center lg:text-left">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
              &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">Dear Students, Parents, and Partners,</p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              It is with immense pleasure and a deep sense of commitment that I welcome you to RITE Education. Our
              journey began with a vision to create a learning ecosystem that not only imparts knowledge but also
              fosters critical thinking, creativity, and a lifelong passion for learning. We believe that quality
              education is the cornerstone of a prosperous society and a brighter future for individuals.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At RITE Education, we are dedicated to providing an unparalleled educational experience, blending
              traditional wisdom with modern pedagogical approaches. Our team of highly qualified and passionate
              educators, state-of-the-art facilities, and meticulously designed curriculum are all geared towards
              nurturing well-rounded individuals who are ready to face the challenges of tomorrow.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We are committed to your success and growth. Thank you for choosing RITE Education as your partner in this
              transformative journey.
            </p>
            <p className="text-xl font-semibold text-custom-blue mt-8">Fayaz Ahmad Lone</p>
            <p className="text-md text-gray-600">Chairman, RITE Education</p>
          </div>
        </div>
      </div>
    </section>
  )
}
