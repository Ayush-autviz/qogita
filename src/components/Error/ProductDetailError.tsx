'use client'

import React from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import ErrorState from './ErrorState'

interface ProductDetailErrorProps {
  error?: string
  onRetry?: () => void
  className?: string
}

const ProductDetailError: React.FC<ProductDetailErrorProps> = ({ 
  error = 'We couldn\'t load this product', 
  onRetry, 
  className = '' 
}) => {
  return (
    <ErrorState
      title="Product Not Available"
      message={error}
      icon={<Icon.ShoppingBag size={64} weight="light" className="text-red-500" />}
      onRetry={onRetry}
      className={className}
    />
  )
}

export default ProductDetailError
