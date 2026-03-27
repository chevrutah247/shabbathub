'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, UtensilsCrossed, Package, Loader2, BookOpenText, ScrollText, ShieldCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

type Item = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  country: string | null;
  city: string | null;
  district: string | null;
  dishes: string[] | null;
  products: string[] | null;
  photos: string[] | null;
  seller_name: string | null;
  seller_contact: string | null;
};

type LawPoint = {
  id: string;
  text: string;
  sourceTitle: string;
  sourceUrl: string;
};

const rebbeLetters = [
  {
    title: 'Письмо №984: доверие Всевышнему в реальных трудностях',
    summary: 'Ребе подчеркивает: вера должна не оставаться мыслью, а входить в повседневную жизнь и убирать парализующую тревогу.',
    url: 'https://www.chabad.org/therebbe/letters/default_cdo/aid/2275000/jewish/Trust-in-G-d-confidence-that-the-blessings-given-by-the-Rebbe-Rayatz-will-be-fulfilled.htm',
  },
  {
    title: 'Письмо №989: битахон и влияние на душевное/физическое состояние',
    summary: 'Практический акцент на спокойствие, внутреннюю устойчивость и позитивный взгляд как часть духовной работы.',
    url: 'https://www.chabad.org/therebbe/letters/default_cdo/aid/3905687/jewish/The-importance-of-trust-in-G-d-the-effect-of-such-trust-on-ones-physical-health.htm',
  },
  {
    title: 'Тема писем: служение Всевышнему с радостью',
    summary: 'Подборка писем Ребе о том, как выходить из состояния упадка через радость, действие и доверие.',
    url: 'https://www.chabad.org/therebbe/letters/default_cdo/aid/5291132/jewish/Happiness-and-Joy.htm',
  },
];

const lawPoints: LawPoint[] = [
  {
    id: 'kashrut-honesty',
    text: 'Я не публикую ложную информацию о кашруте, составе и способе приготовления.',
    sourceTitle: "Шулхан Арух, Йоре Деа 119 (неэманут в вопросах иссур/кашрут)",
    sourceUrl: 'https://www.sefaria.org/Shulchan_Arukh%2C_Yoreh_De%27ah.119',
  },
  {
    id: 'no-deception',
    text: 'Я не ввожу покупателя в заблуждение (цена, вес, описание, фото, происхождение).',
    sourceTitle: 'Шулхан Арух, Хошен Мишпат 228 (онаа/геневат даат в торговле)',
    sourceUrl: 'https://www.sefaria.org/Shulchan_Arukh%2C_Choshen_Mishpat.228',
  },
  {
    id: 'lifnei-iver',
    text: 'Я не провоцирую других на нарушение запретов (lifnei iver).',
    sourceTitle: 'Ваикра 19:14 (לפני עיור לא תתן מכשול)',
    sourceUrl: 'https://www.sefaria.org/Leviticus.19.14',
  },
  {
    id: 'fair-measures',
    text: 'Я соблюдаю честные меры, вес и расчет с покупателем.',
    sourceTitle: 'Дварим 25:15 (честные меры и веса)',
    sourceUrl: 'https://www.sefaria.org/Deuteronomy.25.15',
  },
];

