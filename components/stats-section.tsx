import { Users, MapPin, Shield, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Community Members",
    description: "Active users across neighborhoods worldwide",
  },
  {
    icon: MapPin,
    value: "500+",
    label: "Cities Covered",
    description: "Real-time crime data from major cities",
  },
  {
    icon: Shield,
    value: "24/7",
    label: "Safety Monitoring",
    description: "Continuous updates and alerts",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Crime Reduction",
    description: "In neighborhoods using our platform",
  },
]

export function StatsSection() {
  return (
    <section className="bg-[#58eda2]/5 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Making Communities Safer</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join thousands of users who are already making their neighborhoods safer with Claridad.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#58eda2]/10">
                <stat.icon className="h-8 w-8 text-[#58eda2]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
