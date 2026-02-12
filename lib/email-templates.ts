import { Lang } from './language-context';

const siteUrl = 'https://shabbathub.com';

const subjects = {
  confirmation: {
    ru: 'Добро пожаловать в ShabbatHub! 🕎',
    en: 'Welcome to ShabbatHub! 🕎',
    he: '!ShabbatHub-ברוכים הבאים ל 🕎',
    uk: 'Ласкаво просимо до ShabbatHub! 🕎',
  },
  newIssue: {
    ru: 'Новый выпуск: {title}',
    en: 'New issue: {title}',
    he: '{title} :גיליון חדש',
    uk: 'Новий випуск: {title}',
  },
  newsletter: {
    ru: 'Новости ShabbatHub',
    en: 'ShabbatHub News',
    he: 'ShabbatHub חדשות',
    uk: 'Новини ShabbatHub',
  },
};

function baseLayout(content: string, lang: Lang, unsubscribeUrl: string) {
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const align = lang === 'he' ? 'right' : 'left';
  const unsubText = {
    ru: 'Отписаться от рассылки',
    en: 'Unsubscribe',
    he: 'ביטול הרשמה',
    uk: 'Відписатися від розсилки',
  };

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f3f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e3a8a,#1e40af);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:28px;font-weight:bold;">
            <span style="color:#ffffff;">Shabbat</span><span style="color:#f59e0b;">Hub</span>
          </h1>
        </td></tr>
        <!-- Content -->
        <tr><td style="padding:32px;text-align:${align};direction:${dir};">
          ${content}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0 0 8px;color:#6b7280;font-size:12px;">
            <a href="${siteUrl}" style="color:#1e40af;text-decoration:none;">shabbathub.com</a>
          </p>
          <p style="margin:0;color:#9ca3af;font-size:11px;">
            <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">${unsubText[lang]}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function confirmationEmail(lang: Lang, email: string) {
  const content: Record<Lang, string> = {
    ru: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Спасибо за подписку! 🎉</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Вы успешно подписались на обновления ShabbatHub. Теперь вы будете получать уведомления о новых материалах к Шаббату прямо на ваш email.
      </p>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Мы рады что вы с нами! Пусть каждый Шаббат приносит свет и радость в ваш дом. 🕯️
      </p>
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="${siteUrl}/catalog" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
          Перейти в каталог
        </a>
      </td></tr></table>
      <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;">
        Вы можете изменить настройки подписки в любое время на странице <a href="${siteUrl}/subscribe" style="color:#1e40af;">подписки</a>.
      </p>`,
    en: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Thank you for subscribing! 🎉</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 16px;">
        You've successfully subscribed to ShabbatHub updates. You'll now receive notifications about new Shabbat materials right to your inbox.
      </p>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 24px;">
        We're glad you're with us! May every Shabbat bring light and joy to your home. 🕯️
      </p>
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="${siteUrl}/catalog" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
          Browse catalog
        </a>
      </td></tr></table>
      <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;">
        You can change your subscription settings anytime on the <a href="${siteUrl}/subscribe" style="color:#1e40af;">subscription page</a>.
      </p>`,
    he: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">🎉 !תודה על ההרשמה</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.8;margin:0 0 16px;">
        נרשמת בהצלחה לעדכוני ShabbatHub. מעכשיו תקבל התראות על חומרי שבת חדשים ישירות למייל שלך.
      </p>
      <p style="color:#4b5563;font-size:15px;line-height:1.8;margin:0 0 24px;">
        שמחים שהצטרפת אלינו! שכל שבת תביא אור ושמחה לביתך. 🕯️
      </p>
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="${siteUrl}/catalog" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
          לקטלוג
        </a>
      </td></tr></table>
      <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;">
        ניתן לשנות את הגדרות המנוי בכל עת בעמוד <a href="${siteUrl}/subscribe" style="color:#1e40af;">ההרשמה</a>.
      </p>`,
    uk: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Дякуємо за підписку! 🎉</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 16px;">
        Ви успішно підписалися на оновлення ShabbatHub. Тепер ви отримуватимете сповіщення про нові матеріали до Шаббату прямо на вашу пошту.
      </p>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Ми раді що ви з нами! Нехай кожен Шаббат приносить світло та радість у ваш дім. 🕯️
      </p>
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="${siteUrl}/catalog" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
          Перейти до каталогу
        </a>
      </td></tr></table>
      <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;">
        Ви можете змінити налаштування підписки будь-коли на сторінці <a href="${siteUrl}/subscribe" style="color:#1e40af;">підписки</a>.
      </p>`,
  };

  const unsubUrl = siteUrl + '/subscribe?email=' + encodeURIComponent(email);
  return {
    subject: subjects.confirmation[lang],
    html: baseLayout(content[lang], lang, unsubUrl),
  };
}

