import Image from "next/image"
import { NewsletterSignup } from "@/components/newsletter-signup"

export function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image src="/claridad-logo.png" alt="Claridad Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold text-white">CLARIDAD</span>
            </div>
            <p className="mb-6 max-w-md text-gray-400">
              Building safer communities through technology and collaboration. Join us in creating a world where
              everyone feels secure in their neighborhood.
            </p>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Stay Updated</h3>
              <NewsletterSignup />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#features" className="hover:text-[#58eda2]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#58eda2]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#58eda2]">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#58eda2]">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/privacy" className="hover:text-[#58eda2]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#58eda2]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#58eda2]">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#58eda2]">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <div className="text-sm text-gray-500">© 2024 Claridad. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
