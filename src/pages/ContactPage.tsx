import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Users, Building, Calendar } from 'lucide-react';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import ContactForm from '../components/contact/ContactForm';
import { useSEO } from '../hooks/useSEO';

const ContactPage = () => {
  useSEO({
    title: 'Contact',
    description:
      'Échangez avec nos experts en sécurité pour discuter de vos besoins. Contactez Sanziri Security dès aujourd\'hui.',
  });

  return (
    <div>
      {/* Section Héro */}
      <Hero 
        title="Contactez-nous"
        subtitle="Échangez avec nos experts en sécurité pour discuter de vos besoins"
        imageSrc="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        size="md"
      />

      {/* Informations de contact et formulaire */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600 mb-8">
                Que vous ayez des questions concernant nos services de sécurité, besoin d'une solution personnalisée, ou souhaitiez demander un devis, notre équipe est là pour vous aider. Remplissez le formulaire ou contactez-nous directement en utilisant les informations ci-dessous.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Notre emplacement</h3>
                    <p className="text-gray-600">
                      123 avenue de la Sécurité, Quartier des Affaires<br />
                      Ville, Pays, 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+1234567890" className="hover:text-orange-600 transition-colors duration-300">+1 (234) 567-890</a><br />
                      <a href="tel:+1234567891" className="hover:text-orange-600 transition-colors duration-300">+1 (234) 567-891</a> (Urgence)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@sanzirisecurity.com" className="hover:text-orange-600 transition-colors duration-300">info@sanzirisecurity.com</a><br />
                      <a href="mailto:support@sanzirisecurity.com" className="hover:text-orange-600 transition-colors duration-300">support@sanzirisecurity.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-3 mr-4 text-orange-600 flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Heures d'ouverture</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 8h00 - 18h00<br />
                      Samedi : 9h00 - 14h00<br />
                      Dimanche : Fermé<br />
                      <span className="text-orange-600 font-medium">Assistance d'urgence 24h/24 et 7j/7 disponible</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              <div>
                <h3 className="font-bold mb-3">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-200 hover:bg-orange-600 hover:text-white p-2 rounded-full transition-colors duration-300" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.52-4.48-10-10-10z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-orange-600 hover:text-white p-2 rounded-full transition-colors duration-300" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-orange-600 hover:text-white p-2 rounded-full transition-colors duration-300" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-orange-600 hover:text-white p-2 rounded-full transition-colors duration-300" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section Carte */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Notre Localisation"
            subtitle="Visitez notre bureau principal ou contactez-nous pour une évaluation de sécurité sur site"
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200">
              {/* La carte sera intégrée ici */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Carte Google</h3>
                  <p className="text-gray-600">Une carte interactive sera affichée ici</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Siège social</h3>
                  <p className="text-gray-600">
                    123 avenue de la Sécurité<br />
                    Quartier des Affaires<br />
                    Ville, Pays 12345
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Bureau régional</h3>
                  <p className="text-gray-600">
                    456 rue de la Protection<br />
                    Centre-ville<br />
                    Ville, Pays 67890
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Centre de formation</h3>
                  <p className="text-gray-600">
                    789 route de la Défense<br />
                    Zone industrielle<br />
                    Ville, Pays 45678
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="Questions Fréquentes"
            subtitle="Trouvez les réponses aux questions courantes sur nos services de sécurité"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Proposez-vous des services de sécurité 24h/24 et 7j/7 ?</h3>
              <p className="text-gray-600">
                Oui, nous offrons des services de sécurité continus pour les entreprises, événements et résidences. Notre équipe est disponible 24h/24 et 7j/7 pour garantir votre sécurité en permanence.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Quelle est votre rapidité d'intervention en cas d'urgence ?</h3>
              <p className="text-gray-600">
                Notre temps de réponse dépend de votre localisation, mais nous nous engageons à intervenir rapidement. Pour les clients avec services de surveillance, notre délai moyen est inférieur à 10 minutes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Votre personnel de sécurité est-il agréé et assuré ?</h3>
              <p className="text-gray-600">
                Oui, tout notre personnel est entièrement agréé, cautionné et assuré. Ils passent des vérifications approfondies et reçoivent une formation intensive pour garantir un professionnalisme et une expertise de haut niveau.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Proposez-vous des solutions de sécurité personnalisées ?</h3>
              <p className="text-gray-600">
                Absolument. Nous savons que chaque client a des besoins uniques en matière de sécurité. Nous réalisons des évaluations complètes pour développer des solutions adaptées à vos besoins spécifiques.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Avec quels types d'entreprises travaillez-vous habituellement ?</h3>
              <p className="text-gray-600">
                Nous travaillons avec une large gamme d'entreprises, y compris commerces de détail, immeubles de bureaux, usines, établissements de santé, écoles, et plus encore. Nos services s'adaptent à toutes tailles et secteurs.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Comment puis-je demander une évaluation de sécurité pour ma propriété ?</h3>
              <p className="text-gray-600">
                Vous pouvez demander une évaluation de sécurité en remplissant le formulaire de contact sur cette page, en appelant notre bureau ou en nous envoyant un email. Un expert en sécurité vous contactera pour convenir d'un rendez-vous.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas votre question ici ? Contactez-nous directement pour plus d'informations.
            </p>
            <a href="tel:+1234567890" className="btn btn-primary">
              Appelez-nous maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Aperçu des Services */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Nos Services de Sécurité"
            subtitle="Découvrez notre gamme complète de solutions de sécurité"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/services#personal" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité personnelle</h3>
              <p className="text-gray-600 mb-4">
                Services de protection personnalisés pour particuliers, cadres et VIP.
              </p>
              <span className="text-orange-600 font-medium hover:underline">En savoir plus</span>
            </Link>

            <Link to="/services#business" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité des entreprises</h3>
              <p className="text-gray-600 mb-4">
                Solutions complètes de sécurité pour entreprises de toutes tailles.
              </p>
              <span className="text-orange-600 font-medium hover:underline">En savoir plus</span>
            </Link>

            <Link to="/services#event" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="rounded-full bg-orange-100 p-4 w-16 h-16 flex items-center justify-center text-orange-600 mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité événementielle</h3>
              <p className="text-gray-600 mb-4">
                Services professionnels de sécurité pour événements de toutes tailles.
              </p>
              <span className="text-orange-600 font-medium hover:underline">En savoir plus</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à renforcer votre sécurité ?</h2>
            <p className="text-white opacity-90 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins en sécurité et découvrir comment Sanziri Security peut vous offrir la protection et la tranquillité d'esprit que vous méritez.
            </p>
            <a href="tel:+1234567890" className="btn bg-white text-orange-600 hover:bg-gray-100">
              Appelez-nous : +1 (234) 567-890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;