export default function MarketplacePage() {
  const [q, setQ] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [dishes, setDishes] = useState('');
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [sellerName, setSellerName] = useState('');
  const [sellerContact, setSellerContact] = useState('');
  const [sellerCity, setSellerCity] = useState('');
  const [rabbiName, setRabbiName] = useState('');
  const [rabbiContact, setRabbiContact] = useState('');
  const [motivation, setMotivation] = useState('');
  const [checkedLawIds, setCheckedLawIds] = useState<string[]>([]);
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (country.trim()) p.set('country', country.trim());
    if (city.trim()) p.set('city', city.trim());
    if (district.trim()) p.set('district', district.trim());
    if (dishes.trim()) p.set('dishes', dishes.trim());
    if (products.trim()) p.set('products', products.trim());
    p.set('limit', '30');
    return p.toString();
  }, [q, country, city, district, dishes, products]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/marketplace/search?' + queryString);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || 'Ошибка поиска');
      setItems(Array.isArray(payload?.items) ? payload.items : []);
    } catch (err: any) {
      setError(err?.message || 'Ошибка поиска');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLaw = (id: string) => {
    setCheckedLawIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);
    if (!sellerName.trim() || !sellerContact.trim() || !sellerCity.trim()) {
      setFormMsg('Заполни обязательные поля: имя, контакт и город.');
      return;
    }
    if (checkedLawIds.length !== lawPoints.length) {
      setFormMsg('Подтверди все пункты с законами и первоисточниками.');
      return;
    }
    setFormMsg('Анкета заполнена. Следующий шаг: добавить серверное сохранение и отправку в админ-проверку.');
  };

  return (
    <div className="min-h-screen wood-bg px-4 py-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800&family=Source+Serif+4:wght@400;600&family=DM+Sans:wght@400;500;700&display=swap');
        .wood-bg {
          background:
            radial-gradient(circle at 20% 10%, rgba(255, 222, 173, 0.18), transparent 35%),
            radial-gradient(circle at 80% 0%, rgba(92, 51, 23, 0.18), transparent 30%),
            linear-gradient(180deg, #f2e4cf 0%, #e9d6b8 42%, #e0c8a4 100%);
        }
        .grain-card {
          background:
            linear-gradient(125deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%),
            repeating-linear-gradient(0deg, rgba(120,73,44,0.06) 0px, rgba(120,73,44,0.06) 2px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 8px),
            linear-gradient(135deg, #f7ecd9 0%, #ecd8b9 100%);
          border: 1px solid rgba(122, 72, 35, 0.25);
          box-shadow: 0 12px 32px rgba(89, 54, 28, 0.14), inset 0 1px 0 rgba(255,255,255,0.45);
        }
        .wood-input {
          background: rgba(255, 250, 241, 0.9);
          border: 1px solid rgba(122,72,35,0.28);
          font-family: 'DM Sans', sans-serif;
        }
        .wood-input:focus {
          outline: none;
          border-color: #9a5c2c;
          box-shadow: 0 0 0 3px rgba(154, 92, 44, 0.15);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <section className="grain-card rounded-3xl p-6 md:p-8 mb-8">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-900/80 font-semibold mb-3">
            <Sparkles size={14} /> ShabbatHub Marketplace
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Кошерный маркетплейс
          </h1>
          <p className="text-stone-700 mt-3 max-w-3xl" style={{ fontFamily: "'Source Serif 4', serif" }}>
            Поиск по странам, городам, районам, блюдам и продуктам. Ниже — анкета продавца в формате общинного стандарта с источниками галахи и блоком вдохновения.
          </p>
        </section>

        <section className="grain-card rounded-3xl p-5 md:p-6 mb-10">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <div className="md:col-span-2 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Общий поиск" aria-label="Поиск" className="wood-input w-full pl-9 pr-3 py-2.5 rounded-lg" />
              </div>
              <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Страна" aria-label="Страна" className="wood-input px-3 py-2.5 rounded-lg" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" aria-label="Город" className="wood-input px-3 py-2.5 rounded-lg" />
              <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Район" aria-label="Район" className="wood-input px-3 py-2.5 rounded-lg" />
              <button type="submit" disabled={loading} className="rounded-lg px-4 py-2.5 bg-amber-900 text-amber-50 hover:bg-amber-800 disabled:opacity-60 inline-flex items-center justify-center gap-2">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} Найти
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <UtensilsCrossed size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input value={dishes} onChange={(e) => setDishes(e.target.value)} placeholder="Блюда (через запятую)" aria-label="Блюда" className="wood-input w-full pl-9 pr-3 py-2.5 rounded-lg" />
              </div>
              <div className="relative">
                <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input value={products} onChange={(e) => setProducts(e.target.value)} placeholder="Продукты (через запятую)" aria-label="Продукты" className="wood-input w-full pl-9 pr-3 py-2.5 rounded-lg" />
              </div>
            </div>
          </form>
        </section>

        {error && <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">{error}</div>}

        {loading ? (
          <div className="py-24 flex items-center justify-center"><Loader2 className="animate-spin text-stone-600" /></div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-stone-700 grain-card rounded-2xl">Нет объявлений по вашему запросу</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {items.map((item) => {
              const photo = Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : null;
              return (
                <article key={item.id} className="grain-card rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-stone-200 relative">
                    {photo ? <Image src={photo} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-500">Без фото</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 mb-1 line-clamp-1">{item.title}</h3>
                    <div className="text-sm text-stone-700 flex items-center gap-1 mb-2"><MapPin size={14} />{[item.country, item.city, item.district].filter(Boolean).join(', ') || 'Локация не указана'}</div>
                    {item.description && <p className="text-sm text-stone-700 line-clamp-2 mb-2">{item.description}</p>}
                    <div className="text-sm text-stone-800 mb-1">{item.price != null ? `${item.price} ${item.currency || ''}` : 'Цена по договоренности'}</div>
                    <div className="text-xs text-stone-600">Продавец: {item.seller_name || 'Не указан'} {item.seller_contact ? `• ${item.seller_contact}` : ''}</div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grain-card rounded-3xl p-6 md:p-7">
            <h2 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Анкета продавца
            </h2>
            <p className="text-stone-700 mb-5" style={{ fontFamily: "'Source Serif 4', serif" }}>
              Заполни анкету и подтверди пункты. У каждого “закона” есть ссылка на первоисточник.
            </p>

            <form onSubmit={handleQuestionnaireSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={sellerName} onChange={(e) => setSellerName(e.target.value)} placeholder="Имя продавца *" className="wood-input px-3 py-2.5 rounded-lg" />
                <input value={sellerContact} onChange={(e) => setSellerContact(e.target.value)} placeholder="Контакт (телефон/WhatsApp) *" className="wood-input px-3 py-2.5 rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={sellerCity} onChange={(e) => setSellerCity(e.target.value)} placeholder="Город *" className="wood-input px-3 py-2.5 rounded-lg" />
                <input value={rabbiName} onChange={(e) => setRabbiName(e.target.value)} placeholder="Раввин (референс)" className="wood-input px-3 py-2.5 rounded-lg" />
              </div>
              <input value={rabbiContact} onChange={(e) => setRabbiContact(e.target.value)} placeholder="Контакт раввина" className="wood-input w-full px-3 py-2.5 rounded-lg" />
              <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={3} placeholder="Коротко: почему ты хочешь служить общине через этот проект" className="wood-input w-full px-3 py-2.5 rounded-lg resize-none" />

              <div className="mt-2 rounded-xl border border-amber-900/20 bg-amber-50/40 p-4">
                <p className="text-sm font-semibold text-stone-800 mb-3 inline-flex items-center gap-2">
                  <ShieldCheck size={16} /> Пункты с источниками галахи
                </p>
                <div className="space-y-3">
                  {lawPoints.map((law) => {
                    const checked = checkedLawIds.includes(law.id);
                    return (
                      <div key={law.id} className="rounded-lg border border-amber-900/20 bg-white/70 p-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={checked} onChange={() => toggleLaw(law.id)} className="mt-1" />
                          <span className="text-sm text-stone-800">{law.text}</span>
                        </label>
                        <a href={law.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 underline">
                          {law.sourceTitle} <ExternalLink size={12} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {formMsg && (
                <div className="rounded-lg border border-amber-900/20 bg-amber-100/60 px-3 py-2 text-sm text-stone-800">
                  {formMsg}
                </div>
              )}

              <button type="submit" className="rounded-lg px-5 py-3 bg-stone-900 text-amber-50 hover:bg-stone-800 inline-flex items-center gap-2">
                <CheckCircle2 size={16} /> Подтвердить анкету
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="grain-card rounded-2xl p-5">
              <h3 className="font-bold text-stone-900 mb-3 inline-flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <BookOpenText size={16} /> Письма Ребе (вдохновение)
              </h3>
              <div className="space-y-3">
                {rebbeLetters.map((letter) => (
                  <div key={letter.url} className="rounded-lg border border-amber-900/20 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-stone-900">{letter.title}</p>
                    <p className="text-xs text-stone-700 mt-1">{letter.summary}</p>
                    <a href={letter.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 underline">
                      Открыть источник <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="grain-card rounded-2xl p-5">
              <h3 className="font-bold text-stone-900 mb-3 inline-flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <ScrollText size={16} /> Хасидская история
              </h3>
              <p className="text-sm text-stone-800" style={{ fontFamily: "'Source Serif 4', serif" }}>
                Когда один хасид приехал к Цемах-Цедеку за благословением для тяжело больного сына, он услышал: «Думай хорошо — и будет хорошо». Он принял эти слова буквально, всю дорогу домой удерживал битахон, и увидел открытое улучшение.
              </p>
              <a href="https://www.chabad.org/therebbe/article_cdo/aid/4405212/jewish/Chapter-12-Think-Positive.htm" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 underline">
                Источник истории <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
