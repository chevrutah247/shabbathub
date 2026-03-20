export async function secureDownloadIssue(options: {
  issueId: string;
  title?: string;
  accessToken?: string | null;
}) {
  const { issueId, title, accessToken } = options;

  if (!accessToken) {
    return {
      ok: false,
      code: 'AUTH_REQUIRED',
      message: 'Для скачивания нужно войти в аккаунт.',
    } as const;
  }

  const res = await fetch('/api/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ issueId }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    return {
      ok: false,
      code: payload?.code || 'DOWNLOAD_FAILED',
      message: payload?.error || 'Не удалось скачать файл.',
      retryAfterSec: payload?.retryAfterSec,
    } as const;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = (title || 'document').trim() + '.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  return { ok: true } as const;
}
