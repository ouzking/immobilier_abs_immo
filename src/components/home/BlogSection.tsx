import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { mockBlogPosts } from '../../data/mockData';
import { useApp } from '../../store/AppContext';

export default function BlogSection() {
  const { navigate } = useApp();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Actualités immobilières
            </h2>
          </div>
          <button
            onClick={() => navigate('blog')}
            className="flex items-center gap-2 text-[#0F4C81] font-semibold text-sm hover:gap-3 transition-all"
          >
            Voir tous les articles <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {mockBlogPosts.map((post, i) => (
            <article
              key={post.id}
              className="group cursor-pointer"
              onClick={() => navigate('blog')}
            >
              <div className="rounded-2xl overflow-hidden mb-5 aspect-[16/10] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#0F4C81] text-white text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime} min de lecture
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#0F4C81] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                <span className="font-medium">{post.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
