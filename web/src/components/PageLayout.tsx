import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const PageLayout = ({ children, ...props }: any) => (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: 'linear' }}
      {...props}
    >
      {children}
    </motion.div>
)

export default PageLayout