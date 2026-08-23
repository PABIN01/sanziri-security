import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Building, Calendar, ShieldCheck, Lock, Eye, Cpu, 
  BadgeAlert, BookOpen, ChevronRight, Phone 
} from 'lucide-react';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import { getServices, Service } from '../services/api';
import { useSEO } from '../hooks/useSEO';

const serviceIcons: Record<string, React.ReactNode> = {
  'securite-personnelle': <Users size={28} aria-hidden="true" />,
  'securite-entreprise': <Building size={28} aria-hidden="true" />,
  'securite-evenementielle': <Calendar size={28} aria-hidden="true" />,
  'systemes-de-securite': <Cpu size={28} aria-hidden="true" />,
  'consultation-en-securite': <BadgeAlert size={28} aria-hidden="true" />,
  'formation-en-securite': <BookOpen size={28} aria-hidden="true" />,
};

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  id 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[];
  id: string;
}) => {
  return (
    <div id={id} className="bg-white rounded-lg shadow-md overflow-hidden group p-8" role="region" aria-labelledby={`${id}-title`}>
      <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      <h3 id={`${id}-title`} className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6" aria-label={`Principaux avantages du service ${title}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <ShieldCheck className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        to="/contact" 
        className="inline-flex items-center text-orange-600 font-medium hover:underline"
        aria-label={`Demander le service ${title}`}
      >
        Demander un service <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

const ServicesPage = () => {
  useSEO({
    title: 'Nos Services',
    description:
      'Solutions complètes de sécurité professionnelle : services sur mesure pour protéger vos biens, votre entreprise et vos proches.',
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch {
        setError("Impossible de charger les services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div>
      {/* Section Hero */}
      <Hero 
        title="Solutions complètes de sécurité professionnelle"
        subtitle="Des services sur mesure pour protéger efficacement vos biens, votre entreprise et vos proches"
        imageSrc="https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      {/* Aperçu des services */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Des solutions de sécurité adaptées à tous vos besoins</h2>
            <p className="text-gray-600">
              Chez <strong>Sanziri Sécurité</strong>, nous proposons une large gamme de services professionnels conçus pour protéger efficacement les particuliers, les entreprises et les événements. Grâce à notre expertise reconnue et nos équipes hautement qualifiées, nous vous garantissons une tranquillité d’esprit optimale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <Users size={40} className="mx-auto mb-4 text-orange-500" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">Sécurité personnelle</h3>
              <p className="text-gray-300">Protection experte pour particuliers, cadres et familles</p>
            </div>
            
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <Building size={40} className="mx-auto mb-4 text-orange-500" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">Sécurité d’entreprise</h3>
              <p className="text-gray-300">Solutions complètes pour la protection de vos locaux et équipes</p>
            </div>
            
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <Calendar size={40} className="mx-auto mb-4 text-orange-500" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">Sécurité événementielle</h3>
              <p className="text-gray-300">Gestion sécuritaire professionnelle pour événements de toutes tailles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Nos services de sécurité spécialisés"
            subtitle="Des solutions flexibles et personnalisées, adaptées à vos enjeux spécifiques"
          />
          
<div className="space-y-12">
  {loading && (
    <p className="text-center text-gray-600">
      Chargement des services...
    </p>
  )}

  {error && (
    <p className="text-center text-red-600">
      {error}
    </p>
  )}

  {!loading && !error && services.map((service) => (
    <ServiceCard
      key={service.id}
      id={service.slug}
      icon={
        serviceIcons[service.slug] ?? (
          <ShieldCheck size={28} aria-hidden="true" />
        )
      }
      title={service.title}
      description={service.description}
      features={service.features}
    />
  ))}
</div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pourquoi choisir <strong>Sanziri Sécurité</strong> ?</h2>
              <p className="text-gray-600 mb-8">
                En nous choisissant, vous bénéficiez d’une équipe dévouée et experte, prête à vous offrir des services de sécurité fiables et personnalisés. Voici nos principaux atouts :
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Users size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Personnel expérimenté et qualifié</h4>
                    <p className="text-gray-600">
                      Notre équipe regroupe des professionnels issus des forces armées, de la police et de la sécurité privée, garantissant expertise et rigueur.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Lock size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Technologies de pointe</h4>
                    <p className="text-gray-600">
                      Nous intégrons les équipements les plus récents pour maximiser votre sécurité et réactivité face aux incidents.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Eye size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Disponibilité 24 heures sur 24, 7 jours sur 7</h4>
                    <p className="text-gray-600">
                      Notre présence continue vous assure une protection constante, où que vous soyez et quand vous en avez besoin.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <ShieldCheck size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Approche personnalisée et humaine</h4>
                    <p className="text-gray-600">
                      Chaque client est unique, nous adaptons nos stratégies pour répondre précisément à vos exigences et contraintes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8948347/pexels-photo-8948347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Professionnel de la sécurité en action" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-orange-600 text-white" aria-label="Appel à l'action pour contacter Sanziri Sécurité">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à sécuriser votre avenir ?</h2>
              <p className="text-white opacity-90 mb-8">
                Contactez dès maintenant notre équipe pour une consultation gratuite. Découvrez comment <strong>Sanziri Sécurité</strong> peut devenir votre partenaire de confiance.
              </p>
              <Link to="/contact" className="btn bg-white text-orange-600 hover:bg-gray-100" aria-label="Contactez Sanziri Sécurité">
                Nous contacter
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm" role="region" aria-labelledby="contact-phone-title">
              <div className="flex items-center mb-6">
                <Phone className="h-10 w-10 text-white mr-4" aria-hidden="true" />
                <div>
                  <p className="text-white opacity-80">Appelez-nous directement</p>
                  <h3 id="contact-phone-title" className="text-2xl font-bold">+1 (234) 567-890</h3>
                </div>
              </div>
              <p className="text-white opacity-90 mb-6">
                Nos consultants en sécurité sont disponibles 24/7 pour répondre à toutes vos questions et vous accompagner rapidement.
              </p>
              <div className="flex space-x-4">
                <Link to="/contact" className="btn bg-black text-white hover:bg-gray-900" aria-label="Demander un devis personnalisé">
                  Demander un devis
                </Link>
                <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-orange-600" aria-label="Planifier une consultation avec un expert">
                  Planifier une consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;