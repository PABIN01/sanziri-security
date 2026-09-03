import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Building, Clock, Calendar, Award, Target, ChevronRight } from 'lucide-react';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import FeatureCard from '../components/home/FeatureCard';
import { useSEO } from '../hooks/useSEO';

const AboutPage = () => {
  useSEO({
    title: 'À propos',
    description:
      "L'excellence en sécurité depuis 2010. Découvrez l'équipe, les valeurs et l'engagement de Sanziri Security au service de votre protection.",
  });

  return (
    <div>
      {/* Section Héros */}
      <Hero 
        title="À propos de Sanziri Security"
        subtitle="L’excellence en sécurité depuis 2010"
        imageSrc="https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      {/* Notre Histoire */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-6">
                Fondée en 2010 par d’anciens professionnels de l’armée et des forces de l’ordre, Sanziri Security est née d’une volonté de proposer des services de sécurité d’élite, dépassant les standards du secteur.
              </p>
              <p className="text-gray-600 mb-6">
                D’une petite équipe de passionnés, nous sommes devenus un acteur majeur offrant des solutions complètes dans plusieurs villes. Malgré notre croissance, nos valeurs fondamentales demeurent : intégrité, excellence et service client personnalisé.
              </p>
              <p className="text-gray-600 mb-6">
                Au fil des années, nous avons sécurisé des événements majeurs, protégé de nombreuses entreprises et assuré la tranquillité d’esprit de milliers de familles. Notre réputation repose sur la confiance, le professionnalisme et les résultats.
              </p>
              <p className="text-gray-600">
                Aujourd’hui, Sanziri Security est un leader du secteur, alliant innovation et engagement pour protéger ce qui compte le plus pour nos clients.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 fade-in-left">
              <img 
                src="https://images.pexels.com/photos/5851032/pexels-photo-5851032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Équipe de sécurité" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Centre de surveillance" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/7988945/pexels-photo-7988945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Agent de sécurité" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/15387089/pexels-photo-15387089/free-photo-of-surveillance-camera-and-traffic-sign.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Caméra de surveillance" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
              <p className="text-gray-600 mb-6">
                Offrir des services de sécurité exceptionnels pour protéger les biens, les personnes et la tranquillité d’esprit de nos clients, grâce à une équipe hautement qualifiée, des technologies avancées et des solutions personnalisées.
              </p>
              <p className="text-gray-600">
                Nous nous engageons à définir les standards de fiabilité, de professionnalisme et d’efficacité dans l’ensemble du secteur de la sécurité.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
              <p className="text-gray-600 mb-6">
                Être la société de sécurité la plus respectée et digne de confiance, reconnue pour l’excellence de ses services, son approche innovante et son engagement constant à protéger ce qui compte le plus.
              </p>
              <p className="text-gray-600">
                Nous aspirons à un monde plus sûr, où chacun peut évoluer en toute confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs fondamentales */}
      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Valeurs Fondamentales"
            subtitle="Des principes qui guident chaque action chez Sanziri Security"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={28} />}
              title="Intégrité"
              description="Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos décisions et actions."
            />
            <FeatureCard 
              icon={<Award size={28} />}
              title="Excellence"
              description="Nous visons l’excellence à chaque étape — formation, technologie, relation client et service terrain."
            />
            <FeatureCard 
              icon={<Users size={28} />}
              title="Respect"
              description="Nous respectons toutes les personnes avec lesquelles nous interagissons : clients, partenaires, collaborateurs et public."
            />
            <FeatureCard 
              icon={<Clock size={28} />}
              title="Fiabilité"
              description="Nous offrons un service constant, fiable et à la hauteur des attentes, quelles que soient les circonstances."
            />
            <FeatureCard 
              icon={<Calendar size={28} />}
              title="Adaptabilité"
              description="Nous évoluons en permanence pour répondre aux nouvelles menaces et aux besoins changeants de nos clients."
            />
            <FeatureCard 
              icon={<Building size={28} />}
              title="Engagement communautaire"
              description="Nous contribuons activement à la sécurité et au bien-être des communautés où nous intervenons."
            />
          </div>
        </div>
      </section>

      {/* Équipe de direction */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Équipe de Direction"
            subtitle="Des experts passionnés au service de votre sécurité"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Gérard Padou Pabingui" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Gérard Padou Pabingui</h3>
                <p className="text-orange-600 mb-3">PDG & Fondateur</p>
                <p className="text-gray-600 mb-4">
                  Ancien officier militaire avec plus de 20 ans d’expérience en sécurité. Gérard a fondé Sanziri Security avec une vision claire : redéfinir les normes du secteur par l’excellence.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Gaëtan Stéphane Pabingui" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Gaëtan Stéphane Pabingui</h3>
                <p className="text-orange-600 mb-3">Directrice des opérations</p>
                <p className="text-gray-600 mb-4">
                  Experte en gestion et sécurité, elle supervise les opérations pour garantir une exécution rigoureuse, efficace et conforme à nos standards de qualité.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Bruno Suzan Pabingui" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Bruno Suzan Pabingui</h3>
                <p className="text-orange-600 mb-3">Directeur des technologies</p>
                <p className="text-gray-600 mb-4">
                  Spécialiste des solutions technologiques en sécurité avec 15 ans d’expérience, il pilote notre stratégie d’innovation et de transformation numérique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l’action */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Rejoignez l’équipe Sanziri Security</h2>
            <p className="text-gray-300 mb-8">
              Nous recrutons des professionnels motivés par l’excellence. Vous partagez notre vision ? Parlons-en !
            </p>
            <Link to="/contact" className="btn btn-primary">
              Découvrez nos opportunités de carrière <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;