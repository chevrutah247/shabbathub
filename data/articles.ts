export interface Article {
  id: string;
  slug: string;
  image?: string;
  images?: string[]; // multiple photos for the article
  hebrewDate?: { month: string; day: number }; // e.g. { month: 'Nisan', day: 2 }
  monthIntro?: { ru: string; en: string }; // Month description (shown once for the month)
  title: { ru: string; en: string; he: string; uk: string };
  subtitle: { ru: string; en: string; he: string; uk: string };
  content: { ru: string; en: string };
  tag: { ru: string; en: string; he: string; uk: string };
  createdAt: string;
}

export const articles: Article[] = [
  {
    id: 'bitachon-1',
    slug: 'illyuziya-sobstvennosti-pochemu-vashi-dengi-vam-ne-prinadlezhat',
    image: '/images/articles/bitachon-1.png',
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
<p>Самая большая ошибка — это высокомерие. Человек, накопивший богатство, часто ждет благодарности от тех, кому он помогает. Но источники утверждают: богатый должен сам благодарить Б-га за то, что Тот выбрал его каналом (воронкой) для передачи благ другим. Если человек считает деньги своей заслугой, он совершает форму идолопоклонства, наделяя «средство» (деньги) силой «Причины» (Бога).</p>`,

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
    image: '/images/articles/bitachon-2.png',
    title: {
      ru: 'Медицина или фатализм: когда визит к врачу становится грехом?',
      en: 'Medicine or Fatalism: When Does Visiting a Doctor Become a Sin?',
      he: 'רפואה או גורלנות: מתי ביקור אצל רופא הופך לחטא?',
      uk: 'Медицина чи фаталізм: коли візит до лікаря стає гріхом?',
    },
    subtitle: {
      ru: 'Баланс между упованием на Б-га и обращением за медицинской помощью',
      en: 'The balance between trusting God and seeking medical help',
      he: 'האיזון בין ביטחון בה\' לבין פנייה לעזרה רפואית',
      uk: 'Баланс між упованням на Б-га та зверненням по медичну допомогу',
    },
    content: {
      ru: `<p>Один из самых острых вопросов духовной жизни — баланс между упованием на Б-га и обращением за медицинской помощью. Является ли поход к врачу признаком неверия?</p>

<h3>Урок короля Асы</h3>
<p>В источниках приводится история царя Иудеи Асы, который был наказан за то, что при болезни ног «взыскал не Г-пода, а врачей». Его ошибка заключалась не в самом обращении к медицине, а в том, что он партнерствовал Б-га с людьми, полагая, что врачи могут исцелить его сами по себе, без божественной воли.</p>

<h3>Врач как инструмент, а не спаситель</h3>
<p>Согласно Торе, человеку дано разрешение и обязанность лечить и лечиться. Однако важно понимать, что врач — это лишь «сосуд» или проводник, через который Б-г посылает исцеление. Если человек зацикливается на медицинских прогнозах и впадает в отчаяние, он ослабляет свою связь с Источником жизни, что может негативно сказаться на его удаче (мазаль) и процессе выздоровления.</p>

<h3>Парадокс лекарств</h3>
<p>Иногда Б-г может исцелить человека даже с помощью того, что по природе вредно, как это было в истории пророка Елисея, который «исправил» воду, бросив в неё соль. Это доказывает, что исцеление — это не химический процесс, а воля Творца, облеченная в форму естественных средств.</p>`,

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
    image: '/images/articles/bitachon-3.png',
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
<p>Существует несколько причин, по которым Б-г дает материальные блага нечестивым людям:</p>
<p><strong>Плата за крупицы добра:</strong> Если злодей совершил хотя бы несколько хороших поступков, Б-г вознаграждает его в этом мире, чтобы в будущем мире (Мире Грядущем) он не имел прав на награду и был полностью уничтожен.</p>
<p><strong>Богатство как ловушка:</strong> Деньги могут быть даны злодею, чтобы усилить его гордыню, что в итоге станет прямой причиной его гибели.</p>
<p><strong>Хранение для других:</strong> Злодей может быть лишь временным «сейфом», накапливающим богатство для праведного сына, который родится у него в будущем.</p>

<h3>Почему страдают праведные?</h3>
<p>Для страданий хороших людей также есть скрытые причины:</p>
<p><strong>Искупление:</strong> Мелкие страдания в этом мире очищают душу праведника, избавляя его от необходимости наказания после смерти.</p>
<p><strong>Испытание любви:</strong> Б-г посылает испытания, чтобы проявить стойкость праведника и сделать его примером для других.</p>
<p><strong>Пассивность:</strong> Праведник может страдать из-за того, что он не проявлял ревности к Б-гу и не протестовал против грехов своего поколения.</p>

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
    image: '/images/articles/bitachon-4.png',
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
<p>Человек, который требует от жизни материальных гарантий прежде, чем начнет исполнять свои духовные обязанности, ведет себя как наглый слуга, требующий плату вперед. Это выглядит абсурдно: мы уже пользуемся «кредитом» жизни, здоровьем и воздухом, за которые еще не расплатились, но требуем от Б-га «залог» в виде богатства, чтобы просто начать вести себя достойно.</p>

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
    image: '/images/articles/bitachon-5.png',
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
      ru: `<p>Это один из самых «взрывоопасных» вопросов: если Б-г уже решил в Рош а-Шана, сколько вы заработаете, то зачем вставать с дивана? Ответ источников переворачивает привычное понимание труда.</p>

<h3>Работа как «маскировка» чуда</h3>
<p>Ваши усилия — это не причина заработка, а всего лишь «сосуд» или декорация, в которую Б-г упаковывает Своё благословение. Б-г мог бы кормить нас манной, падающей с неба, но Он хочет, чтобы мы были Его партнерами в творении, скрывая чудеса под видом естественных процессов.</p>

<h3>Труд как лекарство от бунта</h3>
<p>Зачем Б-г заставил человека трудиться в поте лица? Чтобы мы не сошли с ума от безделья. Если бы у человека было всё и сразу без усилий, его разум переключился бы на саморазрушение и низменные страсти. Работа — это предохранитель, удерживающий нас от духовного восстания против Творца и самих себя. Истинный успех приходит не к тому, кто «пашет» больше всех, а к тому, кто делает разумные усилия, сохраняя сердце свободным для Б-га.</p>`,

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
    image: '/images/articles/bitachon-6.png',
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
<p>Как можно любить того, кто тебя ненавидит? Секрет в разделении личности и её корня. Внутри самого ужасного негодяя есть Б-жественная искра, которая дает ему жизнь прямо сейчас. Мы можем ненавидеть его злые поступки, но обязаны сострадать его душе, которая оказалась в плену у зла. Тот, кто осознает это, обретает сверхчеловеческое спокойствие: его невозможно задеть, ведь он знает, что его судьба — в руках Любящего Отца, а не в руках завистливого соседа.</p>`,

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
    image: '/images/articles/bitachon-7.png',
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
<p>Посмотрите на природу: у птицы, питающейся рыбой, длинный клюв и длинные ноги; у льва — острые зубы и когти для охоты, а у быка — рога для защиты. Точно так же Б-г наделил каждого человека уникальными чертами характера и физическим строением, подходящими для конкретного дела. Если человек, обладающий состраданием, идет работать мясником, или вспыльчивый человек пытается быть учителем — он идет против своей природы.</p>

<h3>Провокация успеха</h3>
<p>Если вы чувствуете влечение к какой-то деятельности и ваше тело к ней приспособлено, это и есть тот канал, который Б-г подготовил для вашего пропитания. Попытка заниматься чем-то другим ради престижа или денег — это форма неверия в то, что Б-г может прокормить вас через ваш естественный талант. Истинный успех — это не достижение карьерных высот, а выполнение своей «миссии» в том месте, куда вас привели обстоятельства.</p>`,

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
<p>Когда кто-то делает вам одолжение, он лишь инструмент или посланник, через которого Б-г решил передать вам благо. Благодарить человека и забывать о Б-ге — это всё равно что благодарить землю за урожай, игнорируя Творца, который заставил семя прорасти. Более того, праведники — это лишь «каналы», через которые Б-г предпочитает совершать добро, и они сами должны быть благодарны за то, что их выбрали для этой роли.</p>

<h3>Этическая дилемма</h3>
<p>Если вам отказали в помощи, источники запрещают обвинять этого человека. Это значит, что Б-г решил придержать это благо для вашего же добра или передать его через другой канал. Унижение перед богатыми или влиятельными людьми ради получения выгоды — это предательство собственного достоинства и упования на Б-га.</p>`,

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
    image: '/images/articles/bitachon-9.png',
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
<p>Если вы оказались одни, это время дано вам, чтобы вы могли без помех сосредоточиться на служении Б-гу. Источники рассказывают об аскетах, которые специально бежали в горы от родственников, потому что видели в близости людей источник стресса, тщеславия и пустой траты времени. Одиночество — это не изоляция, а возможность прямого диалога с Творцом, когда никто не стоит между вами.</p>`,

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
    image: '/images/articles/bitachon-10.png',
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
      ru: `<p>Мы считаем финансовое планирование на десятилетия вперед признаком мудрости. Источники же называют таких людей «сектой владельцев залогов», которые ведут себя крайне дерзко по отношению к Б-гу.</p>

<h3>Требование гарантий</h3>
<p>Человек, который говорит: «Я займусь своей душой только тогда, когда накоплю достаточно денег на всю оставшуюся жизнь», — требует от Б-га залог. Это абсурдно: вы требуете оплаты вперед за работу, которую еще не начали делать. Требовать от Творца гарантий пропитания на годы вперед — значит сомневаться в Его способности заботиться о вас ежедневно, как Он это делал, пока вы были в утробе матери.</p>

<h3>Ловушка долголетия</h3>
<p>Главная ошибка — уверенность в том, что у вас впереди много лет. Человек копит на старость, которой может не быть, и при этом игнорирует долги перед Б-гом (заповеди), которые он обязан «выплачивать» прямо сейчас. Настоящая безопасность — это не сумма в банке, а понимание того, что Б-г дает ровно столько «манны», сколько нужно на сегодня, чтобы вы оставались связаны с Ним в каждый момент времени.</p>`,

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
    image: '/images/articles/bitachon-11.png',
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
<p>Когда человек оказывает вам услугу, он является не источником блага, а лишь «почтальоном» или инструментом в руках Творца. Если вы рассыпаетесь в чрезмерных благодарностях перед человеком, забывая о Первопричине, вы совершаете форму скрытого идолопоклонства, наделяя создание силой Создателя. Источники сравнивают это с тем, как если бы земледелец благодарил землю за урожай, полностью игнорируя Б-га, Который заставил семя прорасти.</p>

<h3>Этикет для верующего</h3>
<p>Значит ли это, что нужно быть неблагодарным? Нет, источники указывают, что нужно благодарить человека за его добрую волю и за то, что Б-г выбрал именно его каналом для добра. Однако ваше сердце должно оставаться свободным от рабской зависимости перед благодетелем. Если вам отказали, вы также не имеете права злиться на человека, ибо это решение Свыше, а человек — лишь закрытая в данный момент дверь.</p>`,

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
    image: '/images/articles/bitachon-12.png',
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
<p>Источники утверждают, что Б-г «улавливает мудрецов в их лукавстве». Часто человек строит сложнейшие планы, которые в итоге оборачиваются против него самого, становясь инструментом его гибели. Это происходит потому, что человек начинает уповать на свой разум, а не на Творца, и тогда Б-жественное Провидение отступает, оставляя человека на произвол случая и ограниченных возможностей.</p>

<h3>Труд как маскировка</h3>
<p>Настоящая роль усилий в бизнесе — это не создание прибыли, а создание «сосуда». Ваша работа — это лишь декорация, за которой скрывается чудо Б-жественного обеспечения. Те, кто слишком поглощен своими «схемами», теряют покой и сон, в то время как человек упования понимает: доход уже предписан, а его задача — лишь выполнить необходимые действия в рамках дозволенного, не теряя связи с Источником.</p>`,

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
    image: '/images/articles/bitachon-13.png',
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
      ru: `<p>Многие ошибочно полагают, что высшая степень веры — это броситься в огонь, ожидая, что Б-г спасет. Источники называют это не упованием, а преступным испытанием Б-га.</p>

<h3>Урок пророка Самуила</h3>
<p>Даже великий пророк Самуил, получив прямое указание от Б-га помазать нового царя, проявил осторожность, опасаясь мести царя Саула. Б-г не упрекнул его в неверии, а, напротив, дал совет, как скрыть свои действия. Это доказывает, что осторожность не противоречит упованию, а является обязанностью человека.</p>

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
    image: '/images/articles/bitachon-14.png',
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
<p>Подобно тому, как отец обещает маленькому сыну сладости за усердие в учебе, не имея возможности объяснить ему ценность академических знаний, Б-г обещал материальные блага народу, чей разум был еще слишком слаб, чтобы постичь вечность. Если бы Б-г сразу заговорил о духовном вознаграждении, которое невозможно увидеть или потрогать, люди просто не смогли бы это оценить и принять.</p>

<h3>Скрытая цель</h3>
<p>Материальный мир — это лишь тренировочная площадка. Б-г скрыл детали Грядущего мира, чтобы наша служба не была корыстной, и чтобы мы научились видеть Б-жественное присутствие здесь, в физической реальности. Истинная награда — это близость к свету Творца, но чтобы дорасти до этого понимания, человеку нужно сначала научиться правильно распоряжаться «конфетами» этого мира.</p>`,

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
    image: '/images/articles/bitachon-15.png',
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
<p>Само слово «цедака» (благотворительность) происходит от корня «цедек», что означает «справедливость» или «правосудие». Давать деньги нуждающимся — это не акт милосердия, а выплата долга. Считается, что Б-г «депонирует» средства у богатого человека, чтобы тот передал их по назначению; поэтому дающий должен быть благодарен Б-гу за то, что его выбрали «каналом» (воронкой) для добра, а не требовать благодарности от бедняка.</p>

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
    image: '/images/articles/bitachon-16.png',
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
<p>Упование на Б-га не дает права на безрассудство. Тот, кто сознательно идет на риск — пьет яд, лезет в огонь или игнорирует болезни, надеясь на чудо, — совершает грех «испытания Бога». Творец повелел нам беречь жизнь, и тот, кто пренебрегает этим, несет полную ответственность за последствия, даже если исход был предписан свыше.</p>`,

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
    image: '/images/articles/bitachon-17.png',
    slug: 'sekta-dvukh-gospod-pochemu-diversifikatsiya-very-vedyot-k-krakhu',
    title: {
      ru: 'Секта «двух господ»: почему попытка «диверсифицировать» веру ведет к краху',
      en: 'The Sect of Two Masters: Why Trying to "Diversify" Faith Leads to Collapse',
      he: 'כת "שני האדונים": למה ניסיון "לגוון" את האמונה מוביל לקריסה',
      uk: 'Секта «двох панів»: чому спроба «диверсифікувати» віру веде до краху',
    },
    subtitle: {
      ru: 'Упование на Б-га работает только когда оно эксклюзивно',
      en: 'Trust in God works only when it is exclusive',
      he: 'ביטחון בה\' עובד רק כשהוא בלעדי',
      uk: 'Уповання на Б-га працює лише коли воно ексклюзивне',
    },
    content: {
      ru: `<p>Многие пытаются подстраховаться: они молятся Б-гу, но при этом полагаются на «связи», взятки или манипуляции. Источники называют это «разрушением упования».</p>

<h3>Правило исключительности</h3>
<p>Упование на Б-га работает только тогда, когда оно эксклюзивно. Если человек включает в свою систему безопасности кого-то еще (влиятельного друга, надежный банк или собственную хитрость), Б-г убирает Своё прямое покровительство. Человек остается во власти того объекта или персоны, на которую он понадеялся.</p>

<h3>Парадокс помощи</h3>
<p>Когда мы полагаемся на людей, мы обрекаем себя на разочарование, потому что никто не может помочь или навредить нам без санкции Свыше. Попытка служить и Б-гу, и «мамоне» (деньгам) делает веру поверхностной и бесполезной. Истинное упование требует осознания: есть только одна Реальность, а все остальное — лишь декорации, которые Б-г меняет по Своему усмотрению.</p>`,

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
    image: '/images/articles/bitachon-18.png',
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
<p>Существует концепция «Эйн мазаль ле-Исраэль» — над еврейским народом (и над человеком истинного упования) нет власти созвездий. Тот, кто искренне полагается на Творца, выходит за рамки естественных законов и «диктатуры природы». Б-г может аннулировать любые астрологические знаки и изменить «судьбу», если человек приближается к Нему.</p>

<h3>Цена суеверия</h3>
<p>Если же человек начинает изучать гороскопы и строить свою жизнь на основе прогнозов, он добровольно отдает себя под власть этих сил. Б-г снимает с такого человека Своё личное управление и оставляет его на произвол «случая» и движения светил. Таким образом, вера в гороскопы становится самоисполняющимся пророчеством, превращая свободную душу в раба физических процессов.</p>`,

      en: `<p>In a world obsessed with astrology and predictions, the "Gate of Trust" makes a shocking statement: the stars can indeed influence fate, but only for those who believe in them.</p>

<h3>Escaping the Influence of Systems</h3>
<p>There exists a concept "Ein mazal le-Yisrael" — over the Jewish people (and over a person of true trust) the constellations have no power. One who sincerely relies on the Creator transcends natural laws and the "dictatorship of nature." God can annul any astrological signs and change "fate" if a person draws closer to Him.</p>

<h3>The Price of Superstition</h3>
<p>If, however, a person begins studying horoscopes and building their life based on predictions, they voluntarily submit to the power of these forces. God removes His personal governance from such a person and leaves them to the mercy of "chance" and the movement of celestial bodies. Thus, belief in horoscopes becomes a self-fulfilling prophecy, turning a free soul into a slave of physical processes.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-19',
    image: '/images/articles/bitachon-19.png',
    slug: 'shantazh-nebes-pochemu-trebovat-garantiy-ot-boga-eto-derzost',
    title: {
      ru: 'Шантаж Небес: почему требовать гарантий от Б-га — это дерзость',
      en: 'Blackmailing Heaven: Why Demanding Guarantees from God Is Audacity',
      he: 'סחיטת השמיים: למה לדרוש ערבויות מה\' זו חוצפה',
      uk: 'Шантаж Небес: чому вимагати гарантій від Б-га — це зухвалість',
    },
    subtitle: {
      ru: 'Секта владельцев залогов и ловушка оплаты вперёд',
      en: 'The sect of pledge holders and the trap of advance payment',
      he: 'כת בעלי המשכנתאות ומלכודת התשלום מראש',
      uk: 'Секта власників застав та пастка оплати наперед',
    },
    content: {
      ru: `<p>Многие люди говорят: «Я начну полноценно помогать другим или займусь своим духовным развитием, как только буду уверен в своем финансовом будущем». В источниках таких людей называют «сектой владельцев залогов».</p>

<h3>Ловушка «оплаты вперед»</h3>
<p>С точки зрения упования, такое поведение подобно наглому работнику, который требует от хозяина всю зарплату еще до того, как приступил к обязанностям. Это выглядит абсурдно: человек уже пользуется «кредитом» жизни, здоровьем и воздухом, за которые он еще не расплатился своими добрыми делами, но при этом требует от Творца «залог» в виде богатства, чтобы просто начать вести себя достойно.</p>

<h3>Бесконечный долг</h3>
<p>На самом деле, если сложить все добрые дела человечества за всю историю, их не хватит, чтобы оплатить даже одно благодеяние, которое Творец оказывает нам ежедневно. Требовать материальных гарантий у Того, Кому вы уже бесконечно должны, — это не просто глупость, а высшая степень духовной близорукости. Истинное упование — это понимание того, что Б-г дает «манну» ровно на сегодня, чтобы вы оставались связаны с Ним постоянно.</p>`,

      en: `<p>Many people say: "I'll start fully helping others or work on my spiritual development as soon as I'm confident about my financial future." In the sources, such people are called "the sect of pledge holders."</p>

<h3>The "Advance Payment" Trap</h3>
<p>From the perspective of trust, such behavior is like an impudent worker who demands the full salary from the master before even starting duties. It looks absurd: a person is already using the "credit" of life, health, and air for which they haven't yet repaid with good deeds, yet demands from the Creator a "pledge" in the form of wealth just to start behaving decently.</p>

<h3>The Infinite Debt</h3>
<p>In reality, if you add up all the good deeds of humanity throughout history, they wouldn't be enough to pay for even one act of kindness the Creator bestows upon us daily. Demanding material guarantees from the One to Whom you are already infinitely indebted is not just foolishness, but the highest degree of spiritual shortsightedness. True trust is the understanding that God gives "manna" for exactly today, so that you remain connected to Him constantly.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-20',
    slug: 'biologiya-prizvaniya-pochemu-vasha-professiya-eto-vasha-sudba',
    title: {
      ru: 'Биология призвания: почему ваша профессия — это ваша судьба',
      en: 'The Biology of Calling: Why Your Profession Is Your Destiny',
      he: 'הביולוגיה של הייעוד: למה המקצוע שלך הוא הגורל שלך',
      uk: 'Біологія покликання: чому ваша професія — це ваша доля',
    },
    subtitle: {
      ru: 'Ваша работа записана в строении вашего тела и чертах характера',
      en: 'Your work is written in the structure of your body and character traits',
      he: 'העבודה שלך כתובה במבנה הגוף ובתכונות האופי שלך',
      uk: 'Ваша робота записана в будові вашого тіла та рисах характеру',
    },
    content: {
      ru: `<p>Современная идея о том, что «человек может всё», вступает в конфликт с концепцией божественного дизайна. Согласно источникам, ваша работа уже «записана» в строении вашего тела и чертах характера.</p>

<h3>Природный инструмент</h3>
<p>Посмотрите на животных: у птицы, питающейся рыбой, — длинный клюв и ноги; у льва — зубы и когти для охоты; у быка — рога для защиты. Точно так же Б-г наделил каждого человека уникальными качествами для конкретной миссии. Если человек, наделенный состраданием, идет в мясники, или вспыльчивый человек пытается быть учителем — он идет против своей природы и воли Творца.</p>

<h3>Скрытая миссия</h3>
<p>Если вы чувствуете влечение к определенному занятию и ваши способности ему соответствуют, это и есть тот «канал», через который Б-г решил кормить вас. Попытка сменить этот канал только ради денег — это форма неверия. Истинный успех заключается не в карьерном росте, а в том, чтобы быть «партнером Творца» на том месте, которое Он для вас спроектировал.</p>`,

      en: `<p>The modern idea that "a person can do anything" conflicts with the concept of divine design. According to the sources, your work is already "written" in the structure of your body and character traits.</p>

<h3>A Natural Instrument</h3>
<p>Look at animals: a fish-eating bird has a long beak and legs; a lion has teeth and claws for hunting; an ox has horns for defense. In the same way, God endowed each person with unique qualities for a specific mission. If a compassionate person goes into butchery, or a hot-tempered person tries to be a teacher — they are going against their nature and the will of the Creator.</p>

<h3>The Hidden Mission</h3>
<p>If you feel drawn to a certain occupation and your abilities match it, this is the "channel" through which God decided to sustain you. Attempting to change this channel only for money is a form of disbelief. True success lies not in career advancement, but in being a "partner of the Creator" in the place He designed for you.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-21',
    image: '/images/articles/bitachon-21.png',
    slug: 'nochnoy-depozit-pochemu-kazhdoye-utro-eto-chudo',
    title: {
      ru: 'Ночной депозит: почему каждое утро — это чудо, которое вы принимаете как должное',
      en: 'The Nightly Deposit: Why Every Morning Is a Miracle You Take for Granted',
      he: 'הפיקדון הלילי: למה כל בוקר הוא נס שאתה לוקח כמובן מאליו',
      uk: 'Нічний депозит: чому кожен ранок — це диво, яке ви сприймаєте як належне',
    },
    subtitle: {
      ru: 'Сон — это акт передачи самого ценного имущества в залог Богу',
      en: 'Sleep is an act of entrusting your most valuable possession to God',
      he: 'שינה היא מסירת הרכוש היקר ביותר שלך לה\'',
      uk: 'Сон — це акт передачі найціннішого майна в заставу Богу',
    },
    content: {
      ru: `<p>Мы привыкли просыпаться и считать, что жизнь принадлежит нам. Но согласно глубоким источникам, сон — это акт передачи самого ценного имущества в залог Б-гу.</p>

<h3>Ежедневное воскрешение</h3>
<p>Каждую ночь человек «депонирует» свою душу у Творца для сохранения. Тот факт, что утром она возвращается к вам живой и обновленной, — это не автоматический процесс, а проявление «великой верности» Б-га. Б-г возвращает нам душу, хотя Он не обязан этого делать и мог бы оставить её в качестве «оплаты» за наши многочисленные долги и грехи.</p>

<h3>Смена перспективы</h3>
<p>Осознание этого делает молитву «Моде Ани» (Благодарю Тебя...) не просто формальностью, а признанием своей полной зависимости от Милости Свыше. Тот, кто понимает, что жизнь выдается ему в аренду каждое утро, перестает дрожать над материальными потерями, ведь он знает: Творец — самый надежный Хранитель, Который возвращает нам жизнь даже тогда, когда мы этого не заслуживаем.</p>`,

      en: `<p>We are used to waking up and assuming that life belongs to us. But according to deep sources, sleep is an act of entrusting your most valuable possession as a pledge to God.</p>

<h3>Daily Resurrection</h3>
<p>Every night a person "deposits" their soul with the Creator for safekeeping. The fact that in the morning it returns to you alive and renewed is not an automatic process, but a manifestation of God's "great faithfulness." God returns our soul to us, although He is not obligated to do so and could keep it as "payment" for our numerous debts and sins.</p>

<h3>A Shift in Perspective</h3>
<p>Realizing this makes the prayer "Modeh Ani" (I Thank You...) not just a formality, but an acknowledgment of our complete dependence on Grace from Above. One who understands that life is rented to them every morning stops trembling over material losses, for they know: the Creator is the most reliable Guardian, Who returns life to us even when we don't deserve it.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-22',
    image: '/images/articles/bitachon-22.png',
    slug: 'paradoks-vrazhdy-pochemu-vash-obidchik-eto-palka-v-rukakh-boga',
    title: {
      ru: 'Парадокс вражды: почему ваш обидчик — это лишь «палка» в руках Бога',
      en: 'The Paradox of Enmity: Why Your Offender Is Just a "Stick" in God\'s Hands',
      he: 'פרדוקס האיבה: למה הפוגע שלך הוא רק "מקל" בידי ה\'',
      uk: 'Парадокс ворожнечі: чому ваш кривдник — це лише «палиця» в руках Бога',
    },
    subtitle: {
      ru: 'Никто не может причинить вам вреда, если это не было предписано Свыше',
      en: 'No one can harm you unless it was decreed from Above',
      he: 'אף אחד לא יכול להזיק לך אלא אם נגזר מלמעלה',
      uk: 'Ніхто не може завдати вам шкоди, якщо це не було наказано Згори',
    },
    content: {
      ru: `<p>Самая сложная для принятия идея «Врат упования» заключается в том, что никто не может причинить вам вреда, если это не было предписано Свыше.</p>

<h3>Враг как почтальон</h3>
<p>Когда кто-то оскорбляет вас или вредит вашему имуществу, этот человек — лишь инструмент или посланник Провидения. Злиться на обидчика так же бессмысленно, как злиться на палку, которой вас ударили. Источники утверждают: если бы это не был этот конкретный человек, Б-г нашел бы другой способ донести до вас это испытание или наказание.</p>

<h3>Путь к примирению</h3>
<p>Вместо того чтобы планировать месть, человек упования должен проанализировать свои поступки перед Богом. Как только человек исправляет свои отношения с Творцом, Творец «усмиряет» его врагов, и они сами начинают искать мира с ним. Ваше спокойствие перед лицом агрессии — это не слабость, а высшая форма духовной силы, признающей единую Власть во вселенной.</p>`,

      en: `<p>The most difficult idea to accept from the "Gate of Trust" is that no one can harm you unless it was decreed from Above.</p>

<h3>The Enemy as a Postman</h3>
<p>When someone insults you or damages your property, that person is merely an instrument or messenger of Providence. Being angry at the offender is as pointless as being angry at the stick that struck you. The sources assert: if it weren't this specific person, God would have found another way to deliver this trial or punishment to you.</p>

<h3>The Path to Reconciliation</h3>
<p>Instead of planning revenge, a person of trust must analyze their own deeds before God. As soon as a person corrects their relationship with the Creator, the Creator "subdues" their enemies, and they themselves begin seeking peace. Your calm in the face of aggression is not weakness, but the highest form of spiritual strength, acknowledging the single Authority in the universe.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-23',
    image: '/images/articles/bitachon-23.png',
    slug: 'dukhovnaya-alkhimiya-pochemu-professional-vsegda-proigryvayet-veruyushchemu',
    title: {
      ru: 'Духовная алхимия: почему профессионал всегда проигрывает верующему',
      en: 'Spiritual Alchemy: Why the Professional Always Loses to the Believer',
      he: 'אלכימיה רוחנית: למה המקצוען תמיד מפסיד למאמין',
      uk: 'Духовна алхімія: чому професіонал завжди програє віруючому',
    },
    subtitle: {
      ru: 'Шокирующее сравнение между алхимиком и человеком упования',
      en: 'A shocking comparison between the alchemist and the person of trust',
      he: 'השוואה מזעזעת בין האלכימאי לבעל הביטחון',
      uk: 'Шокуюче порівняння між алхіміком і людиною уповання',
    },
    content: {
      ru: `<p>В современном мире культ «хардовых навыков» и профессионализма считается единственным путем к успеху. Однако источники проводят шокирующее сравнение между алхимиком (человеком, обладающим уникальным навыком «создания золота») и человеком упования.</p>

<h3>Уязвимость эксперта</h3>
<p>Даже если алхимик добьется успеха, его жизнь — это кошмар. Ему нужны специфические редкие ингредиенты, которые не всегда под рукой. Он вынужден работать втайне, постоянно опасаясь, что его секрет раскроют и власти казнят его за фальшивомонетничество. Его здоровье подрывается вредными парами и дымом от работы. В итоге его мастерство не дает ему покоя, превращая его в вечного беглеца.</p>

<h3>Превосходство упования</h3>
<p>В отличие от «эксперта», человек упования не зависит от конкретных материалов или инструментов. Б-г, Который создал само сырье, может прокормить его любым способом — даже вопреки законам природы, как это было с пророком Илией, которому еду приносили вороны. Верующий не боится раскрытия своих «секретов» — напротив, он гордится своим упованием и живет в мире с окружающими. Пока эксперт дрожит над своими формулами, человек упования спит спокойно, зная, что его «Источник» неисчерпаем.</p>`,

      en: `<p>In the modern world, the cult of "hard skills" and professionalism is considered the only path to success. However, the sources draw a shocking comparison between an alchemist (a person with the unique skill of "creating gold") and a person of trust.</p>

<h3>The Expert's Vulnerability</h3>
<p>Even if the alchemist succeeds, his life is a nightmare. He needs specific rare ingredients that are not always at hand. He is forced to work in secret, constantly fearing that his secret will be discovered and the authorities will execute him for counterfeiting. His health is undermined by harmful fumes and smoke from his work. In the end, his mastery gives him no peace, turning him into an eternal fugitive.</p>

<h3>The Superiority of Trust</h3>
<p>Unlike the "expert," the person of trust does not depend on specific materials or instruments. God, Who created the raw materials themselves, can sustain them in any way — even contrary to the laws of nature, as with the prophet Elijah, whom ravens brought food. The believer is not afraid of revealing their "secrets" — on the contrary, they are proud of their trust and live in peace with those around them. While the expert trembles over formulas, the person of trust sleeps peacefully, knowing that their "Source" is inexhaustible.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-24',
    slug: 'sekta-vladeltsev-zalogov-pochemu-strakhovka-eto-shantazh-boga',
    title: {
      ru: 'Секта «владельцев залогов»: почему ваша страховка — это форма шантажа Бога',
      en: 'The Sect of Pledge Holders: Why Your Insurance Is a Form of Blackmailing God',
      he: 'כת "בעלי הערבויות": למה הביטוח שלך הוא סחיטה של ה\'',
      uk: 'Секта «власників застав»: чому ваша страховка — це форма шантажу Бога',
    },
    subtitle: {
      ru: 'Попытка выторговать у Б-га комфорт в обмен на духовность',
      en: 'Trying to bargain comfort from God in exchange for spirituality',
      he: 'ניסיון למסחר נוחות מה\' בתמורה לרוחניות',
      uk: 'Спроба виторгувати у Б-га комфорт в обмін на духовність',
    },
    content: {
      ru: `<p>Самая распространенная ошибка современного человека — попытка выторговать у Б-га комфорт в обмен на духовность. Источники жестко критикуют тех, кто говорит: «Я займусь душой, когда накоплю достаточно на старость». Таких людей называют «сектой владельцев залогов».</p>

<h3>Дерзость слуги</h3>
<p>Требовать материальных гарантий прежде, чем начнешь исполнять свой долг, — это высшая степень наглости. Это похоже на наемного рабочего, который требует оплату за годы вперед, прежде чем возьмется за лопату. Человек уже пользуется «кредитом» жизни, здоровьем и ресурсами, которые Б-г дает ему авансом, но при этом смеет требовать еще и «залог» в виде богатства как условие своей верности.</p>

<h3>Иллюзия безопасности</h3>
<p>Ловушка в том, что «залог» (накопленный капитал) никогда не дает обещанного покоя. Напротив, чем больше у человека имущества, тем больше у него поводов для тревоги: инфляция, воры, кризисы. Источники утверждают: брать у Б-га «залог» бессмысленно, потому что мы никогда не сможем расплатиться даже за один день своего существования. Истинная мудрость — служить сегодня, зная, что завтрашний день уже обеспечен Тем, Кто дает жизнь.</p>`,

      en: `<p>The most common mistake of modern people is trying to bargain comfort from God in exchange for spirituality. The sources harshly criticize those who say: "I'll tend to my soul when I've saved enough for old age." Such people are called "the sect of pledge holders."</p>

<h3>The Servant's Audacity</h3>
<p>Demanding material guarantees before beginning to fulfill one's duty is the height of impudence. It is like a hired worker who demands payment for years in advance before picking up a shovel. A person already uses the "credit" of life, health, and resources that God gives them as an advance, yet dares to demand a "pledge" in the form of wealth as a condition of their loyalty.</p>

<h3>The Illusion of Safety</h3>
<p>The trap is that the "pledge" (accumulated capital) never delivers the promised peace. On the contrary, the more property a person has, the more reasons for anxiety: inflation, thieves, crises. The sources assert: taking a "pledge" from God is pointless, because we can never repay even a single day of our existence. True wisdom is to serve today, knowing that tomorrow is already provided for by the One Who gives life.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-25',
    image: '/images/articles/bitachon-25.png',
    slug: 'telo-v-arendu-pochemu-moy-vybor-eto-prestupleniye-protiv-tvortsa',
    title: {
      ru: 'Тело в аренду: почему «мой выбор» — это преступление против Творца',
      en: 'Body for Rent: Why "My Choice" Is a Crime Against the Creator',
      he: 'גוף בשכירות: למה "הבחירה שלי" היא פשע נגד הבורא',
      uk: 'Тіло в оренду: чому «мій вибір» — це злочин проти Творця',
    },
    subtitle: {
      ru: 'Человек не является владельцем своего тела — он лишь его временный опекун',
      en: 'A person is not the owner of their body — merely its temporary guardian',
      he: 'אדם אינו בעל גופו — הוא רק אפוטרופוס זמני',
      uk: 'Людина не є власником свого тіла — вона лише його тимчасовий опікун',
    },
    content: {
      ru: `<p>Современная доктрина «Моё тело — моё дело» вступает в прямой конфликт с духовным правом собственности. Согласно источникам, человек не является владельцем своего тела — он лишь его временный опекун.</p>

<h3>Дезертирство с поста</h3>
<p>Тело рассматривается как священный депозит, переданный Б-гом человеку для выполнения определенной миссии. С этой точки зрения, самоубийство — это не личный выбор, а акт кражи чужого имущества и дезертирство. Человек, обрывающий свою жизнь, подобен слуге, который бросил доверенный ему пост до прихода сменщика. За это он будет судим как убийца, даже если «жертва» — он сам.</p>

<h3>Преступная халатность</h3>
<p>Упование на Б-га не дает права на безрассудство в отношении здоровья. Тот, кто осознанно идет на риск, игнорирует болезни или лезет в огонь, надеясь на чудо, совершает грех «испытания Бога». Человек обязан заботиться о сосуде (теле), так как если сосуд разобьется по его вине, он ответит за уничтожение Б-жьего имущества, которое было дано ему в аренду на строго определенный срок.</p>`,

      en: `<p>The modern doctrine "My body, my business" comes into direct conflict with spiritual property rights. According to the sources, a person is not the owner of their body — they are merely its temporary guardian.</p>

<h3>Desertion from Post</h3>
<p>The body is viewed as a sacred deposit, given by God to a person to fulfill a specific mission. From this perspective, suicide is not a personal choice, but an act of theft and desertion. A person who ends their life is like a servant who abandoned the post entrusted to them before the replacement arrived. For this they will be judged as a murderer, even if the "victim" is themselves.</p>

<h3>Criminal Negligence</h3>
<p>Trust in God does not give the right to recklessness regarding health. One who deliberately takes risks, ignores illness, or walks into fire hoping for a miracle commits the sin of "testing God." A person is obligated to care for the vessel (body), for if the vessel breaks through their fault, they will answer for the destruction of God's property, which was given to them for rent for a strictly defined period.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-26',
    image: '/images/articles/bitachon-26.png',
    slug: 'detskiy-sad-dlya-dushi-pochemu-v-tore-pochti-net-slov-o-raye',
    title: {
      ru: 'Детский сад для души: почему в Торе почти нет слов о Рае',
      en: 'Kindergarten for the Soul: Why the Torah Has Almost No Words About Paradise',
      he: 'גן ילדים לנשמה: למה בתורה כמעט אין מילים על גן עדן',
      uk: 'Дитячий садок для душі: чому в Торі майже немає слів про Рай',
    },
    subtitle: {
      ru: 'Духовное младенчество человечества и педагогика сладостей',
      en: 'Humanity\'s spiritual infancy and the pedagogy of sweets',
      he: 'ינקות רוחנית של האנושות והפדגוגיה של הממתקים',
      uk: 'Духовне дитинство людства та педагогіка солодощів',
    },
    content: {
      ru: `<p>Многих удивляет провокационный факт: Пятикнижие обещает за соблюдение заповедей дожди, урожай и мир, но почти полностью игнорирует описание блаженства в Мире Грядущем. Источники объясняют это духовным младенчеством человечества.</p>

<h3>Педагогика сладостей</h3>
<p>Подобно тому, как мудрый отец обещает маленькому ребенку конфеты или красивую одежду за усердие в учебе, не имея возможности объяснить ему истинную ценность знаний, Б-г говорил с народом на языке материальных благ. На момент получения Торы разум людей был слишком поглощен физической реальностью, чтобы осознать ценность бесплотного, духовного наслаждения. Если бы Б-г сразу заговорил о Рае, люди просто не услышали бы Его.</p>

<h3>Скрытая вершина</h3>
<p>Материальное вознаграждение — это лишь «тренировочные колеса». Б-г скрыл детали Грядущего мира, чтобы наша служба не превратилась в корыстную сделку. По мере духовного взросления человек должен понять: истинная награда — это не «конфеты» этого мира, а сама близость к Творцу и возможность быть Его партнером, что само по себе выше любого воображаемого рая.</p>`,

      en: `<p>Many are surprised by the provocative fact that the Pentateuch promises rain, harvest, and peace for keeping the commandments, but almost completely ignores descriptions of bliss in the World to Come. The sources explain this by humanity's spiritual infancy.</p>

<h3>The Pedagogy of Sweets</h3>
<p>Just as a wise father promises a small child candy or beautiful clothes for diligence in studies, unable to explain the true value of knowledge, God spoke to the people in the language of material blessings. At the time of receiving the Torah, people's minds were too absorbed in physical reality to appreciate the value of incorporeal, spiritual pleasure. If God had spoken about Paradise right away, people simply would not have heard Him.</p>

<h3>The Hidden Summit</h3>
<p>Material reward is merely "training wheels." God concealed the details of the World to Come so that our service would not turn into a selfish transaction. As a person matures spiritually, they must understand: the true reward is not the "candies" of this world, but closeness to the Creator itself and the opportunity to be His partner, which in itself is higher than any imagined paradise.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-27',
    image: '/images/articles/bitachon-27.png',
    slug: 'paradoks-vora-pochemu-mozhno-verit-v-boga-i-ostavatsya-prestupnikom',
    title: {
      ru: 'Парадокс вора: почему можно верить в Б-га и оставаться преступником',
      en: 'The Thief\'s Paradox: Why You Can Believe in God and Remain a Criminal',
      he: 'פרדוקס הגנב: למה אפשר להאמין בה\' ולהישאר פושע',
      uk: 'Парадокс злодія: чому можна вірити в Б-га і залишатися злочинцем',
    },
    subtitle: {
      ru: 'Вера без упования — это вера в пустоту',
      en: 'Faith without trust is faith in emptiness',
      he: 'אמונה בלי ביטחון היא אמונה בריקנות',
      uk: 'Віра без уповання — це віра в порожнечу',
    },
    content: {
      ru: `<p>Одна из самых шокирующих концепций источников заключается в том, что человек может обладать глубокой верой, но при этом совершать ужасные поступки. Вера без упования — это «вера в пустоту».</p>

<h3>Молитва перед грабежом</h3>
<p>В источниках приводится пример взломщика, который, стоя перед дверью чужого дома, делает паузу, чтобы помолиться Б-гу о помощи и успехе. Этот вор искренне верит, что Б-г существует, слышит молитвы и управляет исходами событий. Однако его вера оторвана от реальности. Если бы он обладал не просто верой (эмуна), а упованием (битахон), он бы понял: его пропитание уже предписано Творцом, и кража — это самый нелепый способ пытаться получить то, что и так будет дано или не дано по воле Свыше.</p>

<h3>Религия как инструмент эго</h3>
<p>Преступление в данном случае — это не только сам акт кражи, но и попытка сделать Б-га «соучастником». Человек, который использует религию только для достижения своих целей, не доверяя Б-жественному плану, превращает веру в форму духовного эгоизма. Истинное упование требует признания: если что-то не дано честным путем, значит, оно мне не нужно.</p>`,

      en: `<p>One of the most shocking concepts in the sources is that a person can possess deep faith yet commit terrible deeds. Faith without trust is "faith in emptiness."</p>

<h3>Prayer Before Robbery</h3>
<p>The sources cite the example of a burglar who, standing before the door of someone else's house, pauses to pray to God for help and success. This thief sincerely believes that God exists, hears prayers, and governs outcomes. However, his faith is detached from reality. If he possessed not just faith (emunah) but trust (bitachon), he would understand: his sustenance is already decreed by the Creator, and theft is the most absurd way to try to obtain what will or will not be given by divine will.</p>

<h3>Religion as an Ego Tool</h3>
<p>The crime in this case is not just the act of theft itself, but the attempt to make God an "accomplice." A person who uses religion only to achieve their goals without trusting the Divine plan turns faith into a form of spiritual egoism. True trust requires acknowledgment: if something is not given by honest means, then I don't need it.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-28',
    slug: 'psikhologiya-zalozhnika-pochemu-vashi-usloviya-bogu-eto-naglost',
    title: {
      ru: 'Психология «заложника»: почему ваши условия Б-гу — это наглость',
      en: 'Hostage Psychology: Why Your Conditions to God Are Impudence',
      he: 'פסיכולוגיית "בן הערובה": למה התנאים שלך לה\' הם חוצפה',
      uk: 'Психологія «заручника»: чому ваші умови Б-гу — це нахабність',
    },
    subtitle: {
      ru: 'Требовать зарплату на годы вперёд, не начав работать',
      en: 'Demanding salary for years ahead without starting work',
      he: 'לדרוש משכורת לשנים קדימה בלי להתחיל לעבוד',
      uk: 'Вимагати зарплату на роки вперед, не почавши працювати',
    },
    content: {
      ru: `<p>Многие современные люди живут с установкой: «Я займусь своим духовным развитием и начну помогать другим, как только буду уверен в своем финансовом будущем». В источниках таких людей называют «сектой владельцев залогов».</p>

<h3>Дерзость слуги</h3>
<p>С точки зрения упования, такое поведение подобно наглому работнику, который требует от хозяина выплатить ему зарплату на годы вперед еще до того, как он взял в руки инструмент. Мы уже пользуемся «кредитом» жизни, здоровьем и воздухом, за которые еще не расплатились своими добрыми делами. Требовать от Творца «залог» в виде богатства как условие своей верности — это высшая степень духовной наглости.</p>

<h3>Иллюзия безопасности</h3>
<p>Ловушка в том, что такой «залог» (накопленный капитал) никогда не дает обещанного покоя. Напротив, чем больше у человека имущества, тем больше у него поводов для тревоги: кризисы, инфляция, завистники. Настоящая безопасность — это не сумма в банке, а понимание того, что Б-г дает ровно столько «манны», сколько нужно на сегодня.</p>`,

      en: `<p>Many modern people live with the mindset: "I'll work on my spiritual development and start helping others as soon as I'm confident about my financial future." In the sources, such people are called "the sect of pledge holders."</p>

<h3>The Servant's Audacity</h3>
<p>From the perspective of trust, such behavior is like an impudent worker who demands the master pay salary for years in advance before even picking up a tool. We already use the "credit" of life, health, and air for which we haven't yet repaid with good deeds. Demanding a "pledge" in the form of wealth from the Creator as a condition of one's loyalty is the highest degree of spiritual impudence.</p>

<h3>The Illusion of Safety</h3>
<p>The trap is that such a "pledge" (accumulated capital) never delivers the promised peace. On the contrary, the more property a person has, the more reasons for anxiety: crises, inflation, envious people. True safety is not the sum in the bank, but understanding that God gives exactly as much "manna" as needed for today.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-29',
    image: '/images/articles/bitachon-29.png',
    slug: 'proklyatiye-rasseivaniya-mysley-nevidimaya-tsena-vashego-uspekha',
    title: {
      ru: 'Проклятие «рассеивания мыслей»: невидимая цена вашего успеха',
      en: 'The Curse of Scattered Thoughts: The Invisible Price of Your Success',
      he: 'קללת "פיזור המחשבות": המחיר הנסתר של ההצלחה שלך',
      uk: 'Прокляття «розсіювання думок»: невидима ціна вашого успіху',
    },
    subtitle: {
      ru: 'Избыточное имущество — это форма тюремного заключения',
      en: 'Excessive property is a form of imprisonment',
      he: 'רכוש עודף הוא סוג של מאסר',
      uk: 'Надмірне майно — це форма ув\'язнення',
    },
    content: {
      ru: `<p>Мы привыкли считать богатство синонимом свободы. Однако источники выдвигают провокационный тезис: избыточное имущество — это форма тюремного заключения, которую человек выбирает сам.</p>

<h3>Сон рабочего и бессонница богача</h3>
<p>Существует понятие «рассеивание мыслей» (пиззур а-нефеш). Когда активы человека разбросаны по разным городам, банкам и предприятиям, его душа перестает принадлежать ему самому. Он постоянно «рассеян» между своими владениями, переживая за каждое из них. В то время как обычный рабочий спит спокойно, избыток имущества лишает богача сна и возможности сосредоточиться на чем-то по-настоящему важном.</p>

<h3>Духовный аскетизм</h3>
<p>Источники рассказывают о мудрецах, которые сознательно выбирали простоту, чтобы освободить разум для диалога с Творцом. Одиночество или отсутствие семьи в некоторых случаях рассматривалось ими не как трагедия, а как освобождение от груза ответственности, который мешает душе «лететь вверх», подобно огню. Свобода — это не возможность купить всё, а отсутствие необходимости беспокоиться о чем-либо, кроме своей миссии.</p>`,

      en: `<p>We are used to considering wealth synonymous with freedom. However, the sources put forward a provocative thesis: excessive property is a form of imprisonment that a person chooses themselves.</p>

<h3>The Worker's Sleep and the Rich Man's Insomnia</h3>
<p>There exists a concept of "scattered thoughts" (pizzur ha-nefesh). When a person's assets are spread across different cities, banks, and enterprises, their soul ceases to belong to themselves. They are constantly "scattered" among their possessions, worrying about each one. While an ordinary worker sleeps peacefully, excess property robs the rich of sleep and the ability to focus on anything truly important.</p>

<h3>Spiritual Asceticism</h3>
<p>The sources tell of sages who deliberately chose simplicity to free their minds for dialogue with the Creator. Solitude or lack of family was in some cases viewed not as tragedy, but as liberation from the burden of responsibility that prevents the soul from "flying upward," like a flame. Freedom is not the ability to buy everything, but the absence of the need to worry about anything other than one's mission.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-30',
    image: '/images/articles/bitachon-30.png',
    slug: 'revolyutsiya-truda-vy-ne-zarabatyvayete-dengi-vy-stroite-dekoratsii',
    title: {
      ru: 'Революция труда: вы не зарабатываете деньги, вы строите «декорации»',
      en: 'The Labor Revolution: You Don\'t Earn Money, You Build "Decorations"',
      he: 'מהפכת העבודה: אתה לא מרוויח כסף, אתה בונה "תפאורה"',
      uk: 'Революція праці: ви не заробляєте гроші, ви будуєте «декорації»',
    },
    subtitle: {
      ru: 'Ваша работа — это лишь сосуд или маскировка для чуда',
      en: 'Your work is merely a vessel or disguise for a miracle',
      he: 'העבודה שלך היא רק כלי או הסוואה לנס',
      uk: 'Ваша робота — це лише посудина або маскування для дива',
    },
    content: {
      ru: `<p>Самая большая иллюзия работающего человека — вера в то, что его усилия являются причиной его заработка. Источники переворачивают это представление: ваша работа — это лишь «сосуд» или маскировка для чуда.</p>

<h3>Зачем работать, если всё решено?</h3>
<p>Если сумма вашего дохода на год уже определена Свыше, зачем вставать с дивана? Ответ шокирует: работа — это тест на верность. Б-г хочет, чтобы вы прилагали усилия, но при этом помнили, что результат от них не зависит. Работа — это своего рода «предохранитель», который занимает наш разум, чтобы мы не восстали против Творца от безделья.</p>

<h3>Профессия как биологический дизайн</h3>
<p>Выбор дела жизни не должен диктоваться только рынком. Источники утверждают: как у птицы есть клюв для ловли рыбы, а у льва — когти для охоты, так и ваши таланты и физическое строение — это указатель вашей миссии. Если вы идете против своей природы ради денег, вы не просто несчастны — вы совершаете акт неверия в то, что Б-г может прокормить вас через ваш естественный дар. Истинный успех — это быть «партнером Творца» на том месте, которое Он для вас спроектировал.</p>`,

      en: `<p>The biggest illusion of a working person is the belief that their efforts are the cause of their earnings. The sources turn this notion upside down: your work is merely a "vessel" or disguise for a miracle.</p>

<h3>Why Work If Everything Is Already Decided?</h3>
<p>If the sum of your income for the year is already determined from Above, why get off the couch? The answer is shocking: work is a test of loyalty. God wants you to make efforts while remembering that the result does not depend on them. Work is a kind of "safeguard" that occupies our minds so that we don't rebel against the Creator from idleness.</p>

<h3>Profession as Biological Design</h3>
<p>The choice of life's work should not be dictated only by the market. The sources assert: just as a bird has a beak for catching fish and a lion has claws for hunting, your talents and physical build are an indicator of your mission. If you go against your nature for money, you are not just unhappy — you commit an act of disbelief that God can sustain you through your natural gift. True success is being a "partner of the Creator" in the place He designed for you.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-31',
    slug: 'smertelnaya-ekspertiza-pochemu-vash-professionalizm-eto-tyurma',
    title: {
      ru: 'Смертельная экспертиза: почему ваш профессионализм — это тюрьма?',
      en: 'Deadly Expertise: Why Your Professionalism Is a Prison?',
      he: 'מומחיות קטלנית: למה המקצועיות שלך היא כלא?',
      uk: 'Смертельна експертиза: чому ваш професіоналізм — це в\'язниця?',
    },
    subtitle: {
      ru: 'Эксперт становится рабом своей экспертизы',
      en: 'The expert becomes a slave to their own expertise',
      he: 'המומחה הופך לעבד של המומחיות שלו',
      uk: 'Експерт стає рабом своєї експертизи',
    },
    content: {
      ru: `<p>Чем выше ваш профессионализм, тем глубже ваша зависимость. Источники предупреждают: эксперт, полагающийся на свои знания и навыки, строит тюрьму собственными руками.</p>

<h3>Уязвимость эксперта</h3>
<p>Представьте алхимика, который владеет секретом превращения металлов. Его ремесло требует редких материалов, которые он вынужден искать по всему свету. Он работает в тайне, опасаясь конкурентов и воров. Его здоровье подорвано ядовитыми испарениями. Каждый этап его работы — это новый источник тревоги: достанет ли он нужный ингредиент? Не раскроют ли его секрет? Не подведёт ли его здоровье в решающий момент? Профессионал становится заложником своего мастерства — чем оно сложнее, тем больше точек уязвимости.</p>

<h3>Свобода упования</h3>
<p>Человек, полагающийся на Творца, не зависит от редких ингредиентов и секретных формул. Его «рецепт» прост: делай своё дело честно, а результат оставь Б-гу. Такой человек спит спокойно, потому что его благополучие не привязано к хрупкой цепочке условий. Если один путь закрывается — Творец откроет другой. Истинная свобода — это не владение уникальными навыками, а понимание того, что ваш доход определяется не вашей экспертизой, а волей Того, Кто распределяет пропитание всему живому.</p>`,

      en: `<p>The higher your professionalism, the deeper your dependence. The sources warn: an expert who relies on their knowledge and skills builds a prison with their own hands.</p>

<h3>The Expert's Vulnerability</h3>
<p>Imagine an alchemist who possesses the secret of transmuting metals. His craft requires rare materials that he must seek across the world. He works in secrecy, fearing competitors and thieves. His health is undermined by poisonous fumes. Every stage of his work is a new source of anxiety: will he obtain the necessary ingredient? Will his secret be exposed? Will his health fail at the crucial moment? The professional becomes hostage to their mastery — the more complex it is, the more points of vulnerability.</p>

<h3>The Freedom of Trust</h3>
<p>A person who relies on the Creator does not depend on rare ingredients and secret formulas. Their "recipe" is simple: do your work honestly and leave the result to God. Such a person sleeps peacefully because their well-being is not tied to a fragile chain of conditions. If one path closes — the Creator will open another. True freedom is not possessing unique skills, but understanding that your income is determined not by your expertise, but by the will of the One Who distributes sustenance to all living things.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-32',
    slug: 'krizis-vzrosleniya-pochemu-vera-v-sobstvennyye-sily-eto-priznak-nezrelosti',
    title: {
      ru: 'Кризис взросления: почему вера в собственные силы — это признак незрелости?',
      en: 'The Crisis of Maturity: Why Belief in Your Own Strength Is a Sign of Immaturity?',
      he: 'משבר הבגרות: למה אמונה בכוחות עצמך היא סימן לחוסר בשלות?',
      uk: 'Криза дорослішання: чому віра у власні сили — це ознака незрілості?',
    },
    subtitle: {
      ru: '10 ступеней развития упования — от младенца до пророка',
      en: '10 stages of developing trust — from infant to prophet',
      he: '10 שלבים בפיתוח הביטחון — מתינוק ועד נביא',
      uk: '10 ступенів розвитку упования — від немовляти до пророка',
    },
    content: {
      ru: `<p>Мы привыкли считать самостоятельность вершиной зрелости. Однако источники утверждают обратное: вера в собственные силы — это всего лишь одна из промежуточных ступеней развития, а не его вершина.</p>

<h3>Этапы зависимости</h3>
<p>Человек проходит через естественные этапы: младенец полностью зависит от матери — она его единственный мир. Затем ребёнок обнаруживает отца и начинает полагаться на обоих родителей. По мере взросления подросток начинает верить в собственные силы — ему кажется, что он сам может обеспечить себе всё необходимое. Эта стадия воспринимается обществом как «зрелость», но на самом деле это лишь четвёртая ступень из десяти.</p>

<h3>Ошибка «сильной личности»</h3>
<p>Тот, кто остановился на этапе «я сам», подобен подростку, который считает, что уже всё знает о жизни. Вера в собственные силы — это не мудрость, а форма невежества: человек просто ещё не столкнулся с ситуацией, где его ресурсы окажутся бессильны. Истинная зрелость — это возвращение к Творцу, но уже осознанное. Не как младенец, который зависит от матери по беспомощности, а как мудрец, который понял: всё, чего я достиг «сам», было дано мне Свыше. Высшая ступень — это понимание того, что ваши усилия — лишь декорация, а режиссёр спектакля — Б-г.</p>`,

      en: `<p>We are accustomed to considering self-sufficiency the pinnacle of maturity. However, the sources assert the opposite: belief in your own strength is merely one of the intermediate stages of development, not its peak.</p>

<h3>Stages of Dependence</h3>
<p>A person passes through natural stages: an infant is completely dependent on the mother — she is their entire world. Then the child discovers the father and begins to rely on both parents. As they grow, the teenager begins to believe in their own strength — it seems to them that they can provide everything necessary for themselves. This stage is perceived by society as "maturity," but in reality it is only the fourth stage out of ten.</p>

<h3>The Error of the "Strong Individual"</h3>
<p>The one who stopped at the "I can do it myself" stage is like a teenager who thinks they already know everything about life. Belief in one's own strength is not wisdom but a form of ignorance: the person simply hasn't yet encountered a situation where their resources prove powerless. True maturity is a return to the Creator, but a conscious one. Not like an infant who depends on the mother out of helplessness, but like a sage who understood: everything I achieved "on my own" was given to me from Above. The highest stage is the understanding that your efforts are merely decoration, and the Director of the play is God.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-33',
    slug: 'taynaya-bukhgalteriya-nebes-pochemu-vash-uspekh-zavisit-ot-soseda',
    title: {
      ru: 'Тайная бухгалтерия небес: почему ваш успех зависит от соседа, а его — от вас?',
      en: 'The Secret Accounting of Heaven: Why Your Success Depends on Your Neighbor and His on You?',
      he: 'הנהלת החשבונות הסודית של השמיים: למה ההצלחה שלך תלויה בשכן, ושלו — בך?',
      uk: 'Таємна бухгалтерія небес: чому ваш успіх залежить від сусіда, а його — від вас?',
    },
    subtitle: {
      ru: 'Система коллективной ответственности и скрытые счета',
      en: 'The system of collective responsibility and hidden accounts',
      he: 'מערכת האחריות הקולקטיבית והחשבונות הנסתרים',
      uk: 'Система колективної відповідальності та приховані рахунки',
    },
    content: {
      ru: `<p>Мы привыкли думать о вознаграждении и наказании как о чём-то сугубо личном. Однако источники раскрывают систему коллективной ответственности, где ваш духовный счёт неразрывно связан с поведением окружающих.</p>

<h3>Коллективный контракт</h3>
<p>Тора обещает дождь и изобилие не отдельному праведнику, а всему народу — при условии коллективного соблюдения заповедей. Это означает, что ваш урожай зависит не только от ваших молитв, но и от того, насколько честен ваш сосед. Система устроена так, что невозможно «спастись в одиночку». Каждый человек — звено цепи, и слабость одного звена ослабляет всю конструкцию. Именно поэтому источники возлагают на каждого ответственность за исправление ближнего.</p>

<h3>Скрытые счета</h3>
<p>Существует важное различие между заповедями, которые касаются отношений между людьми, и заповедями, которые касаются отношений с Творцом. За нарушение «обязанностей сердца» — внутренних духовных обязательств — наказание оставляет Себе Б-г. Человеческий суд не может судить за мысли и намерения, но Небесная бухгалтерия ведёт точный учёт. Каждое невысказанное намерение, каждый скрытый мотив — всё записано в книге, которую вы не можете прочесть, но по которой вас будут судить.</p>`,

      en: `<p>We are accustomed to thinking of reward and punishment as something entirely personal. However, the sources reveal a system of collective responsibility where your spiritual account is inseparably linked to the behavior of those around you.</p>

<h3>The Collective Contract</h3>
<p>The Torah promises rain and abundance not to an individual righteous person, but to the entire nation — on the condition of collective observance of the commandments. This means your harvest depends not only on your prayers but also on how honest your neighbor is. The system is arranged so that it is impossible to "save yourself alone." Every person is a link in the chain, and the weakness of one link weakens the entire structure. This is precisely why the sources place on everyone the responsibility for correcting their fellow.</p>

<h3>Hidden Accounts</h3>
<p>There is an important distinction between commandments concerning relations between people and commandments concerning relations with the Creator. For violation of "duties of the heart" — internal spiritual obligations — God reserves punishment for Himself. Human courts cannot judge thoughts and intentions, but the Heavenly accounting keeps precise records. Every unspoken intention, every hidden motive — everything is written in a book that you cannot read, but by which you will be judged.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-34',
    slug: 'illyuziya-instrumenta-pochemu-vy-blagodarite-molotok',
    title: {
      ru: 'Иллюзия «инструмента»: почему вы благодарите молоток за то, что он забил гвоздь?',
      en: 'The Illusion of the "Tool": Why Do You Thank the Hammer for Driving the Nail?',
      he: 'אשליית ה"כלי": למה אתה מודה לפטיש שהוא תקע את המסמר?',
      uk: 'Ілюзія «інструменту»: чому ви дякуєте молотку за те, що він забив цвях?',
    },
    subtitle: {
      ru: 'Врач и лекарство как декорации Б-жественного исцеления',
      en: 'The doctor and medicine as decorations of Divine healing',
      he: 'הרופא והתרופה כתפאורה לריפוי האלוקי',
      uk: 'Лікар і ліки як декорації Б-жественного зцілення',
    },
    content: {
      ru: `<p>Мы живём в мире, где принято благодарить врача за исцеление и лекарство за облегчение боли. Но источники ставят перед нами неудобный вопрос: не благодарите ли вы молоток за то, что он забил гвоздь?</p>

<h3>Врач как декорация</h3>
<p>Источники утверждают: обращаться к врачу необходимо — Тора дала разрешение врачу лечить. Однако грехом является убеждение, что врач или лекарство исцеляют сами по себе. Приводится пример пророка Элиши, который бросил соль в ядовитую воду, и она стала пригодной для питья. Разве соль очищает яд? Нет — это Б-жественное действие, облечённое в форму естественного процесса. Точно так же лекарство — это лишь «соль», которую Творец использует как видимый инструмент Своего исцеления.</p>

<h3>Этикет свободного человека</h3>
<p>Как же относиться к тем, кто помогает нам? Источники учат: благодарите человека за его добрую волю и усилия, но ваше сердце должно оставаться свободным от зависимости. Благодарность — это проявление воспитанности, но не признание причинности. Вы благодарите официанта, который принёс блюдо, но понимаете, что еду приготовил повар, а деньги на неё вы заработали сами — точнее, получили от Того, Кто определил вашу долю.</p>`,

      en: `<p>We live in a world where it is customary to thank the doctor for healing and medicine for relieving pain. But the sources pose an uncomfortable question: aren't you thanking the hammer for driving the nail?</p>

<h3>The Doctor as Decoration</h3>
<p>The sources state: consulting a doctor is necessary — the Torah gave the doctor permission to heal. However, it is a sin to believe that the doctor or medicine heals on its own. The example is given of the prophet Elisha, who threw salt into poisonous water, and it became drinkable. Does salt purify poison? No — this is Divine action clothed in the form of a natural process. Likewise, medicine is merely the "salt" that the Creator uses as a visible instrument of His healing.</p>

<h3>The Etiquette of a Free Person</h3>
<p>How then should we relate to those who help us? The sources teach: thank the person for their goodwill and efforts, but your heart must remain free from dependence. Gratitude is a manifestation of good manners, but not an acknowledgment of causation. You thank the waiter who brought the dish, but you understand that the food was prepared by the chef, and the money for it you earned yourself — more precisely, received from the One Who determined your portion.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-35',
    slug: 'krazha-pod-vidom-uspekha-pochemu-vasha-zhadnost-eto-prestupleniye',
    title: {
      ru: 'Кража под видом успеха: почему ваша жадность — это уголовное преступление перед Небом',
      en: 'Theft Disguised as Success: Why Your Greed Is a Criminal Offense Before Heaven',
      he: 'גניבה במסווה של הצלחה: למה התאוות בצע שלך היא עבירה פלילית לפני השמיים',
      uk: 'Крадіжка під виглядом успіху: чому ваша жадібність — це кримінальний злочин перед Небом',
    },
    subtitle: {
      ru: 'Удержание излишков — форма присвоения чужого имущества',
      en: 'Hoarding surpluses is a form of appropriating someone else\'s property',
      he: 'אגירת עודפים היא צורה של גזל רכוש הזולת',
      uk: 'Утримання надлишків — форма привласнення чужого майна',
    },
    content: {
      ru: `<p>Мы привыкли считать накопление богатства признаком успеха и мудрости. Однако источники представляют радикально иную точку зрения: удержание излишков — это форма кражи.</p>

<h3>Статус нечестного хранителя</h3>
<p>Согласно источникам, доход человека состоит из трёх частей: на собственные нужды, на благотворительность и на содержание семьи. Всё, что сверх этого, является «депозитом», который Б-г временно доверил вам для распределения. Тот, кто накапливает излишки и не передаёт их нуждающимся, подобен нечестному хранителю, который присваивает вверенное ему чужое имущество. Жадность — это не просто моральный недостаток, а буквальная кража Б-жественного депозита.</p>

<h3>Ловушка признания</h3>
<p>Ещё одна тонкая ловушка — ожидание благодарности за благотворительность. Тот, кто жертвует и ждёт признания, по сути требует плату за передачу чужого имущества. Вы — лишь курьер, который доставляет посылку от Отправителя к получателю. Какой курьер требует аплодисментов? Ожидание благодарности аннулирует духовную ценность поступка и превращает заповедь в сделку с собственным эго.</p>`,

      en: `<p>We are accustomed to considering the accumulation of wealth a sign of success and wisdom. However, the sources present a radically different perspective: hoarding surpluses is a form of theft.</p>

<h3>The Status of a Dishonest Guardian</h3>
<p>According to the sources, a person's income consists of three parts: for personal needs, for charity, and for family support. Everything beyond this is a "deposit" that God has temporarily entrusted to you for distribution. The one who accumulates surpluses and does not pass them on to those in need is like a dishonest guardian who appropriates someone else's property entrusted to them. Greed is not merely a moral flaw but a literal theft of the Divine deposit.</p>

<h3>The Trap of Recognition</h3>
<p>Another subtle trap is expecting gratitude for charity. The one who gives and waits for recognition essentially demands payment for delivering someone else's property. You are merely a courier delivering a package from the Sender to the recipient. What courier demands applause? The expectation of gratitude annuls the spiritual value of the act and turns a commandment into a deal with one's own ego.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-36',
    slug: 'sekta-self-made-pochemu-vera-v-sobstvennyye-sily-eto-lovushka',
    title: {
      ru: 'Секта «self-made»: почему вера в собственные силы — это ловушка для дураков',
      en: 'The "Self-Made" Cult: Why Belief in Your Own Strength Is a Trap for Fools',
      he: 'כת ה"סלף-מייד": למה אמונה בכוחות עצמך היא מלכודת לטיפשים',
      uk: 'Секта «self-made»: чому віра у власні сили — це пастка для дурнів',
    },
    subtitle: {
      ru: 'Когда вы считаете себя причиной успеха, Б-г убирает покровительство',
      en: 'When you consider yourself the cause of success, God removes His protection',
      he: 'כשאתה חושב שאתה הסיבה להצלחה, ה\' מסיר את ההשגחה',
      uk: 'Коли ви вважаєте себе причиною успіху, Б-г прибирає покровительство',
    },
    content: {
      ru: `<p>Современная культура превозносит «self-made man» — человека, который «сделал себя сам». Однако источники называют эту веру не просто заблуждением, а духовной ловушкой с катастрофическими последствиями.</p>

<h3>Интеллект как капкан</h3>
<p>В Писании сказано: «Он ловит мудрых их же хитростью». Это означает, что чем умнее человек, тем изощрённее ловушка, которую расставляет его собственный разум. Человек начинает верить, что его успех — результат его таланта, образования и стратегии. В источниках приводится притча о писце, который гордился своим каллиграфическим почерком и считал, что его рука кормит семью. Когда он потерял руку в несчастном случае, он понял: рука была лишь инструментом, а истинный Кормилец — Тот, Кто дал ему эту руку.</p>

<h3>Усилия как маскировка</h3>
<p>Концепция «хиштадлут» (усилие) учит: работа — это сосуд, а не причина. Подобно тому как сосуд необходим для воды, но не является её источником, усилия необходимы, но не они определяют результат. Практический вывод: работайте добросовестно, но без надрыва и стресса. Если вы работаете с тревогой — вы верите в свои усилия. Если работаете с покоем в сердце — вы верите в Творца. Стресс на работе — это безошибочный индикатор недостатка упования.</p>`,

      en: `<p>Modern culture glorifies the "self-made man" — a person who "made themselves." However, the sources call this belief not merely a delusion but a spiritual trap with catastrophic consequences.</p>

<h3>Intellect as a Trap</h3>
<p>Scripture says: "He catches the wise in their own craftiness." This means the smarter a person is, the more sophisticated the trap their own mind sets. A person begins to believe that their success is the result of their talent, education, and strategy. The sources tell a parable of a scribe who was proud of his calligraphic handwriting and believed his hand fed the family. When he lost his hand in an accident, he understood: the hand was merely a tool, and the true Provider was the One Who gave him that hand.</p>

<h3>Efforts as Disguise</h3>
<p>The concept of "hishtadlut" (effort) teaches: work is a vessel, not a cause. Just as a vessel is necessary for water but is not its source, efforts are necessary but do not determine the outcome. The practical conclusion: work conscientiously but without strain and stress. If you work with anxiety — you believe in your efforts. If you work with peace in your heart — you believe in the Creator. Stress at work is an unmistakable indicator of insufficient trust.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-37',
    slug: 'kogda-mozhno-iskushat-boga-edinstvennyy-legalnyy-sposob',
    title: {
      ru: 'Когда можно искушать Бога: единственный легальный способ «проверить» Творца',
      en: 'When You Can Test God: The Only Legal Way to "Check" the Creator',
      he: 'מתי מותר לנסות את ה\': הדרך החוקית היחידה "לבדוק" את הבורא',
      uk: 'Коли можна випробовувати Бога: єдиний легальний спосіб «перевірити» Творця',
    },
    subtitle: {
      ru: 'Исключение из правил: испытание через десятину',
      en: 'The exception to the rule: testing through the tithe',
      he: 'החריג לכלל: מבחן דרך המעשר',
      uk: 'Виняток із правил: випробування через десятину',
    },
    content: {
      ru: `<p>В еврейской традиции существует строгий запрет на «испытание» Б-га — нельзя ставить Творцу условия и требовать доказательств. Но есть одно поразительное исключение.</p>

<h3>Вызов Небесам</h3>
<p>Обычно человеку запрещено «проверять» Бога: «Не испытывайте Г-пода, Б-га вашего». Однако в отношении десятины (маасер) действует уникальное исключение. Через пророка Малахи Б-г буквально бросает вызов: «Принесите всю десятину в хранилище… и испытайте Меня в этом, — говорит Г-подь Воинств, — не открою ли Я вам окна небесные и не изолью ли на вас благословение до избытка». Это единственный случай, когда Творец Сам приглашает человека проверить Его обещание.</p>

<h3>Парадокс умножения через деление</h3>
<p>В источниках приводится притча о торговце тканями, который отделял десятину от каждой прибыли. Его конкуренты смеялись: «Ты отдаёшь десятую часть заработка — значит, ты всегда будешь беднее нас на десять процентов!» Но происходило обратное: его дело процветало, а конкуренты разорялись. Парадокс в том, что материальный мир работает по духовным законам. Отдавая десятую часть, вы не теряете — вы активируете канал изобилия, который работает по логике, противоположной арифметике: чем больше отдаёшь, тем больше получаешь.</p>`,

      en: `<p>In Jewish tradition there is a strict prohibition against "testing" God — one cannot set conditions for the Creator and demand proof. But there is one astonishing exception.</p>

<h3>A Challenge to Heaven</h3>
<p>Normally a person is forbidden to "test" God: "You shall not test the Lord your God." However, regarding the tithe (maaser), a unique exception applies. Through the prophet Malachi, God literally issues a challenge: "Bring the whole tithe into the storehouse… and test Me in this, says the Lord of Hosts — will I not open the windows of heaven for you and pour out blessing until there is no more need." This is the only case where the Creator Himself invites a person to test His promise.</p>

<h3>The Paradox of Multiplication Through Division</h3>
<p>The sources tell a parable of a cloth merchant who set aside a tithe from every profit. His competitors laughed: "You give away a tenth of your earnings — you'll always be ten percent poorer than us!" But the opposite happened: his business thrived while his competitors went bankrupt. The paradox is that the material world operates by spiritual laws. By giving away a tenth, you don't lose — you activate a channel of abundance that works by logic opposite to arithmetic: the more you give, the more you receive.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-38',
    slug: 'toksichnaya-blagotvoritelnost-kak-vasha-pomoshch-ubivayet-vashu-dushu',
    title: {
      ru: 'Токсичная благотворительность: как ваша помощь «убивает» вашу душу',
      en: 'Toxic Charity: How Your Help "Kills" Your Soul',
      he: 'צדקה רעילה: איך העזרה שלך "הורגת" את הנשמה שלך',
      uk: 'Токсична благодійність: як ваша допомога «вбиває» вашу душу',
    },
    subtitle: {
      ru: 'Публичная помощь и жажда почета превращают добро в духовный яд',
      en: 'Public help and the thirst for honor turn good into spiritual poison',
      he: 'עזרה פומבית וצמא לכבוד הופכים טוב לרעל רוחני',
      uk: 'Публічна допомога та жага пошани перетворюють добро на духовну отруту',
    },
    content: {
      ru: `<p>Благотворительность считается одной из высших добродетелей. Но источники предупреждают: неправильная благотворительность может не только обесценить доброе дело, но и навредить вашей душе.</p>

<h3>Скрытое против явного</h3>
<p>Публичная благотворительность лишает человека вечного вознаграждения. Тот, кто жертвует напоказ, получает свою «плату» здесь и сейчас — в виде почёта и общественного признания. Но при этом он теряет награду в мире грядущем. Высшая форма благотворительности — анонимная, когда дающий не знает, кому он даёт, а получающий не знает, от кого получает. Именно такая форма помощи максимально приближает человека к Б-жественному качеству — ведь Б-г дарует блага, не требуя публичной благодарности.</p>

<h3>Оскорбление благодетеля</h3>
<p>Вы — всего лишь воронка, через которую Б-жественные блага перетекают от Источника к нуждающемуся. Требовать признания за благотворительность — всё равно что водопроводная труба требовала бы благодарности за воду. Это не просто нескромность — это духовная дерзость. Вы присваиваете себе заслугу за действие, которое совершил через вас Творец. Истинная щедрость — это радость от возможности быть проводником добра, а не ожидание аплодисментов.</p>`,

      en: `<p>Charity is considered one of the highest virtues. But the sources warn: improper charity can not only devalue a good deed but also harm your soul.</p>

<h3>Hidden Versus Public</h3>
<p>Public charity deprives a person of eternal reward. The one who gives for show receives their "payment" here and now — in the form of honor and public recognition. But in doing so, they lose the reward in the world to come. The highest form of charity is anonymous, where the giver doesn't know who they give to, and the receiver doesn't know who they receive from. It is precisely this form of help that brings a person closest to the Divine quality — for God bestows blessings without demanding public gratitude.</p>

<h3>Insulting the Benefactor</h3>
<p>You are merely a funnel through which Divine blessings flow from the Source to the one in need. Demanding recognition for charity is like a water pipe demanding gratitude for the water. This is not merely immodesty — it is spiritual impudence. You claim credit for an action that the Creator performed through you. True generosity is the joy of being a conduit of good, not the expectation of applause.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-39',
    slug: 'religioznyy-nartsissizm-pochemu-molitva-prestupnika-eto-oskorbleniye',
    title: {
      ru: 'Религиозный нарциссизм: почему молитва преступника — это оскорбление Творца',
      en: 'Religious Narcissism: Why a Criminal\'s Prayer Is an Insult to the Creator',
      he: 'נרקיסיזם דתי: למה תפילת העבריין היא עלבון לבורא',
      uk: 'Релігійний нарцисизм: чому молитва злочинця — це образа Творця',
    },
    subtitle: {
      ru: 'Вера без связи с реальностью — пустая оболочка',
      en: 'Faith without connection to reality is an empty shell',
      he: 'אמונה ללא קשר למציאות היא קליפה ריקה',
      uk: 'Віра без зв\'язку з реальністю — порожня оболонка',
    },
    content: {
      ru: `<p>Одна из самых провокационных идей источников: можно быть глубоко верующим человеком и при этом оскорблять Б-га каждым своим действием. Вера без упования — это религиозный нарциссизм.</p>

<h3>Вера без связи с реальностью</h3>
<p>В источниках описывается вор, который перед ограблением останавливается, чтобы помолиться Б-гу об успехе своего «предприятия». Этот человек обладает верой (эмуна) — он верит, что Б-г существует, слышит молитвы и может помочь. Но у него нет упования (битахон) — осознания того, что Б-г уже определил его долю, и кража — это не способ получить больше, а способ потерять всё. Вера без упования подобна телу без души — внешняя оболочка есть, но жизни в ней нет.</p>

<h3>Б-г как соучастник</h3>
<p>Когда человек использует религию для обслуживания своего эго — молится не ради близости к Творцу, а ради получения желаемого — он фактически пытается сделать Б-га соучастником своих планов. Это высшая форма духовной наглости: не вы подчиняетесь Б-жественному плану, а пытаетесь подчинить Б-га своему. Истинная молитва — это не список требований, а акт капитуляции: «Не моя воля, а Твоя».</p>`,

      en: `<p>One of the most provocative ideas in the sources: one can be a deeply religious person and yet insult God with every action. Faith without trust is religious narcissism.</p>

<h3>Faith Without Connection to Reality</h3>
<p>The sources describe a thief who, before a robbery, stops to pray to God for the success of his "enterprise." This person possesses faith (emunah) — he believes that God exists, hears prayers, and can help. But he lacks trust (bitachon) — the awareness that God has already determined his portion, and theft is not a way to get more but a way to lose everything. Faith without trust is like a body without a soul — the outer shell exists, but there is no life in it.</p>

<h3>God as Accomplice</h3>
<p>When a person uses religion to serve their ego — praying not for closeness to the Creator but to obtain what they desire — they are essentially trying to make God an accomplice in their plans. This is the highest form of spiritual impudence: you don't submit to the Divine plan, but try to submit God to yours. True prayer is not a list of demands but an act of surrender: "Not my will, but Yours."</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-40',
    slug: 'proklyatiye-dosuga-pochemu-bezdelye-kratchayshiy-put-k-buntu',
    title: {
      ru: 'Проклятие досуга: почему безделье — кратчайший путь к бунту против Бога',
      en: 'The Curse of Leisure: Why Idleness Is the Shortest Path to Rebellion Against God',
      he: 'קללת הפנאי: למה בטלה היא הדרך הקצרה ביותר למרד נגד ה\'',
      uk: 'Прокляття дозвілля: чому неробство — найкоротший шлях до бунту проти Бога',
    },
    subtitle: {
      ru: 'Работа как предохранитель от саморазрушения',
      en: 'Work as a safeguard against self-destruction',
      he: 'עבודה כמנגנון הגנה מפני הרס עצמי',
      uk: 'Робота як запобіжник від саморуйнування',
    },
    content: {
      ru: `<p>Мечта о «пассивном доходе» и жизни без работы кажется вершиной успеха. Но источники предупреждают: безделье — это не награда, а проклятие, ведущее к духовному саморазрушению.</p>

<h3>Работа как предохранитель</h3>
<p>Праздный ум становится мастерской для бунта. Источники напоминают библейский пример: «И разжирел Йешурун и стал брыкаться». Когда народ Израиля получил всё необходимое без усилий, вместо благодарности он восстал против Б-га. Это не случайность — это закономерность. Человеческий разум, лишённый занятия, неизбежно обращается к деструктивным мыслям: зависти, сомнениям, бунту. Работа — это Б-жественный «предохранитель», который защищает нас от нас самих.</p>

<h3>Лекарство от скуки</h3>
<p>Работа дисциплинирует не только тело, но и дух. Человек, занятый осмысленным трудом, не имеет времени и энергии для духовного саморазрушения. Источники предупреждают: тот, кто стремится к жизни без усилий, теряет не просто время — он теряет человеческий облик. Ибо отличие человека от животного — в способности трудиться ради высшей цели, а не просто потреблять. Стремление к безделью — это стремление вернуться в животное состояние.</p>`,

      en: `<p>The dream of "passive income" and a life without work seems like the pinnacle of success. But the sources warn: idleness is not a reward but a curse leading to spiritual self-destruction.</p>

<h3>Work as a Safeguard</h3>
<p>An idle mind becomes a workshop for rebellion. The sources recall the biblical example: "And Yeshurun grew fat and kicked." When the people of Israel received everything necessary without effort, instead of gratitude they rebelled against God. This is not a coincidence — it is a pattern. The human mind, deprived of occupation, inevitably turns to destructive thoughts: envy, doubt, rebellion. Work is a Divine "safeguard" that protects us from ourselves.</p>

<h3>The Cure for Boredom</h3>
<p>Work disciplines not only the body but also the spirit. A person occupied with meaningful labor has neither the time nor energy for spiritual self-destruction. The sources warn: the one who strives for a life without effort loses not just time — they lose their human form. For the distinction between human and animal lies in the ability to labor for a higher purpose, not merely to consume. The striving for idleness is the striving to return to an animal state.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-41',
    slug: 'rasseivaniye-dushi-nevidimaya-tsena-investitsiy-i-nakopleniy',
    title: {
      ru: 'Рассеивание души: невидимая цена инвестиций и накоплений',
      en: 'Scattering of the Soul: The Invisible Price of Investments and Savings',
      he: 'פיזור הנפש: המחיר הנסתר של השקעות וחסכונות',
      uk: 'Розсіювання душі: невидима ціна інвестицій та накопичень',
    },
    subtitle: {
      ru: 'Имущество в разных банках и странах — рассеивание души',
      en: 'Assets in different banks and countries — the scattering of the soul',
      he: 'נכסים בבנקים ומדינות שונות — פיזור הנפש',
      uk: 'Майно в різних банках та країнах — розсіювання душі',
    },
    content: {
      ru: `<p>Диверсификация активов считается золотым правилом финансовой грамотности. Но источники открывают обратную сторону этой стратегии: чем больше ваши активы рассредоточены, тем сильнее «рассеяна» ваша душа.</p>

<h3>Бессонница богача</h3>
<p>Существует молитва, в которой упоминается понятие «пиззур а-нефеш» — рассеивание души. Когда ваши активы находятся в каждом порту, в каждом банке, в каждой стране, ваш разум следует за ними. Вы просыпаетесь ночью, проверяя курсы валют. Вы тревожитесь о политической стабильности в стране, где лежат ваши деньги. Каждый актив — это ниточка, которая тянет вашу душу в свою сторону, и в итоге душа оказывается растянута между десятками точек, не принадлежа полностью ни одной из них.</p>

<h3>Иллюзия контроля</h3>
<p>Источники напоминают: «Чем больше имущества, тем больше забот». Простой работник, получающий зарплату, спит спокойно, потому что его душа не рассеяна. Он знает, что его пропитание приходит от Б-га, и ему не нужно контролировать десятки переменных. Богач же, пытаясь контролировать всё, не контролирует ничего — включая собственный покой. Истинная финансовая мудрость — это не диверсификация активов, а концентрация упования: все яйца в одной корзине, и эта корзина — в руках Б-га.</p>`,

      en: `<p>Asset diversification is considered the golden rule of financial literacy. But the sources reveal the other side of this strategy: the more your assets are spread out, the more "scattered" your soul becomes.</p>

<h3>The Rich Man's Insomnia</h3>
<p>There is a prayer that mentions the concept of "pizzur ha-nefesh" — the scattering of the soul. When your assets are in every port, every bank, every country, your mind follows them. You wake up at night checking exchange rates. You worry about political stability in the country where your money sits. Each asset is a thread pulling your soul in its direction, and ultimately the soul ends up stretched between dozens of points, not fully belonging to any of them.</p>

<h3>The Illusion of Control</h3>
<p>The sources remind us: "The more property, the more worries." A simple worker receiving a salary sleeps peacefully because his soul is not scattered. He knows that his sustenance comes from God, and he doesn't need to control dozens of variables. The rich man, trying to control everything, controls nothing — including his own peace of mind. True financial wisdom is not asset diversification but concentration of trust: all eggs in one basket, and that basket is in God's hands.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-42',
    slug: 'sindrom-self-made-man-pochemu-vera-v-sily-eto-dukhovnyy-infantilizm',
    title: {
      ru: 'Синдром «Self-made man»: почему вера в свои силы — это духовный инфантилизм',
      en: 'The "Self-Made Man" Syndrome: Why Belief in Your Own Strength Is Spiritual Infantilism',
      he: 'תסמונת ה"סלף-מייד מן": למה אמונה בכוחות עצמך היא אינפנטיליזם רוחני',
      uk: 'Синдром «Self-made man»: чому віра у свої сили — це духовний інфантилізм',
    },
    subtitle: {
      ru: 'Упование на собственные способности — четвёртая ступень развития подростка',
      en: 'Reliance on one\'s own abilities is the fourth stage of adolescent development',
      he: 'הסתמכות על היכולות העצמיות היא השלב הרביעי בהתפתחות המתבגר',
      uk: 'Упування на власні здібності — четвертий ступінь розвитку підлітка',
    },
    content: {
      ru: `<p>Культура «self-made man» учит: полагайся на себя, и ты добьёшься всего. Источники же утверждают: этот этап развития соответствует уровню подростка, а не зрелого человека.</p>

<h3>Этапы взросления упования</h3>
<p>Человек проходит через десять ступеней развития упования. Младенец полагается на мать. Ребёнок — на отца. Подросток — на обоих родителей. Юноша — на самого себя. Это четвёртая ступень. Далее начинается путь к зрелости: человек обнаруживает, что его сил недостаточно, и начинает искать опору вне себя — сначала в обществе, затем в мудрости, потом в вере, и наконец — в полном уповании на Творца. Десятая ступень — это понимание того, что даже само упование — это дар свыше, а не ваше личное достижение.</p>

<h3>Крах самоуверенности</h3>
<p>Десятая, высшая ступень упования — это понимание того, что все ваши усилия — лишь декорация, а истинный Режиссёр — Б-г. На этом уровне человек осознаёт: не «я заработал», а «мне было дано». Не «я добился», а «мне позволили». Источники предупреждают: того, кто задерживается на четвёртой ступени и считает себя причиной своего успеха, Б-г лишает Своего особого покровительства. Не в наказание, а по логике: если ты справляешься сам — зачем тебе Моя помощь? Самоуверенность — это не сила, а приглашение остаться без Б-жественной защиты.</p>`,

      en: `<p>The "self-made man" culture teaches: rely on yourself and you'll achieve everything. The sources, however, assert: this stage of development corresponds to the level of an adolescent, not a mature person.</p>

<h3>Stages of Maturing Trust</h3>
<p>A person passes through ten stages of developing trust. An infant relies on the mother. A child — on the father. A teenager — on both parents. A young person — on themselves. This is the fourth stage. From there begins the path to maturity: a person discovers that their strength is insufficient and begins to seek support outside themselves — first in society, then in wisdom, then in faith, and finally — in complete trust in the Creator. The tenth stage is the understanding that even trust itself is a gift from Above, not your personal achievement.</p>

<h3>The Collapse of Self-Confidence</h3>
<p>The tenth, highest stage of trust is the understanding that all your efforts are merely decoration, and the true Director is God. At this level, a person realizes: not "I earned it" but "it was given to me." Not "I achieved it" but "I was allowed to." The sources warn: the one who lingers at the fourth stage and considers themselves the cause of their success, God deprives of His special providence. Not as punishment, but by logic: if you manage on your own — why do you need My help? Self-confidence is not strength but an invitation to remain without Divine protection.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-43',
    slug: 'dukhovnyy-samoobman-pochemu-vashe-vdokhnoveniye-mozhet-byt-pustyshkoy',
    title: {
      ru: 'Духовный самообман: почему ваше «вдохновение» может быть пустышкой',
      en: 'Spiritual Self-Deception: Why Your "Inspiration" May Be a Dummy',
      he: 'הונאה עצמית רוחנית: למה ה"השראה" שלך עשויה להיות דמה',
      uk: 'Духовний самообман: чому ваше «натхнення» може бути порожнечею',
    },
    subtitle: {
      ru: 'Вдохновение от Б-га и от собственного эго — две разные вещи',
      en: 'Inspiration from God and from your own ego are two different things',
      he: 'השראה מאלוקים והשראה מהאגו — שני דברים שונים',
      uk: 'Натхнення від Б-га і від власного его — дві різні речі',
    },
    content: {
      ru: `<p>Многие люди путают подлинное духовное вдохновение с продукцией собственного эго. Эта ошибка может стоить целой жизни, прожитой в иллюзии.</p>

<h3>Ловушка эго</h3>
<p>Искусственный религиозный экстаз питает эго, а не душу. Когда человек «накручивает» себя на духовные переживания, он создаёт красивую обёртку без содержимого. Б-г может не отвечать на такие «вдохновения», потому что они направлены не к Нему, а к самому себе. Это похоже на актёра, который так вжился в роль праведника, что забыл — он на сцене, а не в Храме.</p>

<h3>Истинный отклик</h3>
<p>Настоящее служение — это делать то, чего хочет Б-г, а не то, что приносит вам приятные ощущения. Бескорыстное служение создаёт пространство для бесконечного вознаграждения. Когда вы убираете своё эго из уравнения, Б-г заполняет освободившееся место Своим присутствием. Парадокс: чем меньше вы ищете духовных «кайфов», тем больше подлинного света входит в вашу жизнь.</p>`,

      en: `<p>Many people confuse genuine spiritual inspiration with the product of their own ego. This mistake can cost an entire life lived in illusion.</p>

<h3>The Ego Trap</h3>
<p>Artificial religious ecstasy feeds the ego, not the soul. When a person "works themselves up" into spiritual experiences, they create a beautiful wrapper with no content. God may not respond to such "inspirations" because they are directed not at Him but at oneself. It's like an actor who became so immersed in the role of a righteous person that he forgot — he's on a stage, not in the Temple.</p>

<h3>The True Response</h3>
<p>True service means doing what God wants, not what brings you pleasant sensations. Selfless service creates space for infinite reward. When you remove your ego from the equation, God fills the vacated space with His presence. The paradox: the less you seek spiritual "highs," the more genuine light enters your life.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-44',
    slug: 'bog-ne-ofitsiant-pochemu-vashi-zakazy-ne-prinimayutsya',
    title: {
      ru: 'Б-г — не официант: почему ваши «заказы» не принимаются',
      en: 'God Is Not a Waiter: Why Your "Orders" Are Not Accepted',
      he: 'אלוקים הוא לא מלצר: למה ה"הזמנות" שלך לא מתקבלות',
      uk: 'Б-г — не офіціант: чому ваші «замовлення» не приймаються',
    },
    subtitle: {
      ru: 'Кто для вас Б-г — официант или Мастер?',
      en: 'Who is God to you — a waiter or a Master?',
      he: 'מי בשבילך אלוקים — מלצר או אומן?',
      uk: 'Хто для вас Б-г — офіціант чи Майстер?',
    },
    content: {
      ru: `<p>Отношение к Б-гу как к поставщику услуг — одна из самых распространённых духовных ошибок. Когда молитва превращается в список требований, связь с Творцом разрывается.</p>

<h3>Разница подходов</h3>
<p>Есть два типа отношений с Б-гом: «официант» и «мастер». В первом случае вы сидите за столом и требуете: принеси здоровье, подай богатство, обеспечь успех. Если «заказ» задерживается — вы недовольны. Во втором случае вы понимаете, что Б-г — это Мастер, ремесленник, создающий произведение искусства, и вы — часть этого произведения. Требовать от Мастера — значит обращаться с Ним как со слугой.</p>

<h3>Мудрость дизайна</h3>
<p>Вы — часть грандиозного проекта, и задержки — это не сбои в обслуживании, а этапы строительства. Когда архитектор возводит здание, он не начинает с крыши. Так и Б-г выстраивает вашу жизнь по Своему плану, где каждая «задержка» — это закладка фундамента для чего-то большего. Перестаньте заказывать — начните сотрудничать.</p>`,

      en: `<p>Treating God as a service provider is one of the most common spiritual mistakes. When prayer turns into a list of demands, the connection with the Creator is severed.</p>

<h3>The Difference in Approaches</h3>
<p>There are two types of relationships with God: "waiter" and "master craftsman." In the first case, you sit at a table and demand: bring health, serve wealth, ensure success. If the "order" is delayed — you're dissatisfied. In the second case, you understand that God is a Master, a craftsman creating a work of art, and you are part of that work. To demand from the Master is to treat Him as a servant.</p>

<h3>The Wisdom of Design</h3>
<p>You are part of a grand project, and delays are not service failures but construction stages. When an architect builds a building, he doesn't start with the roof. So too, God constructs your life according to His plan, where every "delay" is laying the foundation for something greater. Stop ordering — start collaborating.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-45',
    slug: 'religioznaya-mest-kogda-molitva-o-gibeli-vraga-stanovitsya-grekhom',
    title: {
      ru: 'Религиозная месть: когда молитва о гибели врага становится грехом',
      en: 'Religious Revenge: When Praying for Your Enemy\'s Downfall Becomes a Sin',
      he: 'נקמה דתית: כשתפילה למפלת האויב הופכת לחטא',
      uk: 'Релігійна помста: коли молитва про загибель ворога стає гріхом',
    },
    subtitle: {
      ru: 'Враг как зеркало ваших прегрешений',
      en: 'The enemy as a mirror of your transgressions',
      he: 'האויב כמראה של עוונותיך',
      uk: 'Ворог як дзеркало ваших прогріхів',
    },
    content: {
      ru: `<p>Желание уничтожить врага с помощью молитвы кажется праведным, но источники раскрывают совершенно иную картину: ваш враг — это не случайность, а послание.</p>

<h3>Враг как зеркало</h3>
<p>Боль приходит только с разрешения Б-га. Если кто-то причиняет вам страдания, значит, Б-г это допустил. Враг — это инструмент искупления, зеркало, отражающее те области вашей жизни, которые требуют исправления. Молиться о гибели зеркала — значит разбить его и потерять возможность увидеть собственные изъяны.</p>

<h3>Высшая стратегия</h3>
<p>Исправьте отношения с Б-гом — и Б-г умиротворит ваших врагов. Это не наивность, а высшая стратегия. Источники учат: когда пути человека угодны Б-гу, даже враги его примиряются с ним. Помните: и вы, и ваш враг — дети одного Отца. Вместо того чтобы молиться о его падении, молитесь о том, чтобы понять урок, который он несёт.</p>`,

      en: `<p>The desire to destroy an enemy through prayer seems righteous, but the sources reveal an entirely different picture: your enemy is not an accident but a message.</p>

<h3>The Enemy as a Mirror</h3>
<p>Pain comes only with God's permission. If someone causes you suffering, it means God allowed it. The enemy is a tool of atonement, a mirror reflecting those areas of your life that require correction. To pray for the destruction of the mirror is to shatter it and lose the opportunity to see your own flaws.</p>

<h3>The Higher Strategy</h3>
<p>Fix your relationship with God — and God will pacify your enemies. This is not naivety but the highest strategy. The sources teach: when a person's ways please God, even their enemies make peace with them. Remember: both you and your enemy are children of one Father. Instead of praying for his downfall, pray to understand the lesson he carries.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },
  {
    id: 'bitachon-46',
    slug: 'proklyatiye-logiki-pochemu-razum-eto-baryer-na-puti-k-bogu',
    title: {
      ru: 'Проклятие логики: почему разум — это барьер на пути к Б-гу',
      en: 'The Curse of Logic: Why the Mind Is a Barrier on the Path to God',
      he: 'קללת ההיגיון: למה השכל הוא מחסום בדרך לאלוקים',
      uk: 'Прокляття логіки: чому розум — це бар\'єр на шляху до Б-га',
    },
    subtitle: {
      ru: 'Служение только на основе логики — ущербная форма религии',
      en: 'Serving only on the basis of logic is a deficient form of religion',
      he: 'עבודת ה\' רק על בסיס הגיון היא צורה פגומה של דת',
      uk: 'Служіння лише на основі логіки — ущербна форма релігії',
    },
    content: {
      ru: `<p>Разум — величайший дар и одновременно величайшая ловушка. Когда человек пытается вместить Б-жественное в рамки логики, он неизбежно терпит поражение.</p>

<h3>Пределы интеллекта</h3>
<p>Разум не способен постичь Б-жественное. Это не его слабость — это его природа. Пытаться понять Б-га с помощью логики — всё равно что измерять океан чайной ложкой. Те, кто служат только «логичным» заповедям — тем, которые «имеют смысл» для их разума, — практикуют интеллектуальное идолопоклонство. Они поклоняются не Б-гу, а своему пониманию Б-га, что совсем не одно и то же.</p>

<h3>Энергия животной души</h3>
<p>Доверие начинается там, где заканчивается логика. Именно на этой границе происходит настоящий прорыв. Источники учат, что животная душа человека обладает колоссальной энергией, и эту энергию можно направить на Б-жественное служение. Когда вы перестаёте требовать логических объяснений и просто доверяете Б-гу, вы высвобождаете силу, которая была заперта в клетке рассудка. Парадокс: отказ от контроля разума даёт вам больше силы, чем любой интеллектуальный анализ.</p>`,

      en: `<p>The mind is the greatest gift and simultaneously the greatest trap. When a person tries to fit the Divine into the framework of logic, they inevitably fail.</p>

<h3>The Limits of Intellect</h3>
<p>The mind cannot grasp the Divine. This is not its weakness — it is its nature. Trying to understand God through logic is like measuring the ocean with a teaspoon. Those who serve only "logical" commandments — those that "make sense" to their mind — practice intellectual idolatry. They worship not God but their understanding of God, which is not the same thing at all.</p>

<h3>The Energy of the Animal Soul</h3>
<p>Trust begins where logic ends. It is precisely at this boundary that the real breakthrough happens. The sources teach that a person's animal soul possesses colossal energy, and this energy can be directed toward Divine service. When you stop demanding logical explanations and simply trust God, you release a force that was locked in the cage of reason. The paradox: surrendering the mind's control gives you more power than any intellectual analysis.</p>`,
    },
    tag: { ru: 'Битахон', en: 'Bitachon', he: 'ביטחון', uk: 'Бітахон' },
    createdAt: '2026-03-27',
  },

  // ========================
  // CALENDAR — NISSAN
  // ========================
  {
    id: 'nissan-2',
    image: '/images/articles/nissan-2.png',
    slug: 'nissan-2-poslednie-zavety-rebe-rashaba',
    hebrewDate: { month: 'Nisan', day: 2 },
    monthIntro: {
      ru: 'Ниссан: Месяц рождения, преемственности и духовного единства. Месяц Ниссан в календаре Хабада — это не просто время Песаха, но и период, когда вспоминаются ключевые моменты жизни пяти из семи Ребе движения.',
      en: 'Nissan: Month of Birth, Succession and Spiritual Unity. The month of Nissan in the Chabad calendar is not just the time of Pesach, but a period when key moments in the lives of five of the seven Rebbes are remembered.',
    },
    title: {
      ru: '2 Ниссана: Последние заветы Ребе Рашаба (5680/1920)',
      en: '2 Nissan: Last Testaments of the Rebbe Rashab (5680/1920)',
      he: 'ב\' ניסן: צוואות אחרונות של הרבי הרש"ב (תר"פ/1920)',
      uk: '2 Ніссана: Останні заповіти Ребе Рашаба (5680/1920)',
    },
    subtitle: {
      ru: 'Уход пятого Любавичского Ребе и передача рукописей',
      en: 'Passing of the fifth Lubavitcher Rebbe and transfer of manuscripts',
      he: 'הסתלקות הרבי החמישי מליובאוויטש והעברת כתבי היד',
      uk: 'Відхід п\'ятого Любавицького Ребе та передача рукописів',
    },
    content: {
      ru: `<h3>Последние дни в Ростове-на-Дону</h3>
<p>2 Ниссана 5680 года (1920) в Ростове-на-Дону завершился земной путь пятого Любавичского Ребе — рабби Шалома Дов-Бера Шнеерсона, известного как Ребе Рашаб. Последние годы его жизни прошли в тяжёлых условиях: Гражданская война, разруха и преследования не позволяли вести нормальную жизнь. Тем не менее Ребе Рашаб продолжал руководить хасидским движением, принимать посетителей и обучать учеников.</p>

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-2.png" alt="" style="width: 100%; height: auto;" /></div>



<h3>«Я ухожу на небо — рукописи оставляю тебе»</h3>
<p>Незадолго до ухода Ребе Рашаб обратился к своему единственному сыну, рабби Йосефу-Ицхаку (будущему Шестому Ребе), со словами, ставшими историческими: «Я ухожу на небо, а рукописи я оставляю тебе». Эти рукописи — тысячи страниц хасидских маамаров (учений), писем и заметок — представляли собой духовное наследие не только Ребе Рашаба, но и предыдущих поколений Ребе. Передача рукописей была не просто завещанием имущества — это был акт передачи духовной власти и ответственности за продолжение дела Хабада.</p>

<h3>Последние мгновения</h3>
<p>В последние часы жизни Ребе Рашаба хасидим собрались вокруг его постели, читая Теилим (Псалмы) и молясь о его выздоровлении. Ребе Рашаб произнёс несколько фраз, обращённых к Б-гу, выражая готовность предстать перед Небесным Судом. Его уход стал огромной потерей для всего хасидского мира, но переданное им наследие — учения, рукописи и сеть ешив «Томхей Тмимим» — продолжило жить и развиваться под руководством его сына.</p>`,

      en: `<h3>Final Days in Rostov-on-Don</h3>
<p>On 2 Nissan 5680 (1920), in Rostov-on-Don, the earthly journey of the fifth Lubavitcher Rebbe — Rabbi Shalom DovBer Schneersohn, known as the Rebbe Rashab — came to an end. The final years of his life were spent under harsh conditions: the Civil War, devastation, and persecution made normal life impossible. Nevertheless, the Rebbe Rashab continued to lead the Chassidic movement, receive visitors, and teach students.</p>

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-2.png" alt="" style="width: 100%; height: auto;" /></div>



<h3>"I Go to Heaven — the Manuscripts I Leave to You"</h3>
<p>Shortly before his passing, the Rebbe Rashab turned to his only son, Rabbi Yosef Yitzchak (the future Sixth Rebbe), with words that became historic: "I go to heaven, and the manuscripts I leave to you." These manuscripts — thousands of pages of Chassidic maamarim (discourses), letters, and notes — represented the spiritual legacy not only of the Rebbe Rashab but of previous generations of Rebbes. The transfer of the manuscripts was not merely a bequest of property — it was an act of transmitting spiritual authority and responsibility for continuing the work of Chabad.</p>

<h3>The Final Moments</h3>
<p>In the last hours of the Rebbe Rashab's life, Chassidim gathered around his bedside, reciting Tehillim (Psalms) and praying for his recovery. The Rebbe Rashab uttered several phrases addressed to God, expressing his readiness to stand before the Heavenly Court. His passing was an enormous loss for the entire Chassidic world, but the legacy he transmitted — his teachings, manuscripts, and the network of Tomchei Temimim yeshivas — continued to live and flourish under the leadership of his son.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-9',
    image: '/images/articles/nissan-9.png',
    slug: 'nissan-9-nachalo-puti-stradaniy-rabbi-levi-itshaka',
    hebrewDate: { month: 'Nisan', day: 9 },
    title: {
      ru: '9 Ниссана: Начало пути страданий рабби Леви-Ицхака (5699/1939)',
      en: '9 Nissan: Beginning of Rabbi Levi Yitzchak\'s Path of Suffering (5699/1939)',
      he: 'ט\' ניסן: תחילת דרך הייסורים של הרב לוי יצחק (תרצ"ט/1939)',
      uk: '9 Ніссана: Початок шляху страждань рабі Леві-Іцхака (5699/1939)',
    },
    subtitle: {
      ru: 'Арест отца Седьмого Ребе в Днепропетровске',
      en: 'Arrest of the Seventh Rebbe\'s father in Dnepropetrovsk',
      he: 'מעצר אביו של הרבי השביעי בדנייפרופטרובסק',
      uk: 'Арешт батька Сьомого Ребе у Дніпропетровську',
    },
    content: {
      ru: `<h3>Ночной обыск НКВД</h3>
<p>В ночь на 9 Ниссана 5699 года (1939) агенты НКВД ворвались в дом рабби Леви-Ицхака Шнеерсона — главного раввина Днепропетровска и отца будущего Седьмого Любавичского Ребе. Обыск длился несколько часов: перевернули всю квартиру, конфисковали книги, рукописи и личную переписку. Рабби Леви-Ицхак был арестован по обвинению в «контрреволюционной деятельности» — так советская власть квалифицировала его неустанную работу по сохранению еврейской религиозной жизни.</p>

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-9.png" alt="" style="width: 100%; height: auto;" /></div>



<h3>Несломленный дух</h3>
<p>На допросах рабби Леви-Ицхак проявил невероятную стойкость. Несмотря на давление и угрозы, он отказывался подписывать ложные признания и называть имена тех, кто помогал ему в подпольной религиозной деятельности. Его «преступления» заключались в организации тайных миньянов, обеспечении кошерного шхита (убоя скота), обрезаний и обучении детей Торе — всём том, что составляло основу еврейской жизни на протяжении тысячелетий, но было запрещено большевистским режимом.</p>

<h3>Преданность ребецин Ханы</h3>
<p>Жена рабби Леви-Ицхака, ребецин Хана, проявила исключительную самоотверженность. Каждый день она приносила мужу в тюрьму кошерную еду, преодолевая огромные трудности. Позднее, когда его приговорили к ссылке в Казахстан, она последовала за ним, делая всё возможное, чтобы облегчить его страдания. Рабби Леви-Ицхак и в ссылке продолжал изучать и преподавать Тору, изготавливая чернила из трав для записи своих хидушим (новых толкований). Его жертвенность ради сохранения Торы стала одним из самых вдохновляющих примеров в истории Хабада.</p>`,

      en: `<h3>The NKVD Night Raid</h3>
<p>On the night of 9 Nissan 5699 (1939), NKVD agents burst into the home of Rabbi Levi Yitzchak Schneerson — the chief rabbi of Dnepropetrovsk and father of the future Seventh Lubavitcher Rebbe. The search lasted several hours: the entire apartment was turned upside down, and books, manuscripts, and personal correspondence were confiscated. Rabbi Levi Yitzchak was arrested on charges of "counter-revolutionary activity" — the Soviet regime's classification for his tireless work in preserving Jewish religious life.</p>

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-9.png" alt="" style="width: 100%; height: auto;" /></div>



<h3>An Unbroken Spirit</h3>
<p>During interrogations, Rabbi Levi Yitzchak displayed incredible fortitude. Despite pressure and threats, he refused to sign false confessions or name those who assisted him in underground religious activity. His "crimes" consisted of organizing secret minyanim, ensuring kosher shechita (ritual slaughter), circumcisions, and teaching children Torah — everything that had formed the foundation of Jewish life for millennia but was forbidden by the Bolshevik regime.</p>

<h3>The Devotion of Rebbetzin Chana</h3>
<p>Rabbi Levi Yitzchak's wife, Rebbetzin Chana, showed extraordinary self-sacrifice. Every day she brought kosher food to her husband in prison, overcoming tremendous difficulties. Later, when he was sentenced to exile in Kazakhstan, she followed him, doing everything possible to ease his suffering. Even in exile, Rabbi Levi Yitzchak continued to study and teach Torah, making ink from herbs to record his chiddushim (original Torah insights). His sacrifice for the preservation of Torah became one of the most inspiring examples in the history of Chabad.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-11',
    image: '/images/articles/nissan-11.png',
    slug: 'nissan-11-rozhdeniye-sedmogo-rebe',
    hebrewDate: { month: 'Nisan', day: 11 },
    title: {
      ru: '11 Ниссана: Рождение Седьмого Ребе (5662/1902)',
      en: '11 Nissan: Birth of the Seventh Rebbe (5662/1902)',
      he: 'י"א ניסן: הולדת הרבי השביעי (תרס"ב/1902)',
      uk: '11 Ніссана: Народження Сьомого Ребе (5662/1902)',
    },
    subtitle: {
      ru: 'Рождение рабби Менахем-Мендла Шнеерсона в Николаеве',
      en: 'Birth of Rabbi Menachem Mendel Schneerson in Nikolaev',
      he: 'הולדת הרבי מנחם מענדל שניאורסון בניקולייב',
      uk: 'Народження рабі Менахем-Мендла Шнеерсона у Миколаєві',
    },
    content: {
      ru: `<h3>Рождение в Николаеве</h3>
<p>11 Ниссана 5662 года (1902) в городе Николаеве (ныне Украина) родился мальчик, которому суждено было стать Седьмым Любавичским Ребе — рабби Менахем-Мендл Шнеерсон. Он был назван в честь третьего Любавичского Ребе — Цемах Цедека (рабби Менахем-Мендла Шнеерсона-старшего), что символически связало его с великой традицией хабадского руководства.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.5rem 0;"><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11-1.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11-2.png" alt="" style="width: 100%; height: auto;" /></div></div>



<h3>Реакция Ребе Рашаба</h3>
<p>Когда весть о рождении достигла пятого Любавичского Ребе — Ребе Рашаба, он отправил не менее шести поздравительных телеграмм семье. Такое необычное внимание со стороны Ребе указывало на то, что он провидел особую судьбу новорождённого. По свидетельствам хасидов, Ребе Рашаб выразил большую радость, что в семье Шнеерсонов родился ребёнок, носящий имя Цемах Цедека.</p>

<h3>Мать и раннее воспитание</h3>
<p>Мать будущего Ребе, ребецин Хана, с первых дней жизни сына проявляла особую скрупулёзность в соблюдении заповедей. Она совершала нетилат ядаим (омовение рук) каждый раз, прежде чем кормить младенца, превращая даже самые обыденные действия в служение Б-гу. С самого раннего возраста мальчик проявлял феноменальные способности: острый ум, необычайную память и глубокий интерес к изучению Торы. Уже в детстве он поражал окружающих вопросами, которые свидетельствовали о глубине мышления, далеко превосходящей его возраст.</p>`,

      en: `<h3>Birth in Nikolaev</h3>
<p>On 11 Nissan 5662 (1902), in the city of Nikolaev (present-day Ukraine), a boy was born who was destined to become the Seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson. He was named after the third Lubavitcher Rebbe — the Tzemach Tzedek (Rabbi Menachem Mendel Schneersohn the elder), symbolically linking him to the great tradition of Chabad leadership.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.5rem 0;"><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11-1.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-11-2.png" alt="" style="width: 100%; height: auto;" /></div></div>



<h3>The Rebbe Rashab's Reaction</h3>
<p>When news of the birth reached the fifth Lubavitcher Rebbe — the Rebbe Rashab — he sent no fewer than six congratulatory telegrams to the family. Such unusual attention from the Rebbe indicated that he foresaw a special destiny for the newborn. According to Chassidic accounts, the Rebbe Rashab expressed great joy that a child bearing the name of the Tzemach Tzedek had been born into the Schneerson family.</p>

<h3>Mother and Early Upbringing</h3>
<p>The future Rebbe's mother, Rebbetzin Chana, from the very first days of her son's life showed particular meticulousness in observing the commandments. She performed netilat yadayim (ritual handwashing) each time before feeding the infant, transforming even the most mundane actions into service of God. From a very early age, the boy displayed phenomenal abilities: a sharp mind, extraordinary memory, and a deep interest in Torah study. Already in childhood, he amazed those around him with questions that demonstrated a depth of thinking far surpassing his age.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-13',
    image: '/images/articles/nissan-13.png',
    slug: 'nissan-13-zavershenie-puti-tsemakh-tsedeka',
    hebrewDate: { month: 'Nisan', day: 13 },
    title: {
      ru: '13 Ниссана: Завершение земного пути Цемах Цедека (5626/1866)',
      en: '13 Nissan: Passing of the Tzemach Tzedek (5626/1866)',
      he: 'י"ג ניסן: הסתלקות הצמח צדק (תרכ"ו/1866)',
      uk: '13 Ніссана: Завершення земного шляху Цемах Цедека (5626/1866)',
    },
    subtitle: {
      ru: 'Уход третьего Любавичского Ребе',
      en: 'Passing of the third Lubavitcher Rebbe',
      he: 'הסתלקות הרבי השלישי מליובאוויטש',
      uk: 'Відхід третього Любавицького Ребе',
    },
    content: {
      ru: `<h3>Последние годы Цемах Цедека</h3>
<p>Третий Любавичский Ребе, рабби Менахем-Мендл Шнеерсон, известный как Цемах Цедек, провёл последние годы своей жизни в состоянии крайней физической слабости. Несмотря на это, он продолжал руководить хасидским движением и принимать множество посетителей, которые приезжали к нему со всех концов Российской империи за советом и благословением. Однако с течением времени его здоровье настолько ухудшилось, что он был вынужден принимать людей через секретарей, передавая ответы в письменной форме.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.5rem 0;"><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13-2.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13-3.png" alt="" style="width: 100%; height: auto;" /></div></div>



<h3>«Свет души более не вмещается в теле»</h3>
<p>Незадолго до ухода Цемах Цедек произнёс слова, глубоко поразившие окружающих: «Свет души более не может удерживаться в теле». Эти слова отражали хасидское понимание смерти не как конца, а как момента, когда душа, переполненная Б-жественным светом, выходит за пределы физической оболочки. Для хасидов это было свидетельством невероятного духовного уровня их Ребе — его душа буквально «переросла» тело.</p>

<h3>Скорбь и преемственность</h3>
<p>13 Ниссана 5626 года (1866) Цемах Цедек покинул этот мир. Скорбь на его похоронах была огромной — тысячи хасидов оплакивали потерю своего наставника и лидера. Однако даже в горе сохранялась уверенность в продолжении традиции. Руководство хабадским движением перешло к его младшему сыну, рабби Шмуэлю, известному как Ребе Магараш. Цемах Цедек оставил после себя колоссальное наследие: галахические постановления, хасидские учения и пример непоколебимой стойкости в защите еврейских интересов перед российскими властями.</p>`,

      en: `<h3>The Final Years of the Tzemach Tzedek</h3>
<p>The third Lubavitcher Rebbe, Rabbi Menachem Mendel Schneersohn, known as the Tzemach Tzedek, spent the final years of his life in a state of extreme physical weakness. Despite this, he continued to lead the Chassidic movement and receive the many visitors who came from all corners of the Russian Empire seeking his counsel and blessing. However, as time passed, his health deteriorated to such a degree that he was forced to receive people through secretaries, conveying his responses in written form.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 1.5rem 0;"><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13-2.png" alt="" style="width: 100%; height: auto;" /></div><div style="border-radius: 12px; overflow: hidden;"><img src="/images/articles/nissan-13-3.png" alt="" style="width: 100%; height: auto;" /></div></div>



<h3>"The Light of the Soul Can No Longer Be Held in the Body"</h3>
<p>Shortly before his passing, the Tzemach Tzedek uttered words that deeply struck those around him: "The light of the soul can no longer be held in the body." These words reflected the Chassidic understanding of death not as an end, but as a moment when the soul, overflowing with Divine light, transcends its physical vessel. For the Chassidim, this was testimony to the incredible spiritual level of their Rebbe — his soul had literally "outgrown" the body.</p>

<h3>Grief and Succession</h3>
<p>On 13 Nissan 5626 (1866), the Tzemach Tzedek departed this world. The grief at his funeral was immense — thousands of Chassidim mourned the loss of their mentor and leader. Yet even in sorrow, confidence in the continuation of the tradition remained. Leadership of the Chabad movement passed to his youngest son, Rabbi Shmuel, known as the Rebbe Maharash. The Tzemach Tzedek left behind a colossal legacy: halachic rulings, Chassidic teachings, and an example of unwavering fortitude in defending Jewish interests before the Russian authorities.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-18',
    slug: 'nissan-18-vstrecha-dvukh-epokh-alter-rebe-i-baal-shem-tov',
    hebrewDate: { month: 'Nisan', day: 18 },
    title: {
      ru: '18 Ниссана: Встреча двух эпох — Альтер Ребе и Баал-Шем-Тов (5508/1748)',
      en: '18 Nissan: Meeting of Two Eras — the Alter Rebbe and the Baal Shem Tov (5508/1748)',
      he: 'י"ח ניסן: מפגש שתי תקופות — האדמו"ר הזקן והבעל שם טוב (תק"ח/1748)',
      uk: '18 Ніссана: Зустріч двох епох — Альтер Ребе і Баал-Шем-Тов (5508/1748)',
    },
    subtitle: {
      ru: 'Упшерниш будущего основателя Хабада у Баал-Шем-Това',
      en: 'Upshernish of the future founder of Chabad by the Baal Shem Tov',
      he: 'אופשערניש של מייסד חב"ד העתידי אצל הבעל שם טוב',
      uk: 'Упшерніш майбутнього засновника Хабаду у Баал-Шем-Това',
    },
    content: {
      ru: `<h3>Трёхлетний мальчик у Баал-Шем-Това</h3>
<p>18 Ниссана 5508 года (1748) произошло событие, которое незримо связало два величайших движения в еврейской истории — общий хасидизм и Хабад. Трёхлетнего мальчика по имени Шнеур-Залман — будущего Альтер Ребе, основателя движения Хабад — привезли к рабби Исраэлю Баал-Шем-Тову на церемонию упшерниш (первой стрижки волос).</p>

<h3>Благословение основателя хасидизма</h3>
<p>Баал-Шем-Тов лично постриг мальчика, оставив ему пейсы (боковые пряди волос), как предписывает еврейская традиция. Затем он произнёс особое благословение над ребёнком. По преданию, Баал-Шем-Тов увидел в этом мальчике великую душу, которой суждено было совершить переворот в еврейской мысли, соединив глубочайшую каббалистическую мудрость с интеллектуальной ясностью.</p>

<h3>Тайна, скрытая на десятилетия</h3>
<p>Примечательно, что Баал-Шем-Тов дал особое указание родителям мальчика: не рассказывать ему, кто именно совершил его упшерниш. Эта тайна хранилась долгие годы. Смысл этого указания, согласно хасидской традиции, заключался в том, что мальчик должен был прийти к своему духовному пути самостоятельно, без давления осознания того, что сам основатель хасидизма возложил на него особую миссию. Впоследствии рабби Шнеур-Залман действительно создал уникальную систему Хабада — «Хохма, Бина, Даат» (Мудрость, Понимание, Знание) — объединившую пламенную хасидскую духовность с глубочайшим интеллектуальным постижением Б-жественного.</p>`,

      en: `<h3>A Three-Year-Old Boy at the Baal Shem Tov's</h3>
<p>On 18 Nissan 5508 (1748), an event took place that invisibly connected two of the greatest movements in Jewish history — general Chassidism and Chabad. A three-year-old boy named Schneur Zalman — the future Alter Rebbe, founder of the Chabad movement — was brought to Rabbi Yisrael Baal Shem Tov for the ceremony of upshernish (first haircut).</p>

<h3>The Blessing of the Founder of Chassidism</h3>
<p>The Baal Shem Tov personally cut the boy's hair, leaving him peyos (sidelocks) as prescribed by Jewish tradition. He then pronounced a special blessing over the child. According to tradition, the Baal Shem Tov saw in this boy a great soul destined to revolutionize Jewish thought by uniting the deepest Kabbalistic wisdom with intellectual clarity.</p>

<h3>A Secret Hidden for Decades</h3>
<p>Remarkably, the Baal Shem Tov gave special instructions to the boy's parents: not to tell him who had performed his upshernish. This secret was kept for many years. The meaning of this instruction, according to Chassidic tradition, was that the boy needed to arrive at his spiritual path independently, without the pressure of knowing that the founder of Chassidism himself had placed a special mission upon him. Subsequently, Rabbi Schneur Zalman indeed created the unique Chabad system — "Chochmah, Binah, Da'at" (Wisdom, Understanding, Knowledge) — uniting fervent Chassidic spirituality with the deepest intellectual comprehension of the Divine.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-27',
    slug: 'nissan-27-obyedineniye-cherez-izucheniye-rambama',
    hebrewDate: { month: 'Nisan', day: 27 },
    title: {
      ru: '27 Ниссана: Объединение через изучение Рамбама (5744/1984)',
      en: '27 Nissan: Unity Through Studying Rambam (5744/1984)',
      he: 'כ"ז ניסן: אחדות דרך לימוד הרמב"ם (תשד"מ/1984)',
      uk: '27 Ніссана: Об\'єднання через вивчення Рамбама (5744/1984)',
    },
    subtitle: {
      ru: 'Старт ежедневного изучения Мишне Тора',
      en: 'Launch of the daily Mishneh Torah study',
      he: 'השקת לימוד יומי של משנה תורה',
      uk: 'Старт щоденного вивчення Мішне Тора',
    },
    content: {
      ru: `<h3>Революционная инициатива Ребе</h3>
<p>27 Ниссана 5744 года (1984) Седьмой Любавичский Ребе, рабби Менахем-Мендл Шнеерсон, объявил о начале беспрецедентной программы — ежедневного изучения «Мишне Тора» Рамбама (рабби Моше бен Маймона). Эта инициатива была призвана объединить весь еврейский народ через совместное изучение одного и того же текста, создавая невидимую, но мощную духовную связь между евреями по всему миру.</p>

<h3>Три уровня для каждого</h3>
<p>Гениальность программы заключалась в её доступности. Ребе предложил три варианта участия: изучение трёх глав «Мишне Тора» в день (полный цикл завершается примерно за год), изучение одной главы в день (цикл длится около трёх лет) и изучение соответствующего раздела «Сефер а-Мицвот» (Книги заповедей) Рамбама. Таким образом, каждый еврей — от величайшего учёного до начинающего — мог присоединиться к программе на своём уровне.</p>

<h3>Духовное единство и приближение Машиаха</h3>
<p>Ребе объяснил глубинный смысл этой инициативы: «Мишне Тора» Рамбама — это единственный труд, охватывающий все 613 заповедей Торы в систематическом порядке. Когда тысячи евреев изучают одну и ту же тему в один и тот же день, создаётся мощное духовное единство, которое приближает приход Машиаха. Ребе подчеркнул, что изучение законов, связанных с Храмом и жертвоприношениями, засчитывается перед Б-гом как их фактическое исполнение, поскольку в наше время у нас нет возможности выполнять эти заповеди на практике. Программа изучения Рамбама продолжает действовать по сей день, объединяя сотни тысяч евреев по всему миру.</p>`,

      en: `<h3>The Rebbe's Revolutionary Initiative</h3>
<p>On 27 Nissan 5744 (1984), the Seventh Lubavitcher Rebbe, Rabbi Menachem Mendel Schneerson, announced the launch of an unprecedented program — the daily study of Rambam's (Rabbi Moshe ben Maimon's) Mishneh Torah. This initiative was designed to unite the entire Jewish people through the shared study of the same text, creating an invisible yet powerful spiritual bond among Jews throughout the world.</p>

<h3>Three Levels for Everyone</h3>
<p>The brilliance of the program lay in its accessibility. The Rebbe proposed three options for participation: studying three chapters of Mishneh Torah per day (completing the full cycle in approximately one year), studying one chapter per day (a cycle lasting about three years), and studying the corresponding section of Rambam's Sefer HaMitzvot (Book of Commandments). In this way, every Jew — from the greatest scholar to the beginner — could join the program at their own level.</p>

<h3>Spiritual Unity and Hastening the Coming of Mashiach</h3>
<p>The Rebbe explained the deeper meaning of this initiative: Rambam's Mishneh Torah is the only work that encompasses all 613 commandments of the Torah in systematic order. When thousands of Jews study the same topic on the same day, a powerful spiritual unity is created that hastens the coming of Mashiach. The Rebbe emphasized that studying the laws related to the Temple and sacrifices is considered by God as their actual fulfillment, since in our time we have no ability to perform these commandments in practice. The Rambam study program continues to this day, uniting hundreds of thousands of Jews around the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },

  // ========================
  // CALENDAR — IYAR
  // ========================
  {
    id: 'iyar-2',
    slug: 'iyar-2-rozhdenie-rebe-maarasha',
    hebrewDate: { month: 'Iyar', day: 2 },
    monthIntro: {
      ru: 'Ияр: Месяц «С самого начала — напролом». В календаре Хабада месяц Ияр неразрывно связан с девизом «Лехатхила арибер», который стал жизненным кредо четвёртого Ребе, рабби Шмуэля.',
      en: 'Iyar: The Month of "From the Start — Break Through." In the Chabad calendar, the month of Iyar is inseparably linked to the motto "Lechatchila Ariber," the life creed of the fourth Rebbe, Rabbi Shmuel.',
    },
    title: {
      ru: '2 Ияра: Рождение Ребе Маараша (5594/1834)',
      en: '2 Iyar: Birth of the Rebbe Maharash (5594/1834)',
      he: 'ב\' אייר: הולדת הרבי המהר"ש (תקצ"ד/1834)',
      uk: '2 Іяра: Народження Ребе Маараша (5594/1834)',
    },
    subtitle: {
      ru: 'Рождение четвёртого Любавичского Ребе и его уникальный подход',
      en: 'Birth of the fourth Lubavitcher Rebbe and his unique approach',
      he: 'הולדת הרבי הרביעי מליובאוויטש והגישה הייחודית שלו',
      uk: 'Народження четвертого Любавицького Ребе та його унікальний підхід',
    },
    content: {
      ru: `<h3>Рождение в Любавичах</h3>
<p>2 Ияра 5594 года (1834) в местечке Любавичи родился рабби Шмуэль Шнеерсон — четвёртый Любавичский Ребе, известный как Ребе Махараш (аббревиатура слов «Морейну а-Рав Шмуэль»). Его отец, Цемах-Цедек (третий Ребе), с великой радостью встретил рождение младшего сына, усмотрев в этом событии особое провидение свыше.</p>

<h3>Радость Цемах-Цедека</h3>
<p>На брит-миле (обрезании) младенца Цемах-Цедек произнёс глубокие хасидские маамарим (учения), что было необычно даже для столь значительного события. Помимо этого, Цемах-Цедек приобрёл земельный участок в честь рождения сына — символический жест, означавший «укоренение» нового поколения в этом мире. Уже с раннего детства рабби Шмуэль проявлял незаурядные способности и глубину понимания.</p>

<h3>«Лехатхила арибер»</h3>
<p>Ребе Махараш стал известен своим уникальным подходом к жизненным трудностям, выраженным в девизе «Лехатхила арибер» — «С самого начала — напролом». В то время как большинство людей сначала пытаются обойти препятствие снизу, и лишь если не получается — перепрыгивают через него, Ребе Махараш учил: с самого начала нужно идти напролом, перепрыгивая через препятствия, а не пытаясь найти обходной путь. Этот подход стал символом всего месяца Ияр в хасидской традиции и продолжает вдохновлять тысячи людей по всему миру на решительные действия перед лицом трудностей.</p>`,

      en: `<h3>Birth in Lubavitch</h3>
<p>On 2 Iyar 5594 (1834), in the town of Lubavitch, Rabbi Shmuel Schneersohn was born — the fourth Lubavitcher Rebbe, known as the Rebbe Maharash (an acronym for "Moreinu HaRav Shmuel"). His father, the Tzemach Tzedek (the third Rebbe), welcomed the birth of his youngest son with great joy, seeing in this event a special act of divine providence.</p>

<h3>The Joy of the Tzemach Tzedek</h3>
<p>At the bris (circumcision) of the infant, the Tzemach Tzedek delivered profound Chassidic maamarim (discourses), which was unusual even for such a significant occasion. In addition, the Tzemach Tzedek purchased a plot of land in honor of his son's birth — a symbolic gesture signifying the "rooting" of a new generation in this world. From early childhood, Rabbi Shmuel displayed extraordinary abilities and depth of understanding.</p>

<h3>"Lechatchila Ariber"</h3>
<p>The Rebbe Maharash became renowned for his unique approach to life's challenges, expressed in the motto "Lechatchila Ariber" — "From the start — break through." While most people first try to go around an obstacle from below, and only if that fails do they try to jump over it, the Rebbe Maharash taught: from the very start one should break through, leaping over obstacles rather than trying to find a way around them. This approach became the symbol of the entire month of Iyar in Chassidic tradition and continues to inspire thousands of people around the world to take decisive action in the face of difficulties.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'iyar-13',
    slug: 'iyar-13-pamyat-o-rabbi-menakhem-mendle-iz-frantsii',
    hebrewDate: { month: 'Iyar', day: 13 },
    title: {
      ru: '13 Ияра: Память о рабби Менахеме-Мендле из Франции (5701/1941)',
      en: '13 Iyar: Memory of Rabbi Menachem Mendel from France (5701/1941)',
      he: 'י"ג אייר: זכרון הרב מנחם מענדל מצרפת (תש"א/1941)',
      uk: '13 Іяра: Пам\'ять про рабі Менахема-Мендла з Франції (5701/1941)',
    },
    subtitle: {
      ru: 'Трагическая судьба брата пятого Ребе во Франции',
      en: 'The tragic fate of the fifth Rebbe\'s brother in France',
      he: 'גורלו הטרגי של אחי הרבי החמישי בצרפת',
      uk: 'Трагічна доля брата п\'ятого Ребе у Франції',
    },
    content: {
      ru: `<h3>Жизнь в Париже и на Корсике</h3>
<p>Рабби Менахем-Мендл Шнеерсон был братом пятого Любавичского Ребе, Ребе Рашаба. В отличие от старшего брата, избравшего путь руководства хасидским движением, рабби Менахем-Мендл жил в Париже, где вёл скромный образ жизни, посвящённый изучению Торы и молитве. С началом Второй мировой войны и оккупацией Франции он был вынужден бежать на Корсику, в город Аяччо, где оказался в крайне тяжёлых условиях.</p>

<h3>Тревога шестого Ребе</h3>
<p>Шестой Любавичский Ребе, рабби Йосеф-Ицхак Шнеерсон, находившийся к тому времени в Америке, с большой тревогой следил за судьбой рабби Менахема-Мендла. Несмотря на все усилия по спасению, связь с Корсикой была практически невозможна, и рабби Менахем-Мендл скончался в изгнании в 5701 году (1941), вдали от семьи и общины.</p>

<h3>Чудо нетленного тела</h3>
<p>Спустя пятнадцать лет после захоронения на Корсике, когда останки рабби Менахема-Мендла были перенесены для перезахоронения на Масличную гору в Иерусалиме, произошло поразительное событие: его тело было найдено нетленным — полностью сохранившимся, несмотря на прошедшие годы. Это было воспринято как знак особой святости. В память о рабби Менахеме-Мендле было издано специальное издание Тании — основного труда хасидизма Хабад, — что стало данью уважения его духовному наследию.</p>`,

      en: `<h3>Life in Paris and Corsica</h3>
<p>Rabbi Menachem Mendel Schneersohn was the brother of the fifth Lubavitcher Rebbe, the Rebbe Rashab. Unlike his elder brother, who chose the path of leading the Chassidic movement, Rabbi Menachem Mendel lived in Paris, where he led a modest life devoted to Torah study and prayer. With the onset of World War II and the occupation of France, he was forced to flee to Corsica, to the city of Ajaccio, where he found himself in extremely difficult conditions.</p>

<h3>The Sixth Rebbe's Concern</h3>
<p>The Sixth Lubavitcher Rebbe, Rabbi Yosef Yitzchak Schneersohn, who was by that time in America, followed the fate of Rabbi Menachem Mendel with great anxiety. Despite all rescue efforts, communication with Corsica was virtually impossible, and Rabbi Menachem Mendel passed away in exile in 5701 (1941), far from family and community.</p>

<h3>The Miracle of the Intact Body</h3>
<p>Fifteen years after the burial in Corsica, when the remains of Rabbi Menachem Mendel were transferred for reburial on the Mount of Olives in Jerusalem, an astonishing event occurred: his body was found completely intact — fully preserved despite the passage of years. This was perceived as a sign of extraordinary holiness. In memory of Rabbi Menachem Mendel, a special edition of the Tanya — the foundational work of Chabad Chassidism — was published, serving as a tribute to his spiritual legacy.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'iyar-14',
    slug: 'iyar-14-pesakh-sheni-den-vtorogo-shansa',
    hebrewDate: { month: 'Iyar', day: 14 },
    title: {
      ru: '14 Ияра: Песах Шени — День «Второго шанса»',
      en: '14 Iyar: Pesach Sheni — The Day of the "Second Chance"',
      he: 'י"ד אייר: פסח שני — יום ה"הזדמנות השנייה"',
      uk: '14 Іяра: Песах Шені — День «Другого шансу»',
    },
    subtitle: {
      ru: 'Второй Песах и учение о том, что никогда не поздно',
      en: 'The Second Pesach and the teaching that it is never too late',
      he: 'פסח שני והלימוד שלעולם לא מאוחר',
      uk: 'Другий Песах і вчення про те, що ніколи не пізно',
    },
    content: {
      ru: `<h3>Заповедь второго шанса</h3>
<p>14 Ияра — день Песах Шени (Второй Песах). В эпоху Храма те, кто не смог принести пасхальную жертву 14 Ниссана — по причине ритуальной нечистоты, дальней дороги или иных обстоятельств — получали уникальную возможность сделать это ровно месяц спустя, 14 Ияра. Это единственная заповедь в Торе, для которой существует «вторая попытка».</p>

<h3>Учение Ребе: «Никогда не поздно»</h3>
<p>Седьмой Любавичский Ребе, рабби Менахем-Мендл Шнеерсон, неоднократно подчёркивал глубочайший духовный смысл Песах Шени. Ребе учил: «Песах Шени означает, что никогда не поздно. Всё можно исправить». Этот принцип выходит далеко за рамки конкретной заповеди о пасхальной жертве. Он говорит о том, что в жизни каждого человека всегда есть возможность начать заново — независимо от того, какие ошибки были совершены в прошлом.</p>

<h3>Духовный смысл для каждого</h3>
<p>Даже тот, кто был «нечист» — то есть далёк от святости и духовности, — и даже тот, кто находился «в далёком пути» — то есть сознательно удалился от Б-га и Его заповедей, — получает возможность вернуться и исполнить свою миссию. Б-г не отвергает никого и всегда оставляет дверь открытой. В наше время принято есть мацу в день Песах Шени как напоминание об этом вечном послании надежды.</p>`,

      en: `<h3>The Commandment of the Second Chance</h3>
<p>The 14th of Iyar is the day of Pesach Sheni (the Second Pesach). In the era of the Temple, those who were unable to bring the Paschal offering on 14 Nissan — due to ritual impurity, a distant journey, or other circumstances — were given a unique opportunity to do so exactly one month later, on 14 Iyar. This is the only commandment in the Torah for which a "second attempt" exists.</p>

<h3>The Rebbe's Teaching: "It Is Never Too Late"</h3>
<p>The Seventh Lubavitcher Rebbe, Rabbi Menachem Mendel Schneerson, repeatedly emphasized the profound spiritual meaning of Pesach Sheni. The Rebbe taught: "Pesach Sheni means that it is never too late. Everything can be fixed." This principle extends far beyond the specific commandment of the Paschal offering. It speaks to the fact that in every person's life, there is always an opportunity to start anew — regardless of what mistakes were made in the past.</p>

<h3>Spiritual Meaning for Everyone</h3>
<p>Even one who was "impure" — that is, distant from holiness and spirituality — and even one who was "on a distant journey" — that is, who had consciously distanced themselves from God and His commandments — receives the opportunity to return and fulfill their mission. God rejects no one and always leaves the door open. In our times, it is customary to eat matzah on Pesach Sheni as a reminder of this eternal message of hope.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'iyar-23',
    slug: 'iyar-23-muzhestvo-rebe-rayatsa-pered-vlastyami',
    hebrewDate: { month: 'Iyar', day: 23 },
    title: {
      ru: '23 Ияра: Мужество Ребе Раяца перед лицом властей (5667/1907)',
      en: '23 Iyar: The Courage of the Rebbe Rayatz Before the Authorities (5667/1907)',
      he: 'כ"ג אייר: אומץ לבו של הרבי הריי"צ מול השלטונות (תרס"ז/1907)',
      uk: '23 Іяра: Мужність Ребе Раяца перед обличчям влади (5667/1907)',
    },
    subtitle: {
      ru: '«Я не боюсь никого, кроме Всевышнего»',
      en: '"I fear no one but the Almighty"',
      he: '"אני לא מפחד מאף אחד חוץ מהקב"ה"',
      uk: '«Я не боюся нікого, крім Всевишнього»',
    },
    content: {
      ru: `<h3>Визит полиции в 1907 году</h3>
<p>23 Ияра 5667 года (1907) в дом Ребе Рашаба явились представители полиции для допроса его сына, молодого рабби Йосефа-Ицхака Шнеерсона (будущего шестого Любавичского Ребе, известного как Ребе Раяц). Полицию интересовала деятельность ешивы «Томхей Тмимим», основанной Ребе Рашабом, — власти подозревали, что учебное заведение ведёт «подрывную» деятельность.</p>

<h3>«Я не боюсь никого, кроме Всевышнего»</h3>
<p>Когда следователь начал допрос и попытался запугать молодого рабби Йосефа-Ицхака угрозами, тот ответил с поразительным спокойствием и достоинством: «Я не боюсь никого, кроме Всевышнего». Эти слова произвели глубокое впечатление на следователя. Обвинения были основаны на ложных доносах, и в ходе допроса стало очевидно, что ешива занимается исключительно изучением Торы и воспитанием молодёжи в духе еврейской традиции.</p>

<h3>«Ребе»</h3>
<p>Мужество и достоинство рабби Йосефа-Ицхака настолько поразили следователя, что тот начал обращаться к нему не по имени и не по званию, а уважительно называть его «Ребе». Этот эпизод стал одним из ранних проявлений несгибаемого характера будущего шестого Ребе, который впоследствии бросит вызов куда более грозным противникам — советским властям, рискуя жизнью ради сохранения еврейского образования и религиозной жизни.</p>`,

      en: `<h3>The Police Visit of 1907</h3>
<p>On 23 Iyar 5667 (1907), police officers arrived at the home of the Rebbe Rashab to interrogate his son, the young Rabbi Yosef Yitzchak Schneersohn (the future sixth Lubavitcher Rebbe, known as the Rebbe Rayatz). The police were interested in the activities of the Tomchei Temimim yeshiva, founded by the Rebbe Rashab — the authorities suspected that the institution was engaged in "subversive" activities.</p>

<h3>"I Fear No One but the Almighty"</h3>
<p>When the investigator began the interrogation and attempted to intimidate the young Rabbi Yosef Yitzchak with threats, the latter responded with remarkable calm and dignity: "I fear no one but the Almighty." These words made a profound impression on the investigator. The accusations were based on false reports, and during the interrogation it became clear that the yeshiva was engaged exclusively in Torah study and the education of youth in the spirit of Jewish tradition.</p>

<h3>"Rebbe"</h3>
<p>The courage and dignity of Rabbi Yosef Yitzchak so impressed the investigator that he began addressing him not by name or rank, but respectfully calling him "Rebbe." This episode became one of the early manifestations of the unyielding character of the future sixth Rebbe, who would later challenge far more formidable adversaries — the Soviet authorities — risking his life for the preservation of Jewish education and religious life.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },

  // ========================
  // CALENDAR — SIVAN
  // ========================
  {
    id: 'sivan-6',
    slug: 'sivan-6-ukhod-baal-shem-tova',
    hebrewDate: { month: 'Sivan', day: 6 },
    monthIntro: {
      ru: 'Сиван: Месяц дарования Торы, неразрывно связанный с Баал-Шем-Товом и прибытием Ребе в Америку. Шавуот — день, когда еврейский народ получил Тору у горы Синай — является центральным событием этого месяца, но в хасидской традиции Сиван хранит и другие важнейшие даты.',
      en: 'Sivan: The month of the Giving of the Torah, inseparably connected to the Baal Shem Tov and the Rebbe\'s arrival in America. Shavuot — the day when the Jewish people received the Torah at Mount Sinai — is the central event of this month, but in Chassidic tradition Sivan holds other momentous dates as well.',
    },
    title: {
      ru: '6 Сивана: Уход Баал-Шем-Това (5520/1760)',
      en: '6 Sivan: Passing of the Baal Shem Tov (5520/1760)',
      he: 'ו\' סיוון: הסתלקות הבעל שם טוב (תק"כ/1760)',
      uk: '6 Сивана: Відхід Баал-Шем-Това (5520/1760)',
    },
    subtitle: {
      ru: 'Шавуот — также йорцайт основателя хасидизма',
      en: 'Shavuot is also the yahrzeit of the founder of Chassidism',
      he: 'שבועות — גם יום היארצייט של מייסד החסידות',
      uk: 'Шавуот — також йорцайт засновника хасидизму',
    },
    content: {
      ru: `<h3>Уход в день дарования Торы</h3>
<p>6 Сивана 5520 года (1760), в первый день праздника Шавуот, завершился земной путь рабби Исраэля бен Элиэзера — Баал-Шем-Това (сокращённо Бешт), основателя хасидского движения. Символично, что он покинул этот мир именно в день, когда Тора была дарована еврейскому народу на горе Синай: Баал-Шем-Тов посвятил всю свою жизнь тому, чтобы раскрыть внутренний, сокровенный свет Торы и сделать его доступным для каждого еврея.</p>

<h3>Обещание на смертном одре</h3>
<p>Перед уходом Баал-Шем-Тов оставил своим ученикам обещание, ставшее источником утешения и надежды для всех последующих поколений хасидов: он заверил их, что будет продолжать ходатайствовать за еврейский народ перед Небесным Престолом. Это обещание о заступничестве стало одним из краеугольных камней хасидской веры — убеждённости в том, что связь между праведником и его учениками не прерывается со смертью.</p>

<h3>Уход — не конец, а переход</h3>
<p>В хасидской традиции уход праведника из этого мира рассматривается не как прекращение его влияния, а как переход на новый уровень. Баал-Шем-Тов учил, что душа праведника после ухода из тела продолжает действовать с ещё большей силой, освободившись от ограничений материального мира. День 6 Сивана — это одновременно день скорби и день торжества: скорби о физической утрате и торжества духовного наследия, которое продолжает озарять мир светом хасидизма.</p>`,

      en: `<h3>Passing on the Day of the Giving of the Torah</h3>
<p>On 6 Sivan 5520 (1760), on the first day of the festival of Shavuot, the earthly journey of Rabbi Yisrael ben Eliezer — the Baal Shem Tov (abbreviated as the Besht), founder of the Chassidic movement — came to an end. It is symbolic that he departed this world on the very day the Torah was given to the Jewish people at Mount Sinai: the Baal Shem Tov dedicated his entire life to revealing the inner, hidden light of the Torah and making it accessible to every Jew.</p>

<h3>The Deathbed Promise</h3>
<p>Before his passing, the Baal Shem Tov left his students a promise that became a source of comfort and hope for all subsequent generations of Chassidim: he assured them that he would continue to intercede for the Jewish people before the Heavenly Throne. This promise of intercession became one of the cornerstones of Chassidic faith — the conviction that the bond between a righteous person and their students is not severed by death.</p>

<h3>Departure — Not an End, but a Transition</h3>
<p>In Chassidic tradition, the passing of a righteous person from this world is viewed not as the cessation of their influence, but as a transition to a new level. The Baal Shem Tov taught that the soul of the righteous, after departing the body, continues to act with even greater power, freed from the limitations of the material world. The 6th of Sivan is simultaneously a day of mourning and a day of celebration: mourning for the physical loss and celebration of the spiritual legacy that continues to illuminate the world with the light of Chassidism.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'sivan-11',
    slug: 'sivan-11-svadba-rebe-maarasha-i-rebetsn-rivki',
    hebrewDate: { month: 'Sivan', day: 11 },
    title: {
      ru: '11 Сивана: Свадьба Ребе Маараша и ребецн Ривки (5609/1849)',
      en: '11 Sivan: Wedding of the Rebbe Maharash and Rebbetzin Rivka (5609/1849)',
      he: 'י"א סיוון: חתונת הרבי המהר"ש והרבנית רבקה (תר"ט/1849)',
      uk: '11 Сивана: Весілля Ребе Маараша та ребецн Рівки (5609/1849)',
    },
    subtitle: {
      ru: 'Союз, подаривший хасидизму бесценные воспоминания',
      en: 'A union that gave Chassidism priceless memories',
      he: 'זיווג שהעניק לחסידות זיכרונות יקרי ערך',
      uk: 'Союз, що подарував хасидизму безцінні спогади',
    },
    content: {
      ru: `<h3>Свадьба в семье Ребе</h3>
<p>11 Сивана 5609 года (1849) состоялась свадьба рабби Шмуэля Шнеерсона — будущего четвёртого Любавичского Ребе (Ребе Махараша) — и его двоюродной сестры, ребецн Ривки. Этот брак, заключённый в самом сердце хасидской «королевской» семьи, стал одним из важнейших событий в истории Хабада.</p>

<h3>Ребецн Ривка — хранительница историй</h3>
<p>Ребецн Ривка обладала уникальным даром: она тщательно записывала и сохраняла рассказы, предания и воспоминания о предыдущих поколениях Ребе. Благодаря её записям до нас дошли бесценные свидетельства о жизни и учении Алтер Ребе (первого Любавичского Ребе), Мителер Ребе и Цемах-Цедека. Без этих записей многие детали хасидской истории были бы безвозвратно утрачены.</p>

<h3>Влияние на сына — Ребе Рашаба</h3>
<p>Ребецн Ривка оказала огромное влияние на своего сына, рабби Шалома Дов-Бера (Ребе Рашаба), пятого Любавичского Ребе. Именно она привила ему глубокую любовь к хасидским преданиям, научила ценить каждое слово, услышанное от предыдущих Ребе, и передала ему тот огонь веры и преданности, который он впоследствии зажёг в сердцах тысяч своих учеников. Союз Ребе Махараша и ребецн Ривки стал не просто семейным событием — он обеспечил непрерывность хасидской традиции на многие поколения вперёд.</p>`,

      en: `<h3>A Wedding in the Rebbe's Family</h3>
<p>On 11 Sivan 5609 (1849), the wedding took place of Rabbi Shmuel Schneersohn — the future fourth Lubavitcher Rebbe (the Rebbe Maharash) — and his cousin, Rebbetzin Rivka. This marriage, formed at the very heart of the Chassidic "royal" family, became one of the most important events in the history of Chabad.</p>

<h3>Rebbetzin Rivka — Keeper of Stories</h3>
<p>Rebbetzin Rivka possessed a unique gift: she carefully recorded and preserved stories, traditions, and memoirs about previous generations of Rebbes. Thanks to her records, priceless testimonies about the life and teachings of the Alter Rebbe (the first Lubavitcher Rebbe), the Mitteler Rebbe, and the Tzemach Tzedek have reached us. Without these records, many details of Chassidic history would have been irretrievably lost.</p>

<h3>Influence on Her Son — the Rebbe Rashab</h3>
<p>Rebbetzin Rivka had an enormous influence on her son, Rabbi Shalom DovBer (the Rebbe Rashab), the fifth Lubavitcher Rebbe. It was she who instilled in him a deep love for Chassidic traditions, taught him to cherish every word heard from previous Rebbes, and transmitted to him that fire of faith and devotion which he subsequently kindled in the hearts of thousands of his students. The union of the Rebbe Maharash and Rebbetzin Rivka was not merely a family event — it ensured the continuity of Chassidic tradition for many generations to come.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'sivan-15',
    slug: 'sivan-15-rozhdenie-rashaga',
    hebrewDate: { month: 'Sivan', day: 15 },
    title: {
      ru: '15 Сивана: Рождение Рашага (5658/1897)',
      en: '15 Sivan: Birth of the Rashag (5658/1897)',
      he: 'ט"ו סיוון: הולדת הרש"ג (תרנ"ח/1897)',
      uk: '15 Сивана: Народження Рашага (5658/1897)',
    },
    subtitle: {
      ru: 'Рождение верного помощника двух Ребе',
      en: 'Birth of the faithful assistant to two Rebbes',
      he: 'הולדת עוזרם הנאמן של שני רביים',
      uk: 'Народження вірного помічника двох Ребе',
    },
    content: {
      ru: `<h3>Рождение рабби Шмарьяу Гурари</h3>
<p>15 Сивана 5658 года (1897) родился рабби Шмарьяу Гурари, известный по аббревиатуре Рашаг. Ему было суждено сыграть выдающуюся роль в истории Хабада, став зятем шестого Любавичского Ребе и верным соратником как шестого, так и седьмого Ребе.</p>

<h3>Руководитель ешив «Томхей Тмимим»</h3>
<p>Рашаг возглавил сеть ешив «Томхей Тмимим» — центральную образовательную систему Хабада, основанную Ребе Рашабом в 1897 году. Под его руководством ешивы продолжали выпускать поколения учёных и посланников, несмотря на все трудности — сначала в Советском Союзе, затем в Польше и, наконец, в Америке. Рашаг посвятил свою жизнь обеспечению того, чтобы молодые хасиды получали глубокое и всестороннее образование.</p>

<h3>Верный помощник двух Ребе</h3>
<p>На протяжении десятилетий Рашаг был правой рукой шестого Ребе, рабби Йосефа-Ицхака, помогая ему в руководстве движением в тяжелейших условиях — от советских преследований до эмиграции в Америку. После ухода шестого Ребе в 1950 году Рашаг с такой же преданностью поддерживал седьмого Ребе, рабби Менахема-Мендла Шнеерсона, в его грандиозной миссии по распространению еврейского образования и хасидского учения по всему миру.</p>`,

      en: `<h3>Birth of Rabbi Shmaryahu Gurary</h3>
<p>On 15 Sivan 5658 (1897), Rabbi Shmaryahu Gurary was born, known by the acronym Rashag. He was destined to play an outstanding role in the history of Chabad, becoming the son-in-law of the sixth Lubavitcher Rebbe and a faithful associate of both the sixth and seventh Rebbes.</p>

<h3>Head of the Tomchei Temimim Yeshivas</h3>
<p>The Rashag headed the network of Tomchei Temimim yeshivas — Chabad's central educational system, founded by the Rebbe Rashab in 1897. Under his leadership, the yeshivas continued to produce generations of scholars and emissaries despite all hardships — first in the Soviet Union, then in Poland, and finally in America. The Rashag dedicated his life to ensuring that young Chassidim received a deep and comprehensive education.</p>

<h3>Faithful Assistant to Two Rebbes</h3>
<p>For decades, the Rashag served as the right hand of the sixth Rebbe, Rabbi Yosef Yitzchak, assisting him in leading the movement under the most difficult conditions — from Soviet persecution to emigration to America. After the passing of the sixth Rebbe in 1950, the Rashag supported the seventh Rebbe, Rabbi Menachem Mendel Schneerson, with the same devotion in his grand mission of spreading Jewish education and Chassidic teachings throughout the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'sivan-28',
    slug: 'sivan-28-pribytie-rebe-v-ameriku',
    hebrewDate: { month: 'Sivan', day: 28 },
    title: {
      ru: '28 Сивана: Чудесное спасение и прибытие Ребе в Америку (5701/1941)',
      en: '28 Sivan: Miraculous Rescue and the Rebbe\'s Arrival in America (5701/1941)',
      he: 'כ"ח סיוון: ההצלה המופלאה והגעת הרבי לאמריקה (תש"א/1941)',
      uk: '28 Сивана: Чудесне порятунок і прибуття Ребе до Америки (5701/1941)',
    },
    subtitle: {
      ru: 'Прибытие будущего седьмого Ребе в Нью-Йорк',
      en: 'Arrival of the future seventh Rebbe in New York',
      he: 'הגעתו של הרבי השביעי לעתיד לניו יורק',
      uk: 'Прибуття майбутнього сьомого Ребе до Нью-Йорка',
    },
    content: {
      ru: `<h3>Спасение из охваченной войной Европы</h3>
<p>28 Сивана 5701 года (1941) будущий седьмой Любавичский Ребе, рабби Менахем-Мендл Шнеерсон, и его супруга, ребецн Хая-Мушка, прибыли в Нью-Йорк, чудом спасшись из охваченной Второй мировой войной Европы. Они пересекли Атлантический океан на корабле «Серпа Пинто», который подвергался реальной угрозе со стороны немецких подводных лодок. Каждый день плавания был наполнен опасностью, но Б-жественное провидение хранило корабль и его пассажиров.</p>

<h3>Встреча в Нью-Йорке</h3>
<p>В порту Нью-Йорка Ребе и ребецн встретила делегация хасидов, посланная шестым Ребе, рабби Йосефом-Ицхаком Шнеерсоном. Среди встречавших были рабби Исраэль Якобсон, рабби Шмуэль Симпсон и рабби Шмуэль Казарновский. Шестой Ребе, придававший прибытию зятя исключительное значение, передал хасидам указание: «Уважайте его, как меня самого».</p>

<h3>Три организации — начало новой эпохи</h3>
<p>Вскоре после прибытия рабби Менахема-Мендла шестой Ребе возложил на него руководство тремя ключевыми организациями Хабада: «Меркос Линьоней Хинух» (Центр по вопросам еврейского образования), «Махане Исраэль» (организация по укреплению еврейской жизни) и издательство «Кеос». Эти три организации стали фундаментом грандиозной деятельности будущего Ребе, который впоследствии превратил Хабад в крупнейшее еврейское движение в мире. Дата 28 Сивана отмечается хасидами как день благодарности Б-гу за чудесное спасение Ребе и начало новой главы в истории Хабада.</p>`,

      en: `<h3>Rescue from War-Torn Europe</h3>
<p>On 28 Sivan 5701 (1941), the future seventh Lubavitcher Rebbe, Rabbi Menachem Mendel Schneerson, and his wife, Rebbetzin Chaya Mushka, arrived in New York, having miraculously escaped from Europe engulfed in World War II. They crossed the Atlantic Ocean aboard the ship Serpa Pinto, which faced a real threat from German submarines. Every day of the voyage was filled with danger, yet Divine Providence protected the ship and its passengers.</p>

<h3>Reception in New York</h3>
<p>At the port of New York, the Rebbe and Rebbetzin were met by a delegation of Chassidim sent by the sixth Rebbe, Rabbi Yosef Yitzchak Schneersohn. Among those who came to greet them were Rabbi Israel Jacobson, Rabbi Shmuel Simpson, and Rabbi Shmuel Kazarnovsky. The sixth Rebbe, who attached exceptional importance to his son-in-law's arrival, conveyed an instruction to the Chassidim: "Respect him as you would me."</p>

<h3>Three Organizations — the Beginning of a New Era</h3>
<p>Shortly after the arrival of Rabbi Menachem Mendel, the sixth Rebbe entrusted him with the leadership of three key Chabad organizations: Merkos L'Inyonei Chinuch (the Central Organization for Jewish Education), Machne Israel (an organization for strengthening Jewish life), and Kehot Publication Society. These three organizations became the foundation of the future Rebbe's grand enterprise, who would subsequently transform Chabad into the largest Jewish movement in the world. The date of 28 Sivan is celebrated by Chassidim as a day of gratitude to God for the miraculous rescue of the Rebbe and the beginning of a new chapter in the history of Chabad.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },

  // ========================
  // CALENDAR — TAMMUZ
  // ========================
  {
    id: 'tammuz-3',
    slug: 'tammuz-3-povorotnyy-moment-istorii',
    hebrewDate: { month: 'Tammuz', day: 3 },
    monthIntro: {
      ru: 'Тамуз: Месяц испытаний и освобождения. В хасидском календаре Тамуз — месяц, неразрывно связанный с шестым и седьмым Любавичскими Ребе: арест, заключение и чудесное освобождение Ребе Раяца в 1927 году и уход седьмого Ребе в 1994 году переплетаются в этом месяце, превращая его во время глубокого духовного осмысления.',
      en: 'Tammuz: The Month of Trials and Liberation. In the Chassidic calendar, Tammuz is a month inseparably connected to the sixth and seventh Lubavitcher Rebbes: the arrest, imprisonment, and miraculous liberation of the Rebbe Rayatz in 1927 and the passing of the seventh Rebbe in 1994 are intertwined in this month, making it a time of deep spiritual reflection.',
    },
    title: {
      ru: '3 Тамуза: Поворотный момент истории',
      en: '3 Tammuz: A Turning Point of History',
      he: 'ג\' תמוז: נקודת מפנה בהיסטוריה',
      uk: '3 Тамуза: Поворотний момент історії',
    },
    subtitle: {
      ru: 'Два события, определившие судьбу Хабада',
      en: 'Two events that determined the fate of Chabad',
      he: 'שני אירועים שקבעו את גורל חב"ד',
      uk: 'Дві події, що визначили долю Хабаду',
    },
    content: {
      ru: `<h3>1927 год: Приговор смягчён</h3>
<p>3 Тамуза 5687 года (1927) стал днём, когда решилась судьба шестого Любавичского Ребе, рабби Йосефа-Ицхака Шнеерсона. Арестованный советскими властями за «контрреволюционную деятельность» — на самом деле за организацию подпольного еврейского образования и поддержание религиозной жизни в СССР — Ребе был приговорён к смертной казни. Однако благодаря международному давлению и явному вмешательству Б-жественного провидения смертный приговор был заменён на три года ссылки в город Кострому. Этот день стал первым шагом к полному освобождению Ребе.</p>

<h3>1994 год: Уход седьмого Ребе</h3>
<p>3 Тамуза 5754 года (1994) — день, когда завершился земной путь седьмого Любавичского Ребе, рабби Менахема-Мендла Шнеерсона. Его уход потряс еврейский мир и далеко за его пределами. За более чем сорок лет руководства Ребе превратил Хабад из относительно небольшого хасидского движения в глобальную сеть, охватывающую тысячи общин в более чем ста странах мира.</p>

<h3>Наследие продолжается</h3>
<p>Совпадение этих двух дат — смягчение приговора в 1927 году и уход в 1994 году — на одну и ту же дату еврейского календаря не может быть случайностью. Оба события стали поворотными моментами, после которых миссия Хабада не прекратилась, а усилилась. Наследие седьмого Ребе живёт и действует: его посланники работают по всему миру, его учения изучаются миллионами, а его призыв к подготовке мира к приходу Машиаха звучит сегодня сильнее, чем когда-либо.</p>`,

      en: `<h3>1927: The Sentence Commuted</h3>
<p>The 3rd of Tammuz 5687 (1927) was the day that decided the fate of the sixth Lubavitcher Rebbe, Rabbi Yosef Yitzchak Schneersohn. Arrested by the Soviet authorities for "counter-revolutionary activity" — in reality for organizing underground Jewish education and maintaining religious life in the USSR — the Rebbe had been sentenced to death. However, thanks to international pressure and the clear intervention of Divine Providence, the death sentence was commuted to three years of exile in the city of Kostroma. This day became the first step toward the Rebbe's complete liberation.</p>

<h3>1994: Passing of the Seventh Rebbe</h3>
<p>The 3rd of Tammuz 5754 (1994) was the day the earthly journey of the seventh Lubavitcher Rebbe, Rabbi Menachem Mendel Schneerson, came to an end. His passing shook the Jewish world and far beyond. Over more than forty years of leadership, the Rebbe transformed Chabad from a relatively small Chassidic movement into a global network encompassing thousands of communities in more than one hundred countries.</p>

<h3>The Legacy Continues</h3>
<p>The coincidence of these two dates — the commutation of the sentence in 1927 and the passing in 1994 — falling on the same date of the Jewish calendar cannot be accidental. Both events became turning points after which Chabad's mission did not cease but intensified. The legacy of the seventh Rebbe lives and acts: his emissaries work throughout the world, his teachings are studied by millions, and his call to prepare the world for the coming of Mashiach sounds stronger today than ever before.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tammuz-11',
    slug: 'tammuz-11-pervyy-shag-k-vzrosloy-zhizni',
    hebrewDate: { month: 'Tammuz', day: 11 },
    title: {
      ru: '11 Тамуза: Первый шаг к взрослой жизни',
      en: '11 Tammuz: The First Step to Adulthood',
      he: 'י"א תמוז: הצעד הראשון לבגרות',
      uk: '11 Тамуза: Перший крок до дорослого життя',
    },
    subtitle: {
      ru: 'Одиннадцатилетний будущий Ребе начинает надевать тфилин',
      en: 'The eleven-year-old future Rebbe begins putting on tefillin',
      he: 'הרבי לעתיד בן האחד עשרה מתחיל להניח תפילין',
      uk: 'Одинадцятирічний майбутній Ребе починає надягати тфілін',
    },
    content: {
      ru: `<h3>Необычное указание отца</h3>
<p>11 Тамуза 5651 года (1891) одиннадцатилетний Йосеф-Ицхак Шнеерсон — будущий шестой Любавичский Ребе — получил от своего отца, Ребе Рашаба, необычное указание: начать надевать тфилин. Согласно общепринятому обычаю, мальчики начинают надевать тфилин за несколько месяцев до бар-мицвы (13 лет), чтобы подготовиться к исполнению этой заповеди. Указание начать в 11 лет было исключительным и свидетельствовало о том, что Ребе Рашаб видел в своём сыне особую духовную зрелость.</p>

<h3>Подготовка будущего лидера</h3>
<p>Этот эпизод был не просто ранним началом религиозной практики — это был осознанный шаг в подготовке будущего руководителя хасидского движения. Ребе Рашаб, единственный сын которого был предназначен стать его преемником, стремился воспитать его с максимальной духовной строгостью и глубиной. Тфилин — это не просто ритуальный предмет, но мощный инструмент связи между человеком и Б-гом, и раннее начало их надевания символизировало ускоренное духовное взросление.</p>

<h3>Значение для будущих поколений</h3>
<p>Впоследствии, став шестым Ребе, рабби Йосеф-Ицхак неоднократно вспоминал этот день как один из поворотных моментов своего детства. Этот эпизод стал примером того, как великие руководители еврейского народа формируются не случайно, а через целенаправленное воспитание, в котором каждый шаг — от раннего надевания тфилин до глубокого изучения хасидского учения — служит подготовкой к будущей великой миссии.</p>`,

      en: `<h3>An Unusual Instruction from His Father</h3>
<p>On 11 Tammuz 5651 (1891), eleven-year-old Yosef Yitzchak Schneersohn — the future sixth Lubavitcher Rebbe — received an unusual instruction from his father, the Rebbe Rashab: to begin putting on tefillin. According to common custom, boys begin putting on tefillin a few months before their bar mitzvah (age 13) in preparation for fulfilling this commandment. The instruction to begin at age 11 was exceptional and testified to the fact that the Rebbe Rashab saw in his son a special spiritual maturity.</p>

<h3>Preparing a Future Leader</h3>
<p>This episode was not merely an early start to religious practice — it was a deliberate step in preparing the future leader of the Chassidic movement. The Rebbe Rashab, whose only son was destined to become his successor, sought to raise him with maximum spiritual rigor and depth. Tefillin are not merely a ritual object but a powerful instrument of connection between a person and God, and the early commencement of wearing them symbolized accelerated spiritual maturation.</p>

<h3>Significance for Future Generations</h3>
<p>Subsequently, as the sixth Rebbe, Rabbi Yosef Yitzchak repeatedly recalled this day as one of the turning points of his childhood. This episode became an example of how great leaders of the Jewish people are formed not by chance but through purposeful education, in which every step — from the early wearing of tefillin to the deep study of Chassidic teachings — serves as preparation for a future great mission.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tammuz-12',
    slug: 'tammuz-12-13-prazdnik-osvobozhdeniya-i-den-rozhdeniya',
    hebrewDate: { month: 'Tammuz', day: 12 },
    title: {
      ru: '12–13 Тамуза: Праздник Освобождения и День Рождения',
      en: '12–13 Tammuz: The Festival of Liberation and Birthday',
      he: 'י"ב–י"ג תמוז: חג הגאולה ויום ההולדת',
      uk: '12–13 Тамуза: Свято Визволення та День Народження',
    },
    subtitle: {
      ru: 'День рождения, освобождение и победа всего еврейского народа',
      en: 'A birthday, liberation, and victory for the entire Jewish people',
      he: 'יום הולדת, שחרור וניצחון לכל עם ישראל',
      uk: 'День народження, визволення та перемога всього єврейського народу',
    },
    content: {
      ru: `<h3>Рождение и освобождение в один день</h3>
<p>12 Тамуза 5640 года (1880) родился рабби Йосеф-Ицхак Шнеерсон — шестой Любавичский Ребе. Ровно 47 лет спустя, 12 Тамуза 5687 года (1927), в свой день рождения, он был освобождён из ссылки в Костроме, куда был отправлен советскими властями за организацию подпольного еврейского образования. Совпадение этих дат стало символом торжества веры над тиранией.</p>

<h3>Регистрация в ГПУ и окончательное освобождение</h3>
<p>Процесс освобождения занял два дня. 12 Тамуза Ребе был объявлен свободным, но ему предстояло явиться в отделение ГПУ (тайной полиции) для регистрации. Официальные документы об освобождении были выданы лишь 13 Тамуза. Именно поэтому праздник Освобождения («Хаг а-Геула») отмечается два дня — 12 и 13 Тамуза.</p>

<h3>Не личное, а всеобщее освобождение</h3>
<p>Сам Ребе Раяц неоднократно подчёркивал, что его освобождение не было личным делом. «Не меня одного освободил Б-г 12 Тамуза, — писал он, — но и всех, кто дорожит Торой и исполнением заповедей, и даже всех, кто лишь носит имя еврея». Освобождение Ребе стало победой не одного человека, а всего еврейского народа — победой духа над материальным насилием, веры над безбожием. Этот праздник отмечается хасидами по всему миру проведением фарбренгенов (хасидских собраний), усиленным изучением Торы и добрыми делами.</p>`,

      en: `<h3>Birth and Liberation on the Same Day</h3>
<p>On 12 Tammuz 5640 (1880), Rabbi Yosef Yitzchak Schneersohn — the sixth Lubavitcher Rebbe — was born. Exactly 47 years later, on 12 Tammuz 5687 (1927), on his birthday, he was liberated from exile in Kostroma, where he had been sent by the Soviet authorities for organizing underground Jewish education. The coincidence of these dates became a symbol of the triumph of faith over tyranny.</p>

<h3>Registration at the GPU and Final Liberation</h3>
<p>The liberation process took two days. On 12 Tammuz, the Rebbe was declared free, but he still had to appear at the GPU (secret police) office for registration. The official documents of release were issued only on 13 Tammuz. This is why the Festival of Liberation ("Chag HaGeulah") is celebrated over two days — 12 and 13 Tammuz.</p>

<h3>Not Personal, but Universal Liberation</h3>
<p>The Rebbe Rayatz himself repeatedly emphasized that his liberation was not a personal matter. "It was not me alone whom God liberated on 12 Tammuz," he wrote, "but also all who cherish the Torah and the fulfillment of its commandments, and even all who merely bear the name of Jew." The Rebbe's liberation was not the victory of one person but of the entire Jewish people — the victory of spirit over physical violence, of faith over godlessness. This holiday is celebrated by Chassidim throughout the world through farbrengens (Chassidic gatherings), intensified Torah study, and acts of goodness and kindness.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tammuz-15',
    slug: 'tammuz-15-svet-or-a-khaim',
    hebrewDate: { month: 'Tammuz', day: 15 },
    title: {
      ru: '15 Тамуза: Свет «Ор а-Хаим»',
      en: '15 Tammuz: The Light of the "Or HaChaim"',
      he: 'ט"ו תמוז: אורו של ה"אור החיים"',
      uk: '15 Тамуза: Світло «Ор а-Хаїм»',
    },
    subtitle: {
      ru: 'Уход великого мудреца рабби Хаима бен Аттара',
      en: 'Passing of the great sage Rabbi Chaim ben Attar',
      he: 'הסתלקות המקובל הגדול רבי חיים בן עטר',
      uk: 'Відхід великого мудреця рабі Хаїма бен Аттара',
    },
    content: {
      ru: `<h3>Великий комментатор Торы</h3>
<p>15 Тамуза 5503 года (1743) завершился земной путь рабби Хаима бен Аттара — одного из величайших мудрецов и каббалистов своего времени, автора знаменитого комментария к Торе «Ор а-Хаим а-Кадош» («Свет Святой Жизни»). Его труд стал одним из самых изучаемых комментариев к Торе и по сей день занимает почётное место на полках еврейских учёных по всему миру.</p>

<h3>Глубокое уважение Баал-Шем-Това</h3>
<p>Баал-Шем-Тов, основатель хасидского движения, питал необычайно глубокое уважение к рабби Хаиму бен Аттару. Известно, что Бешт стремился встретиться с ним лично, полагая, что их совместная духовная работа могла бы приблизить приход Машиаха. Однако этой встрече не суждено было состояться. Баал-Шем-Тов считал «Ор а-Хаим» не просто комментарием, а произведением, пронизанным святым духом (руах а-кодеш).</p>

<h3>Ощутил уход в Европе</h3>
<p>Согласно хасидскому преданию, Баал-Шем-Тов, находившийся в Восточной Европе, почувствовал момент ухода рабби Хаима бен Аттара, жившего в Иерусалиме, — несмотря на огромное расстояние между ними. Во время трапезы в честь Шаббата Бешт внезапно сказал своим ученикам: «Погас западный светильник» — имея в виду, что великий свет Торы, горевший на Святой Земле, угас. Это свидетельство духовной связи между двумя великими мудрецами стало одним из самых известных рассказов в хасидской традиции.</p>`,

      en: `<h3>The Great Torah Commentator</h3>
<p>On 15 Tammuz 5503 (1743), the earthly journey of Rabbi Chaim ben Attar came to an end — one of the greatest sages and kabbalists of his time, author of the famous Torah commentary "Or HaChaim HaKadosh" ("The Light of the Holy Life"). His work became one of the most widely studied Torah commentaries and to this day holds a place of honor on the bookshelves of Jewish scholars throughout the world.</p>

<h3>The Deep Respect of the Baal Shem Tov</h3>
<p>The Baal Shem Tov, founder of the Chassidic movement, held an extraordinarily deep respect for Rabbi Chaim ben Attar. It is known that the Besht sought to meet him personally, believing that their joint spiritual work could hasten the coming of Mashiach. However, this meeting was not destined to take place. The Baal Shem Tov considered the Or HaChaim not merely a commentary but a work imbued with the holy spirit (ruach hakodesh).</p>

<h3>Sensed the Passing from Europe</h3>
<p>According to Chassidic tradition, the Baal Shem Tov, who was in Eastern Europe, sensed the moment of passing of Rabbi Chaim ben Attar, who lived in Jerusalem — despite the enormous distance between them. During the Shabbat meal, the Besht suddenly told his students: "The western lamp has been extinguished" — meaning that the great light of Torah that had burned in the Holy Land had gone out. This testimony of the spiritual connection between two great sages became one of the most famous stories in Chassidic tradition.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tammuz-17',
    slug: 'tammuz-17-stroitelstvo-v-nizhnem-mire',
    hebrewDate: { month: 'Tammuz', day: 17 },
    title: {
      ru: '17 Тамуза: Строительство в «нижнем мире»',
      en: '17 Tammuz: Building in the "Lower World"',
      he: 'י"ז תמוז: בנייה ב"עולם התחתון"',
      uk: '17 Тамуза: Будівництво у «нижньому світі»',
    },
    subtitle: {
      ru: 'Закладка расширения 770 в день поста',
      en: 'Laying the cornerstone for the 770 expansion on a fast day',
      he: 'הנחת אבן פינה להרחבת 770 ביום צום',
      uk: 'Закладення розширення 770 у день посту',
    },
    content: {
      ru: `<h3>Пост 17 Тамуза</h3>
<p>17 Тамуза — один из четырёх постов, связанных с разрушением Иерусалима и Храма. В этот день были пробиты стены Иерусалима, что привело к падению города и разрушению Второго Храма. Это день скорби, размышлений и молитвы о восстановлении. Однако в 5718 году (1958) седьмой Любавичский Ребе решил наполнить этот день новым смыслом.</p>

<h3>Закладка камня расширения здания 770</h3>
<p>Именно 17 Тамуза 5718 года (1958) Ребе инициировал закладку краеугольного камня для расширения здания по адресу 770 Истерн Парквей в Бруклине — всемирного центра Хабада. Выбор даты не был случайным: Ребе учил, что на разрушение нужно отвечать строительством. Если враги разрушили стены Иерусалима, то ответ еврейского народа — возводить новые стены святости в каждом уголке мира.</p>

<h3>Урок для каждого поколения</h3>
<p>Этот поступок Ребе стал мощным посланием: пост и траур — это не пассивная скорбь, а призыв к действию. Вместо того чтобы лишь оплакивать разрушение, необходимо активно строить — строить синагоги, школы, общины, семьи. Каждый акт строительства в «нижнем мире» (материальном мире) приближает восстановление Третьего Храма и приход Машиаха. Расширение 770 стало символом этого подхода и вдохновило тысячи хасидов по всему миру на строительство новых центров Торы и хасидизма.</p>`,

      en: `<h3>The Fast of 17 Tammuz</h3>
<p>The 17th of Tammuz is one of four fasts connected to the destruction of Jerusalem and the Temple. On this day, the walls of Jerusalem were breached, leading to the fall of the city and the destruction of the Second Temple. It is a day of mourning, reflection, and prayer for restoration. However, in the year 5718 (1958), the seventh Lubavitcher Rebbe decided to fill this day with new meaning.</p>

<h3>Laying the Cornerstone for the Expansion of 770</h3>
<p>It was precisely on 17 Tammuz 5718 (1958) that the Rebbe initiated the laying of the cornerstone for the expansion of the building at 770 Eastern Parkway in Brooklyn — the world headquarters of Chabad. The choice of date was not accidental: the Rebbe taught that destruction must be answered with building. If enemies destroyed the walls of Jerusalem, then the response of the Jewish people is to erect new walls of holiness in every corner of the world.</p>

<h3>A Lesson for Every Generation</h3>
<p>This act of the Rebbe became a powerful message: fasting and mourning are not passive grief but a call to action. Instead of merely lamenting destruction, one must actively build — build synagogues, schools, communities, families. Every act of building in the "lower world" (the material world) brings closer the rebuilding of the Third Temple and the coming of Mashiach. The expansion of 770 became a symbol of this approach and inspired thousands of Chassidim around the world to build new centers of Torah and Chassidism.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tammuz-27',
    slug: 'tammuz-27-pamyat-o-rabbi-iegude-leybe',
    hebrewDate: { month: 'Tammuz', day: 27 },
    title: {
      ru: '27 Тамуза: Память о рабби Иегуде-Лейбе',
      en: '27 Tammuz: Memory of Rabbi Yehuda Leib',
      he: 'כ"ז תמוז: זכרון הרב יהודה לייב',
      uk: '27 Тамуза: Пам\'ять про рабі Єгуду-Лейба',
    },
    subtitle: {
      ru: 'Скромность и глубина знаний сына Мителер Ребе',
      en: 'Modesty and depth of knowledge of the Mitteler Rebbe\'s son',
      he: 'צניעות ועומק ידע של בנו של האדמו"ר האמצעי',
      uk: 'Скромність і глибина знань сина Мітелер Ребе',
    },
    content: {
      ru: `<h3>Сын Мителер Ребе</h3>
<p>27 Тамуза 5653 года (1893) завершился земной путь рабби Иегуды-Лейба Шнеерсона, сына второго Любавичского Ребе — Мителер Ребе (рабби Дов-Бера Шнеури). Рабби Иегуда-Лейб принадлежал к «королевской» семье Хабада и с детства был погружён в глубочайшие тайны хасидского учения. Его отец, Мителер Ребе, был известен своими пространными и глубочайшими маамарами, и рабби Иегуда-Лейб унаследовал эту страсть к глубине познания.</p>

<h3>Пример скромности</h3>
<p>Несмотря на своё выдающееся происхождение и огромную эрудицию, рабби Иегуда-Лейб был известен прежде всего своей необыкновенной скромностью. Он не стремился к публичности и не искал почестей, предпочитая тихую жизнь, посвящённую изучению Торы, молитве и служению Б-гу. Его скромность стала примером для последующих поколений хасидов, напоминанием о том, что истинное величие заключается не во внешнем блеске, а во внутренней глубине и чистоте намерений.</p>

<h3>Пример непрерывности</h3>
<p>Жизнь рабби Иегуды-Лейба является ярким примером непрерывности хасидской традиции. Каждое поколение семьи Шнеерсон вносило свой уникальный вклад в развитие хасидского учения — не только те, кто становились Ребе и руководили движением, но и другие члены семьи, которые своей учёностью, праведностью и скромностью укрепляли фундамент Хабада. Память о рабби Иегуде-Лейбе напоминает нам о том, что в хасидском движении важен вклад каждого, а не только тех, кто стоит на вершине руководства.</p>`,

      en: `<h3>Son of the Mitteler Rebbe</h3>
<p>On 27 Tammuz 5653 (1893), the earthly journey of Rabbi Yehuda Leib Schneersohn came to an end — the son of the second Lubavitcher Rebbe, the Mitteler Rebbe (Rabbi DovBer Schneuri). Rabbi Yehuda Leib belonged to the "royal" family of Chabad and from childhood was immersed in the deepest secrets of Chassidic teaching. His father, the Mitteler Rebbe, was known for his extensive and profoundly deep maamarim, and Rabbi Yehuda Leib inherited this passion for depth of knowledge.</p>

<h3>An Example of Modesty</h3>
<p>Despite his distinguished lineage and enormous erudition, Rabbi Yehuda Leib was known above all for his extraordinary modesty. He did not seek publicity or honors, preferring a quiet life devoted to Torah study, prayer, and the service of God. His modesty became an example for subsequent generations of Chassidim, a reminder that true greatness lies not in outward brilliance but in inner depth and purity of intention.</p>

<h3>An Example of Continuity</h3>
<p>The life of Rabbi Yehuda Leib is a vivid example of the continuity of Chassidic tradition. Each generation of the Schneersohn family made its unique contribution to the development of Chassidic teaching — not only those who became Rebbes and led the movement, but also other family members who, through their scholarship, righteousness, and modesty, strengthened the foundation of Chabad. The memory of Rabbi Yehuda Leib reminds us that in the Chassidic movement, the contribution of each individual matters, not only those who stand at the pinnacle of leadership.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-nissan',
    slug: 'dukhovnyye-uroki-mesyatsa-nissan',
    title: {
      ru: 'Духовные уроки месяца Ниссан: От лидерства к сущности',
      en: 'Spiritual Lessons of the Month of Nissan: From Leadership to Essence',
      he: 'שיעורים רוחניים של חודש ניסן: ממנהיגות למהות',
      uk: 'Духовні уроки місяця Ніссан: Від лідерства до сутності',
    },
    subtitle: {
      ru: 'Когда исторические события превращаются в руководство к действию',
      en: 'When historical events become a guide to action',
      he: 'כשאירועים היסטוריים הופכים למדריך לפעולה',
      uk: 'Коли історичні події перетворюються на керівництво до дії',
    },
    content: {
      ru: `<h3>2 ниссана: Интеграция святого и будничного</h3>
<p>День ухода Ребе Рашаба (1920) несёт урок, заложенный в его имени — Шолом-Довбер. «Шолом» (мир) означает объединение противоположностей через Тору. Второе имя, Довбер, пишется слитно: «Дов» (медведь на иврите, святой язык) и «Бер» (медведь на идише, будничный язык). Это учит трансформировать повседневные дела в святость. Его слова: «Я ухожу на небо, а рукописи оставляю вам». Этот урок остаётся актуальным для каждого поколения: наша задача — наполнить материальный мир духовным содержанием, превратив обыденное в возвышенное через осознанное служение Б-гу.</p>

<h3>11 ниссана: Образование как воспитание морали</h3>
<p>День рождения Седьмого Ребе (1902). Истинное образование — не накопление знаний, а воспитание ответственности перед Творцом. Дети должны осознавать существование «Видящего ока и Слышащего уха». В этот день принято увеличивать изучение Торы. Ребе неоднократно подчёркивал, что цель обучения — формирование нравственного характера, а не просто интеллектуальное развитие. Когда ребёнок понимает, что перед Б-гом ничего нельзя скрыть, это становится основой его моральной стойкости на всю жизнь.</p>

<h3>13 ниссана: Единство Торы</h3>
<p>Урок Цемах Цедека (1866) — синтез скрытой и открытой частей Торы. Хасидизм и галаха — единое целое. «Думай хорошо — и будет хорошо» — битахон способен менять реальность. Третий Любавичский Ребе показал, что нигле (открытая часть Торы) и нистар (тайная часть) не противоречат друг другу, а дополняют, образуя единое целое. Эта идея лежит в основе хасидского подхода: изучение внутреннего измерения Торы углубляет понимание практических законов и наоборот.</p>`,

      en: `<h3>2 Nissan: Integrating the Sacred and the Mundane</h3>
<p>The day of passing of the Rebbe Rashab (1920) carries a lesson embedded in his name — Shalom-DovBer. "Shalom" (peace) signifies the unification of opposites through Torah. The second name, DovBer, is written as one: "Dov" (bear in Hebrew, the holy tongue) and "Ber" (bear in Yiddish, the everyday tongue). This teaches us to transform mundane affairs into holiness. His words: "I am going to heaven, and the manuscripts I leave to you." This lesson remains relevant for every generation: our task is to fill the material world with spiritual content, transforming the ordinary into the sublime through conscious service of God.</p>

<h3>11 Nissan: Education as Moral Development</h3>
<p>The birthday of the Seventh Rebbe (1902). True education is not the accumulation of knowledge but the cultivation of responsibility before the Creator. Children must be aware of the existence of the "Seeing Eye and Hearing Ear." On this day it is customary to increase Torah study. The Rebbe repeatedly emphasized that the goal of education is the formation of moral character, not merely intellectual development. When a child understands that nothing can be hidden from God, this becomes the foundation of their moral resilience for life.</p>

<h3>13 Nissan: The Unity of Torah</h3>
<p>The lesson of the Tzemach Tzedek (1866) — the synthesis of the hidden and revealed parts of Torah. Chassidism and halacha are a unified whole. "Think good and it will be good" — bitachon has the power to change reality. The Third Lubavitcher Rebbe demonstrated that nigleh (the revealed part of Torah) and nistar (the hidden part) do not contradict each other but complement one another, forming a unified whole. This idea lies at the heart of the Chassidic approach: studying the inner dimension of Torah deepens understanding of practical law, and vice versa.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-tammuz',
    slug: 'tamuz-mesyats-chudes-i-absolyutnoy-svobody',
    title: {
      ru: 'Тамуз: Месяц чудес и абсолютной свободы',
      en: 'Tammuz: Month of Miracles and Absolute Freedom',
      he: 'תמוז: חודש הניסים והחירות המוחלטת',
      uk: 'Тамуз: Місяць чудес і абсолютної свободи',
    },
    subtitle: {
      ru: 'Природный порядок отступает перед духовной волей',
      en: 'Natural order retreats before spiritual will',
      he: 'סדר הטבע נסוג מפני הרצון הרוחני',
      uk: 'Природний порядок відступає перед духовною волею',
    },
    content: {
      ru: `<h3>3 тамуза: Солнце веры и поворотная точка</h3>
<p>В этот день произошли два поворотных события, разделённых тысячелетиями, но связанных единой духовной нитью. Первое — Йеошуа бин Нун остановил солнце над Гивоном, чтобы завершить битву. Это показало, что законы природы подчиняются воле Б-га и тех, кто выполняет Его миссию. Второе — в 1927 году смертный приговор Ребе Раяцу был заменён ссылкой. А в 1994 году, 3 тамуза, произошла гисталькус Седьмого Ребе — момент, когда его духовное влияние стало ещё более мощным и доступным. Ребе учил, что физическое отсутствие праведника не означает прекращения его воздействия на мир — напротив, оно усиливается.</p>

<h3>12–13 тамуза: Праздник освобождения</h3>
<p>В 1927 году советское правительство было вынуждено освободить Ребе Раяца, шестого Любавичского Ребе, приговорённого к смерти за распространение Торы и поддержку еврейской жизни в СССР. Его тело находилось в ссылке, но его душа всегда оставалась свободной. Ребе Раяц заявил, что это освобождение касается не только его лично, но каждого, кто дорожит Торой и еврейским образом жизни. Этот праздник напоминает: истинная свобода — это свобода духа, которую не могут отнять никакие тираны и режимы.</p>

<h3>17 тамуза: Ответ на разрушение</h3>
<p>В 1958 году, именно в пост 17 тамуза — день, связанный с разрушением стен Иерусалима — Ребе заложил краеугольный камень нового здания «770». Это было не просто строительство — это был духовный манифест: на разрушение нужно отвечать созиданием. Там, где враги пытаются уничтожить святость, мы возводим новые центры Торы. Каждый построенный дом Торы — это ответ на все попытки разрушения, мощное утверждение вечности еврейского народа и его миссии.</p>`,

      en: `<h3>3 Tammuz: The Sun of Faith and a Turning Point</h3>
<p>On this day, two pivotal events occurred, separated by millennia yet bound by a single spiritual thread. The first — Joshua bin Nun stopped the sun over Giveon to complete the battle. This demonstrated that the laws of nature are subject to the will of God and those who carry out His mission. The second — in 1927, the death sentence of the Rebbe Rayatz was commuted to exile. And in 1994, on 3 Tammuz, the histalkus of the Seventh Rebbe took place — a moment when his spiritual influence became even more powerful and accessible. The Rebbe taught that the physical absence of a righteous person does not mean the cessation of their impact on the world — on the contrary, it intensifies.</p>

<h3>12–13 Tammuz: The Festival of Liberation</h3>
<p>In 1927, the Soviet government was forced to release the Rebbe Rayatz, the Sixth Lubavitcher Rebbe, who had been sentenced to death for spreading Torah and supporting Jewish life in the USSR. His body was in exile, but his soul always remained free. The Rebbe Rayatz declared that this liberation concerned not only him personally but everyone who treasures Torah and the Jewish way of life. This holiday reminds us: true freedom is the freedom of the spirit, which no tyrants or regimes can take away.</p>

<h3>17 Tammuz: The Response to Destruction</h3>
<p>In 1958, on the very fast day of 17 Tammuz — a day associated with the breaching of the walls of Jerusalem — the Rebbe laid the cornerstone of the new building at "770." This was not merely construction — it was a spiritual manifesto: destruction must be answered with building. Where enemies attempt to destroy holiness, we erect new Torah centers. Every house of Torah that is built is a response to all attempts at destruction, a powerful affirmation of the eternity of the Jewish people and their mission.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-av',
    slug: 'menakhem-av-utesheniye-i-podgotovka-k-novomu-godu',
    title: {
      ru: 'Менахем-Ав: Утешение и подготовка к Новому году',
      en: 'Menachem Av: Consolation and Preparation for the New Year',
      he: 'מנחם-אב: נחמה והכנה לשנה החדשה',
      uk: 'Менахем-Ав: Утіха і підготовка до Нового року',
    },
    subtitle: {
      ru: 'Цель разрушения — восстановление в ещё большем величии',
      en: 'The purpose of destruction is restoration in even greater glory',
      he: 'מטרת החורבן היא שיקום בתפארת גדולה עוד יותר',
      uk: 'Мета руйнування — відновлення у ще більшій величі',
    },
    content: {
      ru: `<h3>20 ава: Подвиг ради «далёких» (1944)</h3>
<p>20 ава — годовщина ухода рабби Леви-Ицхака Шнеерсона, отца Седьмого Ребе, скончавшегося в ссылке в Алма-Ате. Рабби Леви-Ицхак был арестован советскими властями за самоотверженную деятельность по обучению еврейских детей Торе и поддержке еврейской жизни в условиях жесточайших гонений. Он изготавливал чернила из трав для написания хасидских комментариев, не прекращая духовную работу даже в изгнании. Ребе установил 20 ава как особый день для укрепления еврейского образования и увеличения цдаки (благотворительности). Подвиг рабби Леви-Ицхака учит нас: ради тех, кто далёк от Торы, стоит рисковать всем.</p>

<h3>40 дней до Рош а-Шана</h3>
<p>20 ава — это ровно сорок дней до Рош а-Шана, дня сотворения Адама. Подобно тому, как формирование зародыша происходит за сорок дней, этот период знаменует начало интенсивной духовной подготовки к Новому году. Сорок дней — срок, за который Моше получил Тору на горе Синай, и за который разведчики обследовали Землю Израиля. В некоторых общинах с 20 ава начинают процедуру «атарат недарим» (освобождение от обетов), готовясь очистить душу перед Б-гом. Каждый из этих сорока дней — возможность исправить соответствующий день уходящего года и заложить основу для благословенного будущего.</p>`,

      en: `<h3>20 Av: Heroism for the Sake of the "Distant" (1944)</h3>
<p>20 Av marks the yahrzeit of Rabbi Levi Yitzchak Schneerson, father of the Seventh Rebbe, who passed away in exile in Alma-Ata. Rabbi Levi Yitzchak was arrested by the Soviet authorities for his selfless work in teaching Jewish children Torah and supporting Jewish life under the harshest persecution. He made ink from herbs to write Chassidic commentaries, never ceasing his spiritual work even in exile. The Rebbe established 20 Av as a special day for strengthening Jewish education and increasing tzedakah (charity). The heroism of Rabbi Levi Yitzchak teaches us: for the sake of those who are far from Torah, it is worth risking everything.</p>

<h3>40 Days Before Rosh Hashanah</h3>
<p>20 Av falls exactly forty days before Rosh Hashanah, the day of Adam's creation. Just as the formation of an embryo takes forty days, this period marks the beginning of intense spiritual preparation for the New Year. Forty days is the time during which Moses received the Torah on Mount Sinai, and during which the spies surveyed the Land of Israel. In some communities, the procedure of hatarat nedarim (annulment of vows) begins from 20 Av, as part of the preparation to purify the soul before God. Each of these forty days is an opportunity to rectify the corresponding day of the departing year and to lay the foundation for a blessed future.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-elul',
    slug: 'elul-vremya-zhizni-i-dvukh-velikikh-svetil',
    title: {
      ru: 'Элул: Время жизни и «Двух Великих Светил»',
      en: 'Elul: Time of Life and the "Two Great Luminaries"',
      he: 'אלול: זמן חיים ו"שני המאורות הגדולים"',
      uk: 'Елул: Час життя і «Двох Великих Світил»',
    },
    subtitle: {
      ru: 'Месяц подведения итогов, наполненный жизненной силой',
      en: 'Month of summing up, filled with vital energy',
      he: 'חודש סיכומים, מלא בחיוניות',
      uk: 'Місяць підбиття підсумків, наповнений життєвою силою',
    },
    content: {
      ru: `<h3>15 элула: Рождение системы «Томхей Тмимим» (1897)</h3>
<p>В этот день Ребе Рашаб основал ешиву «Томхей Тмимим» — «поддерживающих цельных». Это была не просто учебное заведение, а революционная система подготовки «светильников, несущих свет». Студент Хабада остаётся «тамим» — цельным — на всю жизнь, где бы он ни находился. Цель ешивы заключалась в объединении открытой Торы с глубинами хасидизма, создании нового типа еврейского учёного, который владеет и галахой, и внутренним измерением Торы. Ребе Рашаб говорил, что ученики «Томхей Тмимим» — это солдаты Дома Давида, и именно они приведут к окончательному Избавлению.</p>

<h3>18 элула (Хай Элул): Жизнь в Элуле</h3>
<p>18 элула — день рождения двух великих светил еврейского мира: Баал Шем Това (1698) и Алтер Ребе (1745). «Хай» на иврите означает «жизнь», и эта дата буквально вдыхает жизнь в месяц Элул. Баал Шем Тов открыл Б-жественную искру в каждом еврее, показав, что даже самый простой человек бесконечно дорог Б-гу. Алтер Ребе дал человеческому разуму способность постигать Б-жественное, облекая глубочайшие тайны Каббалы в систему интеллектуального понимания — учение Хабад (Хохма, Бина, Даат). С 18 элула начинаются последние двенадцать дней года, каждый из которых соответствует одному месяцу — время подведения итогов и тшувы.</p>

<h3>29 элула: Рождение Цемах Цедека (1789)</h3>
<p>Последний день года — и одновременно день рождения Третьего Любавичского Ребе, Цемах Цедека. Его труды представляют собой грандиозный синтез всех уровней Торы: Писания, Мишны, Талмуда, Каббалы и хасидизма. Имя «Цемах» связано с Машиахом, о котором пророк Зхария говорит: «Вот человек, имя которого Цемах (Росток)». Это напоминает нам, что цель всей духовной работы — приближение окончательного Избавления. Рождение такого великого праведника в последний день года символизирует, что завершение всегда содержит в себе семя нового, ещё более возвышенного начала.</p>`,

      en: `<h3>15 Elul: The Birth of the Tomchei Temimim System (1897)</h3>
<p>On this day, the Rebbe Rashab founded the yeshiva Tomchei Temimim — "supporters of the wholehearted." This was not merely an educational institution but a revolutionary system for training "lamps that carry light." A student of Chabad remains a "tamim" — wholehearted — for life, wherever they may be. The goal of the yeshiva was to unite the revealed Torah with the depths of Chassidism, creating a new type of Jewish scholar who masters both halacha and the inner dimension of Torah. The Rebbe Rashab said that the students of Tomchei Temimim are soldiers of the House of David, and it is they who will bring about the final Redemption.</p>

<h3>18 Elul (Chai Elul): Life in Elul</h3>
<p>18 Elul is the birthday of two great luminaries of the Jewish world: the Baal Shem Tov (1698) and the Alter Rebbe (1745). "Chai" in Hebrew means "life," and this date literally breathes life into the month of Elul. The Baal Shem Tov revealed the Divine spark in every Jew, showing that even the simplest person is infinitely precious to God. The Alter Rebbe gave the human mind the ability to grasp the Divine, clothing the deepest secrets of Kabbalah in a system of intellectual comprehension — the teaching of Chabad (Chochmah, Binah, Daat). From 18 Elul begin the final twelve days of the year, each corresponding to one month — a time for taking stock and teshuvah.</p>

<h3>29 Elul: The Birth of the Tzemach Tzedek (1789)</h3>
<p>The last day of the year — and simultaneously the birthday of the Third Lubavitcher Rebbe, the Tzemach Tzedek. His works represent a monumental synthesis of all levels of Torah: Scripture, Mishnah, Talmud, Kabbalah, and Chassidism. The name "Tzemach" is connected to Mashiach, about whom the prophet Zechariah says: "Behold a man whose name is Tzemach (Branch)." This reminds us that the purpose of all spiritual work is the hastening of the final Redemption. The birth of such a great righteous person on the last day of the year symbolizes that every ending contains within it the seed of a new, even more exalted beginning.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-shpalerka',
    slug: 'stoykost-v-shpalerke-i-velichiye-dukha-rebe-rayatsa',
    title: {
      ru: 'Стойкость в Шпалерке и величие духа Ребе Раяца',
      en: 'Steadfastness in Shpalernaya and the Greatness of Spirit of the Rebbe Rayatz',
      he: 'עמידה בשפלרקה וגדלות הרוח של הרבי הריי"צ',
      uk: 'Стійкість у Шпалерці та велич духу Ребе Раяца',
    },
    subtitle: {
      ru: 'Тело может быть в изгнании, но душа еврея всегда свободна',
      en: 'The body may be in exile, but a Jew\'s soul is always free',
      he: 'הגוף יכול להיות בגלות, אבל נשמת היהודי תמיד חופשייה',
      uk: 'Тіло може бути у вигнанні, але душа єврея завжди вільна',
    },
    content: {
      ru: `<h3>Бесстрашие перед лицом НКВД</h3>
<p>В ночь на 15 сивана 5687 года (1927) агенты ГПУ арестовали Ребе Раяца — шестого Любавичского Ребе. С первых минут ареста он продемонстрировал абсолютное бесстрашие: заставил сотрудников ГПУ вызвать начальство, продолжал управлять судьбой священных рукописей, не позволив конфисковать их без описи. «Шнеерсоны никого не боятся!» — заявил он следователям. Его спокойствие и достоинство поражали даже закалённых чекистов. Он ясно дал понять: тело может быть в заключении, но дух еврея, преданного Б-гу, остаётся свободным.</p>

<h3>Режим в тюрьме Шпалерка</h3>
<p>В печально известной ленинградской тюрьме «Шпалерка» Ребе Раяц объявил трёхдневную голодовку, требуя вернуть ему тфилин — и добился своего. Он отказался от унизительных прогулок во дворе, где заключённых выводили напоказ. Когда охранники попытались сфотографировать его во время молитвы, он решительно пресёк это. Даже в камере он продолжал писать маамарим (хасидские беседы), пока у него не отобрали карандаш. Его освобождение 12–13 тамуза стало победой не одного человека, а каждого еврея, верного Торе. Этот день — напоминание о том, что никакая тирания не способна сломить дух народа, хранящего верность Б-гу.</p>`,

      en: `<h3>Fearlessness in the Face of the NKVD</h3>
<p>On the night of 15 Sivan 5687 (1927), GPU agents arrested the Rebbe Rayatz — the Sixth Lubavitcher Rebbe. From the very first minutes of his arrest, he demonstrated absolute fearlessness: he compelled the GPU officers to call their supervisors, continued managing the fate of sacred manuscripts, and refused to allow their confiscation without a proper inventory. "The Schneersons fear no one!" he declared to his interrogators. His composure and dignity astounded even the hardened secret police. He made it unmistakably clear: the body may be imprisoned, but the spirit of a Jew devoted to G-d remains free.</p>

<h3>The Regime in Shpalernaya Prison</h3>
<p>In the notorious Leningrad prison known as "Shpalernaya," the Rebbe Rayatz declared a three-day hunger strike demanding the return of his tefillin — and succeeded. He refused the humiliating exercise yard walks where prisoners were paraded on display. When guards attempted to photograph him during prayer, he firmly put a stop to it. Even in his cell, he continued writing maamarim (Chassidic discourses) until his pencil was confiscated. His liberation on 12–13 Tammuz was a victory not of one man alone, but of every Jew faithful to Torah. That day serves as a reminder that no tyranny can break the spirit of a people that remains devoted to G-d.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-rebbetzin-chana',
    slug: 'podvig-rebetsn-khany-svet-v-kazakhskoy-ssylke',
    title: {
      ru: 'Подвиг ребецн Ханы: Свет в казахской ссылке',
      en: 'The Heroism of Rebbetzin Chana: Light in Kazakh Exile',
      he: 'גבורתה של הרבנית חנה: אור בגלות קזחסטן',
      uk: 'Подвиг ребецн Хані: Світло в казахському засланні',
    },
    subtitle: {
      ru: 'Абсолютная преданность мужу и идеалам иудаизма',
      en: 'Absolute devotion to her husband and the ideals of Judaism',
      he: 'מסירות מוחלטת לבעלה ולאידיאלים של היהדות',
      uk: 'Абсолютна відданість чоловікові та ідеалам юдаїзму',
    },
    content: {
      ru: `<h3>Чернила из ягод</h3>
<p>Рабби Леви-Ицхак Шнеерсон, отец Седьмого Ребе, был сослан советскими властями в город Чиили, Казахстан, за свою непреклонную деятельность по укреплению еврейской жизни. В ссылке он мог целый месяц обходиться без хлеба, но самым тяжёлым испытанием была невозможность записывать мысли Торы — не было ни чернил, ни бумаги. Ребецн Хана добровольно последовала за мужем в ссылку и совершила настоящий подвиг: она собирала травы и ягоды, из которых изготавливала чернила, чтобы рабби Леви-Ицхак мог писать свои уникальные комментарии на полях тех немногих книг, которые у него оставались. Благодаря её самоотверженности мир получил бесценное духовное наследие.</p>

<h3>Хранительница наследия</h3>
<p>После кончины мужа в 5704 году (1944) в Алма-Ате, ребецн Хана, рискуя жизнью, сохранила и тайно вывезла из Советского Союза рукописи рабби Леви-Ицхака. Каждая страница, исписанная чернилами из ягод, была для неё священной. Она понимала, что эти записи — не просто личные заметки, а сокровище всего еврейского народа. Благодаря её жертвенности сегодня мы можем изучать уникальные комментарии рабби Леви-Ицхака, соединяющие нигле (открытую часть Торы) с глубинами Каббалы и хасидизма. Подвиг ребецн Ханы — образец абсолютной преданности Б-гу, мужу и идеалам иудаизма.</p>`,

      en: `<h3>Ink from Berries</h3>
<p>Rabbi Levi Yitzchak Schneerson, father of the Seventh Rebbe, was exiled by the Soviet authorities to the town of Chiili, Kazakhstan, for his unwavering work in strengthening Jewish life. In exile, he could go an entire month without bread, but the most agonizing trial was the inability to write down Torah thoughts — there was neither ink nor paper. Rebbetzin Chana voluntarily followed her husband into exile and performed a true act of heroism: she collected herbs and berries from which she produced ink, so that Rabbi Levi Yitzchak could write his unique commentaries in the margins of the few books that remained in his possession. Thanks to her selfless devotion, the world received a priceless spiritual heritage.</p>

<h3>Guardian of the Legacy</h3>
<p>After her husband's passing in 5704 (1944) in Alma-Ata, Rebbetzin Chana risked her life to preserve and secretly smuggle Rabbi Levi Yitzchak's manuscripts out of the Soviet Union. Every page, inscribed with ink made from berries, was sacred to her. She understood that these writings were not merely personal notes but a treasure belonging to the entire Jewish people. Thanks to her sacrifice, we can today study Rabbi Levi Yitzchak's unique commentaries, which unite nigleh (the revealed dimension of Torah) with the depths of Kabbalah and Chassidism. The heroism of Rebbetzin Chana stands as an example of absolute devotion to G-d, to her husband, and to the ideals of Judaism.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-bitachon-tzemach-tzedek',
    slug: 'uroki-bitakhon-tsemakh-tsedek-i-sila-mysli',
    title: {
      ru: 'Уроки битахон: Цемах Цедек и сила мысли',
      en: 'Lessons in Bitachon: The Tzemach Tzedek and the Power of Thought',
      he: 'שיעורי ביטחון: הצמח צדק וכוח המחשבה',
      uk: 'Уроки бітахон: Цемах Цедек і сила думки',
    },
    subtitle: {
      ru: 'Концепция упования на Б-га как мощный инструмент духовной работы',
      en: 'The concept of trust in G-d as a powerful tool for spiritual work',
      he: 'מושג הביטחון בה\' ככלי רב-עוצמה לעבודה רוחנית',
      uk: 'Концепція уповання на Б-га як потужний інструмент духовної роботи',
    },
    content: {
      ru: `<h3>«Думай хорошо — и будет хорошо»</h3>
<p>Эти знаменитые слова Цемах Цедек сказал хасиду, чей ребёнок был опасно болен. Хасид пришёл в отчаянии, умоляя о благословении. Ребе ответил ему: «Трахт гут — вэт зайн гут» («Думай хорошо — и будет хорошо»). Это не просто утешение — это глубочайший принцип битахон. Искренняя, непоколебимая уверенность в помощи Ашема способна физически изменить реальность, превращая суровый приговор в милосердие. Когда еврей всем сердцем полагается на Б-га, он создаёт духовный «сосуд», способный вместить самые великие благословения. Ребёнок того хасида выздоровел — и эта история стала одним из самых известных уроков хасидизма о силе веры и позитивной мысли.</p>

<h3>Стойкость в Петербурге</h3>
<p>В 1843 году российское правительство созвало в Петербурге конференцию, целью которой было навязать еврейским общинам светское образование и подорвать традиционную систему обучения Торе. Маскилим (сторонники «просвещения») активно поддерживали эти реформы. Цемах Цедек был арестован двадцать два раза за свою непреклонную позицию. Он заявил министрам: «Только Ашем управляет Своими слугами... Я не изменю ни одной буквы нашей традиции». Его стойкость остановила разрушительные реформы и сохранила еврейское образование для будущих поколений. Этот эпизод учит нас: когда человек полностью полагается на Б-га, внешние преграды теряют свою силу. Битахон — это не пассивное ожидание, а активная духовная позиция, способная изменить ход истории.</p>`,

      en: `<h3>"Think Good — and It Will Be Good"</h3>
<p>These famous words were spoken by the Tzemach Tzedek to a chassid whose child was dangerously ill. The chassid came in despair, begging for a blessing. The Rebbe replied: "Tracht gut — vet zain gut" ("Think good — and it will be good"). This is not mere consolation — it is a profound principle of bitachon. Sincere, unwavering confidence in Hashem's help can physically change reality, transforming a harsh decree into mercy. When a Jew wholeheartedly relies on G-d, he creates a spiritual "vessel" capable of containing the greatest blessings. The chassid's child recovered — and this story became one of the most well-known lessons of Chassidism about the power of faith and positive thought.</p>

<h3>Steadfastness in Petersburg</h3>
<p>In 1843, the Russian government convened a conference in Petersburg whose goal was to impose secular education on Jewish communities and undermine the traditional system of Torah study. The maskilim (proponents of "enlightenment") actively supported these reforms. The Tzemach Tzedek was arrested twenty-two times for his unyielding stance. He declared to the ministers: "Only Hashem governs His servants... I will not change a single letter of our tradition." His steadfastness halted the destructive reforms and preserved Jewish education for future generations. This episode teaches us: when a person fully relies on G-d, external barriers lose their power. Bitachon is not passive waiting but an active spiritual stance capable of changing the course of history.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-menachem-av',
    slug: 'menakhem-av-mesyats-utesheniya-i-pamyati',
    title: {
      ru: 'Менахем-Ав: Месяц утешения и памяти',
      en: 'Menachem Av: Month of Consolation and Remembrance',
      he: 'מנחם-אב: חודש הנחמה והזיכרון',
      uk: 'Менахем-Ав: Місяць утіхи та пам\'яті',
    },
    subtitle: {
      ru: 'Цель — превратить траур по Храму в радость будущего Освобождения',
      en: 'The goal — to transform mourning for the Temple into joy of future Redemption',
      he: 'המטרה — להפוך את האבל על בית המקדש לשמחת הגאולה העתידה',
      uk: 'Мета — перетворити траур за Храмом на радість майбутнього Визволення',
    },
    content: {
      ru: `<h3>20 ава: Йорцайт рабби Леви-Ицхака (5704/1944)</h3>
<p>20 ава — день памяти рабби Леви-Ицхака Шнеерсона, отца Седьмого Ребе. Он ушёл из жизни в ссылке в Алма-Ате, измождённый годами страданий за веру. Советские власти арестовали его за обучение еврейских детей Торе и строительство микваот (ритуальных бассейнов) — преступления, за которые в те времена полагались самые суровые наказания. Ребе установил этот день как особую дату для укрепления еврейского образования и увеличения цдаки, ибо именно за это его отец отдал свою жизнь. Пример рабби Леви-Ицхака учит: преданность Б-гу и Его заповедям стоит выше любых земных обстоятельств.</p>

<h3>40 дней до Рош а-Шана</h3>
<p>20 ава — это ровно сорок дней до Рош а-Шана. Подобно тому, как за сорок дней до формирования зародыша определяется его судьба, этот день знаменует начало серьёзной подготовки к Новому году. Сорок — число, имеющее глубокий духовный смысл: сорок дней Моше провёл на горе Синай, получая Тору; сорок дней длился потоп, очищавший мир; сорок лет еврейский народ шёл по пустыне, готовясь войти в Святую Землю. Каждый из этих сорока дней перед Рош а-Шана — возможность исправить соответствующий день уходящего года и заложить духовный фундамент для года грядущего. Это время особой близости к Б-гу, когда «Царь находится в поле» и доступен каждому.</p>`,

      en: `<h3>20 Av: Yahrzeit of Rabbi Levi Yitzchak (5704/1944)</h3>
<p>20 Av is the day of remembrance for Rabbi Levi Yitzchak Schneerson, father of the Seventh Rebbe. He passed away in exile in Alma-Ata, exhausted by years of suffering for his faith. The Soviet authorities had arrested him for teaching Jewish children Torah and building mikvaot (ritual baths) — offenses that carried the harshest punishments in those times. The Rebbe established this day as a special date for strengthening Jewish education and increasing tzedakah, for it was precisely for this that his father gave his life. The example of Rabbi Levi Yitzchak teaches us: devotion to G-d and His commandments stands above all earthly circumstances.</p>

<h3>40 Days Before Rosh Hashanah</h3>
<p>20 Av falls exactly forty days before Rosh Hashanah. Just as forty days before the formation of an embryo its fate is determined, this day marks the beginning of serious preparation for the New Year. Forty is a number of profound spiritual significance: Moses spent forty days on Mount Sinai receiving the Torah; the Flood lasted forty days, purifying the world; the Jewish people journeyed forty years through the desert, preparing to enter the Holy Land. Each of these forty days before Rosh Hashanah is an opportunity to rectify the corresponding day of the departing year and to lay a spiritual foundation for the year to come. This is a time of special closeness to G-d, when "the King is in the field" and accessible to everyone.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-elul-luminaries',
    slug: 'elul-mesyats-dvukh-velikikh-svetil',
    title: {
      ru: 'Элул: Месяц «Двух Великих Светил»',
      en: 'Elul: Month of the "Two Great Luminaries"',
      he: 'אלול: חודש "שני המאורות הגדולים"',
      uk: 'Елул: Місяць «Двох Великих Світил»',
    },
    subtitle: {
      ru: 'Время подведения итогов и духовной близости к Творцу',
      en: 'Time for summing up and spiritual closeness to the Creator',
      he: 'זמן לסיכומים ולקרבה רוחנית לבורא',
      uk: 'Час підбиття підсумків і духовної близькості до Творця',
    },
    content: {
      ru: `<h3>15 элула: Основание «Томхей Тмимим» (5657/1897)</h3>
<p>Ребе Рашаб основал ешиву «Томхей Тмимим» в Любавичах — кузницу духовных воинов, объединяющих открытую Тору с глубинами хасидизма. Это были не просто учёные — это были «тмимим», цельные люди, готовые нести свет Торы в самые далёкие уголки мира. Ребе Рашаб говорил: «Тмимим — солдаты Дома Давида». Выпускники ешивы стали фундаментом будущей сети посланников Хабада, которая сегодня охватывает весь земной шар. Каждый шалиах (посланник), каждый Бейт Хабад — продолжение того семени, посаженного 15 элула 5657 года.</p>

<h3>18 элула (Хай Элул): День рождения двух светил</h3>
<p>В этот день родились два великих светила еврейского мира: Баал Шем Тов (5458/1698) и Алтер Ребе (5505/1745). «Хай» на иврите означает «жизнь» — Хай Элул буквально вдыхает жизнь в служение месяца Элул. Баал Шем Тов открыл Б-жественную искру в каждом еврее, показав, что даже самый простой человек бесконечно дорог Б-гу. Алтер Ребе дал интеллектуальную систему для постижения этих идей — учение Хабад (Хохма, Бина, Даат). С 18 элула начинаются последние двенадцать дней года, каждый из которых соответствует одному из прошедших месяцев — время для подведения итогов и тшувы.</p>

<h3>29 элула: Рождение Цемах Цедека (5549/1789)</h3>
<p>Последний день года — и одновременно день рождения Третьего Любавичского Ребе, Цемах Цедека. Его имя «Цемах» — одно из имён Машиаха, о котором пророк Зхария говорит: «Вот человек, имя которого Цемах (Росток)». Это связывает последний день года с ожиданием окончательного Избавления. Рождение великого праведника в последний день уходящего года символизирует, что каждое завершение несёт в себе зерно нового, ещё более возвышенного начала. Пусть заслуги Цемах Цедека помогут нам встретить новый год с чистой душой и твёрдой верой в скорый приход Машиаха.</p>`,

      en: `<h3>15 Elul: The Founding of Tomchei Temimim (5657/1897)</h3>
<p>The Rebbe Rashab founded the yeshiva Tomchei Temimim in Lubavitch — a forge of spiritual warriors who united the revealed Torah with the depths of Chassidism. These were not merely scholars — they were "temimim," wholehearted individuals ready to carry the light of Torah to the most distant corners of the world. The Rebbe Rashab declared: "The temimim are soldiers of the House of David." The graduates of the yeshiva became the foundation for the future Chabad emissary network, which today spans the entire globe. Every shaliach (emissary), every Beit Chabad is a continuation of the seed planted on 15 Elul 5657.</p>

<h3>18 Elul (Chai Elul): Birthday of the Two Luminaries</h3>
<p>On this day, two great luminaries of the Jewish world were born: the Baal Shem Tov (5458/1698) and the Alter Rebbe (5505/1745). "Chai" in Hebrew means "life" — Chai Elul literally breathes life into the service of the month of Elul. The Baal Shem Tov revealed the Divine spark in every Jew, showing that even the simplest person is infinitely precious to G-d. The Alter Rebbe provided the intellectual framework for grasping these ideas — the teaching of Chabad (Chochmah, Binah, Daat). From 18 Elul begin the final twelve days of the year, each corresponding to one of the past months — a time for taking stock and teshuvah.</p>

<h3>29 Elul: The Birth of the Tzemach Tzedek (5549/1789)</h3>
<p>The last day of the year — and simultaneously the birthday of the Third Lubavitcher Rebbe, the Tzemach Tzedek. His name "Tzemach" is one of the names of Mashiach, about whom the prophet Zechariah says: "Behold a man whose name is Tzemach (Branch)." This connects the last day of the year with the expectation of the final Redemption. The birth of a great righteous person on the last day of the departing year symbolizes that every ending carries within it the seed of a new, even more exalted beginning. May the merits of the Tzemach Tzedek help us greet the new year with a pure soul and firm faith in the speedy coming of Mashiach.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-shpalerka-verdict',
    slug: 'smertnyy-prigovor-i-torzhestvo-dukha-v-shpalerke',
    title: {
      ru: 'Смертный приговор и торжество духа в Шпалерке',
      en: 'Death Sentence and the Triumph of Spirit in Shpalernaya',
      he: 'גזר דין מוות וניצחון הרוח בשפלרקה',
      uk: 'Смертний вирок і тріумф духу в Шпалерці',
    },
    subtitle: {
      ru: 'Как духовная свобода побеждает физическое угнетение',
      en: 'How spiritual freedom overcomes physical oppression',
      he: 'כיצד חירות רוחנית מנצחת דיכוי פיזי',
      uk: 'Як духовна свобода перемагає фізичне пригнічення',
    },
    content: {
      ru: `<h3>Смертный приговор и непоколебимый ответ</h3>
<p>Когда в 1927 году Ребе Раяцу зачитали смертный приговор в ленинградской тюрьме «Шпалерка», он произнёс слова, ставшие символом еврейской стойкости: «В изгнании находятся только тела, но не души». Эта фраза перевернула логику палачей: они могли заключить в камеру физическое тело, но дух хасидского лидера оставался абсолютно свободным. Ребе Раяц продемонстрировал, что подлинная свобода — не внешнее обстоятельство, а внутреннее состояние, которое не может быть отнято никакой земной властью.</p>

<h3>Трёхдневная голодовка за тфилин</h3>
<p>Оказавшись в камере, Ребе Раяц объявил трёхдневную голодовку, требуя вернуть ему тфилин. Для него это было не просто религиозным ритуалом, а экзистенциальной необходимостью — связью с Б-гом, которую он отказывался разрывать даже перед лицом смерти. Тюремщики не могли понять, как человек, приговорённый к расстрелу, думает о кожаных коробочках вместо спасения собственной жизни. Но именно в этом и заключалась сила Ребе: приоритеты духа стояли выше инстинкта самосохранения.</p>

<h3>Несломленный дух в каждом действии</h3>
<p>Ребе Раяц отказался от прогулок по тюремному двору, не желая подчиняться распорядку, установленному безбожниками. Когда следователи попытались сфотографировать его для тюремного дела, он остановил фотографа одним взглядом. Даже в камере Ребе продолжал писать хасидские маамарим (глубокие учения), пока у него не отобрали карандаш. Каждое его действие было актом сопротивления — не политического, а духовного. Он показал всему миру, что еврейская душа неподвластна тиранам, а свет Торы невозможно погасить никакими тюремными стенами.</p>`,

      en: `<h3>The Death Sentence and an Unwavering Response</h3>
<p>When in 1927 the Rebbe Rayatz was read his death sentence in Leningrad's Shpalernaya prison, he uttered words that became a symbol of Jewish resilience: "Only bodies are in exile, not souls." This phrase overturned the executioners' logic: they could confine a physical body in a cell, but the spirit of the Chassidic leader remained absolutely free. The Rebbe Rayatz demonstrated that true freedom is not an external circumstance but an inner state that cannot be taken away by any earthly power.</p>

<h3>Three-Day Hunger Strike for Tefillin</h3>
<p>Finding himself in a cell, the Rebbe Rayatz declared a three-day hunger strike, demanding the return of his tefillin. For him this was not merely a religious ritual but an existential necessity — a connection with G-d that he refused to sever even in the face of death. The jailers could not understand how a man sentenced to execution could think about leather boxes instead of saving his own life. But this was precisely where the Rebbe's strength lay: the priorities of the spirit stood above the instinct of self-preservation.</p>

<h3>An Unbroken Spirit in Every Action</h3>
<p>The Rebbe Rayatz refused walks in the prison yard, unwilling to submit to a routine established by the godless. When interrogators tried to photograph him for the prison file, he stopped the photographer with a single glance. Even in his cell, the Rebbe continued writing Chassidic maamarim (profound teachings) until they took away his pencil. Every action of his was an act of resistance — not political, but spiritual. He showed the entire world that the Jewish soul is beyond the reach of tyrants, and the light of Torah cannot be extinguished by any prison walls.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-serpa-pinto',
    slug: 'odisseya-spaseniya-korabl-serpa-pintu',
    title: {
      ru: 'Одиссея спасения: Корабль «Серпа Пинту»',
      en: 'Odyssey of Rescue: The Ship Serpa Pinto',
      he: 'אודיסיאת ההצלה: האונייה סרפה פינטו',
      uk: 'Одіссея порятунку: Корабель «Серпа Пінту»',
    },
    subtitle: {
      ru: '28 сивана 1941 — прибытие Седьмого Ребе в США',
      en: '28 Sivan 1941 — Arrival of the Seventh Rebbe in the USA',
      he: 'כ״ח סיוון תש״א — הגעת הרבי השביעי לארה״ב',
      uk: '28 сивана 1941 — прибуття Сьомого Ребе до США',
    },
    content: {
      ru: `<h3>Билеты ценой жизни</h3>
<p>История спасения Ребе и ребецн Хаи-Мушки из охваченной войной Европы начинается с подвига хасида Лева Бистрицкого. Он отдал свои семейные билеты на пароход — билеты, которые могли бы спасти его собственных родных. Этот поступок стал олицетворением хасидской самоотверженности: готовность пожертвовать собственной безопасностью ради Ребе и будущего всего движения. Лев Бистрицкий понимал, что на кону стоит не просто жизнь одного человека, а судьба целого поколения евреев, которые будут спасены благодаря руководству Ребе в Америке.</p>

<h3>Через Атлантику под тенью смерти</h3>
<p>Корабль SS «Серпа Пинту» пересекал Атлантику в одном из самых опасных периодов войны. Немецкие подводные лодки патрулировали океан, топя гражданские суда без предупреждения. Каждый день путешествия был наполнен тревогой и молитвой. Однако Б-жественное провидение хранило корабль, несущий на борту будущего лидера мирового еврейства. Это плавание стало не просто физическим перемещением через океан, а духовным переходом — из мира разрушения в мир созидания, из Европы, которая погружалась во тьму, в Америку, которой предстояло стать новым центром Торы.</p>

<h3>Встреча на Стейтен-Айленд</h3>
<p>Когда корабль наконец прибыл к берегам Стейтен-Айленда, Ребе встречала делегация преданных хасидов: Исраэль Якобсон, Шмуэль Симпсон и Казарновский. Момент встречи стал историческим: Ребе Раяц, отец Ребе по линии наставничества, произнёс благословение «Борух мехайе а-мейтим» — «Благословен воскрешающий мёртвых». Это было не метафорой, а точным духовным описанием: из пасти смерти вырвался тот, кому суждено было зажечь свет Торы и хасидизма по всему миру. 28 сивана стало днём, изменившим ход еврейской истории.</p>`,

      en: `<h3>Tickets at the Cost of Life</h3>
<p>The story of the rescue of the Rebbe and Rebbetzin Chaya Mushka from war-torn Europe begins with the heroic act of the Chassid Lev Bistritsky. He gave up his family's tickets for the steamship — tickets that could have saved his own relatives. This act became the embodiment of Chassidic self-sacrifice: the willingness to give up one's own safety for the Rebbe and the future of the entire movement. Lev Bistritsky understood that at stake was not merely the life of one person, but the destiny of an entire generation of Jews who would be saved through the Rebbe's leadership in America.</p>

<h3>Across the Atlantic Under the Shadow of Death</h3>
<p>The ship SS Serpa Pinto crossed the Atlantic during one of the most dangerous periods of the war. German submarines patrolled the ocean, sinking civilian vessels without warning. Every day of the voyage was filled with anxiety and prayer. Yet Divine Providence protected the ship carrying the future leader of world Jewry. This voyage was not merely a physical crossing of the ocean but a spiritual transition — from a world of destruction to a world of creation, from Europe sinking into darkness to America, which was destined to become the new center of Torah.</p>

<h3>The Meeting at Staten Island</h3>
<p>When the ship finally arrived at the shores of Staten Island, the Rebbe was met by a delegation of devoted Chassidim: Israel Jacobson, Shmuel Simpson, and Kazarnovsky. The moment of meeting became historic: the Rebbe Rayatz, the Rebbe's father-in-law and mentor, pronounced the blessing "Baruch mechaye ha-meitim" — "Blessed is He who revives the dead." This was no metaphor but a precise spiritual description: from the jaws of death emerged the one who was destined to kindle the light of Torah and Chassidism throughout the world. The 28th of Sivan became a day that changed the course of Jewish history.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'lessons-nissan-essence',
    slug: 'dukhovnyye-uroki-nissana-sushchnost-i-deystviye',
    title: {
      ru: 'Духовные уроки Ниссана: Сущность и действие',
      en: 'Spiritual Lessons of Nissan: Essence and Action',
      he: 'שיעורים רוחניים של ניסן: מהות ומעשה',
      uk: 'Духовні уроки Ніссана: Сутність і дія',
    },
    subtitle: {
      ru: 'Ключевые духовные смыслы дат месяца Ниссан',
      en: 'Key spiritual meanings of the dates of the month of Nissan',
      he: 'משמעויות רוחניות מרכזיות של תאריכי חודש ניסן',
      uk: 'Ключові духовні смисли дат місяця Ніссан',
    },
    content: {
      ru: `<h3>2 Ниссана: Рукописи и наследие Рашаба</h3>
<p>2 ниссана — день ухода Ребе Рашаба (1920). Перед уходом из этого мира он произнёс слова, ставшие завещанием: «Я ухожу на небо, а рукописи оставляю вам». Эти рукописи — не просто бумага с текстом, а живая связь между поколениями хасидов, хранилище глубочайших тайн Торы. Имя Шолом-Довбер несёт в себе глубокий смысл: «Шолом» означает мир и гармонию, а «Довбер» соединяет святой язык (иврит) с языком будней (идиш) — «Дов» и «Бер», два слова, означающие «медведь». Этот синтез учит нас, что служение Б-гу не ограничивается синагогой — оно пронизывает каждый аспект повседневной жизни, превращая обыденное в святое.</p>

<h3>11 Ниссана: Образование — это нравственность перед Творцом</h3>
<p>День рождения Седьмого Ребе (1902) — день, когда в мир пришёл величайший еврейский лидер двадцатого века. Ребе неоднократно подчёркивал, что истинное образование — это не просто накопление знаний, а воспитание нравственности и ответственности перед Творцом. Дети должны с самого раннего возраста осознавать, что существует «Видящее око и Слышащее ухо» — Б-г видит каждый поступок и слышит каждое слово. Когда образование строится на этом фундаменте, оно формирует не просто учёных людей, а праведников, способных изменить мир к лучшему. Ребе учил, что каждый ребёнок — это целая вселенная, и задача воспитателя — раскрыть этот потенциал.</p>

<h3>13 Ниссана: «Трахт гут — вет зайн гут»</h3>
<p>13 ниссана связано с уроками Цемах Цедека, третьего Любавичского Ребе (1866). Его знаменитое изречение «Трахт гут — вет зайн гут» («Думай хорошо — и будет хорошо») — это не просто позитивное мышление в современном понимании. Это глубочайший принцип битахона (упования на Б-га): когда человек по-настоящему верит, что Б-г пошлёт ему благо, эта вера сама по себе создаёт духовный сосуд, через который нисходит благословение. Битахон — это не пассивное ожидание, а активная духовная сила, способная буквально изменить реальность. Цемах Цедек показал, что скрытая и открытая части Торы — единое целое, и хасидизм с галахой дополняют друг друга.</p>`,

      en: `<h3>2 Nissan: Manuscripts and the Legacy of the Rebbe Rashab</h3>
<p>2 Nissan is the day of passing of the Rebbe Rashab (1920). Before departing this world, he spoke words that became his testament: "I am going to heaven, and the manuscripts I leave to you." These manuscripts are not merely paper with text but a living connection between generations of Chassidim, a repository of the deepest secrets of Torah. The name Shalom-DovBer carries profound meaning: "Shalom" means peace and harmony, while "DovBer" unites the holy tongue (Hebrew) with the language of the everyday (Yiddish) — "Dov" and "Ber," two words meaning "bear." This synthesis teaches us that service of G-d is not limited to the synagogue — it permeates every aspect of daily life, transforming the mundane into the holy.</p>

<h3>11 Nissan: Education Means Morality Before the Creator</h3>
<p>The birthday of the Seventh Rebbe (1902) — the day when the greatest Jewish leader of the twentieth century came into the world. The Rebbe repeatedly emphasized that true education is not merely the accumulation of knowledge but the cultivation of morality and responsibility before the Creator. Children must from the earliest age be aware that there exists a "Seeing Eye and Hearing Ear" — G-d sees every deed and hears every word. When education is built upon this foundation, it produces not merely learned people but righteous individuals capable of changing the world for the better. The Rebbe taught that every child is an entire universe, and the educator's task is to reveal this potential.</p>

<h3>13 Nissan: "Tracht Gut — Vet Zain Gut"</h3>
<p>13 Nissan is connected with the teachings of the Tzemach Tzedek, the third Lubavitcher Rebbe (1866). His famous saying "Tracht gut — vet zain gut" ("Think good and it will be good") is not merely positive thinking in the modern sense. It is the deepest principle of bitachon (trust in G-d): when a person truly believes that G-d will send them good, this faith itself creates a spiritual vessel through which blessing descends. Bitachon is not passive waiting but an active spiritual force capable of literally changing reality. The Tzemach Tzedek showed that the hidden and revealed parts of Torah are a unified whole, and Chassidism and halacha complement each other.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tishrei-calendar',
    slug: 'tishrey-ispytaniya-i-velichiye',
    hebrewDate: { month: 'Tishrei', day: 1 },
    monthIntro: {
      ru: 'Тишрей: Месяц максимального духовного напряжения, где дни покаяния сменяются днями величайшей радости.',
      en: 'Tishrei: Month of maximum spiritual intensity, where days of repentance give way to days of greatest joy.',
    },
    title: {
      ru: 'Тишрей: Испытания и Величие',
      en: 'Tishrei: Trials and Greatness',
      he: 'תשרי: ניסיונות וגדולה',
      uk: 'Тішрей: Випробування і Велич',
    },
    subtitle: {
      ru: 'От битвы за наследие до торжества радости Торы',
      en: 'From the battle for heritage to the triumph of Simchat Torah',
      he: 'ממאבק על המורשת ועד שמחת תורה',
      uk: 'Від битви за спадщину до торжества радості Тори',
    },
    content: {
      ru: `<h3>4 Тишрея: Начало битвы за библиотеку (1985)</h3>
<p>4 тишрея 5746 года (1985) стало поворотной датой в истории Хабада: в этот день была выработана юридическая стратегия для судебного процесса о возвращении бесценной библиотеки Любавичских Ребе. Это дело, известное как «Дидан Ноцах» («Победа наша»), касалось не просто коллекции книг и рукописей — на кону стояло духовное наследие семи поколений хасидских лидеров. Библиотека содержала уникальные рукописи, редчайшие книги и документы, каждый из которых был пропитан святостью. Решение начать борьбу за возвращение этих сокровищ стало актом веры в то, что святыни должны принадлежать всему народу Израиля, а не частным лицам.</p>

<h3>6 Тишрея: Йорцайт ребецн Ханы (1964)</h3>
<p>6 тишрея — день памяти ребецн Ханы, матери Ребе. Ребецн Хана была женщиной невероятной духовной силы, сопровождавшей своего мужа, рабби Леви-Ицхака, в ссылку в Казахстан и поддерживавшей его до последнего дня. После его ухода она продолжала нести свет Торы, став примером еврейской стойкости и преданности. Её жизнь — это история о том, как вера в Б-га помогает преодолеть любые испытания, будь то голод, холод или одиночество в далёкой ссылке. Ребе глубоко чтил память своей матери, и этот день стал днём особого духовного пробуждения в хасидском календаре.</p>

<h3>13 Тишрея: Йорцайт Ребе Маараша</h3>
<p>Ребе Маараш, четвёртый Любавичский Ребе, ушёл из этого мира в возрасте всего 48 лет, но за свою краткую жизнь оставил неизгладимый след в истории хасидизма. Его знаменитый девиз «Лехатхила арибер» («С самого начала — напролом») стал руководящим принципом для поколений хасидов. Обычные люди, столкнувшись с препятствием, сначала пытаются обойти его снизу, а если не получается — перепрыгивают. Ребе Маараш учил: не нужно даже пытаться идти в обход — с самого начала прыгай через преграду! Этот подход выражает безграничную веру в силу Б-га и отказ подчиняться ограничениям материального мира.</p>

<h3>22 Тишрея 1977: Танец, победивший смерть</h3>
<p>Симхат Тора 5738 года (1977) стала одним из самых драматических моментов в истории Хабада. Во время акафот (танцев с Торой) Ребе перенёс тяжёлый сердечный приступ. Врачи были в ужасе, хасиды — в шоке. Но Ребе, превозмогая невыносимую боль, отказался прервать танец. Он довёл акафот до конца, показав всему миру, что радость Торы сильнее любого физического страдания. Этот момент стал символом всей жизни Ребе: абсолютная преданность Б-гу и Торе, не знающая компромиссов даже перед лицом смерти. Ребе продолжил руководить движением с неослабевающей энергией ещё многие годы после этого события.</p>`,

      en: `<h3>4 Tishrei: The Beginning of the Battle for the Library (1985)</h3>
<p>4 Tishrei 5746 (1985) became a turning point in Chabad history: on this day the legal strategy was formulated for the court case to recover the priceless library of the Lubavitcher Rebbes. This case, known as "Didan Notzach" ("Victory is ours"), was not merely about a collection of books and manuscripts — at stake was the spiritual heritage of seven generations of Chassidic leaders. The library contained unique manuscripts, exceedingly rare books, and documents, each saturated with holiness. The decision to fight for the return of these treasures was an act of faith that sacred items must belong to the entire people of Israel, not to private individuals.</p>

<h3>6 Tishrei: Yahrzeit of Rebbetzin Chana (1964)</h3>
<p>6 Tishrei is the memorial day of Rebbetzin Chana, the Rebbe's mother. Rebbetzin Chana was a woman of incredible spiritual strength who accompanied her husband, Rabbi Levi Yitzchak, into exile in Kazakhstan and supported him until his last day. After his passing, she continued to carry the light of Torah, becoming an example of Jewish resilience and devotion. Her life is a story of how faith in G-d helps overcome any trial, whether hunger, cold, or loneliness in distant exile. The Rebbe deeply honored the memory of his mother, and this day became a day of special spiritual awakening in the Chassidic calendar.</p>

<h3>13 Tishrei: Yahrzeit of the Rebbe Maharash</h3>
<p>The Rebbe Maharash, the fourth Lubavitcher Rebbe, departed this world at only 48 years of age, yet in his brief life he left an indelible mark on the history of Chassidism. His famous motto "Lechatchila Ariber" ("From the very start — leap over") became a guiding principle for generations of Chassidim. Ordinary people, encountering an obstacle, first try to go around it from below, and if that fails — they jump over. The Rebbe Maharash taught: don't even try to go around — from the very start, leap over the barrier! This approach expresses boundless faith in the power of G-d and a refusal to submit to the limitations of the material world.</p>

<h3>22 Tishrei 1977: The Dance That Conquered Death</h3>
<p>Simchat Torah 5738 (1977) became one of the most dramatic moments in Chabad history. During hakafot (dancing with the Torah), the Rebbe suffered a severe heart attack. Doctors were alarmed, Chassidim were in shock. But the Rebbe, overcoming unbearable pain, refused to stop dancing. He completed the hakafot, showing the entire world that the joy of Torah is stronger than any physical suffering. This moment became a symbol of the Rebbe's entire life: absolute devotion to G-d and Torah that knows no compromise, even in the face of death. The Rebbe continued to lead the movement with undiminished energy for many years after this event.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'kislev-calendar',
    slug: 'kislev-mesyats-sveta-i-svyazi',
    hebrewDate: { month: 'Kislev', day: 1 },
    monthIntro: {
      ru: 'Кислев: Месяц Света и Связи. От чудесного выздоровления до Рош а-Шана хасидизма.',
      en: 'Kislev: Month of Light and Connection. From miraculous recovery to Rosh Hashana of Chassidism.',
    },
    title: {
      ru: 'Кислев: Месяц Света и Связи',
      en: 'Kislev: Month of Light and Connection',
      he: 'כסלו: חודש האור והקשר',
      uk: 'Кіслев: Місяць Світла і Зв\'язку',
    },
    subtitle: {
      ru: 'От Рош Ходеш Кислев до 19 Кислева',
      en: 'From Rosh Chodesh Kislev to 19 Kislev',
      he: 'מראש חודש כסלו ועד י״ט כסלו',
      uk: 'Від Рош Ходеш Кіслев до 19 Кіслева',
    },
    content: {
      ru: `<h3>Рош Ходеш Кислев: Празднование чудесного выздоровления</h3>
<p>Рош Ходеш Кислев стал праздником в хасидском календаре после чудесного выздоровления Ребе в 1977 году. После тяжёлого сердечного приступа на Симхат Тора, когда врачи опасались за его жизнь, Ребе вернулся к полноценной деятельности именно в первый день Кислева. Хасиды по всему миру восприняли это как знак свыше: месяц, который начинается с исцеления лидера поколения, несёт в себе особую силу обновления и связи с Б-гом. С тех пор этот день отмечается с особой радостью, фарбренгенами и увеличением изучения Торы.</p>

<h3>9–10 Кислева: Мителер Ребе — рождение, уход и освобождение</h3>
<p>Даты 9 и 10 Кислева образуют уникальное сочетание в хасидском календаре: 9 Кислева — день рождения и одновременно день ухода Мителер (Среднего) Ребе, рабби Довбера, второго Любавичского Ребе. А 10 Кислева — день его освобождения из тюрьмы. Мителер Ребе был арестован по доносу за распространение хасидизма — обвинение, удивительно похожее на арест его отца, Альтер Ребе, двадцатью пятью годами ранее. Его освобождение подтвердило, что преследования не могут остановить свет хасидского учения. Рождение и уход в один день свидетельствуют о завершённости его миссии: он пришёл в мир с определённой целью и исполнил её полностью.</p>

<h3>14 Кислева: Свадьба Ребе и ребецн Хаи-Мушки (1928)</h3>
<p>14 кислева 5689 года (1928) в Варшаве состоялась свадьба будущего Седьмого Любавичского Ребе, рабби Менахем-Мендла, и ребецн Хаи-Мушки, дочери Ребе Раяца. Эта свадьба стала не только личным событием, но и историческим моментом для всего движения Хабад. Ребе Раяц сказал о зяте: «Одну душу я взял — две получил». Союз Ребе и ребецн стал фундаментом, на котором было построено глобальное движение распространения Торы и хасидизма. Ребецн Хая-Мушка всю жизнь поддерживала мужа, оставаясь при этом скромной и избегая публичности.</p>

<h3>19–20 Кислева: Рош а-Шана хасидизма</h3>
<p>19 Кислева — величайший праздник хасидского мира: день освобождения Альтер Ребе, рабби Шнеура-Залмана из Ляд, из Петропавловской крепости в 1798 году. Этот день называют «Рош а-Шана хасидизма», потому что освобождение Альтер Ребе стало небесным знаком одобрения распространения учения хасидизма в мире. До ареста Альтер Ребе учил хасидизм в узком кругу; после освобождения он начал распространять учение «наружу» — всё шире и шире, выполняя наказ Баал-Шем-Това: «Когда твои источники распространятся наружу — придёт Мошиах». 20 Кислева стало продолжением этого торжества. С тех пор в этот день хасиды по всему миру проводят грандиозные фарбренгены, принимают новые решения в изучении хасидизма и укрепляют связь друг с другом и с Ребе.</p>`,

      en: `<h3>Rosh Chodesh Kislev: Celebration of Miraculous Recovery</h3>
<p>Rosh Chodesh Kislev became a holiday in the Chassidic calendar after the Rebbe's miraculous recovery in 1977. Following the severe heart attack on Simchat Torah, when doctors feared for his life, the Rebbe returned to full activity precisely on the first day of Kislev. Chassidim around the world perceived this as a sign from Above: a month that begins with the healing of the leader of the generation carries a special power of renewal and connection with G-d. Since then, this day is celebrated with special joy, farbrengens, and increased Torah study.</p>

<h3>9–10 Kislev: The Mitteler Rebbe — Birth, Passing, and Liberation</h3>
<p>The dates of 9 and 10 Kislev form a unique combination in the Chassidic calendar: 9 Kislev is the birthday and simultaneously the day of passing of the Mitteler (Middle) Rebbe, Rabbi DovBer, the second Lubavitcher Rebbe. And 10 Kislev is the day of his liberation from prison. The Mitteler Rebbe was arrested on a denunciation for spreading Chassidism — a charge remarkably similar to the arrest of his father, the Alter Rebbe, twenty-five years earlier. His liberation confirmed that persecution cannot stop the light of Chassidic teaching. Birth and passing on the same day testify to the completeness of his mission: he came into the world with a definite purpose and fulfilled it entirely.</p>

<h3>14 Kislev: Wedding of the Rebbe and Rebbetzin Chaya Mushka (1928)</h3>
<p>On 14 Kislev 5689 (1928), in Warsaw, the wedding took place of the future Seventh Lubavitcher Rebbe, Rabbi Menachem Mendel, and Rebbetzin Chaya Mushka, daughter of the Rebbe Rayatz. This wedding was not only a personal event but a historic moment for the entire Chabad movement. The Rebbe Rayatz said of his son-in-law: "I took one soul — I received two." The union of the Rebbe and Rebbetzin became the foundation upon which the global movement of spreading Torah and Chassidism was built. Rebbetzin Chaya Mushka supported her husband throughout her life while remaining modest and avoiding publicity.</p>

<h3>19–20 Kislev: Rosh Hashana of Chassidism</h3>
<p>19 Kislev is the greatest holiday of the Chassidic world: the day of liberation of the Alter Rebbe, Rabbi Schneur Zalman of Liadi, from the Peter and Paul Fortress in 1798. This day is called the "Rosh Hashana of Chassidism" because the Alter Rebbe's liberation became a heavenly sign of approval for spreading the teachings of Chassidism in the world. Before his arrest, the Alter Rebbe taught Chassidism to a narrow circle; after his liberation, he began to spread the teachings "outward" — ever wider, fulfilling the directive of the Baal Shem Tov: "When your wellsprings spread outward — Moshiach will come." The 20th of Kislev became a continuation of this celebration. Since then, on this day Chassidim around the world hold grand farbrengens, make new resolutions in the study of Chassidism, and strengthen their connection with one another and with the Rebbe.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'tevet-shvat-adar',
    slug: 'tevet-shvat-adar-ot-pobedy-do-novogo-nachala',
    title: {
      ru: 'От Тевета до Адара: Победа, Лидерство и Радость',
      en: 'From Tevet to Adar: Victory, Leadership, and Joy',
      he: 'מטבת ועד אדר: ניצחון, מנהיגות ושמחה',
      uk: 'Від Тевета до Адара: Перемога, Лідерство і Радість',
    },
    subtitle: {
      ru: 'Дидан Ноцах, Баси Легани и прибытие в Америку',
      en: 'Didan Notzach, Basi Legani, and Arrival in America',
      he: 'דידן נצח, באתי לגני וההגעה לאמריקה',
      uk: 'Дідан Ноцах, Басі Легані і прибуття до Америки',
    },
    content: {
      ru: `<h3>Тевет: Победа и Наследие</h3>

<h4>5 Тевета: «Дидан Ноцах» — Победа наша (1987)</h4>
<p>5 тевета 5747 года (1987) федеральный суд США вынес историческое решение в пользу библиотеки Любавичских Ребе. Судья постановил, что бесценная коллекция книг, рукописей и документов принадлежит не частному лицу, а всему движению Хабад — то есть всему еврейскому народу. Этот день стал известен как «Дидан Ноцах» — «Победа наша». Ребе объяснил, что эта победа в материальном суде отражает победу в духовных мирах: святые книги вернулись к тем, кому они по праву принадлежат. Хасиды по всему миру отмечают этот день танцами, фарбренгенами и обновлённой решимостью изучать и распространять учение хасидизма.</p>

<h4>24 Тевета: Йорцайт Альтер Ребе</h4>
<p>24 тевета — день памяти основателя движения Хабад, рабби Шнеура-Залмана из Ляд (Альтер Ребе). Он ушёл из мира в 1812 году, спасаясь бегством от армии Наполеона, которого он считал духовной угрозой для еврейского народа. Альтер Ребе создал систему Хабад (Хохма, Бина, Даат), позволившую человеческому разуму постигать Б-жественное. Его главный труд — «Тания» — стал «письменной Торой хасидизма», книгой, которую изучают и перечитывают на протяжении всей жизни. Каждое поколение находит в «Тании» новые глубины и ответы на вызовы своего времени.</p>

<h3>Шват: Лидерство и Любовь</h3>

<h4>10 Швата: Уход Ребе Раяца и начало нового руководства</h4>
<p>10 швата 5710 года (1950) — день ухода шестого Любавичского Ребе, рабби Йосефа-Ицхака (Ребе Раяца). Ровно через год, 10 швата 5711 года (1951), его зять, рабби Менахем-Мендл, принял на себя руководство движением, произнеся знаменитый маамар «Баси Легани» («Я пришёл в Мой сад»). Этот маамар, основанный на последнем учении Ребе Раяца, провозгласил миссию седьмого поколения: сделать этот мир жилищем для Б-га. «Баси Легани» стало программным документом всей деятельности Ребе — от кампаний мицвот до посылки шлухим (посланников) по всему миру.</p>

<h4>22 Швата: Уход ребецн Хаи-Мушки — Аават Исраэль</h4>
<p>22 швата 5748 года (1988) ушла из жизни ребецн Хая-Мушка, супруга Ребе. Её жизнь была воплощением скромности и любви к каждому еврею. После её ухода Ребе основал множество учреждений в её честь, и её имя стало символом аават Исраэль — безусловной любви к каждому еврею. Ребецн всегда говорила: «Я не принадлежу себе — я принадлежу хасидам». Эти слова отражают суть её служения: полная самоотдача ради еврейского народа.</p>

<h3>Адар: Радость и Новое Начало</h3>

<h4>9 Адара: Прибытие Ребе Раяца в Америку</h4>
<p>9 адара 5700 года (1940) Ребе Раяц, спасённый из охваченной войной Европы, прибыл в Америку. Его знаменитые слова «Америка из ништ андерш» — «Америка не исключение» — перевернули представление о том, что в Новом Свете невозможно жить полноценной еврейской жизнью. Ребе Раяц заявил, что Тора и мицвот обязательны везде, и Америка не является исключением из этого правила. Эти слова стали пророческими: именно Америка превратилась в мировой центр Торы и хасидизма, оправдав веру Ребе Раяца в духовный потенциал этой страны.</p>

<h4>25 Адара: День рождения ребецн Хаи-Мушки — Кампания еврейского дня рождения</h4>
<p>25 адара — день рождения ребецн Хаи-Мушки. В связи с этой датой Ребе инициировал кампанию «Еврейский день рождения», призывая каждого еврея отмечать свой день рождения по еврейскому календарю особыми духовными действиями: увеличением изучения Торы, дополнительной цдакой (благотворительностью), принятием новых духовных решений. Ребе объяснял, что день рождения — это день, когда «мазаль» (духовная удача) человека особенно силён, и в этот день его молитвы и решения имеют особую силу. Кампания еврейского дня рождения стала одной из многих инициатив Ребе, направленных на укрепление еврейской идентичности и связи каждого еврея с его корнями.</p>`,

      en: `<h3>Tevet: Victory and Heritage</h3>

<h4>5 Tevet: "Didan Notzach" — Victory Is Ours (1987)</h4>
<p>On 5 Tevet 5747 (1987), a U.S. federal court issued a historic ruling in favor of the library of the Lubavitcher Rebbes. The judge ruled that the priceless collection of books, manuscripts, and documents belonged not to a private individual but to the entire Chabad movement — that is, to the entire Jewish people. This day became known as "Didan Notzach" — "Victory is ours." The Rebbe explained that this victory in a material court reflected a victory in the spiritual worlds: the holy books returned to those to whom they rightfully belong. Chassidim around the world celebrate this day with dancing, farbrengens, and renewed resolve to study and spread the teachings of Chassidism.</p>

<h4>24 Tevet: Yahrzeit of the Alter Rebbe</h4>
<p>24 Tevet is the memorial day of the founder of the Chabad movement, Rabbi Schneur Zalman of Liadi (the Alter Rebbe). He passed away in 1812 while fleeing the army of Napoleon, whom he considered a spiritual threat to the Jewish people. The Alter Rebbe created the Chabad system (Chochmah, Binah, Daat), enabling the human mind to grasp the Divine. His principal work — the Tanya — became the "Written Torah of Chassidism," a book that is studied and reread throughout one's lifetime. Every generation finds new depths in the Tanya and answers to the challenges of its time.</p>

<h3>Shvat: Leadership and Love</h3>

<h4>10 Shvat: Passing of the Rebbe Rayatz and the Beginning of New Leadership</h4>
<p>10 Shvat 5710 (1950) is the day of passing of the sixth Lubavitcher Rebbe, Rabbi Yosef Yitzchak (the Rebbe Rayatz). Exactly one year later, on 10 Shvat 5711 (1951), his son-in-law, Rabbi Menachem Mendel, assumed leadership of the movement, delivering the famous maamar "Basi Legani" ("I have come into My garden"). This maamar, based on the final teaching of the Rebbe Rayatz, proclaimed the mission of the seventh generation: to make this world a dwelling place for G-d. "Basi Legani" became the programmatic document for all of the Rebbe's activities — from mitzvah campaigns to sending shluchim (emissaries) throughout the world.</p>

<h4>22 Shvat: Passing of Rebbetzin Chaya Mushka — Ahavat Yisrael</h4>
<p>On 22 Shvat 5748 (1988), Rebbetzin Chaya Mushka, the Rebbe's wife, passed away. Her life was an embodiment of modesty and love for every Jew. After her passing, the Rebbe established many institutions in her honor, and her name became a symbol of ahavat Yisrael — unconditional love for every Jew. The Rebbetzin always said: "I do not belong to myself — I belong to the Chassidim." These words reflect the essence of her service: complete self-sacrifice for the Jewish people.</p>

<h3>Adar: Joy and New Beginning</h3>

<h4>9 Adar: Arrival of the Rebbe Rayatz in America</h4>
<p>On 9 Adar 5700 (1940), the Rebbe Rayatz, rescued from war-torn Europe, arrived in America. His famous words "America iz nisht andersh" — "America is no different" — overturned the notion that in the New World it was impossible to live a full Jewish life. The Rebbe Rayatz declared that Torah and mitzvot are obligatory everywhere, and America is no exception to this rule. These words proved prophetic: it was America that became the world center of Torah and Chassidism, vindicating the Rebbe Rayatz's faith in the spiritual potential of this country.</p>

<h4>25 Adar: Birthday of Rebbetzin Chaya Mushka — Jewish Birthday Campaign</h4>
<p>25 Adar is the birthday of Rebbetzin Chaya Mushka. In connection with this date, the Rebbe initiated the "Jewish Birthday" campaign, calling on every Jew to celebrate their birthday according to the Jewish calendar with special spiritual actions: increased Torah study, additional tzedakah (charity), and making new spiritual resolutions. The Rebbe explained that a birthday is a day when a person's "mazal" (spiritual fortune) is especially strong, and on this day their prayers and resolutions carry special power. The Jewish Birthday campaign became one of many of the Rebbe's initiatives aimed at strengthening Jewish identity and every Jew's connection to their roots.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'shpalerka-spirit',
    slug: 'dukh-nad-materiyey-rebe-rayats-v-shpalerke',
    title: {
      ru: 'Дух над материей: Ребе Раяц в Шпалерке',
      en: 'Spirit Over Matter: The Rebbe Rayatz in Shpalernaya Prison',
      he: 'רוח מעל חומר: הרבי ריי"צ בשפלרקה',
      uk: 'Дух над матерією: Ребе Раяц у Шпалерці',
    },
    subtitle: {
      ru: 'Высший пример месирус нефеш в современной истории',
      en: 'The supreme example of mesirus nefesh in modern history',
      he: 'הדוגמה העליונה למסירות נפש בהיסטוריה המודרנית',
      uk: 'Вищий приклад месірус нефеш у сучасній історії',
    },
    content: {
      ru: `<p>В полночь 15 Сивана 5687 (1927) года агенты ГПУ ворвались в дом шестого Любавичского Ребе — Ребе Йосефа-Ицхака Шнеерсона (Ребе Раяца) — и арестовали его. Ему был вынесен смертный приговор, который позже заменили ссылкой. Однако даже в застенках Шпалерной тюрьмы Ребе проявил сверхчеловеческое спокойствие, произнеся слова, ставшие девизом поколений: «Только тела в изгнании, но не души».</p>

<h3>Голодовка ради тфилин</h3>
<p>Оказавшись в камере, Ребе Раяц немедленно объявил голодовку, требуя возвращения своих тфилин. Тюремное начальство, привыкшее ломать волю заключённых, столкнулось с непреклонностью человека, для которого связь с Б-гом была важнее физического выживания. В конце концов тфилин были возвращены. Ребе отказывался от прогулок в тюремном дворе, не желая подчиняться распорядку, навязанному врагами Торы.</p>

<h3>Фотографы и маамарим</h3>
<p>Когда тюремные власти прислали фотографов для создания «дела», Ребе решительно остановил их, не позволив сделать ни одного снимка на их условиях. Даже в заключении он продолжал писать хасидские маамарим (глубокие учения), превращая камеру в место распространения света Торы. Каждое его действие было актом духовного сопротивления.</p>

<h3>Освобождение: победа для каждого еврея</h3>
<p>3 Тамуза Ребе был освобождён из тюрьмы, а 12–13 Тамуза — полностью освобождён из ссылки. Эта дата стала символом победы духа над материей, веры над тиранией. Ребе Раяц позже объяснил, что его освобождение было не личной победой, а победой для каждого еврея — доказательством того, что никакая земная сила не может подавить еврейскую душу и её связь с Б-гом.</p>`,

      en: `<p>At midnight on 15 Sivan 5687 (1927), GPU agents burst into the home of the sixth Lubavitcher Rebbe — Rabbi Yosef Yitzchak Schneersohn (the Rebbe Rayatz) — and arrested him. He was sentenced to death, later commuted to exile. Yet even within the walls of Shpalernaya Prison, the Rebbe displayed superhuman calm, uttering words that became a motto for generations: "Only bodies are in exile, not souls."</p>

<h3>Hunger Strike for Tefillin</h3>
<p>Finding himself in a cell, the Rebbe Rayatz immediately declared a hunger strike, demanding the return of his tefillin. The prison authorities, accustomed to breaking prisoners' wills, faced the resolve of a man for whom connection to God was more important than physical survival. Eventually the tefillin were returned. The Rebbe refused to take walks in the prison yard, unwilling to submit to a routine imposed by enemies of Torah.</p>

<h3>Photographers and Maamarim</h3>
<p>When prison authorities sent photographers to create a "case file," the Rebbe firmly stopped them, refusing to allow a single photograph on their terms. Even in confinement he continued writing Chassidic maamarim (profound teachings), transforming his cell into a place for spreading the light of Torah. Every action he took was an act of spiritual resistance.</p>

<h3>Liberation: A Victory for Every Jew</h3>
<p>On 3 Tammuz the Rebbe was released from prison, and on 12–13 Tammuz he was fully freed from exile. This date became a symbol of the triumph of spirit over matter, of faith over tyranny. The Rebbe Rayatz later explained that his liberation was not a personal victory but a victory for every Jew — proof that no earthly power can suppress a Jewish soul and its bond with God.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'rebbetzin-chana-heroism',
    slug: 'rebetsn-khana-geroizm-9-nissana-i-spaseniye-naslediya',
    title: {
      ru: 'Ребецн Хана: Героизм 9 ниссана и спасение наследия',
      en: 'Rebbetzin Chana: The Heroism of 9 Nissan and Saving the Legacy',
      he: 'הרבנית חנה: גבורת ט\' ניסן והצלת המורשת',
      uk: 'Ребецн Хана: Героїзм 9 ніссана і порятунок спадщини',
    },
    subtitle: {
      ru: 'Чернила из ягод и тайный вывоз рукописей из СССР',
      en: 'Ink from berries and the secret smuggling of manuscripts out of the USSR',
      he: 'דיו מפירות יער והברחת כתבי יד חשאית מברית המועצות',
      uk: 'Чорнило з ягід і таємне вивезення рукописів із СРСР',
    },
    content: {
      ru: `<p>9 Ниссана 5699 (1939) года агенты НКВД ворвались в дом рабби Леви-Ицхака Шнеерсона — отца будущего седьмого Ребе — в Днепропетровске. Обыск продолжался девять часов. Рядом с мужем всё это время стояла ребецн Хана — женщина, чей героизм навсегда изменил ход еврейской истории.</p>

<h3>Ссылка в Чиили: чернила из ягод и трав</h3>
<p>После ареста рабби Леви-Ицхака сослали в отдалённый казахстанский город Чиили. Ребецн Хана последовала за мужем, оставив всё, чтобы быть рядом с ним. В ссылке рабби Леви-Ицхак продолжал записывать глубочайшие хасидские учения, но у него не было чернил. Тогда ребецн Хана начала изготавливать чернила собственными руками — из лесных ягод и трав, которые она собирала в степи. Каждая капля этих чернил была актом месирус нефеш — самопожертвования ради сохранения Торы.</p>

<h3>Смерть мужа и невыполнимая миссия</h3>
<p>20 Ава 5704 (1944) года рабби Леви-Ицхак скончался в Алма-Ате, подорванный годами ссылки. Однако ребецн Хана не сломалась. Она приняла на себя миссию, казавшуюся невыполнимой: сохранить и тайно вывезти из СССР рукописи мужа — бесценное наследие хасидской мысли.</p>

<h3>Спасение рукописей</h3>
<p>С невероятной отвагой и изобретательностью ребецн Хана организовала тайный вывоз рукописей из Советского Союза. Эти записи, сделанные чернилами из ягод, впоследствии были изданы как «Ликутей Леви-Ицхак» и стали одним из важнейших источников хасидской каббалистической мысли. Благодаря мужеству одной женщины, целое духовное наследие было спасено от уничтожения и передано будущим поколениям.</p>`,

      en: `<p>On 9 Nissan 5699 (1939), NKVD agents burst into the home of Rabbi Levi Yitzchak Schneerson — father of the future seventh Rebbe — in Dnepropetrovsk. The search lasted nine hours. Standing beside her husband throughout was Rebbetzin Chana — a woman whose heroism would forever alter the course of Jewish history.</p>

<h3>Exile in Chiili: Ink from Berries and Herbs</h3>
<p>After Rabbi Levi Yitzchak's arrest, he was exiled to the remote Kazakh town of Chiili. Rebbetzin Chana followed her husband, leaving everything behind to be at his side. In exile, Rabbi Levi Yitzchak continued recording profound Chassidic teachings, but he had no ink. So Rebbetzin Chana began making ink with her own hands — from wild berries and herbs she gathered on the steppe. Every drop of that ink was an act of mesirus nefesh — self-sacrifice for the preservation of Torah.</p>

<h3>Her Husband's Death and an Impossible Mission</h3>
<p>On 20 Av 5704 (1944), Rabbi Levi Yitzchak passed away in Alma-Ata, his health broken by years of exile. But Rebbetzin Chana did not break. She took upon herself a seemingly impossible mission: to preserve and secretly smuggle her husband's manuscripts out of the USSR — a priceless heritage of Chassidic thought.</p>

<h3>Saving the Manuscripts</h3>
<p>With incredible courage and ingenuity, Rebbetzin Chana organized the clandestine removal of the manuscripts from the Soviet Union. These writings, penned in ink made from berries, were subsequently published as "Likkutei Levi Yitzchak" and became one of the most important sources of Chassidic Kabbalistic thought. Thanks to the bravery of one woman, an entire spiritual legacy was saved from destruction and transmitted to future generations.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-annual-lessons',
    slug: 'dukhovnyye-uroki-nissana-sushchnost-i-deystviye-v2',
    title: {
      ru: 'Духовные уроки Ниссана: Сущность и действие',
      en: 'Spiritual Lessons of Nissan: Essence and Action',
      he: 'לקחים רוחניים של ניסן: מהות ומעשה',
      uk: 'Духовні уроки Ніссана: Сутність і дія',
    },
    subtitle: {
      ru: 'Три направления духовной работы в месяце Ниссан',
      en: 'Three directions of spiritual work in the month of Nissan',
      he: 'שלושה כיוונים של עבודה רוחנית בחודש ניסן',
      uk: 'Три напрямки духовної роботи в місяці Ніссан',
    },
    content: {
      ru: `<p>Месяц Ниссан в хасидском календаре — это не только время Песаха. Три ключевые даты этого месяца раскрывают три фундаментальных направления духовной работы, актуальных для каждого еврея в любое время года.</p>

<h3>2 Ниссана: Вечная связь через рукописи Ребе Рашаба</h3>
<p>2 Ниссана 5680 (1920) года — день, когда пятый Любавичский Ребе, Ребе Рашаб (рабби Шалом-ДовБер), покинул этот мир. Однако его уход стал не концом, а началом новой формы связи. Рукописи Ребе Рашаба — сотни глубочайших маамарим и писем — стали живым каналом, через который его учение продолжает вдохновлять поколения хасидов. Урок 2 Ниссана: духовная связь с цадиком не прерывается — она усиливается через изучение его Торы.</p>

<h3>11 Ниссана: Образование — нравственность и связь с Творцом</h3>
<p>11 Ниссана 5662 (1902) года родился седьмой Любавичский Ребе — рабби Менахем-Мендл Шнеерсон. Одним из центральных направлений его деятельности стало образование. Ребе подчёркивал, что истинное образование — это не просто передача знаний, а воспитание нравственности и формирование связи с Б-гом. «Образование без морали — это меч в руках безумца», — учил Ребе. Урок 11 Ниссана: каждый еврей обязан не только учиться сам, но и обучать других, создавая поколение, связанное с Творцом.</p>

<h3>13 Ниссана: «Трахт гут — вет зайн гут» — битахон меняет реальность</h3>
<p>13 Ниссана 5603 (1843) года — день гистолкус Цемах Цедека, третьего Любавичского Ребе. Одно из самых известных его высказываний — «Трахт гут — вет зайн гут» («Думай хорошо — и будет хорошо»). Это не просто оптимизм — это духовный закон: искренний битахон (упование на Б-га) буквально меняет реальность. Когда человек по-настоящему верит, что Б-г пошлёт добро, эта вера становится сосудом для божественного благословения. Урок 13 Ниссана: мысль — не абстракция, а инструмент, формирующий действительность.</p>`,

      en: `<p>The month of Nissan in the Chassidic calendar is not only the time of Pesach. Three key dates of this month reveal three fundamental directions of spiritual work, relevant to every Jew at any time of year.</p>

<h3>2 Nissan: Eternal Connection Through the Manuscripts of the Rebbe Rashab</h3>
<p>On 2 Nissan 5680 (1920), the fifth Lubavitcher Rebbe, the Rebbe Rashab (Rabbi Shalom DovBer), departed this world. However, his passing became not an end but the beginning of a new form of connection. The Rebbe Rashab's manuscripts — hundreds of profound maamarim and letters — became a living channel through which his teaching continues to inspire generations of Chassidim. The lesson of 2 Nissan: the spiritual bond with a tzaddik is never severed — it is strengthened through studying his Torah.</p>

<h3>11 Nissan: Education — Morality and Connection with the Creator</h3>
<p>On 11 Nissan 5662 (1902), the seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson — was born. One of the central directions of his work was education. The Rebbe emphasized that true education is not merely the transmission of knowledge but the cultivation of morality and the formation of a bond with God. "Education without morality is a sword in the hands of a madman," the Rebbe taught. The lesson of 11 Nissan: every Jew is obligated not only to study but to teach others, creating a generation connected to the Creator.</p>

<h3>13 Nissan: "Tracht Gut — Vet Zain Gut" — Bitachon Changes Reality</h3>
<p>13 Nissan 5603 (1843) is the day of histalkus of the Tzemach Tzedek, the third Lubavitcher Rebbe. One of his most famous sayings is "Tracht gut — vet zain gut" ("Think good — and it will be good"). This is not mere optimism — it is a spiritual law: sincere bitachon (trust in God) literally changes reality. When a person truly believes that God will send good, that faith becomes a vessel for divine blessing. The lesson of 13 Nissan: thought is not an abstraction but an instrument that shapes reality.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'annual-cycle-lessons',
    slug: 'godovoy-tsikl-ot-iyara-do-shvata-uroki',
    title: {
      ru: 'Годовой цикл: От Ияра до Швата — уроки и смыслы',
      en: 'The Annual Cycle: From Iyar to Shvat — Lessons and Meanings',
      he: 'המחזור השנתי: מאייר ועד שבט — לקחים ומשמעויות',
      uk: 'Річний цикл: Від Іяра до Швата — уроки та смисли',
    },
    subtitle: {
      ru: 'Каждая дата — живой источник энергии для служения',
      en: 'Every date is a living source of energy for divine service',
      he: 'כל תאריך הוא מקור חי של אנרגיה לעבודת ה\'',
      uk: 'Кожна дата — живе джерело енергії для служіння',
    },
    content: {
      ru: `<p>Хасидский календарь — это не просто список памятных дат. Каждый месяц несёт уникальную духовную энергию, и задача еврея — раскрыть её и применить в своём служении Б-гу. Вот ключевые уроки от Ияра до Швата.</p>

<h3>Ияр: «Лехатхила арибер» — с самого начала через преграду</h3>
<p>Месяц Ияр связан с учением Ребе Махараша (четвёртого Любавичского Ребе): «Мир говорит: если не можешь пройти снизу — перелезь сверху. А я говорю: с самого начала — сверху!» Этот принцип «лехатхила арибер» учит не искать обходные пути перед препятствиями, а сразу подниматься выше них. В духовной работе это означает: не бороться с тьмой на её уровне, а подниматься на уровень, где тьма не существует.</p>

<h3>Сиван: 28 Сивана — трансформация</h3>
<p>28 Сивана 5701 (1941) года Ребе и ребецн Хая-Мушка прибыли в Америку, спасшись из охваченной войной Европы. Этот день стал поворотным моментом — началом трансформации Америки из духовной пустыни в мировой центр Торы и хасидизма. Урок: даже самое тёмное место может стать источником величайшего света.</p>

<h3>Тамуз: Выше природы</h3>
<p>Освобождение Ребе Раяца 12–13 Тамуза — урок о том, что еврей может действовать выше законов природы. Когда человек полностью предан Б-гу, Б-г действует для него за пределами естественного порядка вещей.</p>

<h3>Менахем-Ав: 40 дней до Рош а-Шана</h3>
<p>Менахем-Ав — месяц утешения. За сорок дней до Рош а-Шана (то есть с 20 Ава) начинается период подготовки к новому году. Ребе учил, что именно из глубины разрушения (9 Ава) рождается величайшее утешение и обновление.</p>

<h3>Элул: Хай Элул — два светила</h3>
<p>18 Элула — день рождения двух великих светил: основателя хасидизма Бааль-Шем-Това (5458/1698) и основателя Хабада Алтер Ребе (5505/1745). Этот день вносит «жизненность» (хайус) во всю духовную работу месяца Элул — месяца подготовки к Рош а-Шана.</p>

<h3>Кислев: 19 Кислева — распространяй наружу</h3>
<p>19 Кислева — «Рош а-Шана хасидизма», день освобождения Алтер Ребе из Петропавловской крепости. Главный урок: учение хасидизма должно распространяться «наружу» — доходить до каждого еврея, даже самого далёкого.</p>

<h3>Тевес: «Дидан ноцах» — наша победа</h3>
<p>5 Тевеса 5747 (1987) года — день, когда суд постановил, что библиотека Ребе принадлежит хасидам. «Дидан ноцах» («наша победа») стал символом того, что святые книги и учения неразрывно связаны с общиной, которая ими живёт.</p>

<h3>Шват: «Баси легани» — миссия</h3>
<p>10 Швата 5710 (1950) года — день гистолкус шестого Ребе и начала руководства седьмого Ребе. Маамар «Баси легани» («Я вошёл в Мой сад») стал программным документом: задача нашего поколения — сделать этот нижний мир жилищем для Б-га, завершив миссию, начатую Авраамом.</p>`,

      en: `<p>The Chassidic calendar is not merely a list of commemorative dates. Each month carries unique spiritual energy, and a Jew's task is to reveal it and apply it in their service of God. Here are the key lessons from Iyar to Shvat.</p>

<h3>Iyar: "Lechatchila Ariber" — From the Very Start, Over the Obstacle</h3>
<p>The month of Iyar is linked to the teaching of the Rebbe Maharash (the fourth Lubavitcher Rebbe): "The world says: if you cannot go under, climb over. But I say: from the very start — go over!" This principle of "lechatchila ariber" teaches us not to seek roundabout ways before obstacles but to rise above them immediately. In spiritual work this means: do not fight darkness on its level but ascend to a level where darkness does not exist.</p>

<h3>Sivan: 28 Sivan — Transformation</h3>
<p>On 28 Sivan 5701 (1941), the Rebbe and Rebbetzin Chaya Mushka arrived in America, having escaped war-torn Europe. This day became a turning point — the beginning of America's transformation from a spiritual wasteland into the world center of Torah and Chassidism. The lesson: even the darkest place can become a source of the greatest light.</p>

<h3>Tammuz: Above Nature</h3>
<p>The liberation of the Rebbe Rayatz on 12–13 Tammuz is a lesson that a Jew can act above the laws of nature. When a person is completely devoted to God, God acts for them beyond the natural order of things.</p>

<h3>Menachem-Av: 40 Days Before Rosh Hashanah</h3>
<p>Menachem-Av is the month of consolation. Forty days before Rosh Hashanah (that is, from 20 Av), the period of preparation for the new year begins. The Rebbe taught that it is precisely from the depth of destruction (9 Av) that the greatest consolation and renewal are born.</p>

<h3>Elul: Chai Elul — Two Luminaries</h3>
<p>18 Elul is the birthday of two great luminaries: the founder of Chassidism, the Baal Shem Tov (5458/1698), and the founder of Chabad, the Alter Rebbe (5505/1745). This day infuses "vitality" (chayus) into all the spiritual work of the month of Elul — the month of preparation for Rosh Hashanah.</p>

<h3>Kislev: 19 Kislev — Spread Outward</h3>
<p>19 Kislev is the "Rosh Hashanah of Chassidism," the day the Alter Rebbe was liberated from the Peter-Paul Fortress. The main lesson: the teachings of Chassidism must be spread "outward" — reaching every Jew, even the most distant.</p>

<h3>Tevet: "Didan Notzach" — Our Victory</h3>
<p>On 5 Tevet 5747 (1987), the court ruled that the Rebbe's library belongs to the Chassidim. "Didan Notzach" ("our victory") became a symbol that holy books and teachings are inseparably bound to the community that lives by them.</p>

<h3>Shvat: "Basi Legani" — The Mission</h3>
<p>On 10 Shvat 5710 (1950), the sixth Rebbe passed away and the seventh Rebbe's leadership began. The maamar "Basi Legani" ("I have come into My garden") became the defining document: our generation's task is to make this lowest world a dwelling place for God, completing the mission begun by Abraham.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'adar-month',
    slug: 'adar-mesyats-prevrashcheniya-tmy-v-svet',
    hebrewDate: { month: 'Adar', day: 1 },
    monthIntro: {
      ru: 'Адар: Месяц превращения тьмы в свет. Не только Пурим, но и «завоевание» Америки для Торы.',
      en: 'Adar: Month of Turning Darkness into Light. Not just Purim, but the "conquest" of America for Torah.',
    },
    title: {
      ru: 'Адар: Месяц превращения тьмы в свет',
      en: 'Adar: The Month of Turning Darkness into Light',
      he: 'אדר: חודש הפיכת החושך לאור',
      uk: 'Адар: Місяць перетворення темряви на світло',
    },
    subtitle: {
      ru: '«Америка ничем не отличается» и кампания Еврейского дня рождения',
      en: '"America Is No Different" and the Jewish Birthday Campaign',
      he: '״אמריקה לא שונה״ ומבצע יום הולדת יהודי',
      uk: '«Америка нічим не відрізняється» і кампанія Єврейського дня народження',
    },
    content: {
      ru: `<p>Месяц Адар в хасидском календаре — это время радости, превращения тьмы в свет и торжества веры над отчаянием. Но помимо Пурима, Адар хранит ещё множество дат, каждая из которых несёт уникальный духовный урок.</p>

<h3>9 Адара: Ребе Раяц прибывает в Америку (5700/1940)</h3>
<p>9 Адара 5700 (1940) года шестой Любавичский Ребе — Ребе Раяц — ступил на американскую землю, спасённый из охваченной войной Европы. Его знаменитые слова «Америка из ништ андерш» («Америка ничем не отличается») перевернули представление о том, что в Новом Свете невозможно жить полноценной еврейской жизнью. Ребе Раяц заявил, что Тора и мицвот обязательны повсюду, и Америка — не исключение. Эти слова оказались пророческими: именно Америка стала мировым центром Торы и хасидизма.</p>

<h3>16 Адара: Получение гражданства (5709/1949)</h3>
<p>16 Адара 5709 (1949) года Ребе Раяц получил американское гражданство. Этот акт имел не только юридическое, но и духовное значение: он символизировал окончательное укоренение хасидизма на американском континенте и утверждение того, что Тора может процветать в любой стране, если евреи хранят верность своему наследию.</p>

<h3>25 Адара: День рождения Ребецн Хаи-Мушки — Мивца Йом Уледет</h3>
<p>25 Адара — день рождения ребецн Хаи-Мушки, супруги Ребе. Согласно хасидскому учению, мир был задуман Б-гом 25 Адара — именно в этот день возникла мысль о творении. В связи с этой датой Ребе инициировал «Мивца Йом Уледет» — кампанию Еврейского дня рождения, призывая каждого еврея отмечать свой день рождения по еврейскому календарю особыми духовными действиями: усиленным изучением Торы, дополнительной цдакой (благотворительностью) и принятием новых духовных решений. Ребе объяснял, что в день рождения «мазаль» (духовная удача) человека особенно силён.</p>

<h3>2 Адара: Ребецн Штерна-Сара</h3>
<p>2 Адара — день памяти ребецн Штерны-Сары, жены Ребе Рашаба и матери Ребе Раяца. Её жизнь была примером беззаветной преданности делу хасидизма и поддержки мужа в его духовной миссии.</p>

<h3>7 Адара: Рождение и уход Моше Рабейну</h3>
<p>7 Адара — день рождения и день ухода из этого мира Моше Рабейну (Моисея). Мидраш учит, что Б-г восполняет годы праведников до полного числа, и поэтому Моше родился и ушёл в один и тот же день. Этот день напоминает о том, что истинный лидер — это тот, кто полностью посвящает свою жизнь своему народу.</p>

<h3>27 Адар I: Инсульт Ребе (5752/1992)</h3>
<p>27 Адар I 5752 (1992) года Ребе перенёс инсульт во время молитвы у Оэля (места упокоения Ребе Раяца). Это событие стало поворотным моментом в истории Хабада и напомнило хасидам о необходимости усилить свою духовную работу, чтобы приблизить приход Мошиаха — конечную цель всего творения.</p>`,

      en: `<p>The month of Adar in the Chassidic calendar is a time of joy, of turning darkness into light, and of the triumph of faith over despair. But beyond Purim, Adar holds many more dates, each carrying a unique spiritual lesson.</p>

<h3>9 Adar: The Rebbe Rayatz Arrives in America (5700/1940)</h3>
<p>On 9 Adar 5700 (1940), the sixth Lubavitcher Rebbe — the Rebbe Rayatz — set foot on American soil, having been rescued from war-torn Europe. His famous words "America iz nisht andersh" ("America is no different") overturned the notion that it was impossible to live a full Jewish life in the New World. The Rebbe Rayatz declared that Torah and mitzvot are obligatory everywhere, and America is no exception. These words proved prophetic: it was America that became the world center of Torah and Chassidism.</p>

<h3>16 Adar: Receiving Citizenship (5709/1949)</h3>
<p>On 16 Adar 5709 (1949), the Rebbe Rayatz received American citizenship. This act held not only legal but also spiritual significance: it symbolized the final rooting of Chassidism on the American continent and affirmed that Torah can flourish in any country if Jews remain faithful to their heritage.</p>

<h3>25 Adar: Rebbetzin Chaya Mushka's Birthday — Mivtza Yom Huledes</h3>
<p>25 Adar is the birthday of Rebbetzin Chaya Mushka, the Rebbe's wife. According to Chassidic teaching, the world was conceived by God on 25 Adar — it was on this day that the thought of creation arose. In connection with this date, the Rebbe initiated "Mivtza Yom Huledes" — the Jewish Birthday Campaign, calling on every Jew to celebrate their birthday according to the Jewish calendar with special spiritual actions: increased Torah study, additional tzedakah (charity), and making new spiritual resolutions. The Rebbe explained that on one's birthday, a person's "mazal" (spiritual fortune) is especially strong.</p>

<h3>2 Adar: Rebbetzin Shterna Sara</h3>
<p>2 Adar is the yahrzeit of Rebbetzin Shterna Sara, wife of the Rebbe Rashab and mother of the Rebbe Rayatz. Her life was an example of selfless devotion to the cause of Chassidism and support of her husband in his spiritual mission.</p>

<h3>7 Adar: Birth and Passing of Moshe Rabbeinu</h3>
<p>7 Adar is both the birthday and the day of passing of Moshe Rabbeinu (Moses). The Midrash teaches that God completes the years of the righteous to a full count, and therefore Moses was born and passed away on the same day. This day serves as a reminder that a true leader is one who completely devotes their life to their people.</p>

<h3>27 Adar I: The Rebbe's Stroke (5752/1992)</h3>
<p>On 27 Adar I 5752 (1992), the Rebbe suffered a stroke during prayer at the Ohel (the resting place of the Rebbe Rayatz). This event became a turning point in the history of Chabad and reminded Chassidim of the need to intensify their spiritual work to hasten the coming of Moshiach — the ultimate purpose of all creation.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'cheshvan-month',
    slug: 'markheshvan-rozhdeniye-svetilnika',
    hebrewDate: { month: 'Cheshvan', day: 20 },
    monthIntro: {
      ru: 'Мархешван: Месяц без праздников, наполненный светом рождения Ребе Рашаба.',
      en: 'Marcheshvan: Month without holidays, filled with the light of the Rebbe Rashab\'s birth.',
    },
    title: {
      ru: 'Мархешван: Рождение «Светильника» и Мастерство Воспитания',
      en: 'Marcheshvan: The Birth of the "Luminary" and the Mastery of Education',
      he: 'מרחשוון: לידת ה״מאור״ ואומנות החינוך',
      uk: 'Мархешван: Народження «Світильника» і Майстерність Виховання',
    },
    subtitle: {
      ru: 'Пророческий сон, рождение Ребе Рашаба и основание Томхей Тмимим',
      en: 'A prophetic dream, the birth of the Rebbe Rashab, and the founding of Tomchei Temimim',
      he: 'חלום נבואי, לידת הרבי הרש"ב וייסוד תומכי תמימים',
      uk: 'Пророчий сон, народження Ребе Рашаба і заснування Томхей Тмімім',
    },
    content: {
      ru: `<p>Месяц Мархешван — единственный месяц еврейского календаря, в котором нет ни одного праздника. Однако именно эта «пустота» наполнена глубочайшим смыслом: 20 Мархешвана родился пятый Любавичский Ребе — Ребе Рашаб (рабби Шалом-ДовБер Шнеерсон), «светильник», озаривший поколения.</p>

<h3>Пророческий сон ребецн Ривки</h3>
<p>Перед рождением Ребе Рашаба его бабушке, ребецн Ривке, явился во сне Мителер Ребе (второй Любавичский Ребе). Он повелел написать свиток Торы в честь будущего ребёнка. Этот пророческий сон указывал на особую миссию мальчика, который должен был родиться: стать мостом между сокровенным учением хасидизма и системой образования, способной передать это учение будущим поколениям.</p>

<h3>Рождение 20 Мархешвана 5621 (1860)</h3>
<p>Ребе Рашаб родился 20 Мархешвана 5621 (1860) года. Его имя — Шалом-ДовБер — несёт глубокий символизм: «Шалом» (мир) и «ДовБер» (медведь) — синтез святого и будничного, духовного и материального. Ребе Рашаб посвятил свою жизнь тому, чтобы показать, как самые глубокие каббалистические истины могут быть применены в повседневной жизни каждого еврея.</p>

<h3>Основание Томхей Тмимим</h3>
<p>Величайшим деянием Ребе Рашаба стало основание ешивы «Томхей Тмимим» в 5657 (1897) году. Это была не просто ешива — это была революция в еврейском образовании. Ребе Рашаб создал интеллектуальную систему, в которой изучение нигле (открытой части Торы) и хасидус (внутренней части Торы) были объединены в единое целое. Учеников он называл «тмимим» — «цельные», подчёркивая, что истинная целостность достигается только при соединении разума и сердца.</p>

<h3>«Нейрот леаир» — светильники для освещения</h3>
<p>Ребе Рашаб называл своих учеников «нейрот леаир» — «светильниками для освещения». Каждый выпускник Томхей Тмимим должен был стать не просто учёным, а источником света для окружающих. Этот принцип стал фундаментом всей системы хасидского образования Хабада и продолжает действовать по сей день: каждый хасид — это светильник, несущий свет Б-жественной мудрости в мир.</p>`,

      en: `<p>The month of Marcheshvan is the only month in the Jewish calendar without a single holiday. Yet it is precisely this "emptiness" that is filled with the deepest meaning: on 20 Marcheshvan, the fifth Lubavitcher Rebbe was born — the Rebbe Rashab (Rabbi Shalom DovBer Schneersohn), the "luminary" who illuminated generations.</p>

<h3>The Prophetic Dream of Rebbetzin Rivka</h3>
<p>Before the Rebbe Rashab's birth, his grandmother, Rebbetzin Rivka, was visited in a dream by the Mitteler Rebbe (the second Lubavitcher Rebbe). He commanded that a Torah scroll be written in honor of the child to be born. This prophetic dream pointed to the special mission of the boy who was about to be born: to become a bridge between the hidden teachings of Chassidism and an educational system capable of transmitting those teachings to future generations.</p>

<h3>Birth on 20 Marcheshvan 5621 (1860)</h3>
<p>The Rebbe Rashab was born on 20 Marcheshvan 5621 (1860). His name — Shalom DovBer — carries deep symbolism: "Shalom" (peace) and "DovBer" (bear) — a synthesis of the holy and the mundane, the spiritual and the material. The Rebbe Rashab devoted his life to showing how the deepest Kabbalistic truths can be applied in the everyday life of every Jew.</p>

<h3>The Founding of Tomchei Temimim</h3>
<p>The Rebbe Rashab's greatest achievement was the founding of the Tomchei Temimim yeshiva in 5657 (1897). This was not merely a yeshiva — it was a revolution in Jewish education. The Rebbe Rashab created an intellectual framework in which the study of nigleh (the revealed part of Torah) and Chassidus (the inner part of Torah) were united into a single whole. He called his students "temimim" — "wholesome ones" — emphasizing that true wholeness is achieved only through the union of mind and heart.</p>

<h3>"Neirot Le'air" — Lamps of Light</h3>
<p>The Rebbe Rashab called his students "neirot le'air" — "lamps for illumination." Every graduate of Tomchei Temimim was meant to become not merely a scholar but a source of light for those around them. This principle became the foundation of the entire Chabad Chassidic educational system and continues to this day: every Chassid is a lamp carrying the light of divine wisdom into the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'kislev-detailed',
    slug: 'kislev-mesyats-osvobozhdeniya-i-sveta-podrobno',
    title: {
      ru: 'Кислев: Месяц Освобождения и Света',
      en: 'Kislev: The Month of Liberation and Light',
      he: 'כסלו: חודש הגאולה והאור',
      uk: 'Кіслев: Місяць Визволення і Світла',
    },
    subtitle: {
      ru: 'Рош а-Шана хасидизма и золотая цепь поколений',
      en: 'Rosh Hashanah of Chassidism and the golden chain of generations',
      he: 'ראש השנה לחסידות ושלשלת הזהב של הדורות',
      uk: 'Рош а-Шана хасидизму і золотий ланцюг поколінь',
    },
    content: {
      ru: `<p>Месяц Кислев в хасидском календаре — это месяц освобождения и распространения света. Три ключевые даты этого месяца образуют золотую цепь, связывающую поколения хасидских лидеров.</p>

<h3>9–10 Кислева: Мителер Ребе — рождение, уход и освобождение</h3>
<p>9 Кислева — день рождения и одновременно день гистолкус (ухода) второго Любавичского Ребе, Мителер Ребе (рабби Дов-Бер Шнеури), а также день его освобождения из заключения. Мителер Ребе был известен своим «широким подходом» к хасидскому учению — его труд «Реховот а-Наар» («Широкие реки») олицетворяет принцип раскрытия глубочайших тайн Торы в доступной и расширенной форме. Если Алтер Ребе сжимал бесконечность в каплю, то Мителер Ребе разворачивал каплю обратно в океан.</p>

<h3>14 Кислева: Свадьба Ребе (5689/1928)</h3>
<p>14 Кислева 5689 (1928) года состоялась свадьба будущего седьмого Любавичского Ребе — рабби Менахем-Мендла Шнеерсона — с ребецн Хаей-Мушкой, дочерью Ребе Раяца. На этой свадьбе присутствовали три поколения Ребе: Ребе Рашаб (дедушка невесты по отцу, духовно), Ребе Раяц (отец невесты) и будущий седьмой Ребе. Ребе Раяц произнёс: «Этот день связал меня с вами, а вас — со мной». Эти слова стали символом неразрывной связи между Ребе и хасидами — связи, которая выходит за рамки времени и пространства.</p>

<h3>19–20 Кислева: Освобождение Алтер Ребе — Рош а-Шана хасидизма</h3>
<p>19 Кислева 5559 (1798) года первый Любавичский Ребе — Алтер Ребе (рабби Шнеур-Залман из Ляд) — был освобождён из Петропавловской крепости в Санкт-Петербурге. Он был арестован по доносу противников хасидизма, обвинявших его в государственной измене. В заключении Алтер Ребе удостоился видения Бааль-Шем-Това и Магида из Межерича, которые подтвердили, что его арест был отражением небесного суда над самим учением хасидизма.</p>

<p>Освобождение стало знаком свыше: учение хасидизма должно распространяться ещё шире. После освобождения Алтер Ребе написал знаменитое письмо «Катонти» («Я стал мал»), в котором выразил смирение перед величием Б-жественной милости и призвал хасидов к усиленному распространению учения.</p>

<p>С тех пор 19 Кислева стал «Рош а-Шана хасидизма» — днём, когда обновляется и усиливается поток хасидской мудрости в мир. В этот день принято устраивать «Халукас а-Шас» — распределение трактатов Талмуда между членами общины, чтобы весь Талмуд был изучен коллективно в течение года. Главный урок 19 Кислева: «Яфуцу маайанотеха хуца» — «Пусть распространятся твои источники наружу» — учение хасидизма должно доходить до каждого еврея, даже самого далёкого.</p>`,

      en: `<p>The month of Kislev in the Chassidic calendar is a month of liberation and the spreading of light. Three key dates of this month form a golden chain linking generations of Chassidic leaders.</p>

<h3>9–10 Kislev: The Mitteler Rebbe — Birth, Passing, and Liberation</h3>
<p>9 Kislev is the birthday, the day of histalkus (passing), and the day of liberation from imprisonment of the second Lubavitcher Rebbe, the Mitteler Rebbe (Rabbi DovBer Schneuri). The Mitteler Rebbe was known for his "wide approach" to Chassidic teaching — his work "Rechovot ha-Nahar" ("Wide Rivers") embodies the principle of revealing the deepest secrets of Torah in an accessible and expansive form. If the Alter Rebbe compressed infinity into a drop, the Mitteler Rebbe unfolded that drop back into an ocean.</p>

<h3>14 Kislev: The Rebbe's Wedding (5689/1928)</h3>
<p>On 14 Kislev 5689 (1928), the wedding took place of the future seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson — to Rebbetzin Chaya Mushka, daughter of the Rebbe Rayatz. At this wedding, three generations of Rebbes were present: the Rebbe Rashab (the bride's paternal grandfather, spiritually), the Rebbe Rayatz (the bride's father), and the future seventh Rebbe. The Rebbe Rayatz declared: "This day connected me with you, and you with me." These words became a symbol of the unbreakable bond between a Rebbe and his Chassidim — a bond that transcends time and space.</p>

<h3>19–20 Kislev: Liberation of the Alter Rebbe — Rosh Hashanah of Chassidism</h3>
<p>On 19 Kislev 5559 (1798), the first Lubavitcher Rebbe — the Alter Rebbe (Rabbi Schneur Zalman of Liadi) — was liberated from the Peter-Paul Fortress in St. Petersburg. He had been arrested on denunciation by opponents of Chassidism who accused him of treason. In prison, the Alter Rebbe was granted a vision of the Baal Shem Tov and the Maggid of Mezritch, who confirmed that his arrest was a reflection of a heavenly tribunal over the very teaching of Chassidism.</p>

<p>His liberation became a sign from Above: the teachings of Chassidism must be spread even more widely. After his release, the Alter Rebbe wrote the famous letter "Katonti" ("I have become small"), expressing humility before the greatness of divine mercy and calling upon the Chassidim to intensify the dissemination of the teachings.</p>

<p>Since then, 19 Kislev has been the "Rosh Hashanah of Chassidism" — a day when the flow of Chassidic wisdom into the world is renewed and intensified. On this day it is customary to hold "Chalukas HaShas" — the distribution of Talmudic tractates among community members so that the entire Talmud is studied collectively over the course of a year. The central lesson of 19 Kislev: "Yafutzu maayonosecha chutza" — "Let your wellsprings spread outward" — the teachings of Chassidism must reach every Jew, even the most distant.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-27',
  },
  {
    id: 'nissan-iyar-chain',
    slug: 'nissan-iyar-zolotaya-tsep-pokoleniy',
    title: {
      ru: 'Ниссан — Ияр: Золотая цепь поколений и уроки лидерства',
      en: 'Nissan — Iyar: The Golden Chain of Generations and Lessons in Leadership',
      he: 'ניסן — אייר: שרשרת הזהב של הדורות ושיעורים במנהיגות',
      uk: 'Ніссан — Іяр: Золотий ланцюг поколінь та уроки лідерства',
    },
    subtitle: {
      ru: 'От последних заветов Ребе Рашаба до принципа «Лехатхила арибер»',
      en: 'From the last testaments of the Rebbe Rashab to the principle of "Lechatchila Ariber"',
      he: 'מצוואותיו האחרונות של הרבי הרש\"ב ועד העיקרון של \"לכתחילה אריבער\"',
      uk: 'Від останніх заповітів Ребе Рашаба до принципу «Лехатхіла арібер»',
    },
    content: {
      ru: `<h3>2 Ниссана — Уход Ребе Рашаба (5680/1920)</h3>
<p>Второго Ниссана 5680 года (1920) в Ростове-на-Дону покинул этот мир пятый Любавичский Ребе — Ребе Рашаб (рабби Шалом Дов-Бер Шнеерсон). Перед уходом он произнёс знаменитые слова: «Я ухожу на небо, а рукописи оставляю вам». Подобно тому как Всевышний вложил Свою сущность в буквы Торы, Ребе Рашаб вложил свою душу в свои хасидские труды — тысячи страниц маамарим и писем. Его уход ознаменовал начало лидерства его сына — Ребе Раяца (рабби Йосефа-Ицхака), которому предстояло возглавить хасидов в тяжелейших условиях советских преследований, когда за обучение Торе грозила тюрьма или ссылка. Именно в этом горниле рождалось то самоотверженное лидерство, которое позже спасло еврейскую жизнь в СССР.</p>

<h3>11 Ниссана — Рождение Седьмого Ребе (5662/1902)</h3>
<p>Одиннадцатого Ниссана 5662 года (1902) в городе Николаеве родился будущий Седьмой Любавичский Ребе — рабби Менахем-Мендл Шнеерсон. Ребе Рашаб, его дед, отправил по случаю рождения шесть телеграмм, выражая великую радость. Мать младенца, ребецн Хана, была настолько благочестива, что совершала нетилат ядаим (ритуальное омовение рук) перед каждым кормлением. Впоследствии 11 Ниссана был провозглашён в США «Днём образования и обмена знаниями» — в знак признания вклада Ребе в нравственное воспитание человечества. Ребе учил: истинное просвещение — это не просто передача информации, а воспитание морали и признание Творца, ибо без этого фундамента образование может стать инструментом разрушения.</p>

<h3>13 Ниссана — Цемах Цедек (5626/1866)</h3>
<p>Тринадцатого Ниссана — день памяти Третьего Любавичского Ребе, Цемах Цедека (рабби Менахем-Мендла Шнеерсона-старшего), который ушёл из жизни в 5626 году (1866). Цемах Цедек прославился бесстрашной защитой еврейского образования перед царскими властями. Он был арестован 22 раза за свою деятельность — и каждый раз выходил с победой. Его знаменитый девиз «Трахт гут вет зайн гут» («Думай хорошо — будет хорошо») стал краеугольным принципом хасидизма: битахон (упование на Б-га) не просто утешает человека, а буквально трансформирует реальность, привлекая сверху благословение.</p>

<h3>2 Ияра — Рождение Ребе Маараша (5594/1834)</h3>
<p>Второго Ияра 5594 года (1834) родился четвёртый Любавичский Ребе — Ребе Маараш (рабби Шмуэль Шнеерсон). Он стал автором легендарного принципа «Лехатхила арибер» — «Изначально перепрыгивай!». Мир говорит: сначала попробуй пройти снизу, а если не получится — перелезай сверху. Ребе Маараш учил: не ищи обходных путей, а сразу прыгай через препятствие. Этот подход особенно важен в вопросах Аават Исраэль (любви к ближнему): не жди, пока другой человек «заслужит» твою любовь — люби его сразу, безусловно, лехатхила арибер.</p>`,

      en: `<h3>2 Nissan — Passing of the Rebbe Rashab (5680/1920)</h3>
<p>On the second of Nissan 5680 (1920), in Rostov-on-Don, the fifth Lubavitcher Rebbe — the Rebbe Rashab (Rabbi Shalom DovBer Schneerson) — departed from this world. Before his passing, he uttered the famous words: "I am going to heaven, and the manuscripts I leave to you." Just as the Almighty invested His essence into the letters of the Torah, the Rebbe Rashab poured his soul into his Chassidic writings — thousands of pages of maamarim and letters. His passing marked the beginning of the leadership of his son, the Rebbe Rayatz (Rabbi Yosef Yitzchak), who would lead the Chassidim through the harshest Soviet persecutions, when teaching Torah could lead to imprisonment or exile. It was in this crucible that the selfless leadership was forged which would later save Jewish life in the USSR.</p>

<h3>11 Nissan — Birth of the Seventh Rebbe (5662/1902)</h3>
<p>On the eleventh of Nissan 5662 (1902), in the city of Nikolayev, the future Seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson — was born. The Rebbe Rashab, his grandfather, sent six telegrams on the occasion of his birth, expressing great joy. The infant's mother, Rebbetzin Chana, was so pious that she performed netilat yadayim (ritual hand washing) before every feeding. Subsequently, 11 Nissan was proclaimed "Education and Sharing Day" in the United States — in recognition of the Rebbe's contribution to the moral education of humanity. The Rebbe taught: true enlightenment is not merely the transmission of information but the cultivation of morality and the recognition of the Creator, for without this foundation, education can become an instrument of destruction.</p>

<h3>13 Nissan — The Tzemach Tzedek (5626/1866)</h3>
<p>The thirteenth of Nissan marks the yahrzeit of the Third Lubavitcher Rebbe, the Tzemach Tzedek (Rabbi Menachem Mendel Schneerson the Elder), who passed away in 5626 (1866). The Tzemach Tzedek was renowned for his fearless defense of Jewish education before the Tsarist authorities. He was arrested 22 times for his activities — and emerged victorious each time. His famous motto "Tracht gut vet zain gut" ("Think good and it will be good") became a cornerstone principle of Chassidism: bitachon (trust in G-d) does not merely comfort a person but literally transforms reality, drawing down blessing from Above.</p>

<h3>2 Iyar — Birth of the Rebbe Maharash (5594/1834)</h3>
<p>On the second of Iyar 5594 (1834), the fourth Lubavitcher Rebbe — the Rebbe Maharash (Rabbi Shmuel Schneerson) — was born. He authored the legendary principle of "Lechatchila Ariber" — "From the outset, leap over!" The world says: first try to go underneath, and if that fails, climb over the top. The Rebbe Maharash taught: do not seek roundabout paths — jump over the obstacle from the very start. This approach is especially vital in matters of Ahavat Yisrael (love of one's fellow): do not wait until another person "deserves" your love — love them immediately, unconditionally, lechatchila ariber.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tammuz-av-heroism',
    slug: 'tamuz-av-podvig-very-v-zastenkakh-i-utesheniye',
    title: {
      ru: 'Тамуз и Ав: Подвиг веры в застенках НКВД и утешение в ссылке',
      en: 'Tammuz and Av: Heroism of Faith in NKVD Dungeons and Consolation in Exile',
      he: 'תמוז ואב: גבורת האמונה במרתפי ה-NKVD ונחמה בגלות',
      uk: 'Тамуз і Ав: Подвиг віри в застінках НКВД та розрада у засланні',
    },
    subtitle: {
      ru: 'Месяц Освобождения и память о рабби Леви-Ицхаке',
      en: 'Month of Liberation and the memory of Rabbi Levi Yitzchak',
      he: 'חודש הגאולה וזכרו של רבי לוי יצחק',
      uk: 'Місяць Визволення та пам\'ять про рабі Леві-Іцхака',
    },
    content: {
      ru: `<h3>15 Сивана — Арест Ребе Раяца (5687/1927)</h3>
<p>Пятнадцатого Сивана 5687 года (1927) в Ленинграде был арестован Шестой Любавичский Ребе — Ребе Раяц (рабби Йосеф-Ицхак Шнеерсон). Обвинение — поддержка подпольных еврейских школ, хедеров и микв по всему Советскому Союзу. Ребе Раяц был заключён в печально известную тюрьму Шпалерка, где ему был вынесен смертный приговор. В застенках он объявил трёхдневную голодовку, требуя вернуть ему тфилин — и добился своего. Его знаменитые слова потрясли даже следователей: «Только наши тела были отданы в изгнание... наши души не были порабощены». Эта непоколебимая вера стала символом еврейского сопротивления безбожной власти.</p>

<h3>3 Тамуза — Первое чудо</h3>
<p>Третьего Тамуза произошло первое чудо: смертный приговор Ребе Раяцу был заменён ссылкой в Кострому. Рука Б-га была видна во всём — советская машина, уничтожавшая миллионы, отступила перед одним еврейским лидером. Эта же дата — 3 Тамуза — приобрела дополнительное значение в 5754 году (1994), когда в этот день произошёл уход Седьмого Любавичского Ребе. Хасиды верят, что духовное влияние Ребе после этого не ослабло, а многократно усилилось, продолжая вдохновлять миллионы людей по всему миру на добрые дела и изучение Торы.</p>

<h3>12–13 Тамуза — Полное освобождение</h3>
<p>Двенадцатого-тринадцатого Тамуза Ребе Раяц был полностью освобождён из ссылки. Этот день стал праздником для каждого, кому дорога Тора и еврейская жизнь. Освобождение было столь открытым чудом, что даже убеждённые скептики не могли не увидеть в нём руку Б-га. Ребе Раяц установил эти дни как дни празднования и благодарности — не только за личное избавление, но за победу света Торы над тьмой безбожия. Он подчёркивал: освобождён был не только он сам, но и все, кто дорожит святостью еврейского имени.</p>

<h3>20 Ава — Рабби Леви-Ицхак Шнеерсон (5704/1944)</h3>
<p>Двадцатого Ава 5704 года (1944) в ссылке в Алма-Ате скончался рабби Леви-Ицхак Шнеерсон — отец Седьмого Ребе и главный раввин Днепропетровска. Он был арестован 9 Ниссана 1939 года за неустанную поддержку еврейской жизни в городе. Сослан в далёкий Чиили (Казахстан), он и в ссылке продолжал писать глубочайшие комментарии к Торе и Зоару. Его жена, ребецн Хана, изготавливала чернила из ягод, чтобы муж мог продолжать писать. После войны она тайно вывезла эти бесценные рукописи из СССР. Жизнь рабби Леви-Ицхака учит: распространять Тору нужно даже в самых тёмных местах, и именно там свет горит ярче всего.</p>`,

      en: `<h3>15 Sivan — Arrest of the Rebbe Rayatz (5687/1927)</h3>
<p>On the fifteenth of Sivan 5687 (1927), in Leningrad, the Sixth Lubavitcher Rebbe — the Rebbe Rayatz (Rabbi Yosef Yitzchak Schneerson) — was arrested. The charge: supporting underground Jewish schools, chedarim, and mikvaot throughout the Soviet Union. The Rebbe Rayatz was imprisoned in the notorious Shpalerka prison, where he was sentenced to death. In the dungeons, he declared a three-day hunger strike demanding the return of his tefillin — and prevailed. His famous words shook even his interrogators: "Only our bodies were given over to exile... our souls were never enslaved." This unwavering faith became a symbol of Jewish resistance to the godless regime.</p>

<h3>3 Tammuz — The First Miracle</h3>
<p>On the third of Tammuz, the first miracle occurred: the death sentence of the Rebbe Rayatz was commuted to exile in Kostroma. The hand of G-d was visible in everything — the Soviet machine that destroyed millions retreated before a single Jewish leader. This same date — 3 Tammuz — acquired additional significance in 5754 (1994), when the Seventh Lubavitcher Rebbe passed away on this day. Chassidim believe that the Rebbe's spiritual influence did not diminish after this event but intensified manifold, continuing to inspire millions of people around the world to perform good deeds and study Torah.</p>

<h3>12–13 Tammuz — Complete Liberation</h3>
<p>On the twelfth and thirteenth of Tammuz, the Rebbe Rayatz was completely freed from exile. This day became a celebration for everyone who cherishes Torah and Jewish life. The liberation was such an open miracle that even confirmed skeptics could not fail to see the hand of G-d in it. The Rebbe Rayatz established these days as days of celebration and gratitude — not only for his personal deliverance but for the victory of the light of Torah over the darkness of godlessness. He emphasized: it was not only he who was liberated, but all who hold dear the sanctity of the Jewish name.</p>

<h3>20 Av — Rabbi Levi Yitzchak Schneerson (5704/1944)</h3>
<p>On the twentieth of Av 5704 (1944), Rabbi Levi Yitzchak Schneerson — father of the Seventh Rebbe and Chief Rabbi of Dnepropetrovsk — passed away in exile in Alma-Ata. He was arrested on 9 Nissan 1939 for his tireless support of Jewish life in the city. Exiled to the remote town of Chi'ili (Kazakhstan), he continued even in exile to write the most profound commentaries on the Torah and the Zohar. His wife, Rebbetzin Chana, prepared ink from berries so that her husband could continue writing. After the war, she secretly smuggled these priceless manuscripts out of the USSR. The life of Rabbi Levi Yitzchak teaches us: Torah must be spread even in the darkest places, and it is precisely there that its light shines brightest.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'elul-adar-mission',
    slug: 'ot-elula-do-adara-dva-svetila-i-zavoyevaniye-ameriki',
    title: {
      ru: 'От Элула до Адара: «Два Светила» и завоевание Америки',
      en: 'From Elul to Adar: "Two Luminaries" and the Conquest of America',
      he: 'מאלול ועד אדר: \"שני המאורות\" וכיבוש אמריקה',
      uk: 'Від Елула до Адара: «Два Світила» та завоювання Америки',
    },
    subtitle: {
      ru: 'Годовой цикл: от основания ешивы до Дидан Ноцах',
      en: 'Annual cycle: from founding the yeshiva to Didan Notzach',
      he: 'מעגל השנה: מייסוד הישיבה ועד דידן נצח',
      uk: 'Річний цикл: від заснування єшиви до Дідан Ноцах',
    },
    content: {
      ru: `<h3>15 Элула — Томхей Тмимим (5657/1897)</h3>
<p>Пятнадцатого Элула 5657 года (1897) Ребе Рашаб основал ешиву «Томхей Тмимим» в местечке Любавичи. Название ешивы — «Поддерживающие цельных» — отражало её миссию: воспитать поколение учеников, в которых глубокое знание Талмуда неразрывно соединено с пламенем хасидизма. Ребе Рашаб называл своих учеников «Нейрот ле-аир» — «Светильники, несущие свет». Они должны были стать не просто учёными, а «солдатами» Б-га, способными нести свет Торы в самые тёмные уголки мира. Объединение Талмуда и хасидизма в единую систему обучения стало революцией в еврейском образовании и заложило фундамент для всей будущей деятельности движения Хабад.</p>

<h3>18 Элула (Хай Элул) — Два Великих Светила</h3>
<p>Восемнадцатое Элула — «Хай Элул» — день рождения двух великих светил хасидизма. В этот день в 5458 году (1698) родился основатель хасидского движения — Баал Шем Тов (БШТ), а в 5505 году (1745) — основатель Хабада, Алтер Ребе (рабби Шнеур-Залман из Ляд). Слово «Хай» означает «жизнь», и этот день вдыхает жизненную силу во всю служебную работу месяца Элул. Баал Шем Тов раскрыл божественную искру в каждом простом еврее, показав, что искренняя молитва пастуха угодна Б-гу не менее, чем учёность мудреца. Алтер Ребе дал этому откровению интеллектуальный путь — систему Хабад (Хохма, Бина, Даат), позволяющую постичь Б-жественность разумом.</p>

<h3>19 Кислева — Рош а-Шана хасидизма (5559/1798)</h3>
<p>Девятнадцатого Кислева 5559 года (1798) Алтер Ребе был освобождён из Петропавловской крепости в Петербурге, куда был заключён по ложному доносу. Этот день стал «Рош а-Шана хасидизма» — Новым годом хасидского учения. Небесный суд над хасидизмом завершился оправданием, и с тех пор учение Хабада начало распространяться с новой силой. Примечательно, что ровно 130 лет спустя, 14 Кислева 5689 года (1928), состоялась свадьба Седьмого Ребе и ребецн Хаи-Мушки. На свадьбе Ребе Раяц произнёс: «Этот день связал меня с вами, а вас — со мной», скрепив союз между Ребе и хасидами на все поколения.</p>

<h3>5 Тевета — Дидан Ноцах (5747/1987)</h3>
<p>Пятого Тевета 5747 года (1987) федеральный суд США вынес историческое решение в деле о библиотеке Любавичских Ребеим. Ребецн Хая-Мушка произнесла слова, ставшие ключом к победе: «Книги принадлежат хасидам, потому что мой отец принадлежал хасидам». Суд постановил, что библиотека является собственностью движения Хабад, а не частного лица, ибо Ребе — не частное лицо, а общественный институт. «Дидан Ноцах» — «Наша сторона победила» — стал лозунгом этого дня. Ребе объявил, что победу следует отмечать приобретением книг Торы и усилением изучения хасидизма.</p>

<h3>Адар — «Америка из ништ андерш» (1940)</h3>
<p>В 5700 году (1940) Ребе Раяц прибыл в Америку и произнёс знаменитые слова: «Америка из ништ андерш» — «Америка ничем не отличается», разрушив распространённый миф о том, что в Новом Свете невозможно соблюдать Тору. Он перенёс мировой центр хасидизма Хабад в «нижнее полушарие» — на Истерн Парквей, 770, в Бруклине. Это был не просто переезд — это было начало грандиозной миссии по подготовке всего мира к окончательному Освобождению. Ребе Раяц основал в Америке сеть ешив, школ и общинных организаций, доказав, что святость не зависит от географии, а еврей может и должен освящать любое место, где бы он ни находился.</p>`,

      en: `<h3>15 Elul — Tomchei Temimim (5657/1897)</h3>
<p>On the fifteenth of Elul 5657 (1897), the Rebbe Rashab founded the yeshiva "Tomchei Temimim" in the town of Lubavitch. The name of the yeshiva — "Supporters of the Wholesome" — reflected its mission: to cultivate a generation of students in whom deep Talmudic knowledge would be inseparably united with the flame of Chassidism. The Rebbe Rashab called his students "Neiros Le'air" — "Lamps that bring light." They were to become not merely scholars but "soldiers" of G-d, capable of carrying the light of Torah into the darkest corners of the world. The unification of Talmud and Chassidism into a single system of study was a revolution in Jewish education and laid the foundation for all the future activities of the Chabad movement.</p>

<h3>18 Elul (Chai Elul) — Two Great Luminaries</h3>
<p>The eighteenth of Elul — "Chai Elul" — is the birthday of two great luminaries of Chassidism. On this day in 5458 (1698), the founder of the Chassidic movement — the Baal Shem Tov (the Besht) — was born, and in 5505 (1745) — the founder of Chabad, the Alter Rebbe (Rabbi Schneur Zalman of Liadi). The word "Chai" means "life," and this day infuses vital energy into all the spiritual work of the month of Elul. The Baal Shem Tov revealed the divine spark in every simple Jew, showing that a shepherd's sincere prayer is no less pleasing to G-d than the erudition of a sage. The Alter Rebbe gave this revelation an intellectual pathway — the Chabad system (Chochmah, Binah, Daat), enabling one to grasp G-dliness through the mind.</p>

<h3>19 Kislev — Rosh Hashanah of Chassidism (5559/1798)</h3>
<p>On the nineteenth of Kislev 5559 (1798), the Alter Rebbe was released from the Peter and Paul Fortress in Petersburg, where he had been imprisoned on false charges. This day became the "Rosh Hashanah of Chassidism" — the New Year of Chassidic teaching. The heavenly trial of Chassidism concluded with an acquittal, and from that point on, the teachings of Chabad began to spread with renewed force. Remarkably, exactly 130 years later, on 14 Kislev 5689 (1928), the wedding of the Seventh Rebbe and Rebbetzin Chaya Mushka took place. At the wedding, the Rebbe Rayatz declared: "This day has bound me to you, and you to me," sealing the covenant between the Rebbe and the Chassidim for all generations.</p>

<h3>5 Tevet — Didan Notzach (5747/1987)</h3>
<p>On the fifth of Tevet 5747 (1987), a U.S. federal court issued a historic ruling in the case concerning the library of the Lubavitcher Rebbes. Rebbetzin Chaya Mushka spoke the words that became the key to victory: "The books belong to the Chassidim, because my father belonged to the Chassidim." The court ruled that the library was the property of the Chabad movement, not of a private individual, for the Rebbe is not a private person but a public institution. "Didan Notzach" — "Our side has won" — became the motto of this day. The Rebbe declared that the victory should be celebrated by acquiring books of Torah and intensifying the study of Chassidism.</p>

<h3>Adar — "America Iz Nisht Andersh" (1940)</h3>
<p>In 5700 (1940), the Rebbe Rayatz arrived in America and uttered the famous words: "America iz nisht andersh" — "America is no different," shattering the widespread myth that it was impossible to observe Torah in the New World. He transferred the world center of Chabad Chassidism to the "lower hemisphere" — to 770 Eastern Parkway in Brooklyn. This was not merely a relocation — it was the beginning of a grand mission to prepare the entire world for the ultimate Redemption. The Rebbe Rayatz established in America a network of yeshivos, schools, and communal organizations, proving that holiness does not depend on geography and that a Jew can and must sanctify any place where they find themselves.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'nissan-18-triple-celebration',
    slug: 'nissan-18-troynoye-torzhestvo',
    hebrewDate: { month: 'Nisan', day: 18 },
    title: {
      ru: '18 Ниссана: Тройное торжество (1748, 1878, 1902)',
      en: '18 Nissan: A Triple Celebration (1748, 1878, 1902)',
      he: 'י״ח ניסן: חגיגה משולשת (1748, 1878, 1902)',
      uk: '18 Ніссана: Потрійне свято (1748, 1878, 1902)',
    },
    subtitle: {
      ru: 'Упшерниш Алтер Ребе, рождение рабби Леви-Ицхака и брит-мила Ребе',
      en: 'Upshernish of the Alter Rebbe, birth of Rabbi Levi Yitzchak, and the Rebbe\'s bris',
      he: 'אופשערניש של אדמו״ר הזקן, לידת ר׳ לוי יצחק, וברית המילה של הרבי',
      uk: 'Упшерніш Алтер Ребе, народження рабі Леві-Іцхака та бріт-міла Ребе',
    },
    content: {
      ru: `<p>Восемнадцатое Ниссана — дата поразительной концентрации событий в истории Хабада.</p>

<h3>Упшерниш Алтер Ребе (5508/1748)</h3>
<p>В этот день состоялся упшерниш (первая стрижка волос) трёхлетнего мальчика, которому суждено было стать Алтер Ребе — основателем движения Хабад. Баал-Шем-Тов лично совершил обряд, оставив мальчику пейот, и благословил его. Он строго запретил родителям раскрывать ребёнку, кто именно его подстриг, предсказав, что мальчику суждено проложить собственный путь в служении Б-гу.</p>

<h3>Рождение рабби Леви-Ицхака (5638/1878)</h3>
<p>Спустя 130 лет, в этот же день родился рабби Леви-Ицхак Шнеерсон — отец будущего Седьмого Ребе, выдающийся раввин и каббалист. Его самоотверженная борьба за еврейство в Советском Союзе стоила ему здоровья и жизни. Ребе часто подчёркивал, что именно интеллектуальная мощь его отца позволила объединить глубочайшие тайны Зоара с логикой Талмуда.</p>

<h3>Брит-мила Седьмого Ребе (5662/1902)</h3>
<p>Ровно через 24 года после рождения отца, 18 Ниссана 1902 года, состоялся брит-мила будущего Седьмого Ребе. Ребецн Хана, мать младенца, была настолько богобоязненна, что совершала нетилат ядаим (ритуальное омовение рук) перед каждым кормлением, понимая, что питание ребёнка — это не просто физиология, а акт служения Б-гу. Пятый Ребе (Рашаб) отправил телеграмму с благословением: «Пусть он принесёт свет миру».</p>`,

      en: `<p>The eighteenth of Nissan is a date of remarkable concentration of events in the history of Chabad.</p>

<h3>Upshernish of the Alter Rebbe (5508/1748)</h3>
<p>On this day, the upshernish (first haircut) took place for a three-year-old boy destined to become the Alter Rebbe — founder of the Chabad movement. The Baal Shem Tov personally performed the ceremony, leaving the boy his peyot, and blessed him. He strictly forbade the parents from revealing to the child who had cut his hair, predicting that the boy was destined to forge his own path in the service of G-d.</p>

<h3>Birth of Rabbi Levi Yitzchak (5638/1878)</h3>
<p>130 years later, on this same day, Rabbi Levi Yitzchak Schneerson was born — father of the future Seventh Rebbe, an outstanding rabbi and kabbalist. His selfless fight for Judaism in the Soviet Union cost him his health and life. The Rebbe often emphasized that it was his father's intellectual power that allowed him to unite the deepest mysteries of the Zohar with Talmudic logic.</p>

<h3>Bris of the Seventh Rebbe (5662/1902)</h3>
<p>Exactly 24 years after his father's birth, on 18 Nissan 1902, the bris mila of the future Seventh Rebbe took place. Rebbetzin Chana, the infant's mother, was so G-d-fearing that she performed netilat yadayim (ritual hand washing) before every feeding, understanding that nourishing a child is not merely physiology but an act of service to G-d. The Fifth Rebbe (Rashab) sent a telegram with the blessing: "May he bring light to the world."</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'iyar-13-intellect',
    slug: 'iyar-13-intellekt-na-sluzhbe-svyatosti',
    hebrewDate: { month: 'Iyar', day: 13 },
    title: {
      ru: '13 Ияра: Интеллект на службе святости (1952)',
      en: '13 Iyar: Intellect in the Service of Holiness (1952)',
      he: 'י״ג אייר: השכל בשירות הקדושה (1952)',
      uk: '13 Іяра: Інтелект на службі святості (1952)',
    },
    subtitle: {
      ru: 'Память о рабби Исраэле-Арье-Лейбе — младшем брате Ребе',
      en: 'Memory of Rabbi Yisroel Aryeh Leib — the Rebbe\'s younger brother',
      he: 'זכרו של ר׳ ישראל אריה לייב — אחיו הצעיר של הרבי',
      uk: 'Пам\'ять про рабі Ісраеля-Арʼє-Лейба — молодшого брата Ребе',
    },
    content: {
      ru: `<p>Тринадцатого Ияра 5712 года (1952) покинул этот мир рабби Исраэль-Арье-Лейб — младший брат Седьмого Ребе.</p>

<h3>Феноменальный математик</h3>
<p>Он обладал исключительным интеллектом и был выдающимся математиком. Его рукописи были переданы профессору Полу Розенблюму и признаны работами исключительной глубины. Ребе крайне трепетно относился к его наследию и подчёркивал, что его брат обладал «независимым характером» и стремился к истине своим путём.</p>

<h3>Освящение светских знаний</h3>
<p>Его жизнь стала воплощением принципа: даже самые абстрактные области знания — математика, физика, логика — могут и должны быть освящены, ибо в каждой сфере мироздания скрыта искра Б-жественности. Интеллект — это не самоцель, а инструмент для раскрытия единства Творца в мире. Когда разум служит святости, он обретает истинное величие.</p>`,

      en: `<p>On the thirteenth of Iyar 5712 (1952), Rabbi Yisroel Aryeh Leib — the younger brother of the Seventh Rebbe — passed from this world.</p>

<h3>A Phenomenal Mathematician</h3>
<p>He possessed exceptional intellect and was an outstanding mathematician. His manuscripts were given to Professor Paul Rosenblum and recognized as works of exceptional depth. The Rebbe was extremely devoted to his legacy and emphasized that his brother possessed an "independent character" and strived for truth in his own way.</p>

<h3>Sanctifying Secular Knowledge</h3>
<p>His life embodied the principle: even the most abstract areas of knowledge — mathematics, physics, logic — can and must be sanctified, for in every sphere of creation a spark of G-dliness is hidden. Intellect is not an end in itself, but an instrument for revealing the unity of the Creator in the world. When the mind serves holiness, it achieves true greatness.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'sivan-tammuz-exile',
    slug: 'sivan-tamuz-stoykost-v-izgnanii-i-spaseniye',
    hebrewDate: { month: 'Sivan', day: 15 },
    title: {
      ru: 'Сиван и Тамуз: Стойкость в изгнании и спасение в океане',
      en: 'Sivan and Tammuz: Steadfastness in Exile and Salvation on the Ocean',
      he: 'סיוון ותמוז: עמידה בגלות והצלה באוקיינוס',
      uk: 'Сіван і Тамуз: Стійкість у вигнанні та порятунок в океані',
    },
    subtitle: {
      ru: 'От ареста Ребе Раяца до чудесного прибытия в Америку',
      en: 'From the arrest of the Rebbe Rayatz to the miraculous arrival in America',
      he: 'ממאסר הרבי הריי״צ ועד ההגעה הניסית לאמריקה',
      uk: 'Від арешту Ребе Раяца до дивовижного прибуття до Америки',
    },
    content: {
      ru: `<h3>15 Сивана — Арест (1927)</h3>
<p>Пятнадцатого Сивана 5687 года (1927) агенты ГПУ арестовали Ребе Раяца (рабби Йосефа-Ицхака Шнеерсона) в его ленинградской квартире. Когда ему направили в лицо пистолет, Ребе произнёс слова, ставшие девизом всего хасидского движения: «Шнеерсоны не боятся никого, кроме Б-га». Ему грозил расстрел, но 19 дней — от ареста до полного освобождения 12-13 Тамуза — стали временем чуда. Советская машина репрессий, способная уничтожить кого угодно, оказалась бессильна перед силой веры. Арест Ребе Раяца и его освобождение стали доказательством: когда еврей стоит на своём с абсолютной мсирут нефеш (самоотверженностью), даже империи отступают.</p>

<h3>28 Сивана — Коах Сиван (1941)</h3>
<p>Двадцать восьмого Сивана 5701 года (1941) корабль «Серпа Пинту» прибыл в нью-йоркскую гавань, неся на борту Ребе — рабби Менахем-Мендла Шнеерсона — и ребецн Хаю-Мушку. На борту корабля было написано «PORTUGAL» — и это чудо: португальский корабль вырвал будущего лидера мирового еврейства из пылающей Европы. Когда Ребе ступил на американскую землю, он произнёс браху «Барух мехайе а-мейтим» — «Благословен воскрешающий мёртвых». Эти слова были не просто молитвой: они были декларацией — начинается новая эпоха, эпоха воскрешения еврейской жизни на новом континенте.</p>

<h3>3 Тамуза — Солнце веры</h3>
<p>Третье Тамуза — день, когда по молитве Йеошуа бин Нуна солнце остановилось над Гивоном, чтобы народ Израиля мог завершить победу. Этот день стал символом того, что законы природы подчиняются воле Б-га и Его праведников. В 5754 году (1994) третьего Тамуза произошла гистолькус (уход) Седьмого Любавичского Ребе. Однако хасиды верят, что влияние Ребе после гистолькус не только не прекратилось, но и усилилось. Подобно солнцу, остановленному Йеошуа, свет Ребе продолжает освещать мир, и каждый хасид ощущает его руководство в своей жизни.</p>`,

      en: `<h3>15 Sivan — The Arrest (1927)</h3>
<p>On the fifteenth of Sivan 5687 (1927), GPU agents arrested the Rebbe Rayatz (Rabbi Yosef Yitzchak Schneerson) in his Leningrad apartment. When a pistol was pointed at his face, the Rebbe uttered words that became the motto of the entire Chassidic movement: "Schneersons fear no one but G-d." He faced execution, but the 19 days — from arrest to full liberation on 12-13 Tammuz — became a time of miracle. The Soviet machine of repression, capable of destroying anyone, proved powerless before the force of faith. The arrest and liberation of the Rebbe Rayatz became proof: when a Jew stands firm with absolute mesirat nefesh (self-sacrifice), even empires retreat.</p>

<h3>28 Sivan — Koach Sivan (1941)</h3>
<p>On the twenty-eighth of Sivan 5701 (1941), the ship "Serpa Pinto" arrived in New York harbor, carrying on board the Rebbe — Rabbi Menachem Mendel Schneerson — and Rebbetzin Chaya Mushka. On the hull of the ship was written "PORTUGAL" — and this was a miracle: a Portuguese vessel had snatched the future leader of world Jewry from a burning Europe. When the Rebbe stepped onto American soil, he recited the blessing "Baruch mechaye ha-meitim" — "Blessed is He who resurrects the dead." These words were not merely a prayer: they were a declaration — a new era was beginning, an era of the resurrection of Jewish life on a new continent.</p>

<h3>3 Tammuz — The Sun of Faith</h3>
<p>The third of Tammuz is the day when, through the prayer of Yehoshua bin Nun, the sun stood still over Givon so that the people of Israel could complete their victory. This day became a symbol that the laws of nature are subject to the will of G-d and His righteous ones. In 5754 (1994), on the third of Tammuz, the histalkus (passing) of the Seventh Lubavitcher Rebbe occurred. However, Chassidim believe that the Rebbe's influence after histalkus not only did not cease but intensified. Like the sun stopped by Yehoshua, the Rebbe's light continues to illuminate the world, and every Chassid feels his guidance in their life.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'av-elul-lamplighters',
    slug: 'av-elul-svet-v-kazakhstane-i-zazhigateli-lamp',
    hebrewDate: { month: 'Av', day: 20 },
    title: {
      ru: 'Ав и Элул: Свет в Казахстане и «Зажигатели ламп»',
      en: 'Av and Elul: Light in Kazakhstan and the "Lamplighters"',
      he: 'אב ואלול: אור בקזחסטן ו״מדליקי הפנסים״',
      uk: 'Ав та Елул: Світло в Казахстані та «Запалювачі ламп»',
    },
    subtitle: {
      ru: 'Подвиг рабби Леви-Ицхака и рождение системы Томхей Тмимим',
      en: 'The feat of Rabbi Levi Yitzchak and the birth of the Tomchei Temimim system',
      he: 'גבורתו של רבי לוי יצחק ולידת מערכת תומכי תמימים',
      uk: 'Подвиг рабі Леві-Іцхака і народження системи Томхей Тмімім',
    },
    content: {
      ru: `<h3>20 Ава — Подвиг в Алма-Ате (1944)</h3>
<p>Двадцатого Ава 5704 года (1944) в далёкой Алма-Ате (Казахстан) покинул этот мир рабби Леви-Ицхак Шнеерсон — отец Седьмого Ребе. Сосланный советским режимом в глухой Чиили (Казахстан) за свою раввинскую деятельность, рабби Леви-Ицхак не сдался ни на мгновение. Когда у него не было чернил, он изготавливал их из трав и ягод, собранных ребецн Ханой в степи, и продолжал писать глубочайшие каббалистические комментарии на полях книг. Ребецн Хана — мать Ребе — была его верной спутницей в изгнании, добывая для него всё необходимое ценой невероятных усилий. Подвиг рабби Леви-Ицхака стал символом: Тора не знает изгнания, и свет Б-жественной мудрости может сиять даже в самых тёмных уголках мира.</p>

<h3>15 Элула — Томхей Тмимим (1897)</h3>
<p>Пятнадцатого Элула 5657 года (1897) Ребе Рашаб основал в Любавичах йешиву «Томхей Тмимим» — «Поддержка цельных». Её миссия заключалась в воспитании поколения учеников, в которых глубокое талмудическое знание было бы неразрывно соединено с огнём хасидизма. Ребе Рашаб называл своих учеников «Нейрос леайр» — «Светильники, несущие свет». Он говорил: «Идите в пустыню и на море, чтобы зажигать лампы!» — имея в виду, что ученики должны нести свет Торы в самые отдалённые и духовно опустошённые места. Там, где царит «пустота», она становится видимой — и именно туда необходимо направить свет. Система Томхей Тмимим заложила фундамент всей будущей деятельности движения Хабад по всему миру.</p>`,

      en: `<h3>20 Av — The Feat in Alma-Ata (1944)</h3>
<p>On the twentieth of Av 5704 (1944), in distant Alma-Ata (Kazakhstan), Rabbi Levi Yitzchak Schneerson — father of the Seventh Rebbe — departed from this world. Exiled by the Soviet regime to the remote town of Chi'ili (Kazakhstan) for his rabbinical activities, Rabbi Levi Yitzchak did not surrender for a single moment. When he had no ink, he made it from herbs and berries gathered by Rebbetzin Chana in the steppe, and continued to write the most profound kabbalistic commentaries in the margins of books. Rebbetzin Chana — the Rebbe's mother — was his faithful companion in exile, procuring everything he needed at the cost of incredible effort. The feat of Rabbi Levi Yitzchak became a symbol: Torah knows no exile, and the light of G-dly wisdom can shine even in the darkest corners of the world.</p>

<h3>15 Elul — Tomchei Temimim (1897)</h3>
<p>On the fifteenth of Elul 5657 (1897), the Rebbe Rashab founded the yeshiva "Tomchei Temimim" — "Supporters of the Wholesome" — in Lubavitch. Its mission was to cultivate a generation of students in whom deep Talmudic knowledge would be inseparably united with the flame of Chassidism. The Rebbe Rashab called his students "Neiros Le'air" — "Lamps that bring light." He said: "Go to the desert and to the sea to light lamps!" — meaning that the students must carry the light of Torah to the most remote and spiritually desolate places. Where "emptiness" reigns, it becomes visible — and that is precisely where one must direct the light. The Tomchei Temimim system laid the foundation for all the future activities of the Chabad movement throughout the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'cheshvan-kislev-tevet-cycle',
    slug: 'kheshvan-kislev-tevet-mechty-svadby-pobeda-knig',
    hebrewDate: { month: 'Cheshvan', day: 20 },
    title: {
      ru: 'Хешван, Кислев, Тевет: Мечты, свадьбы и Победа Книг',
      en: 'Cheshvan, Kislev, Tevet: Dreams, Weddings, and the Victory of the Books',
      he: 'חשוון, כסלו, טבת: חלומות, חתונות וניצחון הספרים',
      uk: 'Хешван, Кіслев, Тевет: Мрії, весілля та Перемога Книг',
    },
    subtitle: {
      ru: 'От пророческого сна до Дидан Ноцах',
      en: 'From a prophetic dream to Didan Notzach',
      he: 'מחלום נבואי ועד דידן נצח',
      uk: 'Від пророчого сну до Дідан Ноцах',
    },
    content: {
      ru: `<h3>20 Хешвана — Пророческий сон (1860)</h3>
<p>Перед рождением Ребе Рашаба (пятого Любавичского Ребе) его бабушке, ребецн Ривке, явился во сне Мителер Ребе (второй Любавичский Ребе). Он повелел написать свиток Торы в честь будущего ребёнка. Этот пророческий сон указывал на особую миссию мальчика, которому суждено было родиться 20 Мархешвана 5621 года (1860): стать мостом между сокровенным учением хасидизма и системой образования, способной передать это учение будущим поколениям. Сон ребецн Ривки был не просто видением — это было послание с Небес о том, что рождается «светильник», который озарит весь мир.</p>

<h3>14 Кислева — «День, который связал нас» (1928)</h3>
<p>Четырнадцатого Кислева 5689 года (1928) в Варшаве состоялась свадьба будущего Седьмого Любавичского Ребе — рабби Менахем-Мендла Шнеерсона — и ребецн Хаи-Мушки, дочери Ребе Раяца. На свадьбе присутствовали души трёх поколений Ребеим, и атмосфера была пронизана святостью. Ребе Раяц произнёс слова, ставшие легендарными: «Этот день связал меня с вами, а вас — со мной». Эти слова выражали суть отношений между Ребе и хасидами — связь, которая выше времени и пространства. Души предков — Алтер Ребе, Мителер Ребе, Цемах Цедек — незримо присутствовали, благословляя союз, из которого выросло величайшее еврейское движение современности.</p>

<h3>5 Тевета — Дидан Ноцах (1987)</h3>
<p>Пятого Тевета 5747 года (1987) федеральный суд США вынес историческое решение по делу о библиотеке Любавичских Ребеим. Ребецн Хая-Мушка произнесла слова, ставшие ключом к победе: «Книги принадлежат хасидам, потому что мой отец принадлежал хасидам». Суд постановил, что библиотека является собственностью движения Хабад, а не частного лица, ибо Ребе — это не частное лицо, а общественный институт. «Дидан Ноцах» — «Наша сторона победила» — стало девизом этого дня. Ребе объявил, что победу следует отмечать приобретением книг Торы и усилением изучения хасидизма. Этот день стал символом: святые книги, как и сама Тора, принадлежат всему народу Израиля.</p>`,

      en: `<h3>20 Cheshvan — A Prophetic Dream (1860)</h3>
<p>Before the birth of the Rebbe Rashab (the fifth Lubavitcher Rebbe), his grandmother, Rebbetzin Rivka, had a dream in which the Mitteler Rebbe (the second Lubavitcher Rebbe) appeared to her. He commanded that a Torah scroll be written in honor of the child to be born. This prophetic dream pointed to the special mission of the boy who was destined to be born on 20 Marcheshvan 5621 (1860): to become a bridge between the innermost teachings of Chassidism and a system of education capable of transmitting this teaching to future generations. Rebbetzin Rivka's dream was not merely a vision — it was a message from Heaven that a "luminary" was being born who would illuminate the entire world.</p>

<h3>14 Kislev — "The Day That Bound Us" (1928)</h3>
<p>On the fourteenth of Kislev 5689 (1928), in Warsaw, the wedding took place of the future Seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson — and Rebbetzin Chaya Mushka, daughter of the Rebbe Rayatz. The souls of three generations of Rebbes were present at the wedding, and the atmosphere was permeated with holiness. The Rebbe Rayatz uttered the words that became legendary: "This day connected me with you, and you with me." These words expressed the essence of the relationship between a Rebbe and the Chassidim — a bond that transcends time and space. The souls of ancestors — the Alter Rebbe, the Mitteler Rebbe, the Tzemach Tzedek — were invisibly present, blessing a union from which the greatest Jewish movement of the modern era would emerge.</p>

<h3>5 Tevet — Didan Notzach (1987)</h3>
<p>On the fifth of Tevet 5747 (1987), a United States federal court issued a historic ruling in the case concerning the library of the Lubavitcher Rebbes. Rebbetzin Chaya Mushka spoke the words that became the key to victory: "The books belong to the Chassidim, because my father belonged to the Chassidim." The court ruled that the library was the property of the Chabad movement, not of a private individual, for the Rebbe is not a private person but a public institution. "Didan Notzach" — "Our side has won" — became the motto of this day. The Rebbe declared that the victory should be celebrated by acquiring books of Torah and intensifying the study of Chassidism. This day became a symbol: holy books, like the Torah itself, belong to the entire people of Israel.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'nissan-18-triple',
    slug: 'nissan-18-troynoy-uzel-istorii',
    title: {
      ru: '18 Ниссана: Тройной узел истории и мистический корень Хабада',
      en: '18 Nissan: A Triple Knot of History and the Mystical Root of Chabad',
      he: 'י\"ח ניסן: קשר משולש של היסטוריה והשורש המיסטי של חב\"ד',
      uk: '18 Ніссана: Потрійний вузол історії та містичний корінь Хабаду',
    },
    subtitle: {
      ru: 'Упшерниш Алтер Ребе, рождение рабби Леви-Ицхака и брит-мила Ребе',
      en: 'The Upshernish of the Alter Rebbe, the Birth of Rabbi Levi Yitzchak, and the Bris of the Rebbe',
      he: 'אופשערניש של אדמו\"ר הזקן, לידת הרב לוי יצחק וברית המילה של הרבי',
      uk: 'Упшерніш Алтер Ребе, народження рабі Леві-Іцхака та бріт-міла Ребе',
    },
    content: {
      ru: `<h3>Упшерниш Алтер Ребе (1748)</h3>
<p>18 Ниссана 5508 года (1748) в Межибуже состоялось одно из самых таинственных событий в истории хасидизма — упшерниш (первая стрижка волос) маленького Шнеура-Залмана, будущего Алтер Ребе. Баал-Шем-Тов лично совершил обряд: срезал волосы ребёнка, оставив пейсы, и произнёс слова, полные пророческого смысла. После церемонии Бешт строго запретил родителям раскрывать подробности того, что произошло между ним и мальчиком. Эта тайна осталась неразгаданной — но результат говорит сам за себя: из этого ребёнка вырос основатель философии Хабада, человек, соединивший глубину каббалы с ясностью разума и открывший врата хасидизма для каждого еврея.</p>

<h3>Рождение рабби Леви-Ицхака (1878)</h3>
<p>Ровно через 130 лет, 18 Ниссана 5638 года (1878), в семье великих раввинов родился рабби Леви-Ицхак Шнеерсон — отец Седьмого Любавичского Ребе. С юных лет он отличался гениальным умом и глубочайшим знанием как открытой, так и сокровенной Торы. Рабби Леви-Ицхак стал выдающимся каббалистом, автором глубочайших комментариев на Зоар и каббалистические тексты. Его жизнь стала подвигом: несмотря на арест советскими властями и ссылку в Казахстан, он продолжал изучать и преподавать Тору до последнего дня. Б-г дал ему силу духа, которую он передал своему великому сыну.</p>

<h3>Брит-мила Седьмого Ребе (1902)</h3>
<p>Ещё через 24 года, 18 Ниссана 5662 года (1902), состоялась брит-мила младенца Менахем-Мендла — будущего Седьмого Любавичского Ребе. День обрезания стал днём духовного откровения. Ребецн Хана, мать Ребе, рассказывала, что перед церемонией она совершила нетилат ядаим с особой каваной, ощущая святость момента. Ребе Рашаб (пятый Любавичский Ребе) прислал телеграмму с благословением, в которой были слова: «Пусть он принесёт свет в мир». Эти три события — упшерниш, рождение и брит — переплелись в мистический узел, связавший поколения лидеров Хабада в единую цепь Б-жественного замысла.</p>`,

      en: `<h3>The Upshernish of the Alter Rebbe (1748)</h3>
<p>On the 18th of Nissan 5508 (1748), in Mezhybizh, one of the most mysterious events in the history of Chassidism took place — the upshernish (first haircut) of little Schneur Zalman, the future Alter Rebbe. The Baal Shem Tov personally performed the ceremony: he cut the child's hair, leaving the peyot, and spoke words filled with prophetic meaning. After the ceremony, the Besht strictly forbade the parents from revealing the details of what transpired between him and the boy. This secret remained unsolved — but the result speaks for itself: from this child grew the founder of Chabad philosophy, a man who united the depth of Kabbalah with the clarity of intellect and opened the gates of Chassidism to every Jew.</p>

<h3>The Birth of Rabbi Levi Yitzchak (1878)</h3>
<p>Exactly 130 years later, on the 18th of Nissan 5638 (1878), Rabbi Levi Yitzchak Schneerson was born into a family of great rabbis — the father of the Seventh Lubavitcher Rebbe. From his youth, he was distinguished by a brilliant mind and the deepest knowledge of both the revealed and the hidden Torah. Rabbi Levi Yitzchak became an outstanding Kabbalist, authoring the most profound commentaries on the Zohar and Kabbalistic texts. His life became an act of heroism: despite being arrested by the Soviet authorities and exiled to Kazakhstan, he continued to study and teach Torah until his last day. G-d granted him a strength of spirit that he transmitted to his great son.</p>

<h3>The Bris of the Seventh Rebbe (1902)</h3>
<p>Another 24 years later, on the 18th of Nissan 5662 (1902), the bris milah of the infant Menachem Mendel — the future Seventh Lubavitcher Rebbe — took place. The day of circumcision became a day of spiritual revelation. Rebbetzin Chana, the Rebbe's mother, recounted that before the ceremony she performed netilat yadayim with special kavanah, sensing the holiness of the moment. The Rebbe Rashab (the Fifth Lubavitcher Rebbe) sent a telegram with a blessing containing the words: "May he bring light to the world." These three events — upshernish, birth, and bris — intertwined into a mystical knot, binding generations of Chabad leaders into a single chain of Divine purpose.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tishrei-visions',
    slug: 'tishrey-videniya-mashiakha-i-naslediye',
    title: {
      ru: 'Тишрей: Видения Машиаха и наследие семьи Ребе',
      en: 'Tishrei: Visions of Mashiach and the Legacy of the Rebbe\'s Family',
      he: 'תשרי: חזיונות המשיח ומורשת משפחת הרבי',
      uk: 'Тішрей: Видіння Машіаха та спадщина родини Ребе',
    },
    subtitle: {
      ru: 'Диалог с Машиахом, подвиг ребецн Ханы и девиз Маараша',
      en: 'A Dialogue with Mashiach, the Heroism of Rebbetzin Chana, and the Motto of the Maharash',
      he: 'דו-שיח עם המשיח, גבורת הרבנית חנה וסיסמת המהר\"ש',
      uk: 'Діалог із Машіахом, подвиг ребецн Хани та девіз Маараша',
    },
    content: {
      ru: `<h3>Видение Баал-Шем-Това (1 тишрея 1746)</h3>
<p>В Рош а-Шана 5507 года (1746) произошло событие, определившее судьбу всего еврейского народа. Душа Баал-Шем-Това поднялась в высшие миры — и он предстал перед Машиахом. Бешт задал вопрос, который горел в его сердце: «Когда придёт Господин?» Машиах ответил словами, которые стали программой хасидизма на столетия вперёд: «Когда распространятся твои источники наружу». Это означало, что приход Машиаха напрямую связан с распространением учения хасидизма по всему миру. Баал-Шем-Тов описал это видение в знаменитом письме, ставшем одним из важнейших документов хасидской традиции. С тех пор каждое поколение хабадских Ребе видело свою миссию в исполнении этого Б-жественного условия.</p>

<h3>Подвиг ребецн Ханы (6 тишрея 1964)</h3>
<p>6 тишрея 5725 года (1964) ушла из жизни ребецн Хана Шнеерсон — мать Седьмого Любавичского Ребе, женщина невероятной силы духа и преданности Торе. Её величайший подвиг совершился в годы советских репрессий: когда её мужа, рабби Леви-Ицхака, сослали в Казахстан, она последовала за ним. В ссылке не было чернил — и ребецн Хана собирала ягоды и травы, чтобы своими руками изготовить чернила для мужа. Благодаря этому рабби Леви-Ицхак смог продолжить записывать свои глубочайшие комментарии к Торе и каббале. Эти рукописи были спасены и дошли до наших дней — живое свидетельство подвига женщины, сохранившей Б-жественную мудрость в самых нечеловеческих условиях.</p>

<h3>Йорцайт Ребе Маараша (13 тишрея 1882)</h3>
<p>13 тишрея 5643 года (1882) покинул этот мир Ребе Маараш — рабби Шмуэль, четвёртый Любавичский Ребе. Он прожил всего 48 лет, но оставил наследие, несоразмерное столь короткой жизни. Его девиз «Лехатхила арибер» — «Изначально поверх» — стал одним из главных принципов хасидизма Хабад. Смысл этих слов в том, что не нужно сначала пытаться обойти препятствие снизу, а если не получится — перепрыгнуть. Нужно сразу прыгать поверх! Ребе Маараш создал систему хемшехим — длинных серий маамаров (хасидских дискурсов), раскрывающих глубочайшие тайны Торы. Его подход сочетал бесстрашие в служении Б-гу с глубиной мысли, ставшей образцом для последующих поколений.</p>`,

      en: `<h3>The Vision of the Baal Shem Tov (1 Tishrei 1746)</h3>
<p>On Rosh Hashanah 5507 (1746), an event occurred that determined the destiny of the entire Jewish people. The soul of the Baal Shem Tov ascended to the highest realms — and he stood before Mashiach. The Besht asked the question that burned in his heart: "When will the Master come?" Mashiach answered with words that became the program of Chassidism for centuries to come: "When your springs spread outward." This meant that the coming of Mashiach is directly linked to the dissemination of the teachings of Chassidism throughout the world. The Baal Shem Tov described this vision in his famous letter, which became one of the most important documents of the Chassidic tradition. Since then, every generation of Chabad Rebbes has seen its mission in fulfilling this Divine condition.</p>

<h3>The Heroism of Rebbetzin Chana (6 Tishrei 1964)</h3>
<p>On the 6th of Tishrei 5725 (1964), Rebbetzin Chana Schneerson passed away — the mother of the Seventh Lubavitcher Rebbe, a woman of incredible strength of spirit and devotion to the Torah. Her greatest act of heroism took place during the years of Soviet repression: when her husband, Rabbi Levi Yitzchak, was exiled to Kazakhstan, she followed him. In exile, there was no ink — so Rebbetzin Chana gathered berries and herbs to make ink with her own hands for her husband. Thanks to this, Rabbi Levi Yitzchak was able to continue writing his most profound commentaries on the Torah and Kabbalah. These manuscripts were saved and have survived to this day — a living testimony to the heroism of a woman who preserved Divine wisdom under the most inhumane conditions.</p>

<h3>The Yahrtzeit of the Rebbe Maharash (13 Tishrei 1882)</h3>
<p>On the 13th of Tishrei 5643 (1882), the Rebbe Maharash — Rabbi Shmuel, the Fourth Lubavitcher Rebbe — departed this world. He lived only 48 years, but left a legacy disproportionate to such a short life. His motto "Lechatchila Ariber" — "From the outset, go over" — became one of the central principles of Chabad Chassidism. The meaning of these words is that one should not first try to go around an obstacle from below, and only then — if that fails — try to leap over it. One should leap over from the very start! The Rebbe Maharash created the system of hemshechim — long series of maamarim (Chassidic discourses) revealing the deepest secrets of the Torah. His approach combined fearlessness in the service of G-d with a depth of thought that became a model for subsequent generations.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'kislev-wedding-light',
    slug: 'kislev-svadba-veka-i-triumf-sveta',
    title: {
      ru: 'Кислев: Свадьба века и триумф света',
      en: 'Kislev: The Wedding of the Century and the Triumph of Light',
      he: 'כסלו: חתונת המאה וניצחון האור',
      uk: 'Кіслев: Весілля століття та тріумф світла',
    },
    subtitle: {
      ru: 'Мителер Ребе, свадьба Ребе и Рош а-Шана хасидизма',
      en: 'The Mitteler Rebbe, the Rebbe\'s Wedding, and the Rosh Hashanah of Chassidism',
      he: 'האדמו\"ר האמצעי, חתונת הרבי וראש השנה של החסידות',
      uk: 'Мітелер Ребе, весілля Ребе та Рош а-Шана хасидизму',
    },
    content: {
      ru: `<h3>9-10 Кислева: Мителер Ребе — рождение и уход в один день</h3>
<p>9 Кислева 5534 года (1773) родился рабби Дов-Бер Шнеури — Мителер Ребе, второй Любавичский Ребе, и в тот же день 10 Кислева 5588 года (1827) его душа покинула этот мир. Совпадение дат рождения и ухода считается в еврейской традиции признаком совершенной праведности — это означает, что человек завершил свою миссию в мире полностью. Мителер Ребе был освобождён из Витебской тюрьмы, куда был заключён по ложному доносу, и его триумфальное возвращение стало праздником для всех хасидов. Он развил учение своего отца, Алтер Ребе, углубив интеллектуальную составляющую хасидизма Хабад и создав обширные труды, раскрывающие внутреннее измерение Торы с небывалой детальностью и глубиной.</p>

<h3>14 Кислева: Свадьба Ребе (1928)</h3>
<p>14 Кислева 5689 года (1928) в Варшаве состоялась свадьба, изменившая ход еврейской истории — бракосочетание рабби Менахем-Мендла Шнеерсона и ребецн Хаи-Мушки, дочери Ребе Раяца. На свадьбе присутствовали тысячи хасидов, а духовная атмосфера была невероятной. Ребе Раяц танцевал «по-русски», а его радость не знала границ. По свидетельствам хасидов, души трёх поколений Ребе спустились с Небес, чтобы благословить этот союз. Ребе Раяц произнёс слова, ставшие легендарными: «Этот день связал меня с вами, а вас — со мной». Это был не просто брак двух людей — это было соединение Б-жественных душ, из которого выросло величайшее еврейское движение современности.</p>

<h3>19-20 Кислева: Рош а-Шана хасидизма</h3>
<p>19 Кислева 5559 года (1798) Алтер Ребе был освобождён из Петропавловской крепости в Петербурге, где он содержался по обвинению в государственной измене. Это освобождение стало не просто юридической победой — оно стало духовным откровением. В заключении Алтер Ребе удостоился видения: к нему явились Баал-Шем-Тов и Магид из Межерича, которые открыли ему, что на Небесах шёл суд о том, допустимо ли раскрывать тайны Торы столь широко. Освобождение из тюрьмы стало знаком: Небесный суд вынес оправдательный приговор, и врата мудрости были распахнуты настежь. С тех пор 19 Кислева отмечается как Рош а-Шана хасидизма — Новый год распространения Б-жественной мудрости во всём мире.</p>`,

      en: `<h3>9-10 Kislev: The Mitteler Rebbe — Born and Departed on the Same Day</h3>
<p>On the 9th of Kislev 5534 (1773), Rabbi Dov Ber Schneuri was born — the Mitteler Rebbe, the Second Lubavitcher Rebbe — and on the same date, the 10th of Kislev 5588 (1827), his soul departed this world. The coincidence of the dates of birth and passing is considered in Jewish tradition a sign of ultimate righteousness — it means the person completed their mission in this world in full. The Mitteler Rebbe was freed from the Vitebsk prison, where he had been incarcerated on false charges, and his triumphal return became a celebration for all Chassidim. He developed the teachings of his father, the Alter Rebbe, deepening the intellectual dimension of Chabad Chassidism and creating extensive works that revealed the inner dimension of the Torah with unprecedented detail and depth.</p>

<h3>14 Kislev: The Rebbe's Wedding (1928)</h3>
<p>On the 14th of Kislev 5689 (1928), in Warsaw, a wedding took place that changed the course of Jewish history — the marriage of Rabbi Menachem Mendel Schneerson and Rebbetzin Chaya Mushka, daughter of the Rebbe Rayatz. Thousands of Chassidim attended the wedding, and the spiritual atmosphere was extraordinary. The Rebbe Rayatz danced "Russian style," and his joy knew no bounds. According to Chassidic testimony, the souls of three generations of Rebbes descended from Heaven to bless this union. The Rebbe Rayatz spoke the words that became legendary: "This day connected me with you, and you with me." This was not merely a marriage of two people — it was a union of Divine souls, from which the greatest Jewish movement of the modern era would emerge.</p>

<h3>19-20 Kislev: The Rosh Hashanah of Chassidism</h3>
<p>On the 19th of Kislev 5559 (1798), the Alter Rebbe was freed from the Peter and Paul Fortress in Saint Petersburg, where he had been held on charges of treason. This liberation was not merely a legal victory — it was a spiritual revelation. While imprisoned, the Alter Rebbe was granted a vision: the Baal Shem Tov and the Maggid of Mezritch appeared to him and revealed that a trial was taking place in Heaven over whether it was permissible to reveal the secrets of the Torah so widely. The release from prison became a sign: the Heavenly Court had issued a verdict of acquittal, and the gates of wisdom were flung wide open. Since then, the 19th of Kislev has been celebrated as the Rosh Hashanah of Chassidism — the New Year of the dissemination of Divine wisdom throughout the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tevet-adar-victories',
    slug: 'tevet-adar-ispytaniya-veroy-i-pobeda-knig',
    title: {
      ru: 'Тевет и Адар: Испытания верой и победа книг',
      en: 'Tevet and Adar: Trials of Faith and the Victory of the Books',
      he: 'טבת ואדר: מבחני אמונה וניצחון הספרים',
      uk: 'Тевет і Адар: Випробування вірою та перемога книг',
    },
    subtitle: {
      ru: 'Алтер Ребе и Наполеон, Дидан Ноцах и покорение Америки',
      en: 'The Alter Rebbe and Napoleon, Didan Notzach, and the Conquest of America',
      he: 'אדמו\"ר הזקן ונפוליאון, דידן נצח וכיבוש אמריקה',
      uk: 'Алтер Ребе і Наполеон, Дідан Ноцах та підкорення Америки',
    },
    content: {
      ru: `<h3>24 Тевета: Алтер Ребе и Наполеон</h3>
<p>24 Тевета 5573 года (1812) покинул этот мир Алтер Ребе — рабби Шнеур-Залман из Ляд, основатель хасидизма Хабад. Его уход был непосредственно связан с наполеоновскими войнами. Алтер Ребе увидел в наступлении Наполеона на Россию не просто военный конфликт, а величайшую духовную угрозу: французская эмансипация сулила евреям гражданские права, но ценой утраты духовности и ассимиляции. Алтер Ребе активно поддерживал Россию, используя свои духовные способности. По преданию, он слышал звук шофара, возвещающий о ходе битвы. Спасаясь от наступающих французских войск, он бежал из Ляд и скончался в деревне Пена. Его последними словами стала молитва о сохранении еврейской души — того Б-жественного огня, который никакая эмансипация не должна погасить.</p>

<h3>5 Тевета: Дидан Ноцах (1987)</h3>
<p>5 Тевета 5747 года (1987) федеральный суд США вынес историческое решение по делу о библиотеке Любавичских Ребе. Ребецн Хая-Мушка произнесла слова, ставшие ключом к победе: «Книги принадлежат хасидам, потому что мой отец принадлежал хасидам». Суд постановил, что библиотека является собственностью движения Хабад, а не частного лица, ибо Ребе — не частный человек, а общественный институт. «Дидан Ноцах» — «Наша сторона победила» — стало девизом этого дня. Ребе увидел в этом событии нечто большее, чем юридическую победу: на Небесах завершилось обвинение, и свет Торы одержал триумф. Ребе призвал отмечать этот день приобретением книг Торы и усилением изучения хасидизма — чтобы победа стала вечной.</p>

<h3>9 Адара: «Америка из ништ андерш» (1940)</h3>
<p>9 Адара 5700 года (1940) Ребе Раяц — шестой Любавичский Ребе — ступил на землю Америки. С этого момента началась новая эпоха в истории Хабада и всего мирового еврейства. Ребе Раяц произнёс ставшие знаменитыми слова на идише: «Америка из ништ андерш» — «Америка ничем не отличается». Этими словами он разрушил барьер, который казался непреодолимым: считалось, что духовная Европа и материалистическая Америка — два несовместимых мира. Ребе Раяц доказал обратное — Тора и хасидизм могут и должны процветать повсюду. Он заложил фундамент, на котором Седьмой Ребе построил всемирную сеть еврейского образования, шлихут и духовного возрождения, превратив Америку в новый центр распространения Б-жественного света.</p>`,

      en: `<h3>24 Tevet: The Alter Rebbe and Napoleon</h3>
<p>On the 24th of Tevet 5573 (1812), the Alter Rebbe — Rabbi Schneur Zalman of Liadi, the founder of Chabad Chassidism — departed this world. His passing was directly connected to the Napoleonic Wars. The Alter Rebbe saw Napoleon's invasion of Russia not merely as a military conflict, but as the greatest spiritual threat: French emancipation promised Jews civil rights, but at the cost of losing their spirituality and assimilation. The Alter Rebbe actively supported Russia, using his spiritual abilities. According to tradition, he heard the sound of the shofar announcing the course of battle. Fleeing the advancing French forces, he escaped from Liadi and passed away in the village of Pena. His last words were a prayer for the preservation of the Jewish soul — that Divine fire which no emancipation should ever extinguish.</p>

<h3>5 Tevet: Didan Notzach (1987)</h3>
<p>On the 5th of Tevet 5747 (1987), a United States federal court issued a historic ruling in the case concerning the library of the Lubavitcher Rebbes. Rebbetzin Chaya Mushka spoke the words that became the key to victory: "The books belong to the Chassidim, because my father belonged to the Chassidim." The court ruled that the library was the property of the Chabad movement, not of a private individual, for the Rebbe is not a private person but a public institution. "Didan Notzach" — "Our side has won" — became the motto of this day. The Rebbe saw in this event something greater than a legal victory: a heavenly accusation had reached its end, and the light of Torah had triumphed. The Rebbe called for this day to be celebrated by acquiring Torah books and intensifying the study of Chassidism — so that the victory would become eternal.</p>

<h3>9 Adar: "America Iz Nisht Andersh" (1940)</h3>
<p>On the 9th of Adar 5700 (1940), the Rebbe Rayatz — the Sixth Lubavitcher Rebbe — set foot on American soil. From that moment, a new era began in the history of Chabad and world Jewry. The Rebbe Rayatz spoke the now-famous words in Yiddish: "America iz nisht andersh" — "America is no different." With these words, he shattered a barrier that had seemed insurmountable: it was believed that spiritual Europe and materialistic America were two incompatible worlds. The Rebbe Rayatz proved the opposite — Torah and Chassidism can and must flourish everywhere. He laid the foundation upon which the Seventh Rebbe built a worldwide network of Jewish education, shlichus, and spiritual renewal, transforming America into a new center for the dissemination of Divine light.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tomchei-tmimim-system',
    slug: 'sistema-yeshiv-tomkhey-tmimim',
    title: {
      ru: 'Система ешив «Томхей Тмимим»: Революция в еврейском образовании',
      en: 'The Tomchei Temimim Yeshiva System: A Revolution in Jewish Education',
      he: 'מערכת ישיבות תומכי תמימים: מהפכה בחינוך היהודי',
      uk: 'Система єшив «Томхей Тмімім»: Революція в єврейській освіті',
    },
    subtitle: {
      ru: 'Воины духа, зажигатели ламп и цельная Тора',
      en: 'Warriors of the Spirit, Lamplighters, and the Complete Torah',
      he: 'לוחמי הרוח, מדליקי הפנסים והתורה השלמה',
      uk: 'Воїни духу, запалювачі ламп і цілісна Тора',
    },
    content: {
      ru: `<h3>Объединение Торы</h3>
<p>До основания ешивы «Томхей Тмимим» в еврейском мире существовал глубокий разрыв между изучением открытой Торы (Талмуд, Галаха) и сокровенной Торы (хасидизм, каббала). Ученики ешив изучали Гемару и законы, но хасидус оставался отдельной сферой — для избранных и посвящённых. Ребе Рашаб (пятый Любавичский Ребе) совершил революцию: он создал концепцию «Тора Тмима» — «Цельная Тора», в которой нигле (открытая часть) и хасидус составляют единое целое. В «Томхей Тмимим» ученик не мог изучать только Талмуд или только хасидус — он был обязан овладеть обоими. Это был принципиально новый подход: Тора — одна, и только постигая её во всей полноте, человек способен по-настоящему служить Б-гу.</p>

<h3>«Воины дома Давида»</h3>
<p>Ребе Рашаб называл учеников «Томхей Тмимим» «солдатами дома Давида» — воинами, призванными сражаться не мечом, а светом Торы. Их противник — не внешний враг, а духовная тьма: ассимиляция, безбожие, отчуждение евреев от своих корней. Каждый выпускник ешивы должен был стать воином на передовой — не прячась в стенах дома учения, а выходя в мир, чтобы нести свет Б-жественной мудрости туда, где царит невежество. Этот военный дух — не агрессия, а бесстрашие в служении — стал отличительной чертой хасидов Хабад и основой для будущего движения шлихут, когда тысячи молодых семей отправились в самые отдалённые уголки мира.</p>

<h3>Зажигатели ламп</h3>
<p>Одна из самых сильных метафор Ребе Рашаба — образ «зажигателя ламп» (машпиа). Каждый ученик «Томхей Тмимим» — это человек, несущий огонь. Его задача — идти по тёмным улицам мира и зажигать фонари в душах людей. Неважно, где находится этот фонарь — в пустыне, на берегу моря или в шумном городе. Там, где горит свет Торы, пустота становится видимой, а тьма отступает. Зажигатель ламп не создаёт свет — он передаёт пламя от своего огня к душе другого. Эта идея легла в основу всей системы хабадского образования: учитель не просто даёт знания, он зажигает душу ученика.</p>

<h3>Роль воспитания: машпиим</h3>
<p>Уникальной особенностью системы «Томхей Тмимим» стал институт машпиим — духовных наставников. В отличие от обычных преподавателей, машпиа не просто учит хасидизму — он превращает теорию в живое служение. Машпиа знает каждого ученика лично, понимает его внутреннюю борьбу и помогает ему найти свой путь в служении Б-гу. Это не академическое преподавание, а передача огня от души к душе. Благодаря машпиим поколения хасидов Хабад выросли не просто учёными, а людьми, живущими тем, что они изучают — людьми, для которых каждое слово Торы становится руководством к действию и источником внутренней силы.</p>`,

      en: `<h3>The Unification of Torah</h3>
<p>Before the founding of the Tomchei Temimim yeshiva, a deep divide existed in the Jewish world between the study of the revealed Torah (Talmud, Halacha) and the hidden Torah (Chassidism, Kabbalah). Yeshiva students studied Gemara and laws, but Chassidus remained a separate sphere — for the select and the initiated. The Rebbe Rashab (the Fifth Lubavitcher Rebbe) carried out a revolution: he created the concept of "Torah Temimah" — "The Complete Torah," in which nigleh (the revealed part) and Chassidus form a unified whole. In Tomchei Temimim, a student could not study only Talmud or only Chassidus — he was required to master both. This was a fundamentally new approach: the Torah is one, and only by grasping it in its entirety can a person truly serve G-d.</p>

<h3>"Warriors of the House of David"</h3>
<p>The Rebbe Rashab called the students of Tomchei Temimim "soldiers of the House of David" — warriors called to fight not with the sword, but with the light of Torah. Their adversary is not an external enemy, but spiritual darkness: assimilation, godlessness, the alienation of Jews from their roots. Every graduate of the yeshiva was to become a warrior on the front lines — not hiding within the walls of the house of study, but going out into the world to carry the light of Divine wisdom wherever ignorance reigns. This martial spirit — not aggression, but fearlessness in service — became the hallmark of Chabad Chassidim and the foundation for the future shlichus movement, when thousands of young families set out to the most remote corners of the globe.</p>

<h3>Lamplighters</h3>
<p>One of the most powerful metaphors of the Rebbe Rashab is the image of the "lamplighter" (mashpia). Every student of Tomchei Temimim is a person carrying fire. His task is to walk through the dark streets of the world and light lanterns in the souls of people. It does not matter where this lantern stands — in the desert, by the sea, or in a bustling city. Where the light of Torah burns, emptiness becomes visible and darkness retreats. The lamplighter does not create light — he transmits the flame from his own fire to the soul of another. This idea became the foundation of the entire Chabad educational system: a teacher does not merely impart knowledge, he ignites the student's soul.</p>

<h3>The Role of Education: Mashpi'im</h3>
<p>A unique feature of the Tomchei Temimim system was the institution of mashpi'im — spiritual mentors. Unlike ordinary teachers, a mashpia does not simply teach Chassidism — he transforms theory into living service. A mashpia knows each student personally, understands his inner struggles, and helps him find his path in the service of G-d. This is not academic instruction, but a transmission of fire from soul to soul. Thanks to the mashpi'im, generations of Chabad Chassidim grew up not merely as scholars, but as people who live what they study — people for whom every word of Torah becomes a guide to action and a source of inner strength.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'yom-huledes-campaign',
    slug: 'kampaniya-yevreyskiy-den-rozhdeniya',
    title: {
      ru: 'Кампания «Еврейский день рождения»: Космический смысл личной даты',
      en: 'The "Jewish Birthday" Campaign: The Cosmic Meaning of a Personal Date',
      he: 'מבצע יום הולדת יהודי: המשמעות הקוסמית של התאריך האישי',
      uk: 'Кампанія «Єврейський день народження»: Космічний сенс особистої дати',
    },
    subtitle: {
      ru: 'Мивца Йом Оледес — превратить день рождения в духовное обновление',
      en: 'Mivtza Yom Huledes — Transforming a Birthday into Spiritual Renewal',
      he: 'מבצע יום הולדת — להפוך את יום ההולדת להתחדשות רוחנית',
      uk: 'Мівца Йом Оледес — перетворити день народження на духовне оновлення',
    },
    content: {
      ru: `<h3>Космическое значение дня рождения</h3>
<p>В хасидизме Хабад день рождения — это не просто дата в календаре, а момент, когда Б-г принимает решение, что мир нуждается именно в этой душе. 25 Адара — день, когда началось сотворение мира (а человек, Адам, был создан 1 Ниссана), и каждый день рождения по еврейскому календарю является личным «Рош а-Шана» для души. Ребе инициировал кампанию «Мивца Йом Оледес» после 87-го дня рождения ребецн Хаи-Мушки в 1988 году, придав этому обычаю всемирный масштаб. Ребе объяснил, что в день рождения «мазаль» (духовное влияние) человека достигает пика — это время, когда молитвы принимаются с особой силой, а решения, принятые в этот день, имеют космическое значение. Каждый еврей должен знать свою дату рождения по еврейскому календарю и отмечать её не праздным весельем, а духовным обновлением.</p>

<h3>Основные обычаи еврейского дня рождения</h3>
<p>Ребе установил ряд обычаев, превращающих день рождения в мощный духовный инструмент. В этот день следует давать цдаку (благотворительность) — открывая канал Б-жественного благословения через акт щедрости. Необходимо усилить изучение Торы: пройти ежедневные уроки Хитас (Хумаш, Теилим, Тания) и урок Рамбама с особой каваной. Именинник должен быть вызван к Торе (алия), а если день рождения выпадает не на день чтения Торы — постараться получить алию в ближайший день чтения. Следует начать читать новую главу Теилим, соответствующую новому году жизни. Важно устроить фарбренген — хасидское застолье с друзьями, на котором делятся словами Торы и принимают добрые решения. И наконец, день рождения — это время хешбон нефеш (самоанализа): оглянуться на прошедший год, оценить свои достижения и принять решения о духовном росте на год грядущий.</p>`,

      en: `<h3>The Cosmic Significance of a Birthday</h3>
<p>In Chabad Chassidism, a birthday is not merely a date on the calendar, but the moment when G-d decides that the world needs precisely this soul. The 25th of Adar is the day when the creation of the world began (while man, Adam, was created on the 1st of Nissan), and each birthday according to the Jewish calendar is a personal "Rosh Hashanah" for the soul. The Rebbe initiated the "Mivtza Yom Huledes" campaign after Rebbetzin Chaya Mushka's 87th birthday in 1988, giving this custom a global dimension. The Rebbe explained that on one's birthday, a person's "mazal" (spiritual influence) reaches its peak — it is a time when prayers are received with special power and decisions made on this day carry cosmic significance. Every Jew should know their birth date according to the Jewish calendar and mark it not with idle celebration, but with spiritual renewal.</p>

<h3>Core Customs of a Jewish Birthday</h3>
<p>The Rebbe established a series of customs that transform a birthday into a powerful spiritual tool. On this day, one should give tzedakah (charity) — opening a channel of Divine blessing through an act of generosity. One should intensify Torah study: complete the daily Chitas lessons (Chumash, Tehillim, Tanya) and the Rambam lesson with special kavanah. The birthday person should receive an aliyah to the Torah, and if the birthday does not fall on a day of Torah reading, one should try to receive an aliyah on the nearest reading day. One should begin reciting the new chapter of Tehillim corresponding to the new year of life. It is important to hold a farbrengen — a Chassidic gathering with friends, sharing words of Torah and making positive resolutions. And finally, a birthday is a time for cheshbon nefesh (self-examination): to look back at the past year, evaluate one's achievements, and make resolutions for spiritual growth in the year ahead.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-science',
    slug: 'nauchnyy-tupik-pochemu-vera-logichnee-teoriy',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Научный тупик: Почему вера логичнее «доказанных» теорий?',
      en: 'Scientific Dead End: Why Faith Is More Logical Than "Proven" Theories?',
      he: 'מבוי סתום מדעי: למה אמונה הגיונית יותר מתיאוריות "מוכחות"?',
      uk: 'Науковий глухий кут: Чому віра логічніша за «доведені» теорії?',
    },
    subtitle: {
      ru: 'Конфликт между наукой и Торой — мнимый',
      en: 'The conflict between science and Torah is imaginary',
      he: 'הסכסוך בין מדע לתורה — מדומה',
      uk: 'Конфлікт між наукою та Торою — уявний',
    },
    content: {
      ru: `<h3>Наука — гипотеза, а не истина</h3>
<p>Эмпирическая наука строится на наблюдениях «здесь и сейчас». Когда учёные берутся судить о событиях, произошедших миллиарды лет назад, они вступают в область чистой экстраполяции. Любая теория, включая эволюцию, может быть опровергнута завтра — и история науки полна таких примеров. То, что вчера считалось незыблемым фактом, сегодня оказывается устаревшей моделью. Наука по определению оперирует гипотезами, а не абсолютными истинами. Поэтому ставить научную теорию выше слова Б-га — значит путать предположение с фактом.</p>

<h3>Творец и «зрелое» состояние мира</h3>
<p>Если Творец создал мир, Он вполне мог создать его «зрелым» — Адам был взрослым мужчиной, а не младенцем, деревья появились уже с плодами, а Земля могла содержать готовые геологические слои с самого начала. Наука обнаруживает эти слои и делает вывод о миллиардах лет — но это лишь одна из возможных интерпретаций. Учёный, не допускающий существования Творца, ограничен в своих выводах собственной предпосылкой. Верующий человек видит в тех же данных свидетельство мудрости Создателя, Который сотворил мир полностью готовым к жизни.</p>

<h3>Вывод для жизни</h3>
<p>Тора — это «Торат Хаим», Учение Жизни, которое даёт абсолютную точку отсчёта для каждого решения и поступка. Научные теории относительны и изменчивы — они не могут служить фундаментом для нравственности и смысла существования. Вера в Творца не требует отказа от разума — напротив, глубокое размышление неизбежно приводит к признанию Единого Источника всего сущего. Истинная мудрость начинается там, где человек осознаёт границы своего познания и принимает руководство Того, Кто знает всё.</p>`,

      en: `<h3>Science Is a Hypothesis, Not Truth</h3>
<p>Empirical science builds on observations in the here and now. When scientists presume to judge events that occurred billions of years ago, they enter the realm of pure extrapolation. Any theory, including evolution, can be disproven tomorrow — and the history of science is full of such examples. What was considered an unshakable fact yesterday turns out to be an outdated model today. Science by definition operates with hypotheses, not absolute truths. Therefore, placing a scientific theory above the word of G-d means confusing an assumption with a fact.</p>

<h3>The Creator and the "Mature" State of the World</h3>
<p>If the Creator made the world, He could well have created it "mature" — Adam was an adult man, not an infant; trees appeared already bearing fruit; and the Earth could have contained ready geological layers from the very beginning. Science discovers these layers and concludes billions of years — but this is just one possible interpretation. A scientist who does not allow for the existence of a Creator is limited in his conclusions by his own premise. A person of faith sees in the same data evidence of the wisdom of the Creator, Who fashioned a world fully ready for life.</p>

<h3>A Conclusion for Life</h3>
<p>The Torah is "Torat Chaim" — Instructions for Life — providing an absolute reference point for every decision and action. Scientific theories are relative and changeable — they cannot serve as a foundation for morality and the meaning of existence. Faith in the Creator does not require abandoning reason — on the contrary, deep reflection inevitably leads to recognizing the Single Source of all that exists. True wisdom begins where a person acknowledges the limits of their knowledge and accepts the guidance of the One Who knows everything.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-depression',
    slug: 'psikhologiya-deystviya-depressiya-kak-instrument-vraga',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Психология действия: Депрессия как инструмент вашего врага',
      en: 'Psychology of Action: Depression as Your Enemy\'s Tool',
      he: 'פסיכולוגיית הפעולה: דיכאון ככלי הנשק של האויב שלך',
      uk: 'Психологія дії: Депресія як інструмент вашого ворога',
    },
    subtitle: {
      ru: 'Уныние — стратегическое оружие йецер а-ра',
      en: 'Melancholy is the strategic weapon of the yetzer hara',
      he: 'עצבות — הנשק האסטרטגי של היצר הרע',
      uk: 'Зневіра — стратегічна зброя єцер а-ра',
    },
    content: {
      ru: `<h3>Ловушка «дурного начала»</h3>
<p>Депрессия — это не просто плохое настроение, а стратегическое оружие йецер а-ра (дурного начала). Его цель — заставить человека опустить руки и прекратить выполнение своей миссии в этом мире. Когда человек погружается в уныние, он теряет драгоценное время, которое мог бы использовать для добрых дел и духовного роста. Самокопание и бесконечный анализ своих недостатков — это именно та ловушка, в которую хочет загнать нас дурное начало. Пока человек занят сожалениями, он парализован и неспособен действовать.</p>

<h3>Лекарство — в действии</h3>
<p>«Главное — это действие», — учит Тора. Одно маленькое доброе дело, одна мицва имеет бесконечную ценность перед Б-гом и способна полностью изменить внутреннее состояние человека. Не нужно ждать, пока придёт вдохновение или исчезнет тоска — нужно просто начать делать. Зажечь свечу, дать цдаку, сказать доброе слово. Каждое такое действие пробивает брешь в стене уныния и впускает свет. Ребе неоднократно подчёркивал: даже самое малое усилие в служении Б-гу перевешивает годы бездействия.</p>

<h3>Смещение фокуса</h3>
<p>Меланхолия рождается от чрезмерной сосредоточенности на самом себе. Самый быстрый путь из личного кризиса — переключить внимание на других людей. Помощь ближнему, будь то доброе слово, практическая поддержка или просто искренняя улыбка, мгновенно выводит из замкнутого круга самокопания. Депрессия никогда не является оправданием для бездействия — напротив, именно в моменты тьмы от нас требуется максимальное усилие. Тот, кто помогает другим, обнаруживает, что его собственная тьма рассеивается сама собой.</p>`,

      en: `<h3>The Trap of the "Evil Inclination"</h3>
<p>Depression is not merely a bad mood — it is a strategic weapon of the yetzer hara (evil inclination). Its goal is to make a person drop their hands and stop fulfilling their mission in this world. When a person sinks into melancholy, they lose precious time that could be used for good deeds and spiritual growth. Self-digging and endless analysis of one's shortcomings is precisely the trap the evil inclination wants to drive us into. While a person is occupied with regrets, they are paralyzed and incapable of action.</p>

<h3>The Cure Is in Action</h3>
<p>"The main thing is action," the Torah teaches. One small good deed, one mitzvah has infinite value before G-d and can completely change a person's inner state. There is no need to wait for inspiration to come or for sadness to disappear — one simply needs to start doing. Light a candle, give tzedakah, say a kind word. Each such action breaks through the wall of melancholy and lets in light. The Rebbe repeatedly emphasized: even the smallest effort in serving G-d outweighs years of inaction.</p>

<h3>Shifting the Focus</h3>
<p>Melancholy is born from excessive focus on oneself. The fastest path out of a personal crisis is to switch your attention to other people. Helping another person — whether through a kind word, practical support, or simply a sincere smile — instantly breaks the vicious cycle of self-absorption. Depression is never a justification for inaction — on the contrary, it is precisely in moments of darkness that maximum effort is required of us. The one who helps others discovers that their own darkness dissipates on its own.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-family',
    slug: 'sekret-semeynogo-schastya-kto-osnova-doma',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Секрет семейного счастья: Кто на самом деле «основа дома»?',
      en: 'The Secret of Family Happiness: Who Is Really the "Foundation of the Home"?',
      he: 'סוד האושר המשפחתי: מי באמת "עקרת הבית"?',
      uk: 'Секрет сімейного щастя: Хто насправді «основа дому»?',
    },
    subtitle: {
      ru: 'Акерет а-Баит и искусство уступать ради мира',
      en: 'Akeret HaBayit and the art of yielding for the sake of peace',
      he: 'עקרת הבית ואומנות הוויתור למען השלום',
      uk: 'Акерет а-Баіт і мистецтво поступатися заради миру',
    },
    content: {
      ru: `<h3>Жена — основа дома</h3>
<p>Понятие «Акерет а-Баит» — «основа дома» — означает, что именно женщина определяет атмосферу в семье. Её настроение, её слова, её отношение к мужу и детям формируют ту среду, в которой живёт каждый член семьи. В материальных и бытовых вопросах муж должен прислушиваться к мнению жены — её интуиция и чуткость делают её мнение приоритетным. Ребе писал, что мудрый муж понимает: уступая жене в повседневных делах, он не теряет авторитет, а укрепляет фундамент своего дома. Женская мудрость — это дар Б-га, и пренебрегать им означает пренебрегать Его благословением.</p>

<h3>Мир как сосуд для благословений</h3>
<p>Шалом Байт — мир в доме — это не просто отсутствие ссор. Это единственный сосуд, способный удержать благословения Всевышнего — в заработке, здоровье, воспитании детей. Там, где нет мира, благословения «утекают», как вода из треснувшего кувшина. Ребе подчёркивал: даже если человек усердно учит Тору и исполняет заповеди, но в его доме нет мира — все его духовные достижения оказываются под угрозой. Шалом Байт — это не дополнение к духовной жизни, а её необходимое условие.</p>

<h3>Искусство уступать</h3>
<p>Даже если вы абсолютно правы, уступите ради мира. Тот, кто уступает, привлекает Шхину — Б-жественное присутствие — в свой дом. Не пытайтесь изменить супруга силой — личный пример доброты и терпения куда эффективнее любых слов и упрёков. Ребе учил: каждая уступка ради мира — это не слабость, а величайшая сила. Дом, в котором оба супруга готовы уступить друг другу, становится местом, где Б-г желает пребывать. А где присутствует Б-г — там изобилие, радость и истинное счастье.</p>`,

      en: `<h3>The Wife Is the Foundation of the Home</h3>
<p>The concept of "Akeret HaBayit" — "foundation of the home" — means that it is the woman who determines the atmosphere in the family. Her mood, her words, her attitude toward her husband and children shape the environment in which every family member lives. In material and household matters, the husband should listen to his wife's opinion — her intuition and sensitivity make her perspective the priority. The Rebbe wrote that a wise husband understands: by yielding to his wife in everyday matters, he does not lose authority but strengthens the foundation of his home. A woman's wisdom is a gift from G-d, and to disregard it means to disregard His blessing.</p>

<h3>Peace as a Vessel for Blessings</h3>
<p>Shalom Bayit — peace in the home — is not merely the absence of arguments. It is the only vessel capable of holding the blessings of Hashem — in income, health, and the upbringing of children. Where there is no peace, blessings "leak out" like water from a cracked jug. The Rebbe emphasized: even if a person diligently studies Torah and fulfills commandments, but there is no peace in his home — all his spiritual achievements are at risk. Shalom Bayit is not a supplement to spiritual life but its essential prerequisite.</p>

<h3>The Art of Yielding</h3>
<p>Even if you are absolutely right, yield for the sake of peace. The one who yields attracts the Shechinah — the Divine Presence — into their home. Do not try to change your spouse by force — a personal example of kindness and patience is far more effective than any words or reproaches. The Rebbe taught: every concession for the sake of peace is not weakness but the greatest strength. A home in which both spouses are willing to yield to each other becomes a place where G-d desires to dwell. And where G-d is present — there is abundance, joy, and true happiness.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-wealth',
    slug: 'kod-uspekha-zachem-vam-nuzhny-dengi',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Код успеха: Зачем вам на самом деле нужны деньги?',
      en: 'The Success Code: What Do You Really Need Money For?',
      he: 'קוד ההצלחה: למה אתה באמת צריך כסף?',
      uk: 'Код успіху: Навіщо вам насправді потрібні гроші?',
    },
    subtitle: {
      ru: 'Материальный успех — инструмент для высшей задачи',
      en: 'Material success is a tool for a higher purpose',
      he: 'הצלחה חומרית — כלי למשימה עליונה',
      uk: 'Матеріальний успіх — інструмент для вищого завдання',
    },
    content: {
      ru: `<h3>Испытание богатством</h3>
<p>Бедность — тяжёлое испытание, но богатство — ещё тяжелее. Когда человек достигает финансового успеха, возникает иллюзия, что всё достигнуто собственным умом и усилиями. Это самая опасная ловушка, потому что она отрезает человека от истинного Источника всех благ. Ребе напоминал: золото и серебро были созданы прежде всего для того, чтобы «строить Храм» — то есть использовать материальные ресурсы для святых целей. Тот, кто забывает об этом предназначении, превращает благословение Б-га в испытание, которое может его сломить.</p>

<h3>Бизнес как миссия</h3>
<p>Не разделяйте бизнес и духовную жизнь — они должны быть единым целым. Честность в деловых отношениях, признание того, что каждый успех является благословением Всевышнего, — это лучший способ освятить Имя Б-га в мире. Ребе писал многим бизнесменам: ваш офис — это тоже место служения. Каждая честная сделка, каждое доброе слово партнёру или сотруднику — это мицва. Когда нееврей видит, что еврейский бизнесмен ведёт дела с безупречной честностью, это производит впечатление сильнее любой проповеди и освящает Имя Б-га.</p>

<h3>Инвестиция в вечность</h3>
<p>Самый надёжный способ сохранить капитал — это цдака. Ребе настаивал: отделяйте десятину немедленно, как самый важный «платёж». Это не потеря, а создание духовного канала для новых благословений. Богатство дано человеку, чтобы помогать другим и поддерживать духовные проекты — изучение Торы, еврейское образование, помощь нуждающимся. Тот, кто щедро даёт цдаку, обнаруживает удивительную закономерность: чем больше он отдаёт, тем больше Б-г посылает ему. Это не магия — это духовный закон, установленный Творцом.</p>`,

      en: `<h3>The Test of Wealth</h3>
<p>Poverty is a difficult test, but wealth is even harder. When a person achieves financial success, the illusion arises that everything was achieved by their own mind and effort. This is the most dangerous trap, because it cuts a person off from the true Source of all blessings. The Rebbe reminded us: gold and silver were created primarily to "build the Temple" — that is, to use material resources for holy purposes. The one who forgets this purpose transforms G-d's blessing into a trial that may break them.</p>

<h3>Business as a Mission</h3>
<p>Do not separate business from spiritual life — they should be one and the same. Honesty in business dealings, acknowledging that every success is a blessing from Hashem — this is the best way to sanctify G-d's Name in the world. The Rebbe wrote to many businessmen: your office is also a place of service. Every honest deal, every kind word to a partner or employee is a mitzvah. When a non-Jew sees that a Jewish businessman conducts affairs with impeccable honesty, it makes an impression stronger than any sermon and sanctifies G-d's Name.</p>

<h3>An Investment in Eternity</h3>
<p>The most reliable way to preserve capital is tzedakah. The Rebbe insisted: set aside the tithe immediately as the most important "payment." This is not a loss but the creation of a spiritual channel for new blessings. Wealth is given to a person to help others and support spiritual projects — Torah study, Jewish education, assistance to those in need. The one who gives tzedakah generously discovers an amazing pattern: the more they give, the more G-d sends them. This is not magic — it is a spiritual law established by the Creator.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-mission',
    slug: 'globalnyy-vyzov-kak-odin-chelovek-mozhet-izmenit-mir',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Глобальный вызов: Как один человек может изменить мир?',
      en: 'Global Challenge: How Can One Person Change the World?',
      he: 'אתגר גלובלי: איך אדם אחד יכול לשנות את העולם?',
      uk: 'Глобальний виклик: Як одна людина може змінити світ?',
    },
    subtitle: {
      ru: 'На каждом лежит ответственность за судьбу человечества',
      en: 'Everyone bears responsibility for the fate of humanity',
      he: 'על כל אחד מוטלת האחריות לגורל האנושות',
      uk: 'На кожному лежить відповідальність за долю людства',
    },
    content: {
      ru: `<h3>Универсальная миссия</h3>
<p>Еврейский народ несёт особую ответственность — распространять Семь заповедей потомков Ноаха среди всех народов мира. Эти заповеди — основа справедливости, гуманизма и признания Высшего авторитета для всего общества. Ребе неоднократно подчёркивал: это не просто рекомендация, а обязанность каждого еврея. Мир, в котором люди признают Творца и живут по Его законам, — это мир, готовый к приходу Мошиаха. Каждый разговор, в котором вы делитесь этими идеями, приближает всё человечество к его истинному предназначению.</p>

<h3>Влияние каждого</h3>
<p>Любой человек, обладающий авторитетом — профессор, бизнесмен, общественный деятель — обязан использовать своё влияние для укрепления осознания личной ответственности перед Творцом. Ребе писал президентам, учёным, деятелям культуры — и каждому говорил одно: используйте данную вам платформу, чтобы нести свет в мир. Не нужно быть раввином, чтобы влиять на людей. Достаточно быть честным человеком, который своим примером показывает, что жизнь по воле Б-га — это путь к счастью и процветанию.</p>

<h3>Эффект бабочки</h3>
<p>Одно маленькое доброе дело, одно доброе слово может склонить чашу весов всего мира к добру. Мир подобен единому организму — исцеление одной части влияет на целое. Ребе учил: никогда не говори «я слишком мал, чтобы что-то изменить». Каждый поступок записывается на небесах и имеет вечное значение. Один человек, зажёгший свечу в темноте, освещает путь для тысяч. Б-г создал мир так, что каждое действие имеет значение — и именно ваше действие может оказаться решающим.</p>

<h3>Путь к избавлению</h3>
<p>Мир стоит на пороге эры Мошиаха. Всё, что нужно — добавить ещё немного света через добрые дела. Не ждите глобальных перемен — начните с себя. Ребе говорил: мы последнее поколение изгнания и первое поколение Избавления. Каждая мицва, каждый акт доброты, каждое слово Торы приближает тот момент, когда весь мир наполнится знанием Б-га, «как воды покрывают море». Действуйте сейчас — потому что именно ваше действие может стать тем последним добрым делом, которое переведёт мир из тьмы к свету.</p>`,

      en: `<h3>A Universal Mission</h3>
<p>The Jewish people bear a special responsibility — to spread the Seven Noahide Laws among all the nations of the world. These commandments are the foundation of justice, humanism, and recognition of a Higher authority for all of society. The Rebbe repeatedly emphasized: this is not merely a recommendation but an obligation of every Jew. A world in which people acknowledge the Creator and live by His laws is a world ready for the coming of Mashiach. Every conversation in which you share these ideas brings all of humanity closer to its true purpose.</p>

<h3>The Influence of Every Individual</h3>
<p>Anyone who holds authority — a professor, a businessman, a public activist — must use their influence to strengthen awareness of personal responsibility before the Creator. The Rebbe wrote to presidents, scientists, cultural figures — and to each one he said the same thing: use the platform given to you to bring light into the world. You do not need to be a rabbi to influence people. It is enough to be an honest person who by their example shows that living according to G-d's will is the path to happiness and prosperity.</p>

<h3>The Butterfly Effect</h3>
<p>One small good deed, one kind word can tip the scales of the entire world toward good. The world is like a single organism — healing one part affects the whole. The Rebbe taught: never say "I am too small to change anything." Every action is recorded in heaven and has eternal significance. One person who lights a candle in the darkness illuminates the path for thousands. G-d created the world so that every action matters — and it is precisely your action that may prove to be the decisive one.</p>

<h3>The Path to Redemption</h3>
<p>The world stands on the threshold of the Mashiach era. All that is needed is to add a little more light through good deeds. Do not wait for global changes — start with yourself. The Rebbe said: we are the last generation of exile and the first generation of Redemption. Every mitzvah, every act of kindness, every word of Torah brings closer that moment when the entire world will be filled with the knowledge of G-d, "as the waters cover the sea." Act now — because it is precisely your action that may become the final good deed that transitions the world from darkness to light.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-furniture',
    slug: 'remont-mebeli-ili-vospitaniye-dushi-metafora',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Ремонт мебели или воспитание души? Метафора ответственности',
      en: 'Furniture Repair or Soul Education? A Metaphor of Responsibility',
      he: 'תיקון רהיטים או חינוך הנשמה? מטאפורה של אחריות',
      uk: 'Ремонт меблів чи виховання душі? Метафора відповідальності',
    },
    subtitle: {
      ru: 'Воспитание — осознанный труд, а не случайный процесс',
      en: 'Education is conscious labor, not an accidental process',
      he: 'חינוך הוא עבודה מודעת, לא תהליך מקרי',
      uk: 'Виховання — усвідомлена праця, а не випадковий процес',
    },
    content: {
      ru: `<h3>Партнерство с Творцом</h3>
<p>Мудрецы Талмуда учат, что в создании каждого человека участвуют три партнёра: отец, мать и Святой, благословен Он. Отец и мать дают физическое тело, а Всевышний вкладывает Божественную искру — нешаму, святую душу. Однако после рождения ребёнка Творец, образно говоря, передаёт исключительную ответственность за эту Божественную искру в руки родителей. Именно они становятся хранителями и воспитателями того бесценного дара, который Б-г доверил им. Это не просто честь, а священная обязанность, которая требует полной самоотдачи, мудрости и постоянного духовного труда. Каждый день воспитания — это продолжение акта творения, в котором родители формируют будущее своего ребёнка и всего еврейского народа.</p>

<h3>Анализ и дисциплина</h3>
<p>Подобно опытному реставратору мебели, который внимательно изучает каждую деталь перед началом работы, родитель обязан тщательно анализировать сильные и слабые стороны своего ребёнка. Необходимо определить, какие факторы формируют его характер, понять, какие «детали» нуждаются в замене, а какие — в укреплении. Этот процесс требует сочетания безусловной любви и объективности — двух качеств, которые лишь на первый взгляд кажутся противоречивыми. Ребе предупреждал: нельзя позволять духовным деталям воспитания тускнеть ради материального комфорта. Когда родители ставят карьерный успех или финансовое благополучие выше духовного развития ребёнка, они рискуют потерять самое главное. Истинный воспитатель — тот, кто видит в ребёнке не проект для достижения земных целей, а душу, нуждающуюся в заботливом и осознанном руководстве на пути к Б-гу.</p>`,

      en: `<h3>Partnership with the Creator</h3>
<p>The Sages of the Talmud teach that three partners participate in the creation of every person: the father, the mother, and the Holy One, blessed be He. The father and mother provide the physical body, while the Almighty implants the Divine spark — the neshama, the holy soul. However, after the child's birth, the Creator, so to speak, transfers exclusive responsibility for this Divine spark into the hands of the parents. They become the guardians and educators of the priceless gift that G-d has entrusted to them. This is not merely an honor but a sacred duty that demands complete dedication, wisdom, and constant spiritual labor. Every day of upbringing is a continuation of the act of creation, in which parents shape the future of their child and of the entire Jewish people.</p>

<h3>Analysis and Discipline</h3>
<p>Like an experienced furniture restorer who carefully examines every detail before beginning work, a parent must thoroughly analyze the strengths and weaknesses of their child. It is necessary to determine which factors shape the child's character, to understand which "parts" need replacement and which need strengthening. This process requires a combination of unconditional love and objectivity — two qualities that only at first glance seem contradictory. The Rebbe warned: one must not allow the spiritual details of education to fade for the sake of material comfort. When parents place career success or financial well-being above the spiritual development of their child, they risk losing what matters most. A true educator is one who sees in a child not a project for achieving earthly goals, but a soul in need of caring and conscious guidance on the path to G-d.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-teens',
    slug: 'podrostkovyy-krizis-kak-ne-poteryat-svyaz',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Подростковый кризис: Как не потерять связь с ребенком?',
      en: 'The Teenage Crisis: How Not to Lose Connection with Your Child?',
      he: 'משבר גיל ההתבגרות: איך לא לאבד את הקשר עם הילד?',
      uk: 'Підліткова криза: Як не втратити зв\'язок із дитиною?',
    },
    subtitle: {
      ru: 'Естественное стремление к самостоятельности и способы преодоления',
      en: 'The natural desire for independence and ways to overcome the crisis',
      he: 'השאיפה הטבעית לעצמאות ודרכים להתגבר על המשבר',
      uk: 'Природне прагнення до самостійності та способи подолання',
    },
    content: {
      ru: `<h3>Смена тактики</h3>
<p>Подростковый возраст — это период, когда ребёнок стремится ощутить себя взрослым и самостоятельным. Прямое давление со стороны родителей в это время не только неэффективно, но и опасно: оно усиливает сопротивление и отталкивает подростка ещё дальше. Ребе учил, что мудрый родитель понимает: тактика, которая работала с маленьким ребёнком, уже не подходит для подростка. Необходимо перестроить отношения на новых основах — уважения, терпения и доверия. Вместо приказов следует предлагать выбор, вместо нотаций — делиться жизненным опытом. Родитель должен стать для подростка не надзирателем, а мудрым советником, к которому хочется обращаться за помощью. Этот переход требует огромной внутренней работы, но именно он сохраняет связь между поколениями.</p>

<h3>Сила окружения</h3>
<p>Если ребёнок перестал слушать родителей, Ребе советовал использовать влияние «объективных» источников — хороших друзей, наставников, учителей. Подросток значительно охотнее принимает тот же самый совет от сверстника или уважаемого им авторитета извне, чем от собственных родителей. Задача родителей в таком случае — помочь ребёнку оказаться в правильном окружении, среди людей, которые будут положительно на него влиять. Выберите подходящую ешиву, познакомьте ребёнка с достойными ровесниками, обеспечьте доступ к вдохновляющим наставникам. Правильное окружение способно сделать то, чего не могут добиться даже самые любящие родители.</p>

<h3>Суть проблемы</h3>
<p>«Светскость» или протестное поведение подростка — это лишь внешняя «одежда», скрывающая истинную святую сущность его души. Ребе неоднократно подчёркивал: не судите по временным маскам, которые надевает на себя молодой человек. За бунтом и провокацией скрывается та же чистая нешама, которая жаждет близости к Б-гу. Задача родителей — не бороться с внешними проявлениями, а укреплять внутреннее «я» ребёнка через правильное окружение и терпеливую любовь. Когда подросток чувствует, что его принимают и любят безусловно, маски спадают сами собой, и святая искра внутри него начинает светить в полную силу.</p>`,

      en: `<h3>Changing Tactics</h3>
<p>Adolescence is a period when a child strives to feel grown-up and independent. Direct pressure from parents at this time is not only ineffective but dangerous: it increases resistance and pushes the teenager even further away. The Rebbe taught that a wise parent understands: tactics that worked with a young child are no longer suitable for a teenager. It is necessary to rebuild the relationship on new foundations — respect, patience, and trust. Instead of commands, one should offer choices; instead of lectures, share life experience. A parent must become not a supervisor but a wise counselor to whom the teen wants to turn for help. This transition requires enormous inner work, but it is precisely what preserves the bond between generations.</p>

<h3>The Power of Environment</h3>
<p>If a child has stopped listening to their parents, the Rebbe advised using the influence of "objective" sources — good friends, mentors, teachers. A teenager much more readily accepts the very same advice from a peer or a respected outside authority than from their own parents. The parents' task in such a case is to help the child find themselves in the right environment, among people who will positively influence them. Choose a suitable yeshiva, introduce the child to worthy peers, provide access to inspiring mentors. The right environment can accomplish what even the most loving parents cannot achieve on their own.</p>

<h3>The Root of the Problem</h3>
<p>"Secularity" or protest behavior in a teenager is merely external "clothing" hiding the true holy essence of their soul. The Rebbe repeatedly emphasized: do not judge by the temporary masks that a young person puts on. Behind rebellion and provocation lies the same pure neshama that yearns for closeness to G-d. The parents' task is not to fight external manifestations but to strengthen the child's inner self through the right environment and patient love. When a teenager feels accepted and loved unconditionally, the masks fall away on their own, and the holy spark within begins to shine at full strength.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-woman-home',
    slug: 'zhenshchina-kak-osnova-doma-dukhovnyy-mikroklimat',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Женщина как «Основа дома»: Духовный микроклимат семьи',
      en: 'Woman as the "Foundation of the Home": The Spiritual Microclimate of the Family',
      he: 'האישה כ"עקרת הבית": האקלים הרוחני של המשפחה',
      uk: 'Жінка як «Основа дому»: Духовний мікроклімат сім\'ї',
    },
    subtitle: {
      ru: 'Акерет а-Баит — от матери зависит успех воспитания',
      en: 'Akeret HaBayit — the success of education depends on the mother',
      he: 'עקרת הבית — הצלחת החינוך תלויה באם',
      uk: 'Акерет а-Баїт — від матері залежить успіх виховання',
    },
    content: {
      ru: `<h3>Эмоциональный канал</h3>
<p>Мать передаёт ценности через чувства и живой пример — это самый мощный канал воспитания, который существует. Слова, произнесённые с искренностью и добротой, проникают в сердца детей значительно глубже, чем любые логические аргументы. Ребе неоднократно подчёркивал особую роль женщины в еврейском доме: отец обеспечивает финансовую основу для образования и духовного развития семьи, но именно мать создаёт ту атмосферу, в которой всё это укореняется и расцветает. Когда мать зажигает субботние свечи с радостью и благоговением, когда она произносит благословения с искренней верой, дети впитывают это на уровне, недоступном для формального обучения. Эмоциональная связь между матерью и ребёнком — это канал, через который передаётся самое важное: любовь к Б-гу, к Торе и к еврейскому народу.</p>

<h3>Живой пример важнее учебников</h3>
<p>Воспитание эффективно лишь тогда, когда оно подкреплено живым примером и вдохновением. Ребе советовал наполнить дом святыми книгами — сидурами, Хумашем, Теилим — не для украшения полок, а как инструменты, которыми дети учатся пользоваться с раннего возраста. Когда ребёнок видит, что мама каждый день читает Теилим, что папа учит Тору после работы, что в доме царит атмосфера святости и радости — это создаёт невидимую, но прочную защиту для его души. Святые книги в доме — это не просто предметы, а живые источники света, которые формируют духовный микроклимат семьи. Каждый сидур, открытый в руках ребёнка, каждая страница Хумаша, прочитанная вслух за семейным столом, — всё это кирпичики той крепости, которая будет хранить детей на протяжении всей их жизни.</p>`,

      en: `<h3>The Emotional Channel</h3>
<p>A mother transmits values through feelings and living example — this is the most powerful channel of education that exists. Words spoken with sincerity and kindness penetrate children's hearts far more deeply than any logical arguments. The Rebbe repeatedly emphasized the special role of a woman in the Jewish home: the father provides the financial foundation for the family's education and spiritual development, but it is the mother who creates the atmosphere in which all of this takes root and flourishes. When a mother lights Shabbat candles with joy and reverence, when she recites blessings with sincere faith, children absorb this at a level inaccessible to formal instruction. The emotional bond between mother and child is the channel through which the most important things are transmitted: love for G-d, for the Torah, and for the Jewish people.</p>

<h3>A Living Example Is More Important Than Textbooks</h3>
<p>Education is effective only when it is backed by a living example and inspiration. The Rebbe advised filling the home with holy books — siddurim, Chumash, Tehillim — not as shelf decorations but as tools that children learn to use from an early age. When a child sees that their mother reads Tehillim every day, that their father studies Torah after work, that the home is permeated with an atmosphere of holiness and joy — this creates an invisible but strong protection for their soul. Holy books in the home are not merely objects but living sources of light that shape the spiritual microclimate of the family. Every siddur opened in a child's hands, every page of Chumash read aloud at the family table — all of these are building blocks of the fortress that will guard the children throughout their entire lives.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-no-delay',
    slug: 'vyshe-logiki-pochemu-vospitaniye-nelzya-otkladyvat',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Выше логики: Почему воспитание нельзя откладывать «на потом»?',
      en: 'Above Logic: Why Education Cannot Be Postponed?',
      he: 'מעבר להיגיון: למה אסור לדחות חינוך ל"אחר כך"?',
      uk: 'Вище логіки: Чому виховання не можна відкладати «на потім»?',
    },
    subtitle: {
      ru: 'Ждать, пока ребёнок «сам выберет» — противоречит природе еврейской души',
      en: 'Waiting for a child to "choose for themselves" contradicts the nature of the Jewish soul',
      he: 'לחכות שהילד "יבחר בעצמו" — סותר את טבע הנשמה היהודית',
      uk: 'Чекати, поки дитина «сама обере» — суперечить природі єврейської душі',
    },
    content: {
      ru: `<h3>Сердце против разума</h3>
<p>Если учить ребёнка только тому, что способен охватить его разум, духовность будет ограничена рамками человеческой логики. Однако еврейское воспитание по своей сути выходит за эти рамки — оно обращается к душе, а не только к интеллекту. Ребе учил, что основы еврейского образования необходимо закладывать в «первозданном виде», ещё до того, как ребёнок начинает критически анализировать окружающий мир. То, что входит в сердце в раннем детстве, остаётся там навсегда и становится неотъемлемой частью личности. Когда маленький ребёнок слышит о величии Б-га, о красоте Торы, о святости Шаббата — эти образы впечатываются в самую глубину его души. Никакие сомнения и вопросы, которые придут позже, не смогут полностью стереть эти первые духовные впечатления. Именно поэтому откладывать еврейское воспитание «на потом» — значит лишать ребёнка самого мощного фундамента.</p>

<h3>Безоговорочная вера</h3>
<p>Еврейский народ выживает на протяжении тысячелетий не благодаря логике, а благодаря связи с Творцом, которая находится выше природы и рационального объяснения. Эта связь — мсират нефеш, самоотверженная преданность Б-гу — передаётся из поколения в поколение. Воспитывать ребёнка в духе самопожертвования, без «но» и «если», — значит закладывать непоколебимый фундамент на всю жизнь. Ребе призывал родителей не бояться дать ребёнку «слишком много» религии. Истинная гармония приходит к тем, кто живёт по Божественному наставлению с самого детства. Ребёнок, выросший в атмосфере безоговорочной веры, не воспринимает Тору как ограничение — для него это естественная и радостная часть жизни. Не ждите, пока ребёнок «сам выберет», — дайте ему то, что принадлежит его душе по праву рождения, и он будет благодарен вам вечно.</p>`,

      en: `<h3>Heart Against Mind</h3>
<p>If you teach a child only what their mind can grasp, spirituality will be limited by the framework of human logic. Yet Jewish education by its very essence transcends these boundaries — it speaks to the soul, not only to the intellect. The Rebbe taught that the foundations of Jewish education must be laid in their "pristine form," before the child begins to critically analyze the surrounding world. What enters the heart in early childhood remains there forever and becomes an inseparable part of one's identity. When a small child hears about the greatness of G-d, the beauty of Torah, the sanctity of Shabbat — these images are imprinted in the very depths of their soul. No doubts or questions that come later can fully erase these first spiritual impressions. This is precisely why postponing Jewish education "for later" means depriving a child of the most powerful foundation.</p>

<h3>Unconditional Faith</h3>
<p>The Jewish people have survived for millennia not through logic but through a connection to the Creator that stands above nature and rational explanation. This connection — mesirat nefesh, selfless devotion to G-d — is transmitted from generation to generation. Raising a child in the spirit of self-sacrifice, without "buts" and "ifs," means building an unshakeable foundation for a lifetime. The Rebbe urged parents not to fear giving a child "too much" religion. True harmony comes to those who live by Divine instruction from childhood. A child raised in an atmosphere of unconditional faith does not perceive the Torah as a restriction — for them it is a natural and joyful part of life. Do not wait for a child to "choose for themselves" — give them what belongs to their soul by birthright, and they will be grateful to you forever.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-shalom-bayit',
    slug: 'sekret-yevreyskogo-schastya-dokhod-zavisit-ot-atmosfery',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Секрет «еврейского счастья»: Почему ваш доход зависит от атмосферы в спальне?',
      en: 'The Secret of "Jewish Happiness": Why Your Income Depends on the Atmosphere at Home?',
      he: 'סוד ה"מזל היהודי": למה ההכנסה שלך תלויה באווירה בבית?',
      uk: 'Секрет «єврейського щастя»: Чому ваш дохід залежить від атмосфери в спальні?',
    },
    subtitle: {
      ru: 'Мир в семье — «сосуд» для богатства',
      en: 'Peace in the family is a "vessel" for wealth',
      he: 'שלום בית — "כלי" לעושר',
      uk: 'Мир у сім\'ї — «посудина» для багатства',
    },
    content: {
      ru: `<h3>Шалом байт — сосуд для благословений</h3>
<p>Одна из самых поразительных идей Ребе: материальное благополучие семьи напрямую связано с атмосферой мира и любви между супругами. Шалом байт — мир в доме — это не просто приятное дополнение к жизни, а духовный «сосуд», в который Б-г вливает благословения. Когда этот сосуд цел и крепок, благословения наполняют дом изобилием. Когда сосуд треснут от ссор и обид — благословения утекают, словно вода через решето. Ребе писал в одном из своих писем: постоянные конфликты между мужем и женой создают духовную «трещину», через которую уходит не только радость, но и материальный достаток. Это не метафора — это реальный духовный закон.</p>

<h3>Уступай жене — и разбогатеешь</h3>
<p>Ребе давал мужьям удивительно конкретный совет: «В повседневных бытовых вопросах поступайте так, как хочет ваша жена». Это не слабость и не потакание — это мудрость, основанная на глубоком понимании устройства еврейского дома. Женщина — акерет абайт, «основа дома». Именно через неё проходит основной канал благословений в семью. Когда муж уважает её мнение в домашних делах, он укрепляет этот канал. Когда он спорит по каждому пустяку — он сужает поток изобилия в собственный дом. Хотите увеличить свой заработок? Начните не с нового бизнес-плана, а с простого вопроса: «Как ты хочешь, дорогая?»</p>

<h3>Практический путь к достатку</h3>
<p>Ребе подчёркивал: связь между шалом байт и парносой (заработком) не является абстрактной теорией. Он приводил множество примеров, когда семьи, начавшие осознанно работать над миром в доме, видели реальные изменения в своём финансовом положении. Мир в семье привлекает Шхину — Б-жественное присутствие. А где обитает Шхина, там обитает и браха — благословение во всех сферах жизни. Вложите энергию не в претензии друг к другу, а в создание атмосферы тепла, уважения и любви — и вы увидите, как Б-г откроет перед вами каналы изобилия, о которых вы даже не мечтали.</p>`,

      en: `<h3>Shalom Bayit — A Vessel for Blessings</h3>
<p>One of the Rebbe's most striking ideas: a family's material well-being is directly connected to the atmosphere of peace and love between spouses. Shalom Bayit — peace in the home — is not merely a pleasant addition to life, but a spiritual "vessel" into which G-d pours blessings. When this vessel is whole and strong, blessings fill the home with abundance. When the vessel is cracked from quarrels and resentments — blessings leak out like water through a sieve. The Rebbe wrote in one of his letters: constant conflicts between husband and wife create a spiritual "crack" through which not only joy but also material prosperity escapes. This is not a metaphor — it is an actual spiritual law.</p>

<h3>Yield to Your Wife — and Prosper</h3>
<p>The Rebbe gave husbands a remarkably specific piece of advice: "In everyday household matters, do as your wife wants." This is not weakness or indulgence — it is wisdom based on a deep understanding of how a Jewish home functions. The woman is the akeret habayit, the "foundation of the home." It is through her that the primary channel of blessings flows into the family. When a husband respects her opinion in domestic affairs, he strengthens this channel. When he argues over every trifle — he narrows the stream of abundance into his own home. Want to increase your earnings? Start not with a new business plan, but with a simple question: "What would you like, dear?"</p>

<h3>A Practical Path to Prosperity</h3>
<p>The Rebbe emphasized: the connection between shalom bayit and parnassa (livelihood) is not an abstract theory. He cited numerous examples of families who began consciously working on peace in their home and saw real changes in their financial situation. Peace in the family attracts the Shechinah — the Divine Presence. And where the Shechinah dwells, there also dwells bracha — blessing in all areas of life. Invest your energy not in complaints against each other, but in creating an atmosphere of warmth, respect, and love — and you will see how G-d opens channels of abundance before you that you never even dreamed of.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-soul-repair',
    slug: 'remont-dushi-kak-ispravit-oshibki-vospitaniya',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Ремонт души: Как исправить ошибки воспитания, пока не поздно?',
      en: 'Soul Repair: How to Fix Parenting Mistakes Before It\'s Too Late?',
      he: 'תיקון הנשמה: איך לתקן טעויות בחינוך לפני שמאוחר מדי?',
      uk: 'Ремонт душі: Як виправити помилки виховання, поки не пізно?',
    },
    subtitle: {
      ru: 'Сравнение воспитания с ремонтом антикварной мебели',
      en: 'Comparing education to antique furniture repair',
      he: 'השוואת החינוך לשיפוץ רהיטים עתיקים',
      uk: 'Порівняння виховання з ремонтом антикварних меблів',
    },
    content: {
      ru: `<h3>Мастер изучает каждую деталь</h3>
<p>В одном из своих писем Ребе приводит удивительное сравнение: воспитание ребёнка подобно ремонту антикварной мебели. Настоящий мастер-реставратор никогда не берётся за работу, не изучив предварительно каждую деталь, каждую трещинку, каждый слой краски. Он понимает историю предмета, его уникальную структуру и только после этого осторожно, с величайшей деликатностью, начинает восстановление. Так же и родитель должен подходить к душе своего ребёнка — с вниманием, терпением и глубоким уважением к его уникальной природе. Грубое вмешательство может нанести больше вреда, чем бездействие. Но осознанный, любящий подход способен восстановить даже то, что казалось безнадёжно повреждённым.</p>

<h3>Никогда не поздно «добавить света»</h3>
<p>Многие родители, осознав свои ошибки, впадают в отчаяние: «Уже поздно что-то менять». Ребе категорически отвергал такой подход. Он учил: никогда не поздно «добавить света». Даже если вы не были религиозны, даже если вы не давали ребёнку еврейского воспитания в раннем возрасте — ваш собственный духовный рост сегодня мгновенно отражается на ваших детях. Семья — это единый духовный организм. Когда один из её членов поднимается на более высокий уровень, это поднимает всех остальных. Ваша тшува (возвращение к Б-гу) — это не только ваше личное дело. Это мощнейший акт исцеления для всей семьи, включая детей, которые, казалось бы, уже давно выросли и пошли своим путём.</p>

<h3>Бескомпромиссная верность ценностям</h3>
<p>Ребе настаивал: учите детей не логике соблюдения заповедей, а бескомпромиссной верности еврейским ценностям с самого раннего возраста. Ребёнок, который видит, что родители «торгуются» с Торой — соблюдают одно, но игнорируют другое, — усваивает, что вера — это вопрос личного удобства. Напротив, ребёнок, растущий в атмосфере полной преданности Б-гу и Его Торе, воспринимает это как естественный образ жизни. Не бойтесь быть «слишком религиозными» для своих детей. Ребе говорил: избыток света никогда не вредит. Именно та цельность и последовательность, которую вы проявляете в своей духовной жизни, становится самым мощным воспитательным инструментом — сильнее любых слов и нравоучений.</p>`,

      en: `<h3>A Master Studies Every Detail</h3>
<p>In one of his letters, the Rebbe offers a remarkable comparison: raising a child is like repairing antique furniture. A true master restorer never begins work without first studying every detail, every crack, every layer of paint. He understands the history of the piece, its unique structure, and only then carefully, with the greatest delicacy, begins the restoration. In the same way, a parent must approach their child's soul — with attention, patience, and deep respect for their unique nature. Crude intervention can cause more harm than inaction. But a conscious, loving approach can restore even what seemed hopelessly damaged.</p>

<h3>It's Never Too Late to "Add Light"</h3>
<p>Many parents, upon realizing their mistakes, fall into despair: "It's too late to change anything." The Rebbe categorically rejected this approach. He taught: it is never too late to "add light." Even if you were not religious, even if you did not give your child a Jewish upbringing in their early years — your own spiritual growth today instantly reflects upon your children. A family is a single spiritual organism. When one of its members rises to a higher level, it elevates everyone else. Your teshuvah (return to G-d) is not only your personal matter. It is a powerful act of healing for the entire family, including children who seemingly grew up long ago and went their own way.</p>

<h3>Uncompromising Loyalty to Values</h3>
<p>The Rebbe insisted: teach children not the logic of observing commandments, but uncompromising loyalty to Jewish values from the earliest age. A child who sees that parents "bargain" with the Torah — observing one thing while ignoring another — learns that faith is a matter of personal convenience. On the contrary, a child growing up in an atmosphere of complete devotion to G-d and His Torah perceives this as a natural way of life. Do not be afraid of being "too religious" for your children. The Rebbe said: an excess of light never harms. It is precisely the wholeness and consistency that you demonstrate in your spiritual life that becomes the most powerful educational tool — stronger than any words or lectures.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-books-home',
    slug: 'investitsii-v-vechnost-pochemu-knigi-vazhnee-remonta',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Инвестиции в вечность: Почему книги в доме важнее нового ремонта?',
      en: 'Investing in Eternity: Why Books at Home Matter More Than Renovation?',
      he: 'השקעה לנצח: למה ספרים בבית חשובים יותר משיפוץ חדש?',
      uk: 'Інвестиції у вічність: Чому книги в домі важливіші за новий ремонт?',
    },
    subtitle: {
      ru: 'Святые книги — «присутствие» Творца в вашем пространстве',
      en: 'Holy books are the Creator\'s "presence" in your space',
      he: 'ספרי קודש — "נוכחות" הבורא במרחב שלך',
      uk: 'Святі книги — «присутність» Творця у вашому просторі',
    },
    content: {
      ru: `<h3>Современный дом: полон техники, пуст духовно</h3>
<p>Посмотрите на современный еврейский дом: новейший ремонт, дорогая техника, стильная мебель — и ни одной святой книги на полке. Дом, наполненный гаджетами, но лишённый духовного содержания, подобен красивому телу без души. Ребе неоднократно подчёркивал: каждый еврейский дом обязан иметь святые книги — Тору (Хумаш), Теилим (Псалмы), сидур (молитвенник). Это не вопрос «религиозности» или «традиции» — это вопрос духовного здоровья семьи. Книга Торы в доме — это не просто текст на полке. Это присутствие Б-га в вашем жилом пространстве, живая связь с Творцом, которая действует даже тогда, когда вы об этом не думаете.</p>

<h3>Книга — это «присутствие» Творца</h3>
<p>Ребе объяснял: святая книга — это не просто источник информации. Это духовный объект, который излучает святость и создаёт вокруг себя особое поле. Когда в доме есть Хумаш, Теилим и сидур, они создают своего рода защитный «купол» — атмосферу, в которой легче принимать правильные решения, легче сохранять мир в семье, легче воспитывать детей. Дети, растущие в доме, где на видном месте стоят святые книги, впитывают уважение к Торе и к Б-гу на подсознательном уровне. Даже если они ещё не умеют читать — само присутствие этих книг формирует их душу. Библиотека святых книг привлекает радость, мир и благословение в дом — это не просто красивые слова, а духовная реальность, подтверждённая поколениями еврейского опыта.</p>

<h3>Лучшая защита от «улицы»</h3>
<p>Родители часто беспокоятся о «дурном влиянии улицы» на своих детей. Ребе давал простой и мощный совет: наполните дом святостью — и улица потеряет свою силу. Дом, в котором есть святые книги, мезуза на каждом дверном проёме, цдака-бокс (копилка для пожертвований) — это крепость, в которую трудно проникнуть негативным влияниям. Ребёнок, который каждый день видит, как папа открывает Хумаш, как мама читает Теилим, — этот ребёнок несёт в себе внутренний щит, который защищает его везде: в школе, на улице, в интернете. Инвестируйте не только в ремонт стен, но и в наполнение дома вечными ценностями. Книги на полке стоят копейки по сравнению с ремонтом — но их духовная ценность неизмеримо выше любого дизайнерского интерьера.</p>`,

      en: `<h3>The Modern Home: Full of Technology, Spiritually Empty</h3>
<p>Look at the modern Jewish home: the latest renovation, expensive appliances, stylish furniture — and not a single holy book on the shelf. A home filled with gadgets but devoid of spiritual content is like a beautiful body without a soul. The Rebbe repeatedly emphasized: every Jewish home must have holy books — a Torah (Chumash), Tehillim (Psalms), and a siddur (prayer book). This is not a question of "religiosity" or "tradition" — it is a question of the family's spiritual health. A Torah book in the home is not merely text on a shelf. It is the presence of G-d in your living space, a living connection with the Creator that operates even when you are not thinking about it.</p>

<h3>A Book Is the Creator's "Presence"</h3>
<p>The Rebbe explained: a holy book is not merely a source of information. It is a spiritual object that radiates holiness and creates a special field around itself. When a home contains a Chumash, Tehillim, and a siddur, they create a kind of protective "dome" — an atmosphere in which it is easier to make right decisions, easier to maintain peace in the family, easier to raise children. Children growing up in a home where holy books stand in a prominent place absorb respect for the Torah and for G-d on a subconscious level. Even if they cannot yet read — the very presence of these books shapes their soul. A library of holy books attracts joy, peace, and blessing into the home — these are not just beautiful words, but a spiritual reality confirmed by generations of Jewish experience.</p>

<h3>The Best Protection Against "the Street"</h3>
<p>Parents often worry about the "bad influence of the street" on their children. The Rebbe offered simple and powerful advice: fill the home with holiness — and the street will lose its power. A home that contains holy books, a mezuzah on every doorpost, a tzedakah box (charity collection box) — this is a fortress that negative influences find hard to penetrate. A child who sees every day how their father opens a Chumash, how their mother reads Tehillim — that child carries an inner shield that protects them everywhere: at school, on the street, on the internet. Invest not only in renovating walls but in filling the home with eternal values. Books on a shelf cost pennies compared to renovation — but their spiritual value is immeasurably greater than any designer interior.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-israel',
    slug: 'bezopasnost-izrailya-pochemu-eto-kasayetsya-kazhdogo',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Безопасность Израиля: Почему это касается каждого?',
      en: 'Israel\'s Security: Why Does It Concern Everyone?',
      he: 'ביטחון ישראל: למה זה נוגע לכל אחד?',
      uk: 'Безпека Ізраїлю: Чому це стосується кожного?',
    },
    subtitle: {
      ru: 'Еврейский народ — единый организм, каждый человек — жизненно важная часть',
      en: 'The Jewish people are a single organism — every person is a vitally important part',
      he: 'עם ישראל הוא גוף אחד — כל אדם הוא חלק חיוני',
      uk: 'Єврейський народ — єдиний організм, кожна людина — життєво важлива частина',
    },
    content: {
      ru: `<h2>Безопасность Израиля: Почему это касается каждого?</h2>

<p>Земля Израиля — это место, о котором сказано, что «глаза Творца устремлены на неё от начала года и до конца года». Это не просто географическая территория — это духовный центр всего мира, точка, в которой небо соприкасается с землёй. Ребе неоднократно подчёркивал, что духовное состояние каждого еврея, где бы он ни находился, напрямую влияет на безопасность тех, кто живёт в Святой Земле. Любое доброе дело, совершённое даже за тысячи километров от Израиля, создаёт духовную защиту для жителей этой страны. Еврейский народ подобен единому организму: когда болит палец — страдает всё тело; когда укрепляется одна часть — оздоравливается целое.</p>

<p>Ребе призывал не ограничиваться чтением новостей и обсуждением политики, а укреплять личную связь с традицией — зажигать субботние свечи, накладывать тфилин, давать цдаку, изучать Тору. Именно эти действия создают мощнейший духовный щит для всей страны. Б-г дал Своему народу Тору и заповеди как фундамент выживания — и когда мы соблюдаем законы Творца, мы не просто выполняем ритуалы, а строим невидимую крепость, защищающую каждого еврея. Не нужно быть генералом, чтобы защитить Израиль, — достаточно быть евреем, который живёт по Торе и своим примером вдохновляет окружающих.</p>`,

      en: `<h2>Israel's Security: Why Does It Concern Everyone?</h2>

<p>The Land of Israel is the place about which it is said that "the eyes of the Creator are upon it from the beginning of the year to the end of the year." This is not merely a geographical territory — it is the spiritual center of the entire world, the point where heaven meets earth. The Rebbe repeatedly emphasized that the spiritual state of every Jew, wherever they may be, directly affects the safety of those living in the Holy Land. Any good deed performed even thousands of miles from Israel creates a spiritual shield for the country's inhabitants. The Jewish people are like a single organism: when a finger hurts, the whole body suffers; when one part is strengthened, the whole becomes healthier.</p>

<p>The Rebbe urged people not to limit themselves to reading news and discussing politics, but to strengthen their personal connection with tradition — lighting Shabbat candles, putting on tefillin, giving tzedakah, and studying Torah. It is precisely these actions that create the most powerful spiritual shield for the entire country. G-d gave His people the Torah and commandments as the foundation of survival — and when we observe the Creator's laws, we are not merely performing rituals but building an invisible fortress that protects every Jew. You do not need to be a general to defend Israel — it is enough to be a Jew who lives according to the Torah and inspires others by personal example.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-anxiety',
    slug: 'pobedit-trevogu-kak-doveriye-prevrashchayetsya-v-realnost',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Победить тревогу: Как доверие превращается в реальность',
      en: 'Conquering Anxiety: How Trust Becomes Reality',
      he: 'לנצח את החרדה: איך ביטחון הופך למציאות',
      uk: 'Перемогти тривогу: Як довіра перетворюється на реальність',
    },
    subtitle: {
      ru: 'Тревога — признак того, что вы забыли о Творце',
      en: 'Anxiety is a sign that you have forgotten the Creator',
      he: 'חרדה היא סימן שאתה שכחת את הבורא',
      uk: 'Тривога — ознака того, що ви забули про Творця',
    },
    content: {
      ru: `<h2>Победить тревогу: Как доверие превращается в реальность</h2>

<p>Ребе в своих письмах неоднократно объяснял, что качество битахона — упования на Б-га — напрямую определяет объём материальных благословений, которые человек получает. Доверие Творцу — это не пассивное ожидание чуда, а активный канал связи между человеком и Небесами. Когда человек по-настоящему верит, что Всевышний заботится о нём лично, что каждая деталь его жизни находится под Б-жественным присмотром, — он освобождается от «путаницы мыслей», от бесконечного стресса и парализующего страха перед будущим. Тревога — это духовный симптом, признак того, что человек на мгновение забыл о Творце и начал полагаться исключительно на собственные силы.</p>

<p>Ребе советовал вместо того, чтобы тратить энергию на страх и беспокойство, направить её на конкретные действия. Давайте цдаку, даже небольшие суммы, перед молитвой — и ситуация начнёт меняться к лучшему. Произносите слова Теилим с искренним чувством. Помогайте другим людям, особенно тем, кто переживает трудные времена, — ведь лучшее лекарство от собственной тревоги — это забота о ближнем. Когда вы открываете канал добра, Б-г открывает канал благословений в вашу жизнь. Не позволяйте страху управлять вашими решениями — доверьтесь Тому, Кто управляет всем миром.</p>`,

      en: `<h2>Conquering Anxiety: How Trust Becomes Reality</h2>

<p>In his letters, the Rebbe repeatedly explained that the quality of bitachon — trust in G-d — directly determines the volume of material blessings a person receives. Trust in the Creator is not passive waiting for a miracle but an active channel of connection between a person and Heaven. When a person truly believes that Hashem cares for them personally, that every detail of their life is under Divine supervision, they are freed from "confusion of thoughts," from endless stress and paralyzing fear of the future. Anxiety is a spiritual symptom, a sign that a person has momentarily forgotten the Creator and begun to rely solely on their own strength.</p>

<p>The Rebbe advised that instead of spending energy on fear and worry, one should direct it toward concrete actions. Give tzedakah, even small amounts, before prayer — and the situation will begin to change for the better. Recite the words of Tehillim with sincere feeling. Help other people, especially those going through difficult times — for the best remedy for your own anxiety is caring for others. When you open a channel of goodness, G-d opens a channel of blessings into your life. Do not allow fear to control your decisions — place your trust in the One Who governs the entire world.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-gold',
    slug: 'zoloto-serebro-i-vash-biznes-istinnaya-tsel-uspekha',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Золото, серебро и ваш бизнес: В чем истинная цель успеха?',
      en: 'Gold, Silver and Your Business: What Is the True Purpose of Success?',
      he: 'זהב, כסף והעסק שלך: מהי המטרה האמיתית של הצלחה?',
      uk: 'Золото, срібло і ваш бізнес: У чому справжня мета успіху?',
    },
    subtitle: {
      ru: '«Золото и серебро были созданы для строительства Храма»',
      en: '"Gold and silver were created for the building of the Temple"',
      he: '«זהב וכסף נבראו לבניין בית המקדש»',
      uk: '«Золото і срібло були створені для будівництва Храму»',
    },
    content: {
      ru: `<h2>Золото, серебро и ваш бизнес: В чем истинная цель успеха?</h2>

<p>Ребе в своих письмах к бизнесменам неоднократно подчёркивал: материальный успех — это не личная заслуга для удовлетворения эго, а ресурс, доверенный человеку для улучшения мира. Б-г выбирает определённых людей каналами изобилия не потому, что они «лучше» других, а потому, что Он доверяет им распоряжаться этими средствами правильно. Бизнесмен, который открыто признаёт, что его успех — это благословение Всевышнего, освящает саму материю. Золото и серебро, согласно мудрецам, были созданы в первую очередь для строительства Храма — и каждый рубль, потраченный на добрые дела, буквально выполняет эту изначальную задачу.</p>

<p>Ваш офис может стать «маленьким Храмом», если вы ведёте дела честно, платите сотрудникам вовремя и справедливо, и используете прибыль для помощи нуждающимся. Алтер Ребе учил: «Б-г даёт еврею материальное, чтобы тот превратил его в духовное». Это означает, что каждая деловая сделка — это возможность для святости. Когда вы благодарите Б-га за каждый контракт, когда вы отделяете десятину на цдаку, когда вы относитесь к партнёрам и клиентам с уважением и порядочностью — вы превращаете обычный бизнес в служение Творцу.</p>`,

      en: `<h2>Gold, Silver and Your Business: What Is the True Purpose of Success?</h2>

<p>In his letters to businessmen, the Rebbe repeatedly emphasized that material success is not a personal merit for the satisfaction of one's ego, but a resource entrusted to a person to improve the world. G-d chooses certain people as channels of abundance not because they are "better" than others, but because He trusts them to manage these resources properly. A businessman who openly acknowledges that his success is a blessing from Hashem sanctifies matter itself. Gold and silver, according to the Sages, were created primarily for the building of the Temple — and every dollar spent on good deeds literally fulfills this original purpose.</p>

<p>Your office can become a "small Temple" if you conduct business honestly, pay employees fairly and on time, and use profits to help those in need. The Alter Rebbe taught: "G-d gives a Jew material things so that he may transform them into spiritual ones." This means that every business transaction is an opportunity for holiness. When you thank G-d for every contract, when you set aside a tithe for tzedakah, when you treat partners and clients with respect and integrity — you transform an ordinary business into service of the Creator.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-woman-power',
    slug: 'sila-zhenshchiny-kto-stroit-budushcheye',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Сила женщины: Кто на самом деле строит будущее?',
      en: 'The Power of Woman: Who Really Builds the Future?',
      he: 'כוחה של האישה: מי באמת בונה את העתיד?',
      uk: 'Сила жінки: Хто насправді будує майбутнє?',
    },
    subtitle: {
      ru: 'Акерет а-Баит — женщина как основа и фундамент дома',
      en: 'Akeret HaBayit — the woman as the foundation of the home',
      he: 'עקרת הבית — האישה כיסוד וכבסיס הבית',
      uk: 'Акерет а-Баіт — жінка як основа та фундамент дому',
    },
    content: {
      ru: `<h2>Сила женщины: Кто на самом деле строит будущее?</h2>

<p>Ребе в своих письмах к женщинам подчёркивал их уникальную и незаменимую роль в еврейской жизни. Женщина определяет духовный климат семьи — именно она задаёт тон, атмосферу и направление всего домашнего уклада. В материальных и бытовых вопросах, писал Ребе, мужьям следует прислушиваться к своим жёнам, ибо их интуиция делает их мнение приоритетным. Мягкость и терпение женщины предотвращают семейные конфликты и приносят в дом Шалом Баит — мир и гармонию, которые являются основой благословения Б-га. Без этого фундамента ни богатство, ни карьера, ни общественное положение не имеют истинной ценности.</p>

<p>Воспитание детей в духе веры и преданности Торе — это главная миссия, доверенная матери. Ребе писал, что живой пример матери, её радость от исполнения заповедей, её искренняя молитва и доброта влияют на детей неизмеримо сильнее, чем строгие наставления или теоретические поучения. Когда мать зажигает субботние свечи с радостью, когда она благословляет пищу с благоговением, когда она проявляет милосердие к окружающим — дети впитывают это всем сердцем и несут эти ценности через всю жизнь. Женщина — это Акерет а-Баит, основа дома, и через неё Б-г строит будущее всего народа.</p>`,

      en: `<h2>The Power of Woman: Who Really Builds the Future?</h2>

<p>In his letters to women, the Rebbe emphasized their unique and irreplaceable role in Jewish life. A woman determines the spiritual climate of the family — it is she who sets the tone, the atmosphere, and the direction of the entire household. In material and domestic matters, the Rebbe wrote, husbands should listen to their wives, for their intuition makes their opinion a priority. A woman's softness and patience prevent family conflicts and bring Shalom Bayit — peace and harmony that serve as the foundation of G-d's blessing. Without this foundation, neither wealth, nor career, nor social standing holds true value.</p>

<p>Raising children in the spirit of faith and devotion to Torah is the primary mission entrusted to the mother. The Rebbe wrote that a mother's living example — her joy in performing mitzvot, her sincere prayer and kindness — influences children immeasurably more than strict instructions or theoretical teachings. When a mother lights Shabbat candles with joy, when she recites blessings over food with reverence, when she shows compassion to those around her — children absorb this with their whole hearts and carry these values throughout their lives. A woman is the Akeret HaBayit, the foundation of the home, and through her G-d builds the future of the entire nation.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-action-now',
    slug: 'net-vremeni-na-somneniya-glavnoye-eto-deystviye',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Нет времени на сомнения: Главное — это действие',
      en: 'No Time for Doubts: The Main Thing Is Action',
      he: 'אין זמן לספקות: העיקר הוא המעשה',
      uk: 'Немає часу на сумніви: Головне — це дія',
    },
    subtitle: {
      ru: '«Аналитический паралич» — главная болезнь нашего поколения',
      en: '"Analysis paralysis" is the main disease of our generation',
      he: '«שיתוק אנליטי» — המחלה המרכזית של דורנו',
      uk: '«Аналітичний параліч» — головна хвороба нашого покоління',
    },
    content: {
      ru: `<h2>Нет времени на сомнения: Главное — это действие</h2>

<p>Ребе в своих письмах часто обращался к людям, которые откладывали духовный рост, считая себя «недостойными» или «неготовыми». Его ответ был неизменным: начните выполнять хотя бы одну заповедь прямо сейчас. Душа может спуститься в этот мир на семьдесят-восемьдесят лет ради одного единственного поступка — помочь другому человеку, произнести одно благословение, зажечь одну свечу. «Аналитический паралич» — это, по сути, уловка дурного начала, которое убеждает человека, что он должен сначала всё понять, всё изучить, достичь совершенства — и только потом действовать. Но Тора говорит иначе: «Наасе ве-нишма» — сначала сделаем, а потом поймём.</p>

<p>Не ждите идеального момента или полного понимания. Время, прожитое без добрых дел, невозможно вернуть — каждая минута уходит безвозвратно. Ребе учил, что каждое, даже самое маленькое доброе дело имеет бесконечную ценность и способно склонить чашу весов всего мира к добру. Один человек, наложивший тфилин сегодня утром, мог изменить судьбу целого города. Одна женщина, зажёгшая субботние свечи, могла принести свет в тысячи душ. Б-г не требует от нас совершенства — Он требует действия. Встаньте и сделайте хоть что-то прямо сейчас, потому что именно ваш поступок может оказаться тем последним добрым делом, которое переведёт весь мир из тьмы к свету.</p>`,

      en: `<h2>No Time for Doubts: The Main Thing Is Action</h2>

<p>In his letters, the Rebbe frequently addressed people who were postponing spiritual growth, considering themselves "unworthy" or "not ready." His answer was invariable: start performing at least one mitzvah right now. A soul may descend into this world for seventy or eighty years for the sake of a single act — helping another person, reciting one blessing, lighting one candle. "Analysis paralysis" is essentially a trick of the evil inclination, which convinces a person that they must first understand everything, study everything, achieve perfection — and only then act. But the Torah says otherwise: "Naaseh ve-nishma" — first we will do, and then we will understand.</p>

<p>Do not wait for the ideal moment or complete understanding. Time lived without good deeds cannot be returned — every minute passes irrevocably. The Rebbe taught that every good deed, even the smallest one, has infinite value and can tip the scales of the entire world toward good. One person who put on tefillin this morning may have changed the fate of an entire city. One woman who lit Shabbat candles may have brought light to thousands of souls. G-d does not demand perfection from us — He demands action. Stand up and do something right now, because it may be precisely your deed that becomes the final act of goodness that transitions the entire world from darkness to light.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: 'Rebbe\'s Letters', he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-education',
    slug: 'vospitaniye-bez-kompromissov-demokratiya-vredit-rebyonku',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Воспитание без компромиссов: Почему «демократия» вредит вашему ребенку?',
      en: 'Parenting Without Compromise: Why "Democracy" Harms Your Child?',
      he: 'חינוך ללא פשרות: למה "דמוקרטיה" מזיקה לילד שלך?',
      uk: 'Виховання без компромісів: Чому «демократія» шкодить вашій дитині?',
    },
    subtitle: {
      ru: 'Истинный хинух требует бескомпромиссной позиции с раннего возраста',
      en: 'True chinuch demands an uncompromising stance from an early age',
      he: 'חינוך אמיתי דורש עמדה בלתי מתפשרת מגיל צעיר',
      uk: 'Справжній хінух вимагає безкомпромісної позиції з раннього віку',
    },
    content: {
      ru: `<h3>Ошибка логики: ждать, пока ребёнок «сам поймёт»</h3>
<p>Одна из самых распространённых ошибок современных родителей — убеждённость в том, что ребёнку нужно дать «свободу выбора» в вопросах веры и морали. «Пусть вырастет и сам решит» — говорят они, считая это проявлением уважения. Однако Ребе неоднократно предупреждал: ожидание того момента, когда ребёнок «дорастёт до понимания», означает безвозвратную потерю драгоценного времени формирования личности. Фундамент души закладывается в самые ранние годы — именно тогда, когда ребёнок ещё не способен к критическому анализу. И именно поэтому основы веры, любви к Б-гу и соблюдения Торы должны быть заложены в чистом, незамутнённом виде — без оговорок и «демократических» компромиссов. Как строитель не спрашивает у фундамента, хочет ли тот держать здание, так и родитель обязан дать ребёнку прочное духовное основание без колебаний.</p>

<h3>Дисциплина как акт любви</h3>
<p>Ребе сравнивал роль родителя с работой опытного реставратора мебели, который бережно, но решительно разбирает повреждённую конструкцию, чтобы собрать её заново — правильно и прочно. Родители несут ответственность за Б-жественную искру в душе своего ребёнка. Каждый еврейский ребёнок — это доверенное сокровище, и мягкотелость в вопросах хинуха (воспитания) — не доброта, а безответственность. Твёрдость в вере — это не жёсткость, а любовь в её высшем проявлении. Ребёнок, выросший в среде чётких духовных ориентиров, обретает не ограничения, а стабильность и внутреннюю безопасность. Он знает, кто он, откуда пришёл и куда идёт. Размытые границы, напротив, порождают тревогу и потерянность. Истинная любовь к ребёнку — это мужество быть бескомпромиссным в главном, даже если это непопулярно в глазах окружающих.</p>`,

      en: `<h3>The Logic Error: Waiting for a Child to "Understand on Their Own"</h3>
<p>One of the most widespread mistakes of modern parents is the conviction that a child should be given "freedom of choice" in matters of faith and morality. "Let them grow up and decide for themselves," they say, considering it a sign of respect. However, the Rebbe repeatedly warned: waiting for the moment when a child "matures enough to understand" means an irretrievable loss of precious character-formation time. The foundation of the soul is laid in the earliest years — precisely when the child is not yet capable of critical analysis. And that is exactly why the foundations of faith, love of G-d, and Torah observance must be laid in a pure, unclouded form — without caveats or "democratic" compromises. Just as a builder does not ask the foundation whether it wants to support a building, a parent is obligated to give a child a solid spiritual foundation without hesitation.</p>

<h3>Discipline as an Act of Love</h3>
<p>The Rebbe compared the role of a parent to the work of an experienced furniture restorer who carefully yet decisively disassembles a damaged structure in order to reassemble it correctly and firmly. Parents bear responsibility for the Divine spark within their child's soul. Every Jewish child is an entrusted treasure, and softness in matters of chinuch (education) is not kindness but irresponsibility. Firmness in faith is not rigidity — it is love in its highest expression. A child raised in an environment of clear spiritual guideposts gains not restrictions but stability and inner security. They know who they are, where they came from, and where they are going. Blurred boundaries, by contrast, breed anxiety and a sense of being lost. True love for a child is the courage to be uncompromising in what matters most, even when it is unpopular in the eyes of those around you.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-suffering',
    slug: 'pochemu-stradayut-khoroshiye-lyudi-otvet',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Почему страдают хорошие люди? Ответ, который не дают в школах',
      en: 'Why Do Good People Suffer? The Answer They Don\'t Teach in Schools',
      he: 'למה אנשים טובים סובלים? התשובה שלא מלמדים בבתי הספר',
      uk: 'Чому страждають хороші люди? Відповідь, яку не дають у школах',
    },
    subtitle: {
      ru: 'Наше непонимание проистекает из ограниченного взгляда на реальность',
      en: 'Our lack of understanding stems from a limited view of reality',
      he: 'חוסר ההבנה שלנו נובע ממבט מוגבל על המציאות',
      uk: 'Наше нерозуміння походить з обмеженого погляду на реальність',
    },
    content: {
      ru: `<h3>Взгляд из «коридора»</h3>
<p>Этот мир подобен коридору перед огромным залом — миром грядущим. Мы видим лишь узкий фрагмент реальности, но судим обо всём так, словно этот фрагмент и есть вся картина. Ребе объяснял: когда ребёнок не понимает, зачем родитель заставляет его учиться, или когда маленький пациент плачет от боли, причинённой врачом, — это не значит, что родитель жесток или врач — враг. Это значит, что у ребёнка пока нет инструментов для понимания. Разница между нашим разумом и замыслом Творца бесконечно больше, чем разница между разумом младенца и взрослого. Б-г видит всю картину — от начала творения до конца времён, видит все воплощения души, все скрытые связи между событиями. Мы же стоим в тёмном коридоре и пытаемся судить о свете по тени на стене. Признание ограниченности собственного понимания — это не слабость, а проявление интеллектуальной честности и начало истинной мудрости.</p>

<h3>Духовная миссия</h3>
<p>Ребе подчёркивал, что страдание может быть частью сложной миссии души — миссии, которую невозможно понять в рамках одной земной жизни. Творец есть абсолютное добро, и ничто из исходящего от Него не может быть злом в своей сущности. Это не абстрактная теология — это фундаментальный принцип, на котором строится еврейское мировоззрение. Вместо того чтобы тратить силы на вопрос «почему?», который наш ограниченный разум всё равно не в состоянии разрешить полностью, Ребе советовал сосредоточиться на вопросе «для чего?» — как использовать полученный опыт, чтобы стать лучше, сильнее, ближе к Б-гу. Каждое испытание — это возможность раскрыть в себе глубины, о которых мы не подозревали. Боль может стать источником сострадания к другим, потеря — путём к обретению более глубокого смысла, а трудности — ступенями восхождения к уровню, которого душа иначе не достигла бы.</p>`,

      en: `<h3>A View from the "Corridor"</h3>
<p>This world is like a corridor before a great hall — the World to Come. We see only a narrow fragment of reality, yet we judge everything as if that fragment were the entire picture. The Rebbe explained: when a child does not understand why a parent makes them study, or when a small patient cries from the pain inflicted by a doctor, it does not mean the parent is cruel or the doctor is an enemy. It means the child does not yet possess the tools for understanding. The difference between our mind and the plan of the Creator is infinitely greater than the difference between the mind of an infant and that of an adult. G-d sees the entire picture — from the beginning of creation to the end of time, sees all incarnations of the soul, all hidden connections between events. We stand in a dark corridor and try to judge the light by the shadow on the wall. Acknowledging the limitations of our own understanding is not weakness but a manifestation of intellectual honesty and the beginning of true wisdom.</p>

<h3>The Spiritual Mission</h3>
<p>The Rebbe emphasized that suffering may be part of the soul's complex mission — a mission that cannot be understood within the framework of a single earthly life. The Creator is absolute good, and nothing that emanates from Him can be evil in its essence. This is not abstract theology — it is a fundamental principle upon which the Jewish worldview is built. Rather than expending energy on the question "why?" — which our limited mind is incapable of fully resolving — the Rebbe advised focusing on the question "what for?" — how to use the experience gained to become better, stronger, closer to G-d. Every trial is an opportunity to reveal depths within ourselves that we never suspected. Pain can become a source of compassion for others, loss can become a path to discovering deeper meaning, and hardships can become steps of ascent to a level the soul would otherwise never have reached.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-bitachon',
    slug: 'kanal-dlya-chudes-kak-doveriye-stanovitsya-dengami',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Канал для чудес: Как ваше доверие превращается в реальные деньги',
      en: 'Channel for Miracles: How Your Trust Becomes Real Money',
      he: 'ערוץ לניסים: איך האמון שלך הופך לכסף אמיתי',
      uk: 'Канал для чудес: Як ваша довіра перетворюється на реальні гроші',
    },
    subtitle: {
      ru: 'Материальный достаток зависит от качества доверия к Б-гу',
      en: 'Material prosperity depends on the quality of trust in G-d',
      he: 'השפע החומרי תלוי באיכות הביטחון בה׳',
      uk: 'Матеріальний достаток залежить від якості довіри до Б-га',
    },
    content: {
      ru: `<h3>Духовный канал</h3>
<p>Ребе многократно объяснял в своих письмах фундаментальный принцип: битахон (доверие к Б-гу) — это не просто красивое чувство, а реальный духовный механизм, создающий канал для Б-жественных благословений. Представьте себе трубу, по которой текут благословения свыше. Чем сильнее и искреннее ваше доверие — тем шире эта труба, тем больше благ может через неё пройти. И наоборот: тревога, страх, постоянное беспокойство о завтрашнем дне сужают этот канал, буквально перекрывая поток изобилия. Это не метафора — это духовный закон, действующий столь же неукоснительно, как законы физики. Когда человек по-настоящему доверяет Творцу, он открывает себя для получения того, что Б-г хочет ему дать. Беспокойство же — это форма неверия, которая говорит: «Я не верю, что Ты позаботишься обо мне», и тем самым создаёт духовное препятствие для благословения.</p>

<h3>Действие и результат</h3>
<p>При этом Ребе подчёркивал: битахон не означает бездействие. Человек обязан действовать естественным образом — работать, вести бизнес, принимать разумные решения. Б-г создал мир, в котором благословение приходит через естественные каналы, и наша задача — создать «сосуд» (кли) для его получения. Но — и это ключевой момент — необходимо ясно понимать, что успех приходит не благодаря нашим усилиям, а свыше. Золото и серебро принадлежат Б-гу, и Он даёт их человеку для совершения добрых дел — цдаки, помощи ближнему, поддержки изучения Торы. Тот, кто помнит об этом, никогда не будет порабощён своим бизнесом.</p>

<h3>Практический шаг</h3>
<p>В своих письмах Ребе давал конкретный совет тем, кто испытывает финансовые трудности: увеличьте цдаку. Это кажется парадоксальным — как можно отдавать больше, когда денег и так не хватает? Но именно в этом проявляется сила битахона. Цдака — это самый быстрый и проверенный способ привлечь новое благословение в свой бизнес и жизнь. Отдавая, вы демонстрируете Б-гу своё доверие, и Он отвечает мерой, многократно превышающей ваше вложение. Это не магия — это духовная экономика, основанная на принципе «десятина» (маасер), который действует уже тысячи лет.</p>`,

      en: `<h3>The Spiritual Channel</h3>
<p>The Rebbe explained numerous times in his letters a fundamental principle: bitachon (trust in G-d) is not merely a beautiful feeling but a real spiritual mechanism that creates a channel for Divine blessings. Imagine a pipe through which blessings flow from above. The stronger and more sincere your trust, the wider this pipe becomes, and the more goodness can flow through it. Conversely, anxiety, fear, and constant worry about tomorrow constrict this channel, literally blocking the flow of abundance. This is not a metaphor — it is a spiritual law that operates as unfailingly as the laws of physics. When a person truly trusts the Creator, they open themselves to receiving what G-d wants to give them. Worry, on the other hand, is a form of disbelief that says: "I do not believe You will take care of me," and thereby creates a spiritual barrier to blessing.</p>

<h3>Action and Result</h3>
<p>At the same time, the Rebbe emphasized: bitachon does not mean inaction. A person is obligated to act in a natural manner — to work, run a business, make reasonable decisions. G-d created a world in which blessings arrive through natural channels, and our task is to create a "vessel" (kli) for receiving them. But — and this is the key point — one must clearly understand that success comes not through our efforts but from Above. Gold and silver belong to G-d, and He gives them to a person for performing good deeds — tzedakah, helping others, supporting Torah study. One who remembers this will never be enslaved by their business.</p>

<h3>A Practical Step</h3>
<p>In his letters, the Rebbe offered concrete advice to those experiencing financial difficulties: increase your tzedakah. This seems paradoxical — how can one give more when there is already not enough money? But this is precisely where the power of bitachon manifests. Tzedakah is the fastest and most proven way to attract new blessing into your business and life. By giving, you demonstrate your trust in G-d, and He responds with a measure that far exceeds your investment. This is not magic — it is spiritual economics based on the principle of the tithe (ma'aser), which has been operating for thousands of years.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-one-deed',
    slug: 'effekt-odnogo-postupka-mozhet-li-chelovek-izmenit-mir',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Эффект одного поступка: Может ли один человек изменить мир?',
      en: 'The Effect of One Deed: Can One Person Change the World?',
      he: 'אפקט המעשה האחד: האם אדם אחד יכול לשנות את העולם?',
      uk: 'Ефект одного вчинку: Чи може одна людина змінити світ?',
    },
    subtitle: {
      ru: 'Ценность одного-единственного действия бесконечна',
      en: 'The value of a single action is infinite',
      he: 'הערך של מעשה אחד ויחיד הוא אינסופי',
      uk: 'Цінність одного-єдиного вчинку нескінченна',
    },
    content: {
      ru: `<h3>Космический масштаб</h3>
<p>Ребе писал в своих письмах поразительную мысль: душа может спуститься в этот мир на семьдесят-восемьдесят лет — и всё это ради одного-единственного акта помощи другому еврею. Эта идея переворачивает наше привычное представление о ценности поступков. Мы склонны измерять значимость действия его масштабом: крупное пожертвование «считается», а доброе слово одинокому старику — «мелочь». Но в глазах Б-га нет «мелких» добрых дел. Каждая мицва — это космическое событие, каждый акт хеседа (милосердия) вызывает потрясение в высших мирах. Когда вы помогаете кому-то надеть тфилин, зажечь субботние свечи, произнести благословение — вы совершаете действие, ради которого, возможно, была создана вся вселенная. Ребе неустанно повторял: никогда не пренебрегайте «маленьким» добрым делом, потому что именно оно может оказаться тем самым поступком, ради которого ваша душа пришла в этот мир.</p>

<h3>Мир на весах</h3>
<p>Рамбам учит: каждый человек должен видеть себя и весь мир стоящими на весах — ровно посередине между заслугами и грехами. Одно доброе дело — и чаша заслуг всего мира склоняется к добру, принося спасение и избавление всем творениям. Одно доброе слово может склонить чашу весов всего мира к благу. Это не преувеличение — это галахический принцип, сформулированный величайшим кодификатором еврейского закона. Ребе призывал не откладывать доброе дело на потом, не ждать «подходящего момента» или «большой возможности». Сосредоточьтесь на конкретном действии прямо сейчас — именно здесь и именно в эту минуту. Позвоните одинокому человеку, помогите соседу, положите монету в копилку цдаки, произнесите слово Торы. Каждое из этих действий — не «капля в море», а потенциальный поворотный момент в истории всего творения. Б-г дал каждому из нас силу изменить мир — и эта сила заключена в каждом отдельном поступке.</p>`,

      en: `<h3>Cosmic Scale</h3>
<p>The Rebbe wrote a striking thought in his letters: a soul may descend into this world for seventy or eighty years — and all of it for the sake of a single act of helping another Jew. This idea overturns our usual notion of the value of deeds. We tend to measure the significance of an action by its scale: a large donation "counts," while a kind word to a lonely elderly person is "trivial." But in the eyes of G-d, there are no "trivial" good deeds. Every mitzvah is a cosmic event; every act of chesed (kindness) causes a tremor in the higher worlds. When you help someone put on tefillin, light Shabbat candles, or recite a blessing, you are performing an action for which, perhaps, the entire universe was created. The Rebbe tirelessly repeated: never dismiss a "small" good deed, because it may turn out to be the very act for which your soul came into this world.</p>

<h3>The World on the Scales</h3>
<p>The Rambam teaches: every person must see themselves and the entire world as standing on scales — exactly in the middle between merits and transgressions. One good deed — and the scale of merits for the entire world tips toward good, bringing salvation and redemption to all creatures. One kind word can tip the scales of the entire world toward good. This is not an exaggeration — it is a halachic principle formulated by the greatest codifier of Jewish law. The Rebbe urged people not to postpone a good deed, not to wait for the "right moment" or a "big opportunity." Focus on a concrete action right now — right here and at this very minute. Call a lonely person, help a neighbor, place a coin in the tzedakah box, speak a word of Torah. Each of these actions is not a "drop in the ocean" but a potential turning point in the history of all creation. G-d has given each of us the power to change the world — and that power is contained in every single deed.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-identity',
    slug: 'sindrom-podrazhaniya-pochemu-byt-kak-vse-vedet-k-katastrofe',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Синдром подражания: Почему попытка «быть как все» ведет к катастрофе',
      en: 'The Imitation Syndrome: Why Trying to "Be Like Everyone" Leads to Catastrophe',
      he: 'תסמונת החיקוי: למה הניסיון "להיות כמו כולם" מוביל לאסון',
      uk: 'Синдром наслідування: Чому спроба «бути як усі» веде до катастрофи',
    },
    subtitle: {
      ru: 'Стремление ассимилироваться приводит к потере идентичности',
      en: 'The desire to assimilate leads to the loss of identity',
      he: 'השאיפה להיטמע מובילה לאובדן הזהות',
      uk: 'Прагнення асимілюватися призводить до втрати ідентичності',
    },
    content: {
      ru: `<h3>Ложное признание</h3>
<p>Ребе в своих письмах раз за разом возвращался к одной из самых болезненных иллюзий еврейского народа: вере в то, что подражание окружающим народам принесёт признание и безопасность. История снова и снова доказывает обратное. Евреи, пытавшиеся ассимилироваться в Германии, Испании, России, стремившиеся стать «больше немцами, чем сами немцы», не только не заслужили уважения, но вызвали ещё большую антипатию. Подражание — это проявление слабости, а слабость никогда не вызывает уважения. Напротив, другие народы ценят и уважают тех, кто верен своим корням, своей традиции, своей уникальности. Когда еврей гордо носит кипу, соблюдает Шаббат, открыто живёт по Торе — он вызывает подлинное уважение, потому что демонстрирует внутреннюю силу и верность принципам. Ассимиляция же — это духовное самоубийство, замаскированное под «прогресс» и «интеграцию».</p>

<h3>Источник силы</h3>
<p>Секрет выживания еврейского народа на протяжении тысячелетий — один и тот же: непоколебимая верность Торе. Когда евреи отступали от своих корней, они теряли не только духовную идентичность, но и физическую безопасность. Когда возвращались — обретали силу, невозможную с точки зрения обычной логики. «Народ, обитающий отдельно» — это не проклятие, а благословение и миссия. Наша уникальность — это наша сила. Ребе подчёркивал: истинный прогресс еврея — не в том, чтобы следовать за толпой, а в верности вечным ценностям. Тора — не «древний пережиток», а живой источник мудрости, актуальный сегодня не менее, чем три тысячи лет назад. Каждый еврей призван быть носителем света, а не отражением чужих идей. Будьте тем, кем Б-г вас создал — евреем, гордым своим наследием, верным своей миссии, несущим свет Торы в мир. Именно в этой верности — ключ к подлинному уважению, безопасности и процветанию.</p>`,

      en: `<h3>False Acceptance</h3>
<p>In his letters, the Rebbe returned again and again to one of the most painful illusions of the Jewish people: the belief that imitating the surrounding nations will bring acceptance and safety. History has proven the opposite time and again. Jews who tried to assimilate in Germany, Spain, and Russia — striving to become "more German than the Germans themselves" — not only failed to earn respect but aroused even greater antipathy. Imitation is a manifestation of weakness, and weakness never commands respect. On the contrary, other nations value and respect those who are loyal to their roots, their tradition, their uniqueness. When a Jew proudly wears a kippah, observes Shabbat, and openly lives by the Torah, he evokes genuine respect because he demonstrates inner strength and fidelity to principles. Assimilation, by contrast, is spiritual suicide disguised as "progress" and "integration."</p>

<h3>The Source of Strength</h3>
<p>The secret of the Jewish people's survival over millennia is one and the same: unwavering loyalty to the Torah. When Jews departed from their roots, they lost not only their spiritual identity but also their physical safety. When they returned, they gained a strength impossible by ordinary logic. "A nation dwelling alone" is not a curse but a blessing and a mission. Our uniqueness is our strength. The Rebbe emphasized: true progress for a Jew lies not in following the crowd but in loyalty to eternal values. The Torah is not an "ancient relic" but a living source of wisdom, as relevant today as it was three thousand years ago. Every Jew is called to be a bearer of light, not a reflection of others' ideas. Be who G-d created you to be — a Jew, proud of your heritage, faithful to your mission, carrying the light of Torah into the world. It is in this faithfulness that the key to genuine respect, safety, and prosperity is found.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-evolution-myth',
    slug: 'nauchnyy-mif-teoriya-evolyutsii-khrupkaya-gipoteza',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Научный миф: Почему теория эволюции — это лишь хрупкая гипотеза?',
      en: 'Scientific Myth: Why the Theory of Evolution Is Just a Fragile Hypothesis?',
      he: 'המיתוס המדעי: למה תיאוריית האבולוציה היא רק השערה שברירית?',
      uk: 'Науковий міф: Чому теорія еволюції — це лише крихка гіпотеза?',
    },
    subtitle: {
      ru: 'Ребе вскрывает методологическую слабость популярных теорий',
      en: 'The Rebbe exposes the methodological weakness of popular theories',
      he: 'הרבי חושף את החולשה המתודולוגית של תיאוריות פופולריות',
      uk: 'Ребе розкриває методологічну слабкість популярних теорій',
    },
    content: {
      ru: `<h3>Границы научного метода</h3>
<p>Истинная эмпирическая наука основана на наблюдаемых, воспроизводимых экспериментах. Учёный может измерить температуру, зафиксировать химическую реакцию, проверить гипотезу в лаборатории — и это действительно наука. Однако когда наука пытается реконструировать события, якобы происходившие миллионы или миллиарды лет назад, она выходит за пределы своей компетенции. Ребе подчёркивал: подобные реконструкции — это не «факты», а «экстраполяции», то есть предположения, основанные на допущении, что законы природы всегда были такими же, как сегодня. Но именно это допущение невозможно доказать. Любая теория, какой бы популярной она ни была, может быть опровергнута завтра новыми данными. История науки полна примеров, когда «общепринятые истины» рушились под давлением новых открытий. Наука — это процесс, а не набор догм, и честный учёный всегда признаёт границы своего знания.</p>

<h3>Аргумент «зрелого творения»</h3>
<p>Ребе выдвигал глубокий аргумент: если Творец создал мир, Он мог создать его уже «зрелым». Первый человек, Адам, был создан взрослым, а не младенцем. Деревья были сотворены с годичными кольцами, а Земля — со сформированными геологическими слоями и окаменелостями. Когда наука находит кости динозавров и на их основании делает вывод о миллиардах лет существования планеты — это лишь одна из возможных интерпретаций. Творец, способный создать атомы из ничего, мог создать их в виде уже сложных структур мгновенно. Это не «обман» — это проявление Б-жественной мудрости, создавшей мир с полной историей, подобно тому как художник пишет картину с изображением древнего дерева: дерево на картине «выглядит» тысячелетним, но создано в один момент.</p>

<h3>Тора как абсолютная точка отсчёта</h3>
<p>Ребе призывал: не нужно «подгонять» вечную Тору под меняющиеся научные гипотезы. Тора — это «Торат Хаим», дающая абсолютную, неизменную истину, полученную от Самого Творца. Наука полезна в своей области — изучении природы здесь и сейчас, создании технологий, лечении болезней. Но она бессильна ответить на вопросы «зачем?» и «как всё началось?». Вера не противоречит разуму — она начинается там, где заканчивается ограниченный человеческий интеллект. Когда мы принимаем Тору как точку отсчёта, мы обретаем твёрдую почву под ногами, которую никакая «новая теория» не способна поколебать. Б-г создал мир с определённой целью, и эта цель раскрыта в Торе — единственном источнике, который не меняется с веками.</p>`,

      en: `<h3>The Limits of the Scientific Method</h3>
<p>True empirical science is based on observable, reproducible experiments. A scientist can measure temperature, record a chemical reaction, test a hypothesis in a laboratory — and that is indeed science. However, when science attempts to reconstruct events allegedly occurring millions or billions of years ago, it steps beyond its domain of competence. The Rebbe emphasized: such reconstructions are not "facts" but "extrapolations" — assumptions based on the premise that the laws of nature have always been the same as they are today. But this very premise is impossible to prove. Any theory, no matter how popular, can be disproven tomorrow by new data. The history of science is full of examples where "accepted truths" collapsed under the pressure of new discoveries. Science is a process, not a set of dogmas, and an honest scientist always acknowledges the limits of their knowledge.</p>

<h3>The "Mature Creation" Argument</h3>
<p>The Rebbe put forward a profound argument: if the Creator made the world, He could have created it already "mature." The first man, Adam, was created as an adult, not an infant. Trees were created with annual rings, and the Earth with fully formed geological layers and fossils. When science discovers dinosaur bones and concludes that the planet is billions of years old, this is merely one possible interpretation. A Creator capable of creating atoms from nothing could have created them as complex structures instantaneously. This is not "deception" — it is a manifestation of Divine wisdom that created the world with a complete history, much like an artist paints a picture of an ancient tree: the tree in the painting "appears" to be thousands of years old, yet was created in a single moment.</p>

<h3>Torah as the Absolute Frame of Reference</h3>
<p>The Rebbe urged: do not "adjust" the eternal Torah to fit changing scientific hypotheses. The Torah is "Torat Chaim," providing absolute, unchanging truth received from the Creator Himself. Science is useful in its domain — studying nature in the here and now, developing technologies, curing diseases. But it is powerless to answer the questions "why?" and "how did it all begin?" Faith does not contradict reason — it begins where the limited human intellect ends. When we accept the Torah as our frame of reference, we gain solid ground beneath our feet that no "new theory" can shake. G-d created the world with a specific purpose, and that purpose is revealed in the Torah — the only source that does not change with the ages.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-spiritual-kitchen',
    slug: 'dukhovnaya-kukhnya-pochemu-mat-glavnyy-uchitel',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Духовная кухня: Почему мать — главный учитель в жизни ребенка?',
      en: 'The Spiritual Kitchen: Why Mother Is the Main Teacher in a Child\'s Life?',
      he: 'המטבח הרוחני: למה האם היא המורה הראשית בחיי הילד?',
      uk: 'Духовна кухня: Чому мати — головний вчитель у житті дитини?',
    },
    subtitle: {
      ru: 'Акерет а-Баит — женщина как «основа и корень дома»',
      en: 'Akeret HaBayit — the woman as the "foundation and root of the home"',
      he: 'עקרת הבית — האישה כ"יסוד ושורש הבית"',
      uk: 'Акерет а-Баіт — жінка як «основа і корінь дому»',
    },
    content: {
      ru: `<h3>«Приготовление» знаний</h3>
<p>Ребе использовал удивительно точную метафору: отец обеспечивает «ингредиенты» — нанимает учителей, оплачивает школу, приносит домой книги. Но мать — это повар, который «готовит блюдо». Только она способна подать духовные знания так, чтобы они стали частью ребёнка, наполнили его энергией и радостью. Её слова, сказанные с искренностью и любовью, проникают в сердце глубже любой логики и любого учебника. Мать чувствует ребёнка интуитивно — знает, когда он устал, когда готов воспринимать, когда нуждается в ободрении. Она превращает абстрактные заповеди в живой опыт: благословение над хлебом становится тёплым семейным ритуалом, зажигание субботних свечей — моментом волшебства, а молитва перед сном — щитом от страхов. Без этого «приготовления» знания остаются сырыми ингредиентами, которые ребёнок не способен усвоить.</p>

<h3>Живой пример против учебников</h3>
<p>Дети не просто слушают слова — они впитывают атмосферу дома. Ребе подчёркивал: если мать выполняет мицвот с радостью, а не как тяжёлую обязанность, у ребёнка формируется естественная привязанность к традиции, которая сохраняется даже во взрослом возрасте, даже вдали от родительского дома. Никакая школа, никакой самый талантливый учитель не может заменить то, что ребёнок видит каждый день в собственном доме. Когда мать с радостью готовит субботнюю трапезу, когда она с теплом произносит благословения, когда в её глазах светится вера — это впечатывается в душу ребёнка навсегда. Именно поэтому Тора называет женщину «акерет а-баит» — «основа дома»: не «помощница», а именно фундамент, на котором стоит вся духовная жизнь семьи.</p>

<h3>Домашняя библиотека как щит</h3>
<p>Ребе советовал: наполните дом святыми книгами — Торой, Теилим (Псалмами), сидуром (молитвенником). Их присутствие создаёт защитное поле, духовную атмосферу, которая влияет на каждого, кто живёт в этом доме. Когда ребёнок видит книги как живую часть жизни родителей — не пыльные украшения на полке, а источники, к которым обращаются за советом, за утешением, за мудростью, — его связь с Б-гом становится непоколебимой. Святые книги в доме — это не просто предметы, а духовные стражи, хранящие семью. Каждая книга Торы в доме — это присутствие Б-жественного света, невидимый щит, защищающий домочадцев. Мать, которая читает Теилим, создаёт канал благословения для всей семьи — и дети, наблюдая за этим, учатся главному: Б-г — живая реальность, а не абстрактная идея.</p>`,

      en: `<h3>"Preparing" Knowledge</h3>
<p>The Rebbe used a remarkably precise metaphor: the father provides the "ingredients" — hires teachers, pays for school, brings books home. But the mother is the cook who "prepares the dish." Only she can serve spiritual knowledge in a way that it becomes part of the child, fills them with energy and joy. Her words, spoken with sincerity and love, penetrate the heart more deeply than any logic or textbook. A mother feels her child intuitively — she knows when they are tired, when they are ready to absorb, when they need encouragement. She transforms abstract commandments into living experience: the blessing over bread becomes a warm family ritual, the lighting of Shabbat candles becomes a moment of wonder, and the bedtime prayer becomes a shield against fears. Without this "preparation," knowledge remains raw ingredients that a child cannot digest.</p>

<h3>A Living Example vs. Textbooks</h3>
<p>Children do not merely listen to words — they absorb the atmosphere of the home. The Rebbe emphasized: if a mother performs mitzvot with joy rather than as a heavy obligation, the child develops a natural attachment to tradition that endures even in adulthood, even far from the parental home. No school, no matter how talented the teacher, can replace what a child sees every day in their own home. When a mother joyfully prepares the Shabbat meal, when she recites blessings with warmth, when faith shines in her eyes — this is imprinted on the child's soul forever. This is precisely why the Torah calls the woman "akeret habayit" — "the foundation of the home": not a "helper," but the very foundation upon which the entire spiritual life of the family stands.</p>

<h3>A Home Library as a Shield</h3>
<p>The Rebbe advised: fill the home with holy books — Torah, Tehillim (Psalms), a siddur (prayer book). Their presence creates a protective field, a spiritual atmosphere that affects everyone living in that home. When a child sees books as a living part of their parents' lives — not dusty decorations on a shelf, but sources to which they turn for counsel, for comfort, for wisdom — their connection to G-d becomes unshakeable. Holy books in the home are not mere objects but spiritual guardians protecting the family. Every Torah book in the home is a presence of Divine light, an invisible shield guarding the household. A mother who reads Tehillim creates a channel of blessing for the entire family — and children, watching this, learn the most important lesson: G-d is a living reality, not an abstract idea.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-family-peace',
    slug: 'sekret-semeynogo-mira-kak-pobedit-v-spore-ustupiv',
    title: {
      ru: 'Секрет семейного мира: Как победить в споре, уступив?',
      en: 'The Secret of Family Peace: How to Win an Argument by Yielding?',
      he: 'סוד השלום המשפחתי: איך לנצח בוויכוח על ידי ויתור?',
      uk: 'Секрет сімейного миру: Як перемогти у суперечці, поступившись?',
    },
    subtitle: {
      ru: 'Духовная механика отношений и мир как сосуд для благословений',
      en: 'The spiritual mechanics of relationships and peace as a vessel for blessings',
      he: 'המכניקה הרוחנית של היחסים והשלום ככלי לברכות',
      uk: 'Духовна механіка стосунків і мир як посудина для благословень',
    },
    content: {
      ru: `<h3>Мир как сосуд для благословений</h3>
<p>Шалом Байит — это не просто отсутствие скандалов и криков. Ребе объяснял: мир в семье — это единственный сосуд, способный удержать Б-жественное благословение на доход, здоровье и детей. Без мира все достижения «утекают» как вода через решето — человек зарабатывает, но деньги исчезают; получает благословение на здоровье, но болезни возвращаются; растит детей, но теряет с ними связь. Ребе использовал глубокий образ: огонь и вода по своей природе уничтожают друг друга, но когда между ними существует мир — они способны сосуществовать и даже служить друг другу. Так и муж с женой — два разных мира, два разных начала, но именно их гармоничное соединение создаёт пространство, в котором поселяется Шхина (Б-жественное присутствие). Когда Шхина в доме — всё процветает: дети растут здоровыми, пропитание приходит с лёгкостью, а радость наполняет каждый угол.</p>

<h3>Искусство уступать</h3>
<p>Ребе давал практический совет: в материальных и бытовых вопросах мужу следует прислушиваться к мнению жены. Женщина обладает интуитивной связью с домом, которой у мужчины часто нет. Она чувствует, что нужно семье, на уровне, недоступном логическому анализу. Уступите, даже если на сто процентов уверены в своей правоте. Уступка — это не слабость, а мудрость, привлекающая Шхину в дом. Когда муж уступает жене в бытовых вопросах, он не теряет — он приобретает нечто бесконечно более ценное: мир, благословение и присутствие Б-га в своём доме. Ребе подчёркивал: тот, кто «побеждает» в семейном споре силой или упрямством, на самом деле проигрывает — потому что разрушает сосуд, в котором могло бы храниться благословение. Настоящая победа — это мир, а мир достигается через умение уступать с любовью и мудростью.</p>

<h3>Взгляд со стороны</h3>
<p>Если конфликт зашёл в тупик, Ребе советовал найти доверенного человека — раввина или общего друга, пользующегося уважением обоих супругов. «Слова, идущие от сердца, входят в сердце» — мягкость и личный пример всегда эффективнее давления. Посторонний взгляд способен увидеть то, что скрыто от самих участников конфликта: каждый из супругов видит ситуацию через призму своих эмоций, обид, ожиданий. Третья сторона может помочь обоим увидеть картину целиком. Ребе предупреждал: никогда не выносите семейные проблемы на публику, не обсуждайте супруга с друзьями или родственниками — это разрушает доверие и усугубляет конфликт. Обратитесь к одному мудрому человеку, способному дать совет с позиции Торы, — и следуйте этому совету с открытым сердцем. Б-г создал семью как самое святое пространство на земле, и защита этого пространства — одна из важнейших заповедей.</p>`,

      en: `<h3>Peace as a Vessel for Blessings</h3>
<p>Shalom Bayit is not simply the absence of quarrels and shouting. The Rebbe explained: peace in the family is the only vessel capable of holding Divine blessing for income, health, and children. Without peace, all achievements "leak" like water through a sieve — a person earns money, but it disappears; receives a blessing for health, but illnesses return; raises children, but loses connection with them. The Rebbe used a profound image: fire and water by their nature destroy each other, but when peace exists between them, they can coexist and even serve one another. So too with husband and wife — two different worlds, two different natures, yet it is precisely their harmonious union that creates the space in which the Shechinah (Divine Presence) dwells. When the Shechinah is in the home, everything flourishes: children grow healthy, sustenance comes with ease, and joy fills every corner.</p>

<h3>The Art of Yielding</h3>
<p>The Rebbe offered practical advice: in material and household matters, a husband should follow his wife's opinion. A woman possesses an intuitive connection to the home that a man often lacks. She senses what the family needs at a level inaccessible to logical analysis. Yield even when you are one hundred percent certain you are right. Yielding is not weakness but wisdom that draws the Shechinah into the home. When a husband defers to his wife in domestic matters, he does not lose — he gains something infinitely more valuable: peace, blessing, and the presence of G-d in his home. The Rebbe emphasized: the one who "wins" a family argument through force or stubbornness actually loses — because they destroy the vessel that could have held blessing. True victory is peace, and peace is achieved through the ability to yield with love and wisdom.</p>

<h3>An Outside Perspective</h3>
<p>If a conflict reaches a dead end, the Rebbe advised finding a trusted person — a rabbi or a mutual friend respected by both spouses. "Words that come from the heart enter the heart" — gentleness and personal example are always more effective than pressure. An outside perspective can see what is hidden from the participants in the conflict themselves: each spouse views the situation through the lens of their own emotions, grievances, and expectations. A third party can help both see the full picture. The Rebbe warned: never air family problems in public, never discuss your spouse with friends or relatives — this destroys trust and deepens the conflict. Turn to one wise person capable of offering counsel from the perspective of Torah — and follow that counsel with an open heart. G-d created the family as the most sacred space on earth, and protecting that space is one of the most important commandments.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-bitachon-anxiety',
    slug: 'kto-zdes-nastoyashchiy-boss-pochemu-trevoga-oshibka',
    title: {
      ru: 'Кто здесь настоящий Босс? Почему ваша тревога — это духовная ошибка',
      en: 'Who Is the Real Boss Here? Why Your Anxiety Is a Spiritual Mistake',
      he: 'מי כאן הבוס האמיתי? למה החרדה שלך היא טעות רוחנית',
      uk: 'Хто тут справжній Бос? Чому ваша тривога — це духовна помилка',
    },
    subtitle: {
      ru: 'Беспокойство — признак ослабления связи с Творцом',
      en: 'Worry is a sign of a weakened connection with the Creator',
      he: 'דאגה היא סימן להיחלשות הקשר עם הבורא',
      uk: 'Занепокоєння — ознака послаблення зв\'язку з Творцем',
    },
    content: {
      ru: `<h3>Ловушка гиперконтроля</h3>
<p>Человек, охваченный тревогой, ведёт себя так, словно весь мир лежит на его плечах. Он пытается просчитать каждый шаг, предусмотреть каждую неудачу, застраховаться от каждого риска. Ребе называл это состояние «путаницей мыслей» — когда разум мечется между десятками сценариев, не находя покоя ни в одном из них. Корень проблемы в том, что такой человек забывает главное: Всевышний управляет не только глобальными процессами — движением планет и судьбами народов, — но и мельчайшими деталями жизни каждого отдельного человека. Каждый лист, падающий с дерева, падает по воле Б-га. Каждая встреча, каждый телефонный звонок, каждая «случайность» — всё это элементы Б-жественного плана. Когда человек осознаёт это по-настоящему, тревога теряет свою власть над ним.</p>

<h3>Битахон — действие, а не ожидание</h3>
<p>Битахон — это не пассивное сидение сложа руки в ожидании чуда. Это активное внутреннее состояние, при котором человек становится каналом для Б-жественных благословений. Ребе подчёркивал: нужно работать, планировать, лечиться — выполнять все необходимые действия в материальном мире. Но при этом сердце должно оставаться свободным от страха. Руки делают своё дело, а душа знает: результат определяет не моя хитрость и не мой ум, а воля Творца. Битахон — это мост между усилием человека и благословением Свыше. Без этого моста даже самые грандиозные планы рассыпаются в прах, а с ним — даже скромное усилие приносит плоды, превосходящие любые ожидания.</p>

<h3>Практический вывод</h3>
<p>Ребе учил: качество упования напрямую определяет объём успеха. Чем глубже ваше доверие Б-гу, тем шире канал, через который приходят благословения. Ребе советовал «отключиться» от земных расчётов — не в смысле бездействия, а в смысле внутренней свободы от зависимости от результата. Признайте: Всевышний есть абсолютное добро, и Он заботится о вас лично. Не о человечестве вообще, не о еврейском народе в целом — а конкретно о вас, здесь и сейчас. Эта мысль, если впустить её по-настоящему глубоко, способна растворить любую тревогу и наполнить жизнь спокойной уверенностью.</p>`,

      en: `<h3>The Trap of Hypercontrol</h3>
<p>A person consumed by anxiety behaves as if the entire world rests on their shoulders. They try to calculate every step, anticipate every failure, and insure against every risk. The Rebbe called this state "confusion of thoughts" — when the mind races between dozens of scenarios, finding peace in none of them. The root of the problem is that such a person forgets the essential truth: the Almighty governs not only global processes — the movement of planets and the destinies of nations — but also the smallest details of each individual person's life. Every leaf that falls from a tree falls by the will of G-d. Every meeting, every phone call, every "coincidence" — all of these are elements of the Divine plan. When a person truly realizes this, anxiety loses its power over them.</p>

<h3>Bitachon — Action, Not Waiting</h3>
<p>Bitachon is not passively sitting with folded hands waiting for a miracle. It is an active inner state in which a person becomes a channel for Divine blessings. The Rebbe emphasized: one must work, plan, seek medical treatment — perform all necessary actions in the material world. But the heart must remain free from fear. The hands do their work, while the soul knows: the outcome is determined not by my cleverness or my intellect, but by the will of the Creator. Bitachon is the bridge between human effort and blessing from Above. Without this bridge, even the grandest plans crumble to dust, but with it, even a modest effort bears fruit that exceeds all expectations.</p>

<h3>A Practical Conclusion</h3>
<p>The Rebbe taught: the quality of trust directly determines the volume of success. The deeper your trust in G-d, the wider the channel through which blessings flow. The Rebbe advised to "detach" from earthly calculations — not in the sense of inaction, but in the sense of inner freedom from dependence on outcomes. Recognize that the Almighty is absolute good, and He cares for you personally. Not for humanity in general, not for the Jewish people as a whole — but specifically for you, here and now. This thought, if you allow it to penetrate truly deeply, is capable of dissolving any anxiety and filling your life with calm confidence.</p>`,
    },
    tag: { ru: 'Ребе о Битахоне', en: "Rebbe on Bitachon", he: 'הרבי על ביטחון', uk: 'Ребе про Бітахон' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-bitachon-believer',
    slug: 'veruyushchiy-vnutri-vas-nevozmozhno-byt-ateistom',
    title: {
      ru: 'Верующий внутри вас: Почему на самом деле невозможно быть атеистом',
      en: 'The Believer Within You: Why It Is Actually Impossible to Be an Atheist',
      he: 'המאמין שבתוכך: למה בעצם אי אפשר להיות אתאיסט',
      uk: 'Віруючий усередині вас: Чому насправді неможливо бути атеїстом',
    },
    subtitle: {
      ru: 'Вера — не приобретённое знание, а сущность души',
      en: 'Faith is not acquired knowledge but the essence of the soul',
      he: 'אמונה אינה ידע נרכש אלא מהות הנשמה',
      uk: 'Віра — не набуте знання, а сутність душі',
    },
    content: {
      ru: `<h3>Природа души</h3>
<p>Ребе неоднократно повторял фундаментальный принцип: каждый еврей является «верующим и потомком верующих». Эмуна — вера — это не знание, приобретённое через обучение или философские размышления. Это сущность самой души, пронизывающая все её «органы» и проявления. Подобно тому, как сердце бьётся без сознательного усилия, душа верит без необходимости доказательств. Даже если человек провозглашает себя атеистом, его душа остаётся верной Б-гу. Она не может перестать верить, как лёгкие не могут перестать дышать. Вера вшита в саму ткань еврейской души — она передаётся от Авраама, Ицхака и Яакова через все поколения и не может быть уничтожена никакими интеллектуальными аргументами, никаким жизненным опытом, никакими разочарованиями.</p>

<h3>Внешние оболочки</h3>
<p>Если вера — сущность души, то откуда берётся атеизм? Ребе объяснял: атеизм — это внешняя оболочка, наросшая на душу в результате неправильного воспитания, дурного окружения или травматического опыта. Это как грязь на бриллианте: бриллиант не перестаёт быть бриллиантом оттого, что покрыт слоем грязи. Свобода выбора, данная человеку Б-гом, позволяет ему действовать вопреки своей природе — но не способна изменить саму природу. Человек может вести себя так, будто Б-га нет, но он не может заставить свою душу в это поверить. В глубине, под всеми слоями цинизма, разочарования и интеллектуальной гордыни, горит неугасимый огонь веры — и задача состоит лишь в том, чтобы снять эти оболочки.</p>

<h3>Совет</h3>
<p>Ребе давал парадоксальный совет тем, кто борется с сомнениями: не пытайтесь «понять» Б-га прежде, чем начнёте действовать. Вера начинается там, где заканчивается логика. Если вы будете ждать, пока ваш разум «докажет» существование Б-га, вы будете ждать вечно — потому что бесконечное не может быть вмещено в конечный разум. Вместо этого позвольте своей естественной вере проявиться через практические добрые дела: зажгите свечи в пятницу вечером, наденьте тфилин, положите монету в ящик для цдаки. Каждое такое действие — как удар молотка, разбивающий внешнюю оболочку и освобождающий свет души. Действие первично — понимание придёт следом, как рассвет приходит после ночи.</p>`,

      en: `<h3>The Nature of the Soul</h3>
<p>The Rebbe repeatedly stated a fundamental principle: every Jew is "a believer and a descendant of believers." Emunah — faith — is not knowledge acquired through study or philosophical reflection. It is the essence of the soul itself, permeating all its "organs" and manifestations. Just as the heart beats without conscious effort, the soul believes without the need for proof. Even if a person proclaims themselves an atheist, their soul remains faithful to G-d. It cannot stop believing, just as the lungs cannot stop breathing. Faith is woven into the very fabric of the Jewish soul — it is transmitted from Abraham, Isaac, and Jacob through all generations and cannot be destroyed by any intellectual arguments, any life experience, or any disappointments.</p>

<h3>External Shells</h3>
<p>If faith is the essence of the soul, then where does atheism come from? The Rebbe explained: atheism is an external shell that has grown over the soul as a result of poor upbringing, negative environment, or traumatic experience. It is like dirt on a diamond: the diamond does not cease to be a diamond because it is covered with a layer of dirt. Freedom of choice, given to man by G-d, allows him to act against his nature — but it cannot change the nature itself. A person can behave as though G-d does not exist, but they cannot make their soul believe this. In the depths, beneath all the layers of cynicism, disappointment, and intellectual pride, an inextinguishable fire of faith burns — and the task is simply to remove those shells.</p>

<h3>Advice</h3>
<p>The Rebbe gave paradoxical advice to those struggling with doubt: do not try to "understand" G-d before you begin to act. Faith begins where logic ends. If you wait until your mind "proves" the existence of G-d, you will wait forever — because the infinite cannot be contained within a finite mind. Instead, let your natural faith manifest through practical good deeds: light Shabbat candles on Friday evening, put on tefillin, place a coin in the tzedakah box. Each such action is like a hammer blow, shattering the external shell and liberating the light of the soul. Action is primary — understanding will follow, just as dawn follows the night.</p>`,
    },
    tag: { ru: 'Ребе о Битахоне', en: "Rebbe on Bitachon", he: 'הרבי על ביטחון', uk: 'Ребе про Бітахон' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-bitachon-income',
    slug: 'uspekh-bez-stressa-sekretnaya-formula-zarabotka',
    title: {
      ru: 'Успех без стресса: Секретная формула вашего заработка',
      en: 'Success Without Stress: The Secret Formula for Your Income',
      he: 'הצלחה בלי לחץ: הנוסחה הסודית להכנסה שלך',
      uk: 'Успіх без стресу: Секретна формула вашого заробітку',
    },
    subtitle: {
      ru: 'Духовная механика пропитания — руки работают, сердце уповает',
      en: 'The spiritual mechanics of sustenance — hands work, heart trusts',
      he: 'המכניקה הרוחנית של הפרנסה — הידיים עובדות, הלב בוטח',
      uk: 'Духовна механіка пропітання — руки працюють, серце уповає',
    },
    content: {
      ru: `<h3>Руки работают, сердце уповает</h3>
<p>В Теhилим сказано: «От труда рук твоих будешь есть». Ребе обращал внимание на точность формулировки: именно «руки» — не голова, не сердце, не вся жизнь целиком. Ключевой принцип пропитания: руки работают, а голова и сердце наполнены упованием на Б-га. Человек обязан создать «сосуд» — пойти на работу, открыть бизнес, освоить профессию. Но Б-г наполняет этот сосуд «водой» — реальным доходом, успехом, прибылью. Без сосуда воде некуда течь — поэтому нельзя просто сидеть и ждать чуда. Но без воды Свыше сосуд останется пустым — поэтому бессмысленно полагаться только на свои усилия. Гармония между действием и упованием — вот формула, которую Ребе повторял снова и снова: делай своё дело с полной отдачей, но знай, что результат — в руках Творца.</p>

<h3>Духовный канал богатства</h3>
<p>Ребе открывал удивительную закономерность: забота о «духовном пропитании» — изучение Торы, молитва, соблюдение заповедей — является самым надёжным путём к материальному достатку. Это не магия и не суеверие, а духовная механика: когда человек расширяет свой духовный канал, через него начинает поступать больше благословений, в том числе материальных. Особую роль играет цдака — десятина, отделяемая от дохода. Ребе говорил: «Испытайте Меня этим» — это единственная заповедь, в которой Б-г прямо разрешает Его проверить. Отдавая десятую часть, вы не беднеете — вы расширяете канал для благословений Свыше. Каждая монета, данная на цдаку, возвращается многократно умноженной.</p>

<h3>Главный секрет</h3>
<p>Ребе раскрывал главный секрет финансового благополучия, который удивляет многих: Шалом Байит — мир в семье — это основной сосуд, удерживающий деньги. Нет мира в доме — благословения утекают, невзирая на гениальные бизнес-планы, блестящее образование и неутомимый труд. Можно зарабатывать миллионы, но без мира в семье деньги будут исчезать на болезни, судебные издержки, неудачные инвестиции и бесконечные непредвиденные расходы. И наоборот: когда в доме царит любовь и уважение, даже скромный доход растягивается чудесным образом, покрывая все потребности семьи. Ребе советовал: прежде чем искать новые источники дохода, наведите порядок в отношениях с супругой.</p>`,

      en: `<h3>Hands Work, Heart Trusts</h3>
<p>The Psalms say: "You shall eat from the labor of your hands." The Rebbe drew attention to the precision of the wording: specifically "hands" — not the head, not the heart, not one's entire life. The key principle of sustenance is this: the hands work, while the head and heart are filled with trust in G-d. A person is obligated to create a "vessel" — go to work, open a business, master a profession. But G-d fills this vessel with "water" — real income, success, profit. Without a vessel, the water has nowhere to flow — therefore one cannot simply sit and wait for a miracle. But without water from Above, the vessel remains empty — therefore it is pointless to rely solely on one's own efforts. The harmony between action and trust — this is the formula the Rebbe repeated again and again: do your work with full dedication, but know that the outcome is in the hands of the Creator.</p>

<h3>The Spiritual Channel of Wealth</h3>
<p>The Rebbe revealed an astonishing pattern: caring for "spiritual sustenance" — Torah study, prayer, observance of commandments — is the most reliable path to material prosperity. This is not magic or superstition, but spiritual mechanics: when a person expands their spiritual channel, more blessings begin to flow through it, including material ones. Tzedakah — the tithe set aside from income — plays a special role. The Rebbe would say: "Test Me in this" — this is the only commandment in which G-d directly permits us to test Him. By giving a tenth, you do not become poorer — you widen the channel for blessings from Above. Every coin given to tzedakah returns multiplied many times over.</p>

<h3>The Main Secret</h3>
<p>The Rebbe revealed the main secret of financial well-being, one that surprises many: Shalom Bayit — peace in the family — is the primary vessel that holds money. No peace at home means blessings leak away, regardless of brilliant business plans, outstanding education, and tireless labor. One can earn millions, but without peace in the family, money will vanish into illness, legal costs, failed investments, and endless unforeseen expenses. Conversely, when love and respect reign in the home, even a modest income stretches in a wondrous way, covering all the family's needs. The Rebbe advised: before seeking new sources of income, put your relationship with your spouse in order.</p>`,
    },
    tag: { ru: 'Ребе о Битахоне', en: "Rebbe on Bitachon", he: 'הרבי על ביטחון', uk: 'Ребе про Бітахон' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-bitachon-depression',
    slug: 'lovushka-chernoty-kak-emuna-vytaskivayet-iz-yamy',
    title: {
      ru: 'Ловушка «черноты»: Как Эмуна вытаскивает из ямы уныния',
      en: 'The Trap of "Blackness": How Emunah Pulls You Out of the Pit of Despair',
      he: 'מלכודת ה"שחורה": איך אמונה מוציאה אותך מבור הייאוש',
      uk: 'Пастка «чорноти»: Як Емуна витягує з ями зневіри',
    },
    subtitle: {
      ru: 'Депрессия — стратегическая уловка дурного начала',
      en: 'Depression is a strategic ploy of the evil inclination',
      he: 'דיכאון הוא תחבולה אסטרטגית של היצר הרע',
      uk: 'Депресія — стратегічна хитрість поганого начала',
    },
    content: {
      ru: `<h3>Стратегия врага</h3>
<p>Ребе предупреждал: депрессия и «чернота» — это не естественные состояния души. Б-г создал душу светлой, радостной, стремящейся к жизни и к Нему. Уныние — это стратегическая уловка йецер hара (дурного начала), цель которой — ослепить разум человека и сделать его неспособным выполнять свою миссию в этом мире. Когда человек погружается в тоску, он перестаёт молиться с огнём, перестаёт учить Тору с радостью, перестаёт помогать другим, перестаёт видеть смысл в своей жизни. Именно этого и добивается йецер hара. Время, потерянное в тоске, невозможно вернуть — каждая минута уныния — это украденная минута жизни, минута, в которую человек мог бы выполнить заповедь, сказать доброе слово, поддержать ближнего. Ребе призывал осознать: уныние — это не ваше состояние, это атака врага.</p>

<h3>Лекарство — в действии</h3>
<p>Ребе часто повторял: «Главное — действие». Не ждите вдохновения, не ждите, пока «станет легче», не ждите идеального момента. Действуйте «через силу» — буквально заставляйте себя встать, одеться, выйти из дома, сделать хоть что-нибудь доброе. Одно маленькое дело имеет бесконечную ценность, потому что оно совершено вопреки тьме. Именно в действии, совершённом через преодоление, заключена особая сила — свет, который рождается из тьмы, ярче любого другого света. Каждый маленький шаг рассеивает внутреннюю тьму, как свеча рассеивает мрак комнаты. Не нужно ждать, пока вы «почувствуете» радость — начните действовать, и радость придёт сама, как тепло приходит от движения.</p>

<h3>Фокус на другом</h3>
<p>Ребе раскрывал корень уныния: оно рождается от чрезмерной сосредоточенности на самом себе — своих проблемах, своих неудачах, своих страданиях. Когда мир сужается до размеров собственного «я», тьма становится невыносимой. Лучшее лекарство — переключиться на нужды общины, на помощь другим людям. Помощь ближнему — самый быстрый выход из личного кризиса. Когда вы помогаете другому человеку, происходит чудо: ваша собственная боль отступает, потому что душа вспоминает о своём истинном предназначении — не замыкаться в себе, а нести свет в мир. Ребе советовал: если вам тяжело — найдите того, кому ещё тяжелее, и помогите ему. Это лекарство действует безотказно.</p>`,

      en: `<h3>The Strategy of the Enemy</h3>
<p>The Rebbe warned: depression and "blackness" are not natural states of the soul. G-d created the soul bright, joyful, striving toward life and toward Him. Despair is a strategic ploy of the yetzer hara (the evil inclination), whose goal is to blind a person's mind and render them incapable of fulfilling their mission in this world. When a person sinks into melancholy, they stop praying with fire, stop studying Torah with joy, stop helping others, and stop seeing meaning in their life. This is exactly what the yetzer hara seeks to achieve. Time lost in sadness cannot be returned — every minute of despair is a stolen minute of life, a minute in which a person could have fulfilled a commandment, spoken a kind word, or supported another. The Rebbe urged us to recognize: despair is not your state — it is an attack by the enemy.</p>

<h3>The Remedy Is in Action</h3>
<p>The Rebbe often repeated: "The main thing is action." Do not wait for inspiration, do not wait until "it gets easier," do not wait for the perfect moment. Act "through force" — literally make yourself get up, get dressed, leave the house, and do at least something good. One small deed has infinite value because it is performed in defiance of darkness. It is precisely in an action performed through overcoming that a special power resides — light born from darkness is brighter than any other light. Each small step disperses the inner darkness, like a candle disperses the gloom of a room. You need not wait until you "feel" joy — begin to act, and joy will come on its own, just as warmth comes from movement.</p>

<h3>Focus on Others</h3>
<p>The Rebbe revealed the root of despair: it is born from excessive self-focus — on one's own problems, one's own failures, one's own suffering. When the world narrows to the size of one's own "self," the darkness becomes unbearable. The best remedy is to shift focus to the needs of the community, to helping other people. Helping others is the fastest exit from a personal crisis. When you help another person, a miracle occurs: your own pain recedes, because the soul remembers its true purpose — not to close in upon itself, but to bring light into the world. The Rebbe advised: if you are struggling, find someone who is struggling even more and help them. This remedy works without fail.</p>`,
    },
    tag: { ru: 'Ребе о Битахоне', en: "Rebbe on Bitachon", he: 'הרבי על ביטחון', uk: 'Ребе про Бітахон' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-bitachon-marriage',
    slug: 'postroit-vechnoye-zdaniye-logiki-nedostatochno-dlya-braka',
    title: {
      ru: 'Построить «Вечное здание»: Почему логики недостаточно для счастья в браке',
      en: 'Building an "Eternal Edifice": Why Logic Is Not Enough for a Happy Marriage',
      he: 'לבנות "בניין עדי עד": למה הגיון לא מספיק לנישואין מאושרים',
      uk: 'Побудувати «Вічну будівлю»: Чому логіки недостатньо для щастя у шлюбі',
    },
    subtitle: {
      ru: 'В поисках спутника жизни нельзя полагаться только на разум',
      en: 'In searching for a life partner one cannot rely on reason alone',
      he: 'בחיפוש אחר בן/בת זוג אי אפשר להסתמך רק על השכל',
      uk: 'У пошуках супутника життя не можна покладатися лише на розум',
    },
    content: {
      ru: `<h3>Границы расчётов</h3>
<p>Ребе предупреждал: человек не может предвидеть все последствия своих решений — его способности ограничены. Когда речь идёт о выборе спутника жизни, эта ограниченность становится особенно очевидной. Можно составить список из ста критериев, проверить каждый — и всё равно ошибиться, потому что самое важное в человеке невозможно измерить списком. Ребе учил: необходимо в значительной мере полагаться на Творца, Который соединяет подходящие души. Ещё до рождения человека на Небесах объявляют: «Дочь такого-то — такому-то». Это не значит, что не нужно прилагать усилий — нужно встречаться, узнавать друг друга, оценивать совместимость. Но окончательное решение должно включать в себя доверие Б-гу, а не только холодный анализ достоинств и недостатков.</p>

<h3>Чудо как норма</h3>
<p>Мудрецы говорили: найти достойного спутника жизни так же трудно, как рассечение Красного моря. Но ведь море рассеклось! И рассеклось оно именно благодаря вере — когда Нахшон бен Аминадав вошёл в воду по горло, не дожидаясь чуда. Так и в браке: нужно сделать шаг веры, войти в «воду», довериться процессу. Ребе называл брак «вечным зданием» — «биньян адей ад». Фундаментом этого здания должна быть Тора, а не человеческие расчёты. Расчёты рассыпаются при первом серьёзном испытании, а Тора стоит вечно. Когда оба супруга строят свой дом на фундаменте Торы и заповедей, их союз обретает прочность, недоступную никаким «рациональным» бракам. Б-г Сам становится третьим партнёром в таком браке, скрепляя его изнутри.</p>

<h3>Совет сомневающимся</h3>
<p>Ребе давал конкретный практический совет тем, кто сомневается: не ищите идеального человека — его не существует. Идеала нет ни среди мужчин, ни среди женщин, ни среди кого бы то ни было на этой земле. Если вы в целом удовлетворены, если видите в человеке основные качества — доброту, богобоязненность, порядочность — не зацикливайтесь на мелочах. Не позволяйте несущественным недостаткам затмить главное. Ребе советовал: твёрдо решите построить еврейский дом — и Всевышний поможет. Решимость — это сосуд для Б-жественной помощи. Пока человек колеблется, помощь Свыше не может войти в его жизнь, потому что нет сосуда, готового её принять. Но стоит принять решение всем сердцем — и двери открываются, препятствия исчезают, и Б-г ведёт человека к его суженому.</p>`,

      en: `<h3>The Limits of Calculation</h3>
<p>The Rebbe warned: a person cannot foresee all the consequences of their decisions — their abilities are limited. When it comes to choosing a life partner, this limitation becomes especially apparent. One can compile a list of a hundred criteria, verify each one — and still be wrong, because the most important things in a person cannot be measured by a list. The Rebbe taught: one must rely significantly on the Creator, who connects suitable souls. Even before a person is born, it is proclaimed in Heaven: "The daughter of so-and-so is destined for so-and-so." This does not mean that no effort is needed — one must meet people, get to know each other, assess compatibility. But the final decision must include trust in G-d, not only cold analysis of virtues and shortcomings.</p>

<h3>Miracle as the Norm</h3>
<p>The Sages said: finding a worthy spouse is as difficult as the splitting of the Red Sea. But the sea did split! And it split precisely through faith — when Nachshon ben Aminadav walked into the water up to his neck, without waiting for a miracle. So too in marriage: one must take a leap of faith, step into the "water," and trust the process. The Rebbe called marriage an "eternal building" — "binyan adei ad." The foundation of this building must be Torah, not human calculations. Calculations crumble at the first serious test, while Torah stands forever. When both spouses build their home on a foundation of Torah and commandments, their union acquires a strength inaccessible to any "rational" marriage. G-d Himself becomes the third partner in such a marriage, binding it from within.</p>

<h3>Advice for the Doubtful</h3>
<p>The Rebbe gave concrete practical advice to those who hesitate: do not seek the ideal person — they do not exist. There is no ideal among men, nor among women, nor among anyone on this earth. If you are generally satisfied, if you see in a person the essential qualities — kindness, G-d-fearing nature, decency — do not fixate on trifles. Do not allow insignificant flaws to overshadow what truly matters. The Rebbe advised: firmly decide to build a Jewish home — and the Almighty will help. Resolve is the vessel for Divine assistance. As long as a person wavers, help from Above cannot enter their life because there is no vessel ready to receive it. But the moment one decides with their whole heart, doors open, obstacles vanish, and G-d guides the person to their destined match.</p>`,
    },
    tag: { ru: 'Ребе о Битахоне', en: "Rebbe on Bitachon", he: 'הרבי על ביטחון', uk: 'Ребе про Бітахон' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-marriage-order',
    slug: 'ochered-za-schastyem-kak-vyyti-zamuzh-ranshe-starshey-sestry',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Очередь за счастьем: Как выйти замуж раньше старшей сестры и не разрушить семью?',
      en: 'Queue for Happiness: How to Marry Before Your Older Sister Without Destroying the Family?',
      he: 'תור לאושר: איך להתחתן לפני האחות הגדולה בלי להרוס את המשפחה?',
      uk: 'Черга за щастям: Як вийти заміж раніше старшої сестри і не зруйнувати сім\'ю?',
    },
    subtitle: {
      ru: 'Правила очерёдности в браке и сила искреннего прощения',
      en: 'Rules of marriage order and the power of sincere forgiveness',
      he: 'כללי סדר הנישואין וכוח המחילה הכנה',
      uk: 'Правила черговості у шлюбі та сила щирого прощення',
    },
    content: {
      ru: `<h3>Сила искреннего прощения</h3>
<p>Ребе писал: когда младшая сестра получает предложение раньше старшей, необходимо получить от старшей сестры искреннее прощение — «мехила» — и это не может быть формальностью. Нельзя просто подойти и сказать: «Ну, ты ведь не против?» Прощение должно быть настоящим, от всего сердца, без давления и без спешки. Ребе объяснял: когда старшая сестра прощает искренне — это становится духовным стимулом, сгулой, помогающей ей самой быстрее найти свою пару. Б-г видит великодушие её сердца и открывает для неё новые каналы благословения. Желательно зафиксировать прощение письменно или произнести его устно в присутствии двух свидетелей — это придаёт мехиле алахическую силу и защищает обе стороны от будущих претензий и обид.</p>

<h3>Материальное подтверждение любви</h3>
<p>Ребе также советовал: недостаточно слов — нужно подкрепить их делом. Младшая сестра и её семья должны отложить деньги на будущие свадебные расходы старшей сестры. Это не символический жест, а реальное проявление заботы и ответственности. Когда старшая сестра видит, что о ней не забыли, что её счастье по-прежнему является приоритетом для семьи, боль от «нарушения очерёдности» смягчается. Материальная помощь демонстрирует, что младшая сестра не просто «перебежала дорогу», а осознаёт деликатность ситуации и готова разделить своё благословение. Это создаёт атмосферу единства, а не соперничества внутри семьи.</p>

<h3>Скромность как защита</h3>
<p>Ребе особо подчёркивал: помолвку в такой ситуации следует отмечать с максимальной скромностью. Не нужно выставлять напоказ своё счастье, устраивать пышные празднования и публиковать радостные объявления раньше времени. «Ходить смиренно пред Б-гом твоим» — это не просто красивые слова из пророка Михи, а практическая защита семьи от сглаза и зависти. Скромность оберегает и саму невесту, и её старшую сестру, и всю семью. Когда человек умеет радоваться тихо, его радость становится глубже и прочнее, а Б-жественное благословение приходит в полной мере — без трещин и без побочных потерь.</p>`,

      en: `<h3>The Power of Sincere Forgiveness</h3>
<p>The Rebbe wrote: when a younger sister receives a marriage proposal before her older sister, it is essential to obtain sincere forgiveness — "mechilah" — from the elder sister, and this cannot be a mere formality. One cannot simply approach and say, "You don't mind, do you?" The forgiveness must be genuine, wholehearted, without pressure or haste. The Rebbe explained: when the older sister forgives sincerely, it becomes a spiritual stimulus — a segulah — that helps her find her own match faster. G-d sees the generosity of her heart and opens new channels of blessing for her. It is desirable to document the forgiveness in writing or to state it verbally before two witnesses — this gives the mechilah halachic force and protects both sides from future claims and resentment.</p>

<h3>Material Confirmation of Love</h3>
<p>The Rebbe also advised: words alone are insufficient — they must be backed by action. The younger sister and her family should set aside money for the older sister's future wedding expenses. This is not a symbolic gesture but a real demonstration of care and responsibility. When the older sister sees that she has not been forgotten, that her happiness remains a priority for the family, the pain of the "broken order" is softened. Financial assistance shows that the younger sister did not simply "cut in line" but understands the delicacy of the situation and is willing to share her blessing. This creates an atmosphere of unity rather than rivalry within the family.</p>

<h3>Modesty as Protection</h3>
<p>The Rebbe particularly emphasized: an engagement in such circumstances should be celebrated with maximum modesty. There is no need to flaunt happiness, throw lavish celebrations, or publish joyful announcements prematurely. "Walking humbly before your G-d" is not merely a beautiful phrase from the Prophet Micah but a practical shield protecting the family from the evil eye and envy. Modesty safeguards the bride herself, her older sister, and the entire family. When a person knows how to rejoice quietly, their joy becomes deeper and more enduring, and Divine blessing arrives in full measure — without cracks and without collateral losses.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-name-change',
    slug: 'imya-kotoroye-menyayet-sudbu-nevesta-i-svekrov',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Имя, которое меняет судьбу: Что делать, если невесту зовут как свекровь?',
      en: 'A Name That Changes Destiny: What If the Bride Has the Same Name as Her Mother-in-Law?',
      he: 'שם שמשנה גורל: מה לעשות כשלכלה יש את אותו שם כמו לחמותה?',
      uk: 'Ім\'я, що змінює долю: Що робити, якщо наречену звати як свекруху?',
    },
    subtitle: {
      ru: 'Добавление второго имени как решение конфликта имён',
      en: 'Adding a second name as a resolution for name conflicts',
      he: 'הוספת שם שני כפתרון לקונפליקט שמות',
      uk: 'Додавання другого імені як вирішення конфлікту імен',
    },
    content: {
      ru: `<h3>Второе имя — новый канал благословения</h3>
<p>Ребе объяснял: когда невесту зовут так же, как свекровь, это создаёт духовное затруднение — два человека с одинаковым именем в одной семье могут «перетягивать» на себя духовные потоки, предназначенные другому. Решение, которое Ребе рекомендовал, — добавить невесте второе имя во время публичного чтения Торы, в молитве «Ми Шеберах». Важно: новое имя должно стоять первым, перед прежним. Например, если невесту звали Мириам, а свекровь тоже Мириам, невеста становится «Лея-Мириам». Новое имя создаёт новую духовную идентичность, новый канал для Б-жественного благословения, словно открывается дополнительная дверь в небесных чертогах. Это не формальность, а глубокое духовное действие, меняющее саму суть связи между душой и её именем.</p>

<h3>Правило тридцати дней</h3>
<p>Ребе настаивал: после добавления нового имени необходимо выждать тридцать дней, прежде чем объявлять о помолвке. Имя должно «прижиться» — оно должно активно использоваться в повседневной жизни: при вызове к Торе, в молитвах, в документах, в обращениях друзей и родных. Тридцать дней — это алахический срок, после которого новое имя считается полноценно принятым. Если объявить о помолвке раньше, имя может не успеть укорениться, и духовная проблема совпадения имён останется нерешённой. Терпение здесь — не просто добродетель, а практическая необходимость, обеспечивающая прочность духовного фундамента будущего брака.</p>

<h3>Дистанция и уважение</h3>
<p>Ребе также рекомендовал: молодая пара не должна жить в одном городе со свекровью, если имена невесты и свекрови совпадают. Физическая дистанция уменьшает духовное «трение» между одинаковыми именами. Однако если имена совпадают лишь частично — например, свекровь зовут Мириам, а невесту Мириам-Лея — то, по мнению Цемах Цедека (третьего Любавичского Ребе), это вызывает меньше опасений. Частичное совпадение не создаёт полного духовного «наложения», и в таких случаях можно проявить бóльшую гибкость. Тем не менее консультация с компетентным раввином обязательна в каждом конкретном случае.</p>`,

      en: `<h3>A Second Name — A New Channel of Blessing</h3>
<p>The Rebbe explained: when a bride bears the same name as her mother-in-law, it creates a spiritual difficulty — two people with identical names in one family may "draw upon" spiritual flows intended for the other. The solution the Rebbe recommended is to add a second name for the bride during a public Torah reading, in the "Mi Sheberach" prayer. Importantly, the new name must come first, before the original. For example, if the bride was called Miriam and the mother-in-law is also Miriam, the bride becomes "Leah-Miriam." The new name creates a new spiritual identity, a new channel for Divine blessing, as though an additional door opens in the heavenly chambers. This is not a formality but a profound spiritual act that changes the very essence of the connection between the soul and its name.</p>

<h3>The Thirty-Day Rule</h3>
<p>The Rebbe insisted: after adding the new name, one must wait thirty days before announcing the engagement. The name must "take root" — it must be actively used in daily life: when called to the Torah, in prayers, in documents, and in how friends and relatives address the person. Thirty days is the halachic period after which a new name is considered fully established. Announcing the engagement prematurely may prevent the name from taking hold, leaving the spiritual problem of matching names unresolved. Patience here is not merely a virtue but a practical necessity ensuring the strength of the spiritual foundation of the future marriage.</p>

<h3>Distance and Respect</h3>
<p>The Rebbe also recommended: the young couple should not live in the same city as the mother-in-law if the bride's and mother-in-law's names match. Physical distance reduces the spiritual "friction" between identical names. However, if the names only partially overlap — for example, the mother-in-law is called Miriam while the bride is Miriam-Leah — then according to the Tzemach Tzedek (the third Lubavitcher Rebbe), this raises less concern. A partial match does not create a full spiritual "overlay," and in such cases greater flexibility may be exercised. Nevertheless, consultation with a competent rabbi is essential in each specific case.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'rebbe-letters-income-wife',
    slug: 'semeynyy-mir-glavnyy-bankovskiy-schyot',
    image: '/images/articles/rebbe.jpg',
    title: {
      ru: 'Семейный мир — главный «банковский счёт»: Почему ваш доход зависит от жены?',
      en: 'Family Peace — The Main "Bank Account": Why Does Your Income Depend on Your Wife?',
      he: 'שלום המשפחה — "חשבון הבנק" העיקרי: למה ההכנסה שלך תלויה באשתך?',
      uk: 'Сімейний мир — головний «банківський рахунок»: Чому ваш дохід залежить від дружини?',
    },
    subtitle: {
      ru: 'Шалом Баит как единственный сосуд для Б-жественного благословения',
      en: 'Shalom Bayit as the only vessel for Divine blessing',
      he: 'שלום בית ככלי היחיד לברכה אלוקית',
      uk: 'Шалом Байт як єдина посудина для Б-жественного благословення',
    },
    content: {
      ru: `<h3>Куда утекают деньги?</h3>
<p>Ребе объяснял с поразительной ясностью: Б-жественное благословение подобно воде — оно течёт сверху вниз и наполняет тот сосуд, который способен его удержать. Шалом Баит — мир в семье — это и есть тот сосуд. Если в семье нет мира, сосуд покрыт трещинами, и деньги утекают, как вода сквозь пальцы: на болезни, на ссоры, на адвокатов, на «случайные» поломки, на бесконечные непредвиденные расходы. Мудрецы Талмуда сказали прямо: «Человек удостаивается благословения только благодаря своей жене». Это не метафора и не красивая фраза для свадебного тоста. Это духовный закон, столь же реальный, как закон гравитации. Без мира в доме — нет сосуда, без сосуда — нет благословения, без благословения — нет подлинного достатка.</p>

<h3>Золотое правило для мужей</h3>
<p>Ребе давал мужьям конкретную инструкцию: в материальных и бытовых вопросах уступайте жене. Она — «Акерет а-Байт», основа дома, и именно её удовлетворённость открывает каналы изобилия. Когда жена чувствует, что её мнение уважают, что к ней прислушиваются в вопросах домашнего хозяйства, покупок, обустройства жилья — она расцветает, и вместе с ней расцветает весь дом. Ребе подчёркивал: это не слабость мужа, а его мудрость. Мужчина, который уступает жене в быту, не теряет свой авторитет — он приобретает нечто несравнимо бóльшее: мир, гармонию и поток Б-жественного благословения, которое невозможно купить ни за какие деньги.</p>

<h3>Инвестиция в тишину</h3>
<p>Ребе учил: уступайте даже тогда, когда вы на сто процентов правы. Это самая выгодная «бизнес-инвестиция» в вашей жизни. Спокойствие жены создаёт духовный щит, защищающий семейный капитал от разрушения. Там, где пребывает Шехина — Б-жественное Присутствие, — нет недостатка ни в чём. А Шехина пребывает только там, где царят мир и радость. Каждая уступка мужа — это не потеря, а вклад в невидимый, но абсолютно реальный «банковский счёт» на Небесах. Проценты по этому вкладу — здоровье детей, удача в делах, защита от бед и та глубокая, тихая радость, которую невозможно получить никаким другим способом. Семейный мир — это не роскошь, а фундамент всего.</p>`,

      en: `<h3>Where Does the Money Go?</h3>
<p>The Rebbe explained with striking clarity: Divine blessing is like water — it flows from above downward and fills the vessel capable of holding it. Shalom Bayit — peace in the family — is that vessel. If there is no peace in the family, the vessel is covered with cracks, and money leaks away like water through fingers: into illnesses, quarrels, lawyers, "accidental" breakdowns, and endless unforeseen expenses. The Sages of the Talmud stated plainly: "A man merits blessing only through his wife." This is not a metaphor or a pretty phrase for a wedding toast. It is a spiritual law as real as the law of gravity. Without peace at home there is no vessel; without a vessel there is no blessing; without blessing there is no true prosperity.</p>

<h3>The Golden Rule for Husbands</h3>
<p>The Rebbe gave husbands a specific instruction: in material and household matters, yield to your wife. She is the "Akeret HaBayit" — the foundation of the home — and it is her satisfaction that opens channels of abundance. When a wife feels that her opinion is respected, that she is listened to regarding household management, purchases, and home arrangements, she flourishes, and the entire home flourishes with her. The Rebbe emphasized: this is not a husband's weakness but his wisdom. A man who yields to his wife in domestic matters does not lose his authority — he gains something incomparably greater: peace, harmony, and a flow of Divine blessing that no amount of money can buy.</p>

<h3>An Investment in Silence</h3>
<p>The Rebbe taught: yield even when you are one hundred percent right. This is the most profitable "business investment" of your life. A wife's calm creates a spiritual shield protecting the family's capital from destruction. Where the Shechinah — the Divine Presence — dwells, there is no lack of anything. And the Shechinah dwells only where peace and joy reign. Every concession a husband makes is not a loss but a deposit into an invisible yet absolutely real "bank account" in Heaven. The interest on this deposit is the health of children, success in endeavors, protection from misfortune, and that deep, quiet joy that cannot be obtained any other way. Family peace is not a luxury — it is the foundation of everything.</p>`,
    },
    tag: { ru: 'Письма Ребе', en: "Rebbe's Letters", he: 'אגרות הרבי', uk: 'Листи Ребе' },
    createdAt: '2026-03-28',
  },
  {
    id: 'shvat-month-detailed',
    slug: 'shvat-mesyats-svyazi-i-zaversheniya-missii',
    hebrewDate: { month: 'Shvat', day: 10 },
    monthIntro: {
      ru: 'Шват: Месяц связи и завершения миссии. Связывает два поколения лидеров и определяет задачу нашего времени.',
      en: "Shvat: Month of Connection and Mission Completion. Links two generations of leaders and defines our generation's task.",
    },
    title: {
      ru: 'Шват: Месяц связи и завершения миссии',
      en: 'Shvat: Month of Connection and Mission Completion',
      he: 'שבט: חודש הקשר והשלמת השליחות',
      uk: 'Шват: Місяць зв\'язку і завершення місії',
    },
    subtitle: {
      ru: 'От ухода Шестого Ребе до начала нового лидерства и памяти ребецн Хаи-Мушки',
      en: 'From the passing of the Sixth Rebbe to new leadership and the memory of Rebbetzin Chaya Mushka',
      he: 'מהסתלקות הרבי השישי להנהגה חדשה וזכרון הרבנית חיה מושקא',
      uk: 'Від відходу Шостого Ребе до початку нового лідерства і пам\'яті ребецн Хаї-Мушки',
    },
    content: {
      ru: `<h3>10 Швата — Уход Шестого Ребе и начало лидерства Седьмого (5710–5711)</h3>
<p>10 Швата 5710 (1950) года из этого мира ушёл Ребе Раяц — шестой Любавичский Ребе, рабби Йосеф-Ицхак Шнеерсон. Его уход потряс весь еврейский мир. Целый год хасиды оставались без формального лидера, пока ровно через год, 10 Швата 5711 (1951), Ребе Менахем-Мендл Шнеерсон произнёс свой первый маамар — «Боси ле-Гани» («Я пришёл в Мой сад»). В этом маамаре Ребе раскрыл глубочайшую идею: наше поколение — седьмое от Алтер Ребе, основателя Хабада. Подобно тому как Моше Рабейну был седьмым от Авраама и именно при нём Шехина — Б-жественное Присутствие — спустилась на гору Синай, так и задача нашего поколения — вернуть Шехину в нижний мир и сделать этот мир «жилищем для Б-га». Эта миссия стала центральной темой всего лидерства Ребе: каждое действие, каждая кампания, каждый посланник-шлиах — всё направлено на то, чтобы Б-жественный свет наполнил материальный мир.</p>

<h3>22 Швата — Йорцайт ребецн Хаи-Мушки (5748/1988)</h3>
<p>22 Швата — день памяти ребецн Хаи-Мушки Шнеерсон, супруги Ребе. Ребецн была живым примером скромности, самоотверженности и абсолютной преданности миссии. Всю свою жизнь она оставалась в тени, поддерживая Ребе и его деятельность, никогда не ища публичного внимания. Её уход ознаменовал новый этап в подготовке мира к приходу Машиаха. После её кончины Ребе значительно усилил деятельность, связанную с приближением Геулы. В её честь по всему миру были основаны образовательные учреждения под названием «Бейт Хая Мушка» — школы и центры, которые продолжают нести её дух скромности и служения. Память о ребецн вдохновляет тысячи еврейских женщин на сочетание внутренней силы с внешней скромностью.</p>`,

      en: `<h3>10 Shvat — Passing of the Sixth Rebbe and the Beginning of New Leadership (5710–5711)</h3>
<p>On 10 Shvat 5710 (1950), Rebbe Rayatz — the sixth Lubavitcher Rebbe, Rabbi Yosef Yitzchak Schneersohn — passed away, shaking the entire Jewish world. For a full year, the Chassidim remained without a formal leader, until exactly one year later, on 10 Shvat 5711 (1951), the Rebbe — Rabbi Menachem Mendl Schneerson — delivered his first maamar, "Basi Legani" ("I have come into My garden"). In this maamar, the Rebbe revealed a profound idea: our generation is the seventh from the Alter Rebbe, founder of Chabad. Just as Moses was the seventh from Abraham and it was in his time that the Shechinah — the Divine Presence — descended onto Mount Sinai, so too the mission of our generation is to return the Shechinah to this lowest world and make it a "dwelling place for G-d." This mission became the central theme of the Rebbe's entire leadership: every action, every campaign, every shaliach-emissary — everything directed toward filling the material world with Divine light.</p>

<h3>22 Shvat — Yahrzeit of Rebbetzin Chaya Mushka (5748/1988)</h3>
<p>22 Shvat marks the yahrzeit of Rebbetzin Chaya Mushka Schneerson, the Rebbe's wife. The Rebbetzin was a living example of modesty, self-sacrifice, and absolute devotion to the mission. Throughout her life she remained behind the scenes, supporting the Rebbe and his work, never seeking public attention. Her passing marked a new stage in the preparation of the world for the coming of Mashiach. After her passing, the Rebbe significantly intensified activities connected to bringing the Geulah closer. In her honor, educational institutions named "Beis Chaya Mushka" were established worldwide — schools and centers that continue to carry her spirit of modesty and service. The Rebbetzin's memory inspires thousands of Jewish women to combine inner strength with outward humility.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tevet-month-detailed',
    slug: 'tevet-prazdnik-knig-i-naslediye-osnovatelya',
    hebrewDate: { month: 'Tevet', day: 5 },
    monthIntro: {
      ru: 'Тевет: Праздник книг и наследие основателя. Победа в суде и память об Алтер Ребе.',
      en: "Tevet: Festival of Books and the Founder's Legacy.",
    },
    title: {
      ru: 'Тевет: Праздник книг и наследие основателя',
      en: "Tevet: Festival of Books and the Founder's Legacy",
      he: 'טבת: חג הספרים ומורשת המייסד',
      uk: 'Тевет: Свято книг і спадщина засновника',
    },
    subtitle: {
      ru: 'Дидан Ноцах — победа хасидизма в суде — и йорцайт Алтер Ребе',
      en: 'Didan Notzach — the victory of Chassidism in court — and the Alter Rebbe\'s yahrzeit',
      he: 'דידן נצח — ניצחון החסידות בבית המשפט — ויארצייט אדמו"ר הזקן',
      uk: 'Дідан Ноцах — перемога хасидизму в суді — та йорцайт Алтер Ребе',
    },
    content: {
      ru: `<h3>5 Тевета — Дидан Ноцах (5747/1987)</h3>
<p>5 Тевета 5747 (1987) года федеральный суд США вынес историческое решение: библиотека Любавичских Ребеим принадлежит не частному лицу, а хасидской общине. Это дело стало не просто юридическим спором о книгах — оно превратилось в битву за саму суть хасидизма. Ребецн Хая-Мушка произнесла ключевые слова: «Библиотека принадлежит хасидам, потому что мой отец принадлежал хасидам». Эта фраза выразила глубочайший принцип хасидского лидерства: Ребе не владеет — он принадлежит своему народу. Победа в суде — «Дидан Ноцах» («Наша сторона победила») — стала праздником для всего мирового еврейства. Каждый год 5 Тевета хасиды отмечают этот день как торжество самой сути Торы и хасидизма над материализмом и частной выгодой.</p>

<h3>24 Тевета — Йорцайт Алтер Ребе (5573/1812)</h3>
<p>24 Тевета — день ухода основателя движения Хабад, рабби Шнеура-Залмана из Ляд, известного как Алтер Ребе. Он скончался в деревне Пена, спасаясь бегством от наступающей армии Наполеона. Алтер Ребе решительно выступал против Наполеона, хотя многие евреи поддерживали французского императора, обещавшего равноправие. Алтер Ребе прозорливо понимал: французская эмансипация несёт духовную катастрофу — евреи получат гражданские права, но потеряют свою душу через ассимиляцию. Лучше физические страдания под царской властью, чем духовная гибель под властью «просвещения». Наследие Алтер Ребе — книга «Тания» и целая система интеллектуального постижения Б-жественности — продолжает менять жизни миллионов евреев по всему миру.</p>`,

      en: `<h3>5 Tevet — Didan Notzach (5747/1987)</h3>
<p>On 5 Tevet 5747 (1987), a United States federal court issued a historic ruling: the library of the Lubavitcher Rebbes belongs not to a private individual but to the Chassidic community. This case was not merely a legal dispute over books — it became a battle for the very essence of Chassidism. Rebbetzin Chaya Mushka spoke the pivotal words: "The library belongs to the Chassidim because my father belonged to the Chassidim." This phrase expressed the deepest principle of Chassidic leadership: a Rebbe does not own — he belongs to his people. The court victory — "Didan Notzach" ("Our side has won") — became a celebration for all of world Jewry. Every year on 5 Tevet, Chassidim mark this day as the triumph of the very essence of Torah and Chassidism over materialism and private gain.</p>

<h3>24 Tevet — Yahrzeit of the Alter Rebbe (5573/1812)</h3>
<p>24 Tevet is the day of passing of the founder of the Chabad movement, Rabbi Schneur Zalman of Liadi, known as the Alter Rebbe. He passed away in the village of Pena while fleeing the advancing army of Napoleon. The Alter Rebbe firmly opposed Napoleon, even though many Jews supported the French emperor who promised equality. The Alter Rebbe understood with prophetic clarity that French emancipation would bring spiritual catastrophe — Jews would receive civil rights but lose their souls through assimilation. Better physical suffering under the Tsar than spiritual destruction under the rule of "enlightenment." The Alter Rebbe's legacy — the book of Tanya and an entire system of intellectual comprehension of the Divine — continues to transform the lives of millions of Jews around the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'elul-month-detailed',
    slug: 'elul-vremya-dvukh-velikikh-svetil-i-tomkhey-tmimim',
    hebrewDate: { month: 'Elul', day: 15 },
    monthIntro: {
      ru: 'Элул: Время «Двух Великих Светил» и рождения «Томхей Тмимим».',
      en: 'Elul: Time of the "Two Great Luminaries" and birth of Tomchei Temimim.',
    },
    title: {
      ru: 'Элул: «Два Великих Светила» и «Томхей Тмимим»',
      en: 'Elul: "Two Great Luminaries" and Tomchei Temimim',
      he: 'אלול: "שני המאורות הגדולים" ותומכי תמימים',
      uk: 'Елул: «Два Великих Світила» і «Томхей Тмімім»',
    },
    subtitle: {
      ru: 'Основание ешивы воинов, рождение двух светил и приход Цемах Цедека',
      en: 'Founding of the warriors\' yeshiva, birth of two luminaries, and the coming of the Tzemach Tzedek',
      he: 'ייסוד ישיבת הלוחמים, לידת שני המאורות ובואו של הצמח צדק',
      uk: 'Заснування єшиви воїнів, народження двох світил і прихід Цемах Цедека',
    },
    content: {
      ru: `<h3>15 Элула — Основание «Томхей Тмимим» (5657/1897)</h3>
<p>15 Элула 5657 (1897) года Ребе Рашаб — пятый Любавичский Ребе — основал легендарную ешиву «Томхей Тмимим» в Любавичах. Это было не просто учебное заведение — это была армия. Ребе Рашаб называл своих учеников «воинами дома Давида» и «свечезажигателями» — людьми, призванными нести свет Торы и хасидизма в самые тёмные уголки мира. Ешива объединила глубочайшее изучение нигле (открытой Торы) с систематическим изучением хасидизма — революционный подход для того времени. Выпускники «Томхей Тмимим» стали теми героями, которые сохраняли еврейскую жизнь в Советском Союзе, рискуя свободой и жизнью ради каждого обрезания, каждой миквы, каждого урока Торы.</p>

<h3>18 Элула (Хай Элул) — Рождение Баал-Шем-Това (5458/1698) и Алтер Ребе (5505/1745)</h3>
<p>18 Элула — один из самых радостных дней еврейского календаря. В этот день родились два великих светила: Баал-Шем-Тов — основатель хасидского движения (1698), и Алтер Ребе — основатель Хабада (1745). Слово «Хай» (חי) означает «жизнь», и этот день буквально вдыхает жизнь в служение месяца Элул. Баал-Шем-Тов открыл душу хасидизма — любовь к каждому еврею и радость служения Б-гу. Алтер Ребе дал хасидизму разум — систему интеллектуального постижения Б-жественности. Вместе они создали путь, который сочетает сердце и разум, чувство и понимание, доступный каждому еврею без исключения.</p>

<h3>29 Элула — День рождения Цемах Цедека (5549/1789)</h3>
<p>29 Элула — канун Рош а-Шана — родился третий Любавичский Ребе, рабби Менахем-Мендл, известный как Цемах Цедек. Само его имя связано с Машиахом: «Цемах» — одно из имён Машиаха в пророчествах. Цемах Цедек стал мостом между поколениями, объединив наследие своего деда — Алтер Ребе — с будущим развитием Хабада. Его рождение в последний день года символизирует завершение цикла и начало нового, более высокого уровня служения Б-гу и приближения Геулы.</p>`,

      en: `<h3>15 Elul — Founding of Tomchei Temimim (5657/1897)</h3>
<p>On 15 Elul 5657 (1897), the Rebbe Rashab — the fifth Lubavitcher Rebbe — founded the legendary Tomchei Temimim yeshiva in Lubavitch. This was not merely an educational institution — it was an army. The Rebbe Rashab called his students "warriors of the House of David" and "lamplighters" — people called to carry the light of Torah and Chassidism to the darkest corners of the world. The yeshiva combined the deepest study of nigleh (the revealed Torah) with systematic study of Chassidism — a revolutionary approach for its time. Graduates of Tomchei Temimim became the heroes who preserved Jewish life in the Soviet Union, risking their freedom and lives for every circumcision, every mikvah, every Torah lesson.</p>

<h3>18 Elul (Chai Elul) — Birth of the Baal Shem Tov (5458/1698) and the Alter Rebbe (5505/1745)</h3>
<p>18 Elul is one of the most joyous days of the Jewish calendar. On this day two great luminaries were born: the Baal Shem Tov — founder of the Chassidic movement (1698), and the Alter Rebbe — founder of Chabad (1745). The word "Chai" (חי) means "life," and this day literally breathes life into the service of the month of Elul. The Baal Shem Tov revealed the soul of Chassidism — love for every Jew and the joy of serving G-d. The Alter Rebbe gave Chassidism its intellect — a system of intellectual comprehension of the Divine. Together they created a path that unites heart and mind, feeling and understanding, accessible to every single Jew without exception.</p>

<h3>29 Elul — Birthday of the Tzemach Tzedek (5549/1789)</h3>
<p>On 29 Elul — the eve of Rosh Hashanah — the third Lubavitcher Rebbe, Rabbi Menachem Mendl, known as the Tzemach Tzedek, was born. His very name is connected to Mashiach: "Tzemach" is one of the names of Mashiach in the prophecies. The Tzemach Tzedek became a bridge between generations, uniting the legacy of his grandfather — the Alter Rebbe — with the future development of Chabad. His birth on the last day of the year symbolizes the completion of one cycle and the beginning of a new, higher level of service to G-d and the drawing closer of the Geulah.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'adar-month-detailed',
    slug: 'adar-osvyashcheniye-ameriki-i-den-rozhdeniya',
    hebrewDate: { month: 'Adar', day: 9 },
    monthIntro: {
      ru: 'Адар: Освящение Америки и личный день рождения как духовный скачок.',
      en: 'Adar: Sanctifying America and personal birthdays as spiritual growth.',
    },
    title: {
      ru: 'Адар: Освящение Америки и личный день рождения',
      en: 'Adar: Sanctifying America and the Power of Birthdays',
      he: 'אדר: קידוש אמריקה וכוח יום ההולדת',
      uk: 'Адар: Освячення Америки та особистий день народження',
    },
    subtitle: {
      ru: 'Прибытие Ребе Раяца в Америку и мивца Йом уледет',
      en: 'Arrival of Rebbe Rayatz in America and Mivtza Yom Huledes',
      he: 'הגעת הרבי הריי"צ לאמריקה ומבצע יום הולדת',
      uk: 'Прибуття Ребе Раяца до Америки та мівца Йом уледет',
    },
    content: {
      ru: `<h3>9 Адара — Прибытие Ребе Раяца в США (5700/1940)</h3>
<p>9 Адара 5700 (1940) года Ребе Раяц — шестой Любавичский Ребе — ступил на американскую землю после драматического бегства из охваченной войной Европы. Америка того времени считалась «духовной пустыней» — местом, где еврейство неизбежно растворяется в ассимиляции. Но Ребе Раяц сразу заявил: «Америка из ништ андерш» — «Америка ничем не отличается». Этими словами он бросил вызов общепринятому мнению и объявил, что полноценная еврейская жизнь возможна везде. Центр мирового хасидизма переместился в «нижнее полушарие» — из Европы в Америку. Это был не просто переезд — это было начало новой эры в истории еврейского народа, эры, в которой святость должна была проникнуть в самое материалистическое общество на земле.</p>

<h3>25 Адара — День рождения Ребецн и мивца «Йом уледет»</h3>
<p>25 Адара — день рождения ребецн Хаи-Мушки Шнеерсон. Согласно каббале, 25 Адара соответствует первому дню Творения — дню, когда Б-г создал свет. Ребе неоднократно подчёркивал духовное значение дня рождения каждого еврея и инициировал кампанию «Мивца Йом уледет» — движение за осознанное празднование еврейских дней рождения. В свой день рождения по еврейскому календарю человек должен взять на себя новую духовное обязательство, дать цдаку, изучить дополнительный урок Торы и устроить фарбренген — хасидское собрание с добрыми пожеланиями и вдохновением. День рождения — это не просто праздник, а момент духовного обновления, когда душа получает новые силы свыше для выполнения своей уникальной миссии в мире.</p>`,

      en: `<h3>9 Adar — Arrival of Rebbe Rayatz in the USA (5700/1940)</h3>
<p>On 9 Adar 5700 (1940), Rebbe Rayatz — the sixth Lubavitcher Rebbe — set foot on American soil after a dramatic escape from war-torn Europe. America at that time was considered a "spiritual wasteland" — a place where Judaism inevitably dissolved into assimilation. But the Rebbe Rayatz immediately declared: "America iz nisht andersh" — "America is no different." With these words he challenged the prevailing opinion and proclaimed that full Jewish life is possible everywhere. The center of world Chassidism moved to the "lower hemisphere" — from Europe to America. This was not merely a relocation — it was the beginning of a new era in the history of the Jewish people, an era in which holiness would have to penetrate the most materialistic society on earth.</p>

<h3>25 Adar — Birthday of the Rebbetzin and Mivtza Yom Huledes</h3>
<p>25 Adar is the birthday of Rebbetzin Chaya Mushka Schneerson. According to Kabbalah, 25 Adar corresponds to the first day of Creation — the day when G-d created light. The Rebbe repeatedly emphasized the spiritual significance of every Jew's birthday and initiated the campaign "Mivtza Yom Huledes" — a movement for conscious celebration of Jewish birthdays. On one's birthday according to the Jewish calendar, a person should take on a new spiritual commitment, give tzedakah, study an additional Torah lesson, and hold a farbrengen — a Chassidic gathering with good wishes and inspiration. A birthday is not merely a celebration but a moment of spiritual renewal, when the soul receives new strength from Above to fulfill its unique mission in the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'kislev-month-full',
    slug: 'kislev-mesyats-sveta-i-izbavleniya-polnyy',
    hebrewDate: { month: 'Kislev', day: 1 },
    monthIntro: {
      ru: 'Кислев: Месяц Света и Избавления — от выздоровления Ребе до Рош а-Шана хасидизма.',
      en: 'Kislev: Month of Light and Redemption.',
    },
    title: {
      ru: 'Кислев: Свет, Избавление и Рош а-Шана хасидизма',
      en: 'Kislev: Light, Redemption, and Rosh Hashanah of Chassidism',
      he: 'כסלו: אור, גאולה וראש השנה לחסידות',
      uk: 'Кіслев: Світло, Визволення і Рош а-Шана хасидизму',
    },
    subtitle: {
      ru: 'Чудесное выздоровление, история Мителер Ребе и освобождение Алтер Ребе',
      en: 'Miraculous recovery, the story of the Mitteler Rebbe, and the liberation of the Alter Rebbe',
      he: 'החלמה נסית, סיפור האדמו"ר האמצעי ושחרור אדמו"ר הזקן',
      uk: 'Чудесне одужання, історія Мітелер Ребе та звільнення Алтер Ребе',
    },
    content: {
      ru: `<h3>1 Кислева — Выздоровление Ребе (5738/1977)</h3>
<p>1 Кислева 5738 (1977) года Ребе вернулся домой после тяжёлого сердечного приступа, случившегося в Шмини Ацерет. Это выздоровление было воспринято хасидами как настоящее чудо и стало ежегодным праздником. Во время болезни Ребе продолжал руководить, проводил фарбренгены прямо из своей комнаты, а его возвращение в «770» — главный дом Хабада — вызвало волну ликования по всему миру. Этот день напоминает о том, что здоровье праведника — это не частное дело, а духовный ресурс всего народа Израиля, и что молитва и заслуги общины способны совершать чудеса.</p>

<h3>9–10 Кислева — Мителер Ребе: рождение, уход и освобождение</h3>
<p>9 Кислева — день рождения и одновременно день ухода (йорцайт) второго Любавичского Ребе, рабби Дов-Бера, известного как Мителер Ребе. А 10 Кислева — день его освобождения из заключения в Витебске, куда он был брошен по ложному доносу. Мителер Ребе развил учение своего отца, Алтер Ребе, сделав хасидизм более доступным через подробные и обширные объяснения. Его жизнь — образец того, как преследования только усиливают распространение Торы: каждый арест заканчивался ещё более мощной волной хасидского учения.</p>

<h3>19–20 Кислева — Рош а-Шана хасидизма (5559/1798)</h3>
<p>19 Кислева 5559 (1798) года Алтер Ребе был освобождён из Петропавловской крепости в Санкт-Петербурге, куда он был заключён по обвинению в государственной измене. Этот день стал переломным моментом в истории хасидизма: небесный суд вынес приговор в пользу распространения внутренней Торы, и врата хасидизма распахнулись для всего мира. Ребе учил, что 19 Кислева — это Рош а-Шана хасидизма, день, когда каждый год обновляется Б-жественная энергия, питающая изучение и распространение учения хасидизма. В этот день хасиды по всему миру проводят грандиозные фарбренгены, изучают хасидизм и принимают на себя новые обязательства в служении Б-гу.</p>`,

      en: `<h3>1 Kislev — Recovery of the Rebbe (5738/1977)</h3>
<p>On 1 Kislev 5738 (1977), the Rebbe returned home after a severe heart attack that had occurred on Shemini Atzeret. This recovery was perceived by Chassidim as a genuine miracle and became an annual celebration. During his illness, the Rebbe continued to lead, conducting farbrengens right from his room, and his return to "770" — the main Chabad headquarters — sparked a wave of rejoicing around the world. This day serves as a reminder that the health of a tzaddik is not a private matter but a spiritual resource of the entire Jewish people, and that the prayers and merits of the community can bring about miracles.</p>

<h3>9–10 Kislev — The Mitteler Rebbe: Birth, Passing, and Liberation</h3>
<p>9 Kislev is both the birthday and the day of passing (yahrzeit) of the second Lubavitcher Rebbe, Rabbi DovBer, known as the Mitteler Rebbe. And 10 Kislev is the day of his liberation from imprisonment in Vitebsk, where he had been thrown on the basis of a false denunciation. The Mitteler Rebbe developed the teachings of his father, the Alter Rebbe, making Chassidism more accessible through detailed and expansive explanations. His life is a model of how persecution only intensifies the spread of Torah: every arrest ended with an even more powerful wave of Chassidic teaching.</p>

<h3>19–20 Kislev — Rosh Hashanah of Chassidism (5559/1798)</h3>
<p>On 19 Kislev 5559 (1798), the Alter Rebbe was released from the Peter and Paul Fortress in St. Petersburg, where he had been imprisoned on charges of treason. This day became a turning point in the history of Chassidism: the Heavenly court issued its verdict in favor of spreading the inner Torah, and the gates of Chassidism were flung open to the entire world. The Rebbe taught that 19 Kislev is the Rosh Hashanah of Chassidism — the day when each year the Divine energy that sustains the study and dissemination of Chassidic teachings is renewed. On this day, Chassidim around the world hold grand farbrengens, study Chassidism, and take on new commitments in their service of G-d.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'tishrei-month-full',
    slug: 'tishrey-videniye-i-vernost',
    hebrewDate: { month: 'Tishrei', day: 1 },
    monthIntro: {
      ru: 'Тишрей: Видение и Верность — от встречи с Машиахом до мужества ребецн Ханы.',
      en: 'Tishrei: Vision and Faithfulness.',
    },
    title: {
      ru: 'Тишрей: Видение и Верность',
      en: 'Tishrei: Vision and Faithfulness',
      he: 'תשרי: חזון ונאמנות',
      uk: 'Тішрей: Бачення і Вірність',
    },
    subtitle: {
      ru: 'Вознесение души Баал-Шем-Това к Машиаху и подвиг ребецн Ханы',
      en: 'The Baal Shem Tov\'s soul ascent to Mashiach and the heroism of Rebbetzin Chana',
      he: 'עליית נשמת הבעש"ט למשיח וגבורת הרבנית חנה',
      uk: 'Вознесіння душі Баал-Шем-Това до Машіаха і подвиг ребецн Хани',
    },
    content: {
      ru: `<h3>1 Тишрея (5507/1746) — Вознесение души Баал-Шем-Това и встреча с Машиахом</h3>
<p>В Рош а-Шана 5507 (1746) года душа Баал-Шем-Това поднялась в высшие миры и достигла чертога Машиаха. Баал-Шем-Тов задал Машиаху вопрос: «Когда придёт Господин?» — и получил ответ, изменивший ход еврейской истории: «Когда распространятся твои источники наружу». Это означало, что приход Машиаха напрямую зависит от распространения учения хасидизма — внутренней души Торы — среди всех евреев, даже в самых отдалённых уголках мира. Это видение стало программой действий для всех последующих поколений хасидов: нести свет хасидизма каждому еврею, превращая тьму изгнания в свет Геулы. Ребе сделал эту миссию центральной задачей движения Хабад-Любавич, отправляя тысячи шлухим по всему земному шару.</p>

<h3>6 Тишрея — Йорцайт ребецн Ханы (5725/1964)</h3>
<p>6 Тишрея — день памяти ребецн Ханы Шнеерсон, матери Ребе. Ребецн Хана — символ несгибаемого мужества и преданности Торе в самых тяжёлых условиях. Когда её муж, рабби Леви-Ицхак, был сослан советской властью в Казахстан за свою деятельность по сохранению еврейства, ребецн Хана последовала за ним в ссылку. В условиях, когда не было ни чернил, ни бумаги, она собирала ягоды и травы, изготавливая из них чернила, чтобы её муж мог продолжать писать свои комментарии к Торе. Этот подвиг — создание чернил из ягод в ссылке — стал символом того, что Тора не может быть уничтожена никакими преследованиями. Ребецн Хана воспитала сына, ставшего лидером всего еврейского народа, и её самоотверженность легла в основу того духовного наследия, которое продолжает менять мир.</p>`,

      en: `<h3>1 Tishrei (5507/1746) — The Baal Shem Tov's Soul Ascent and Meeting with Mashiach</h3>
<p>On Rosh Hashanah 5507 (1746), the soul of the Baal Shem Tov ascended to the highest spiritual realms and reached the chamber of Mashiach. The Baal Shem Tov asked Mashiach the question: "When will the Master come?" — and received an answer that changed the course of Jewish history: "When your springs spread outward." This meant that the coming of Mashiach depends directly on the dissemination of Chassidic teachings — the inner soul of the Torah — among all Jews, even in the most remote corners of the world. This vision became the program of action for all subsequent generations of Chassidim: to carry the light of Chassidism to every Jew, transforming the darkness of exile into the light of Geulah. The Rebbe made this mission the central task of the Chabad-Lubavitch movement, sending thousands of shluchim across the entire globe.</p>

<h3>6 Tishrei — Yahrzeit of Rebbetzin Chana (5725/1964)</h3>
<p>6 Tishrei is the day of remembrance for Rebbetzin Chana Schneerson, the Rebbe's mother. Rebbetzin Chana is a symbol of unbreakable courage and devotion to Torah under the most difficult circumstances. When her husband, Rabbi Levi Yitzchak, was exiled by the Soviet authorities to Kazakhstan for his activities in preserving Judaism, Rebbetzin Chana followed him into exile. In conditions where there was neither ink nor paper, she gathered berries and herbs, making ink from them so that her husband could continue writing his commentaries on the Torah. This act of heroism — creating ink from berries in exile — became a symbol that the Torah cannot be destroyed by any persecution. Rebbetzin Chana raised a son who became the leader of the entire Jewish people, and her self-sacrifice became the foundation of the spiritual legacy that continues to change the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },
  {
    id: 'av-month-detailed',
    slug: 'menakhem-av-utesheniye-v-ssylke',
    hebrewDate: { month: 'Av', day: 20 },
    monthIntro: {
      ru: 'Менахем-Ав: Утешение в ссылке — память о рабби Леви-Ицхаке.',
      en: 'Menachem Av: Consolation in Exile.',
    },
    title: {
      ru: 'Менахем-Ав: Утешение в ссылке',
      en: 'Menachem Av: Consolation in Exile',
      he: 'מנחם-אב: נחמה בגלות',
      uk: 'Менахем-Ав: Утіха в засланні',
    },
    subtitle: {
      ru: 'Йорцайт рабби Леви-Ицхака Шнеерсона — подвиг веры в казахстанской ссылке',
      en: 'Yahrzeit of Rabbi Levi Yitzchak Schneerson — a feat of faith in Kazakhstani exile',
      he: 'יארצייט הרב לוי יצחק שניאורסון — גבורת אמונה בגלות קזחסטן',
      uk: 'Йорцайт рабі Леві-Іцхака Шнеєрсона — подвиг віри в казахстанському засланні',
    },
    content: {
      ru: `<h3>20 Ава — Йорцайт рабби Леви-Ицхака Шнеерсона (5704/1944)</h3>
<p>20 Менахем-Ава 5704 (1944) года в далёкой Алма-Ате скончался рабби Леви-Ицхак Шнеерсон — отец Ребе и выдающийся знаток каббалы. Рабби Леви-Ицхак занимал должность главного раввина Днепропетровска (ныне Днепр), где он бесстрашно боролся за сохранение еврейской жизни под советским режимом. За свою деятельность — организацию миквы, обрезаний, обучения Торе — он был арестован в 1939 году и приговорён к ссылке в Казахстан. Пять лет он провёл в невыносимых условиях: голод, болезни, полная изоляция от еврейской общины. Но даже в тюрьмах и ссылке рабби Леви-Ицхак ни на минуту не прекращал изучать и распространять Тору.</p>

<p>Его жена, ребецн Хана, изготавливала для него чернила из ягод, и он записывал глубочайшие каббалистические комментарии на полях книг, которые удавалось достать. Эти записи — «Ликутей Леви-Ицхак» — впоследствии были изданы и стали одним из сокровищ хасидской литературы. Ребе неоднократно ссылался на труды своего отца и глубоко чтил его память. Подвиг рабби Леви-Ицхака — это живое свидетельство того, что ни один тиран не способен погасить огонь Торы в еврейской душе. Даже в самых тёмных обстоятельствах свет продолжает гореть, и именно из этой тьмы рождается самое яркое сияние Геулы.</p>`,

      en: `<h3>20 Av — Yahrzeit of Rabbi Levi Yitzchak Schneerson (5704/1944)</h3>
<p>On 20 Menachem Av 5704 (1944), in distant Alma-Ata, Rabbi Levi Yitzchak Schneerson passed away — the Rebbe's father and an outstanding scholar of Kabbalah. Rabbi Levi Yitzchak served as the chief rabbi of Dnepropetrovsk (now Dnipro), where he fearlessly fought to preserve Jewish life under the Soviet regime. For his activities — organizing mikvahs, circumcisions, and Torah education — he was arrested in 1939 and sentenced to exile in Kazakhstan. He spent five years under unbearable conditions: hunger, illness, and complete isolation from the Jewish community. Yet even in prisons and exile, Rabbi Levi Yitzchak never stopped studying and spreading Torah for a single moment.</p>

<p>His wife, Rebbetzin Chana, made ink for him from berries, and he wrote the most profound Kabbalistic commentaries in the margins of whatever books could be obtained. These writings — "Likkutei Levi Yitzchak" — were later published and became one of the treasures of Chassidic literature. The Rebbe repeatedly referenced his father's works and deeply honored his memory. The heroism of Rabbi Levi Yitzchak is living testimony that no tyrant can extinguish the fire of Torah in a Jewish soul. Even in the darkest circumstances the light continues to burn, and it is precisely from this darkness that the brightest radiance of the Geulah is born.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-28',
  },

  // ========== Nissan Calendar Articles (2026-03-29) ==========

  {
    id: 'nissan-1-rosh-chodesh',
    slug: 'nissan-1-rosh-khodesh-nissan',
    hebrewDate: { month: 'Nisan', day: 1 },
    title: {
      ru: '1 Ниссана — Рош Ходеш Ниссан: Новый год месяцев',
      en: '1 Nisan — Rosh Chodesh Nisan: The New Year of Months',
      he: 'א\' בניסן — ראש חודש ניסן: ראש השנה לחודשים',
      uk: '1 Ніссана — Рош Ходеш Ніссан: Новий рік місяців',
    },
    subtitle: {
      ru: 'День десяти корон и начало чудес',
      en: 'The Day of Ten Crowns and the Beginning of Miracles',
      he: 'יום עשר העטרות ותחילת הניסים',
      uk: 'День десяти корон і початок чудес',
    },
    content: {
      ru: `<h3>Рош а-Шана месяцев — день десяти корон</h3>
<p>Первое Ниссана — это не просто начало нового месяца, а подлинный «Новый год месяцев», как об этом сказано в Торе: «Месяц этот вам — начало месяцев» (Шмот 12:2). Мудрецы Талмуда (Шаббат 87б) учат, что в этот день сошлись десять «корон» — десять уникальных событий, произошедших впервые в истории. Среди них: день начала Творения (по мнению рабби Йеошуа), первый день служения в Мишкане, первый день для жертвоприношений и многие другие. Этот день также связан с «несиим» — лидерами поколений, ведь именно 1 Ниссана начинается чтение «приношений глав колен». Каждый руководитель еврейского народа несёт ответственность за духовное пробуждение своего поколения, и Рош Ходеш Ниссан напоминает: истинное лидерство — это служение Б-гу и народу.</p>

<h3>Призыв Ребе: новое начало в Торе и заповедях</h3>
<p>Ребе Менахем-Мендл Шнеерсон неоднократно подчёркивал, что слово «Ниссан» (נִיסָן) происходит от слова «нес» (נֵס) — «чудо». Месяц Ниссан — это время, когда Б-г действует за пределами естественного порядка, и каждый еврей может ощутить эту сверхъестественную энергию. Ребе призывал начинать Ниссан с обновлённой решимостью в изучении Торы и исполнении заповедей, говоря, что именно в этот момент открываются врата для чудес. Как первый месяц несёт энергию обновления для всего года, так и каждый человек призван обновить свою связь с Б-гом, преодолев привычные ограничения и выйдя за рамки «природного» восприятия мира.</p>`,

      en: `<h3>The New Year for Months — The Day of Ten Crowns</h3>
<p>The first of Nisan is not merely the beginning of a new month but the true "New Year of Months," as the Torah states: "This month shall be for you the beginning of months" (Exodus 12:2). The Sages of the Talmud (Shabbat 87b) teach that on this day ten "crowns" converged — ten unique events that occurred for the first time in history. Among them: the first day of Creation (according to Rabbi Yehoshua), the first day of service in the Mishkan, the first day for sacrificial offerings, and many others. This day is also connected to the Nesi'im — leaders of the generations — because on 1 Nisan the reading of the "offerings of the tribal princes" begins. Every leader of the Jewish people carries responsibility for the spiritual awakening of their generation, and Rosh Chodesh Nisan reminds us: true leadership means service to G-d and the people.</p>

<h3>The Rebbe's Call: A New Beginning in Torah and Mitzvot</h3>
<p>The Rebbe, Rabbi Menachem Mendel Schneerson, repeatedly emphasized that the word "Nisan" (נִיסָן) derives from the word "nes" (נֵס) — "miracle." The month of Nisan is a time when G-d acts beyond the natural order, and every Jew can sense this supernatural energy. The Rebbe urged beginning Nisan with renewed determination in Torah study and observance of mitzvot, saying that at this very moment gates are opened for miracles. Just as the first month carries the energy of renewal for the entire year, so too every individual is called to renew their connection with G-d, breaking through habitual limitations and going beyond a "natural" perception of the world.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'nissan-5-10-pesach-prep',
    slug: 'nissan-5-10-podgotovka-k-pesakhu',
    hebrewDate: { month: 'Nisan', day: 5 },
    title: {
      ru: '5-10 Ниссана: Подготовка к Песаху',
      en: '5–10 Nisan: Preparing for Pesach',
      he: 'ה\'–י\' בניסן: הכנות לפסח',
      uk: '5-10 Ніссана: Підготовка до Песаху',
    },
    subtitle: {
      ru: 'Майим шелану, пасхальный ягнёнок и десять сфирот',
      en: 'Mayim Shelanu, the Paschal Lamb, and the Ten Sefirot',
      he: 'מים שלנו, קרבן פסח ועשר הספירות',
      uk: 'Маїм шелану, пасхальне ягня і десять сфірот',
    },
    content: {
      ru: `<h3>5 Ниссана — черпание «маим шелану»</h3>
<p>Пятого Ниссана в хабадской традиции совершается особый обычай: Ребе лично выходил набирать «маим шелану» — воду, которая «отстоялась на ночь» (буквально «наша вода»). Эта вода используется для выпечки шмура-мацы — мацы, за которой наблюдают от самого момента сбора пшеницы. Казалось бы, простое действие — набрать воду, — но в нём заключён глубокий смысл: подготовка к освобождению начинается с мельчайших деталей. Каждый шаг в приготовлении к Песаху — это акт осознанности, превращающий материальное действие в духовное служение Б-гу. Ребе подчёркивал, что именно тщательность в подготовке «маим шелану» отражает наше стремление к совершенству в служении Всевышнему.</p>

<h3>10 Ниссана — отделение пасхального ягнёнка</h3>
<p>Десятого Ниссана, за четыре дня до Исхода из Египта, Б-г повелел каждой еврейской семье отделить ягнёнка для пасхальной жертвы (Шмот 12:3). Это был акт невероятной смелости: ягнёнок был божеством египтян, и привязать его к ножке кровати означало бросить открытый вызов идолопоклонству. Число десять в еврейской традиции связано с десятью сфирот — каналами, через которые Б-жественный свет нисходит в мир. Подготовка к Песаху в эти дни переходит в активную фазу: генеральная уборка дома от хамеца, проверка посуды, приобретение продуктов. Всё это не просто бытовые хлопоты, а духовная работа по очищению души от «внутреннего хамеца» — гордыни и самодовольства.</p>`,

      en: `<h3>5 Nisan — Drawing "Mayim Shelanu"</h3>
<p>On the fifth of Nisan, the Chabad tradition includes a special custom: the Rebbe would personally go out to draw "mayim shelanu" — water that has "rested overnight" (literally "our water"). This water is used for baking shmura matza — matza that is guarded from the very moment of the wheat harvest. What appears to be a simple act — drawing water — contains deep meaning: preparation for liberation begins with the smallest details. Every step in Pesach preparation is an act of mindfulness, transforming a physical action into spiritual service to G-d. The Rebbe emphasized that the very meticulousness in preparing "mayim shelanu" reflects our striving for perfection in serving the Almighty.</p>

<h3>10 Nisan — Separating the Paschal Lamb</h3>
<p>On the tenth of Nisan, four days before the Exodus from Egypt, G-d commanded every Jewish family to set aside a lamb for the Passover offering (Exodus 12:3). This was an act of extraordinary courage: the lamb was a deity of the Egyptians, and tying it to the bedpost meant openly defying idolatry. The number ten in Jewish tradition is connected to the ten Sefirot — the channels through which Divine light descends into the world. Preparation for Pesach enters its active phase during these days: thorough cleaning of the home from chametz, checking utensils, purchasing supplies. All of this is not merely household chores but spiritual work of purifying the soul from "inner chametz" — pride and complacency.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'nissan-14-erev-pesach',
    slug: 'nissan-14-erev-pesakh-i-rambam',
    hebrewDate: { month: 'Nisan', day: 14 },
    title: {
      ru: '14 Ниссана — Эрев Песах и день рождения Рамбама',
      en: '14 Nisan — Erev Pesach and the Birthday of the Rambam',
      he: 'י"ד בניסן — ערב פסח ויום הולדת הרמב"ם',
      uk: '14 Ніссана — Ерев Песах і день народження Рамбама',
    },
    subtitle: {
      ru: 'Уничтожение хамеца и изучение учения Рамбама',
      en: 'Destroying Chametz and Studying the Rambam\'s Teachings',
      he: 'ביעור חמץ ולימוד תורת הרמב"ם',
      uk: 'Знищення хамецу та вивчення вчення Рамбама',
    },
    content: {
      ru: `<h3>Утреннее чтение Торы и биур хамец</h3>
<p>Четырнадцатое Ниссана — Эрев Песах — один из самых насыщенных дней еврейского календаря. Утром совершается особое чтение Торы, а затем наступает кульминация недельной подготовки: «биур хамец» — уничтожение квасного. Накануне вечером проводится «бдикат хамец» — поиск хамеца при свете свечи, а утром найденные остатки сжигаются. Этот ритуал имеет глубочайший внутренний смысл: хамец символизирует «разбухание» эго, гордыню, которая отдаляет человека от Б-га. Сжигая хамец, мы совершаем духовное очищение, освобождая пространство для мацы — символа смирения и самоотречения перед Творцом.</p>

<h3>День рождения Рамбама и призыв Ребе</h3>
<p>Четырнадцатое Ниссана — это также день рождения величайшего кодификатора еврейского закона, рабби Моше бен Маймона (Рамбама, 1138–1204). Ребе Менахем-Мендл Шнеерсон придавал огромное значение изучению трудов Рамбама и установил ежедневный цикл изучения «Мишне Тора» — монументального кодекса Рамбама, охватывающего все 613 заповедей Торы. В фарбренгенах, приуроченных к этой дате, Ребе раскрывал глубинную связь между учением Рамбама и хасидизмом. Рамбам учил, что каждый человек одним поступком может склонить весь мир к чаше заслуг, — и этот призыв к личной ответственности перекликается с хасидским учением о том, что Б-г ожидает от каждого именно его уникального вклада.</p>`,

      en: `<h3>Morning Torah Reading and Biur Chametz</h3>
<p>The fourteenth of Nisan — Erev Pesach — is one of the most action-packed days on the Jewish calendar. In the morning a special Torah reading takes place, followed by the culmination of a week of preparation: "biur chametz" — the destruction of leavened bread. The night before, "bedikat chametz" is performed — searching for chametz by candlelight — and in the morning the remaining pieces are burned. This ritual carries the deepest inner meaning: chametz symbolizes the "puffing up" of the ego, the pride that distances a person from G-d. By burning chametz we perform a spiritual purification, clearing space for matza — the symbol of humility and self-nullification before the Creator.</p>

<h3>The Rambam's Birthday and the Rebbe's Call</h3>
<p>The fourteenth of Nisan is also the birthday of the greatest codifier of Jewish law, Rabbi Moshe ben Maimon (the Rambam, 1138–1204). The Rebbe, Rabbi Menachem Mendel Schneerson, placed enormous importance on studying the Rambam's works and established a daily cycle of studying "Mishneh Torah" — the Rambam's monumental code encompassing all 613 commandments of the Torah. In farbrengens marking this date, the Rebbe revealed the deep connection between the Rambam's teachings and Chassidism. The Rambam taught that every person, with a single deed, can tip the entire world toward the scale of merit — and this call to personal responsibility echoes the Chassidic teaching that G-d expects from each individual precisely their unique contribution.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'nissan-15-16-pesach',
    slug: 'nissan-15-16-pesakh-i-omer',
    hebrewDate: { month: 'Nisan', day: 15 },
    title: {
      ru: '15-16 Ниссана: Песах и начало отсчёта Омера',
      en: '15–16 Nisan: Pesach and the Beginning of Counting the Omer',
      he: 'ט"ו–ט"ז בניסן: פסח ותחילת ספירת העומר',
      uk: '15-16 Ніссана: Песах і початок відліку Омера',
    },
    subtitle: {
      ru: 'Маца — символ самоотречения и истинной свободы',
      en: 'Matza — Symbol of Self-Nullification and True Freedom',
      he: 'מצה — סמל הביטול והחירות האמיתית',
      uk: 'Маца — символ самозречення та справжньої свободи',
    },
    content: {
      ru: `<h3>15 Ниссана — первый день Песаха</h3>
<p>Пятнадцатое Ниссана — ночь Седера, центральное событие всего еврейского года. В эту ночь мы не просто «вспоминаем» Исход из Египта — мы заново переживаем его. Маца, которую мы едим, — это не просто «хлеб бедности»: в хасидском учении маца символизирует «битуль» — самоотречение и полное принятие ига Небес. В отличие от хамеца, который «поднимается» и символизирует гордыню, маца остаётся плоской и скромной. Именно в этом — парадокс истинной свободы: настоящее освобождение приходит не через раздувание эго, а через смирение перед Б-гом. Ребе учил, что каждый Песах открывает новый уровень свободы — не только от внешнего рабства, но и от внутренних оков привычек, страхов и ложных представлений.</p>

<h3>16 Ниссана — начало Сфират а-Омер</h3>
<p>На второй вечер Песаха начинается Сфират а-Омер — отсчёт сорока девяти дней от Песаха до Шавуота. Каждый день мы произносим благословение и считаем: «Сегодня — такой-то день Омера». Этот отсчёт — не просто арифметическое упражнение: считая дни, мы освящаем само течение времени. Каждый из 49 дней соответствует одной из комбинаций семи нижних сфирот (хесед, гвура, тиферет, нецах, ход, йесод, малхут), и, сосредотачиваясь на качестве каждого дня, мы совершаем глубокую внутреннюю работу по исправлению своих душевных качеств. От свободы Песаха мы шаг за шагом поднимаемся к дарованию Торы на Шавуот — от освобождения к принятию цели этого освобождения.</p>`,

      en: `<h3>15 Nisan — The First Day of Pesach</h3>
<p>The fifteenth of Nisan — the night of the Seder — is the central event of the entire Jewish year. On this night we do not merely "remember" the Exodus from Egypt — we relive it. The matza we eat is not simply "bread of poverty": in Chassidic teaching, matza symbolizes "bittul" — self-nullification and complete acceptance of the Heavenly yoke. Unlike chametz, which "rises" and symbolizes pride, matza remains flat and humble. Herein lies the paradox of true freedom: genuine liberation comes not through inflating the ego but through humility before G-d. The Rebbe taught that every Pesach reveals a new level of freedom — not only from external slavery but from the inner shackles of habits, fears, and false beliefs.</p>

<h3>16 Nisan — The Beginning of Sefirat HaOmer</h3>
<p>On the second evening of Pesach, Sefirat HaOmer begins — the counting of forty-nine days from Pesach to Shavuot. Each day we recite a blessing and count: "Today is such-and-such day of the Omer." This counting is not merely an arithmetic exercise: by counting the days we sanctify the very flow of time itself. Each of the 49 days corresponds to one of the combinations of the seven lower Sefirot (Chesed, Gevurah, Tiferet, Netzach, Hod, Yesod, Malchut), and by focusing on the quality of each day we perform deep inner work of refining our character traits. From the freedom of Pesach we ascend step by step toward the giving of the Torah on Shavuot — from liberation to embracing the purpose of that liberation.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'nissan-21-22-pesach-end',
    slug: 'nissan-21-22-shvii-i-akharon-shel-pesakh',
    hebrewDate: { month: 'Nisan', day: 21 },
    title: {
      ru: '21-22 Ниссана: Рассечение моря и трапеза Машиаха',
      en: '21–22 Nisan: The Splitting of the Sea and the Feast of Mashiach',
      he: 'כ"א–כ"ב בניסן: קריעת ים סוף וסעודת משיח',
      uk: '21-22 Ніссана: Розсічення моря і трапеза Машіаха',
    },
    subtitle: {
      ru: 'Швии шель Песах и Ахарон шель Песах',
      en: 'Shvii shel Pesach and Acharon shel Pesach',
      he: 'שביעי של פסח ואחרון של פסח',
      uk: 'Швії шель Песах і Ахарон шель Песах',
    },
    content: {
      ru: `<h3>21 Ниссана — Швии шель Песах: рассечение Красного моря</h3>
<p>Седьмой день Песаха — день, когда произошло одно из величайших чудес в истории: рассечение Красного (Тростникового) моря. Воды расступились, и весь народ Израиля прошёл по сухому дну, а преследовавшая их армия фараона была поглощена волнами. Мидраш рассказывает, что дети первыми узнали Б-га при море и воскликнули: «Это мой Б-г!» Именно поэтому Ребе уделял особое внимание детям в эти дни, организуя специальные детские собрания — «ралли». Ребе учил, что чистота детской веры способна пробудить чудеса даже в нашем поколении. Швии шель Песах напоминает нам: когда человек стоит перед непреодолимым препятствием, Б-г способен рассечь само море, — нужно лишь сделать первый шаг вперёд с полным упованием на Творца.</p>

<h3>22 Ниссана — Ахарон шель Песах: трапеза Машиаха</h3>
<p>Последний день Песаха (за пределами Земли Израиля) — Ахарон шель Песах — пронизан светом будущего Избавления. Баал Шем Тов установил обычай устраивать в этот день «Сеудат Машиах» — «Трапезу Машиаха», на которой едят мацу и пьют четыре бокала вина, подобно Седеру. Ребе Рашаб (пятый Любавичский Ребе) укрепил эту традицию, а Ребе Менахем-Мендл Шнеерсон превратил её в грандиозное событие, наполненное пением, хасидскими речами и непоколебимой верой в скорый приход Машиаха. Ахарон шель Песах — это мост между Исходом из Египта и окончательной Геулой: как Б-г вывел нас из Египта, так Он приведёт нас к полному и окончательному Избавлению, и вера в это — не абстрактная надежда, а живая реальность, которую мы ощущаем за трапезой Машиаха.</p>`,

      en: `<h3>21 Nisan — Shvii shel Pesach: The Splitting of the Red Sea</h3>
<p>The seventh day of Pesach marks the day when one of the greatest miracles in history occurred: the splitting of the Red (Reed) Sea. The waters parted and the entire nation of Israel crossed on dry ground, while Pharaoh's pursuing army was swallowed by the waves. The Midrash relates that children were the first to recognize G-d at the sea and exclaimed: "This is my G-d!" For this reason, the Rebbe placed special emphasis on children during these days, organizing special children's assemblies — "rallies." The Rebbe taught that the purity of a child's faith can awaken miracles even in our generation. Shvii shel Pesach reminds us: when a person stands before an insurmountable obstacle, G-d is capable of splitting the sea itself — one need only take the first step forward with complete trust in the Creator.</p>

<h3>22 Nisan — Acharon shel Pesach: The Feast of Mashiach</h3>
<p>The last day of Pesach (outside the Land of Israel) — Acharon shel Pesach — is suffused with the light of the future Redemption. The Baal Shem Tov established the custom of holding a "Seudat Mashiach" — a "Feast of Mashiach" — on this day, at which matza is eaten and four cups of wine are drunk, similar to the Seder. The Rebbe Rashab (the fifth Lubavitcher Rebbe) strengthened this tradition, and the Rebbe, Rabbi Menachem Mendel Schneerson, transformed it into a grand event filled with singing, Chassidic discourses, and unwavering faith in the imminent coming of Mashiach. Acharon shel Pesach is the bridge between the Exodus from Egypt and the final Geulah: just as G-d took us out of Egypt, so He will bring us to the complete and final Redemption — and faith in this is not an abstract hope but a living reality that we experience at the Feast of Mashiach.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'nissan-28-sicha',
    slug: 'nissan-28-znamenitaya-sikha-rebe',
    hebrewDate: { month: 'Nisan', day: 28 },
    title: {
      ru: '28 Ниссана: «Делайте всё, что в ваших силах!»',
      en: '28 Nisan: "Do Everything in Your Power!"',
      he: 'כ"ח בניסן: "עשו כל אשר ביכולתכם!"',
      uk: '28 Ніссана: «Робіть усе, що у ваших силах!»',
    },
    subtitle: {
      ru: 'Знаменитая сиха 5751 (1991) года — ответственность за приход Машиаха',
      en: 'The Famous Sicha of 5751 (1991) — Personal Responsibility for Bringing Mashiach',
      he: 'השיחה המפורסמת של תשנ"א (1991) — האחריות האישית להבאת המשיח',
      uk: 'Знаменита сіха 5751 (1991) року — відповідальність за прихід Машіаха',
    },
    content: {
      ru: `<h3>Сиха, изменившая всё</h3>
<p>28 Ниссана 5751 года (1991) Ребе Менахем-Мендл Шнеерсон произнёс одну из самых потрясающих и необычных бесед в истории хасидизма. Голос Ребе дрожал от волнения, когда он обратился к тысячам хасидов со словами, которые перевернули привычное представление о роли лидера и последователей. Ребе сказал, что он сделал всё возможное со своей стороны, чтобы приблизить приход Машиаха, — и теперь передаёт эту ответственность каждому еврею лично. «Делайте всё, что в ваших силах, чтобы привести Машиаха на деле и в действительности!» — призвал Ребе. Эти слова стали поворотным моментом: отныне приход Машиаха — не вопрос ожидания чуда свыше, а дело личных усилий каждого.</p>

<h3>Призыв к личному действию</h3>
<p>Значение этой сихи невозможно переоценить. Ребе фактически заявил, что эпоха пассивного ожидания закончилась. Каждый еврей — будь то раввин или простой работник, учёный или студент — несёт личную ответственность за то, чтобы приблизить Избавление. Как это сделать практически? Через добавление в изучении Торы, в исполнении заповедей, в актах доброты и милосердия, через распространение учения хасидизма и идеалов справедливости среди народов мира. Ребе подчеркнул: Б-г ждёт именно наших действий — не ангельских, не сверхъестественных, а простых человеческих поступков, совершённых с искренностью и самоотдачей. 28 Ниссана — это ежегодное напоминание: Машиах зависит от тебя.</p>`,

      en: `<h3>The Sicha That Changed Everything</h3>
<p>On the 28th of Nisan 5751 (1991), the Rebbe, Rabbi Menachem Mendel Schneerson, delivered one of the most extraordinary and unusual talks in the history of Chassidism. The Rebbe's voice trembled with emotion as he addressed thousands of Chassidim with words that overturned the conventional understanding of the roles of leader and followers. The Rebbe said that he had done everything possible on his part to hasten the coming of Mashiach — and was now placing this responsibility upon every individual Jew. "Do everything in your power to bring Mashiach in actuality and in reality!" the Rebbe urged. These words became a turning point: from that moment on, the coming of Mashiach was no longer a matter of waiting for a miracle from above but a matter of personal effort by each individual.</p>

<h3>A Call to Personal Action</h3>
<p>The significance of this sicha cannot be overstated. The Rebbe effectively declared that the era of passive waiting was over. Every Jew — whether a rabbi or an ordinary worker, a scholar or a student — bears personal responsibility for hastening the Redemption. How does one do this in practice? Through adding in Torah study, in the observance of mitzvot, in acts of kindness and charity, through spreading the teachings of Chassidism and the ideals of justice among the nations of the world. The Rebbe emphasized: G-d awaits precisely our actions — not angelic ones, not supernatural ones, but simple human deeds performed with sincerity and dedication. The 28th of Nisan is an annual reminder: Mashiach depends on you.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'pesach-matza-freedom',
    slug: 'svoboda-byt-nikem-pochemu-matsa-vkusnee-egoizma',
    title: {
      ru: 'Свобода быть «никем»: Почему маца вкуснее эгоизма',
      en: 'Freedom to Be "Nobody": Why Matza Tastes Better Than Ego',
      he: 'החירות להיות "אף אחד": למה מצה טעימה יותר מאגואיזם',
      uk: 'Свобода бути «ніким»: Чому маца смачніша за егоїзм',
    },
    subtitle: {
      ru: 'Битуль — самоотречение — ключ к истинной свободе Песаха',
      en: 'Bittul — self-nullification — the key to the true freedom of Pesach',
      he: 'ביטול — מפתח לחירות האמיתית של פסח',
      uk: 'Бітуль — самозречення — ключ до справжньої свободи Песаха',
    },
    content: {
      ru: `<h3>Маца против хамеца</h3>
<p>В культуре «личного бренда» понятие битуля — самоотречения — кажется безнадёжно устаревшим. Зачем отказываться от себя, когда весь мир кричит «будь собой»? Но хасидизм утверждает: истинная свобода начинается именно там, где заканчивается диктатура эго. Маца — в отличие от надутого, «раздувшегося» хамеца — символизирует отсутствие «я», превращение в сосуд для Б-жественного света. Хамец — это гордыня, самодовольство, ощущение собственной важности, которое закрывает человека от Творца. Маца же — это смирение, готовность принять волю Всевышнего без примеси личных амбиций. Битуль — это не самоуничижение и не слабость, а высшая способность подняться над своей природой, выйти за пределы ограниченного «я» и стать проводником бесконечного Б-жественного света в этот мир. Именно поэтому маца называется «хлебом веры» — она питает не тело, а душу, пробуждая в нас ту точку, которая всегда связана с Б-гом.</p>

<h3>Истинная свобода Песаха</h3>
<p>Песах — это переход от служения инстинктам к каббалат оль — принятию ига Небес. Казалось бы, одно рабство сменяется другим, но это глубокое заблуждение. Рабство Египта — это подчинение низменным желаниям, привычкам и страхам. Принятие Б-жественной воли — это жизнь ради великой миссии, а не мелочных потребностей. Наши Ребеим не имели личных планов — вся их жизнь была посвящена распространению света Творца в мире. Когда мы едим мацу на Седере, мы питаем свою веру — разум должен властвовать над эмоциями, освобождая нас от рабства привычек и инстинктов. Маца учит нас, что настоящая свобода — это не вседозволенность, а способность подчинить своё животное начало высшей цели. Тот, кто живёт ради миссии, свободен от тысячи мелких тревог, ибо его жизнь наполнена смыслом, превосходящим любые личные интересы.</p>`,

      en: `<h3>Matza vs. Chametz</h3>
<p>In the culture of "personal branding," the concept of bittul — self-nullification — seems hopelessly outdated. Why give up your sense of self when the whole world screams "be yourself"? But Chassidism teaches that true freedom begins precisely where the ego's dictatorship ends. Matza — unlike puffed-up, inflated chametz — symbolizes the absence of the "I," the transformation into a vessel for G-dliness. Chametz represents pride, self-satisfaction, and the sense of self-importance that closes a person off from the Creator. Matza, on the other hand, represents humility — the willingness to accept the will of the Almighty without the admixture of personal ambitions. Bittul is not self-diminishment or weakness but the supreme ability to transcend one's nature, to go beyond the limited "I" and become a conduit for infinite G-dly light in this world. This is why matza is called the "bread of faith" — it nourishes not the body but the soul, awakening within us that essential point that is always connected to G-d.</p>

<h3>The True Freedom of Pesach</h3>
<p>Pesach marks the transition from serving our instincts to kabbalat ol — accepting the yoke of Heaven. At first glance it might seem that one form of slavery simply replaces another, but this is a profound error. The slavery of Egypt means subjugation to base desires, habits, and fears. Accepting G-d's will means living for a great mission rather than petty needs. Our Rebbes had no personal plans — their entire lives were devoted to spreading the Creator's light in the world. When we eat matza at the Seder, we nourish our faith — the intellect must rule over emotions, freeing us from slavery to habits and impulses. Matza teaches us that real freedom is not permissiveness but the ability to subordinate our animal nature to a higher purpose. One who lives for a mission is free from a thousand petty anxieties, for their life is filled with meaning that surpasses any personal interest.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'pesach-children-heroes',
    slug: 'diktatura-detey-kak-doshkolniki-spasayut-pesakh',
    title: {
      ru: 'Диктатура детей: Как дошкольники спасают Песах своих родителей',
      en: 'Children\'s Dictatorship: How Preschoolers Save Their Parents\' Pesach',
      he: 'דיקטטורת הילדים: איך גן-ילדים מצילים את הפסח של ההורים',
      uk: 'Диктатура дітей: Як дошкільнята рятують Песах своїх батьків',
    },
    subtitle: {
      ru: 'Дети — гаранты, благодаря которым народу была дана Тора',
      en: 'Children are the guarantors thanks to whom the nation received the Torah',
      he: 'הילדים — הערבים שבזכותם ניתנה התורה לעם',
      uk: 'Діти — гаранти, завдяки яким народу було дано Тору',
    },
    content: {
      ru: `<h3>Революция Ребе</h3>
<p>Ребе Менахем-Мендл Шнеерсон совершил настоящую революцию, сделав детей главными героями еврейской жизни. Он создал «Цивот Ашем» — «Армию Б-га», — чтобы дети активно участвовали в борьбе за последние мгновения изгнания. Ребе неоднократно подчёркивал, что дети нашего поколения обладают особыми душами, которые естественным образом тянутся к духовности. В то время как взрослые обременены привычками, сомнениями и компромиссами, дети обладают чистотой восприятия, позволяющей им видеть мир таким, каким его задумал Творец. Именно поэтому при даровании Торы на горе Синай Б-г потребовал, чтобы поручителями за соблюдение Торы стали дети — не мудрецы, не пророки, а именно дети. Их чистая вера и искреннее желание делать добро — вот гарантия существования Торы в мире. Ребе понимал это как никто другой и потому вкладывал колоссальную энергию в детское еврейское образование.</p>

<h3>Дети влияют на дом</h3>
<p>В хасидской модели воспитания дети не просто пассивно слушают рассказы родителей за седером — они активно влияют на атмосферу дома, напоминая о мицвот, задавая вопросы и побуждая взрослых к действию. Знаменитые парады Лаг ба-Омер, организованные Ребе, — это тысячи детей, открыто провозглашающих свою веру, становящихся примером для взрослых, привыкших скрывать своё еврейство. Ребе говорил: один ребёнок, произносящий «Шма Исраэль» с искренностью, способен пробудить целый квартал. Воспитание «умных детей», которые не просто заучивают, а применяют знания на практике, — это кратчайший путь к Избавлению. Когда дети становятся «маленькими посланниками» Ребе, они несут свет Торы в места, куда взрослые порой не могут проникнуть, — в школьные дворы, парки и детские площадки.</p>`,

      en: `<h3>The Rebbe's Revolution</h3>
<p>The Rebbe, Rabbi Menachem Mendel Schneerson, carried out a genuine revolution by making children the main heroes of Jewish life. He established "Tzivos Hashem" — the "Army of G-d" — so that children could actively participate in the battle during the final moments of exile. The Rebbe repeatedly emphasized that the children of our generation possess special souls that are naturally drawn to spirituality. While adults are burdened by habits, doubts, and compromises, children possess a purity of perception that allows them to see the world as the Creator intended it. This is precisely why, at the giving of the Torah on Mount Sinai, G-d demanded that children serve as the guarantors for the Torah's observance — not sages, not prophets, but specifically children. Their pure faith and sincere desire to do good are the guarantee of the Torah's existence in the world. The Rebbe understood this like no one else and therefore invested enormous energy in Jewish children's education.</p>

<h3>Children Influence the Home</h3>
<p>In the Chassidic model of education, children do not merely listen passively to their parents' stories at the Seder — they actively influence the home's atmosphere, reminding about mitzvot, asking questions, and prompting adults to action. The famous Lag BaOmer parades organized by the Rebbe featured thousands of children openly proclaiming their faith, becoming examples for adults accustomed to hiding their Jewishness. The Rebbe said: one child reciting "Shema Yisrael" with sincerity can awaken an entire neighborhood. Raising "smart children" who don't merely memorize but apply knowledge in practice is the shortest path to Redemption. When children become the Rebbe's "little emissaries," they carry the light of Torah to places adults sometimes cannot reach — schoolyards, parks, and playgrounds.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'pesach-matza-lion',
    slug: 'matsa-v-pasti-lva-missiya-v-egipte',
    title: {
      ru: 'Маца в пасти льва: Религиозный хайп или миссия в «Египте»?',
      en: 'Matza in the Lion\'s Mouth: Religious Hype or Mission in "Egypt"?',
      he: 'מצה בלוע הארי: הייפ דתי או שליחות ב"מצרים"?',
      uk: 'Маца в пащі лева: Релігійний хайп чи місія в «Єгипті»?',
    },
    subtitle: {
      ru: 'Америка из духовной пустыни стала центром распространения Торы',
      en: 'America transformed from a spiritual wasteland into a center for spreading Torah',
      he: 'אמריקה הפכה ממדבר רוחני למרכז הפצת תורה',
      uk: 'Америка з духовної пустелі стала центром поширення Тори',
    },
    content: {
      ru: `<h3>Новая эра</h3>
<p>Прибытие Ребе Менахем-Мендла Шнеерсона в Америку 28 Сивана 1941 года ознаменовало начало «новой эры» в истории хасидизма и всего еврейства. Ребе часто приводил притчу о птице, вытаскивающей занозу из пасти льва: мы вошли в современный «Египет» — Америку, страну безграничного материализма и духовного соблазна — и взяли её мощь на служение святости. Вместо замкнутости гетто хасидизм принял «американский стиль»: масштаб, публичность, использование прессы, радио и телевидения для распространения Торы. Ребе понимал, что нельзя бороться с ассимиляцией, прячась за стенами синагоги, — нужно выйти на улицы и площади, говорить на языке, понятном каждому. Америка из духовной пустыни, где «алте хайм» казался безвозвратно утраченным, превратилась в мировой центр еврейского образования, издательской деятельности и шлихут — системы посланников Ребе, охватившей весь земной шар.</p>

<h3>Мивца-танки</h3>
<p>Ответом на ассимиляцию стали знаменитые «мицва-танки» — передвижные станции, превращающие городские улицы в поле битвы за каждую еврейскую душу. Ребе учил: не стесняйтесь насмешников — зажигайте ханукии у городских ратуш, устанавливайте мезузы в офисах, предлагайте прохожим наложить тфиллин прямо посреди Манхэттена. Цель ясна: Б-жественность должна ощущаться естественно, стать «сделанной в Америке», проникнуть даже в заголовки светских газет. Ребе превратил каждого еврея в посланника, каждый дом — в маленький Храм, каждую улицу — в территорию Б-жественного присутствия. То, что казалось безумием в 1950-х, стало нормой к концу XX века: сегодня публичное зажигание ханукии — событие мирового масштаба, а слово «Хабад» известно в самых отдалённых уголках планеты.</p>`,

      en: `<h3>A New Era</h3>
<p>The arrival of the Rebbe, Rabbi Menachem Mendel Schneerson, in America on the 28th of Sivan 1941 marked the beginning of a "new era" in the history of Chassidism and all of Jewry. The Rebbe often cited the parable of a bird pulling a thorn from a lion's mouth: we entered the modern "Egypt" — America, a land of boundless materialism and spiritual temptation — and harnessed its power for the service of holiness. Instead of the insularity of the ghetto, Chassidism adopted the "American style": scale, publicity, and the use of press, radio, and television to spread Torah. The Rebbe understood that one cannot fight assimilation by hiding behind synagogue walls — one must go out into the streets and squares, speaking a language everyone can understand. America was transformed from a spiritual wasteland, where the "alte heim" seemed irretrievably lost, into a world center of Jewish education, publishing, and shlichus — the Rebbe's system of emissaries that came to span the entire globe.</p>

<h3>Mitzvah Tanks</h3>
<p>The response to assimilation took the form of the famous "mitzvah tanks" — mobile stations that turned city streets into a battlefield for every Jewish soul. The Rebbe taught: do not be embarrassed by mockers — light menorahs at city halls, affix mezuzot in offices, offer passersby the chance to put on tefillin right in the middle of Manhattan. The goal was clear: G-dliness should feel natural, become "made in America," penetrating even the headlines of secular newspapers. The Rebbe turned every Jew into an emissary, every home into a small Temple, every street into territory of the Divine Presence. What seemed like madness in the 1950s became the norm by the end of the twentieth century: today, public menorah lighting is a worldwide event, and the word "Chabad" is known in the most remote corners of the planet.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'pesach-jump-wall',
    slug: 'pryzhok-cherez-stenu-pochemu-normalno-eto-tupik',
    title: {
      ru: 'Прыжок через стену: Почему «нормально» — это тупик',
      en: 'Jumping Over the Wall: Why "Normal" Is a Dead End',
      he: 'קפיצה מעל החומה: למה "רגיל" זה מבוי סתום',
      uk: 'Стрибок через стіну: Чому «нормально» — це глухий кут',
    },
    subtitle: {
      ru: 'Лехатхила Арибер и смысл слова Песах — прорыв через границы',
      en: 'Lechatchila Ariber and the meaning of the word Pesach — breaking through boundaries',
      he: 'לכתחילה אריבער ומשמעות המילה פסח — פריצת גבולות',
      uk: 'Лехатхіла Арібер і сенс слова Песах — прорив через кордони',
    },
    content: {
      ru: `<h3>Девиз Маараша</h3>
<p>«Лехатхила Арибер» — знаменитый девиз Ребе Маараша (четвёртого Любавичского Ребе): когда перед тобой препятствие, не пытайся его обойти, не ищи компромиссов — иди прямо через него, сверху. Само слово «Песах» означает прыжок, перескок — прорыв за пределы всех границ природы и логики. Выход из Египта не был постепенной эволюцией: народ буквально «выпрыгнул» из самого глубокого рабства к полной свободе за одну ночь. Это — модель жизни для каждого еврея: не соглашаться на «нормально», не довольствоваться «достаточно хорошо». Жить по модели «Уфарацта» — прорываться вовне — означает превратить изучение Торы в страсть, наполняющую всю жизнь, а не в «хобби на шаббат». Ребе учил, что каждый еврей способен на сверхъестественные достижения, если откажется от ограничивающих убеждений о том, что «реально», а что «нет».</p>

<h3>Выше рамок разума</h3>
<p>В нашем поколении недостаточно быть «хорошим евреем» — необходимо действовать выше рамок разума. Ребе требовал постоянного роста: то, что было достижением час назад, теперь уже недостаточно. Стоять на месте — значит откатываться назад. Когда ты осознаёшь, что помощь приходит «ниоткуда» — свыше природы, — ты обретаешь силы для невозможного. Б-г не просит нас быть «разумными» — Он просит прыгать. История Исхода доказывает: Нахшон бен Аминадав вошёл в море по шею, прежде чем воды расступились. Действие, превосходящее логику, вызывает ответ, превосходящий природу. Именно этот принцип лежит в основе всей деятельности Хабада: открывать Дом Хабада в городе, где живёт пять евреев, посылать молодую семью шлихим на край света — это безумие с точки зрения «нормальности» и единственная стратегия с точки зрения Торы.</p>`,

      en: `<h3>The Motto of the Maharash</h3>
<p>"Lechatchila Ariber" — the famous motto of the Rebbe Maharash (the fourth Lubavitcher Rebbe): when you face an obstacle, don't try to go around it, don't seek compromises — go straight over it, from above. The very word "Pesach" means a jump, a leap — a breakthrough beyond all boundaries of nature and logic. The Exodus from Egypt was not a gradual evolution: the nation literally "jumped" from the deepest slavery to complete freedom in a single night. This is the model for every Jew's life: refuse to settle for "normal," don't be content with "good enough." Living in the "Ufaratzta" model — breaking outward — means making Torah study a passion that fills all of life, not a "Shabbat hobby." The Rebbe taught that every Jew is capable of supernatural achievements if they reject the limiting beliefs about what is "realistic" and what is "not."</p>

<h3>Beyond the Framework of Reason</h3>
<p>In our generation it is not enough to be a "good Jew" — one must act beyond the framework of reason. The Rebbe demanded constant growth: what was an achievement an hour ago is now insufficient. To stand still is to slide backward. When you realize that help comes "from nowhere" — from above nature — you gain strength for the impossible. G-d does not ask us to be "reasonable" — He asks us to jump. The story of the Exodus proves it: Nachshon ben Aminadav walked into the sea up to his neck before the waters parted. Action that exceeds logic evokes a response that exceeds nature. This very principle underlies all of Chabad's activities: opening a Chabad House in a city where five Jews live, sending a young shliach family to the ends of the earth — this is madness from the standpoint of "normality" and the only strategy from the standpoint of Torah.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },

  {
    id: 'pesach-seudat-mashiach',
    slug: 'uzhin-kotoryy-otmenyayet-izgnaniye-strategiya-posledney-trapezy',
    title: {
      ru: 'Ужин, который отменяет изгнание: Стратегия последней трапезы',
      en: 'The Dinner That Cancels Exile: Strategy of the Last Meal',
      he: 'הארוחה שמבטלת את הגלות: אסטרטגיית הסעודה האחרונה',
      uk: 'Вечеря, що скасовує вигнання: Стратегія останньої трапези',
    },
    subtitle: {
      ru: 'Сеудат Машиах — будущее Избавление становится физической реальностью',
      en: 'Seudat Mashiach — the future Redemption becomes physical reality',
      he: 'סעודת משיח — הגאולה העתידה הופכת למציאות פיזית',
      uk: 'Сеудат Машіах — майбутнє Визволення стає фізичною реальністю',
    },
    content: {
      ru: `<h3>Трапеза Машиаха</h3>
<p>Обычай «Сеудат Машиах» — «Трапезы Машиаха» — был установлен Баал Шем Товом, основателем хасидизма. Это уникальный момент в конце Песаха, когда будущее Избавление становится физической реальностью, ощутимой здесь и сейчас. Изучение Торы может оставаться теорией — интеллектуальным упражнением, не затрагивающим глубины существа. Но еда и питьё буквально входят в кровь и плоть, изменяя нас изнутри. Через мацу и четыре бокала вина мы впитываем свет Машиаха — не как метафору, а как духовную субстанцию, преобразующую наше физическое тело. Баал Шем Тов понимал, что Б-жественный свет последнего дня Песаха настолько интенсивен, что способен пронизать даже материю. Именно поэтому он выбрал форму трапезы — самого «земного» из всех действий — чтобы показать: святость должна проникнуть в каждый аспект нашего существования, включая само тело. Четыре бокала вина соответствуют четырём уровням Избавления, и тот, кто пьёт их с правильным намерением, буквально притягивает Машиаха в этот мир.</p>

<h3>Стратегия победы</h3>
<p>Ребе Менахем-Мендл Шнеерсон сделал этот обычай — ранее известный лишь узкому кругу хасидов — доступным каждому еврею. Он превратил Сеудат Машиах из камерного события в грандиозное празднование, собирающее тысячи людей. Это не просто воспоминание о прошлых чудесах и не пассивное ожидание будущих — это стратегия победы над изгнанием, влияющая на все наши поступки в течение года. Ребе объяснял: мы ведём войну не ради «трофеев» — не ради почёта, не ради комфорта, не ради личного духовного удовольствия. Наша единственная цель — полное и окончательное Избавление, и всё, что меньше этого, — бессмысленно. Сеудат Машиах даёт нам вкус этой победы заранее, наполняя сердце абсолютной уверенностью: Б-г завершит то, что начал при Исходе из Египта. Каждый глоток вина, каждый кусок мацы за этой трапезой — это акт веры, разрушающий стены изгнания и приближающий мир к его окончательному исправлению.</p>`,

      en: `<h3>The Feast of Mashiach</h3>
<p>The custom of "Seudat Mashiach" — the "Feast of Mashiach" — was established by the Baal Shem Tov, the founder of Chassidism. It is a unique moment at the end of Pesach when the future Redemption becomes a physical reality, tangible here and now. Torah study can remain theory — an intellectual exercise that does not touch the depths of one's being. But eating and drinking literally enter the blood and flesh, changing us from within. Through matza and four cups of wine, we absorb the light of Mashiach — not as a metaphor but as a spiritual substance that transforms our physical body. The Baal Shem Tov understood that the G-dly light of the last day of Pesach is so intense that it can permeate even matter itself. This is precisely why he chose the form of a meal — the most "earthly" of all activities — to demonstrate that holiness must penetrate every aspect of our existence, including the body itself. The four cups of wine correspond to four levels of Redemption, and one who drinks them with proper intention literally draws Mashiach into this world.</p>

<h3>Strategy of Victory</h3>
<p>The Rebbe, Rabbi Menachem Mendel Schneerson, made this custom — previously known only to a narrow circle of Chassidim — accessible to every Jew. He transformed Seudat Mashiach from an intimate gathering into a grand celebration attended by thousands. This is not merely a remembrance of past miracles nor passive anticipation of future ones — it is a strategy of victory over exile that influences all our deeds throughout the year. The Rebbe explained: we wage war not for "trophies" — not for honor, not for comfort, not for personal spiritual pleasure. Our sole objective is the complete and final Redemption, and anything less is meaningless. Seudat Mashiach gives us a foretaste of that victory, filling the heart with absolute certainty: G-d will complete what He began with the Exodus from Egypt. Every sip of wine, every piece of matza at this meal is an act of faith that shatters the walls of exile and brings the world closer to its ultimate rectification.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },
  {
    id: 'shavuot-dateline',
    slug: 'shavuot-i-liniya-peremeny-dat-paradoksy-tselnosti',
    hebrewDate: { month: 'Sivan', day: 6 },
    title: {
      ru: 'Шавуот и линия перемены дат: Парадоксы «цельности»',
      en: 'Shavuot and the International Date Line: Paradoxes of "Completeness"',
      he: 'שבועות וקו התאריך הבינלאומי: פרדוקסים של "שלמות"',
      uk: 'Шавуот і лінія зміни дат: Парадокси «цілісності»',
    },
    subtitle: {
      ru: 'Когда праздновать Шавуот, если ты «пропустил» день в отсчёте Омера?',
      en: 'When to celebrate Shavuot if you "missed" a day in the Omer count?',
      he: 'מתי לחגוג שבועות אם "פספסת" יום בספירת העומר?',
      uk: 'Коли святкувати Шавуот, якщо ти «пропустив» день у відліку Омера?',
    },
    content: {
      ru: `<p>Представьте, что вы вылетаете из Лос-Анджелеса в Сидней в понедельник вечером, а приземляетесь уже в среду утром. Где делся вторник? Эта географическая дилемма порождает уникальный алахический вопрос: когда праздновать Шавуот, если вы «пропустили» один день в отсчёте Омера?</p>

<h3>Уникальность Шавуот</h3>
<p>Праздник Шавуот уникален тем, что у него нет фиксированной даты в Торе — он наступает на 50-й день после начала отсчёта Омера (16 Ниссана). Он зависит от завершения семи полных недель — «тмимот» (цельности). Ребе предложил революционный и, по его словам, «простой и очевидный» подход к этой проблеме.</p>

<h3>Решение Ребе</h3>
<p>Если человек пересёк линию перемены даты с востока на запад (например, из США в Австралию) и потерял день, его личный 50-й день наступит позже, чем у местных жителей. Ребе объяснил, что Шавуот определяется тем фактом, что человек физически прожил 49 дней, независимо от того, какое число на календаре у окружающих. В такой ситуации путешественник может праздновать Шавуот на день позже остальных (например, 7 и 8 Сивана вместо 6 и 7).</p>

<h3>Тора в каждой точке мира</h3>
<p>Этот случай иллюстрирует важный принцип: Тора и заповеди применимы к каждому еврею в любой точке земного шара, даже в самых «низких» местах нижнего полушария. Ребе настаивал, что мы должны привнести Б-жественность в современный мир, используя даже такие сложности, как международная линия перемены дат, чтобы доказать вечность и точность закона Торы. Для Б-га нет ограничений пространства, и наша задача — сделать это пространство «обиталищем» для Него.</p>`,

      en: `<p>Imagine flying from Los Angeles to Sydney on Monday evening and landing on Wednesday morning. Where did Tuesday go? This geographical dilemma creates a unique halachic question: when to celebrate Shavuot if you "missed" a day in the Omer count?</p>

<h3>The Uniqueness of Shavuot</h3>
<p>Shavuot is unique in that it has no fixed date in the Torah — it arrives on the 50th day after the Omer count begins (16 Nissan). It depends on completing seven full weeks — "temimot" (completeness). The Rebbe proposed a revolutionary and, in his words, "simple and obvious" approach to this problem.</p>

<h3>The Rebbe's Solution</h3>
<p>If a person crosses the international date line from east to west (for example, from the USA to Australia) and loses a day, their personal 50th day will come later than for local residents. The Rebbe explained that Shavuot is determined by the fact that a person has physically lived through 49 days, regardless of what date the calendar shows for those around them. In this situation, the traveler may celebrate Shavuot one day later than everyone else (for example, 7 and 8 Sivan instead of 6 and 7).</p>

<h3>Torah at Every Point on Earth</h3>
<p>This case illustrates an important principle: Torah and mitzvot apply to every Jew at any point on the globe, even in the "lowest" places of the lower hemisphere. The Rebbe insisted that we must bring G-dliness into the modern world, using even such complexities as the international date line to prove the eternity and precision of Torah law. For G-d there are no spatial limitations, and our task is to make this space a "dwelling" for Him.</p>`,
    },
    tag: { ru: 'Календарь', en: 'Calendar', he: 'לוח שנה', uk: 'Календар' },
    createdAt: '2026-03-29',
  },
  {
    id: 'shidduch-1',
    slug: 'pochemu-lyubov-s-pervogo-vzglyada-mif',
    image: '/images/articles/shidduch/love-at-first-sight-myth.png',
    title: {
      ru: `Почему «любовь с первого взгляда» — это миф? Секрет крепкого брака, о котором не говорят в кино`,
      en: `Почему «любовь с первого взгляда» — это миф? Секрет крепкого брака, о котором не говорят в кино`,
      he: `Почему «любовь с первого взгляда» — это миф? Секрет крепкого брака, о котором не говорят в кино`,
      uk: `Почему «любовь с первого взгляда» — это миф? Секрет крепкого брака, о котором не говорят в кино`,
    },
    subtitle: {
      ru: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. `,
      en: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. `,
      he: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. `,
      uk: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. `,
    },
    content: {
      ru: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. Мы привыкли думать, что любовь — это топливо для создания семьи. Но древняя мудрость утверждает обратное: любовь — это результат совместно прожитых лет и бесконечного процесса отдачи.

«Любовь к рыбе» или почему чувства угасают

Когда юноша говорит: «Я обожаю рыбу!», мудрец отвечает ему: «Нет, ты любишь себя. Если бы ты любил рыбу, ты бы заботился о ней, а не жарил её на сковороде».

В отношениях часто происходит то же самое. Мы называем любовью то, что на самом деле является самолюбием. Нам нравится, как партнер на нас смотрит, как он нас смешит или как он удобен в быту. Но как только «вкус» приедается, мы начинаем искать «новое блюдо».

Формула Ицхака и Ривки

В священных текстах (Берешит 24:67) история Ицхака и Ривки описана в строгой последовательности:

Он взял её в жены.

Он вложил силы в их союз.

И только потом — полюбил её.

Это переворачивает светское представление о браке с ног на голову. Любовь не падает с неба. Это плод, который вырастает на дереве, которое вы поливаете своими действиями, вниманием и жертвенностью.

Как сделать любовь вечной?

Секрет прост, но труден в исполнении:

Отдача рождает привязанность. Психология устроена так: мы любим не тех, кто дает нам, а тех, кому даем мы сами.

Инвестиции в партнера. Чем больше усилий, времени и эмоций вы вкладываете в супруга, тем больше «вас самих» становится в этом человеке. Вы начинаете любить его как часть самого себя.

Цикл роста. Моя любовь растет от моих действий -> я хочу давать еще больше -> чувства становятся глубже. В таком сценарии через 20 лет брака чувства будут в десятки раз сильнее, чем в первый год.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/pochemu-lyubov-s-pervogo-vzglyada-mif)*`,
      en: `Вы когда-нибудь задумывались, почему современные браки так хрупки, несмотря на то что начинаются с «безумной любви»? Ответ кроется в подмене понятий. Мы привыкли думать, что любовь — это топливо для создания семьи. Но древняя мудрость утверждает обратное: любовь — это результат совместно прожитых лет и бесконечного процесса отдачи.

«Любовь к рыбе» или почему чувства угасают

Когда юноша говорит: «Я обожаю рыбу!», мудрец отвечает ему: «Нет, ты любишь себя. Если бы ты любил рыбу, ты бы заботился о ней, а не жарил её на сковороде».

В отношениях часто происходит то же самое. Мы называем любовью то, что на самом деле является самолюбием. Нам нравится, как партнер на нас смотрит, как он нас смешит или как он удобен в быту. Но как только «вкус» приедается, мы начинаем искать «новое блюдо».

Формула Ицхака и Ривки

В священных текстах (Берешит 24:67) история Ицхака и Ривки описана в строгой последовательности:

Он взял её в жены.

Он вложил силы в их союз.

И только потом — полюбил её.

Это переворачивает светское представление о браке с ног на голову. Любовь не падает с неба. Это плод, который вырастает на дереве, которое вы поливаете своими действиями, вниманием и жертвенностью.

Как сделать любовь вечной?

Секрет прост, но труден в исполнении:

Отдача рождает привязанность. Психология устроена так: мы любим не тех, кто дает нам, а тех, кому даем мы сами.

Инвестиции в партнера. Чем больше усилий, времени и эмоций вы вкладываете в супруга, тем больше «вас самих» становится в этом человеке. Вы начинаете любить его как часть самого себя.

Цикл роста. Моя любовь растет от моих действий -> я хочу давать еще больше -> чувства становятся глубже. В таком сценарии через 20 лет брака чувства будут в десятки раз сильнее, чем в первый год.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/pochemu-lyubov-s-pervogo-vzglyada-mif)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-2',
    slug: 'krasnye-flagi-vozrastnoy-raznitsy',
    image: '/images/articles/shidduch/red-flags-age-gap.png',
    title: {
      ru: `Красные флаги и подводные камни возрастной разницы`,
      en: `Красные флаги и подводные камни возрастной разницы`,
      he: `Красные флаги и подводные камни возрастной разницы`,
      uk: `Красные флаги и подводные камни возрастной разницы`,
    },
    subtitle: {
      ru: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.`,
      en: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.`,
      he: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.`,
      uk: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.`,
    },
    content: {
      ru: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.

Иногда разница в возрасте — это лишь цифра, но иногда — симптом глубоких психологических проблем. Чтобы шидух не стал ошибкой, нужно уметь распознавать «красные флаги» еще на этапе первых свиданий или обсуждения с шадханом.

1. Синдром «Учителя и Ученика» (Главный подводный камень)

Если один партнер постоянно поучает другого, ссылаясь на «жизненный опыт» — это не семья, это лекторий.

Красный флаг: Фразы типа «Ты еще молода, не понимаешь», «Я в твои годы уже...», «Слушай, что умные люди говорят». В здоровом шидухе есть уважение к личности, независимо от возраста.

2. Мотив «Трофея» или «Спасателя»

Для мужчин: Если мужчина 45+ категорически отказывается рассматривать женщин старше 25, стоит спросить: почему? Часто это страх перед зрелой личностью, способной на равный диалог, или желание видеть рядом «красивый аксессуар».

Для женщин: Если девушка ищет только «сильно старше», не прячется ли за этим желание переложить всю ответственность за свою жизнь на «папу»? В еврейском доме ответственность — это общая ноша.

3. Социальная изоляция

Подводный камень, который всплывает позже. Старшему партнеру может быть скучно с друзьями младшего, и наоборот.

Красный флаг: Если ваш партнер пытается ограничить ваше общение с ровесниками, аргументируя это тем, что они «глупые» или «недозрелые».

4. Разница в «религиозном возрасте»

Бывает, что люди одного возраста, но один в иудаизме 20 лет, а другой — 2 года. Это тоже «возрастная разница».

Красный флаг: Религиозный прессинг. Если старший (по опыту) партнер заставляет младшего резко менять образ жизни, не давая ему пройти свой путь роста — это приведет к взрыву или выгоранию.

5. Мнение семьи и «синдром чужого мнения»

Еврейская община тесна. Большая разница в возрасте всегда вызывает пересуды.

Подводный камень: Готовы ли вы оба защищать свой союз перед родителями и обществом? Если один из вас стесняется партнера или его возраста на людях — этот шидух обречен на трещины.

Золотое правило: Если на свидании вы чувствуете, что вам нужно «подтягиваться» до уровня партнера или, наоборот, «опускаться», чтобы ему было понятно — это не ваш человек. В правильном шидухе вы чувствуете себя в своей тарелке.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/krasnye-flagi-vozrastnoy-raznitsy)*`,
      en: `Фокус: Психологическая безопасность, скрытые мотивы и предупреждающие знаки.

Иногда разница в возрасте — это лишь цифра, но иногда — симптом глубоких психологических проблем. Чтобы шидух не стал ошибкой, нужно уметь распознавать «красные флаги» еще на этапе первых свиданий или обсуждения с шадханом.

1. Синдром «Учителя и Ученика» (Главный подводный камень)

Если один партнер постоянно поучает другого, ссылаясь на «жизненный опыт» — это не семья, это лекторий.

Красный флаг: Фразы типа «Ты еще молода, не понимаешь», «Я в твои годы уже...», «Слушай, что умные люди говорят». В здоровом шидухе есть уважение к личности, независимо от возраста.

2. Мотив «Трофея» или «Спасателя»

Для мужчин: Если мужчина 45+ категорически отказывается рассматривать женщин старше 25, стоит спросить: почему? Часто это страх перед зрелой личностью, способной на равный диалог, или желание видеть рядом «красивый аксессуар».

Для женщин: Если девушка ищет только «сильно старше», не прячется ли за этим желание переложить всю ответственность за свою жизнь на «папу»? В еврейском доме ответственность — это общая ноша.

3. Социальная изоляция

Подводный камень, который всплывает позже. Старшему партнеру может быть скучно с друзьями младшего, и наоборот.

Красный флаг: Если ваш партнер пытается ограничить ваше общение с ровесниками, аргументируя это тем, что они «глупые» или «недозрелые».

4. Разница в «религиозном возрасте»

Бывает, что люди одного возраста, но один в иудаизме 20 лет, а другой — 2 года. Это тоже «возрастная разница».

Красный флаг: Религиозный прессинг. Если старший (по опыту) партнер заставляет младшего резко менять образ жизни, не давая ему пройти свой путь роста — это приведет к взрыву или выгоранию.

5. Мнение семьи и «синдром чужого мнения»

Еврейская община тесна. Большая разница в возрасте всегда вызывает пересуды.

Подводный камень: Готовы ли вы оба защищать свой союз перед родителями и обществом? Если один из вас стесняется партнера или его возраста на людях — этот шидух обречен на трещины.

Золотое правило: Если на свидании вы чувствуете, что вам нужно «подтягиваться» до уровня партнера или, наоборот, «опускаться», чтобы ему было понятно — это не ваш человек. В правильном шидухе вы чувствуете себя в своей тарелке.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/krasnye-flagi-vozrastnoy-raznitsy)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-3',
    slug: 'raznitsa-v-vozraste-v-shiduhe',
    image: '/images/articles/shidduch/age-difference-guide.png',
    title: {
      ru: `Разница в возрасте в шидухе: Инструкция по применению`,
      en: `Разница в возрасте в шидухе: Инструкция по применению`,
      he: `Разница в возрасте в шидухе: Инструкция по применению`,
      uk: `Разница в возрасте в шидухе: Инструкция по применению`,
    },
    subtitle: {
      ru: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из пар`,
      en: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из пар`,
      he: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из пар`,
      uk: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из пар`,
    },
    content: {
      ru: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из параметров, но он сильно влияет на динамику отношений. Большая разница (от 7-10 лет и выше) требует от обоих партнеров осознанности. На что именно нужно смотреть, кроме цифр в анкете?

1. Жизненные циклы и цели (Life Stages)

Это фундамент. Представьте: парню 22 года, девушке 28. Или мужчине 45, а девушке 30.

Вопрос деторождения: Это самый чувствительный момент. Готов ли старший партнер к энергии, которую требуют маленькие дети? Совпадают ли ваши взгляды на количество детей и время их появления?

Карьерный этап: Один может только начинать путь (учеба, первая работа), а другой — уже крепко стоять на ногах и хотеть покоя. Готов ли «состоявшийся» партнер ждать и поддерживать того, кто еще в поиске себя?

2. Религиозный и интеллектуальный багаж

В шидухе важно, чтобы пара «разговаривала на одном языке».

Уровень Торы: Если муж значительно старше, ожидается, что он будет духовным лидером в доме. Но если при этом он «новичок» в иудаизме, а молодая жена выросла в семье раввинов, может возникнуть когнитивный диссонанс.

Общие темы: О чем вы будете говорить через 10 лет, когда химия первых встреч утихнет? Разница в возрасте часто означает разные культурные пласты (книги, ценности эпохи, социальные привычки).

3. Бытовой и энергетический темп

Здоровье и активность: Как вы планируете проводить Шаббаты и праздники? Если один хочет долгих прогулок и гостей, а другой быстро устает — это повод для обсуждения «на берегу».

Финансовые ожидания: Старший партнер часто имеет больше ресурсов. Важно понять: это партнерство или полная зависимость?

Практический чек-лист перед встречей:

[ ] Готов ли я принять физиологические изменения партнера, которые наступят раньше, чем у меня?

[ ] Не ищу ли я в старшем партнере замену родителю?

[ ] Не ищу ли я в младшем партнере способ «омолодиться»?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/raznitsa-v-vozraste-v-shiduhe)*`,
      en: `В еврейской традиции построение семьи — это не просто романтический союз, а создание «Мишкан» (святилища). Возраст в этом контексте — лишь один из параметров, но он сильно влияет на динамику отношений. Большая разница (от 7-10 лет и выше) требует от обоих партнеров осознанности. На что именно нужно смотреть, кроме цифр в анкете?

1. Жизненные циклы и цели (Life Stages)

Это фундамент. Представьте: парню 22 года, девушке 28. Или мужчине 45, а девушке 30.

Вопрос деторождения: Это самый чувствительный момент. Готов ли старший партнер к энергии, которую требуют маленькие дети? Совпадают ли ваши взгляды на количество детей и время их появления?

Карьерный этап: Один может только начинать путь (учеба, первая работа), а другой — уже крепко стоять на ногах и хотеть покоя. Готов ли «состоявшийся» партнер ждать и поддерживать того, кто еще в поиске себя?

2. Религиозный и интеллектуальный багаж

В шидухе важно, чтобы пара «разговаривала на одном языке».

Уровень Торы: Если муж значительно старше, ожидается, что он будет духовным лидером в доме. Но если при этом он «новичок» в иудаизме, а молодая жена выросла в семье раввинов, может возникнуть когнитивный диссонанс.

Общие темы: О чем вы будете говорить через 10 лет, когда химия первых встреч утихнет? Разница в возрасте часто означает разные культурные пласты (книги, ценности эпохи, социальные привычки).

3. Бытовой и энергетический темп

Здоровье и активность: Как вы планируете проводить Шаббаты и праздники? Если один хочет долгих прогулок и гостей, а другой быстро устает — это повод для обсуждения «на берегу».

Финансовые ожидания: Старший партнер часто имеет больше ресурсов. Важно понять: это партнерство или полная зависимость?

Практический чек-лист перед встречей:

[ ] Готов ли я принять физиологические изменения партнера, которые наступят раньше, чем у меня?

[ ] Не ищу ли я в старшем партнере замену родителю?

[ ] Не ищу ли я в младшем партнере способ «омолодиться»?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/raznitsa-v-vozraste-v-shiduhe)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-4',
    slug: 'lichnye-granitsy-v-shiduhe',
    image: '/images/articles/shidduch/personal-boundaries-shidduch.png',
    title: {
      ru: `Личные границы в шидухе: О чем можно и нельзя спрашивать на первых трех встречах`,
      en: `Личные границы в шидухе: О чем можно и нельзя спрашивать на первых трех встречах`,
      he: `Личные границы в шидухе: О чем можно и нельзя спрашивать на первых трех встречах`,
      uk: `Личные границы в шидухе: О чем можно и нельзя спрашивать на первых трех встречах`,
    },
    subtitle: {
      ru: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не прев`,
      en: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не прев`,
      he: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не прев`,
      uk: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не прев`,
    },
    content: {
      ru: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не превратить встречу в допрос с пристрастием и при этом не потратить время впустую?

В этом гайде мы разберем этикет на шидухах и составим список тем, которые помогут вам раскрыть человека, не нарушая его личного пространства.

Встреча №1: Прощупывание почвы и «безопасная зона»

Цель первой встречи — понять, есть ли у вас общий язык и минимальный уровень симпатии. На этом этапе личные границы должны быть максимально закрытыми.

О чем говорить на первом свидании:

Интересы и досуг: «Чем ты наполняешь свое свободное время?», «Что тебя вдохновляет?».

Общие взгляды на жизнь: «Какое место в твоей жизни занимает община/учеба?».

Семья (в общих чертах): «У тебя большая семья? Вы часто собираетесь вместе?».

⛔️ Табу для первой встречи:

Прошлые отношения: Вопрос «Почему ты до сих пор не женат/не замужем?» — это грубое нарушение границ.

Финансы: Спрашивать о зарплате или стоимости машины на первой встрече — признак дурного тона.

Глубокая психосоматика: Не стоит обсуждать свои детские травмы или диагнозы.

Встреча №2: Углубление контакта и ценности

Если вы встретились второй раз, значит, «искра» или интерес есть. Теперь можно переходить к вопросам, которые определяют вашу совместимость в будущем.

О чем говорить на втором свидании:

Жизненные цели: «Каким ты видишь свой дом через 5–10 лет?», «Важна ли для тебя карьера или ты в приоритете видишь быт?».

Религиозные стандарты: Это идеальное время, чтобы уточнить тонкие моменты кашрута, соблюдения Шаббата или воспитания детей.

Характер и привычки: «Как ты обычно справляешься со стрессом?», «Ты человек порядка или творческого хаоса?».

Совет эксперта: На второй встрече важно не просто слушать ответы, а наблюдать за реакцией. Если вопрос о планах на будущее вызывает у человека раздражение — это повод задуматься о его гибкости.

Встреча №3: «Трудные» вопросы и проверка на прочность

К третьей встрече обычно наступает момент «быть или не быть». Здесь этикет позволяет заходить на территорию более личных тем.

Темы для обсуждения:

Финансовые ожидания: Кто будет основным кормильцем? Как вы относитесь к кредитам?

Место проживания: Готов ли один из партнеров к переезду в другой город или страну?

Здоровье (важное): Если есть хронические моменты, которые могут повлиять на семейную жизнь, третья встреча — самое время для честности.

Как задавать вопросы, чтобы не обидеть?

Правильный этикет на шидухах строится на формулировках. Сравните:

Плохо: «Почему ты так долго тянул с шидухом?» (Звучит как обвинение).

Хорошо: «Мне интересно, какой опыт в процессе поиска был для тебя самым поучительным?» (Звучит как интерес к личности).

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/lichnye-granitsy-v-shiduhe)*`,
      en: `Первые свидания в системе шидухов — это всегда баланс между желанием поскорее узнать «всё самое важное» и необходимостью соблюдать этикет. Как не превратить встречу в допрос с пристрастием и при этом не потратить время впустую?

В этом гайде мы разберем этикет на шидухах и составим список тем, которые помогут вам раскрыть человека, не нарушая его личного пространства.

Встреча №1: Прощупывание почвы и «безопасная зона»

Цель первой встречи — понять, есть ли у вас общий язык и минимальный уровень симпатии. На этом этапе личные границы должны быть максимально закрытыми.

О чем говорить на первом свидании:

Интересы и досуг: «Чем ты наполняешь свое свободное время?», «Что тебя вдохновляет?».

Общие взгляды на жизнь: «Какое место в твоей жизни занимает община/учеба?».

Семья (в общих чертах): «У тебя большая семья? Вы часто собираетесь вместе?».

⛔️ Табу для первой встречи:

Прошлые отношения: Вопрос «Почему ты до сих пор не женат/не замужем?» — это грубое нарушение границ.

Финансы: Спрашивать о зарплате или стоимости машины на первой встрече — признак дурного тона.

Глубокая психосоматика: Не стоит обсуждать свои детские травмы или диагнозы.

Встреча №2: Углубление контакта и ценности

Если вы встретились второй раз, значит, «искра» или интерес есть. Теперь можно переходить к вопросам, которые определяют вашу совместимость в будущем.

О чем говорить на втором свидании:

Жизненные цели: «Каким ты видишь свой дом через 5–10 лет?», «Важна ли для тебя карьера или ты в приоритете видишь быт?».

Религиозные стандарты: Это идеальное время, чтобы уточнить тонкие моменты кашрута, соблюдения Шаббата или воспитания детей.

Характер и привычки: «Как ты обычно справляешься со стрессом?», «Ты человек порядка или творческого хаоса?».

Совет эксперта: На второй встрече важно не просто слушать ответы, а наблюдать за реакцией. Если вопрос о планах на будущее вызывает у человека раздражение — это повод задуматься о его гибкости.

Встреча №3: «Трудные» вопросы и проверка на прочность

К третьей встрече обычно наступает момент «быть или не быть». Здесь этикет позволяет заходить на территорию более личных тем.

Темы для обсуждения:

Финансовые ожидания: Кто будет основным кормильцем? Как вы относитесь к кредитам?

Место проживания: Готов ли один из партнеров к переезду в другой город или страну?

Здоровье (важное): Если есть хронические моменты, которые могут повлиять на семейную жизнь, третья встреча — самое время для честности.

Как задавать вопросы, чтобы не обидеть?

Правильный этикет на шидухах строится на формулировках. Сравните:

Плохо: «Почему ты так долго тянул с шидухом?» (Звучит как обвинение).

Хорошо: «Мне интересно, какой опыт в процессе поиска был для тебя самым поучительным?» (Звучит как интерес к личности).

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/lichnye-granitsy-v-shiduhe)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-5',
    slug: 'pervoe-svidanie-v-lobbi',
    image: '/images/articles/shidduch/first-date-lobby.png',
    title: {
      ru: `Первое свидание в лобби: Искусство осмысленного Small Talk`,
      en: `Первое свидание в лобби: Искусство осмысленного Small Talk`,
      he: `Первое свидание в лобби: Искусство осмысленного Small Talk`,
      uk: `Первое свидание в лобби: Искусство осмысленного Small Talk`,
    },
    subtitle: {
      ru: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быс`,
      en: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быс`,
      he: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быс`,
      uk: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быс`,
    },
    content: {
      ru: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быстрее, чем завязывается разговор) и гнетущее ощущение, что нужно за час «просканировать» человека на всю оставшуюся жизнь.

Но вот секрет: цель первой встречи — не принять решение о свадьбе, а захотеть встретиться второй раз. Для этого нам нужен Small Talk, который из вежливой болтовни превращается в глубокое исследование.

Почему «Как дела?» — это тупик

Когда мы спрашиваем «Как дела?», мы получаем стандартное «Хорошо, спасибо». Это закрытая дверь. Чтобы открыть человека, используйте вопросы-крючки, которые цепляют эмоции.

Скрипты, которые работают:

1. Вместо обсуждения погоды или пробок:

«Я сегодня по дороге сюда слушал(а) один подкаст/песню, и это натолкнуло меня на мысль... А что обычно задает тон твоему дню?»

Личная история: Одна моя знакомая, назовем её Сара, всегда начинала с вопроса о книгах. Однажды парень ответил: «Я не читаю, у меня нет времени». Вместо того чтобы поставить крест, она спросила: «А на что ты с радостью тратишь то время, которое другие тратят на книги?». Оказалось, он фанат марафонов и дисциплины. Это открыло разговор о ценностях лучше любого опросника.

2. Вопрос о «Микро-радостях»:

«Какая самая незначительная вещь за последнюю неделю заставила тебя искренне улыбнуться?»

Зачем это нужно: Это показывает, умеет ли человек замечать хорошее или он склонен к критике и негативу.

3 Золотых правила «Лобби-этикета»

Правило 70/30. Старайтесь 70% времени слушать и только 30% — говорить. Человек, который чувствует, что его слушают, подсознательно начинает вам доверять.

Никаких «бывших». Даже если ваш предыдущий шидух был катастрофой, первое свидание — это территория чистого листа. Упоминание прошлых кандидатов — это шум, который мешает разглядеть вас.

Искреннее любопытство vs. Допрос. Если вы задаете вопрос, дождитесь ответа и задайте уточняющий вопрос по теме.

Плохо: «Где ты учился? А где работаешь? А сколько братьев?»

Хорошо: «Ты работаешь в маркетинге? Ого, а что в этой профессии кажется тебе самым драйвовым?»

Если возникла «Повисла пауза» (Спасательный круг)

Паузы — это нормально. Это время «переварить» впечатление. Но если тишина становится неловкой, используйте метод «Контекста». Оглянитесь вокруг:

«Интересно, какая история у этого отеля? Люблю старые здания, в них чувствуется преемственность».

«Кстати, я заметил(а), что здесь очень спокойная музыка. Тебе в жизни ближе тишина или постоянное движение/шум города?»

История из практики: Один парень так разнервничался на первом свидании, что просто молча рассматривал меню 5 минут. Девушка не растерялась и сказала: «Если ты ищешь там ответ на главный вопрос жизни, Вселенной и всего такого, то подсказываю — там только прайс на кофе. Давай я помогу тебе выбрать?». Юмор разрядил обстановку, и они проговорили еще три часа. Сейчас у них трое детей.

Чек-лист: О чем мы узнали за этот час?

После встречи задайте себе не вопрос «Понравился ли я?», а:

Было ли мне комфортно молчать рядом с ним/ней?

Уважает ли этот человек мое мнение, даже если оно отличается?

Хочу ли я услышать еще одну историю из его/ее жизни?

Помните: Small Talk — это не экзамен. Это мостик. И иногда самая простая беседа о сорте чая может привести к самому важному «Да» в вашей жизни.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/pervoe-svidanie-v-lobbi)*`,
      en: `Первое свидание в мире шидухов часто напоминает собеседование в корпорацию с очень высокими ставками. Лобби отеля, две чашки чая (которые остывают быстрее, чем завязывается разговор) и гнетущее ощущение, что нужно за час «просканировать» человека на всю оставшуюся жизнь.

Но вот секрет: цель первой встречи — не принять решение о свадьбе, а захотеть встретиться второй раз. Для этого нам нужен Small Talk, который из вежливой болтовни превращается в глубокое исследование.

Почему «Как дела?» — это тупик

Когда мы спрашиваем «Как дела?», мы получаем стандартное «Хорошо, спасибо». Это закрытая дверь. Чтобы открыть человека, используйте вопросы-крючки, которые цепляют эмоции.

Скрипты, которые работают:

1. Вместо обсуждения погоды или пробок:

«Я сегодня по дороге сюда слушал(а) один подкаст/песню, и это натолкнуло меня на мысль... А что обычно задает тон твоему дню?»

Личная история: Одна моя знакомая, назовем её Сара, всегда начинала с вопроса о книгах. Однажды парень ответил: «Я не читаю, у меня нет времени». Вместо того чтобы поставить крест, она спросила: «А на что ты с радостью тратишь то время, которое другие тратят на книги?». Оказалось, он фанат марафонов и дисциплины. Это открыло разговор о ценностях лучше любого опросника.

2. Вопрос о «Микро-радостях»:

«Какая самая незначительная вещь за последнюю неделю заставила тебя искренне улыбнуться?»

Зачем это нужно: Это показывает, умеет ли человек замечать хорошее или он склонен к критике и негативу.

3 Золотых правила «Лобби-этикета»

Правило 70/30. Старайтесь 70% времени слушать и только 30% — говорить. Человек, который чувствует, что его слушают, подсознательно начинает вам доверять.

Никаких «бывших». Даже если ваш предыдущий шидух был катастрофой, первое свидание — это территория чистого листа. Упоминание прошлых кандидатов — это шум, который мешает разглядеть вас.

Искреннее любопытство vs. Допрос. Если вы задаете вопрос, дождитесь ответа и задайте уточняющий вопрос по теме.

Плохо: «Где ты учился? А где работаешь? А сколько братьев?»

Хорошо: «Ты работаешь в маркетинге? Ого, а что в этой профессии кажется тебе самым драйвовым?»

Если возникла «Повисла пауза» (Спасательный круг)

Паузы — это нормально. Это время «переварить» впечатление. Но если тишина становится неловкой, используйте метод «Контекста». Оглянитесь вокруг:

«Интересно, какая история у этого отеля? Люблю старые здания, в них чувствуется преемственность».

«Кстати, я заметил(а), что здесь очень спокойная музыка. Тебе в жизни ближе тишина или постоянное движение/шум города?»

История из практики: Один парень так разнервничался на первом свидании, что просто молча рассматривал меню 5 минут. Девушка не растерялась и сказала: «Если ты ищешь там ответ на главный вопрос жизни, Вселенной и всего такого, то подсказываю — там только прайс на кофе. Давай я помогу тебе выбрать?». Юмор разрядил обстановку, и они проговорили еще три часа. Сейчас у них трое детей.

Чек-лист: О чем мы узнали за этот час?

После встречи задайте себе не вопрос «Понравился ли я?», а:

Было ли мне комфортно молчать рядом с ним/ней?

Уважает ли этот человек мое мнение, даже если оно отличается?

Хочу ли я услышать еще одну историю из его/ее жизни?

Помните: Small Talk — это не экзамен. Это мостик. И иногда самая простая беседа о сорте чая может привести к самому важному «Да» в вашей жизни.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/pervoe-svidanie-v-lobbi)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-6',
    slug: 'brak-bolshe-chem-odin-plus-odin',
    image: '/images/articles/shidduch/marriage-more-than-sum.png',
    title: {
      ru: `Брак — это больше, чем 1+1=2`,
      en: `Брак — это больше, чем 1+1=2`,
      he: `Брак — это больше, чем 1+1=2`,
      uk: `Брак — это больше, чем 1+1=2`,
    },
    subtitle: {
      ru: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?`,
      en: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?`,
      he: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?`,
      uk: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?`,
    },
    content: {
      ru: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?

Согласно Торе, мужчина и женщина — это две части одного целого. По отдельности мы ограничены своей индивидуальностью. Но когда две половинки находят друг друга и приглашают в свой союз Творца, происходит магия:

Слабости превращаются в рост.

Одиночество сменяется единством.

Обычный быт становится священным путем.

Брак — это не ограничение свободы, это возможность наконец-то стать собой в полной мере.

Готовы встретить свою вторую половину? Заполните анкету сегодня.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/brak-bolshe-chem-odin-plus-odin)*`,
      en: `Вы когда-нибудь задумывались, почему в одиночестве мы часто чувствуем себя «несовершенными»?

Согласно Торе, мужчина и женщина — это две части одного целого. По отдельности мы ограничены своей индивидуальностью. Но когда две половинки находят друг друга и приглашают в свой союз Творца, происходит магия:

Слабости превращаются в рост.

Одиночество сменяется единством.

Обычный быт становится священным путем.

Брак — это не ограничение свободы, это возможность наконец-то стать собой в полной мере.

Готовы встретить свою вторую половину? Заполните анкету сегодня.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/brak-bolshe-chem-odin-plus-odin)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-7',
    slug: 'zdorovye-v-shiduhe',
    image: '/images/articles/shidduch/health-disclosure-shidduch.png',
    title: {
      ru: `Здоровье в шидухе: Когда и как сообщать о диагнозах?`,
      en: `Здоровье в шидухе: Когда и как сообщать о диагнозах?`,
      he: `Здоровье в шидухе: Когда и как сообщать о диагнозах?`,
      uk: `Здоровье в шидухе: Когда и как сообщать о диагнозах?`,
    },
    subtitle: {
      ru: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как`,
      en: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как`,
      he: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как`,
      uk: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как`,
    },
    content: {
      ru: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как не превратить свидание в медицинский консилиум?».

Главное правило: Шидух строится на доверии. Но доверие — это не значит выкладывать медкарту вместе с меню. Это значит — открыть правду в правильное время и правильными словами.

1. Когда наступает «правильное время»?

Раскрытие информации о здоровье — это не вопрос первой встречи.

1–2 встречи: Мы узнаем личность. Если вы сразу начнете с диагнозов, человек увидит «пациента», а не личность.

3–4 встречи: Когда возникла симпатия и вы понимаете, что у отношений есть потенциал. Это «золотое время» для честности.

До помолвки: Сокрытие серьезных фактов (генетика, репродуктивное здоровье, ментальные особенности), которые могут повлиять на семейную жизнь, в еврейском праве может рассматриваться как серьезное нарушение (Мэках Таут).

2. Градация «важности»: О чем нужно говорить обязательно?

Не всё является темой для обсуждения.

Нужно обсудить: Хронические заболевания, требующие постоянного лечения; вопросы фертильности; генетические аспекты; серьезные психологические диагнозы.

Можно оставить при себе: Аллергию на пыльцу, исправленное в детстве плоскостопие или тот факт, что вы раз в год пьете витамины для бодрости.

3. Скрипты: Как начать этот разговор?

Главное — подавать информацию спокойно, без драмы, но с полной ответственностью.

Вариант А (если заболевание под контролем):

«Мне очень ценно наше общение, и я хочу быть с тобой честным(ой). У меня есть особенность здоровья (напр. диабет), которая требует контроля, но она никак не мешает мне вести полноценную жизнь, работать и строить семью. Я говорю об этом сейчас, чтобы у тебя была вся картина».

Вариант Б (если это касается генетики или наследственности):

«Я считаю важным обсудить один момент. В моей семье есть генетическая особенность. Я уже консультировался(ась) с раввином/врачом, и есть четкие протоколы, как с этим работать в будущем. Хочу, чтобы мы обсудили это до того, как наши отношения станут совсем серьезными».

4. Реакция партнера: Как её воспринимать?

Если после вашего признания человек решил прекратить встречи — это не ваша вина и не ваш провал. * Это значит, что человек честно оценил свой ресурс.

Лучше узнать об этом на 4-й встрече, чем столкнуться с упреками через 5 лет брака.

Ваш «тот самый» человек — это тот, кто примет вашу реальность и захочет решать задачи вместе с вами.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/zdorovye-v-shiduhe)*`,
      en: `Вопрос здоровья в процессе поиска пары часто окутан страхом. «А вдруг меня сразу отсеют?», «Должен ли я рассказывать об этом на первой встрече?», «Как не превратить свидание в медицинский консилиум?».

Главное правило: Шидух строится на доверии. Но доверие — это не значит выкладывать медкарту вместе с меню. Это значит — открыть правду в правильное время и правильными словами.

1. Когда наступает «правильное время»?

Раскрытие информации о здоровье — это не вопрос первой встречи.

1–2 встречи: Мы узнаем личность. Если вы сразу начнете с диагнозов, человек увидит «пациента», а не личность.

3–4 встречи: Когда возникла симпатия и вы понимаете, что у отношений есть потенциал. Это «золотое время» для честности.

До помолвки: Сокрытие серьезных фактов (генетика, репродуктивное здоровье, ментальные особенности), которые могут повлиять на семейную жизнь, в еврейском праве может рассматриваться как серьезное нарушение (Мэках Таут).

2. Градация «важности»: О чем нужно говорить обязательно?

Не всё является темой для обсуждения.

Нужно обсудить: Хронические заболевания, требующие постоянного лечения; вопросы фертильности; генетические аспекты; серьезные психологические диагнозы.

Можно оставить при себе: Аллергию на пыльцу, исправленное в детстве плоскостопие или тот факт, что вы раз в год пьете витамины для бодрости.

3. Скрипты: Как начать этот разговор?

Главное — подавать информацию спокойно, без драмы, но с полной ответственностью.

Вариант А (если заболевание под контролем):

«Мне очень ценно наше общение, и я хочу быть с тобой честным(ой). У меня есть особенность здоровья (напр. диабет), которая требует контроля, но она никак не мешает мне вести полноценную жизнь, работать и строить семью. Я говорю об этом сейчас, чтобы у тебя была вся картина».

Вариант Б (если это касается генетики или наследственности):

«Я считаю важным обсудить один момент. В моей семье есть генетическая особенность. Я уже консультировался(ась) с раввином/врачом, и есть четкие протоколы, как с этим работать в будущем. Хочу, чтобы мы обсудили это до того, как наши отношения станут совсем серьезными».

4. Реакция партнера: Как её воспринимать?

Если после вашего признания человек решил прекратить встречи — это не ваша вина и не ваш провал. * Это значит, что человек честно оценил свой ресурс.

Лучше узнать об этом на 4-й встрече, чем столкнуться с упреками через 5 лет брака.

Ваш «тот самый» человек — это тот, кто примет вашу реальность и захочет решать задачи вместе с вами.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/zdorovye-v-shiduhe)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-8',
    slug: 'sindrom-vechnogo-poiska',
    image: '/images/articles/shidduch/eternal-search-syndrome.png',
    title: {
      ru: `Синдром вечного поиска: Почему я смотрю 50-ю анкету и все «не те»?`,
      en: `Синдром вечного поиска: Почему я смотрю 50-ю анкету и все «не те»?`,
      he: `Синдром вечного поиска: Почему я смотрю 50-ю анкету и все «не те»?`,
      uk: `Синдром вечного поиска: Почему я смотрю 50-ю анкету и все «не те»?`,
    },
    subtitle: {
      ru: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете `,
      en: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете `,
      he: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете `,
      uk: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете `,
    },
    content: {
      ru: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете его с мыслью: «Ну, неплохо, но не цепляет. Пришлите следующего».

Если в вашем списке просмотренных анкет уже накопилось небольшое поселение, а «того самого» человека всё нет — возможно, дело не в отсутствии кандидатов, а в ловушке выбора.

1. Парадокс выбора: Почему больше — значит хуже?

Психологи давно доказали: чем больше у человека вариантов, тем сложнее ему принять решение и тем меньше он доволен своим выбором.

В чем проблема: Когда у вас в очереди еще 10 анкет, вы подсознательно ищете в текущем кандидате не «плюсы», а повод для отказа, чтобы поскорее перейти к следующему «лотерейному билету».

Решение: Правило «одной анкеты». Не берите у шадхана пачку профилей. Возьмите один. Дайте себе 24 часа, чтобы подумать только об этом человеке, прежде чем запрашивать другого.

2. Поиск «идеала» vs Поиск «партнера»

Часто мы ищем не живого человека, а персонажа из нашего ТЗ.

«Хочу, чтобы был ученым, но с душой поэта, зарабатывал миллионы, но был дома в 18:00, и чтобы обязательно любил те же редкие сорта сыра, что и я».

Реальность: Семья — это не стыковка двух готовых деталей, это строительство дома. Ищите не того, кто «уже готов» под ваши требования, а того, с кем у вас совпадают черты фундамента (ценности, цели, отношение к людям). Стены и декор вы достроите вместе.

3. Синдром «А вдруг за углом лучше?» (FOMO)

Это страх упустить выгоду. Вы встречаетесь с приятным человеком, всё идет хорошо, но внутри зудит мысль: «А вдруг, если я соглашусь сейчас, я завтра упущу анкету своей мечты?».

Совет: Поймите, что «лучшее» — враг хорошего. Счастье в браке приносит не «самый идеальный человек на планете», а тот, кому вы решили посвятить свою верность и заботу.

4. Как выйти из режима «шопинга»? (Практические шаги)

Удалите фильтры «второго порядка». Рост на 2 см ниже желаемого или любовь к кошкам вместо собак не должны быть причиной отказа от анкеты. Оставьте в фильтрах только критичные вещи (религиозный уровень, желание иметь детей, общие жизненные цели).

Дайте шанс «второму взгляду». Если анкета не вызвала резкого отторжения — встретьтесь. На бумаге невозможно передать обаяние, тембр голоса и то, как человек на вас смотрит.

Спросите себя: «А кого ищу я?». Иногда мы бесконечно смотрим анкеты, потому что сами боимся близости. Проще сказать «он не тот», чем пойти в глубокие отношения и открыться.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/sindrom-vechnogo-poiska)*`,
      en: `Знакомая ситуация? Вы открываете очередной PDF-файл от шадхана, пробегаете глазами по пунктам «рост-возраст-образование» и через 10 секунд закрываете его с мыслью: «Ну, неплохо, но не цепляет. Пришлите следующего».

Если в вашем списке просмотренных анкет уже накопилось небольшое поселение, а «того самого» человека всё нет — возможно, дело не в отсутствии кандидатов, а в ловушке выбора.

1. Парадокс выбора: Почему больше — значит хуже?

Психологи давно доказали: чем больше у человека вариантов, тем сложнее ему принять решение и тем меньше он доволен своим выбором.

В чем проблема: Когда у вас в очереди еще 10 анкет, вы подсознательно ищете в текущем кандидате не «плюсы», а повод для отказа, чтобы поскорее перейти к следующему «лотерейному билету».

Решение: Правило «одной анкеты». Не берите у шадхана пачку профилей. Возьмите один. Дайте себе 24 часа, чтобы подумать только об этом человеке, прежде чем запрашивать другого.

2. Поиск «идеала» vs Поиск «партнера»

Часто мы ищем не живого человека, а персонажа из нашего ТЗ.

«Хочу, чтобы был ученым, но с душой поэта, зарабатывал миллионы, но был дома в 18:00, и чтобы обязательно любил те же редкие сорта сыра, что и я».

Реальность: Семья — это не стыковка двух готовых деталей, это строительство дома. Ищите не того, кто «уже готов» под ваши требования, а того, с кем у вас совпадают черты фундамента (ценности, цели, отношение к людям). Стены и декор вы достроите вместе.

3. Синдром «А вдруг за углом лучше?» (FOMO)

Это страх упустить выгоду. Вы встречаетесь с приятным человеком, всё идет хорошо, но внутри зудит мысль: «А вдруг, если я соглашусь сейчас, я завтра упущу анкету своей мечты?».

Совет: Поймите, что «лучшее» — враг хорошего. Счастье в браке приносит не «самый идеальный человек на планете», а тот, кому вы решили посвятить свою верность и заботу.

4. Как выйти из режима «шопинга»? (Практические шаги)

Удалите фильтры «второго порядка». Рост на 2 см ниже желаемого или любовь к кошкам вместо собак не должны быть причиной отказа от анкеты. Оставьте в фильтрах только критичные вещи (религиозный уровень, желание иметь детей, общие жизненные цели).

Дайте шанс «второму взгляду». Если анкета не вызвала резкого отторжения — встретьтесь. На бумаге невозможно передать обаяние, тембр голоса и то, как человек на вас смотрит.

Спросите себя: «А кого ищу я?». Иногда мы бесконечно смотрим анкеты, потому что сами боимся близости. Проще сказать «он не тот», чем пойти в глубокие отношения и открыться.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/sindrom-vechnogo-poiska)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-9',
    slug: 'gotovnost-k-braku',
    image: '/images/articles/shidduch/marriage-readiness.png',
    title: {
      ru: `Готовность к браку: как понять, что вы «созрели» для серьезных отношений?`,
      en: `Готовность к браку: как понять, что вы «созрели» для серьезных отношений?`,
      he: `Готовность к браку: как понять, что вы «созрели» для серьезных отношений?`,
      uk: `Готовность к браку: как понять, что вы «созрели» для серьезных отношений?`,
    },
    subtitle: {
      ru: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценн`,
      en: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценн`,
      he: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценн`,
      uk: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценн`,
    },
    content: {
      ru: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценностей. Часто мы задаемся вопросом: «А готов ли я?», когда на горизонте маячит серьезный кандидат или когда окружающие начинают настойчиво спрашивать: «Ну, когда свадьба?».

В отличие от карьеры или покупки жилья, у готовности к браку нет четкого «дедлайна». Однако есть психологические маркеры, которые сигнализируют о том, что вы перешли от поиска «идеальной картинки» к принятию реального человека.

1. Психологическая сепарация: вы цельная личность

Главная ошибка — искать в партнере «вторую половинку», которая заполнит ваши внутренние пустоты. Если вы ждете, что брак сделает вас счастливым, вы входите в отношения с дефицитом.

Вопросы для саморефлексии:

Могу ли я быть счастливым(ой) в одиночестве, не чувствуя, что моя жизнь «на паузе»?

Не пытаюсь ли я сбежать в брак от проблем на работе, одиночества или давления родителей?

Понимаю ли я свои личные границы и готов(а) ли я уважать границы другого человека?

2. Переход от «Я» к «Мы»

В браке решения перестают быть индивидуальными. Это не значит отказ от своего «Я», но это означает, что любое значимое событие — от покупки техники до выбора места отпуска — теперь учитывает интересы второго.

Вопросы для саморефлексии:

Готов(а) ли я идти на компромисс, даже если это противоречит моим привычкам?

Как я реагирую на критику? Могу ли я выслушать мнение партнера без агрессии и желания немедленно «защититься»?

Готов(а) ли я делить не только радость, но и бытовую рутину (уборку, счета, ответственность за бюджет)?

3. Совпадение ценностных ориентиров

Влюбленность — это гормоны, а брак — это стратегия. Вы можете быть идеальными любовниками, но если один хочет жить в тишине и копить, а второй — путешествовать и тратить, бытовые конфликты станут неизбежными.

О чем обязательно поговорить «на берегу»:

Финансы: Кто распоряжается деньгами? Каков наш подход к кредитам и накоплениям?

Семья и традиции: Как часто мы будем видеться с родителями? Какие традиции мы хотим перенести в наш дом?

Дети: Есть ли у нас общее видение воспитания и тайминга?

Чек-лист: 5 вопросов самому себе перед тем, как сказать «Да»

Если вы сомневаетесь, попробуйте честно ответить на эти вопросы в тишине:

«Принимаю ли я партнера со всеми его недостатками?» (Не «смогу ли я его изменить», а именно «принимаю ли я его таким, какой он есть прямо сейчас»).

«Как мы проходим через конфликты?» (Способны ли мы после ссоры идти на примирение, или мы месяцами дуемся друг на друга?).

«Безопасно ли мне быть собой рядом с ним/ней?» (Могу ли я показать свою слабость, усталость или плохое настроение?).

«Наши цели в жизни смотрят в одну сторону?» (Или мы как лебедь, рак и щука?).

«Доверяю ли я этому человеку как самому себе?» (Доверие — это фундамент, без него любая конструкция рухнет).

Важное напоминание

Идеальных людей не бывает. Готовность к браку — это не отсутствие страхов, а осознанное желание преодолевать их вместе. Если вы чувствуете, что партнер — тот самый человек, с которым вы хотите учиться строить счастье, учиться прощать и расти — это и есть лучшее доказательство готовности.

Не ждите идеального момента. Иногда готовность приходит именно в процессе совместного пути, через диалог, терпение и искреннее желание понять другого.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/gotovnost-k-braku)*`,
      en: `Брак — это не просто логическое продолжение романтического свидания или красивый праздник. Это объединение двух миров, двух историй и двух систем ценностей. Часто мы задаемся вопросом: «А готов ли я?», когда на горизонте маячит серьезный кандидат или когда окружающие начинают настойчиво спрашивать: «Ну, когда свадьба?».

В отличие от карьеры или покупки жилья, у готовности к браку нет четкого «дедлайна». Однако есть психологические маркеры, которые сигнализируют о том, что вы перешли от поиска «идеальной картинки» к принятию реального человека.

1. Психологическая сепарация: вы цельная личность

Главная ошибка — искать в партнере «вторую половинку», которая заполнит ваши внутренние пустоты. Если вы ждете, что брак сделает вас счастливым, вы входите в отношения с дефицитом.

Вопросы для саморефлексии:

Могу ли я быть счастливым(ой) в одиночестве, не чувствуя, что моя жизнь «на паузе»?

Не пытаюсь ли я сбежать в брак от проблем на работе, одиночества или давления родителей?

Понимаю ли я свои личные границы и готов(а) ли я уважать границы другого человека?

2. Переход от «Я» к «Мы»

В браке решения перестают быть индивидуальными. Это не значит отказ от своего «Я», но это означает, что любое значимое событие — от покупки техники до выбора места отпуска — теперь учитывает интересы второго.

Вопросы для саморефлексии:

Готов(а) ли я идти на компромисс, даже если это противоречит моим привычкам?

Как я реагирую на критику? Могу ли я выслушать мнение партнера без агрессии и желания немедленно «защититься»?

Готов(а) ли я делить не только радость, но и бытовую рутину (уборку, счета, ответственность за бюджет)?

3. Совпадение ценностных ориентиров

Влюбленность — это гормоны, а брак — это стратегия. Вы можете быть идеальными любовниками, но если один хочет жить в тишине и копить, а второй — путешествовать и тратить, бытовые конфликты станут неизбежными.

О чем обязательно поговорить «на берегу»:

Финансы: Кто распоряжается деньгами? Каков наш подход к кредитам и накоплениям?

Семья и традиции: Как часто мы будем видеться с родителями? Какие традиции мы хотим перенести в наш дом?

Дети: Есть ли у нас общее видение воспитания и тайминга?

Чек-лист: 5 вопросов самому себе перед тем, как сказать «Да»

Если вы сомневаетесь, попробуйте честно ответить на эти вопросы в тишине:

«Принимаю ли я партнера со всеми его недостатками?» (Не «смогу ли я его изменить», а именно «принимаю ли я его таким, какой он есть прямо сейчас»).

«Как мы проходим через конфликты?» (Способны ли мы после ссоры идти на примирение, или мы месяцами дуемся друг на друга?).

«Безопасно ли мне быть собой рядом с ним/ней?» (Могу ли я показать свою слабость, усталость или плохое настроение?).

«Наши цели в жизни смотрят в одну сторону?» (Или мы как лебедь, рак и щука?).

«Доверяю ли я этому человеку как самому себе?» (Доверие — это фундамент, без него любая конструкция рухнет).

Важное напоминание

Идеальных людей не бывает. Готовность к браку — это не отсутствие страхов, а осознанное желание преодолевать их вместе. Если вы чувствуете, что партнер — тот самый человек, с которым вы хотите учиться строить счастье, учиться прощать и расти — это и есть лучшее доказательство готовности.

Не ждите идеального момента. Иногда готовность приходит именно в процессе совместного пути, через диалог, терпение и искреннее желание понять другого.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/gotovnost-k-braku)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-10',
    slug: 'ten-proshlykh-otnosheniy',
    image: '/images/articles/shidduch/shadow-past-relationships.png',
    title: {
      ru: `Тень прошлых отношений: Как не превратить шидух в «свидание втроем»`,
      en: `Тень прошлых отношений: Как не превратить шидух в «свидание втроем»`,
      he: `Тень прошлых отношений: Как не превратить шидух в «свидание втроем»`,
      uk: `Тень прошлых отношений: Как не превратить шидух в «свидание втроем»`,
    },
    subtitle: {
      ru: `Вступление: Невидимый гость`,
      en: `Вступление: Невидимый гость`,
      he: `Вступление: Невидимый гость`,
      uk: `Вступление: Невидимый гость`,
    },
    content: {
      ru: `Вступление: Невидимый гость

Представь: ты на первой встрече. Собеседник приятен, кофе вкусный, атмосфера располагает. Но внутри тебя постоянно работает «счетчик». «А вот мой бывший жених шутил смешнее», «А та девушка, с которой я расстался полгода назад, смотрела на меня иначе». Поздравляем: на твоем свидании присутствует третий. Это «Тень». И пока она сидит за столом, ты не видишь реального человека перед собой — ты видишь лишь его сходство или отличие от кого-то из прошлого.

Почему мы это делаем?

Наш мозг ленив. Ему проще использовать старые лекала, чем создавать новые. Сравнение — это защитный механизм: мы пытаемся «предсказать» будущее, опираясь на старую боль или старый комфорт.

Ловушка №1: Поиск «Близнеца»

Это попытка найти человека, который будет «точно таким же, но без того одного недостатка».

В чем опасность: Ты ищешь не личность, а функцию. Новый человек никогда не станет копией старого, и это будет тебя вечно разочаровывать. Ты пропускаешь его собственные уникальные достоинства, потому что они не вписываются в старый шаблон.

Ловушка №2: Поиск «Анти-Тени»

«Мой бывший парень был слишком амбициозным и мало бывал дома, поэтому теперь я ищу только того, кто хочет спокойной жизни».

В чем опасность: Ты кидаешься в другую крайность. Выбирая «от противного», ты рискуешь встретить человека, с которым тебе будет просто скучно. Ты бежишь от боли, а не к любви.

Практикум: Как выгнать «Тень» со свидания

Признай присутствие. Если поймал себя на сравнении — не ругай себя. Скажи мысленно: «О, привет, старая память. Я тебя вижу, но сейчас я занят знакомством с новым человеком».

Метод «Чистого листа». Перед встречей дай себе установку: «Сегодня я исследователь. Я не знаю об этом человеке ничего, и я не буду накладывать на него свои ожидания».

Техника «Три факта». В середине встречи найди 3 качества в партнере, которых точно не было у твоих прошлых симпатий. Это приземляет тебя в реальность и заставляет сфокусироваться на настоящем.

Как понять, что ты готов к новому шидуху?

Ты готов, когда:

Воспоминания о прошлом не вызывают резкой боли или желания немедленно что-то доказать.

Ты идешь на свидание, потому что тебе интересен этот человек, а не потому что тебе одиноко или «пора».

Ты можешь рассказать о прошлом опыте (если спросят) спокойно, как об уроке, а не как о трагедии.

Главный секрет: Счастливый брак строится не на сравнении, а на принятии. Дай новому человеку шанс быть собой, а не улучшенной версией твоего прошлого.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/ten-proshlykh-otnosheniy)*`,
      en: `Вступление: Невидимый гость

Представь: ты на первой встрече. Собеседник приятен, кофе вкусный, атмосфера располагает. Но внутри тебя постоянно работает «счетчик». «А вот мой бывший жених шутил смешнее», «А та девушка, с которой я расстался полгода назад, смотрела на меня иначе». Поздравляем: на твоем свидании присутствует третий. Это «Тень». И пока она сидит за столом, ты не видишь реального человека перед собой — ты видишь лишь его сходство или отличие от кого-то из прошлого.

Почему мы это делаем?

Наш мозг ленив. Ему проще использовать старые лекала, чем создавать новые. Сравнение — это защитный механизм: мы пытаемся «предсказать» будущее, опираясь на старую боль или старый комфорт.

Ловушка №1: Поиск «Близнеца»

Это попытка найти человека, который будет «точно таким же, но без того одного недостатка».

В чем опасность: Ты ищешь не личность, а функцию. Новый человек никогда не станет копией старого, и это будет тебя вечно разочаровывать. Ты пропускаешь его собственные уникальные достоинства, потому что они не вписываются в старый шаблон.

Ловушка №2: Поиск «Анти-Тени»

«Мой бывший парень был слишком амбициозным и мало бывал дома, поэтому теперь я ищу только того, кто хочет спокойной жизни».

В чем опасность: Ты кидаешься в другую крайность. Выбирая «от противного», ты рискуешь встретить человека, с которым тебе будет просто скучно. Ты бежишь от боли, а не к любви.

Практикум: Как выгнать «Тень» со свидания

Признай присутствие. Если поймал себя на сравнении — не ругай себя. Скажи мысленно: «О, привет, старая память. Я тебя вижу, но сейчас я занят знакомством с новым человеком».

Метод «Чистого листа». Перед встречей дай себе установку: «Сегодня я исследователь. Я не знаю об этом человеке ничего, и я не буду накладывать на него свои ожидания».

Техника «Три факта». В середине встречи найди 3 качества в партнере, которых точно не было у твоих прошлых симпатий. Это приземляет тебя в реальность и заставляет сфокусироваться на настоящем.

Как понять, что ты готов к новому шидуху?

Ты готов, когда:

Воспоминания о прошлом не вызывают резкой боли или желания немедленно что-то доказать.

Ты идешь на свидание, потому что тебе интересен этот человек, а не потому что тебе одиноко или «пора».

Ты можешь рассказать о прошлом опыте (если спросят) спокойно, как об уроке, а не как о трагедии.

Главный секрет: Счастливый брак строится не на сравнении, а на принятии. Дай новому человеку шанс быть собой, а не улучшенной версией твоего прошлого.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/ten-proshlykh-otnosheniy)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-11',
    slug: '20-voprosov-test-sovmestimosti',
    image: '/images/articles/shidduch/compatibility-test-gift.png',
    title: {
      ru: `20 вопросов для Шидуха: тест на совместимость`,
      en: `20 вопросов для Шидуха: тест на совместимость`,
      he: `20 вопросов для Шидуха: тест на совместимость`,
      uk: `20 вопросов для Шидуха: тест на совместимость`,
    },
    subtitle: {
      ru: `Блок 1: Духовный фундамент и ценности`,
      en: `Блок 1: Духовный фундамент и ценности`,
      he: `Блок 1: Духовный фундамент и ценности`,
      uk: `Блок 1: Духовный фундамент и ценности`,
    },
    content: {
      ru: `Блок 1: Духовный фундамент и ценности

Традиции: Каким ты видишь наш субботний стол через 5–10 лет? Насколько для тебя критично строгое соблюдение кашрута или определенных заповедей?

Развитие: Что для тебя важнее: достичь стабильности и «спокойной гавани» или постоянно искать новые вызовы и учиться?

Отдача: Какое место в твоей жизни занимает помощь другим (цедака) или волонтерство?

Блок 2: Сценарии будущего (Семья и Роли)

Родительский пример: Что из отношений твоих родителей ты бы точно хотел(а) перенести в свою семью, а что — оставить в прошлом?

Лидерство: Кто в твоем представлении принимает окончательное решение в кризисных ситуациях?

Границы: Как ты относишься к советам родственников в делах молодой семьи? Где проходит грань между «помощью» и «вмешательством»?

Блок 3: Быт и Финансы (Зона риска №1)

Отношение к деньгам: Ты скорее «стратег», который копит на крупную цель, или «экурист», который предпочитает радовать себя здесь и сейчас?

Бюджет: Твое видение: один общий кошелек, раздельные счета или гибридный вариант?

Порядок: Что для тебя «грязная квартира»? Насколько важно, чтобы быт был идеально налажен, и кто за это отвечает?

Блок 4: Дети и воспитание

Приоритеты в обучении: В какую школу ты бы хотел(а) отдать детей — более религиозную или светскую с упором на науку?

Дисциплина: Ты сторонник строгого воспитания или считаешь, что ребенку нужно давать максимум свободы?

Блок 5: Эмоциональный интеллект и Конфликты

Реакция на стресс: Когда ты расстроен(а) или злишься, тебе нужно время, чтобы побыть в тишине, или важно выговориться немедленно?

Умение уступать: Можешь ли ты вспомнить случай, когда ты изменил(а) свое мнение ради другого человека? Что ты при этом чувствовал(а)?

Личное пространство: Сколько времени в неделю тебе жизненно необходимо проводить без партнера (с друзьями, за хобби, наедине с собой)?

Блок 6: Совместимость «стиля жизни»

Досуг: Идеальный выходной — это шумная компания друзей или вечер вдвоем под пледом?

Друзья: Насколько для тебя важно, чтобы твой партнер влился в твой круг общения?

Мечты: Если бы у нас была неограниченная сумма денег, чем бы мы занялись в первый месяц совместной жизни?

Форс-мажор: Что ты делаешь, если всё идет не по плану (отменили рейс, сломался кран, пропали билеты)?

Приоритеты: Работа допоздна ради достатка или скромный доход, но вечер дома в 18:00?

Критическое качество: Назови одно качество в человеке, с которым ты точно не сможешь мириться ни при каких обстоятельствах?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/20-voprosov-test-sovmestimosti)*`,
      en: `Блок 1: Духовный фундамент и ценности

Традиции: Каким ты видишь наш субботний стол через 5–10 лет? Насколько для тебя критично строгое соблюдение кашрута или определенных заповедей?

Развитие: Что для тебя важнее: достичь стабильности и «спокойной гавани» или постоянно искать новые вызовы и учиться?

Отдача: Какое место в твоей жизни занимает помощь другим (цедака) или волонтерство?

Блок 2: Сценарии будущего (Семья и Роли)

Родительский пример: Что из отношений твоих родителей ты бы точно хотел(а) перенести в свою семью, а что — оставить в прошлом?

Лидерство: Кто в твоем представлении принимает окончательное решение в кризисных ситуациях?

Границы: Как ты относишься к советам родственников в делах молодой семьи? Где проходит грань между «помощью» и «вмешательством»?

Блок 3: Быт и Финансы (Зона риска №1)

Отношение к деньгам: Ты скорее «стратег», который копит на крупную цель, или «экурист», который предпочитает радовать себя здесь и сейчас?

Бюджет: Твое видение: один общий кошелек, раздельные счета или гибридный вариант?

Порядок: Что для тебя «грязная квартира»? Насколько важно, чтобы быт был идеально налажен, и кто за это отвечает?

Блок 4: Дети и воспитание

Приоритеты в обучении: В какую школу ты бы хотел(а) отдать детей — более религиозную или светскую с упором на науку?

Дисциплина: Ты сторонник строгого воспитания или считаешь, что ребенку нужно давать максимум свободы?

Блок 5: Эмоциональный интеллект и Конфликты

Реакция на стресс: Когда ты расстроен(а) или злишься, тебе нужно время, чтобы побыть в тишине, или важно выговориться немедленно?

Умение уступать: Можешь ли ты вспомнить случай, когда ты изменил(а) свое мнение ради другого человека? Что ты при этом чувствовал(а)?

Личное пространство: Сколько времени в неделю тебе жизненно необходимо проводить без партнера (с друзьями, за хобби, наедине с собой)?

Блок 6: Совместимость «стиля жизни»

Досуг: Идеальный выходной — это шумная компания друзей или вечер вдвоем под пледом?

Друзья: Насколько для тебя важно, чтобы твой партнер влился в твой круг общения?

Мечты: Если бы у нас была неограниченная сумма денег, чем бы мы занялись в первый месяц совместной жизни?

Форс-мажор: Что ты делаешь, если всё идет не по плану (отменили рейс, сломался кран, пропали билеты)?

Приоритеты: Работа допоздна ради достатка или скромный доход, но вечер дома в 18:00?

Критическое качество: Назови одно качество в человеке, с которым ты точно не сможешь мириться ни при каких обстоятельствах?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/20-voprosov-test-sovmestimosti)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-12',
    slug: 'vnutrenniy-sabotazhnik',
    image: '/images/articles/shidduch/inner-saboteur.png',
    title: {
      ru: `Внутренний саботажник: Почему ты боишься сказать «Да»?`,
      en: `Внутренний саботажник: Почему ты боишься сказать «Да»?`,
      he: `Внутренний саботажник: Почему ты боишься сказать «Да»?`,
      uk: `Внутренний саботажник: Почему ты боишься сказать «Да»?`,
    },
    subtitle: {
      ru: `Феномен «сломанного лифта»`,
      en: `Феномен «сломанного лифта»`,
      he: `Феномен «сломанного лифта»`,
      uk: `Феномен «сломанного лифта»`,
    },
    content: {
      ru: `Феномен «сломанного лифта»

Бывало ли так: анкета идеальная, фото симпатичное, шадхан в восторге, но за час до встречи у тебя «внезапно» портится настроение, ломается машина или находится микроскопическое пятнышко на репутации кандидата, которое становится поводом всё отменить? Если это повторяется — поздравляем, твой внутренний саботажник работает на полную мощность. Он охраняет твою зону комфорта, но вместе с ней — и твое одиночество.

Как это выглядит?

Саботаж редко бывает явным. Он маскируется под «здравый смысл» или «высокие стандарты»:

Гиперкритичность: Ты замечаешь нечищенную обувь или не ту интонацию и сразу выносишь вердикт: «Не мой человек».

«Синдром Золушки/Принца»: Ожидание идеала, чтобы иметь легальное право отказывать всем реальным людям.

Забывчивость и опоздания: Подсознательное желание сорвать встречу, чтобы «не срослось» само собой.

Чего мы боимся на самом деле?

Потеря «Я»: Страх, что брак — это тюрьма, где придется забыть о своих хобби, привычках и свободе.

Страх ошибки: «А вдруг через месяц я встречу кого-то лучше?». Это паралич выбора в эпоху бесконечных баз данных.

Страх близости (быть увиденным): В шидухе нельзя вечно играть роль. Рано или поздно придется показать свои слабости, и это пугает больше всего.

Как приручить страх ответственности?

Снизь планку ожиданий от первой встречи. Ты не идешь выбирать спутника на 50 лет. Ты идешь просто выпить кофе с интересным человеком. Дай себе право на ошибку.

Раздели «ответственность» и «ношу». Ответственность в иудаизме — это не тяжелый груз, а возможность стать сотворцом своей судьбы.

Техника «А что потом?». Представь худший сценарий. Ты женился/вышла замуж, и возникла проблема. Ты действительно не сможешь её решить? Спойлер: сможешь. У тебя есть разум, друзья и раввины.

Итог: Саботаж — это попытка защитить себя от боли. Но цена этой защиты — отсутствие жизни. Перестань воевать с кандидатами, начни договариваться со своим страхом.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/vnutrenniy-sabotazhnik)*`,
      en: `Феномен «сломанного лифта»

Бывало ли так: анкета идеальная, фото симпатичное, шадхан в восторге, но за час до встречи у тебя «внезапно» портится настроение, ломается машина или находится микроскопическое пятнышко на репутации кандидата, которое становится поводом всё отменить? Если это повторяется — поздравляем, твой внутренний саботажник работает на полную мощность. Он охраняет твою зону комфорта, но вместе с ней — и твое одиночество.

Как это выглядит?

Саботаж редко бывает явным. Он маскируется под «здравый смысл» или «высокие стандарты»:

Гиперкритичность: Ты замечаешь нечищенную обувь или не ту интонацию и сразу выносишь вердикт: «Не мой человек».

«Синдром Золушки/Принца»: Ожидание идеала, чтобы иметь легальное право отказывать всем реальным людям.

Забывчивость и опоздания: Подсознательное желание сорвать встречу, чтобы «не срослось» само собой.

Чего мы боимся на самом деле?

Потеря «Я»: Страх, что брак — это тюрьма, где придется забыть о своих хобби, привычках и свободе.

Страх ошибки: «А вдруг через месяц я встречу кого-то лучше?». Это паралич выбора в эпоху бесконечных баз данных.

Страх близости (быть увиденным): В шидухе нельзя вечно играть роль. Рано или поздно придется показать свои слабости, и это пугает больше всего.

Как приручить страх ответственности?

Снизь планку ожиданий от первой встречи. Ты не идешь выбирать спутника на 50 лет. Ты идешь просто выпить кофе с интересным человеком. Дай себе право на ошибку.

Раздели «ответственность» и «ношу». Ответственность в иудаизме — это не тяжелый груз, а возможность стать сотворцом своей судьбы.

Техника «А что потом?». Представь худший сценарий. Ты женился/вышла замуж, и возникла проблема. Ты действительно не сможешь её решить? Спойлер: сможешь. У тебя есть разум, друзья и раввины.

Итог: Саботаж — это попытка защитить себя от боли. Но цена этой защиты — отсутствие жизни. Перестань воевать с кандидатами, начни договариваться со своим страхом.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/vnutrenniy-sabotazhnik)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-13',
    slug: 'chto-delat-s-otsutstviem-iskry',
    image: '/images/articles/shidduch/no-spark-attraction.png',
    title: {
      ru: `«Я ему/ей не нравлюсь внешне»: Что делать с отсутствием искры?`,
      en: `«Я ему/ей не нравлюсь внешне»: Что делать с отсутствием искры?`,
      he: `«Я ему/ей не нравлюсь внешне»: Что делать с отсутствием искры?`,
      uk: `«Я ему/ей не нравлюсь внешне»: Что делать с отсутствием искры?`,
    },
    subtitle: {
      ru: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кан`,
      en: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кан`,
      he: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кан`,
      uk: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кан`,
    },
    content: {
      ru: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кандидата в шидухе. Мы боимся показаться поверхностными, боимся обидеть или упустить «свое», заставляя себя идти на свидания через силу.

Давайте разберемся: где проходит грань между «нужно дать шанс» и «это не мой человек»?

1. Искры нет сразу: Стоит ли идти на вторую встречу?

Существует миф, что любовь в шидухе — это молния, которая бьет в лобби отеля при первом взгляде. На самом деле, глубокая симпатия в осознанном браке — это «медленный огонь», а не «взрыв бензоколонки».

Когда давать второй шанс: Если человек внешне кажется вам «нейтральным». Вам не противно, не дискомфортно, просто нет восторга. Часто харизма, голос и манера общения раскрываются только к 2–3 встрече, и внешность «подтягивается» за личностью.

Когда можно заканчивать: Если вы чувствуете физическое отторжение. Если запах, жесты или облик вызывают желание отодвинуться. Насиловать свою природу нельзя — это фундамент будущего разочарования.

2. Эффект «Ожидание vs Реальность»

Часто проблема не в человеке, а в картинке в нашей голове. Мы нарисовали себе определенный тип, и когда реальный человек в него не вписывается, мозг выдает ошибку: «Не то!».

Совет: Попробуйте посмотреть на партнера не как на объект для оценки, а как на картину. Переключите фокус с «нравится ли мне его нос» на «какое ощущение я испытываю, когда он смеется?». Иногда «не мой тип» оказывается тем самым человеком, с которым нам уютнее всего.

3. Внешность — это динамическая величина

В еврейской психологии есть важный концепт: лицо — это отражение души. Когда нам нравится характер человека, его доброта, ум и юмор, его лицо начинает казаться нам красивым. И наоборот: самый идеальный красавец может стать отталкивающим, если за внешней формой скрывается холод или эгоизм.

4. Как честно поговорить с самим собой?

Задайте себе три вопроса:

Если бы я ослеп(ла), хотел(а) бы я, чтобы этот человек был рядом и поддерживал меня?

Мне не нравится его внешность или мне не нравится, что другие подумают о его внешности? (Часто мы ищем «статусную» картинку для окружающих).

Есть ли в нем хоть одна черта (глаза, улыбка, руки), которая мне искренне приятна?

5. Если «искра» так и не загорелась

Если после 3–4 встреч вы по-прежнему чувствуете, что заставляете себя, — пора быть честным.

Для себя: Признайте, что вы имеете право на предпочтения. Это не делает вас плохим или поверхностным человеком.

Для партнера: Отказ по причине отсутствия симпатии — это не приговор его внешности. Это просто отсутствие «химии» именно между вами.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/chto-delat-s-otsutstviem-iskry)*`,
      en: `«Он замечательный человек, но я ничего не чувствую», или «Она идеальна по анкете, но я не вижу в ней своей жены». Эти фразы — ночной кошмар любого кандидата в шидухе. Мы боимся показаться поверхностными, боимся обидеть или упустить «свое», заставляя себя идти на свидания через силу.

Давайте разберемся: где проходит грань между «нужно дать шанс» и «это не мой человек»?

1. Искры нет сразу: Стоит ли идти на вторую встречу?

Существует миф, что любовь в шидухе — это молния, которая бьет в лобби отеля при первом взгляде. На самом деле, глубокая симпатия в осознанном браке — это «медленный огонь», а не «взрыв бензоколонки».

Когда давать второй шанс: Если человек внешне кажется вам «нейтральным». Вам не противно, не дискомфортно, просто нет восторга. Часто харизма, голос и манера общения раскрываются только к 2–3 встрече, и внешность «подтягивается» за личностью.

Когда можно заканчивать: Если вы чувствуете физическое отторжение. Если запах, жесты или облик вызывают желание отодвинуться. Насиловать свою природу нельзя — это фундамент будущего разочарования.

2. Эффект «Ожидание vs Реальность»

Часто проблема не в человеке, а в картинке в нашей голове. Мы нарисовали себе определенный тип, и когда реальный человек в него не вписывается, мозг выдает ошибку: «Не то!».

Совет: Попробуйте посмотреть на партнера не как на объект для оценки, а как на картину. Переключите фокус с «нравится ли мне его нос» на «какое ощущение я испытываю, когда он смеется?». Иногда «не мой тип» оказывается тем самым человеком, с которым нам уютнее всего.

3. Внешность — это динамическая величина

В еврейской психологии есть важный концепт: лицо — это отражение души. Когда нам нравится характер человека, его доброта, ум и юмор, его лицо начинает казаться нам красивым. И наоборот: самый идеальный красавец может стать отталкивающим, если за внешней формой скрывается холод или эгоизм.

4. Как честно поговорить с самим собой?

Задайте себе три вопроса:

Если бы я ослеп(ла), хотел(а) бы я, чтобы этот человек был рядом и поддерживал меня?

Мне не нравится его внешность или мне не нравится, что другие подумают о его внешности? (Часто мы ищем «статусную» картинку для окружающих).

Есть ли в нем хоть одна черта (глаза, улыбка, руки), которая мне искренне приятна?

5. Если «искра» так и не загорелась

Если после 3–4 встреч вы по-прежнему чувствуете, что заставляете себя, — пора быть честным.

Для себя: Признайте, что вы имеете право на предпочтения. Это не делает вас плохим или поверхностным человеком.

Для партнера: Отказ по причине отсутствия симпатии — это не приговор его внешности. Это просто отсутствие «химии» именно между вами.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/chto-delat-s-otsutstviem-iskry)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-14',
    slug: 'mezhobshchinnye-soyuzy',
    image: '/images/articles/shidduch/sephardi-ashkenazi-union.png',
    title: {
      ru: `Межобщинные союзы: Сефарды, Ашкеназы и культурный код`,
      en: `Межобщинные союзы: Сефарды, Ашкеназы и культурный код`,
      he: `Межобщинные союзы: Сефарды, Ашкеназы и культурный код`,
      uk: `Межобщинные союзы: Сефарды, Ашкеназы и культурный код`,
    },
    subtitle: {
      ru: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разны`,
      en: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разны`,
      he: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разны`,
      uk: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разны`,
    },
    content: {
      ru: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разных мелодий молитвы и, конечно, двух совершенно разных взглядов на то, сколько специй должно быть в субботней еде.

Как построить крепкий союз, если ваши «культурные коды» не совпадают?

1. Кухонная дипломатия: Китнийот и не только

Первое «испытание на прочность» обычно случается на Песах.

Конфликт: Ашкеназы строго избегают бобовых (китнийот), в то время как для сефардов рис и хумус — основа праздничного стола.

Решение: Это отличный повод для пары научиться договариваться. В еврейской традиции семья обычно следует обычаям мужа, но мудрость жены заключается в том, чтобы создать уют, в котором оба чувствуют себя «дома».

Совет: Обсудите заранее, чьи традиции станут ведущими в быту, чтобы первая совместный Песах не превратился в «войну за рис».

2. Темперамент и общение

Ашкеназский стиль часто более сдержанный, рациональный, иногда — чуть более закрытый. Сефардская культура — это тепло, открытые двери, громкие застолья и активная жестикуляция.

Риск: Ашкеназский партнер может почувствовать себя подавленным напором родственников супруга. Сефардский партнер может принять сдержанность за холодность.

Как быть: Помните, что «громко» — не значит «злиться», а «тихо» — не значит «безразлично». Это просто разная настройка громкости чувств.

3. Молитва и Нусах

Разница в произношении (иврит с мягким «тав» или твердым «сав») и разные мелодии в синагоге.

Почему это важно: Это касается воспитания детей. В какой хедер они пойдут? Какую мелодию будут напевать за шаббатним столом?

Мотивация: Дети в таких семьях часто растут более гибкими и толерантными. Они с детства знают, что «правильно» может выглядеть по-разному.

4. Семья и границы

В сефардских общинах влияние клана и расширенной семьи часто сильнее.

Совет: Если вы строите межобщинный союз, понятие «личные границы семьи» должно быть обсуждено еще в лобби отеля. Как часто мы принимаем гостей? Насколько глубоко родители могут советовать, как нам жить?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/mezhobshchinnye-soyuzy)*`,
      en: `Когда на шидухе встречаются представитель ашкеназской общины и сефардской, это не просто свидание двух людей. Это встреча двух цивилизаций, двух разных мелодий молитвы и, конечно, двух совершенно разных взглядов на то, сколько специй должно быть в субботней еде.

Как построить крепкий союз, если ваши «культурные коды» не совпадают?

1. Кухонная дипломатия: Китнийот и не только

Первое «испытание на прочность» обычно случается на Песах.

Конфликт: Ашкеназы строго избегают бобовых (китнийот), в то время как для сефардов рис и хумус — основа праздничного стола.

Решение: Это отличный повод для пары научиться договариваться. В еврейской традиции семья обычно следует обычаям мужа, но мудрость жены заключается в том, чтобы создать уют, в котором оба чувствуют себя «дома».

Совет: Обсудите заранее, чьи традиции станут ведущими в быту, чтобы первая совместный Песах не превратился в «войну за рис».

2. Темперамент и общение

Ашкеназский стиль часто более сдержанный, рациональный, иногда — чуть более закрытый. Сефардская культура — это тепло, открытые двери, громкие застолья и активная жестикуляция.

Риск: Ашкеназский партнер может почувствовать себя подавленным напором родственников супруга. Сефардский партнер может принять сдержанность за холодность.

Как быть: Помните, что «громко» — не значит «злиться», а «тихо» — не значит «безразлично». Это просто разная настройка громкости чувств.

3. Молитва и Нусах

Разница в произношении (иврит с мягким «тав» или твердым «сав») и разные мелодии в синагоге.

Почему это важно: Это касается воспитания детей. В какой хедер они пойдут? Какую мелодию будут напевать за шаббатним столом?

Мотивация: Дети в таких семьях часто растут более гибкими и толерантными. Они с детства знают, что «правильно» может выглядеть по-разному.

4. Семья и границы

В сефардских общинах влияние клана и расширенной семьи часто сильнее.

Совет: Если вы строите межобщинный союз, понятие «личные границы семьи» должно быть обсуждено еще в лобби отеля. Как часто мы принимаем гостей? Насколько глубоко родители могут советовать, как нам жить?

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/mezhobshchinnye-soyuzy)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-15',
    slug: 'shiduh-35-plus',
    image: '/images/articles/shidduch/shidduch-35-plus.png',
    title: {
      ru: `Шидух 35+: Когда стандартные правила лобби уже не работают`,
      en: `Шидух 35+: Когда стандартные правила лобби уже не работают`,
      he: `Шидух 35+: Когда стандартные правила лобби уже не работают`,
      uk: `Шидух 35+: Когда стандартные правила лобби уже не работают`,
    },
    subtitle: {
      ru: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна),`,
      en: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна),`,
      he: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна),`,
      uk: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна),`,
    },
    content: {
      ru: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна), определенный круг общения и, честно скажем, некоторая усталость от бесконечных «первых встреч».

Почему стандартные сценарии в этом возрасте часто дают осечку и как превратить зрелость в свой главный козырь?

1. Small Talk в 40: Почему «хобби» больше не работают

В 20 лет мы спрашиваем: «Какую музыку ты слушаешь?», чтобы понять, впишется ли человек в нашу компанию. В 40 вопрос о хобби звучит поверхностно.

О чем говорить вместо этого? В зрелом возрасте важнее «архитектура жизни».

Вместо: «Чем ты занимаешься в свободное время?»

Спросите: «Как ты выстраиваешь свой баланс между работой и личным пространством?» или «Какое достижение за последние 5 лет принесло тебе не только успех, но и внутренний покой?».

В 40 лет нас определяет не то, катаемся ли мы на лыжах, а то, как мы справляемся с кризисами и на что опираемся, когда земля уходит из-под ног.

2. Ловушка «Идеального пазла» (Завышенные ожидания)

Главная проблема шидуха 35+ — мы ищем человека, который идеально «вщелкнется» в нашу готовую жизнь, не сдвинув ни одной вазы на полке.

Честная мысль: В этом возрасте мы уже не «пластилин», из которого можно вылепить общую форму. Мы — два готовых гранитных блока.

Совет: Ищите не того, кто разделяет все ваши привычки, а того, чьи привычки вас не раздражают. Если вы любите тишину, а он — громкие телефонные разговоры, это важнее, чем общая любовь к классической музыке.

3. Стоит ли ломать себя? (О гибкости и границах)

Часто говорят: «В этом возрасте люди не меняются». Это миф. Люди меняются ради того, что им дорого.

Где стоит уступить: В бытовых мелочах, логистике, распределении времени.

Где нельзя уступать: В базовых ценностях, отношении к религии и жизненных целях.

Если вы привыкли спать до 10, а партнер встает в 6 на молитву — это решаемо. Если вы хотите дом, полный гостей, а партнер — тихую крепость, это фундаментальный конфликт.

4. Смена декораций: Альтернативные сценарии

Если лобби отеля вызывает у вас аллергию и ощущение «дня сурка», меняйте формат! В 35+ вы имеете на это право.

Прогулка в тихом парке или ботаническом саду: Движение снимает стресс и убирает эффект «перекрестного допроса» глаза в глаза.

Выставка или галерея: Дает готовую тему для обсуждения, если возникнет пауза.

Волонтерский проект: Ничто так не раскрывает человека, как совместное доброе дело.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/shiduh-35-plus)*`,
      en: `К 35–40 годам у каждого из нас за плечами не просто «багаж», а целая библиотека: выстроенная карьера, привычки (от любимого сорта кофе до режима сна), определенный круг общения и, честно скажем, некоторая усталость от бесконечных «первых встреч».

Почему стандартные сценарии в этом возрасте часто дают осечку и как превратить зрелость в свой главный козырь?

1. Small Talk в 40: Почему «хобби» больше не работают

В 20 лет мы спрашиваем: «Какую музыку ты слушаешь?», чтобы понять, впишется ли человек в нашу компанию. В 40 вопрос о хобби звучит поверхностно.

О чем говорить вместо этого? В зрелом возрасте важнее «архитектура жизни».

Вместо: «Чем ты занимаешься в свободное время?»

Спросите: «Как ты выстраиваешь свой баланс между работой и личным пространством?» или «Какое достижение за последние 5 лет принесло тебе не только успех, но и внутренний покой?».

В 40 лет нас определяет не то, катаемся ли мы на лыжах, а то, как мы справляемся с кризисами и на что опираемся, когда земля уходит из-под ног.

2. Ловушка «Идеального пазла» (Завышенные ожидания)

Главная проблема шидуха 35+ — мы ищем человека, который идеально «вщелкнется» в нашу готовую жизнь, не сдвинув ни одной вазы на полке.

Честная мысль: В этом возрасте мы уже не «пластилин», из которого можно вылепить общую форму. Мы — два готовых гранитных блока.

Совет: Ищите не того, кто разделяет все ваши привычки, а того, чьи привычки вас не раздражают. Если вы любите тишину, а он — громкие телефонные разговоры, это важнее, чем общая любовь к классической музыке.

3. Стоит ли ломать себя? (О гибкости и границах)

Часто говорят: «В этом возрасте люди не меняются». Это миф. Люди меняются ради того, что им дорого.

Где стоит уступить: В бытовых мелочах, логистике, распределении времени.

Где нельзя уступать: В базовых ценностях, отношении к религии и жизненных целях.

Если вы привыкли спать до 10, а партнер встает в 6 на молитву — это решаемо. Если вы хотите дом, полный гостей, а партнер — тихую крепость, это фундаментальный конфликт.

4. Смена декораций: Альтернативные сценарии

Если лобби отеля вызывает у вас аллергию и ощущение «дня сурка», меняйте формат! В 35+ вы имеете на это право.

Прогулка в тихом парке или ботаническом саду: Движение снимает стресс и убирает эффект «перекрестного допроса» глаза в глаза.

Выставка или галерея: Дает готовую тему для обсуждения, если возникнет пауза.

Волонтерский проект: Ничто так не раскрывает человека, как совместное доброе дело.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/shiduh-35-plus)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-16',
    slug: 'top-5-mifov-o-shiduhah',
    image: '/images/articles/shidduch/top5-myths-shidduch.png',
    title: {
      ru: `ТОП-5 мифов о шидухах: Хасидский взгляд на поиск единства`,
      en: `ТОП-5 мифов о шидухах: Хасидский взгляд на поиск единства`,
      he: `ТОП-5 мифов о шидухах: Хасидский взгляд на поиск единства`,
      uk: `ТОП-5 мифов о шидухах: Хасидский взгляд на поиск единства`,
    },
    subtitle: {
      ru: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг`,
      en: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг`,
      he: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг`,
      uk: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг`,
    },
    content: {
      ru: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг с верой — и воды расступаются. Почему же иногда нам кажется, что «море» стоит на месте? Часто виной тому мифы, которые мы принимаем за истину.

Разберем 5 главных заблуждений, которые мешают вашей душе встретить свою «вторую половину».

Миф 1. «Я встречу ЕГО/ЕЕ и сразу всё пойму»

Многие ждут эмоционального взрыва, как в кино. Но хасидизм учит нас принципу «Моах шалит аль а-лев» (Разум властвует над сердцем).

Настоящее чувство в еврейском браке — это не то, с чем приходят, а то, что строят. Если на встрече вы чувствуете спокойствие, взаимное уважение и общность целей — это верный знак.

Миф 2. «Мне нужен идеально подходящий человек»

Мы ищем того, кто разделяет все наши хобби и привычки. Но Баал-Шем-Тов учил, что мир создан из противоположностей, которые дополняют друг друга.

Шидух — это не поиск своего «клона». Это поиск того, кто поможет вам стать лучше. Ваша «половинка» может иметь другой темперамент или привычки, но если у вас общий фундамент (ценности), ваши различия станут не препятствием, а инструментом для роста.

Миф 3. «Сначала я должен стать идеальным (исправить все недостатки)»

«Вот заработаю на квартиру», «Вот выучу весь Талмуд», «Вот похудею — тогда и пойду в шидух».

Хасидская мудрость говорит, что человек — это «ход холех» (постоянно идущий). Мы несовершенны по определению. Семья — это и есть та «мастерская», где двое несовершенных людей помогают друг другу шлифовать свои души. Не ждите финиша, чтобы начать строить дом; стройте его, чтобы вместе прийти к финишу.

Миф 4. «Шадхан и Бирурим (проверки) — это формальность и пережиток прошлого»

В эпоху соцсетей кажется, что можно всё узнать самому.

 Хасидский подход подчеркивает важность взгляда со стороны. Шадхан — это не просто посредник, это посланник Свыше. Внешний блеск профиля в соцсети может скрыть главное — мидот (качества характера). Проверка через наставников и друзей помогает увидеть суть души, а не «фасад» личности.

Миф 5. «Мой мазаль (удача) где-то заблудился»

Когда шидухи затягиваются, легко впасть в уныние. Кажется, что время упущено.

В хасидизме нет места отчаянию. Ребе всегда подчеркивали: «Трахт гут — вет зайн гут» (Думай хорошо — и будет хорошо). Ваша молитва и ваша уверенность в том, что Всевышний уже готовит вашу встречу, способны изменить реальность. Иногда задержка — это лишь время, необходимое вам или вашему партнеру, чтобы внутренне дозреть до встречи.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/top-5-mifov-o-shiduhah)*`,
      en: `В хасидских книгах сказано, что создание семьи подобно разделению Красного моря: кажется, что перед тобой непреодолимая преграда, но стоит сделать шаг с верой — и воды расступаются. Почему же иногда нам кажется, что «море» стоит на месте? Часто виной тому мифы, которые мы принимаем за истину.

Разберем 5 главных заблуждений, которые мешают вашей душе встретить свою «вторую половину».

Миф 1. «Я встречу ЕГО/ЕЕ и сразу всё пойму»

Многие ждут эмоционального взрыва, как в кино. Но хасидизм учит нас принципу «Моах шалит аль а-лев» (Разум властвует над сердцем).

Настоящее чувство в еврейском браке — это не то, с чем приходят, а то, что строят. Если на встрече вы чувствуете спокойствие, взаимное уважение и общность целей — это верный знак.

Миф 2. «Мне нужен идеально подходящий человек»

Мы ищем того, кто разделяет все наши хобби и привычки. Но Баал-Шем-Тов учил, что мир создан из противоположностей, которые дополняют друг друга.

Шидух — это не поиск своего «клона». Это поиск того, кто поможет вам стать лучше. Ваша «половинка» может иметь другой темперамент или привычки, но если у вас общий фундамент (ценности), ваши различия станут не препятствием, а инструментом для роста.

Миф 3. «Сначала я должен стать идеальным (исправить все недостатки)»

«Вот заработаю на квартиру», «Вот выучу весь Талмуд», «Вот похудею — тогда и пойду в шидух».

Хасидская мудрость говорит, что человек — это «ход холех» (постоянно идущий). Мы несовершенны по определению. Семья — это и есть та «мастерская», где двое несовершенных людей помогают друг другу шлифовать свои души. Не ждите финиша, чтобы начать строить дом; стройте его, чтобы вместе прийти к финишу.

Миф 4. «Шадхан и Бирурим (проверки) — это формальность и пережиток прошлого»

В эпоху соцсетей кажется, что можно всё узнать самому.

 Хасидский подход подчеркивает важность взгляда со стороны. Шадхан — это не просто посредник, это посланник Свыше. Внешний блеск профиля в соцсети может скрыть главное — мидот (качества характера). Проверка через наставников и друзей помогает увидеть суть души, а не «фасад» личности.

Миф 5. «Мой мазаль (удача) где-то заблудился»

Когда шидухи затягиваются, легко впасть в уныние. Кажется, что время упущено.

В хасидизме нет места отчаянию. Ребе всегда подчеркивали: «Трахт гут — вет зайн гут» (Думай хорошо — и будет хорошо). Ваша молитва и ваша уверенность в том, что Всевышний уже готовит вашу встречу, способны изменить реальность. Иногда задержка — это лишь время, необходимое вам или вашему партнеру, чтобы внутренне дозреть до встречи.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/top-5-mifov-o-shiduhah)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-17',
    slug: '10-voprosov-zoom-svidanie',
    image: '/images/articles/shidduch/zoom-date-questions.png',
    title: {
      ru: `10 вопросов, которые «зажгут» Zoom-свидание`,
      en: `10 вопросов, которые «зажгут» Zoom-свидание`,
      he: `10 вопросов, которые «зажгут» Zoom-свидание`,
      uk: `10 вопросов, которые «зажгут» Zoom-свидание`,
    },
    subtitle: {
      ru: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:`,
      en: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:`,
      he: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:`,
      uk: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:`,
    },
    content: {
      ru: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:

«Если бы у тебя был свободный вечер без интернета и дел, как бы ты его провел(а)?» (Показывает образ жизни и предпочтения).

«Какая книга или фильм из тех, что ты недавно открыл(а) для себя, на тебя сильно повлияли?» (Раскрывает интеллектуальный уровень).

«Что для тебя идеальный Шаббат? Это время для гостей, тишины или молитвы?» (Важнейший вопрос о семейных ценностях).

«Если бы ты мог(ла) прямо сейчас оказаться в любом месте мира, где бы ты был(а)?» (Показывает масштаб мечтаний).

«Какой навык или умение ты давно хочешь освоить?» (Показывает амбиции и готовность к росту).

«Что для тебя в людях — самое ценное качество, а что — абсолютное табу?» (Маркер принципиальности).

«Расскажи о моменте, когда ты чувствовал(а) себя по-настоящему счастливым(ой) за последний год?» (Позитивный эмоциональный якорь).

«Как ты обычно принимаешь важные решения: слушаешь интуицию, советуешься с близкими или анализируешь логически?» (Показывает характер).

«Если бы у тебя была возможность изменить одну традицию в обществе, что бы это было?» (Показывает глубину мышления).

«Что тебя заставляет улыбаться даже в самый трудный день?» (Показывает чувство юмора и жизнестойкость).

Совет эксперта: Не превращайте встречу в допрос. Задайте один вопрос, внимательно выслушайте ответ и задайте 2-3 уточняющих вопроса. Настоящая магия общения происходит именно в деталях!

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/10-voprosov-zoom-svidanie)*`,
      en: `Если разговор зашел в тупик или вы хотите узнать о человеке что-то важное, не задавая шаблонных вопросов, используйте этот список:

«Если бы у тебя был свободный вечер без интернета и дел, как бы ты его провел(а)?» (Показывает образ жизни и предпочтения).

«Какая книга или фильм из тех, что ты недавно открыл(а) для себя, на тебя сильно повлияли?» (Раскрывает интеллектуальный уровень).

«Что для тебя идеальный Шаббат? Это время для гостей, тишины или молитвы?» (Важнейший вопрос о семейных ценностях).

«Если бы ты мог(ла) прямо сейчас оказаться в любом месте мира, где бы ты был(а)?» (Показывает масштаб мечтаний).

«Какой навык или умение ты давно хочешь освоить?» (Показывает амбиции и готовность к росту).

«Что для тебя в людях — самое ценное качество, а что — абсолютное табу?» (Маркер принципиальности).

«Расскажи о моменте, когда ты чувствовал(а) себя по-настоящему счастливым(ой) за последний год?» (Позитивный эмоциональный якорь).

«Как ты обычно принимаешь важные решения: слушаешь интуицию, советуешься с близкими или анализируешь логически?» (Показывает характер).

«Если бы у тебя была возможность изменить одну традицию в обществе, что бы это было?» (Показывает глубину мышления).

«Что тебя заставляет улыбаться даже в самый трудный день?» (Показывает чувство юмора и жизнестойкость).

Совет эксперта: Не превращайте встречу в допрос. Задайте один вопрос, внимательно выслушайте ответ и задайте 2-3 уточняющих вопроса. Настоящая магия общения происходит именно в деталях!

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/10-voprosov-zoom-svidanie)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-18',
    slug: '3-urovnya-proverki-sovmestimosti',
    image: '/images/articles/shidduch/three-level-compatibility.png',
    title: {
      ru: `3 уровневая проверка совместимости`,
      en: `3 уровневая проверка совместимости`,
      he: `3 уровневая проверка совместимости`,
      uk: `3 уровневая проверка совместимости`,
    },
    subtitle: {
      ru: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности.`,
      en: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности.`,
      he: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности.`,
      uk: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности.`,
    },
    content: {
      ru: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности. В психологии это называется совместимостью на трех уровнях: биологическом, психологическом и ценностном.

Если на первом уровне (химия) всё обычно решается само собой, то второй и третий требуют осознанного анализа. Чтобы не ошибиться, я подготовил для тебя структурный разбор ключевых сфер совместимости.

1. Ценностный уровень: «Куда мы идем?»

Это база. Если здесь есть фундаментальные расхождения, лодка брака разобьется о первый же серьезный кризис.

Отношение к духовному и традициям: Насколько для каждого важна религия, соблюдение традиций (шаббат, кашрут, праздники)? Если один стремится к строгому соблюдению, а другой — к светскому образу жизни, это станет зоной постоянного напряжения.

Модель семьи: Кто «главный»? Как распределяются роли? В вашей картине мира жена строит карьеру или занимается домом? Муж — единственный кормилец или партнер в быту?

Дети и воспитание: Не просто «хотим ли мы детей», а «как мы будем их воспитывать?». Методы дисциплины, образование, участие бабушек и дедушек.

2. Психологический уровень: «Как мы идем?»

Здесь проверяется темперамент и способы взаимодействия с миром.

Темп жизни: Вы оба домоседы или один — вечный двигатель, а второй мечтает о диване? Большая разница в энергетике часто ведет к тому, что один чувствует себя брошенным, а другой — ограниченным.

Тип привязанности: Насколько каждому нужна дистанция? Одному может быть важно 24/7 быть вместе, а другому жизненно необходим «свой угол» и личное время.

Конфликтоустойчивость: Как партнер ведет себя в стрессе? Уходит в глухую оборону (молчание), взрывается или готов к спокойному диалогу? Совместимость — это не отсутствие ссор, а одинаковое стремление их конструктивно завершать.

3. Бытовой и финансовый уровень: «На чем мы едем?»

Статистически, большинство разводов случается из-за денег и быта.

Финансовые привычки: Вы «транжира» или «накопитель»? Как вы относитесь к долгам и кредитам? Важно обсудить, будет ли бюджет общим, раздельным или смешанным.

Понятие чистоты и порядка: Для кого-то немытая тарелка — катастрофа, для другого — мелочь. Если уровни допустимого хаоса сильно разнятся, быт превратится в поле боя.

Практическое упражнение: «Сверка карт»

Попробуйте обсудить (или проанализировать самостоятельно) следующие сценарии. Честный ответ на них даст больше, чем 10 обычных свиданий:

Сценарий «Кризис»: Представь, что один из нас теряет работу на полгода. Как мы будем жить? Кто берет ответственность?

Сценарий «Родители»: Твоя мама хочет приходить к нам в гости без предупреждения каждый день. Какова твоя реакция?

Сценарий «Отпуск»: У нас есть ограниченная сумма. Ты хочешь в горы с палатками, я — в отель «все включено». Как мы выберем?

Важный инсайт: Совместимость — это не 100% сходство. Это способность двух разных людей договариваться там, где они не совпадают. Если вы совпадаете в главном (ценностях), остальное можно «настроить».

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/3-urovnya-proverki-sovmestimosti)*`,
      en: `Для того чтобы разобраться в совместимости по-настоящему глубоко, нужно отойти от поверхностного «нам весело вместе» и заглянуть в фундамент личности. В психологии это называется совместимостью на трех уровнях: биологическом, психологическом и ценностном.

Если на первом уровне (химия) всё обычно решается само собой, то второй и третий требуют осознанного анализа. Чтобы не ошибиться, я подготовил для тебя структурный разбор ключевых сфер совместимости.

1. Ценностный уровень: «Куда мы идем?»

Это база. Если здесь есть фундаментальные расхождения, лодка брака разобьется о первый же серьезный кризис.

Отношение к духовному и традициям: Насколько для каждого важна религия, соблюдение традиций (шаббат, кашрут, праздники)? Если один стремится к строгому соблюдению, а другой — к светскому образу жизни, это станет зоной постоянного напряжения.

Модель семьи: Кто «главный»? Как распределяются роли? В вашей картине мира жена строит карьеру или занимается домом? Муж — единственный кормилец или партнер в быту?

Дети и воспитание: Не просто «хотим ли мы детей», а «как мы будем их воспитывать?». Методы дисциплины, образование, участие бабушек и дедушек.

2. Психологический уровень: «Как мы идем?»

Здесь проверяется темперамент и способы взаимодействия с миром.

Темп жизни: Вы оба домоседы или один — вечный двигатель, а второй мечтает о диване? Большая разница в энергетике часто ведет к тому, что один чувствует себя брошенным, а другой — ограниченным.

Тип привязанности: Насколько каждому нужна дистанция? Одному может быть важно 24/7 быть вместе, а другому жизненно необходим «свой угол» и личное время.

Конфликтоустойчивость: Как партнер ведет себя в стрессе? Уходит в глухую оборону (молчание), взрывается или готов к спокойному диалогу? Совместимость — это не отсутствие ссор, а одинаковое стремление их конструктивно завершать.

3. Бытовой и финансовый уровень: «На чем мы едем?»

Статистически, большинство разводов случается из-за денег и быта.

Финансовые привычки: Вы «транжира» или «накопитель»? Как вы относитесь к долгам и кредитам? Важно обсудить, будет ли бюджет общим, раздельным или смешанным.

Понятие чистоты и порядка: Для кого-то немытая тарелка — катастрофа, для другого — мелочь. Если уровни допустимого хаоса сильно разнятся, быт превратится в поле боя.

Практическое упражнение: «Сверка карт»

Попробуйте обсудить (или проанализировать самостоятельно) следующие сценарии. Честный ответ на них даст больше, чем 10 обычных свиданий:

Сценарий «Кризис»: Представь, что один из нас теряет работу на полгода. Как мы будем жить? Кто берет ответственность?

Сценарий «Родители»: Твоя мама хочет приходить к нам в гости без предупреждения каждый день. Какова твоя реакция?

Сценарий «Отпуск»: У нас есть ограниченная сумма. Ты хочешь в горы с палатками, я — в отель «все включено». Как мы выберем?

Важный инсайт: Совместимость — это не 100% сходство. Это способность двух разных людей договариваться там, где они не совпадают. Если вы совпадаете в главном (ценностях), остальное можно «настроить».

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/3-urovnya-proverki-sovmestimosti)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
  },
  {
    id: 'shidduch-19',
    slug: 'zoom-shiduh-khimiya-cherez-ekran',
    image: '/images/articles/shidduch/zoom-chemistry-guide.png',
    title: {
      ru: `Zoom-шидух: Как создать химию через экран и не провалить первое свидание`,
      en: `Zoom-шидух: Как создать химию через экран и не провалить первое свидание`,
      he: `Zoom-шидух: Как создать химию через экран и не провалить первое свидание`,
      uk: `Zoom-шидух: Как создать химию через экран и не провалить первое свидание`,
    },
    subtitle: {
      ru: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфю`,
      en: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфю`,
      he: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфю`,
      uk: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфю`,
    },
    content: {
      ru: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфюма или галантным открыванием двери. В Zoom ваше главное оружие — внимание, свет и искренность.

Часть 1. Технический гайд: Ваша «витрина»

В онлайне картинка — это ваш фон и ваше лицо. Плохой интернет может «заикаться» в самый ответственный момент, разрушая магию беседы.

Правило золотого света: Никогда не садитесь спиной к окну или яркой лампе — вы превратитесь в темный силуэт. Свет должен падать на лицо. Лучший вариант — настольная лампа за монитором или кольцевая лампа.

Ракурс решает всё: Поставьте ноутбук или телефон так, чтобы камера была на уровне ваших глаз. Если камера смотрит снизу вверх, партнер будет рассматривать ваш подбородок и потолок.

Фон (Задний план): Необязательно иметь библиотеку редких книг за спиной, но порядок обязателен. Разбросанные вещи на заднем плане считываются подсознательно как хаос в жизни. Лучше всего — нейтральная стена или аккуратный домашний уголок.

Стабильный коннект: Если Wi-Fi «хромает», используйте проводной интернет или перейдите на мобильные данные. Проверьте звук (микрофон) за 5 минут до начала.

Часть 2. Этикет онлайн-шидуха: Тонкости общения

Свидание в Zoom — это полноценная встреча, а не «просто созвон».

Дресс-код: Оденьтесь так, будто вы идете в кафе. Это настраивает на серьезный лад не только партнера, но и вас. Полный образ (включая обувь!) помогает чувствовать себя увереннее, чем в рубашке и домашних шортах.

Зрительный контакт: В Zoom мы склонны смотреть на свое изображение в углу экрана. Ошибка! Хотите посмотреть в глаза партнеру — смотрите прямо в глазок камеры. Это создает ощущение личного контакта.

Никаких уведомлений: Выключите звук на телефоне и закройте лишние вкладки на компьютере. Звук приходящего сообщения в Telegram во время глубокого разговора — это «красный флаг», говорящий о неуважении.

Тайминг: Первое онлайн-свидание не должно длиться 3 часа. Лучше закончить на 40-60 минуте, оставив легкое чувство недосказанности и желание созвониться снова.

Часть 3. Как создать «химию» через пиксели?

Химия — это энергия. В онлайне её передать сложнее, но возможно.

Активное слушание: В жизни мы понимаем всё по языку тела. В Zoom тело обрезано рамкой кадра. Поэтому больше кивайте, улыбайтесь и используйте вербальные подтверждения («Да», «Интересно», «Понимаю»).

Интерактив: Если беседа зашла в тупик, можно «показать» что-то важное из своего пространства. Например: «Кстати, ты говорил про любовь к искусству, посмотри, какую картину я недавно купил...». Это сближает и пускает человека в ваш мир.

Будьте готовы к паузам: В онлайне задержка звука в 1 секунду — норма. Не пытайтесь перебивать, делайте паузу чуть дольше обычной, прежде чем ответить.

Подводные камни: Чего делать НЕЛЬЗЯ

Есть во время звонка: Максимум — чай или кофе. Жевание перед камерой выглядит неэстетично.

Скриншотить экран: Никогда не делайте фото партнера без его согласия. Это грубое нарушение приватности и правил шидуха.

«Бегающие глаза»: Не проверяйте почту и не пишите другим в процессе. Это заметно по отражению в ваших глазах и очках.

Вердикт

Zoom-шидух — это отличный фильтр. Если вам интересно общаться даже через экран, значит, при личной встрече искра превратится в пламя. Используйте это время, чтобы узнать ценности и характер, прежде чем покупать билет на самолет.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/zoom-shiduh-khimiya-cherez-ekran)*`,
      en: `Дистанция в тысячи километров больше не приговор для поиска пары. Но свидание через экран — это особый жанр. Здесь не получится «взять» ароматом парфюма или галантным открыванием двери. В Zoom ваше главное оружие — внимание, свет и искренность.

Часть 1. Технический гайд: Ваша «витрина»

В онлайне картинка — это ваш фон и ваше лицо. Плохой интернет может «заикаться» в самый ответственный момент, разрушая магию беседы.

Правило золотого света: Никогда не садитесь спиной к окну или яркой лампе — вы превратитесь в темный силуэт. Свет должен падать на лицо. Лучший вариант — настольная лампа за монитором или кольцевая лампа.

Ракурс решает всё: Поставьте ноутбук или телефон так, чтобы камера была на уровне ваших глаз. Если камера смотрит снизу вверх, партнер будет рассматривать ваш подбородок и потолок.

Фон (Задний план): Необязательно иметь библиотеку редких книг за спиной, но порядок обязателен. Разбросанные вещи на заднем плане считываются подсознательно как хаос в жизни. Лучше всего — нейтральная стена или аккуратный домашний уголок.

Стабильный коннект: Если Wi-Fi «хромает», используйте проводной интернет или перейдите на мобильные данные. Проверьте звук (микрофон) за 5 минут до начала.

Часть 2. Этикет онлайн-шидуха: Тонкости общения

Свидание в Zoom — это полноценная встреча, а не «просто созвон».

Дресс-код: Оденьтесь так, будто вы идете в кафе. Это настраивает на серьезный лад не только партнера, но и вас. Полный образ (включая обувь!) помогает чувствовать себя увереннее, чем в рубашке и домашних шортах.

Зрительный контакт: В Zoom мы склонны смотреть на свое изображение в углу экрана. Ошибка! Хотите посмотреть в глаза партнеру — смотрите прямо в глазок камеры. Это создает ощущение личного контакта.

Никаких уведомлений: Выключите звук на телефоне и закройте лишние вкладки на компьютере. Звук приходящего сообщения в Telegram во время глубокого разговора — это «красный флаг», говорящий о неуважении.

Тайминг: Первое онлайн-свидание не должно длиться 3 часа. Лучше закончить на 40-60 минуте, оставив легкое чувство недосказанности и желание созвониться снова.

Часть 3. Как создать «химию» через пиксели?

Химия — это энергия. В онлайне её передать сложнее, но возможно.

Активное слушание: В жизни мы понимаем всё по языку тела. В Zoom тело обрезано рамкой кадра. Поэтому больше кивайте, улыбайтесь и используйте вербальные подтверждения («Да», «Интересно», «Понимаю»).

Интерактив: Если беседа зашла в тупик, можно «показать» что-то важное из своего пространства. Например: «Кстати, ты говорил про любовь к искусству, посмотри, какую картину я недавно купил...». Это сближает и пускает человека в ваш мир.

Будьте готовы к паузам: В онлайне задержка звука в 1 секунду — норма. Не пытайтесь перебивать, делайте паузу чуть дольше обычной, прежде чем ответить.

Подводные камни: Чего делать НЕЛЬЗЯ

Есть во время звонка: Максимум — чай или кофе. Жевание перед камерой выглядит неэстетично.

Скриншотить экран: Никогда не делайте фото партнера без его согласия. Это грубое нарушение приватности и правил шидуха.

«Бегающие глаза»: Не проверяйте почту и не пишите другим в процессе. Это заметно по отражению в ваших глазах и очках.

Вердикт

Zoom-шидух — это отличный фильтр. Если вам интересно общаться даже через экран, значит, при личной встрече искра превратится в пламя. Используйте это время, чтобы узнать ценности и характер, прежде чем покупать билет на самолет.

---

*Оригинал статьи на [GetAShidduch.org](https://getashidduch.org/ru/journal/zoom-shiduh-khimiya-cherez-ekran)*`,
    },
    tag: { ru: 'Шиддух', en: 'Shidduch', he: 'שידוך', uk: 'Шідух' },
    createdAt: '2026-03-30',
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
