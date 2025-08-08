import { motion } from 'framer-motion'

export default function MotionLayout({ children, className = "" }) {
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.section
      className={`w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-4 lg:px-6 transition-colors pt-20 sm:pt-24 overflow-hidden ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  )
}

export { motion }

export const childVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}
