import React, { useEffect, useState } from 'react';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import ProductCard from '../components/products/ProductCard';
import { Search } from 'lucide-react';
import { getProducts, Product } from '../services/api';
import { useSEO } from '../hooks/useSEO';

const ProductsPage = () => {
  useSEO({
    title: 'Nos Produits',
    description:
      'Découvrez notre gamme de produits de sécurité haute qualité pour votre maison et votre entreprise chez Sanziri Security.',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError('Impossible de charger les produits.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    'Tous',
    ...new Set(products.map(product => product.category))
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tous' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Hero
        title="Produits de Sécurité"
        subtitle="Découvrez notre gamme de produits de sécurité haute qualité pour votre maison et votre entreprise"
        imageSrc="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Parcourez nos produits de sécurité"
            subtitle="Une large sélection pour répondre à tous vos besoins en protection"
          />

          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="form-input"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!isLoading && !error && (
              <p className="text-gray-600">
                Affichage de {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} sur {products.length}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Erreur</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                description={product.description}
                price={Number(product.price)}
                imageSrc={product.image || ''}
                category={product.category}
              />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">
                Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Catégories de produits"
            subtitle="Explorez notre sélection par catégorie"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(cat => cat !== 'Tous').map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <h3 className="text-xl font-bold mb-2">{category}</h3>
                <p className="text-gray-600 mb-4">
                  {products.filter(p => p.category === category).length} produit{products.filter(p => p.category === category).length > 1 ? 's' : ''}
                </p>
                <button
                  className="text-orange-600 font-medium hover:underline"
                  onClick={() => setSelectedCategory(category)}
                >
                  Parcourir la catégorie
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="bg-black text-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Besoin d'une solution de sécurité personnalisée ?
                </h2>
                <p className="text-gray-300 mb-8">
                  Nos experts en sécurité vous accompagnent pour concevoir un système complet adapté à vos besoins.
                  De la sélection des produits à l'installation et au support continu, bénéficiez d'une solution clé en main.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Évaluation professionnelle de la sécurité",
                    "Recommandations de produits personnalisées",
                    "Services d'installation experts",
                    "Maintenance et support continus"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="rounded-full bg-orange-600 p-1 mr-3 text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn bg-orange-600 text-white hover:bg-orange-700">
                  Planifier une consultation
                </button>
              </div>
              <div
                className="bg-center bg-cover hidden lg:block"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/8090068/pexels-photo-8090068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;