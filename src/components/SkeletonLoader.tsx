import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number; // Number of skeleton lines/blocks to render
  type?: 'text' | 'card' | 'avatar'; // Type of skeleton to render
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  count = 1,
  type = 'text',
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-gray-200 rounded-lg shadow-sm p-6 animate-pulse h-48 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        );
      case 'avatar':
        return (
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}></div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-2 last:mb-0">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
