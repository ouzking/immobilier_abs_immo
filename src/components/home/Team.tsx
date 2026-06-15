import { Phone, Mail } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { mockTeam } from '../../data/mockData';

export default function Team() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#C8102E] text-sm font-semibold uppercase tracking-widest">
            Notre équipe
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5">
            Des experts à votre service
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed">
            Une équipe passionnée et expérimentée, dédiée à la réussite de vos
            projets immobiliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockTeam.map((member, i) => (
            <div
              key={member.id}
              className="group text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="relative mx-auto w-36 h-36 mb-5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0F4C81]/20 to-[#C8102E]/20 rotate-6 group-hover:rotate-3 transition-transform duration-300" />

                <img
                  src={member.avatar}
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />

                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-lg">
                {member.name}
              </h3>

              <p className="text-[#0F4C81] text-sm font-medium mt-0.5 mb-4">
                {member.role}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="w-9 h-9 bg-gray-100 hover:bg-[#0F4C81] text-gray-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    title={member.phone}
                  >
                    <Phone size={15} />
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 bg-gray-100 hover:bg-[#C8102E] text-gray-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    title={member.email}
                  >
                    <Mail size={15} />
                  </a>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-100 hover:bg-[#0077b5] text-gray-500 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}