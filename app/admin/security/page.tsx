'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, Ban, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

type DownloadEvent = {
  id: number;
  issue_id: string | null;
  user_id: string | null;
  ip: string | null;
  user_agent: string | null;
  status: 'ok' | 'blocked' | 'rate_limited' | 'denied' | 'error';
  reason: string | null;
  created_at: string;
};

type BlockedClient = {
  id: number;
  user_id: string | null;
  ip: string | null;
  reason: string | null;
  blocked_until: string;
  created_at: string;
};

function fmtDate(dt: string) {
  return new Date(dt).toLocaleString('ru-RU');
}

export default function AdminSecurityPage() {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState<DownloadEvent[]>([]);
  const [blocked, setBlocked] = useState<BlockedClient[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | DownloadEvent['status']>('all');
  const [query, setQuery] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [formIp, setFormIp] = useState('');
  const [formUserId, setFormUserId] = useState('');
  const [formReason, setFormReason] = useState('suspicious_download_activity');
  const [formHours, setFormHours] = useState(24);

  const loadData = useCallback(async () => {
    setActionError(null);
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const [{ data: ev }, { data: bl }] = await Promise.all([
      supabase
        .from('download_events')
        .select('id,issue_id,user_id,ip,user_agent,status,reason,created_at')
        .gte('created_at', since24h)
        .order('created_at', { ascending: false })
        .limit(500),
      supabase
        .from('blocked_download_clients')
        .select('id,user_id,ip,reason,blocked_until,created_at')
        .gt('blocked_until', new Date().toISOString())
        .order('blocked_until', { ascending: false })
        .limit(200),
    ]);

    setEvents((ev as DownloadEvent[]) || []);
    setBlocked((bl as BlockedClient[]) || []);
  }, []);

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, [loadData]);

  const stats = useMemo(() => {
    const s = { ok: 0, blocked: 0, rate_limited: 0, denied: 0, error: 0 };
    for (const e of events) s[e.status]++;
    return s;
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return [e.ip, e.user_id, e.issue_id, e.reason, e.user_agent].some((x) => (x || '').toLowerCase().includes(q));
    });
  }, [events, query, statusFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleBlock = async () => {
    const ip = formIp.trim() || null;
    const userId = formUserId.trim() || null;
    if (!ip && !userId) {
      setActionError(t('admin.specifyIpOrUser', lang));
      return;
    }
    setActionBusy(true);
    setActionError(null);

    const blockedUntil = new Date(Date.now() + Math.max(1, formHours) * 60 * 60 * 1000).toISOString();
    const { error } = await supabase.from('blocked_download_clients').insert({
      ip,
      user_id: userId,
      reason: formReason || null,
      blocked_until: blockedUntil,
    });

    if (error) setActionError(error.message);
    else {
      setFormIp('');
      setFormUserId('');
      await loadData();
    }
    setActionBusy(false);
  };

  const handleUnblock = async (id: number) => {
    setActionBusy(true);
    setActionError(null);
    const { error } = await supabase.from('blocked_download_clients').delete().eq('id', id);
    if (error) setActionError(error.message);
    else await loadData();
    setActionBusy(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.securityTitle', lang)}</h1>
        <button onClick={handleRefresh} className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50" disabled={refreshing}>
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> {t('admin.refresh', lang)}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">OK (24ч)</p><p className="text-2xl font-bold text-green-700">{stats.ok}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Blocked</p><p className="text-2xl font-bold text-red-700">{stats.blocked}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Rate limited</p><p className="text-2xl font-bold text-amber-700">{stats.rate_limited}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Denied (bot)</p><p className="text-2xl font-bold text-orange-700">{stats.denied}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Errors</p><p className="text-2xl font-bold text-gray-700">{stats.error}</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white border rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck size={18} /> {t('admin.downloadEvents', lang)}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('admin.searchPlaceholder', lang)} className="px-3 py-2 border rounded-lg flex-1 min-w-[240px]" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg">
              <option value="all">{t('admin.allStatuses', lang)}</option>
              <option value="ok">ok</option>
              <option value="blocked">blocked</option>
              <option value="rate_limited">rate_limited</option>
              <option value="denied">denied</option>
              <option value="error">error</option>
            </select>
          </div>
          <div className="max-h-[520px] overflow-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left px-3 py-2">{t('admin.time', lang)}</th>
                  <th className="text-left px-3 py-2">{t('admin.status', lang)}</th>
                  <th className="text-left px-3 py-2">IP</th>
                  <th className="text-left px-3 py-2">User</th>
                  <th className="text-left px-3 py-2">{t('admin.reason', lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 ? (
                  <tr><td colSpan={5} className="px-3 py-8 text-center text-gray-500">{t('admin.noEvents', lang)}</td></tr>
                ) : filteredEvents.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-3 py-2 whitespace-nowrap">{fmtDate(e.created_at)}</td>
                    <td className="px-3 py-2"><span className="px-2 py-1 rounded-full text-xs bg-gray-100">{e.status}</span></td>
                    <td className="px-3 py-2 font-mono text-xs">{e.ip || '—'}</td>
                    <td className="px-3 py-2 font-mono text-xs">{e.user_id ? e.user_id.slice(0, 8) + '…' : '—'}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{e.reason || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Ban size={18} /> {t('admin.blocking', lang)}</h2>
          {actionError && <div className="mb-3 p-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded">{actionError}</div>}
          <div className="space-y-3">
            <input value={formIp} onChange={(e) => setFormIp(e.target.value)} placeholder="IP (например 1.2.3.4)" className="w-full px-3 py-2 border rounded-lg" />
            <input value={formUserId} onChange={(e) => setFormUserId(e.target.value)} placeholder="user_id (uuid)" className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            <input value={formReason} onChange={(e) => setFormReason(e.target.value)} placeholder="reason" className="w-full px-3 py-2 border rounded-lg" />
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('admin.hoursBlock', lang)}</label>
              <input type="number" min={1} value={formHours} onChange={(e) => setFormHours(Number(e.target.value) || 24)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <button onClick={handleBlock} disabled={actionBusy} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
              <AlertTriangle size={16} /> {t('admin.block', lang)}
            </button>
          </div>

          <h3 className="font-medium text-gray-900 mt-6 mb-2">{t('admin.activeBlocks', lang)}</h3>
          <div className="space-y-2 max-h-64 overflow-auto">
            {blocked.length === 0 ? (
              <p className="text-sm text-gray-500">{t('admin.noActiveBlocks', lang)}</p>
            ) : blocked.map((b) => (
              <div key={b.id} className="border rounded-lg p-2">
                <p className="text-xs font-mono">IP: {b.ip || '—'}</p>
                <p className="text-xs font-mono">User: {b.user_id ? b.user_id.slice(0, 12) + '…' : '—'}</p>
                <p className="text-xs text-gray-600">{t('admin.until', lang)} {fmtDate(b.blocked_until)}</p>
                <p className="text-xs text-gray-500">{b.reason || '—'}</p>
                <button onClick={() => handleUnblock(b.id)} disabled={actionBusy} className="mt-1 inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700">
                  <Trash2 size={12} /> {t('admin.unblock', lang)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
