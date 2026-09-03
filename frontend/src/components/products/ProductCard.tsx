import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  description,
  price,
  imageSrc,
  category
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors duration-300">
          <Link to={`/products/${slug}`}>{name}</Link>
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-orange-600">${price.toFixed(2)}</span>
          
          <Link 
            to={`/products/${slug}`} 
            className="bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-800 transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Plus de Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;