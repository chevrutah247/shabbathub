import Link from 'next/link';
import { FileText, Calendar, Globe, ExternalLink } from 'lucide-react';
import documentsData from '@/data/documents.json';

// Типы
interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  parasha: string;
  language: string;
  date: string;
  pdfUrl: string;
  pages: number;
  thumbnailUrl: string;
}

const languageLabels: Record<string, string> = {
  ru: 'Русский',
  he: 'עברית',
  en: 'English',
};

const languageFlags: Record<string, string> = {
  ru: '🇷🇺',
  he: '🇮🇱',
  en: '🇺🇸',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function FeaturedDocuments() {
  const documents = documentsData.documents as Document[];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.slice(0, 6).map((doc) => (
        <article
          key={doc.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
        >
          {/* PDF Preview / Thumbnail */}
          <div className="relative aspect-[8.5/6] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {/* Placeholder для превью PDF */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">{doc.pages} стр.</span>
              </div>
            </div>
            
            {/* Overlay на hover */}
            <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link
                href={doc.pdfUrl}
                target="_blank"
                className="flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-full font-medium hover:bg-gold-400 transition-colors"
              >
                <ExternalLink size={18} />
                Открыть PDF
              </Link>
            </div>

            {/* Language badge */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1">
              <span>{languageFlags[doc.language]}</span>
              <span>{languageLabels[doc.language]}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Parasha tag */}
            {doc.parasha && (
              <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-3">
                📖 {doc.parasha}
              </span>
            )}

            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
              {doc.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {doc.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(doc.date)}
              </div>
              <Link
                href={`/document/${doc.id}`}
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Подробнее →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
