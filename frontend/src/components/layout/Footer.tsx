import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">
                <span className="text-orange-500">Sanziri</span> Sécurité
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Fournisseur de services de sécurité professionnels et de solutions de sécurité innovantes depuis 2010.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-orange-500 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-orange-500 transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-orange-500 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-orange-500 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Accueil</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">À Propos</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Services</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Produits</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Blog</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Témoignages</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Nos Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services#personal" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Sécurité Personnelle</Link>
              </li>
              <li>
                <Link to="/services#business" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Sécurité d'Entreprise</Link>
              </li>
              <li>
                <Link to="/services#event" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Sécurité Événementielle</Link>
              </li>
              <li>
                <Link to="/services#systems" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Systèmes de Sécurité</Link>
              </li>
              <li>
                <Link to="/services#consultation" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Consultation en Sécurité</Link>
              </li>
              <li>
                <Link to="/services#training" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block">Formation en Sécurité</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contactez-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">13 Rue Aguelmane Sidi Ali, Rabat Agdal, Maroc</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">+212 629 810 125</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@sanzirisecurity.com" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">info@sanzirisecurity.com</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Sanziri Sécurité. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-orange-500 transition-colors duration-300 text-sm">Politique de Confidentialité</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-orange-500 transition-colors duration-300 text-sm">Conditions d'Utilisation</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-orange-500 transition-colors duration-300 text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;