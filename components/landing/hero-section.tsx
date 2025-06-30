import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-custom-blue to-custom-red text-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Empowering Futures Through Quality Education
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
            Join RITE Education and unlock your potential with our comprehensive courses and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-400">
            <Link href="/courses">
              <Button className="bg-white text-custom-blue hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Explore Courses
              </Button>
            </Link>
            <Link href="/student-zone">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-custom-blue px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Student Zone
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-right animation-delay-600">
          <img
            src="https://cdn.firstcry.com/education/2022/12/11101254/Parts-Of-A-Computer-For-Kids.jpg"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-lg shadow-2xl object-cover"
          />
        </div>
      </div>
      {/* Background shapes for visual appeal */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white opacity-10 rounded-full mix-blend-overlay animate-blob-1"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white opacity-10 rounded-full mix-blend-overlay animate-blob-2"></div>
      </div>
    </section>
  )
}
