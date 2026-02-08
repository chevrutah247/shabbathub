// Определение текущей недельной главы через Hebcal API

export async function getCurrentParsha(): Promise<string | null> {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Hebcal API - получаем события на ближайшую субботу
    const res = await fetch(
      `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${year}&month=${month}&ss=off&mf=off&c=off&s=on`
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    
    // Ищем ближайшую паршу
    const now = new Date();
    const parashat = data.items?.find((item: any) => {
      if (item.category !== 'parashat') return false;
      const itemDate = new Date(item.date);
      // Парша на эту или следующую субботу
      return itemDate >= now || (itemDate.getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000);
    });
    
    if (parashat) {
      // Возвращаем английское название парши (без "Parashat ")
      return parashat.title?.replace('Parashat ', '') || null;
    }
    
    return null;
  } catch (err) {
    console.error('Error fetching parsha:', err);
    return null;
  }
}

// Маппинг английских названий на ID в базе
export const parshaNameToId: Record<string, number> = {
  'Bereishit': 1, 'Noach': 2, 'Lech-Lecha': 3, 'Vayera': 4, 'Chayei Sarah': 5,
  'Toldot': 6, 'Vayetzei': 7, 'Vayishlach': 8, 'Vayeshev': 9, 'Miketz': 10,
  'Vayigash': 11, 'Vayechi': 12, 'Shemot': 13, 'Vaera': 14, 'Bo': 15,
  'Beshalach': 16, 'Yitro': 17, 'Mishpatim': 18, 'Terumah': 19, 'Tetzaveh': 20,
  'Ki Tisa': 21, 'Vayakhel': 22, 'Pekudei': 23, 'Vayikra': 24, 'Tzav': 25,
  'Shmini': 26, 'Tazria': 27, 'Metzora': 28, 'Achrei Mot': 29, 'Kedoshim': 30,
  'Emor': 31, 'Behar': 32, 'Bechukotai': 33, 'Bamidbar': 34, 'Nasso': 35,
  'Beha\'alotcha': 36, 'Sh\'lach': 37, 'Korach': 38, 'Chukat': 39, 'Balak': 40,
  'Pinchas': 41, 'Matot': 42, 'Masei': 43, 'Devarim': 44, 'Vaetchanan': 45,
  'Eikev': 46, 'Re\'eh': 47, 'Shoftim': 48, 'Ki Teitzei': 49, 'Ki Tavo': 50,
  'Nitzavim': 51, 'Vayeilech': 52, 'Ha\'azinu': 53, 'Vezot Habracha': 54
};
