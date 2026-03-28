export interface Article {
  id: string;
  slug: string;
  image?: string;
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

<h3>«Я ухожу на небо — рукописи оставляю тебе»</h3>
<p>Незадолго до ухода Ребе Рашаб обратился к своему единственному сыну, рабби Йосефу-Ицхаку (будущему Шестому Ребе), со словами, ставшими историческими: «Я ухожу на небо, а рукописи я оставляю тебе». Эти рукописи — тысячи страниц хасидских маамаров (учений), писем и заметок — представляли собой духовное наследие не только Ребе Рашаба, но и предыдущих поколений Ребе. Передача рукописей была не просто завещанием имущества — это был акт передачи духовной власти и ответственности за продолжение дела Хабада.</p>

<h3>Последние мгновения</h3>
<p>В последние часы жизни Ребе Рашаба хасидим собрались вокруг его постели, читая Теилим (Псалмы) и молясь о его выздоровлении. Ребе Рашаб произнёс несколько фраз, обращённых к Б-гу, выражая готовность предстать перед Небесным Судом. Его уход стал огромной потерей для всего хасидского мира, но переданное им наследие — учения, рукописи и сеть ешив «Томхей Тмимим» — продолжило жить и развиваться под руководством его сына.</p>`,

      en: `<h3>Final Days in Rostov-on-Don</h3>
<p>On 2 Nissan 5680 (1920), in Rostov-on-Don, the earthly journey of the fifth Lubavitcher Rebbe — Rabbi Shalom DovBer Schneersohn, known as the Rebbe Rashab — came to an end. The final years of his life were spent under harsh conditions: the Civil War, devastation, and persecution made normal life impossible. Nevertheless, the Rebbe Rashab continued to lead the Chassidic movement, receive visitors, and teach students.</p>

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

<h3>Несломленный дух</h3>
<p>На допросах рабби Леви-Ицхак проявил невероятную стойкость. Несмотря на давление и угрозы, он отказывался подписывать ложные признания и называть имена тех, кто помогал ему в подпольной религиозной деятельности. Его «преступления» заключались в организации тайных миньянов, обеспечении кошерного шхита (убоя скота), обрезаний и обучении детей Торе — всём том, что составляло основу еврейской жизни на протяжении тысячелетий, но было запрещено большевистским режимом.</p>

<h3>Преданность ребецин Ханы</h3>
<p>Жена рабби Леви-Ицхака, ребецин Хана, проявила исключительную самоотверженность. Каждый день она приносила мужу в тюрьму кошерную еду, преодолевая огромные трудности. Позднее, когда его приговорили к ссылке в Казахстан, она последовала за ним, делая всё возможное, чтобы облегчить его страдания. Рабби Леви-Ицхак и в ссылке продолжал изучать и преподавать Тору, изготавливая чернила из трав для записи своих хидушим (новых толкований). Его жертвенность ради сохранения Торы стала одним из самых вдохновляющих примеров в истории Хабада.</p>`,

      en: `<h3>The NKVD Night Raid</h3>
<p>On the night of 9 Nissan 5699 (1939), NKVD agents burst into the home of Rabbi Levi Yitzchak Schneerson — the chief rabbi of Dnepropetrovsk and father of the future Seventh Lubavitcher Rebbe. The search lasted several hours: the entire apartment was turned upside down, and books, manuscripts, and personal correspondence were confiscated. Rabbi Levi Yitzchak was arrested on charges of "counter-revolutionary activity" — the Soviet regime's classification for his tireless work in preserving Jewish religious life.</p>

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

<h3>Реакция Ребе Рашаба</h3>
<p>Когда весть о рождении достигла пятого Любавичского Ребе — Ребе Рашаба, он отправил не менее шести поздравительных телеграмм семье. Такое необычное внимание со стороны Ребе указывало на то, что он провидел особую судьбу новорождённого. По свидетельствам хасидов, Ребе Рашаб выразил большую радость, что в семье Шнеерсонов родился ребёнок, носящий имя Цемах Цедека.</p>

<h3>Мать и раннее воспитание</h3>
<p>Мать будущего Ребе, ребецин Хана, с первых дней жизни сына проявляла особую скрупулёзность в соблюдении заповедей. Она совершала нетилат ядаим (омовение рук) каждый раз, прежде чем кормить младенца, превращая даже самые обыденные действия в служение Б-гу. С самого раннего возраста мальчик проявлял феноменальные способности: острый ум, необычайную память и глубокий интерес к изучению Торы. Уже в детстве он поражал окружающих вопросами, которые свидетельствовали о глубине мышления, далеко превосходящей его возраст.</p>`,

      en: `<h3>Birth in Nikolaev</h3>
<p>On 11 Nissan 5662 (1902), in the city of Nikolaev (present-day Ukraine), a boy was born who was destined to become the Seventh Lubavitcher Rebbe — Rabbi Menachem Mendel Schneerson. He was named after the third Lubavitcher Rebbe — the Tzemach Tzedek (Rabbi Menachem Mendel Schneersohn the elder), symbolically linking him to the great tradition of Chabad leadership.</p>

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

<h3>«Свет души более не вмещается в теле»</h3>
<p>Незадолго до ухода Цемах Цедек произнёс слова, глубоко поразившие окружающих: «Свет души более не может удерживаться в теле». Эти слова отражали хасидское понимание смерти не как конца, а как момента, когда душа, переполненная Б-жественным светом, выходит за пределы физической оболочки. Для хасидов это было свидетельством невероятного духовного уровня их Ребе — его душа буквально «переросла» тело.</p>

<h3>Скорбь и преемственность</h3>
<p>13 Ниссана 5626 года (1866) Цемах Цедек покинул этот мир. Скорбь на его похоронах была огромной — тысячи хасидов оплакивали потерю своего наставника и лидера. Однако даже в горе сохранялась уверенность в продолжении традиции. Руководство хабадским движением перешло к его младшему сыну, рабби Шмуэлю, известному как Ребе Магараш. Цемах Цедек оставил после себя колоссальное наследие: галахические постановления, хасидские учения и пример непоколебимой стойкости в защите еврейских интересов перед российскими властями.</p>`,

      en: `<h3>The Final Years of the Tzemach Tzedek</h3>
<p>The third Lubavitcher Rebbe, Rabbi Menachem Mendel Schneersohn, known as the Tzemach Tzedek, spent the final years of his life in a state of extreme physical weakness. Despite this, he continued to lead the Chassidic movement and receive the many visitors who came from all corners of the Russian Empire seeking his counsel and blessing. However, as time passed, his health deteriorated to such a degree that he was forced to receive people through secretaries, conveying his responses in written form.</p>

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
