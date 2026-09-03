import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Hero from '../components/common/Hero';
import { getBlogPost, BlogPost } from '../services/api';
import { useSEO } from '../hooks/useSEO';

  const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useSEO({
    title: post ? post.title : 'Article',
    description: post
      ? post.excerpt
      : 'Actualités et conseils en sécurité par Sanziri Security.',
    image: post?.image || undefined,
  });

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Article introuvable.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const data = await getBlogPost(slug);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger l'article.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Article introuvable
          </h1>

          <p className="text-gray-600 mb-6">
            {error || "Cet article n'existe pas ou n'est plus disponible."}
          </p>

          <Link
            to="/blog"
            className="btn btn-primary inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div>
      {/* Hero */}
      <Hero
        title={post.title}
        subtitle={post.excerpt}
        imageSrc={
          post.image ||
          'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        size="md"
      />

      {/* Article */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Retour au blog */}
            <Link
              to="/blog"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour au blog
            </Link>

            {/* Informations de l'article */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              {post.category && (
                <span className="inline-flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              )}

              {formattedDate && (
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formattedDate}
                </span>
              )}

              {post.author && (
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </span>
              )}
            </div>

            {/* Contenu */}
            <article className="bg-white rounded-lg shadow-md p-6 md:p-10">
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && 
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                    </p>
                  ))}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="border-t border-gray-200 mt-10 pt-6">
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="h-5 w-5 text-gray-500 mr-1" />

                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Retour */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="btn btn-primary inline-flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voir tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;