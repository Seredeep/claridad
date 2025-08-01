import Image from "next/image"

interface ClaridadLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

export function ClaridadLogo({ size = "md", className = "" }: ClaridadLogoProps) {
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    xl: "w-48 h-48",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <Image
        src="/claridad-logo-transparent.png"
        alt="Claridad Logo"
        width={192}
        height={192}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
