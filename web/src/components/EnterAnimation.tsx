import React, { ReactChild } from 'react'

interface EnterAnimationProps {
  className: any | null
  animation: 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | 'fadeInUp' | 'fadeInDown'
  duration: number
  delay?: number | null
  children: ReactChild
}

const EnterAnimation = ({ className, animation, duration, delay, children }: EnterAnimationProps) => (
  <div
    className={className ? className : ''}
    style={{
      animation: `${animation} ${duration}ms ease`,
      animationDelay: delay ? `${delay}ms`: ''
    }}
  >
    {children}
  </div>
)

export default EnterAnimation