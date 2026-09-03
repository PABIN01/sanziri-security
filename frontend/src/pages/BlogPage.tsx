import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Search, Tag } from 'lucide-react';
import Hero from '../components/common/Hero';
import BlogCard from '../components/home/BlogCard';
import {
  getBlogPosts,
  BlogPost,
  subscribeToNewsletter,
} from '../services/api';
import { useSEO } from '../hooks/useSEO';

const BlogPage = () => {
  useSEO({
    title: 'Blog',
    description:
      'Restez informé grâce à nos articles sur les tendances, conseils et nouveautés en sécurité chez Sanziri Security.',
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getBlogPosts();
        setPosts(data.filter((post) => post.is_published));
      } catch (err) {
        console.error('Erreur lors du chargement des articles :', err);
        setError('Impossible de charger les articles pour le moment.');
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  const allCategories = useMemo(() => ['Tous', ...new Set(posts.map((post) => post.category))], [posts]);
  const allTags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags))], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesSearch = !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch) ||
        post.content.toLowerCase().includes(normalizedSearch);
      const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tous');
    setSelectedTag('');
  };

  const formatDate = (date: string | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(date));
  };

  const handleNewsletterSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setNewsletterLoading(true);
  setNewsletterMessage('');
  setNewsletterError('');

  try {
    await subscribeToNewsletter(newsletterEmail);

    setNewsletterMessage(
      'Merci ! Votre inscription à la newsletter a bien été enregistrée.'
    );
    setNewsletterEmail('');
  } catch (err) {
    setNewsletterError(
      err instanceof Error
        ? err.message
        : "Impossible de vous inscrire à la newsletter."
    );
  } finally {
    setNewsletterLoading(false);
  }
};

  return (
    <div>
      <Hero
        title="Blog Insights Sécurité"
        subtitle="Restez informé avec les dernières tendances sécuritaires, conseils et actualités du secteur"
        imageSrc="https://images.pexels.com/photos/6478588/pexels-photo-6478588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Recherche</h3>
                  <div className="relative">
                    <input type="text" placeholder="Rechercher des articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input pl-10" />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Catégories</h3>
                  <ul className="space-y-2">
                    {allCategories.map((category) => (
                      <li key={category}>
                        <button type="button" onClick={() => setSelectedCategory(category)} className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-orange-100 text-orange-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Tags Populaires</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button type="button" key={tag} onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${tag === selectedTag ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <Tag className="h-3 w-3 mr-1" /> {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {(searchTerm || selectedCategory !== 'Tous' || selectedTag) && (
                  <button type="button" onClick={resetFilters} className="text-orange-600 font-medium hover:underline">
                    Effacer tous les filtres
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                  <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-600 mb-4" />
                  <p className="text-gray-600">Chargement des articles...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Une erreur est survenue</h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">Réessayer</button>
                </div>
              ) : filteredPosts.length > 0 ? (
                <>
                  <div className="mb-12">
                    <Link to={`/blog/${filteredPosts[0].slug}`}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
                        <div className="relative overflow-hidden">
                          {filteredPosts[0].image ? (
                            <img src={filteredPosts[0].image} alt={filteredPosts[0].title} className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-80 bg-gray-200 flex items-center justify-center"><span className="text-gray-500">Sanziri Security</span></div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-6 text-white">
                              <div className="mb-3"><span className="inline-block bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">{filteredPosts[0].category}</span></div>
                              <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-orange-300 transition-colors duration-300">{filteredPosts[0].title}</h2>
                              <div className="flex items-center text-sm text-gray-300">
                                <div className="flex items-center mr-4"><Calendar className="h-4 w-4 mr-1" /><span>{formatDate(filteredPosts[0].published_at)}</span></div>
                                <div className="flex items-center"><User className="h-4 w-4 mr-1" /><span>{filteredPosts[0].author}</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {filteredPosts.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredPosts.slice(1).map((post) => (
                        <BlogCard key={post.id} slug={post.slug} title={post.title} excerpt={post.excerpt} imageSrc={post.image || 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} date={formatDate(post.published_at)} author={post.author} category={post.category} />
                      ))} 
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Aucun article trouvé</h3>
                  <p className="text-gray-600 mb-4">Nous n'avons pas trouvé d'articles correspondant à vos critères de recherche.</p>
                  {(searchTerm || selectedCategory !== 'Tous' || selectedTag) && (
                    <button type="button" onClick={resetFilters} className="btn btn-primary">Réinitialiser les filtres</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Restez Informé sur les Questions de Sécurité</h2>
            <p className="text-gray-300 mb-8">Abonnez-vous à notre newsletter pour recevoir les derniers conseils en matière de sécurité, les actualités du secteur et du contenu exclusif directement dans votre boîte e-mail.</p>
            
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="form-input flex-grow text-gray-900 placeholder:text-gray-500"
              required
              disabled={newsletterLoading}
            />
            <button
              type="submit"
              className="btn bg-orange-600 text-white hover:bg-orange-700"
              disabled={newsletterLoading}
            >
              {newsletterLoading ? 'Inscription...' : "S'abonner"}
            </button>
          </form>

            {newsletterMessage && (
              <p className="text-green-400 mt-4">
                {newsletterMessage}
              </p>
            )}

            {newsletterError && (
              <p className="text-red-400 mt-4">
                {newsletterError}
              </p>
            )}
            <p className="text-gray-400 text-sm mt-4">Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;