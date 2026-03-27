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
