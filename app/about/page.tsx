import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={20} /> На главную
        </Link>
        
        <h1 className="text-4xl font-bold text-primary-900 mb-6">О проекте ShabbatHub</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p>
            <strong>ShabbatHub</strong> — это бесплатный онлайн-архив материалов к Шаббату.
          </p>
          
          <p>
            Мы собираем и систематизируем еженедельные газеты, учебные материалы 
            и статьи на русском, иврите и английском языках, чтобы сделать 
            еврейское знание доступным для всех.
          </p>
          
          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Что у нас есть:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>📰 Еженедельные газеты (Chevrutah, Шомрей Шабос и др.)</li>
            <li>📚 Учебные материалы и статьи</li>
            <li>🕎 Материалы к праздникам</li>
            <li>👥 Группы для изучения Торы</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Контакты</h2>
          <p>
            По вопросам сотрудничества пишите на: <a href="mailto:info@shabbathub.com" className="text-primary-600 hover:underline">info@shabbathub.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