export function newIssueEmail(lang: Lang, email: string, pubTitle: string, issueTitle: string, pdfUrl: string, docUrl: string) {
  const content: Record<Lang, string> = {
    ru: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Новый выпуск! 📰</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 8px;">
        В публикации <strong>${pubTitle}</strong> появился новый выпуск:
      </p>
      <div style="background:#f0f9ff;border-radius:12px;padding:16px;margin:16px 0 24px;">
        <p style="margin:0;color:#1e40af;font-weight:600;font-size:17px;">${issueTitle}</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="center" style="padding:0 4px;">
          <a href="${docUrl}" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Читать онлайн
          </a>
        </td>
        <td align="center" style="padding:0 4px;">
          <a href="${pdfUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Скачать PDF
          </a>
        </td>
      </tr></table>`,
    en: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">New issue! 📰</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 8px;">
        A new issue has been published in <strong>${pubTitle}</strong>:
      </p>
      <div style="background:#f0f9ff;border-radius:12px;padding:16px;margin:16px 0 24px;">
        <p style="margin:0;color:#1e40af;font-weight:600;font-size:17px;">${issueTitle}</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="center" style="padding:0 4px;">
          <a href="${docUrl}" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Read online
          </a>
        </td>
        <td align="center" style="padding:0 4px;">
          <a href="${pdfUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Download PDF
          </a>
        </td>
      </tr></table>`,
    he: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">📰 !גיליון חדש</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.8;margin:0 0 8px;">
        :גיליון חדש פורסם ב<strong>${pubTitle}</strong>
      </p>
      <div style="background:#f0f9ff;border-radius:12px;padding:16px;margin:16px 0 24px;">
        <p style="margin:0;color:#1e40af;font-weight:600;font-size:17px;">${issueTitle}</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="center" style="padding:0 4px;">
          <a href="${docUrl}" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            קרא אונליין
          </a>
        </td>
        <td align="center" style="padding:0 4px;">
          <a href="${pdfUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            הורד PDF
          </a>
        </td>
      </tr></table>`,
    uk: `
      <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Новий випуск! 📰</h2>
      <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 8px;">
        У публікації <strong>${pubTitle}</strong> з'явився новий випуск:
      </p>
      <div style="background:#f0f9ff;border-radius:12px;padding:16px;margin:16px 0 24px;">
        <p style="margin:0;color:#1e40af;font-weight:600;font-size:17px;">${issueTitle}</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="center" style="padding:0 4px;">
          <a href="${docUrl}" style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Читати онлайн
          </a>
        </td>
        <td align="center" style="padding:0 4px;">
          <a href="${pdfUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">
            Завантажити PDF
          </a>
        </td>
      </tr></table>`,
  };

  const unsubUrl = siteUrl + '/subscribe?email=' + encodeURIComponent(email);
  return {
    subject: subjects.newIssue[lang].replace('{title}', issueTitle),
    html: baseLayout(content[lang], lang, unsubUrl),
  };
}

export function newsletterEmail(lang: Lang, email: string, title: string, bodyHtml: string) {
  const unsubUrl = siteUrl + '/subscribe?email=' + encodeURIComponent(email);
  return {
    subject: title || subjects.newsletter[lang],
    html: baseLayout(bodyHtml, lang, unsubUrl),
  };
}
