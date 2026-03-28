export interface Article {
  id: string;
  slug: string;
  image?: string;
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
