import { motion } from "framer-motion"

export const Navbar = () => {
  return (
    <div className="mx-auto w-full max-w-4xl p-2">
      <div className="flex items-center gap-2">
        {/* biome-ignore lint/correctness/useImageSize: motion.img with layoutId doesn't support width/height */}
        {/* biome-ignore lint/performance/noImgElement: motion.img is required for animation transitions */}
        <motion.img
          alt="Logo"
          className="h-6 w-6"
          layoutId="logo"
          src="/logo-light.svg"
        />
        <span className="font-heading font-semibold text-xl tracking-wide">
          ToTheProd
        </span>
      </div>
    </div>
  )
}
