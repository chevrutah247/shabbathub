export interface Article {
  id: string;
  slug: string;
  title: { ru: string; en: string; he: string; uk: string };
  subtitle: { ru: string; en: string; he: string; uk: string };
  content: { ru: string; en: string };
  tag: { ru: string; en: string; he: string; uk: string };
  createdAt: string;
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'how-to-prepare-for-shabbat',
    title: {
      ru: 'Как подготовиться к Шаббату — практическое руководство',
      en: 'How to Prepare for Shabbat — A Practical Guide',
      he: 'איך להתכונן לשבת — מדריך מעשי',
      uk: 'Як підготуватися до Шаббату — практичний посібник',
    },
    subtitle: {
      ru: 'Пошаговый план подготовки к самому важному дню недели',
      en: 'A step-by-step plan for preparing for the most important day of the week',
      he: 'תוכנית שלב אחר שלב להכנה ליום החשוב ביותר בשבוע',
      uk: 'Покроковий план підготовки до найважливішого дня тижня',
    },
    content: {
      ru: `<p>Шаббат — это не просто день отдыха, а духовная вершина всей недели. Подготовка к нему начинается задолго до зажигания свечей в пятницу вечером. В еврейской традиции говорится, что тот, кто готовится к Шаббату заранее, получает от него гораздо больше. Мудрецы Талмуда сравнивали подготовку к Шаббату с подготовкой к встрече с царём — ведь Шаббат называют «царицей».</p>

<p>Практическая подготовка начинается с четверга. Многие хозяйки уже в четверг продумывают меню субботних трапез и закупают необходимые продукты. В пятницу утром начинается активная готовка: халы (субботние хлебы), рыба, мясо, салаты и десерты. Важно помнить, что вся еда должна быть приготовлена до наступления Шаббата. Для субботнего обеда часто используют «плату» (горячую плиту) или медленноварку, чтобы еда оставалась тёплой.</p>

<p>Не менее важна духовная подготовка. Перед Шаббатом принято навести порядок в доме, помыться, надеть праздничную одежду. Многие используют эти часы для примирения с близкими, прощения обид и духовного самоанализа. Рабби Нахман из Бреслова учил, что пятница — это время, когда нужно оставить позади все заботы будней и открыть сердце для святости Шаббата.</p>

<p>Практические советы: составьте список дел на пятницу заранее; подготовьте субботнюю одежду накануне; установите таймеры на освещение; приготовьте свечи и подсвечники; убедитесь, что все телефоны будут отложены до исхода Шаббата. Помните: спокойная и радостная подготовка — это уже часть самого Шаббата.</p>`,

      en: `<p>Shabbat is not merely a day of rest — it is the spiritual pinnacle of the entire week. Preparation for it begins long before the candles are lit on Friday evening. Jewish tradition teaches that those who prepare for Shabbat in advance receive far more from it. The sages of the Talmud compared preparing for Shabbat to preparing for an audience with a king — for Shabbat is called "the Queen."</p>

<p>Practical preparation begins on Thursday. Many homemakers already plan the Shabbat meal menu and purchase necessary ingredients by Thursday. On Friday morning, active cooking begins: challah (Shabbat bread), fish, meat, salads, and desserts. It is important to remember that all food must be prepared before the onset of Shabbat. For Saturday lunch, many use a "blech" (hot plate) or slow cooker to keep food warm throughout the day.</p>

<p>Spiritual preparation is equally important. Before Shabbat, it is customary to clean the house, bathe, and put on festive clothing. Many use these hours for reconciliation with loved ones, forgiveness, and spiritual self-reflection. Rabbi Nachman of Breslov taught that Friday is the time to leave behind all weekday worries and open one's heart to the holiness of Shabbat.</p>

<p>Practical tips: make a Friday to-do list in advance; prepare Shabbat clothes the night before; set timers for lighting; prepare candles and candlesticks; ensure all phones will be put away until Shabbat ends. Remember: calm and joyful preparation is already part of Shabbat itself.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2025-12-01',
  },
  {
    id: '2',
    slug: 'spiritual-meaning-of-shabbat-candles',
    title: {
      ru: 'Духовный смысл субботних свечей',
      en: 'The Spiritual Meaning of Shabbat Candles',
      he: 'המשמעות הרוחנית של נרות שבת',
      uk: 'Духовний зміст суботніх свічок',
    },
    subtitle: {
      ru: 'Почему зажигание свечей — это больше, чем просто традиция',
      en: 'Why candle lighting is more than just a tradition',
      he: 'למה הדלקת נרות היא יותר ממסורת בלבד',
      uk: 'Чому запалювання свічок — це більше, ніж просто традиція',
    },
    content: {
      ru: `<p>Зажигание субботних свечей — одна из самых красивых и глубоких заповедей в еврейской жизни. Каждую пятницу вечером, за 18 минут до захода солнца, еврейские женщины по всему миру зажигают минимум две свечи, произнося благословение. Этот момент наполнен особой святостью — считается, что именно в этот миг Шаббат входит в дом.</p>

<p>Две свечи символизируют два аспекта заповеди Шаббата: «Помни» (захор) и «Храни» (шамор). «Помни день субботний, чтобы святить его» — это повеление из книги Шмот (Исход). «Храни день субботний» — из книги Дварим (Второзаконие). Мудрецы учат, что оба эти слова были произнесены Б-гом одновременно — чудо, которое невозможно в человеческой речи.</p>

<p>Каббалистическая традиция раскрывает ещё более глубокий смысл. Свечи представляют два вида света: «ор яшар» (прямой свет) — Б-жественное влияние, нисходящее в мир, и «ор хозер» (отражённый свет) — духовное пробуждение, поднимающееся снизу вверх. Зажигая свечи, женщина привлекает в свой дом оба этих потока святости.</p>

<p>Хасидская традиция добавляет, что свет свечей — это свет души. Притча Шломо говорит: «Свеча Б-га — душа человека». Зажигая субботние свечи, мы пробуждаем внутренний свет своей души и освещаем им весь дом. Именно поэтому многие женщины добавляют по одной свече за каждого ребёнка — каждая новая душа приносит дополнительный свет в мир.</p>`,

      en: `<p>Lighting Shabbat candles is one of the most beautiful and profound commandments in Jewish life. Every Friday evening, 18 minutes before sunset, Jewish women around the world light at least two candles while reciting a blessing. This moment is filled with special holiness — it is believed that at this very moment, Shabbat enters the home.</p>

<p>The two candles symbolize two aspects of the Shabbat commandment: "Remember" (Zachor) and "Keep" (Shamor). "Remember the Sabbath day to sanctify it" is the command from the book of Exodus. "Keep the Sabbath day" comes from Deuteronomy. The sages teach that both words were spoken by G-d simultaneously — a miracle impossible in human speech.</p>

<p>The Kabbalistic tradition reveals an even deeper meaning. The candles represent two types of light: "or yashar" (direct light) — Divine influence descending into the world, and "or chozer" (reflected light) — spiritual awakening rising from below. By lighting candles, a woman draws both streams of holiness into her home.</p>

<p>Chassidic tradition adds that the light of the candles is the light of the soul. Proverbs states: "The candle of G-d is the soul of man." By lighting Shabbat candles, we awaken the inner light of our soul and illuminate the entire home with it. This is why many women add one candle for each child — every new soul brings additional light into the world.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2025-12-08',
  },
  {
    id: '3',
    slug: 'kiddush-history-and-halacha',
    title: {
      ru: 'Кидуш — история и галаха',
      en: 'Kiddush — History and Halacha',
      he: 'קידוש — היסטוריה והלכה',
      uk: 'Кідуш — історія та галаха',
    },
    subtitle: {
      ru: 'Всё, что нужно знать о освящении Шаббата над бокалом вина',
      en: 'Everything you need to know about sanctifying Shabbat over a cup of wine',
      he: 'כל מה שצריך לדעת על קידוש השבת על כוס יין',
      uk: 'Все, що потрібно знати про освячення Шаббату над келихом вина',
    },
    content: {
      ru: `<p>Кидуш — это освящение Шаббата, произносимое над бокалом вина. Эта заповедь имеет свои корни в Торе: «Помни день субботний, чтобы святить его». Мудрецы Талмуда объясняют, что «помнить» означает выделить Шаббат словами — и лучший способ сделать это — произнести Кидуш. Традиция произносить Кидуш над вином восходит к временам Второго Храма.</p>

<p>Пятничный вечерний Кидуш состоит из нескольких частей: благословение на вино, текст о сотворении мира и благословение, освящающее день. В субботу утром произносится «Кидуша Рабба» — «Великий Кидуш», который короче вечернего, но не менее важен по галахе. Интересно, что утренний Кидуш можно произнести не только над вином, но и над другими алкогольными напитками.</p>

<p>Галахические правила Кидуша включают множество деталей. Бокал должен вмещать не менее «ревиит» (около 86 мл по мнению большинства авторитетов). Вино должно быть кошерным. Произносящий Кидуш должен выпить как минимум «мло лугмав» — полный глоток. Все присутствующие за столом выполняют заповедь, слушая Кидуш, при условии, что они намерены выполнить заповедь через слушание.</p>

<p>Кидуш — это не просто формальность. По учению хасидизма, в момент Кидуша мы свидетельствуем о том, что Б-г создал мир и дал нам Шаббат как знак вечного союза. Рабби Шнеур-Залман из Ляд учил, что слово «кидуш» (освящение) связано со словом «кадош» (святой) — произнося Кидуш, мы привносим святость в материальный мир, превращая обычную пятничную трапезу в духовное событие.</p>`,

      en: `<p>Kiddush is the sanctification of Shabbat recited over a cup of wine. This commandment has its roots in the Torah: "Remember the Sabbath day to sanctify it." The sages of the Talmud explain that "remembering" means distinguishing Shabbat with words — and the best way to do this is by reciting Kiddush. The tradition of reciting Kiddush over wine dates back to the time of the Second Temple.</p>

<p>The Friday evening Kiddush consists of several parts: the blessing over wine, the text about Creation, and the blessing sanctifying the day. On Saturday morning, "Kiddush Rabba" — the "Great Kiddush" — is recited. Though shorter than the evening version, it is no less important according to halacha. Interestingly, the morning Kiddush can be recited not only over wine but also over other alcoholic beverages.</p>

<p>The halachic rules of Kiddush include many details. The cup must hold at least a "revi'it" (approximately 86 ml according to most authorities). The wine must be kosher. The person reciting Kiddush must drink at least "melo lugmav" — a full cheekful. All those present at the table fulfill the commandment by listening to Kiddush, provided they intend to fulfill the commandment through listening.</p>

<p>Kiddush is not merely a formality. According to Chassidic teaching, at the moment of Kiddush we bear witness that G-d created the world and gave us Shabbat as a sign of an eternal covenant. Rabbi Schneur Zalman of Liadi taught that the word "kiddush" (sanctification) is connected to "kadosh" (holy) — by reciting Kiddush, we bring holiness into the material world, transforming an ordinary Friday meal into a spiritual event.</p>`,
    },
    tag: { ru: 'Галаха', en: 'Halacha', he: 'הלכה', uk: 'Галаха' },
    createdAt: '2025-12-15',
  },
  {
    id: '4',
    slug: 'shabbat-meals-traditions-and-customs',
    title: {
      ru: 'Субботние трапезы — традиции и обычаи',
      en: 'Shabbat Meals — Traditions and Customs',
      he: 'סעודות שבת — מסורות ומנהגים',
      uk: 'Суботні трапези — традиції та звичаї',
    },
    subtitle: {
      ru: 'Три трапезы Шаббата: от халы до «Шалош Сеудот»',
      en: 'The three meals of Shabbat: from challah to Shalosh Seudot',
      he: 'שלוש סעודות השבת: מחלה ועד סעודה שלישית',
      uk: 'Три трапези Шаббату: від хали до «Шалош Сеудот»',
    },
    content: {
      ru: `<p>Субботние трапезы занимают центральное место в праздновании Шаббата. Талмуд предписывает три обязательные трапезы: вечернюю (в пятницу вечером), утреннюю (в субботу днём после молитвы) и «сеуда шлишит» — третью трапезу (ближе к исходу Шаббата). Каждая из них имеет свой особый характер и духовное значение.</p>

<p>Пятничная вечерняя трапеза — самая торжественная. Она начинается с Кидуша, затем следует омовение рук и благословение на две халы (лехем мишне). Две халы напоминают о двойной порции манны, которую евреи получали в пустыне перед Шаббатом. Традиционное меню включает рыбу, куриный суп, мясо и десерт. Во время трапезы принято петь субботние песни (змирот) и обсуждать недельную главу Торы.</p>

<p>Утренняя субботняя трапеза следует после молитвы в синагоге. Она также начинается с Кидуша и двух хал. Главное блюдо — «чолнт» (или «хамин» в сефардской традиции) — горячее рагу, которое готовится с пятницы и томится всю ночь. Чолнт символизирует глубокую связь с традицией: его рецепты передаются из поколения в поколение.</p>

<p>Третья трапеза, «сеуда шлишит», проходит в предзакатные часы Шаббата. Это особенно духовное время, которое каббалисты называют «рацон» — временем особого Б-жественного благоволения. Хасидские ребе уделяли этой трапезе особое внимание: в эти часы произносились самые глубокие учения, пелись задумчивые мелодии. По учению Аризаля, именно во время третьей трапезы раскрывается самый высокий уровень души — «нешама».</p>`,

      en: `<p>Shabbat meals hold a central place in the celebration of Shabbat. The Talmud prescribes three obligatory meals: the evening meal (Friday night), the morning meal (Saturday afternoon after prayers), and "seuda shlishit" — the third meal (toward the end of Shabbat). Each has its own special character and spiritual significance.</p>

<p>The Friday evening meal is the most festive. It begins with Kiddush, followed by the ritual hand washing and the blessing over two challot (lechem mishneh). The two challot remind us of the double portion of manna that the Jews received in the desert before Shabbat. The traditional menu includes fish, chicken soup, meat, and dessert. During the meal, it is customary to sing Shabbat songs (zemirot) and discuss the weekly Torah portion.</p>

<p>The Saturday morning meal follows synagogue prayers. It also begins with Kiddush and two challot. The main dish is "cholent" (or "chamin" in Sephardic tradition) — a hot stew that is prepared on Friday and simmers overnight. Cholent symbolizes a deep connection to tradition: its recipes are passed down from generation to generation.</p>

<p>The third meal, "seuda shlishit," takes place in the hours before sunset on Shabbat. This is an especially spiritual time that Kabbalists call "ratzon" — a time of special Divine favor. Chassidic rebbes paid special attention to this meal: during these hours, the most profound teachings were shared and contemplative melodies were sung. According to the Arizal, it is during the third meal that the highest level of the soul — "neshama" — is revealed.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2025-12-22',
  },
  {
    id: '5',
    slug: 'havdalah-separating-holy-and-mundane',
    title: {
      ru: 'Авдала — отделение святого от будничного',
      en: 'Havdalah — Separating the Holy and the Mundane',
      he: 'הבדלה — הפרדה בין קודש לחול',
      uk: 'Авдала — відділення святого від буденного',
    },
    subtitle: {
      ru: 'Церемония проводов Шаббата: свеча, вино и благовония',
      en: 'The ceremony of bidding farewell to Shabbat: candle, wine, and spices',
      he: 'טקס פרידה מהשבת: נר, יין ובשמים',
      uk: 'Церемонія проводів Шаббату: свічка, вино та пахощі',
    },
    content: {
      ru: `<p>Авдала (הבדלה — «разделение») — это церемония, отмечающая окончание Шаббата и начало новой недели. Она совершается в субботу вечером после появления трёх звёзд на небе. Авдала включает четыре благословения: на вино, на благовония (бесамим), на свет (многофитильная свеча) и собственно благословение разделения между святым и будничным.</p>

<p>Каждый элемент Авдалы несёт глубокий символический смысл. Вино, как и в Кидуше, символизирует радость и святость. Благовония (обычно используют гвоздику, корицу или специальную смесь) — это утешение для «дополнительной души» (нешама йетера), которая покидает нас с исходом Шаббата. Мудрецы учат, что каждому еврею на Шаббат даётся дополнительная душа, усиливающая способность к духовному наслаждению.</p>

<p>Свеча Авдалы особенная — она должна иметь как минимум два фитиля. Это символизирует идею, что настоящий свет возникает от соединения разных источников. Принято смотреть на отражение пламени в ногтях — это напоминает о первом свете, который Адам увидел в Ган Эдене. Дети часто с восторгом наблюдают за этим моментом, и это прекрасная возможность передать им красоту традиции.</p>

<p>После Авдалы принято желать друг другу «шавуа тов» — «хорошей недели». Многие общины поют «Элияу а-Нави» — песню о пророке Элияу, предвестнике Машиаха. В хасидской традиции после Авдалы устраивают «мелаве малка» — «проводы царицы» (Шаббата), с песнями и рассказами. Это помогает сохранить свет Шаббата и перенести его в будни новой недели.</p>`,

      en: `<p>Havdalah (הבדלה — "separation") is the ceremony marking the end of Shabbat and the beginning of a new week. It is performed on Saturday evening after three stars appear in the sky. Havdalah includes four blessings: over wine, over spices (besamim), over light (a multi-wicked candle), and the blessing of separation between the holy and the mundane.</p>

<p>Each element of Havdalah carries deep symbolic meaning. Wine, as in Kiddush, symbolizes joy and holiness. Spices (typically cloves, cinnamon, or a special blend) serve as consolation for the "additional soul" (neshama yetera) that leaves us as Shabbat departs. The sages teach that every Jew is given an additional soul on Shabbat, enhancing the capacity for spiritual enjoyment.</p>

<p>The Havdalah candle is special — it must have at least two wicks. This symbolizes the idea that true light arises from the joining of different sources. It is customary to look at the flame's reflection in one's fingernails — a reminder of the first light that Adam saw in the Garden of Eden. Children often watch this moment with wonder, making it a beautiful opportunity to pass on the beauty of tradition.</p>

<p>After Havdalah, it is customary to wish each other "shavua tov" — "a good week." Many communities sing "Eliyahu HaNavi" — a song about the prophet Elijah, harbinger of Mashiach. In Chassidic tradition, a "melaveh malka" — "escorting the queen" (Shabbat) — is held after Havdalah, with songs and stories. This helps preserve the light of Shabbat and carry it into the days of the new week.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2026-01-05',
  },
  {
    id: '6',
    slug: 'teaching-children-about-shabbat',
    title: {
      ru: 'Как научить детей Шаббату',
      en: 'Teaching Children About Shabbat',
      he: 'איך ללמד ילדים על שבת',
      uk: 'Як навчити дітей Шаббату',
    },
    subtitle: {
      ru: 'Воспитание любви к Шаббату с раннего возраста',
      en: 'Nurturing a love of Shabbat from an early age',
      he: 'טיפוח אהבת שבת מגיל צעיר',
      uk: 'Виховання любові до Шаббату з раннього віку',
    },
    content: {
      ru: `<p>Одна из самых важных задач еврейских родителей — привить детям любовь к Шаббату. Это не просто передача знаний о законах и обычаях, а создание тёплых, радостных ассоциаций, которые останутся с ребёнком на всю жизнь. Ребе Менахем-Мендл Шнеерсон часто подчёркивал, что дети впитывают атмосферу Шаббата прежде, чем они способны понять его законы.</p>

<p>Начинать можно с самого раннего возраста. Даже младенцы чувствуют особую атмосферу: праздничную одежду, запах свежих хал, мерцание свечей. С двух-трёх лет дети могут активно участвовать в подготовке: помогать месить тесто для халы, расставлять тарелки, класть монетки в копилку цдаки перед зажиганием свечей. Маленькие девочки с трёх лет начинают зажигать свою свечу вместе с мамой.</p>

<p>Субботний стол — прекрасная возможность для семейного общения и обучения. Многие родители рассказывают детям историю недельной главы Торы в доступной форме, задают вопросы, устраивают викторины с маленькими призами. Пение субботних песен вместе — ещё один мощный способ создать позитивные ассоциации. Дети обожают петь, и многие змирот имеют простые, запоминающиеся мелодии.</p>

<p>Важно помнить, что для детей Шаббат должен ассоциироваться с радостью, а не с запретами. Вместо того чтобы говорить «нельзя смотреть телевизор», лучше предложить увлекательные альтернативы: настольные игры, книги, прогулки, визиты к друзьям. Суббота — это время, когда вся семья вместе, без отвлечения на гаджеты и работу. Для детей это бесценный подарок родительского внимания и любви.</p>`,

      en: `<p>One of the most important tasks of Jewish parents is to instill in children a love of Shabbat. This is not merely about transmitting knowledge of laws and customs, but about creating warm, joyful associations that will stay with a child for life. The Rebbe, Rabbi Menachem Mendel Schneerson, often emphasized that children absorb the atmosphere of Shabbat before they can understand its laws.</p>

<p>You can start from the earliest age. Even infants sense the special atmosphere: festive clothing, the smell of fresh challah, the flickering of candles. From age two or three, children can actively participate in preparation: helping knead challah dough, setting plates, putting coins in the tzedakah box before candle lighting. Little girls from age three begin lighting their own candle alongside their mother.</p>

<p>The Shabbat table is a wonderful opportunity for family bonding and learning. Many parents tell children the story of the weekly Torah portion in accessible terms, ask questions, and hold quizzes with small prizes. Singing Shabbat songs together is another powerful way to create positive associations. Children love to sing, and many zemirot have simple, memorable melodies.</p>

<p>It is important to remember that for children, Shabbat should be associated with joy, not restrictions. Instead of saying "you can't watch TV," it is better to offer engaging alternatives: board games, books, walks, visits to friends. Shabbat is a time when the whole family is together, without distractions from gadgets and work. For children, this is a priceless gift of parental attention and love.</p>`,
    },
    tag: { ru: 'Семья', en: 'Family', he: 'משפחה', uk: 'Сім\'я' },
    createdAt: '2026-01-12',
  },
  {
    id: '7',
    slug: 'shabbat-in-the-modern-world',
    title: {
      ru: 'Шаббат в современном мире',
      en: 'Shabbat in the Modern World',
      he: 'שבת בעולם המודרני',
      uk: 'Шаббат у сучасному світі',
    },
    subtitle: {
      ru: 'Как древняя традиция отвечает на вызовы цифровой эпохи',
      en: 'How an ancient tradition answers the challenges of the digital age',
      he: 'איך מסורת עתיקה עונה על אתגרי העידן הדיגיטלי',
      uk: 'Як давня традиція відповідає на виклики цифрової епохи',
    },
    content: {
      ru: `<p>В эпоху смартфонов, социальных сетей и постоянной подключённости Шаббат приобретает совершенно новое значение. То, что тысячи лет назад было заповедью об отдыхе от физического труда, сегодня стало спасительным островком тишины в океане информационного шума. Всё больше людей — даже далёких от религии — открывают для себя ценность «цифрового детокса», который Шаббат предлагает уже более трёх тысяч лет.</p>

<p>Современные исследования подтверждают мудрость этой древней практики. Учёные из Гарварда и Стэнфорда доказали, что регулярный отдых от технологий улучшает когнитивные функции, снижает уровень стресса и укрепляет отношения в семье. Шаббат предлагает не просто отключение от экранов, а полную смену режима: от потребления — к осмыслению, от скорости — к глубине, от виртуального — к реальному.</p>

<p>Для многих современных евреев соблюдение Шаббата связано с практическими вызовами. Как быть с рабочими сообщениями? Как объяснить коллегам недоступность на 25 часов? Как справиться с «синдромом упущенных возможностей» (FOMO)? Опыт показывает, что после нескольких недель соблюдения эти страхи исчезают. Мир продолжает вращаться, а субботний отдых даёт силы для более продуктивной работы в остальные дни.</p>

<p>Интересно, что идея Шаббата проникла и в светскую культуру. Книга Тиффани Шлейн «24/6» стала бестселлером, популяризировав концепцию «технологического Шаббата». Крупные компании Кремниевой долины вводят практику «дней без экранов». Но еврейский Шаббат — это нечто гораздо большее, чем просто детокс: это встреча с собой, с семьёй и со Всевышним. Это напоминание о том, что мы — не рабы технологий, а свободные люди.</p>`,

      en: `<p>In the era of smartphones, social media, and constant connectivity, Shabbat takes on an entirely new significance. What thousands of years ago was a commandment about resting from physical labor has today become a lifesaving island of quiet in an ocean of information noise. More and more people — even those far from religion — are discovering the value of the "digital detox" that Shabbat has been offering for over three thousand years.</p>

<p>Modern research confirms the wisdom of this ancient practice. Scientists from Harvard and Stanford have proven that regular breaks from technology improve cognitive function, reduce stress levels, and strengthen family relationships. Shabbat offers not just disconnection from screens, but a complete mode shift: from consumption to reflection, from speed to depth, from virtual to real.</p>

<p>For many modern Jews, observing Shabbat comes with practical challenges. What about work messages? How do you explain 25 hours of unavailability to colleagues? How do you cope with FOMO? Experience shows that after a few weeks of observance, these fears disappear. The world keeps turning, and Shabbat rest provides energy for more productive work the rest of the week.</p>

<p>Interestingly, the idea of Shabbat has penetrated secular culture as well. Tiffany Shlain's book "24/6" became a bestseller, popularizing the concept of a "technology Shabbat." Major Silicon Valley companies have introduced "screen-free day" practices. But Jewish Shabbat is far more than just a detox: it is an encounter with yourself, with family, and with the Almighty. It is a reminder that we are not slaves to technology, but free people.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2026-01-19',
  },
  {
    id: '8',
    slug: 'the-power-of-shabbat-rest',
    title: {
      ru: 'Сила субботнего покоя',
      en: 'The Power of Shabbat Rest',
      he: 'כוחה של מנוחת השבת',
      uk: 'Сила суботнього спокою',
    },
    subtitle: {
      ru: 'Менуха — покой, который восстанавливает тело и душу',
      en: 'Menucha — rest that restores body and soul',
      he: 'מנוחה — המרגוע שמשקם גוף ונשמה',
      uk: 'Менуха — спокій, що відновлює тіло і душу',
    },
    content: {
      ru: `<p>Понятие «менуха» (מנוחה — покой) в еврейской традиции — это нечто гораздо большее, чем просто отсутствие работы. Мидраш рассказывает, что когда Б-г завершил Творение, мир был прекрасен, но в нём чего-то не хватало. Что было создано в седьмой день? Менуха — покой. Это не пустота и не бездействие, а позитивное состояние гармонии, полноты и внутреннего мира.</p>

<p>Рамбам (Маймонид) пишет, что субботний покой включает не только физический отдых, но и умственный. В Шаббат запрещено не только работать, но и думать о работе, обсуждать деловые вопросы и даже планировать будущие дела. Это создаёт уникальное пространство, в котором человек может полностью присутствовать в настоящем моменте — то, что современная психология называет «осознанностью» (mindfulness).</p>

<p>Хасидская философия раскрывает ещё более глубокий уровень менухи. Рабби Шнеур-Залман из Ляд в «Тании» объясняет, что в будние дни душа человека находится в состоянии «ратцо ва-шов» — стремления и возвращения, постоянного движения между духовным и материальным. В Шаббат наступает состояние «менуха» — душа достигает покоя, подобно путнику, достигшему цели своего путешествия.</p>

<p>Практически это выражается в особом качестве субботнего дня. Люди, соблюдающие Шаббат, описывают ощущение «другого времени» — минуты текут медленнее, краски мира становятся ярче, отношения с близкими — глубже. Это не магия и не самовнушение, а результат того, что человек впервые за неделю позволяет себе просто быть — без необходимости что-то делать, достигать, производить. В этом покое рождается настоящая радость.</p>`,

      en: `<p>The concept of "menucha" (מנוחה — rest) in Jewish tradition is far more than simply the absence of work. The Midrash relates that when G-d completed Creation, the world was beautiful, but something was missing. What was created on the seventh day? Menucha — rest. This is not emptiness or inactivity, but a positive state of harmony, completeness, and inner peace.</p>

<p>The Rambam (Maimonides) writes that Shabbat rest includes not only physical rest but also mental rest. On Shabbat, it is forbidden not only to work but also to think about work, discuss business matters, or even plan future tasks. This creates a unique space in which a person can be fully present in the current moment — what modern psychology calls "mindfulness."</p>

<p>Chassidic philosophy reveals an even deeper level of menucha. Rabbi Schneur Zalman of Liadi explains in the Tanya that during weekdays, the human soul exists in a state of "ratzo va-shov" — striving and returning, constant movement between the spiritual and material. On Shabbat, a state of "menucha" arrives — the soul achieves rest, like a traveler who has reached the destination of their journey.</p>

<p>In practice, this is expressed in the special quality of the Shabbat day. People who observe Shabbat describe the feeling of "different time" — minutes flow more slowly, the colors of the world become brighter, relationships with loved ones grow deeper. This is not magic or autosuggestion, but the result of a person allowing themselves for the first time in a week to simply be — without the need to do, achieve, or produce. In this rest, true joy is born.</p>`,
    },
    tag: { ru: 'Хасидус', en: 'Chassidus', he: 'חסידות', uk: 'Хасидус' },
    createdAt: '2026-01-26',
  },
  {
    id: '9',
    slug: 'shabbat-songs-zemiros',
    title: {
      ru: 'Субботние песни (змирот) — смысл и традиция',
      en: 'Shabbat Songs (Zemiros) — Meaning and Tradition',
      he: 'זמירות שבת — משמעות ומסורת',
      uk: 'Суботні пісні (змірот) — зміст і традиція',
    },
    subtitle: {
      ru: 'Мелодии, которые объединяют поколения за субботним столом',
      en: 'Melodies that unite generations at the Shabbat table',
      he: 'מנגינות שמאחדות דורות סביב שולחן השבת',
      uk: 'Мелодії, що об\'єднують покоління за суботнім столом',
    },
    content: {
      ru: `<p>Змирот (זמירות — «песни») — это неотъемлемая часть субботних трапез. На протяжении веков поэты и мудрецы создавали гимны в честь Шаббата, и многие из этих песен поются за еврейским субботним столом по сей день. Пение змирот — это не просто развлечение, а важный элемент заповеди «наслаждения Шаббатом» (онег Шаббат).</p>

<p>Среди самых известных змирот — «Шалом Алейхем» (приветствие ангелов, сопровождающих человека домой из синагоги), «Эшет Хаиль» (хвала добродетельной жене из книги Притчей), «Цур Мишело» (благодарность Б-гу за пищу), «Менуха ве-Симха» (о покое и радости Шаббата). Каждая из этих песен имеет множество мелодий — ашкеназских, сефардских, хасидских — и семья может выбирать те, которые ей ближе.</p>

<p>Особое место в хасидской традиции занимают нигуним — мелодии без слов. Основатель хасидизма Бааль Шем Тов учил, что мелодия может достичь таких духовных высот, куда слова не способны подняться. Субботний нигун за столом — это момент, когда все присутствующие соединяются в единой молитве сердца, когда исчезают различия и остаётся только чистое стремление души к Творцу.</p>

<p>Пение змирот имеет и важную педагогическую функцию. Через простые, запоминающиеся мелодии дети усваивают основы еврейского мировоззрения. Многие взрослые евреи вспоминают, что именно субботние песни детства были первым шагом в их духовном путешествии. Создайте свою семейную традицию: выберите несколько любимых змирот и пойте их каждую субботу. Со временем это станет одним из самых дорогих семейных ритуалов.</p>`,

      en: `<p>Zemirot (זמירות — "songs") are an integral part of Shabbat meals. Over the centuries, poets and sages have composed hymns in honor of Shabbat, and many of these songs are still sung at Jewish Shabbat tables today. Singing zemirot is not merely entertainment but an important element of the commandment of "Shabbat enjoyment" (oneg Shabbat).</p>

<p>Among the most famous zemirot are "Shalom Aleichem" (greeting the angels who accompany a person home from synagogue), "Eshet Chayil" (praise of the virtuous wife from Proverbs), "Tzur Mishelo" (gratitude to G-d for sustenance), and "Menucha V'Simcha" (about Shabbat rest and joy). Each of these songs has many melodies — Ashkenazi, Sephardic, Chassidic — and each family can choose those closest to their heart.</p>

<p>Niggunim — wordless melodies — hold a special place in Chassidic tradition. The founder of Chassidism, the Baal Shem Tov, taught that a melody can reach spiritual heights where words cannot ascend. A Shabbat niggun at the table is a moment when all present unite in a single prayer of the heart, when differences disappear and only the pure yearning of the soul toward the Creator remains.</p>

<p>Singing zemirot also serves an important educational function. Through simple, memorable melodies, children absorb the foundations of the Jewish worldview. Many adult Jews recall that it was the Shabbat songs of their childhood that were the first step in their spiritual journey. Create your own family tradition: choose a few favorite zemirot and sing them every Shabbat. Over time, this will become one of your family's most cherished rituals.</p>`,
    },
    tag: { ru: 'Шаббат', en: 'Shabbat', he: 'שבת', uk: 'Шаббат' },
    createdAt: '2026-02-02',
  },
  {
    id: '10',
    slug: 'friday-night-family-atmosphere',
    title: {
      ru: 'Пятничный вечер — создание семейной атмосферы',
      en: 'Friday Night — Creating a Family Atmosphere',
      he: 'ליל שישי — יצירת אווירה משפחתית',
      uk: 'П\'ятничний вечір — створення сімейної атмосфери',
    },
    subtitle: {
      ru: 'Как превратить пятничный вечер в самое ожидаемое событие недели',
      en: 'How to make Friday night the most anticipated event of the week',
      he: 'איך להפוך את ליל שישי לאירוע המיוחל ביותר בשבוע',
      uk: 'Як перетворити п\'ятничний вечір на найочікуванішу подію тижня',
    },
    content: {
      ru: `<p>Пятничный вечер — это волшебное время в еврейском доме. С зажиганием свечей обычная квартира превращается в маленький храм, семейный ужин — в священную трапезу, а будничные отношения наполняются особым теплом и глубиной. Создание правильной атмосферы — это искусство, которое передаётся из поколения в поколение.</p>

<p>Всё начинается с подготовки. Белая скатерть на столе, красиво сервированная посуда, две халы под специальной салфеткой, бокал для Кидуша, зажжённые свечи — эти простые элементы создают визуальный образ праздника. Многие семьи используют специальную субботнюю посуду и столовые приборы, которые достаются только в Шаббат. Это подчёркивает особенность дня и создаёт ощущение торжественности.</p>

<p>Благословение детей — одна из самых трогательных традиций пятничного вечера. Отец (а иногда и мать) возлагает руки на голову каждого ребёнка и благословляет его: мальчиков — «Да уподобит тебя Б-г Эфраиму и Менаше», девочек — «Да уподобит тебя Б-г Саре, Ривке, Рахели и Лее». Затем добавляется священническое благословение. Этот еженедельный ритуал укрепляет связь между родителями и детьми и даёт ребёнку чувство защищённости и любви.</p>

<p>После Кидуша и благословения на халу начинается сама трапеза — время для неспешного общения, рассказов, обсуждения прошедшей недели и планов. Многие семьи заводят традицию, что каждый за столом делится чем-то хорошим, что произошло с ним за неделю. Нет телефонов, нет экранов — только живые лица, живые голоса, живое тепло. В нашем разобщённом мире это, пожалуй, самый ценный подарок, который мы можем дать своей семье.</p>`,

      en: `<p>Friday night is a magical time in a Jewish home. With the lighting of candles, an ordinary apartment transforms into a small temple, a family dinner becomes a sacred meal, and everyday relationships are filled with special warmth and depth. Creating the right atmosphere is an art passed down from generation to generation.</p>

<p>It all begins with preparation. A white tablecloth, beautifully set dishes, two challot under a special cover, a Kiddush cup, lit candles — these simple elements create a visual image of celebration. Many families use special Shabbat dishes and silverware that are brought out only on Shabbat. This emphasizes the uniqueness of the day and creates a sense of solemnity.</p>

<p>Blessing the children is one of the most touching Friday night traditions. The father (and sometimes the mother) places hands on each child's head and blesses them: boys with "May G-d make you like Ephraim and Menashe," girls with "May G-d make you like Sarah, Rebecca, Rachel, and Leah." Then the priestly blessing is added. This weekly ritual strengthens the bond between parents and children and gives the child a sense of security and love.</p>

<p>After Kiddush and the blessing over challah, the meal begins — a time for unhurried conversation, storytelling, discussing the past week and future plans. Many families establish a tradition where everyone at the table shares something good that happened during the week. No phones, no screens — only living faces, living voices, living warmth. In our disconnected world, this is perhaps the most valuable gift we can give our family.</p>`,
    },
    tag: { ru: 'Семья', en: 'Family', he: 'משפחה', uk: 'Сім\'я' },
    createdAt: '2026-02-09',
  },
  {
    id: 'bitachon-1',
    slug: 'illyuziya-sobstvennosti-pochemu-vashi-dengi-vam-ne-prinadlezhat',
    title: {
      ru: 'Иллюзия собственности: почему ваши деньги вам не принадлежат',
      en: 'The Illusion of Ownership: Why Your Money Doesn\'t Belong to You',
      he: 'אשליית הבעלות: למה הכסף שלך לא שייך לך',
      uk: 'Ілюзія власності: чому ваші гроші вам не належать',
    },
    subtitle: {
      ru: 'Богатство как чужой депозит и проклятие рассеивания мыслей',
      en: 'Wealth as someone else\'s deposit and the curse of scattered thoughts',
      he: 'עושר כפיקדון של אחרים וקללת פיזור המחשבות',
      uk: 'Багатство як чужий депозит і прокляття розсіювання думок',
    },
    content: {
      ru: `<p>Многие люди тратят жизнь на накопление капитала, считая его залогом своей безопасности. Однако, согласно источникам, вера в то, что богатство принадлежит человеку, — это опасное заблуждение.</p>

<h3>Богатство как чужой депозит</h3>
<p>На самом деле, деньги, которыми вы владеете, могут быть разделены на три категории: ваши личные средства на пропитание, средства для ваших иждивенцев и «чужой депозит». Часто человек копит огромные суммы, которые ему никогда не удастся потратить. В таком случае он является лишь временным охранником, оберегающим имущество, которое в итоге перейдет к его праведному наследнику или даже к его врагу.</p>

<h3>Проклятие «рассеивания мыслей»</h3>
<p>Богатство часто становится не благом, а источником стресса. В источниках упоминается понятие «рассеивание мыслей», когда активы человека разбросаны по разным местам, что лишает его сна и покоя. В то время как обычный рабочий спит спокойно, избыток имущества заставляет богача постоянно беспокоиться о сохранности своих накоплений.</p>

<h3>Этическая ловушка</h3>
<p>Самая большая ошибка — это высокомерие. Человек, накопивший богатство, часто ждет благодарности от тех, кому он помогает. Но источники утверждают: богатый должен сам благодарить Бога за то, что Тот выбрал его каналом (воронкой) для передачи благ другим. Если человек считает деньги своей заслугой, он совершает форму идолопоклонства, наделяя «средство» (деньги) силой «Причины» (Бога).</p>`,

      en: `<p>Many people spend their lives accumulating capital, considering it the key to their security. However, according to Torah sources, the belief that wealth belongs to a person is a dangerous delusion.</p>

<h3>Wealth as Someone Else's Deposit</h3>
<p>In reality, the money you possess can be divided into three categories: your personal means for sustenance, means for your dependents, and "someone else's deposit." Often a person accumulates enormous sums they will never be able to spend. In such cases, they are merely a temporary guardian, protecting property that will ultimately pass to their righteous heir or even to their enemy.</p>

<h3>The Curse of "Scattered Thoughts"</h3>
<p>Wealth often becomes not a blessing but a source of stress. The sources mention the concept of "scattered thoughts," when a person's assets are spread across different places, robbing them of sleep and peace. While an ordinary worker sleeps peacefully, excess property forces the wealthy to constantly worry about the safety of their savings.</p>

<h3>The Ethical Trap</h3>
<p>The greatest mistake is arrogance. A person who has accumulated wealth often expects gratitude from those they help. But the sources state: the wealthy person should themselves thank God for choosing them as a channel (funnel) for transmitting blessings to others. If a person considers money their own merit, they commit a form of idolatry, endowing the "means" (money) with the power of the "Cause" (God).</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-2',
    slug: 'medicina-ili-fatalizm-kogda-vizit-k-vrachu-stanovitsya-grekhom',
    title: {
      ru: 'Медицина или фатализм: когда визит к врачу становится грехом?',
      en: 'Medicine or Fatalism: When Does Visiting a Doctor Become a Sin?',
      he: 'רפואה או גורלנות: מתי ביקור אצל רופא הופך לחטא?',
      uk: 'Медицина чи фаталізм: коли візит до лікаря стає гріхом?',
    },
    subtitle: {
      ru: 'Баланс между упованием на Бога и обращением за медицинской помощью',
      en: 'The balance between trusting God and seeking medical help',
      he: 'האיזון בין ביטחון בה\' לבין פנייה לעזרה רפואית',
      uk: 'Баланс між упованням на Бога та зверненням по медичну допомогу',
    },
    content: {
      ru: `<p>Один из самых острых вопросов духовной жизни — баланс между упованием на Бога и обращением за медицинской помощью. Является ли поход к врачу признаком неверия?</p>

<h3>Урок короля Асы</h3>
<p>В источниках приводится история царя Иудеи Асы, который был наказан за то, что при болезни ног «взыскал не Господа, а врачей». Его ошибка заключалась не в самом обращении к медицине, а в том, что он партнерствовал Бога с людьми, полагая, что врачи могут исцелить его сами по себе, без божественной воли.</p>

<h3>Врач как инструмент, а не спаситель</h3>
<p>Согласно Торе, человеку дано разрешение и обязанность лечить и лечиться. Однако важно понимать, что врач — это лишь «сосуд» или проводник, через который Бог посылает исцеление. Если человек зацикливается на медицинских прогнозах и впадает в отчаяние, он ослабляет свою связь с Источником жизни, что может негативно сказаться на его удаче (мазаль) и процессе выздоровления.</p>

<h3>Парадокс лекарств</h3>
<p>Иногда Бог может исцелить человека даже с помощью того, что по природе вредно, как это было в истории пророка Елисея, который «исправил» воду, бросив в неё соль. Это доказывает, что исцеление — это не химический процесс, а воля Творца, облеченная в форму естественных средств.</p>`,

      en: `<p>One of the sharpest questions in spiritual life is the balance between trusting God and seeking medical help. Is going to a doctor a sign of disbelief?</p>

<h3>The Lesson of King Asa</h3>
<p>The sources cite the story of Asa, king of Judah, who was punished because when his feet became diseased, "he sought not the Lord, but physicians." His mistake was not in seeking medical help itself, but in partnering God with people, believing that doctors could heal him on their own, without divine will.</p>

<h3>The Doctor as an Instrument, Not a Savior</h3>
<p>According to the Torah, a person is given both permission and obligation to heal and be healed. However, it is important to understand that a doctor is merely a "vessel" or conduit through which God sends healing. If a person becomes fixated on medical prognoses and falls into despair, they weaken their connection to the Source of life, which can negatively affect their fortune (mazal) and recovery process.</p>

<h3>The Paradox of Medicine</h3>
<p>Sometimes God can heal a person even through something that is naturally harmful, as in the story of the prophet Elisha who "fixed" the water by throwing salt into it. This proves that healing is not a chemical process, but the will of the Creator clothed in the form of natural means.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-3',
    slug: 'gorkaya-pravda-o-spravedlivosti-pochemu-podletsam-vezet',
    title: {
      ru: 'Горькая правда о справедливости: почему подонкам везет?',
      en: 'The Bitter Truth About Justice: Why Do Scoundrels Prosper?',
      he: 'האמת המרה על צדק: למה לרשעים מזל?',
      uk: 'Гірка правда про справедливість: чому негідникам щастить?',
    },
    subtitle: {
      ru: 'Вопрос о том, почему праведники страдают, а грешники процветают',
      en: 'Why the righteous suffer while sinners prosper',
      he: 'למה צדיקים סובלים בעוד רשעים משגשגים',
      uk: 'Чому праведники страждають, а грішники процвітають',
    },
    content: {
      ru: `<p>Вопрос о том, почему праведники страдают, а грешники процветают, веками терзает человечество. Источники предлагают ответы, которые могут показаться провокационными для современного чувства справедливости.</p>

<h3>Почему процветают злодеи?</h3>
<p>Существует несколько причин, по которым Бог дает материальные блага нечестивым людям:</p>
<p><strong>Плата за крупицы добра:</strong> Если злодей совершил хотя бы несколько хороших поступков, Бог вознаграждает его в этом мире, чтобы в будущем мире (Мире Грядущем) он не имел прав на награду и был полностью уничтожен.</p>
<p><strong>Богатство как ловушка:</strong> Деньги могут быть даны злодею, чтобы усилить его гордыню, что в итоге станет прямой причиной его гибели.</p>
<p><strong>Хранение для других:</strong> Злодей может быть лишь временным «сейфом», накапливающим богатство для праведного сына, который родится у него в будущем.</p>

<h3>Почему страдают праведные?</h3>
<p>Для страданий хороших людей также есть скрытые причины:</p>
<p><strong>Искупление:</strong> Мелкие страдания в этом мире очищают душу праведника, избавляя его от необходимости наказания после смерти.</p>
<p><strong>Испытание любви:</strong> Бог посылает испытания, чтобы проявить стойкость праведника и сделать его примером для других.</p>
<p><strong>Пассивность:</strong> Праведник может страдать из-за того, что он не проявлял ревности к Богу и не протестовал против грехов своего поколения.</p>

<p>Наша неспособность понять эти процессы проистекает из ограниченности человеческого интеллекта, который видит лишь малую часть огромного плана. Смерть — это не конец, а возвращение души в её естественное состояние, где истинная справедливость становится очевидной.</p>`,

      en: `<p>The question of why the righteous suffer while sinners prosper has tormented humanity for centuries. Torah sources offer answers that may seem provocative to our modern sense of justice.</p>

<h3>Why Do the Wicked Prosper?</h3>
<p>There are several reasons why God gives material blessings to wicked people:</p>
<p><strong>Payment for crumbs of good:</strong> If a villain performed even a few good deeds, God rewards them in this world so that in the World to Come they have no claim to reward and are completely destroyed.</p>
<p><strong>Wealth as a trap:</strong> Money may be given to a villain to intensify their pride, which ultimately becomes the direct cause of their downfall.</p>
<p><strong>Storage for others:</strong> The villain may merely be a temporary "safe," accumulating wealth for a righteous son who will be born to them in the future.</p>

<h3>Why Do the Righteous Suffer?</h3>
<p>There are also hidden reasons for the suffering of good people:</p>
<p><strong>Atonement:</strong> Minor sufferings in this world purify the soul of the righteous, freeing them from the need for punishment after death.</p>
<p><strong>Test of love:</strong> God sends trials to reveal the steadfastness of the righteous and make them an example for others.</p>
<p><strong>Passivity:</strong> A righteous person may suffer because they did not show zealousness for God and did not protest against the sins of their generation.</p>

<p>Our inability to understand these processes stems from the limitations of human intellect, which sees only a small part of a vast plan. Death is not the end, but the return of the soul to its natural state, where true justice becomes evident.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-4',
    slug: 'dukhovnyy-shantazh-pochemu-fraza-snachala-zarabotayu-eto-lovushka',
    title: {
      ru: 'Духовный шантаж: почему фраза «сначала заработаю, потом займусь душой» — это ловушка',
      en: 'Spiritual Blackmail: Why "I\'ll Earn First, Then Focus on My Soul" Is a Trap',
      he: 'סחיטה רוחנית: למה "קודם ארוויח, אחר כך אטפל בנשמה" זה מלכודת',
      uk: 'Духовний шантаж: чому фраза «спочатку заробіть, потім займусь душею» — це пастка',
    },
    subtitle: {
      ru: 'Почему требование материальных гарантий перед духовным ростом — это вымогательство у Творца',
      en: 'Why demanding material guarantees before spiritual growth is extortion from the Creator',
      he: 'למה דרישת ערבויות חומריות לפני צמיחה רוחנית היא סחיטה מהבורא',
      uk: 'Чому вимога матеріальних гарантій перед духовним зростанням — це вимагання у Творця',
    },
    content: {
      ru: `<p>Многие современные люди живут с установкой: «Мне нужно сначала создать финансовую подушку безопасности, а уже потом я уделю время молитве, семье или самопознанию». В источниках такая позиция называется «сектой владельцев залогов».</p>

<h3>Вымогательство у Творца</h3>
<p>Человек, который требует от жизни материальных гарантий прежде, чем начнет исполнять свои духовные обязанности, ведет себя как наглый слуга, требующий плату вперед. Это выглядит абсурдно: мы уже пользуемся «кредитом» жизни, здоровьем и воздухом, за которые еще не расплатились, но требуем от Бога «залог» в виде богатства, чтобы просто начать вести себя достойно.</p>

<h3>Иллюзия «спокойной пенсии»</h3>
<p>Главный миф заключается в том, что богатство принесет покой. Источники утверждают обратное: умножение имущества лишь умножает беспокойство. Вместо того чтобы освободить мысли для высокого, накопленный капитал заставляет человека дрожать над курсом валют и сохранностью активов, превращая его жизнь в бесконечный стресс. Истинная безопасность — это не сумма на счету, а осознание того, что завтрашний день уже обеспечен Тем, Кто создал этот мир.</p>`,

      en: `<p>Many modern people live with the mindset: "I need to create a financial safety net first, and only then will I dedicate time to prayer, family, or self-discovery." In the sources, this position is called "the sect of pledge holders."</p>

<h3>Extortion from the Creator</h3>
<p>A person who demands material guarantees from life before beginning to fulfill their spiritual duties behaves like an impudent servant demanding payment in advance. It looks absurd: we are already using the "credit" of life, health, and air for which we haven't yet paid, yet we demand from God a "pledge" in the form of wealth just to start behaving decently.</p>

<h3>The Illusion of a "Peaceful Retirement"</h3>
<p>The main myth is that wealth will bring peace. The sources assert the opposite: multiplying possessions only multiplies anxiety. Instead of freeing the mind for higher things, accumulated capital forces a person to tremble over exchange rates and asset safety, turning their life into endless stress. True security is not the sum in your account, but the awareness that tomorrow is already provided for by the One Who created this world.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-5',
    slug: 'paradoks-usiliy-esli-vsyo-predopredeleno-zachem-khodit-na-rabotu',
    title: {
      ru: 'Парадокс усилий: если всё предопределено, зачем вообще ходить на работу?',
      en: 'The Effort Paradox: If Everything Is Predetermined, Why Go to Work at All?',
      he: 'פרדוקס המאמץ: אם הכל נקבע מראש, למה בכלל ללכת לעבודה?',
      uk: 'Парадокс зусиль: якщо все визначено, навіщо взагалі ходити на роботу?',
    },
    subtitle: {
      ru: 'Работа как маскировка чуда и лекарство от бунта',
      en: 'Work as a disguise for miracles and a remedy against rebellion',
      he: 'עבודה כהסוואה לנס ותרופה נגד מרד',
      uk: 'Робота як маскування дива і ліки від бунту',
    },
    content: {
      ru: `<p>Это один из самых «взрывоопасных» вопросов: если Бог уже решил в Рош а-Шана, сколько вы заработаете, то зачем вставать с дивана? Ответ источников переворачивает привычное понимание труда.</p>

<h3>Работа как «маскировка» чуда</h3>
<p>Ваши усилия — это не причина заработка, а всего лишь «сосуд» или декорация, в которую Бог упаковывает Своё благословение. Бог мог бы кормить нас манной, падающей с неба, но Он хочет, чтобы мы были Его партнерами в творении, скрывая чудеса под видом естественных процессов.</p>

<h3>Труд как лекарство от бунта</h3>
<p>Зачем Бог заставил человека трудиться в поте лица? Чтобы мы не сошли с ума от безделья. Если бы у человека было всё и сразу без усилий, его разум переключился бы на саморазрушение и низменные страсти. Работа — это предохранитель, удерживающий нас от духовного восстания против Творца и самих себя. Истинный успех приходит не к тому, кто «пашет» больше всех, а к тому, кто делает разумные усилия, сохраняя сердце свободным для Бога.</p>`,

      en: `<p>This is one of the most "explosive" questions: if God has already decided on Rosh Hashanah how much you will earn, then why get off the couch? The answer from the sources turns the usual understanding of labor upside down.</p>

<h3>Work as a "Disguise" for Miracles</h3>
<p>Your efforts are not the cause of your earnings, but merely a "vessel" or decoration in which God packages His blessing. God could feed us with manna falling from the sky, but He wants us to be His partners in creation, hiding miracles under the guise of natural processes.</p>

<h3>Labor as a Remedy Against Rebellion</h3>
<p>Why did God make humans toil by the sweat of their brow? So we wouldn't go mad from idleness. If a person had everything at once without effort, their mind would switch to self-destruction and base passions. Work is a safeguard holding us back from spiritual rebellion against the Creator and ourselves. True success comes not to those who "grind" the hardest, but to those who make reasonable efforts while keeping their heart free for God.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-6',
    slug: 'advokat-dyavola-pochemu-vash-zaklyatyy-vrag-eto-poslannik-svyshe',
    title: {
      ru: 'Адвокат дьявола: почему ваш заклятый враг — это посланник свыше?',
      en: 'Devil\'s Advocate: Why Your Sworn Enemy Is a Messenger from Above?',
      he: 'סנגור השטן: למה האויב המושבע שלך הוא שליח מלמעלה?',
      uk: 'Адвокат диявола: чому ваш заклятий ворог — це посланець згори?',
    },
    subtitle: {
      ru: 'Никто не может причинить вам вред, если это не было предписано Богом',
      en: 'No one can harm you unless it was decreed by God',
      he: 'אף אחד לא יכול להזיק לך אלא אם זה נגזר מלמעלה',
      uk: 'Ніхто не може завдати вам шкоди, якщо це не було наказано Богом',
    },
    content: {
      ru: `<p>Эта тема кажется невыносимой для эго: источники утверждают, что никто не может причинить вам вред, если это не было предписано Богом.</p>

<h3>Враг как «хирургический скальпель»</h3>
<p>Когда кто-то оскорбляет вас или вредит вашему бизнесу, этот человек — лишь инструмент в руках Провидения. Как бессмысленно злиться на палку, которой вас ударили, так же бессмысленно концентрировать ненависть на обидчике. Источники предлагают шокирующую практику: вместо того чтобы мстить, проанализируйте свои поступки. Возможно, этот «враг» был послан, чтобы вы искупили старый долг или осознали скрытый изъян в своем характере.</p>

<h3>Любовь к «искрам»</h3>
<p>Как можно любить того, кто тебя ненавидит? Секрет в разделении личности и её корня. Внутри самого ужасного негодяя есть Божественная искра, которая дает ему жизнь прямо сейчас. Мы можем ненавидеть его злые поступки, но обязаны сострадать его душе, которая оказалась в плену у зла. Тот, кто осознает это, обретает сверхчеловеческое спокойствие: его невозможно задеть, ведь он знает, что его судьба — в руках Любящего Отца, а не в руках завистливого соседа.</p>`,

      en: `<p>This topic seems unbearable for the ego: the sources assert that no one can harm you unless it was decreed by God.</p>

<h3>The Enemy as a "Surgical Scalpel"</h3>
<p>When someone insults you or harms your business, that person is merely an instrument in the hands of Providence. Just as it is pointless to be angry at the stick that struck you, it is equally pointless to concentrate hatred on the offender. The sources propose a shocking practice: instead of taking revenge, analyze your own deeds. Perhaps this "enemy" was sent so that you might atone for an old debt or recognize a hidden flaw in your character.</p>

<h3>Love for the "Sparks"</h3>
<p>How can you love someone who hates you? The secret lies in separating the personality from its root. Inside the most terrible scoundrel there is a Divine spark that gives them life right now. We may hate their evil deeds, but we are obligated to have compassion for their soul, which has been captured by evil. One who realizes this attains superhuman tranquility: they cannot be hurt, for they know that their fate is in the hands of a Loving Father, not in the hands of an envious neighbor.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-7',
    slug: 'geneticheskoye-rabstvo-ili-bozhestvennoye-prizvaniye',
    title: {
      ru: 'Генетическое рабство или божественное призвание: почему вы ненавидите свою работу?',
      en: 'Genetic Slavery or Divine Calling: Why Do You Hate Your Job?',
      he: 'עבדות גנטית או ייעוד אלוקי: למה אתה שונא את העבודה שלך?',
      uk: 'Генетичне рабство чи божественне покликання: чому ви ненавидите свою роботу?',
    },
    subtitle: {
      ru: 'Ваша профессия уже закодирована в вашем теле и характере',
      en: 'Your profession is already encoded in your body and character',
      he: 'המקצוע שלך כבר מקודד בגוף ובאופי שלך',
      uk: 'Ваша професія вже закодована у вашому тілі та характері',
    },
    content: {
      ru: `<p>Современный мир учит нас, что мы можем стать кем угодно, но источники утверждают обратное: ваша профессия уже «закодирована» в вашем теле и характере.</p>

<h3>Биологический дизайн</h3>
<p>Посмотрите на природу: у птицы, питающейся рыбой, длинный клюв и длинные ноги; у льва — острые зубы и когти для охоты, а у быка — рога для защиты. Точно так же Бог наделил каждого человека уникальными чертами характера и физическим строением, подходящими для конкретного дела. Если человек, обладающий состраданием, идет работать мясником, или вспыльчивый человек пытается быть учителем — он идет против своей природы.</p>

<h3>Провокация успеха</h3>
<p>Если вы чувствуете влечение к какой-то деятельности и ваше тело к ней приспособлено, это и есть тот канал, который Бог подготовил для вашего пропитания. Попытка заниматься чем-то другим ради престижа или денег — это форма неверия в то, что Бог может прокормить вас через ваш естественный талант. Истинный успех — это не достижение карьерных высот, а выполнение своей «миссии» в том месте, куда вас привели обстоятельства.</p>`,

      en: `<p>The modern world teaches us that we can become anything, but the sources assert the opposite: your profession is already "encoded" in your body and character.</p>

<h3>Biological Design</h3>
<p>Look at nature: a fish-eating bird has a long beak and long legs; a lion has sharp teeth and claws for hunting; and an ox has horns for defense. In the same way, God endowed each person with unique character traits and physical attributes suited for a specific occupation. If a compassionate person goes to work as a butcher, or a hot-tempered person tries to be a teacher — they are going against their nature.</p>

<h3>The Provocation of Success</h3>
<p>If you feel drawn to a certain activity and your body is adapted for it, this is the channel God has prepared for your livelihood. Attempting to do something else for prestige or money is a form of disbelief that God can sustain you through your natural talent. True success is not achieving career heights, but fulfilling your "mission" in the place where circumstances have led you.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-8',
    slug: 'opasnaya-blagodarnost-pochemu-vash-blagodetel-eto-pochtalon',
    title: {
      ru: 'Опасная благодарность: почему ваш благодетель — это просто «почтальон»',
      en: 'Dangerous Gratitude: Why Your Benefactor Is Just a "Postman"',
      he: 'הכרת תודה מסוכנת: למה המיטיב שלך הוא רק "דוור"',
      uk: 'Небезпечна вдячність: чому ваш благодійник — це просто «листоноша»',
    },
    subtitle: {
      ru: 'Чрезмерная благодарность человеку — это форма духовной слепоты',
      en: 'Excessive gratitude to a person is a form of spiritual blindness',
      he: 'הכרת תודה מוגזמת לאדם היא סוג של עיוורון רוחני',
      uk: 'Надмірна вдячність людині — це форма духовної сліпоти',
    },
    content: {
      ru: `<p>Мы привыкли рассыпаться в благодарностях перед теми, кто нам помогает. Однако источники выдвигают шокирующий тезис: чрезмерная благодарность человеку — это форма духовной слепоты.</p>

<h3>Иллюзия помощи</h3>
<p>Когда кто-то делает вам одолжение, он лишь инструмент или посланник, через которого Бог решил передать вам благо. Благодарить человека и забывать о Боге — это всё равно что благодарить землю за урожай, игнорируя Творца, который заставил семя прорасти. Более того, праведники — это лишь «каналы», через которые Бог предпочитает совершать добро, и они сами должны быть благодарны за то, что их выбрали для этой роли.</p>

<h3>Этическая дилемма</h3>
<p>Если вам отказали в помощи, источники запрещают обвинять этого человека. Это значит, что Бог решил придержать это благо для вашего же добра или передать его через другой канал. Унижение перед богатыми или влиятельными людьми ради получения выгоды — это предательство собственного достоинства и упования на Бога.</p>`,

      en: `<p>We are accustomed to showering those who help us with gratitude. However, the sources put forward a shocking thesis: excessive gratitude to a person is a form of spiritual blindness.</p>

<h3>The Illusion of Help</h3>
<p>When someone does you a favor, they are merely an instrument or messenger through whom God decided to transmit blessings to you. Thanking a person while forgetting about God is like thanking the earth for the harvest while ignoring the Creator who made the seed sprout. Moreover, the righteous are merely "channels" through which God prefers to do good, and they themselves should be grateful for being chosen for this role.</p>

<h3>The Ethical Dilemma</h3>
<p>If someone refused to help you, the sources forbid blaming that person. It means God decided to withhold that blessing for your own good or to deliver it through a different channel. Humbling yourself before the rich or powerful for the sake of gain is a betrayal of your own dignity and trust in God.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-9',
    slug: 'blagosloveniye-odinochestva-pochemu-otsutstviye-druzey-eto-podarok',
    title: {
      ru: 'Благословение одиночества: почему отсутствие друзей — это подарок',
      en: 'The Blessing of Solitude: Why Having No Friends Is a Gift',
      he: 'ברכת הבדידות: למה חוסר חברים זה מתנה',
      uk: 'Благословення самотності: чому відсутність друзів — це подарунок',
    },
    subtitle: {
      ru: 'Одиночество может быть высшей формой милости Творца',
      en: 'Solitude can be the highest form of the Creator\'s grace',
      he: 'בדידות יכולה להיות הצורה הגבוהה ביותר של חסד הבורא',
      uk: 'Самотність може бути вищою формою милості Творця',
    },
    content: {
      ru: `<p>Для современного человека одиночество — это трагедия и депрессия. Но согласно «Вратам упования», одиночество может быть высшей формой милости Творца.</p>

<h3>Душа как иностранец</h3>
<p>Наша душа по своей природе — «чужестранка» в этом материальном мире. Она подобна огню, который всегда стремится вверх, желая воссоединиться со своим Источником. Социальные связи, семья и друзья часто становятся «грузом», который отвлекает нас от самопознания и подготовки к «вечному покою» в Будущем мире.</p>

<h3>Скрытая выгода</h3>
<p>Если вы оказались одни, это время дано вам, чтобы вы могли без помех сосредоточиться на служении Богу. Источники рассказывают об аскетах, которые специально бежали в горы от родственников, потому что видели в близости людей источник стресса, тщеславия и пустой траты времени. Одиночество — это не изоляция, а возможность прямого диалога с Творцом, когда никто не стоит между вами.</p>`,

      en: `<p>For the modern person, loneliness is a tragedy and depression. But according to the "Gate of Trust," solitude can be the highest form of the Creator's grace.</p>

<h3>The Soul as a Foreigner</h3>
<p>Our soul by its nature is a "stranger" in this material world. It is like a flame that always strives upward, wishing to reunite with its Source. Social connections, family, and friends often become a "burden" that distracts us from self-knowledge and preparation for "eternal rest" in the World to Come.</p>

<h3>The Hidden Benefit</h3>
<p>If you find yourself alone, this time is given to you so that you can focus without disturbance on serving God. The sources tell of ascetics who deliberately fled to the mountains from relatives, because they saw in the proximity of people a source of stress, vanity, and waste of time. Solitude is not isolation, but an opportunity for direct dialogue with the Creator, when no one stands between you.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-10',
    slug: 'dukhovnaya-naglost-pochemu-zanachka-na-starost-eto-grekh',
    title: {
      ru: 'Духовная наглость: почему «заначка» на старость — это грех',
      en: 'Spiritual Audacity: Why Saving for Retirement Is a Sin',
      he: 'חוצפה רוחנית: למה חיסכון לפנסיה זה חטא',
      uk: 'Духовна нахабність: чому «заначка» на старість — це гріх',
    },
    subtitle: {
      ru: 'Финансовое планирование на десятилетия вперед — это дерзость по отношению к Богу',
      en: 'Financial planning decades ahead is audacity toward God',
      he: 'תכנון פיננסי לעשרות שנים קדימה זה חוצפה כלפי שמיא',
      uk: 'Фінансове планування на десятиліття вперед — це зухвалість щодо Бога',
    },
    content: {
      ru: `<p>Мы считаем финансовое планирование на десятилетия вперед признаком мудрости. Источники же называют таких людей «сектой владельцев залогов», которые ведут себя крайне дерзко по отношению к Богу.</p>

<h3>Требование гарантий</h3>
<p>Человек, который говорит: «Я займусь своей душой только тогда, когда накоплю достаточно денег на всю оставшуюся жизнь», — требует от Бога залог. Это абсурдно: вы требуете оплаты вперед за работу, которую еще не начали делать. Требовать от Творца гарантий пропитания на годы вперед — значит сомневаться в Его способности заботиться о вас ежедневно, как Он это делал, пока вы были в утробе матери.</p>

<h3>Ловушка долголетия</h3>
<p>Главная ошибка — уверенность в том, что у вас впереди много лет. Человек копит на старость, которой может не быть, и при этом игнорирует долги перед Богом (заповеди), которые он обязан «выплачивать» прямо сейчас. Настоящая безопасность — это не сумма в банке, а понимание того, что Бог дает ровно столько «манны», сколько нужно на сегодня, чтобы вы оставались связаны с Ним в каждый момент времени.</p>`,

      en: `<p>We consider financial planning decades ahead a sign of wisdom. The sources, however, call such people "the sect of pledge holders" who behave extremely audaciously toward God.</p>

<h3>Demanding Guarantees</h3>
<p>A person who says "I'll tend to my soul only when I've saved enough money for the rest of my life" is demanding a pledge from God. This is absurd: you are demanding advance payment for work you haven't even started doing. Demanding guarantees of sustenance from the Creator for years ahead means doubting His ability to care for you daily, as He did while you were in your mother's womb.</p>

<h3>The Longevity Trap</h3>
<p>The main mistake is confidence that you have many years ahead. A person saves for old age that may never come, while ignoring debts to God (commandments) that they are obligated to "pay" right now. True security is not the sum in the bank, but the understanding that God gives exactly as much "manna" as needed for today, so that you remain connected to Him at every moment in time.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-11',
    slug: 'pochemu-vasha-blagodarnost-mozhet-byt-oskorbleniem-dlya-nebes',
    title: {
      ru: 'Почему ваша благодарность может быть оскорблением для небес?',
      en: 'Why Your Gratitude May Be an Insult to Heaven?',
      he: 'למה הכרת התודה שלך יכולה להיות עלבון לשמיים?',
      uk: 'Чому ваша вдячність може бути образою для небес?',
    },
    subtitle: {
      ru: 'Чрезмерная вежливость перед человеком как форма скрытого идолопоклонства',
      en: 'Excessive politeness toward people as a form of hidden idolatry',
      he: 'נימוס מופרז כלפי אנשים כסוג של עבודה זרה סמויה',
      uk: 'Надмірна ввічливість перед людиною як форма прихованого ідолопоклонства',
    },
    content: {
      ru: `<p>Мы привыкли считать вежливость и благодарность безусловными добродетелями, но с точки зрения упования здесь кроется опасная духовная ловушка.</p>

<h3>Иллюзия благодетеля</h3>
<p>Когда человек оказывает вам услугу, он является не источником блага, а лишь «почтальоном» или инструментом в руках Творца. Если вы рассыпаетесь в чрезмерных благодарностях перед человеком, забывая о Первопричине, вы совершаете форму скрытого идолопоклонства, наделяя создание силой Создателя. Источники сравнивают это с тем, как если бы земледелец благодарил землю за урожай, полностью игнорируя Бога, Который заставил семя прорасти.</p>

<h3>Этикет для верующего</h3>
<p>Значит ли это, что нужно быть неблагодарным? Нет, источники указывают, что нужно благодарить человека за его добрую волю и за то, что Бог выбрал именно его каналом для добра. Однако ваше сердце должно оставаться свободным от рабской зависимости перед благодетелем. Если вам отказали, вы также не имеете права злиться на человека, ибо это решение Свыше, а человек — лишь закрытая в данный момент дверь.</p>`,

      en: `<p>We are used to considering politeness and gratitude as unconditional virtues, but from the perspective of trust, a dangerous spiritual trap lies hidden here.</p>

<h3>The Illusion of the Benefactor</h3>
<p>When a person does you a service, they are not the source of the good, but merely a "postman" or instrument in the hands of the Creator. If you shower excessive gratitude on a person while forgetting the First Cause, you commit a form of hidden idolatry, endowing the creation with the power of the Creator. The sources compare this to a farmer thanking the earth for the harvest while completely ignoring God, Who made the seed sprout.</p>

<h3>Etiquette for the Believer</h3>
<p>Does this mean one should be ungrateful? No, the sources indicate that you should thank a person for their goodwill and for God choosing them as a channel for good. However, your heart must remain free from slavish dependence on the benefactor. If you were refused, you also have no right to be angry at the person, for this is a decision from Above, and the person is merely a door that is currently closed.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-12',
    slug: 'lovushka-umnogo-biznesmena-pochemu-vashi-strategii-eto-illyuziya',
    title: {
      ru: 'Ловушка «умного» бизнесмена: почему ваши стратегии — это иллюзия',
      en: 'The Smart Businessman\'s Trap: Why Your Strategies Are an Illusion',
      he: 'מלכודת איש העסקים "החכם": למה האסטרטגיות שלך הן אשליה',
      uk: 'Пастка «розумного» бізнесмена: чому ваші стратегії — це ілюзія',
    },
    subtitle: {
      ru: 'Ваша хитрость может стать причиной вашего провала',
      en: 'Your cleverness may become the cause of your failure',
      he: 'הערמומיות שלך עלולה להפוך לגורם הכישלון שלך',
      uk: 'Ваша хитрість може стати причиною вашого провалу',
    },
    content: {
      ru: `<p>Современный культ личной эффективности учит, что успех зависит от остроты ума и сложности схем. «Врата упования» бросают этому вызов: ваша хитрость может стать причиной вашего провала.</p>

<h3>Когда интеллект вредит</h3>
<p>Источники утверждают, что Бог «улавливает мудрецов в их лукавстве». Часто человек строит сложнейшие планы, которые в итоге оборачиваются против него самого, становясь инструментом его гибели. Это происходит потому, что человек начинает уповать на свой разум, а не на Творца, и тогда Божественное Провидение отступает, оставляя человека на произвол случая и ограниченных возможностей.</p>

<h3>Труд как маскировка</h3>
<p>Настоящая роль усилий в бизнесе — это не создание прибыли, а создание «сосуда». Ваша работа — это лишь декорация, за которой скрывается чудо Божественного обеспечения. Те, кто слишком поглощен своими «схемами», теряют покой и сон, в то время как человек упования понимает: доход уже предписан, а его задача — лишь выполнить необходимые действия в рамках дозволенного, не теряя связи с Источником.</p>`,

      en: `<p>The modern cult of personal effectiveness teaches that success depends on sharpness of mind and complexity of schemes. The "Gate of Trust" challenges this: your cleverness may become the cause of your downfall.</p>

<h3>When Intellect Harms</h3>
<p>The sources assert that God "catches the wise in their own craftiness." Often a person builds the most complex plans, which ultimately turn against them, becoming the instrument of their own destruction. This happens because a person begins to rely on their own mind rather than on the Creator, and then Divine Providence withdraws, leaving the person to the mercy of chance and limited possibilities.</p>

<h3>Labor as a Disguise</h3>
<p>The real role of effort in business is not creating profit, but creating a "vessel." Your work is merely a decoration behind which the miracle of Divine provision is hidden. Those who are too absorbed in their "schemes" lose peace and sleep, while a person of trust understands: income is already decreed, and their task is merely to perform the necessary actions within what is permitted, without losing connection to the Source.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-13',
    slug: 'dukhovnoye-bezrassudstvo-kogda-upovaniye-na-chudo-eto-grekh',
    title: {
      ru: 'Духовное безрассудство: когда «упование на чудо» превращается в грех',
      en: 'Spiritual Recklessness: When "Trusting in Miracles" Becomes a Sin',
      he: 'פזיזות רוחנית: מתי "ביטחון בנס" הופך לחטא',
      uk: 'Духовне безрозсудство: коли «уповання на чудо» перетворюється на гріх',
    },
    subtitle: {
      ru: 'Осторожность не противоречит упованию, а является обязанностью человека',
      en: 'Caution does not contradict trust — it is a human obligation',
      he: 'זהירות לא סותרת ביטחון — היא חובת האדם',
      uk: 'Обережність не суперечить упованню, а є обов\'язком людини',
    },
    content: {
      ru: `<p>Многие ошибочно полагают, что высшая степень веры — это броситься в огонь, ожидая, что Бог спасет. Источники называют это не упованием, а преступным испытанием Бога.</p>

<h3>Урок пророка Самуила</h3>
<p>Даже великий пророк Самуил, получив прямое указание от Бога помазать нового царя, проявил осторожность, опасаясь мести царя Саула. Бог не упрекнул его в неверии, а, напротив, дал совет, как скрыть свои действия. Это доказывает, что осторожность не противоречит упованию, а является обязанностью человека.</p>

<h3>Граница между верой и безумием</h3>
<p>Тот, кто сознательно идет на неоправданный риск — пьет яд или вступает в схватку с хищником без нужды, — восстает против воли Творца, Который повелел нам беречь свои жизни. Если такой человек погибнет, он будет отвечать за свою смерть как самоубийца, несмотря на свои «благочестивые» оправдания. Истинное упование — это делать всё возможное в рамках природы, зная, что результат всё равно за Богом.</p>`,

      en: `<p>Many mistakenly believe that the highest degree of faith is to throw yourself into fire expecting God to save you. The sources call this not trust, but criminal testing of God.</p>

<h3>The Lesson of the Prophet Samuel</h3>
<p>Even the great prophet Samuel, upon receiving a direct instruction from God to anoint a new king, exercised caution, fearing the vengeance of King Saul. God did not rebuke him for disbelief but, on the contrary, gave him advice on how to conceal his actions. This proves that caution does not contradict trust — it is a human obligation.</p>

<h3>The Line Between Faith and Madness</h3>
<p>One who deliberately takes unjustified risks — drinking poison or fighting a predator without need — rebels against the will of the Creator, Who commanded us to preserve our lives. If such a person perishes, they will answer for their death as a suicide, despite their "pious" justifications. True trust is doing everything possible within nature, knowing that the outcome is still with God.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-14',
    slug: 'detskiy-sad-dlya-dushi-pochemu-v-tore-pochti-nichego-ne-skazano-o-raye',
    title: {
      ru: 'Детский сад для души: почему в Торе почти ничего не сказано о Рае',
      en: 'Kindergarten for the Soul: Why the Torah Says Almost Nothing About Paradise',
      he: 'גן ילדים לנשמה: למה בתורה כמעט לא כתוב על גן עדן',
      uk: 'Дитячий садок для душі: чому в Торі майже нічого не сказано про Рай',
    },
    subtitle: {
      ru: 'Почему Пятикнижие обещает дожди и урожай, а не вечное блаженство',
      en: 'Why the Pentateuch promises rain and harvest, not eternal bliss',
      he: 'למה חמשת חומשי תורה מבטיחים גשם ויבול, ולא אושר נצחי',
      uk: 'Чому П\'ятикнижжя обіцяє дощі та врожай, а не вічне блаженство',
    },
    content: {
      ru: `<p>Многих удивляет, что Пятикнижие обещает за соблюдение заповедей дожди и урожай, но почти не говорит о вечном блаженстве души. Источники дают провокационный ответ: человечество в тот момент было в состоянии «духовного младенчества».</p>

<h3>Педагогика Творца</h3>
<p>Подобно тому, как отец обещает маленькому сыну сладости за усердие в учебе, не имея возможности объяснить ему ценность академических знаний, Бог обещал материальные блага народу, чей разум был еще слишком слаб, чтобы постичь вечность. Если бы Бог сразу заговорил о духовном вознаграждении, которое невозможно увидеть или потрогать, люди просто не смогли бы это оценить и принять.</p>

<h3>Скрытая цель</h3>
<p>Материальный мир — это лишь тренировочная площадка. Бог скрыл детали Грядущего мира, чтобы наша служба не была корыстной, и чтобы мы научились видеть Божественное присутствие здесь, в физической реальности. Истинная награда — это близость к свету Творца, но чтобы дорасти до этого понимания, человеку нужно сначала научиться правильно распоряжаться «конфетами» этого мира.</p>`,

      en: `<p>Many are surprised that the Pentateuch promises rain and harvest for keeping the commandments, but says almost nothing about the eternal bliss of the soul. The sources give a provocative answer: humanity at that point was in a state of "spiritual infancy."</p>

<h3>The Creator's Pedagogy</h3>
<p>Just as a father promises his young son sweets for diligence in studies, unable to explain the value of academic knowledge, God promised material blessings to a nation whose minds were still too weak to comprehend eternity. If God had immediately spoken about spiritual reward that cannot be seen or touched, people simply would not have been able to appreciate and accept it.</p>

<h3>The Hidden Purpose</h3>
<p>The material world is merely a training ground. God concealed the details of the World to Come so that our service would not be self-serving, and so that we would learn to see the Divine presence here, in physical reality. The true reward is closeness to the light of the Creator, but to grow into this understanding, a person must first learn to properly manage the "candies" of this world.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-15',
    slug: 'blagotvoritelnost-kak-dolg-pochemu-vashe-dobroye-delo-eto-uplata-nalogov',
    title: {
      ru: 'Благотворительность как долг: почему ваше «доброе дело» — это просто уплата налогов',
      en: 'Charity as Debt: Why Your "Good Deed" Is Simply Paying Taxes',
      he: 'צדקה כחוב: למה "המעשה הטוב" שלך הוא פשוט תשלום מסים',
      uk: 'Благодійність як борг: чому ваша «добра справа» — це просто сплата податків',
    },
    subtitle: {
      ru: 'Богатый человек — не владелец, а менеджер по распределению средств Творца',
      en: 'A wealthy person is not an owner, but a manager distributing the Creator\'s funds',
      he: 'אדם עשיר הוא לא בעלים, אלא מנהל חלוקת כספי הבורא',
      uk: 'Багата людина — не власник, а менеджер з розподілу коштів Творця',
    },
    content: {
      ru: `<p>Большинство людей, занимаясь благотворительностью, чувствуют себя героями и ждут особого признания. Однако источники утверждают: богатый человек — это не владелец, а всего лишь «менеджер по распределению средств» Творца.</p>

<h3>Иллюзия щедрости</h3>
<p>Само слово «цедака» (благотворительность) происходит от корня «цедек», что означает «справедливость» или «правосудие». Давать деньги нуждающимся — это не акт милосердия, а выплата долга. Считается, что Бог «депонирует» средства у богатого человека, чтобы тот передал их по назначению; поэтому дающий должен быть благодарен Богу за то, что его выбрали «каналом» (воронкой) для добра, а не требовать благодарности от бедняка.</p>

<h3>Ловушка признания</h3>
<p>Если человек ищет почета за свою щедрость, он «загрязняет» поступок и может лишиться небесной награды. Более того, если человек удерживает у себя излишки, предназначенные для других, он становится «нечестным хранителем», который присваивает чужое имущество, что в итоге приводит к потере всего капитала.</p>`,

      en: `<p>Most people who engage in charity feel like heroes and expect special recognition. However, the sources assert: a wealthy person is not an owner, but merely a "fund distribution manager" for the Creator.</p>

<h3>The Illusion of Generosity</h3>
<p>The very word "tzedakah" (charity) comes from the root "tzedek," meaning "justice" or "righteousness." Giving money to the needy is not an act of mercy, but payment of a debt. It is believed that God "deposits" funds with a wealthy person so they can pass them on as intended; therefore, the giver should be grateful to God for being chosen as a "channel" (funnel) for good, rather than demanding gratitude from the poor.</p>

<h3>The Recognition Trap</h3>
<p>If a person seeks honor for their generosity, they "contaminate" the deed and may lose their heavenly reward. Moreover, if a person holds onto surpluses intended for others, they become a "dishonest custodian" who appropriates someone else's property, which ultimately leads to the loss of all capital.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-16',
    slug: 'moyo-telo-ne-moyo-delo-pochemu-samoubiystvo-eto-krazha-u-boga',
    title: {
      ru: 'Моё тело — не моё дело: почему самоубийство и халатность — это кража у Бога',
      en: 'My Body Is Not My Business: Why Suicide and Negligence Are Theft from God',
      he: 'הגוף שלי לא העסק שלי: למה התאבדות ורשלנות הן גניבה מה\'',
      uk: 'Моє тіло — не моя справа: чому самогубство та халатність — це крадіжка у Бога',
    },
    subtitle: {
      ru: 'Человек не является хозяином собственной жизни или тела',
      en: 'A person is not the master of their own life or body',
      he: 'אדם אינו בעל חייו או גופו',
      uk: 'Людина не є господарем власного життя або тіла',
    },
    content: {
      ru: `<p>Современная концепция «моё тело — мой выбор» вступает в жесткое противоречие с духовной логикой. Согласно источникам, человек не является хозяином собственной жизни или тела.</p>

<h3>Тело как священный депозит</h3>
<p>Тело рассматривается как имущество Творца, переданное человеку во временное пользование для выполнения определенной миссии. Следовательно, самоубийство — это не просто личный выбор, а акт дезертирства и кражи. Человек, который обрывает свою жизнь, подобен слуге, который бросил пост до прихода сменщика, и он будет судим как убийца, несмотря на то, что «потерпевший» — он сам.</p>

<h3>Преступная неосторожность</h3>
<p>Упование на Бога не дает права на безрассудство. Тот, кто сознательно идет на риск — пьет яд, лезет в огонь или игнорирует болезни, надеясь на чудо, — совершает грех «испытания Бога». Творец повелел нам беречь жизнь, и тот, кто пренебрегает этим, несет полную ответственность за последствия, даже если исход был предписан свыше.</p>`,

      en: `<p>The modern concept of "my body, my choice" comes into sharp conflict with spiritual logic. According to the sources, a person is not the master of their own life or body.</p>

<h3>The Body as a Sacred Deposit</h3>
<p>The body is viewed as the Creator's property, given to a person for temporary use to fulfill a certain mission. Therefore, suicide is not simply a personal choice, but an act of desertion and theft. A person who takes their own life is like a servant who abandoned their post before the replacement arrived, and they will be judged as a murderer, despite the "victim" being themselves.</p>

<h3>Criminal Negligence</h3>
<p>Trust in God does not give the right to recklessness. One who deliberately takes risks — drinking poison, walking into fire, or ignoring illness while hoping for a miracle — commits the sin of "testing God." The Creator commanded us to preserve life, and one who neglects this bears full responsibility for the consequences, even if the outcome was decreed from above.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-17',
    slug: 'sekta-dvukh-gospod-pochemu-diversifikatsiya-very-vedyot-k-krakhu',
    title: {
      ru: 'Секта «двух господ»: почему попытка «диверсифицировать» веру ведет к краху',
      en: 'The Sect of Two Masters: Why Trying to "Diversify" Faith Leads to Collapse',
      he: 'כת "שני האדונים": למה ניסיון "לגוון" את האמונה מוביל לקריסה',
      uk: 'Секта «двох панів»: чому спроба «диверсифікувати» віру веде до краху',
    },
    subtitle: {
      ru: 'Упование на Бога работает только когда оно эксклюзивно',
      en: 'Trust in God works only when it is exclusive',
      he: 'ביטחון בה\' עובד רק כשהוא בלעדי',
      uk: 'Уповання на Бога працює лише коли воно ексклюзивне',
    },
    content: {
      ru: `<p>Многие пытаются подстраховаться: они молятся Богу, но при этом полагаются на «связи», взятки или манипуляции. Источники называют это «разрушением упования».</p>

<h3>Правило исключительности</h3>
<p>Упование на Бога работает только тогда, когда оно эксклюзивно. Если человек включает в свою систему безопасности кого-то еще (влиятельного друга, надежный банк или собственную хитрость), Бог убирает Своё прямое покровительство. Человек остается во власти того объекта или персоны, на которую он понадеялся.</p>

<h3>Парадокс помощи</h3>
<p>Когда мы полагаемся на людей, мы обрекаем себя на разочарование, потому что никто не может помочь или навредить нам без санкции Свыше. Попытка служить и Богу, и «мамоне» (деньгам) делает веру поверхностной и бесполезной. Истинное упование требует осознания: есть только одна Реальность, а все остальное — лишь декорации, которые Бог меняет по Своему усмотрению.</p>`,

      en: `<p>Many try to hedge their bets: they pray to God but also rely on "connections," bribes, or manipulations. The sources call this "the destruction of trust."</p>

<h3>The Rule of Exclusivity</h3>
<p>Trust in God works only when it is exclusive. If a person includes someone else in their security system (an influential friend, a reliable bank, or their own cunning), God removes His direct patronage. The person remains at the mercy of the object or person they relied upon.</p>

<h3>The Paradox of Help</h3>
<p>When we rely on people, we doom ourselves to disappointment, because no one can help or harm us without sanction from Above. Attempting to serve both God and "mammon" (money) makes faith superficial and useless. True trust requires the realization: there is only one Reality, and everything else is merely scenery that God changes at His discretion.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-18',
    slug: 'rabstvo-u-zvyozd-pochemu-vash-goroskop-eto-prigovor-dlya-malovernykh',
    title: {
      ru: 'Рабство у звезд: почему ваш гороскоп — это приговор для маловерных',
      en: 'Slavery to the Stars: Why Your Horoscope Is a Verdict for the Faithless',
      he: 'עבדות לכוכבים: למה ההורוסקופ שלך הוא גזר דין לחסרי אמונה',
      uk: 'Рабство у зірок: чому ваш гороскоп — це вирок для маловірних',
    },
    subtitle: {
      ru: 'Звезды влияют на судьбу, но только тех, кто в них верит',
      en: 'Stars affect fate, but only for those who believe in them',
      he: 'כוכבים משפיעים על הגורל, אבל רק של מי שמאמין בהם',
      uk: 'Зірки впливають на долю, але лише тих, хто в них вірить',
    },
    content: {
      ru: `<p>В мире, одержимом астрологией и предсказаниями, «Врата упования» делают шокирующее заявление: звезды действительно могут влиять на судьбу, но только тех, кто в них верит.</p>

<h3>Выход из-под влияния систем</h3>
<p>Существует концепция «Эйн мазаль ле-Исраэль» — над еврейским народом (и над человеком истинного упования) нет власти созвездий. Тот, кто искренне полагается на Творца, выходит за рамки естественных законов и «диктатуры природы». Бог может аннулировать любые астрологические знаки и изменить «судьбу», если человек приближается к Нему.</p>

<h3>Цена суеверия</h3>
<p>Если же человек начинает изучать гороскопы и строить свою жизнь на основе прогнозов, он добровольно отдает себя под власть этих сил. Бог снимает с такого человека Своё личное управление и оставляет его на произвол «случая» и движения светил. Таким образом, вера в гороскопы становится самоисполняющимся пророчеством, превращая свободную душу в раба физических процессов.</p>`,

      en: `<p>In a world obsessed with astrology and predictions, the "Gate of Trust" makes a shocking statement: the stars can indeed influence fate, but only for those who believe in them.</p>

<h3>Escaping the Influence of Systems</h3>
<p>There exists a concept "Ein mazal le-Yisrael" — over the Jewish people (and over a person of true trust) the constellations have no power. One who sincerely relies on the Creator transcends natural laws and the "dictatorship of nature." God can annul any astrological signs and change "fate" if a person draws closer to Him.</p>

<h3>The Price of Superstition</h3>
<p>If, however, a person begins studying horoscopes and building their life based on predictions, they voluntarily submit to the power of these forces. God removes His personal governance from such a person and leaves them to the mercy of "chance" and the movement of celestial bodies. Thus, belief in horoscopes becomes a self-fulfilling prophecy, turning a free soul into a slave of physical processes.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export type ArticleTag = 'Шаббат' | 'Галаха' | 'Хасидус' | 'Семья' | 'Праздники';

export function getAllTags(lang: 'ru' | 'en' | 'he' | 'uk'): string[] {
  const tagSet = new Set<string>();
  articles.forEach((a) => tagSet.add(a.tag[lang]));
  return Array.from(tagSet);
}
