import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

// Numéro WhatsApp de Sanziri Security au format international, sans
// espaces ni symboles (exigé par le lien wa.me).
const WHATSAPP_NUMBER = '212721322728';

const WELCOME_MESSAGE = '👋 Bonjour et bienvenue chez Sanziri Security ! Comment pouvons-nous vous aider aujourd\'hui ?';

// Logo WhatsApp officiel (SVG inline) — plus reconnaissable qu'une
// icône générique de bulle de discussion.
const WhatsAppIcon = ({ size = 26 }: { size?: number }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.362.688 4.564 1.875 6.418L4 29l7.77-1.84A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.354l-.355-.21-4.61 1.092 1.127-4.49-.232-.368A9.71 9.71 0 0 1 5.25 15c0-5.938 4.816-10.75 10.754-10.75S26.75 9.062 26.75 15 21.94 24.75 16.004 24.75Zm5.55-7.29c-.304-.152-1.797-.887-2.076-.988-.279-.101-.482-.152-.686.152-.203.304-.787.988-.965 1.19-.177.203-.355.228-.659.076-.304-.152-1.284-.474-2.446-1.514-.904-.807-1.514-1.803-1.692-2.107-.177-.304-.019-.469.133-.62.137-.136.304-.355.456-.533.152-.177.203-.304.304-.507.101-.203.05-.38-.025-.533-.076-.152-.686-1.654-.94-2.266-.248-.596-.5-.516-.686-.526l-.585-.01a1.126 1.126 0 0 0-.812.38c-.279.304-1.066 1.042-1.066 2.542s1.092 2.949 1.244 3.152c.152.203 2.148 3.28 5.205 4.6.727.314 1.294.501 1.736.641.729.232 1.393.199 1.918.121.585-.088 1.797-.735 2.05-1.444.253-.71.253-1.317.177-1.444-.076-.127-.279-.203-.583-.355Z" />
  </svg>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-30"
        aria-label="Discuter avec nous sur WhatsApp"
      >
        {isOpen ? <X size={22} /> : <WhatsAppIcon />}
      </button>

      {/* Boîte de dialogue */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-72 sm:w-80 bg-white rounded-lg shadow-xl z-30 overflow-hidden transition-all duration-300 animate-fadeIn">
          <div className="bg-green-500 text-white p-3 flex items-center gap-2">
            <WhatsAppIcon size={22} />
            <div>
              <h3 className="font-bold text-sm">Sanziri Security</h3>
              <p className="text-xs opacity-90">Discuter avec un conseiller</p>
            </div>
            <button
              onClick={toggleChat}
              className="ml-auto text-white hover:text-gray-200"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-lg rounded-tl-none shadow-sm p-3 text-sm text-gray-700 max-w-[85%]">
              {WELCOME_MESSAGE}
            </div>
          </div>

          <form onSubmit={handleSend} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-300"
              aria-label="Envoyer sur WhatsApp"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;