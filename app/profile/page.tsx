'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Globe, Bell, BellOff, BookOpen, FileText, Edit2, Save, X, LogOut, Calendar, Loader2, Users, Trophy, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

const LOCALE_MAP: Record<string, string> = { ru: 'ru-RU', en: 'en-US', he: 'he-IL', uk: 'uk-UA' };

interface Subscription { id: string; publication_id: string; language: string; is_active: boolean; created_at: string; pub_title?: string; }
interface UploadedDoc { id: string; title: string; created_at: string; thumbnail_url: string | null; view_count: number; }
interface Achievement { id: string; title: string; hint: string; unlocked: boolean; progress: string; }

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [prefLang, setPrefLang] = useState('ru');
  const [emailNotif, setEmailNotif] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'subscriptions' | 'uploads'>('info');
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingUploads, setLoadingUploads] = useState(true);
  const [referralCount, setReferralCount] = useState(0);
  const [volunteerReferralCount, setVolunteerReferralCount] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');
  const tv = (ru: string, en: string, he: string, uk: string) => (
    lang === 'ru' ? ru : lang === 'he' ? he : lang === 'uk' ? uk : en
  );

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (profile) {
      setFirstName((profile as any).first_name || '');
      setLastName((profile as any).last_name || '');
      setPrefLang((profile as any).preferred_language || 'ru');
      setEmailNotif((profile as any).email_notifications !== false);
    }
  }, [user, profile, router]);

  useEffect(() => {
    if (!user) return;
    async function fetchSubs() {
      setLoadingSubs(true);
      const { data: subs } = await supabase.from('subscriptions').select('id, publication_id, language, is_active, created_at').eq('email', user!.email).order('created_at', { ascending: false });
      if (subs && subs.length > 0) {
        const pubIds = Array.from(new Set(subs.map(s => s.publication_id).filter(Boolean)));
        let pubMap: Record<string, string> = {};
        if (pubIds.length > 0) { const { data: pubs } = await supabase.from('publications').select('id, title_ru, title_en, title_he').in('id', pubIds); pubs?.forEach(p => { pubMap[p.id] = p.title_ru || p.title_en || p.title_he || '—'; }); }
        setSubscriptions(subs.map(s => ({ ...s, pub_title: pubMap[s.publication_id] || t('profile.allPublications', lang) })));
      }
      setLoadingSubs(false);
    }
    fetchSubs();
  }, [user, lang]);

  useEffect(() => {
    if (!user) return;
    async function fetchUploads() {
      setLoadingUploads(true);
      const { data } = await supabase.from('issues').select('id, title, created_at, thumbnail_url, view_count').eq('uploaded_by', user!.id).eq('is_active', true).order('created_at', { ascending: false }).limit(50);
      setUploads(data || []);
      setLoadingUploads(false);
    }
    fetchUploads();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    async function fetchReferrals() {
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', userId);
      setReferralCount(count || 0);

      try {
        const { data: refs } = await supabase
          .from('referrals')
          .select('referred_user_id')
          .eq('referrer_id', userId)
          .not('referred_user_id', 'is', null);
        const referredIds = (refs || []).map((r: any) => r.referred_user_id).filter(Boolean);
        if (referredIds.length === 0) {
          setVolunteerReferralCount(0);
          return;
        }
        const { count: volunteers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .in('id', referredIds)
          .eq('role', 'volunteer');
        setVolunteerReferralCount(volunteers || 0);
      } catch {
        // referrals.referred_user_id may be absent before migration
        setVolunteerReferralCount(0);
      }
    }
    fetchReferrals();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true); setSaveMsg('');
    const { error } = await supabase.from('profiles').update({ first_name: firstName, last_name: lastName, display_name: [firstName, lastName].filter(Boolean).join(' '), preferred_language: prefLang, email_notifications: emailNotif }).eq('id', user.id);
    if (error) { setSaveMsg(t('profile.errorSaving', lang)); } else { setSaveMsg(t('profile.saved', lang)); setEditing(false); }
    setSaving(false); setTimeout(() => setSaveMsg(''), 3000);
  };
  const handleUnsubscribe = async (subId: string) => { await supabase.from('subscriptions').update({ is_active: false }).eq('id', subId); setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, is_active: false } : s)); };
  const handleResubscribe = async (subId: string) => { await supabase.from('subscriptions').update({ is_active: true }).eq('id', subId); setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, is_active: true } : s)); };

  if (!user) return null;
  const p = profile as any;
  const role = p?.role || 'subscriber';
  const isVolunteer = role === 'volunteer';
  const locale = LOCALE_MAP[lang] || 'en-US';
  const memberSince = p?.created_at ? new Date(p.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long' }) : '';
  const initials = [(p?.first_name || '')[0], (p?.last_name || '')[0]].filter(Boolean).join('').toUpperCase() || (user.email || '?')[0].toUpperCase();
  const activeSubs = subscriptions.filter(s => s.is_active).length;
  const achievements: Achievement[] = [
    { id: 'starter', title: 'Starter', hint: t('profile.achSub1', lang), unlocked: activeSubs >= 1, progress: `${Math.min(activeSubs, 1)}/1` },
    { id: 'collector', title: 'Collector', hint: t('profile.achSub5', lang), unlocked: activeSubs >= 5, progress: `${Math.min(activeSubs, 5)}/5` },
    { id: 'contributor', title: 'Contributor', hint: t('profile.achUpload1', lang), unlocked: uploads.length >= 1, progress: `${Math.min(uploads.length, 1)}/1` },
    { id: 'ambassador', title: 'Ambassador', hint: t('profile.achRef10', lang), unlocked: referralCount >= 10, progress: `${Math.min(referralCount, 10)}/10` },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ebe4d6 100%)' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Serif+4:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .library-card { background: linear-gradient(145deg, #fffdf7 0%, #faf6ee 100%); border: 2px solid #c9b896; border-radius: 20px; position: relative; overflow: hidden; }
        .library-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #1e3a6e 0%, #2c5f8a 30%, #b8860b 50%, #2c5f8a 70%, #1e3a6e 100%); }
        .library-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #1e3a6e 0%, #2c5f8a 30%, #b8860b 50%, #2c5f8a 70%, #1e3a6e 100%); }
        .stamp-circle { width: 100px; height: 100px; border: 3px solid #1e3a6e; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; background: linear-gradient(135deg, #f0ebe0, #faf6ee); }
        .stamp-circle::after { content: ''; position: absolute; inset: 4px; border: 1px dashed #c9b896; border-radius: 50%; }
        .tab-lib { font-family: 'Source Serif 4', Georgia, serif; border-bottom: 2px solid transparent; transition: all 0.3s; padding: 10px 20px; color: #8a7d6b; font-size: 0.95rem; }
        .tab-lib:hover { color: #1e3a6e; }
        .tab-lib.active { color: #1e3a6e; border-bottom-color: #b8860b; font-weight: 600; }
        .field-label { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #a09580; }
        .field-value { font-family: 'Source Serif 4', Georgia, serif; font-size: 1rem; color: #2c2416; border-bottom: 1px solid #e0d8c8; padding-bottom: 4px; }
        .card-section { background: linear-gradient(145deg, #fffdf7, #faf6ee); border: 1px solid #e0d8c8; border-radius: 16px; }
        .sub-card { background: #fffdf7; border: 1px solid #e0d8c8; border-radius: 12px; transition: all 0.3s; }
        .sub-card:hover { border-color: #b8860b; box-shadow: 0 2px 12px rgba(184,134,11,0.08); }
        .doc-card { background: #fffdf7; border: 1px solid #e0d8c8; border-radius: 12px; transition: all 0.3s; }
        .doc-card:hover { border-color: #1e3a6e; box-shadow: 0 2px 12px rgba(30,58,110,0.08); transform: translateY(-1px); }
        .watermark { position: absolute; right: 20px; top: 50%; transform: translateY(-50%) rotate(-15deg); font-family: 'Playfair Display', serif; font-size: 8rem; font-weight: 800; color: rgba(30,58,110,0.03); pointer-events: none; }
        .gold-btn { background: linear-gradient(135deg, #b8860b, #d4a012); color: white; font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; transition: all 0.3s; }
        .gold-btn:hover { box-shadow: 0 4px 16px rgba(184,134,11,0.25); transform: translateY(-1px); }
        .navy-btn { background: linear-gradient(135deg, #1e3a6e, #2c5f8a); color: white; font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; transition: all 0.3s; }
        .edit-input { border: 1px solid #e0d8c8; border-radius: 8px; padding: 8px 12px; font-family: 'Source Serif 4', Georgia, serif; background: white; outline: none; width: 100%; }
        .edit-input:focus { border-color: #b8860b; }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Library Card */}
        <div className="library-card p-8 pt-10 pb-10 mb-8 relative">
          <div className="watermark">SH</div>
          <div className="text-center mb-2">
            <p className="field-label mb-1">{t('profile.libraryCard', lang)} · ShabbatHub Library</p>
            <div className="w-16 h-[1px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #b8860b, transparent)' }} />
          </div>
          <div className="flex items-center gap-6 mt-6">
            <div className="stamp-circle flex-shrink-0">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700, color: '#1e3a6e' }}>{initials}</span>
            </div>
            <div className="flex-1">
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#1e3a6e', lineHeight: 1.2 }}>{p?.display_name || t('profile.reader', lang)}</h1>
              <p className="mt-1 text-sm" style={{ color: '#8a7d6b', fontFamily: "'Source Serif 4', serif" }}>{user.email}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: role === 'admin' ? '#fef2f2' : '#f0f4ff', color: role === 'admin' ? '#991b1b' : '#1e3a6e', border: '1px solid', borderColor: role === 'admin' ? '#fecaca' : '#c7d6f0' }}>{t(`roles.${role}`, lang) !== `roles.${role}` ? t(`roles.${role}`, lang) : t('profile.reader', lang)}</span>
                {memberSince && <span className="text-xs flex items-center gap-1" style={{ color: '#a09580' }}><Calendar size={11} /> {t('profile.memberSince', lang)} {memberSince}</span>}
              </div>
            </div>
            <button onClick={() => { signOut(); router.push('/'); }} className="self-start p-2 rounded-lg hover:bg-red-50 transition-colors group" title={t('profile.logout', lang)}><LogOut size={18} className="text-gray-300 group-hover:text-red-500 transition-colors" /></button>
          </div>
          <div className="flex justify-center gap-8 mt-6 pt-5" style={{ borderTop: '1px dashed #e0d8c8' }}>
            {(
              isVolunteer
                ? [
                    { label: tv('Приглашений', 'Referrals', 'הפניות', 'Запрошень'), value: referralCount },
                    { label: tv('Волонтеров', 'Volunteer referrals', 'הפניות מתנדבים', 'Запрошені волонтери'), value: volunteerReferralCount },
                    { label: t('profile.langLabel', lang), value: t(`langNames.${prefLang}`, lang) !== `langNames.${prefLang}` ? t(`langNames.${prefLang}`, lang) : prefLang },
                  ]
                : [
                    { label: t('profile.subscriptions', lang), value: activeSubs },
                    { label: t('profile.uploads', lang), value: uploads.length },
                    { label: t('profile.referrals', lang), value: referralCount },
                    { label: t('profile.langLabel', lang), value: t(`langNames.${prefLang}`, lang) !== `langNames.${prefLang}` ? t(`langNames.${prefLang}`, lang) : prefLang },
                  ]
            ).map((s, i) => (
              <div key={i} className="text-center">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1e3a6e' }}>{s.value}</p>
                <p className="field-label mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6" style={{ borderBottom: '1px solid #e0d8c8' }}>
          {([
            { id: 'info', label: t('profile.tabInfo', lang), icon: <User size={15} /> },
            ...(!isVolunteer ? [{ id: 'subscriptions', label: t('profile.tabSubscriptions', lang), icon: <Bell size={15} /> }, { id: 'uploads', label: t('profile.tabUploads', lang), icon: <FileText size={15} /> }] as const : []),
          ] as const).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-lib flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {!isVolunteer && (
          <div className="card-section p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} style={{ color: '#b8860b' }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#1e3a6e', fontWeight: 600 }}>{t('profile.achievements', lang)}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {achievements.map((item) => (
              <div key={item.id} className="sub-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: item.unlocked ? '#1e3a6e' : '#8a7d6b' }}>{item.title}</p>
                  <p className="text-xs" style={{ color: '#a09580' }}>{item.hint}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold" style={{ color: item.unlocked ? '#0f766e' : '#8a7d6b' }}>{item.progress}</p>
                  <div className="flex items-center justify-end mt-0.5">
                    {item.unlocked ? <Sparkles size={13} className="text-emerald-600" /> : <Users size={13} className="text-gray-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}

        {/* INFO */}
        {activeTab === 'info' && (
          <div className="card-section p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 600, color: '#1e3a6e' }}>{t('profile.accountCard', lang)}</h2>
              {!editing ? <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm" style={{ color: '#b8860b', fontFamily: "'Source Serif 4', serif" }}><Edit2 size={13} /> {t('profile.edit', lang)}</button>
                : <button onClick={() => setEditing(false)} className="p-1 rounded hover:bg-gray-100"><X size={16} className="text-gray-400" /></button>}
            </div>
            {saveMsg && <p className={`mb-4 text-sm ${saveMsg === t('profile.errorSaving', lang) ? 'text-red-600' : 'text-green-600'}`}>{saveMsg}</p>}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div><p className="field-label mb-1.5">{t('profile.firstName', lang)}</p>{editing ? <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="edit-input" placeholder={t('profile.firstName', lang)} /> : <p className="field-value">{firstName || '—'}</p>}</div>
                <div><p className="field-label mb-1.5">{t('profile.lastName', lang)}</p>{editing ? <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="edit-input" placeholder={t('profile.lastName', lang)} /> : <p className="field-value">{lastName || '—'}</p>}</div>
              </div>
              <div><p className="field-label mb-1.5">{t('profile.emailLabel', lang)}</p><p className="field-value flex items-center gap-2"><Mail size={14} style={{ color: '#a09580' }} />{user.email}</p></div>
              <div><p className="field-label mb-1.5">{t('profile.interfaceLang', lang)}</p>{editing ? <select value={prefLang} onChange={e => setPrefLang(e.target.value)} className="edit-input" style={{ cursor: 'pointer' }}>{(['ru', 'en', 'he', 'uk'] as const).map(k => <option key={k} value={k}>{t(`langNames.${k}`, lang)}</option>)}</select> : <p className="field-value flex items-center gap-2"><Globe size={14} style={{ color: '#a09580' }} />{t(`langNames.${prefLang}`, lang)}</p>}</div>
              <div><p className="field-label mb-1.5">{t('profile.notifications', lang)}</p>{editing ? <button onClick={() => setEmailNotif(!emailNotif)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm sub-card`} style={{ fontFamily: "'Source Serif 4', serif", color: emailNotif ? '#1e3a6e' : '#8a7d6b' }}>{emailNotif ? <Bell size={15} className="text-amber-600" /> : <BellOff size={15} />}{emailNotif ? t('profile.enabled', lang) : t('profile.disabled', lang)}</button> : <p className="field-value flex items-center gap-2">{emailNotif ? <Bell size={14} className="text-amber-600" /> : <BellOff size={14} style={{ color: '#a09580' }} />}{emailNotif ? t('profile.enabled', lang) : t('profile.disabled', lang)}</p>}</div>
              {editing && <button onClick={handleSave} disabled={saving} className="gold-btn flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm disabled:opacity-50">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}{saving ? t('profile.saving', lang) : t('save', lang)}</button>}
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS */}
        {!isVolunteer && activeTab === 'subscriptions' && (
          <div className="card-section p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 600, color: '#1e3a6e' }}>{t('profile.mySubscriptions', lang)}</h2>
              <Link href="/subscribe" className="flex items-center gap-1 text-sm" style={{ color: '#b8860b', fontFamily: "'Source Serif 4', serif" }}>{t('profile.newSubscription', lang)}</Link>
            </div>
            {loadingSubs ? <div className="flex justify-center py-8"><Loader2 className="animate-spin" size={24} style={{ color: '#c9b896' }} /></div>
            : subscriptions.length === 0 ? (
              <div className="text-center py-10">
                <div className="stamp-circle mx-auto mb-4" style={{ width: 70, height: 70 }}><Bell size={28} style={{ color: '#c9b896' }} /></div>
                <p style={{ fontFamily: "'Source Serif 4', serif", color: '#8a7d6b' }} className="mb-4">{t('profile.noSubscriptions', lang)}</p>
                <Link href="/subscribe" className="gold-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm"><Bell size={15} /> {t('profile.subscribe', lang)}</Link>
              </div>
            ) : (
              <div className="space-y-3">{subscriptions.map(sub => (
                <div key={sub.id} className={`sub-card flex items-center justify-between p-4 ${!sub.is_active ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: sub.is_active ? '#f0f4ff' : '#f5f5f5' }}><BookOpen size={16} style={{ color: sub.is_active ? '#1e3a6e' : '#aaa' }} /></div>
                    <div><p style={{ fontFamily: "'Source Serif 4', serif", color: '#2c2416', fontSize: '0.95rem' }} className="font-medium">{sub.pub_title}</p><p className="field-label" style={{ fontSize: '0.6rem' }}>{t(`langNames.${sub.language}`, lang) !== `langNames.${sub.language}` ? t(`langNames.${sub.language}`, lang) : sub.language} · {sub.is_active ? t('profile.active', lang) : t('profile.paused', lang)}</p></div>
                  </div>
                  {sub.is_active ? <button onClick={() => handleUnsubscribe(sub.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50" style={{ fontFamily: "'Source Serif 4', serif" }}>{t('profile.unsubscribe', lang)}</button>
                    : <button onClick={() => handleResubscribe(sub.id)} className="text-xs px-3 py-1.5 rounded-lg border hover:bg-green-50" style={{ fontFamily: "'Source Serif 4', serif", borderColor: '#b8860b', color: '#b8860b' }}>{t('profile.resume', lang)}</button>}
                </div>
              ))}</div>
            )}
          </div>
        )}

        {/* UPLOADS */}
        {!isVolunteer && activeTab === 'uploads' && (
          <div className="card-section p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 600, color: '#1e3a6e' }}>{t('profile.uploadedMaterials', lang)}</h2>
              <Link href="/add-pdf" className="flex items-center gap-1 text-sm" style={{ color: '#b8860b', fontFamily: "'Source Serif 4', serif" }}>+ {t('profile.uploadBtn', lang)}</Link>
            </div>
            {loadingUploads ? <div className="flex justify-center py-8"><Loader2 className="animate-spin" size={24} style={{ color: '#c9b896' }} /></div>
            : uploads.length === 0 ? (
              <div className="text-center py-10">
                <div className="stamp-circle mx-auto mb-4" style={{ width: 70, height: 70 }}><FileText size={28} style={{ color: '#c9b896' }} /></div>
                <p style={{ fontFamily: "'Source Serif 4', serif", color: '#8a7d6b' }} className="mb-4">{t('profile.noUploadedMaterials', lang)}</p>
                <Link href="/add-pdf" className="navy-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm"><FileText size={15} /> {t('profile.uploadPdf', lang)}</Link>
              </div>
            ) : (
              <div className="space-y-3">{uploads.map(doc => (
                <Link key={doc.id} href={'/document/' + doc.id} className="doc-card flex items-center gap-3 p-3 block">
                  {doc.thumbnail_url ? <img src={doc.thumbnail_url} alt="" className="w-11 h-14 object-cover rounded-lg" style={{ border: '1px solid #e0d8c8' }} />
                    : <div className="w-11 h-14 rounded-lg flex items-center justify-center" style={{ background: '#f5f0e8', border: '1px solid #e0d8c8' }}><FileText size={16} style={{ color: '#c9b896' }} /></div>}
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontFamily: "'Source Serif 4', serif", color: '#2c2416', fontSize: '0.9rem', fontWeight: 500 }}>{doc.title}</p>
                    <p className="field-label" style={{ fontSize: '0.6rem' }}>{new Date(doc.created_at).toLocaleDateString(locale)} · {doc.view_count || 0} {t('profile.views', lang)}</p>
                  </div>
                </Link>
              ))}</div>
            )}
          </div>
        )}

        <div className="text-center mt-8 mb-4"><p className="field-label" style={{ fontSize: '0.55rem' }}>ShabbatHub Digital Library · {t('profile.ticket', lang)} #{user.id?.substring(0, 8).toUpperCase()}</p></div>
      </div>
    </div>
  );
}
