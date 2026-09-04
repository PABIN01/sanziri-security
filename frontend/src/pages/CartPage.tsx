import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { useSEO } from '../hooks/useSEO';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

const CartPage = () => {
  useSEO({
    title: 'Mon Panier',
    description: 'Consultez et validez votre commande de produits Sanziri Security.',
  });

  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      await createOrder({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || undefined,
        order_items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });
      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitError(
        "Impossible d'envoyer votre commande. Vérifiez votre connexion et réessayez."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container-custom py-24 text-center">
        <div className="max-w-lg mx-auto bg-green-50 border border-green-200 rounded-lg p-8">
          <p className="text-green-700 font-medium text-lg">
            Votre commande a été prise en compte. Vous serez contacté pour la confirmation.
          </p>
          <Link to="/products" className="btn btn-primary mt-6 inline-block">
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <Link to="/products" className="btn btn-primary inline-block">
          Voir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-24">
      <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-100 p-4"
            >
              {item.product.image && (
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                />
              )}

              <div className="flex-grow min-w-0">
                <h3 className="font-medium truncate">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatPrice(item.product.price)} / unité
                </p>
              </div>

              <div className="flex items-center border rounded-md">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100"
                  aria-label="Diminuer la quantité"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 min-w-[2rem] text-center">{item.quantity}</span>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100"
                  aria-label="Augmenter la quantité"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="w-24 text-right font-medium">
                {formatPrice(item.product.price * item.quantity)}
              </div>

              <button
                type="button"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label={`Retirer ${item.product.name} du panier`}
                onClick={() => removeFromCart(item.product.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Récapitulatif + formulaire */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Sous-total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Frais de livraison</span>
            <span className="text-green-600 font-medium">Gratuit</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-4 mb-6">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optionnel)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="form-input w-full"
              />
            </div>

            {submitError && (
              <p className="text-red-600 text-sm">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {submitting ? 'Envoi en cours...' : 'Valider ma commande'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;