'use client'

import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  showHomeButton?: boolean
  showRetryButton?: boolean
  onRetry?: () => void
  className?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading the content. Please try again later.',
  icon = <Icon.WarningCircle size={64} weight="light" className="text-red-500" />,
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`error-state flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="error-icon mb-6 animate-pulse">
        {icon}
      </div>
      
      <h2 className="heading3 text-center mb-3">{title}</h2>
      
      <p className="body1 text-black text-center max-w-md mb-8">
        {message}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {showRetryButton && (
          <Button 
            onClick={onRetry} 
            className="button-main bg-black text-white hover:text-white hover:bg-black/90 px-6 py-3 rounded-full flex items-center gap-2"
          >
            {/* <Icon.ArrowClockwise  size={20} /> */}
            Try Again
          </Button>
        )}
        
        {showHomeButton && (
          <Link href="/">
            <Button 
              className="button-main bg-white border border-black text-black hover:bg-gray-100 px-6 py-3 rounded-full flex items-center gap-2"
            >
              {/* <Icon.House size={20} /> */}
              Back to Home
            </Button>
          </Link>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
        <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
          <Icon.LightbulbFilament size={20} className="text-amber-500" />
          Helpful Tips
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-0.5" />
            Check your internet connection
          </li>
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-0.5" />
            Try refreshing the page
          </li>
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-0.5" />
            Clear your browser cache and cookies
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorState
