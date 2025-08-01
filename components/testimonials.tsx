import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Rodriguez",
    location: "Mexico City, Mexico",
    text: "Claridad helped me understand the safety patterns in my neighborhood. I feel much more informed about where to go and when.",
    rating: 5,
  },
  {
    name: "James Chen",
    location: "San Francisco, USA",
    text: "The community features are amazing. We've organized neighborhood watch groups through the platform.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    location: "Mumbai, India",
    text: "Real-time alerts have been a game-changer for my family's safety. We're always aware of what's happening around us.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Hear from community members who are already using Claridad to stay safe.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-6">
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#58eda2] text-[#58eda2]" />
                ))}
              </div>
              <p className="mb-4 text-gray-700">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
