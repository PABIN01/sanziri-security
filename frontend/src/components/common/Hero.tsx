import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  overlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  buttonText,
  buttonLink = '/contact',
  secondaryButtonText,
  secondaryButtonLink = '/services',
  overlay = true,
  size = 'lg'
}) => {
  const heightClass = {
    sm: 'min-h-[30vh]',
    md: 'min-h-[50vh]',
    lg: 'min-h-[80vh]'
  }[size];

  return (
    <div 
      className={`relative flex items-center ${heightClass} bg-cover bg-center`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      )}
      
      <div className="container-custom relative z-10 py-12">
        <div className="max-w-2xl fade-in-up">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-white text-lg md:text-xl opacity-90 mb-8">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {buttonText && (
              <Link to={buttonLink} className="btn btn-primary">
                {buttonText}
              </Link>
            )}
            
            {secondaryButtonText && (
              <Link to={secondaryButtonLink} className="btn btn-outline border-white text-white hover:bg-white hover:text-black">
                {secondaryButtonText} <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;