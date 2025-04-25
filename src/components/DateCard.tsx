
import React from 'react';
import { cn } from '@/lib/utils';

interface DateCardProps {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
  className?: string;
}

const DateCard: React.FC<DateCardProps> = ({
  title,
  description,
  imageSrc,
  onClick,
  className
}) => {
  return (
    <div 
      className={cn("date-card cursor-pointer group", className)}
      onClick={onClick}
    >
      <div className="w-full h-full aspect-[3/4]">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="date-card-shine" />
        <div className="date-card-overlay">
          <h3 className="font-playfair text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
