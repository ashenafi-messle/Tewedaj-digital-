'use client'

import React from 'react';

interface MobileTableCardProps {
  data: Array<Record<string, any>>;
  renderItem: (item: Record<string, any>, index: number) => React.ReactNode;
  className?: string;
}

export const MobileTableCard: React.FC<MobileTableCardProps> = ({ 
  data, 
  renderItem, 
  className = '' 
}) => {
  return (
    <div className={`mobile-table-cards ${className}`}>
      {data.map((item, index) => (
        <div key={index} className="mobile-table-card">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};