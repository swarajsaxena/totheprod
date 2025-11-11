import { motion } from "framer-motion"
import React from "react"

export const Navbar = () => {
  return (
    <div className="mx-auto w-full max-w-4xl p-2">
      <div className="flex items-center gap-2">
        <motion.img
          src="/logo-light.svg"
          alt="Logo"
          className="h-6 w-6"
          layoutId="logo"
        />
        <span className="font-heading font-semibold text-xl tracking-wide">
          ToTheProd
        </span>
      </div>
    </div>
  )
}
