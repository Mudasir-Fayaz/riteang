import { TestimonialCard } from "./testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
  {
    name: "Amina Khan",
    review:
      "RITE provided the perfect balance of theory and hands-on experience. The support from mentors was outstanding!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Yusuf Ahmad",
    review:
      "I’m grateful to RITE for helping me build a strong foundation in tech. The curriculum is well-structured and industry-relevant.",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Fatima Siddiqui",
    review:
      "RITE was a game-changer for me. I especially loved how approachable and knowledgeable the instructors were.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Bilal Qureshi",
    review:
      "The learning environment at RITE is very motivating. I appreciated the real-world projects that boosted my confidence.",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Zahra Ali",
    review:
      "RITE helped me switch careers successfully. The course content is top-notch and very easy to follow.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Hamza Farooq",
    review:
      "Joining RITE was the best decision I made. It opened up so many opportunities for me in the tech world.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  }
];

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
