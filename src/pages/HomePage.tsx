import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Building,
  Clock,
  Calendar,
  Award,
  ChevronRight,
  ShieldCheck,
  Lock,
  Eye,
} from 'lucide-react';

import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/home/ServiceCard';
import FeatureCard from '../components/home/FeatureCard';
import TestimonialCard from '../components/home/TestimonialCard';
import BlogCard from '../components/home/BlogCard';
import { useSEO } from '../hooks/useSEO';

import {
  getServices,
  getTestimonials,
  getBlogPosts,
  Service,
  Testimonial,
  BlogPost,
} from '../services/api';

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const HomePage = () => {
  useSEO({
    title: 'Accueil',
    description:
      'Sanziri Security propose des solutions de sécurité professionnelles : personnel de sécurité expert, surveillance 24h/24 et 7j/7, certifié et assuré.',
  });

  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const [servicesLoading, setServicesLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  const [servicesError, setServicesError] = useState('');
  const [testimonialsError, setTestimonialsError] = useState('');
  const [postsError, setPostsError] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError('');

        const data = await getServices();

        setServices(data.filter((service) => service.is_active));
      } catch (error) {
        console.error('Erreur lors du chargement des services :', error);
        setServicesError('Impossible de charger les services.');
      } finally {
        setServicesLoading(false);
      }
    };

    const loadTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        setTestimonialsError('');

        const data = await getTestimonials();

        setTestimonials(data);
      } catch (error) {
        console.error(
          'Erreur lors du chargement des témoignages :',
          error
        );
        setTestimonialsError(
          'Impossible de charger les témoignages.'
        );
      } finally {
        setTestimonialsLoading(false);
      }
    };

    const loadPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError('');

        const data = await getBlogPosts();

        setPosts(data.filter((post) => post.is_published));
      } catch (error) {
        console.error(
          'Erreur lors du chargement des articles :',
          error
        );
        setPostsError('Impossible de charger les articles.');
      } finally {
        setPostsLoading(false);
      }
    };

    loadServices();
    loadTestimonials();
    loadPosts();
  }, []);

  const getServiceIcon = (icon: string) => {
    switch (icon?.toLowerCase()) {
      case 'users':
        return <Users size={24} />;

      case 'building':
        return <Building size={24} />;

      case 'calendar':
        return <Calendar size={24} />;

      case 'shield':
        return <Shield size={24} />;

      default:
        return <Shield size={24} />;
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '';

    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div>
      {/* Section Hero */}
      <Hero
        title="Solutions de sécurité professionnelles pour votre tranquillité d’esprit"
        subtitle="Protéger ce qui compte le plus grâce à une technologie avancée et un personnel de confiance"
        imageSrc="https://images.pexels.com/photos/241482/pexels-photo-241482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Demandez un devis gratuit"
        secondaryButtonText="Découvrez nos services"
      />

      {/* Section Fonctionnalités */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield size={28} />}
              title="Personnel de sécurité expert"
              description="Nos agents de sécurité suivent une formation rigoureuse et des vérifications d’antécédents pour garantir un professionnalisme exemplaire."
            />

            <FeatureCard
              icon={<Clock size={28} />}
              title="Surveillance 24h/24 et 7j/7"
              description="Des services de surveillance et d’intervention continus pour protéger vos biens en permanence."
            />

            <FeatureCard
              icon={<Award size={28} />}
              title="Certifié et assuré"
              description="Des services de sécurité entièrement agréés, cautionnés et assurés, conformes aux normes du secteur."
            />
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Protéger vos biens avec dévouement depuis 2010
              </h2>

              <p className="text-gray-600 mb-6">
                Sanziri Security est une entreprise de sécurité de premier
                plan offrant des solutions complètes pour particuliers,
                entreprises et événements. Notre équipe de professionnels
                hautement qualifiés s’engage à assurer votre sécurité et
                votre sérénité.
              </p>

              <p className="text-gray-600 mb-8">
                Forts de plus de dix ans d’expérience dans le secteur, nous
                sommes devenus des partenaires de confiance pour des clients
                variés, des résidences privées aux environnements corporatifs
                en passant par les événements spéciaux.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-2 mr-3 text-orange-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">
                      Équipe professionnelle
                    </h4>

                    <p className="text-gray-600 text-sm">
                      Experts en sécurité formés et certifiés
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-2 mr-3 text-orange-600">
                    <Lock size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">
                      Technologie moderne
                    </h4>

                    <p className="text-gray-600 text-sm">
                      Systèmes de sécurité à la pointe de la technologie
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-2 mr-3 text-orange-600">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">
                      Planning flexible
                    </h4>

                    <p className="text-gray-600 text-sm">
                      Adapté à vos besoins spécifiques
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-2 mr-3 text-orange-600">
                    <Eye size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">
                      Surveillance 24h/24
                    </h4>

                    <p className="text-gray-600 text-sm">
                      Vigilance et assistance constantes
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary">
                En savoir plus sur nous
              </Link>
            </div>

            <div className="relative fade-in-left">
              <img
                src="https://images.pexels.com/photos/3945685/pexels-photo-3945685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Professionnel de la sécurité"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />

              <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-lg hidden md:block">
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="uppercase text-sm tracking-wider">
                  Années d’expérience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services — données Django */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Nos services de sécurité"
            subtitle="Nous proposons une gamme complète de services adaptés à vos besoins spécifiques."
          />

          {servicesLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Chargement des services...
              </p>
            </div>
          ) : servicesError ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{servicesError}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Aucun service disponible pour le moment.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.slice(0, 3).map((service) => (
                  <ServiceCard
                    key={service.id}
                    icon={getServiceIcon(service.icon)}
                    title={service.title}
                    description={service.description}
                    link={`/services#${service.slug}`}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/services" className="btn btn-outline">
                  Voir tous les services
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à sécuriser ce qui compte le plus ?
            </h2>

            <p className="text-gray-300 mb-8">
              Contactez-nous dès aujourd’hui pour une consultation gratuite
              et découvrez comment Sanziri Security peut vous offrir
              sérénité, à vous, votre famille ou votre entreprise.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn btn-primary">
                Demandez un devis gratuit
              </Link>

              <Link
                to="/services"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
              >
                Découvrez nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages — données Django */}
      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Ce que disent nos clients"
            subtitle="Ne vous contentez pas de nous croire sur parole. Voici ce que nos clients satisfaits pensent de nos services."
          />

          {testimonialsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Chargement des témoignages...
              </p>
            </div>
          ) : testimonialsError ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {testimonialsError}
              </p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Aucun témoignage disponible pour le moment.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    imageSrc={
                      testimonial.image ||
                      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    rating={testimonial.rating}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/testimonials" className="btn btn-outline">
                  Lire plus de témoignages
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Blog — données Django */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Dernières actualités en sécurité"
            subtitle="Restez informé grâce à nos articles sur les tendances, conseils et nouveautés du secteur."
          />

          {postsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Chargement des articles...
              </p>
            </div>
          ) : postsError ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{postsError}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Aucun article disponible pour le moment.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(0, 3).map((post) => (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    imageSrc={post.image || FALLBACK_IMAGE}
                    date={formatDate(post.published_at)}
                    author={post.author}
                    category={post.category}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/blog" className="btn btn-outline">
                  Lire tous les articles
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;