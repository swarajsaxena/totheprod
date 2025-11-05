import React from 'react'
import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <div className="p-2 w-full max-w-4xl mx-auto ">
      <div className="flex items-center gap-2">
        <motion.img src="/logo-light.svg" alt="Logo" className="w-6 h-6" layoutId="logo" />
        <span className="font-semibold text-xl font-clash tracking-wide">ToTheProd</span>
      </div>
    </div>
  )
}
