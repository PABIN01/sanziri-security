import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const closeServicesDropdown = () => {
    setServicesDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center shrink-0" 
            onClick={closeMenu}
          >
            <Shield className="h-8 w-8 text-orange-600" />
            <span className="ml-2 text-xl font-bold whitespace-nowrap">
              <span className="text-orange-600">Sanziri</span> Security
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-8">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                À Propos
              </NavLink>
              
              <div className="relative group" onMouseLeave={closeServicesDropdown}>
                <button 
                  className="nav-link flex items-center"
                  onClick={toggleServicesDropdown}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md py-2 z-50 animate-fadeIn">
                    <Link 
                      to="/services" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={closeServicesDropdown}
                    >
                      Tous les Services
                    </Link>
                    <Link 
                      to="/services#personal" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={closeServicesDropdown}
                    >
                      Sécurité Personnelle
                    </Link>
                    <Link 
                      to="/services#business" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={closeServicesDropdown}
                    >
                      Sécurité d'Entreprise
                    </Link>
                    <Link 
                      to="/services#event" 
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={closeServicesDropdown}
                    >
                      Sécurité Événementielle
                    </Link>
                  </div>
                )}
              </div>
              
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Produits
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Blog
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                Contact
              </NavLink>
            </div>
          </nav>

          {/* Quote Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-gray-800 hover:text-orange-600 transition-colors"
              aria-label="Voir le panier"
              onClick={closeMenu}
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/contact" className="hidden lg:inline-flex btn btn-primary whitespace-nowrap">
              Obtenir un Devis
            </Link>
            <button 
              className="lg:hidden text-gray-800 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-white z-50 overflow-y-auto">
          <nav className="container-custom py-6">
            <div className="flex flex-col space-y-4">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `block py-2 px-4 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`
                }
                onClick={closeMenu}
              >
                À Propos
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  `block py-2 px-4 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`
                }
                onClick={closeMenu}
              >
                Services
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `block py-2 px-4 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`
                }
                onClick={closeMenu}
              >
                Produits
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `block py-2 px-4 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`
                }
                onClick={closeMenu}
              >
                Blog
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `block py-2 px-4 rounded ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'}`
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
              <Link 
                to="/contact" 
                className="btn btn-primary w-full text-center" 
                onClick={closeMenu}
              >
                Obtenir un Devis
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;