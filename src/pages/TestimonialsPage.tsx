import React, { useEffect, useMemo, useState } from 'react';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import TestimonialCard from '../components/home/TestimonialCard';
import { Shield, Star } from 'lucide-react';
import { getTestimonials, Testimonial } from '../services/api';
import { useSEO } from '../hooks/useSEO';

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const TestimonialsPage = () => {
  useSEO({
    title: 'Témoignages',
    description:
      'Découvrez ce que nos clients pensent des services de sécurité de Sanziri Security.',
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Erreur lors du chargement des témoignages :', err);
        setError('Impossible de charger les témoignages pour le moment.');
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const averageRating = useMemo(() => {
    if (testimonials.length === 0) return 0;
    return (
      testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
      testimonials.length
    );
  }, [testimonials]);

  const featuredTestimonial = testimonials[0];

  return (
    <div>
      <Hero
        title="Témoignages Clients"
        subtitle="Ne vous fiez pas uniquement à notre parole – découvrez ce que nos clients disent de nos services de sécurité"
        imageSrc="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      <section className="py-12 bg-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {testimonials.length}
              </div>
              <p className="text-xl">Témoignages Clients</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {testimonials.length > 0 ? '100%' : '—'}
              </div>
              <p className="text-xl">Témoignages Publiés</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {averageRating > 0 ? `${averageRating.toFixed(1)}/5` : '—'}
              </div>
              <p className="text-xl">Note Moyenne</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Ce Que Disent Nos Clients"
            subtitle="Découvrez les témoignages d’entreprises et de particuliers qui ont fait confiance à nos services de sécurité"
          />

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement des témoignages...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Impossible de charger les témoignages
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Aucun témoignage disponible
              </h3>
              <p className="text-gray-600">
                Les témoignages de nos clients seront bientôt disponibles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  imageSrc={testimonial.image || FALLBACK_IMAGE}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {featuredTestimonial && (
        <section className="section bg-gray-50">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="flex mb-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-6 w-6 ${
                          index < featuredTestimonial.rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-8">
                    « {featuredTestimonial.quote} »
                  </blockquote>

                  <div className="flex items-center">
                    <img
                      src={featuredTestimonial.image || FALLBACK_IMAGE}
                      alt={featuredTestimonial.author}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg">
                        {featuredTestimonial.author}
                      </h4>
                      <p className="text-gray-600">
                        {featuredTestimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-center bg-cover hidden lg:block"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-custom">
          <SectionTitle
            title="Témoignages Vidéo"
            subtitle="Regardez nos clients partager leur expérience avec Sanziri Security"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Succès en Sécurité d’Entreprise",
                description:
                  "Découvrez comment nous avons sécurisé le siège de Tech Innovations et mis en place des protocoles de sécurité complets.",
                name: 'John Davis',
                role: 'CTO, Tech Innovations',
                image:
                  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
              {
                title: 'Excellence en Sécurité Événementielle',
                description:
                  'Apprenez comment nous avons garanti la sécurité de plus de 5 000 participants lors de la Conférence Annuelle des Affaires.',
                name: 'Lisa Thompson',
                role: 'Directrice Événementielle, Global Events',
                image:
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              },
            ].map((video) => (
              <div key={video.title} className="rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6">
                      <Shield className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        Témoignage Vidéo
                      </h3>
                      <p className="text-gray-600">Vidéo client disponible ici</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex items-center">
                    <img
                      src={video.image}
                      alt={video.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium">{video.name}</div>
                      <div className="text-sm text-gray-500">{video.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Reconnus par les Leaders du Secteur"
            subtitle="Nous fournissons des services de sécurité à des entreprises et organisations de divers secteurs"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-24"
              >
                <div className="text-center text-gray-400">
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-medium">Logo Client</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à bénéficier de nos services de sécurité ?
            </h2>
            <p className="text-gray-300 mb-8">
              Rejoignez nos clients satisfaits et découvrez comment Sanziri Security peut vous offrir protection et sérénité.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn btn-primary">
                Obtenir un devis gratuit
              </a>
              <a
                href="/services"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
              >
                Découvrez nos services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;