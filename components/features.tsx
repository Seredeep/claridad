import { MapPin, Users, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Real-Time Crime Maps",
    description: "Interactive maps showing crime incidents in your neighborhood with real-time updates.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with neighbors and local safety groups to build stronger, safer communities.",
  },
  {
    icon: Shield,
    title: "Safety Alerts",
    description: "Receive instant notifications about incidents and safety concerns in your area.",
  },
  {
    icon: BarChart3,
    title: "Crime Analytics",
    description: "Detailed insights and trends to help you understand your neighborhood's safety patterns.",
  },
]

export function Features() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Claridad?</h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-600">
            Our platform combines cutting-edge technology with community-driven insights to create the most
            comprehensive crime mapping solution.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#58eda2]/10">
                <feature.icon className="h-8 w-8 text-[#58eda2]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
