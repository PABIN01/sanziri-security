import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const NotFoundPage = () => {
  useSEO({
    title: 'Page introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    noIndex: true,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-orange-600 mx-auto" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Page introuvable</h2>
        
        <p className="text-gray-600 text-lg mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <Home className="mr-2 h-5 w-5" />
            Retour à l'accueil
          </Link>
          
          <Link to="/contact" className="btn btn-outline flex items-center justify-center">
            <Search className="mr-2 h-5 w-5" />
            Contacter le support
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500">
            Si vous pensez qu'il s'agit d'une erreur, contactez notre équipe support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;