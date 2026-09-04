import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Shield,
  Truck,
  Clock,
  Award,
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import { getProduct, getProducts, Product } from '../services/api';
import { useSEO } from '../hooks/useSEO.ts';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useSEO({
    title: product ? product.name : 'Produit',
    description: product
      ? product.description
      : 'Découvrez notre gamme de produits de sécurité professionnels chez Sanziri Security.',
    image: product?.image || undefined,
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setError('Produit introuvable.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getProduct(slug);
        setProduct(data);

        if (data.related_products.length > 0) {
          const allProducts = await getProducts();

          const related = allProducts.filter((item) =>
            data.related_products.includes(item.id)
          );

          setRelatedProducts(related);
        } else {
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error(error);
        setError('Impossible de charger le produit.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-600">Chargement du produit...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit Non Trouvé</h2>
        <p className="mb-6">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link to="/products" className="btn btn-primary">
          Retour aux Produits
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="bg-gray-100 py-4">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link
              to="/products"
              className="text-gray-600 hover:text-orange-600 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux Produits
            </Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image || ''}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full font-medium mb-4">
                {product.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>

              <div className="text-2xl font-bold text-orange-600 mb-6">
                {Number(product.price).toFixed(2)} €
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-700">{product.long_description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">Garantie 1 An</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">Livraison Gratuite</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-sm">Support 24/7</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <div className="w-full sm:w-32">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantité
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-input"
                  />
                </div>

                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    &nbsp;
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!product) return;
                      addToCart(product, quantity);
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }}
                    className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-orange-700 w-full flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {addedToCart ? 'Ajouté !' : 'Ajouter au Panier'}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">
                  Caractéristiques Principales :
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-orange-600 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Spécifications du Produit"
            subtitle="Spécifications techniques détaillées du produit"
            centered={false}
          />

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {Object.entries(product.specifications).map(
                ([key, value], index) => (
                  <div
                    key={index}
                    className={`p-4 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } border-b border-gray-200`}
                  >
                    <div className="font-bold text-gray-700">{key}</div>
                    <div className="text-gray-600">{value}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Fonctionnalités et Avantages"
            subtitle="Pourquoi ce produit est essentiel pour vos besoins de sécurité"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image || ''}
                alt={product.name}
                className="rounded-lg shadow-md w-full h-auto object-cover mb-4"
              />

              <div className="bg-black text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Pourquoi Choisir Ce Produit ?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Qualité et fiabilité de pointe dans l'industrie</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Sécurité renforcée pour votre propriété</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Protection 24/7 et tranquillité d'esprit</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                Toutes les Fonctionnalités
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-orange-100 p-1 text-orange-600 mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{feature}</h4>
                      <p className="text-gray-600 text-sm">
                        Cette fonctionnalité améliore votre sécurité en offrant
                        des capacités avancées et une facilité d'utilisation.
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-custom">
            <SectionTitle
              title="Produits Associés"
              subtitle="Vous pourriez également être intéressé par ces produits"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  to={`/products/${relatedProduct.slug}`}
                  key={relatedProduct.id}
                >
                  <div className="card group h-full flex flex-col">
                    <div className="overflow-hidden">
                      <img
                        src={relatedProduct.image || ''}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-3">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
                          {relatedProduct.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>

                      <p className="text-gray-600 mb-4 flex-grow">
                        {relatedProduct.description}
                      </p>

                      <div className="mt-auto">
                        <span className="text-xl font-bold text-orange-600">
                          {Number(relatedProduct.price).toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/products" className="btn btn-outline">
                Voir Tous les Produits
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-orange-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'Aide pour Choisir les Bons Produits de Sécurité ?
            </h2>
            <p className="text-white opacity-90 mb-8">
              Nos experts en sécurité peuvent vous aider à créer une solution de
              sécurité complète adaptée à vos besoins spécifiques. Contactez-nous
              pour une consultation gratuite.
            </p>
            <Link
              to="/contact"
              className="btn bg-white text-orange-600 hover:bg-gray-100"
            >
              Obtenir des Conseils d'Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;