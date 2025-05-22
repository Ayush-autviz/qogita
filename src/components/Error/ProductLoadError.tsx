'use client'

import React from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import ErrorState from './ErrorState'

interface ProductLoadErrorProps {
  onRetry?: () => void
  className?: string
}

const ProductLoadError: React.FC<ProductLoadErrorProps> = ({ onRetry, className = '' }) => {
  return (
    <ErrorState
      title="Unable to Load Products"
      message="We couldn't load the products you're looking for. This could be due to a temporary issue with our product catalog or network connectivity."
      icon={<Icon.ShoppingBagOpen size={64} weight="light" className="text-red-500" />}
      onRetry={onRetry}
      className={className}
    />
  )
}

export default ProductLoadError
