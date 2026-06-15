import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/221774308344"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
      aria-label="Contacter via WhatsApp"
    >
      <span className="hidden group-hover:flex items-center bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap animate-fadeIn">
        Discutons sur WhatsApp !
      </span>
      <div className="w-14 h-14 bg-[#25D366] hover:bg-[#1da851] rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-300/50 hover:scale-110 transition-all duration-300">
        <MessageCircle size={26} className="text-white" fill="white" />
      </div>
    </a>
  );
}
