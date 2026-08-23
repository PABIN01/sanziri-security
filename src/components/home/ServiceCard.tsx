import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="card p-6 h-full flex flex-col bg-white group">
      <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      
      <Link 
        to={link} 
        className="flex items-center text-orange-600 font-medium hover:underline mt-auto"
      >
        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;