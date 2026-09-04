const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";


/* Function to create an order (panier) */

export interface OrderItemInput {
  product: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  order_items: OrderItemInput[];
}

export async function createOrder(data: CreateOrderPayload) {
  const response = await fetch(`${API_BASE_URL}/products/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Impossible d'envoyer la commande."
    );
  }

  return response.json();
}

/* Function to send contact message */

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website?: string;
}) 
{
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Une erreur est survenue lors de l'envoi du message."
    );
  }

  return response.json();
}

/* Product interface and functions to fetch products */

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  price: number;
  image: string | null;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  related_products: number[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits.");
  }

  const data = await response.json();

  return data.map((product: Product) => ({
    ...product,
    price: Number(product.price),
  }));
}

export async function getProduct(slug: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}/`);

  if (!response.ok) {
    throw new Error("Produit introuvable.");
  }

  const data = await response.json();

  return {
    ...data,
    price: Number(data.price),
  };
}

/* BlogPost interface and functions to fetch blog posts */

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  category: string;
  tags: string[];
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE_URL}/blog/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les articles.");
  }

  return response.json();
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blog/${slug}/`);

  if (!response.ok) {
    throw new Error("Article introuvable.");
  }

  return response.json();
}

/* Testimonial interface and function to fetch testimonials */

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string | null;
  rating: number;
  category: string;
}
export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await fetch(`${API_BASE_URL}/core/testimonials/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les témoignages.");
  }

  return response.json();
}

/* Service interface and functions to fetch services */

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: string;
  image: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/core/services/`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les services.");
  }

  return response.json();
}

export async function getService(slug: string): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/core/services/${slug}/`);

  if (!response.ok) {
    throw new Error("Service introuvable.");
  }

  return response.json();
}

export async function subscribeToNewsletter(email: string, website?: string) {
  const response = await fetch(`${API_BASE_URL}/contact/newsletter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, website }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.email?.[0] ||
      data?.detail ||
      "Impossible de vous inscrire à la newsletter."
    );
  }

  return data;
}