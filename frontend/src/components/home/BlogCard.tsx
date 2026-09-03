import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  date: string;
  author: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  imageSrc,
  date,
  author,
  category
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors duration-300">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>

        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>

          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;