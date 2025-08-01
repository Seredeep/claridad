import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/claridad-logo.png"
              alt="Claridad Logo"
              width={120}
              height={120}
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            <span className="block">CLARIDAD</span>
            <span className="block text-[#58eda2]">Crime Maps</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Empowering communities worldwide with real-time crime data and neighborhood safety insights. Join thousands
            of users creating safer communities together.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="rounded-lg bg-[#58eda2]/10 px-4 py-2">
              <p className="text-sm font-medium text-[#58eda2]">🚀 Coming Soon - Join the Waitlist</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#58eda2]/5"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#58eda2]/5"></div>
      </div>
    </section>
  )
}
