import Link from 'next/link';
import { Heart, Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold">
                <span className="text-white">Shabbat</span>
                <span className="text-gold-400">Hub</span>
              </span>
            </Link>
            <p className="text-blue-200 mb-4 max-w-md">
              Бесплатный онлайн-архив материалов к Шаббату. 
              Делаем еврейское знание доступным для всех.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:contact@shabbathub.com"
                className="text-blue-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-400">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  Последние выпуски
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  Поиск
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-400">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  Поддержать проект
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              © {currentYear} ShabbatHub. Все материалы распространяются бесплатно.
            </p>
            <p className="text-blue-300 text-sm flex items-center gap-1">
              Сделано с <Heart size={14} className="text-red-400" /> для еврейской общины
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
