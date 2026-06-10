import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/be7e646e-f711-4a0b-8f5b-8059adf50083/files/6da6f777-30d8-40c7-b205-219fc34be874.jpg";

const NAV_ITEMS = [
  { id: "basics", label: "Основы" },
  { id: "tech", label: "Техпроцессы" },
  { id: "equipment", label: "Оборудование" },
  { id: "org", label: "Структура АРП" },
  { id: "media", label: "Видео" },
  { id: "faq", label: "Вопросы" },
  { id: "contacts", label: "Контакты" },
];

const EQUIPMENT_CATALOG = [
  {
    id: 1,
    name: "Подъёмник 2-стоечный",
    category: "Подъём",
    icon: "ArrowUpFromLine",
    specs: { "Грузоподъёмность": "4 000 кг", "Высота подъёма": "1 850 мм", "Мощность": "2,2 кВт", "Тип": "Электрогидравлический" },
    desc: "Основное оборудование для подъёма автомобиля при техобслуживании и ремонте.",
  },
  {
    id: 2,
    name: "Сварочный полуавтомат MIG/MAG",
    category: "Сварка",
    icon: "Zap",
    specs: { "Ток сварки": "30–200 А", "Напряжение": "220 В", "Диаметр проволоки": "0,6–1,0 мм", "Защитный газ": "CO₂, Ar+CO₂" },
    desc: "Применяется для сварки кузовных элементов, рам и несущих конструкций.",
  },
  {
    id: 3,
    name: "Стенд рихтовочный",
    category: "Кузовной ремонт",
    icon: "Construction",
    specs: { "Рабочая длина": "5 500 мм", "Грузоподъёмность": "3 500 кг", "Усилие вытяжки": "до 10 т", "Тип": "Напольный" },
    desc: "Используется для восстановления геометрии кузова после ДТП.",
  },
  {
    id: 4,
    name: "Компрессор поршневой",
    category: "Пневматика",
    icon: "Wind",
    specs: { "Рабочее давление": "10 бар", "Производительность": "500 л/мин", "Объём ресивера": "270 л", "Мощность": "5,5 кВт" },
    desc: "Обеспечивает пневмоинструмент и покрасочное оборудование сжатым воздухом.",
  },
  {
    id: 5,
    name: "Диагностический сканер",
    category: "Диагностика",
    icon: "ScanLine",
    specs: { "Протоколы": "OBD-II, CAN, K-Line", "Обновление": "Wi-Fi", "Экран": "7\", сенсорный", "Поддержка марок": "Универсальный" },
    desc: "Считывание и сброс ошибок, параметры ЭБУ в реальном времени.",
  },
  {
    id: 6,
    name: "Шиномонтажный стенд",
    category: "Шиномонтаж",
    icon: "Circle",
    specs: { "Диаметр диска": "10–26\"", "Диаметр шины": "до 900 мм", "Мощность": "1,5 кВт", "Тип": "Полуавтоматический" },
    desc: "Монтаж и демонтаж шин легковых и лёгких коммерческих автомобилей.",
  },
];

const CATEGORIES = ["Все", ...Array.from(new Set(EQUIPMENT_CATALOG.map((e) => e.category)))];

const FAQ = [
  { q: "Что такое капитальный ремонт (КР) автомобиля?", a: "Капитальный ремонт — это комплекс работ по полному восстановлению ресурса автомобиля или его агрегата. Включает разборку, дефектацию, ремонт или замену изношенных деталей, сборку, регулировку и испытание." },
  { q: "В чём разница между обезличенным и необезличенным методами ремонта?", a: "При обезличенном методе отремонтированные детали и агрегаты не возвращаются на исходный автомобиль. При необезличенном — восстановленные детали сохраняют принадлежность конкретному автомобилю." },
  { q: "Какие типы производства существуют в АРП?", a: "Выделяют три типа: единичное (штучный выпуск, универсальное оборудование), серийное (партиями, частичная специализация) и массовое (поток, узкая специализация, высокая автоматизация)." },
  { q: "Что включает технологический процесс ремонта?", a: "Разборку автомобиля, агрегатов и узлов; мойку и дефектацию деталей; ремонт и восстановление деталей; сборку узлов, агрегатов и автомобиля; окраску; испытание и сдачу заказчику." },
  { q: "Какова основная задача авторемонтного производства?", a: "Улучшение качества ремонта автомобилей на основе достижений НТП: совершенствование организационной структуры, техническое перевооружение предприятий и их специализация." },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("basics");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredEquipment =
    activeCategory === "Все"
      ? EQUIPMENT_CATALOG
      : EQUIPMENT_CATALOG.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-sm"
        style={{ background: "hsl(220 15% 6% / 0.95)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "hsl(var(--amber))" }}>
              <Icon name="Wrench" size={16} className="text-background" />
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber))" }}>
              АРП · Авторемонт
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  color: activeSection === item.id ? "hsl(var(--amber))" : "hsl(220 10% 55%)",
                  borderBottom: activeSection === item.id ? "1px solid hsl(var(--amber))" : "1px solid transparent",
                }}>
                {item.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} style={{ color: "hsl(var(--amber))" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 px-4 py-3 flex flex-col gap-2"
            style={{ background: "hsl(220 15% 6% / 0.98)" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-left px-3 py-2 text-sm uppercase tracking-wider"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(220 10% 70%)" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pt-14 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="АРП" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsl(var(--background)) 30%, hsl(220 15% 8% / 0.5) 70%, transparent 100%)" }} />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="h-px w-12" style={{ background: "hsl(var(--amber))" }} />
              <span className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(var(--amber))" }}>
                Образовательный портал
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 animate-fade-up delay-100"
              style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 92%)" }}>
              ОСНОВЫ<br />
              <span className="text-amber-glow" style={{ color: "hsl(var(--amber))" }}>АВТОРЕМОНТНОГО</span><br />
              ПРОИЗВОДСТВА
            </h1>
            <p className="text-base md:text-lg max-w-xl mb-10 animate-fade-up delay-200"
              style={{ color: "hsl(220 10% 65%)", fontFamily: "IBM Plex Sans, sans-serif", lineHeight: "1.7" }}>
              Комплекс знаний по восстановлению работоспособности автомобилей.
              Технологические процессы, организационная структура, оборудование.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <button onClick={() => scrollTo("basics")}
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                style={{ background: "hsl(var(--amber))", color: "hsl(220 15% 8%)", fontFamily: "Oswald, sans-serif" }}>
                Начать изучение
              </button>
              <button onClick={() => scrollTo("equipment")}
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider border transition-all duration-200 hover:opacity-90"
                style={{ borderColor: "hsl(var(--amber) / 0.5)", color: "hsl(var(--amber))", fontFamily: "Oswald, sans-serif" }}>
                Каталог оборудования
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/40"
          style={{ background: "hsl(var(--steel) / 0.8)", backdropFilter: "blur(8px)" }}>
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "8", label: "разделов" },
              { val: "6+", label: "видов оборудования" },
              { val: "3", label: "метода ремонта" },
              { val: "КР", label: "капитальный ремонт" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber))" }}>{s.val}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "hsl(220 10% 55%)", fontFamily: "IBM Plex Mono, monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BASICS */}
      <section id="basics" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="01" title="Основы авторемонтного производства" />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: "hsl(220 10% 70%)" }}>
              Авторемонтное производство — это комплекс работ по восстановлению работоспособности
              автомобилей и их составных частей, достижению требуемого ресурса и качества ремонта.
              Оно базируется на технологической и организационной преемственности с автомобилестроением.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "hsl(220 10% 70%)" }}>
              Основная задача — улучшение качества ремонта на основе достижений научно-технического
              прогресса: совершенствование организационной структуры, техническое перевооружение
              предприятий и их специализация.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: "BookOpen", title: "Производственный процесс", desc: "Совокупность всех действий людей и орудий труда, необходимых для ремонта продукции. Включает основные и вспомогательные работы КР автомобилей." },
              { icon: "Settings", title: "Технологический процесс", desc: "Часть производственного процесса, содержащая целенаправленные действия по изменению состояния предмета труда — изделия или его составной части." },
              { icon: "Target", title: "Технологическая операция", desc: "Законченная часть техпроцесса, выполняемая на одном рабочем месте. Включает переходы, установы, позиции, приёмы и движения." },
            ].map((item) => (
              <ConceptCard key={item.title} {...item} />
            ))}
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <FeatureBlock title="Методы ремонта" icon="Repeat2">
            <ul className="space-y-2 text-sm" style={{ color: "hsl(220 10% 65%)" }}>
              <li className="flex gap-2"><span style={{ color: "hsl(var(--amber))" }}>▸</span>
                <div><strong style={{ color: "hsl(40 15% 85%)" }}>Обезличенный</strong> — детали после ремонта не возвращаются на исходный автомобиль</div></li>
              <li className="flex gap-2"><span style={{ color: "hsl(var(--amber))" }}>▸</span>
                <div><strong style={{ color: "hsl(40 15% 85%)" }}>Необезличенный</strong> — восстановленные детали сохраняют связь с конкретным авто</div></li>
            </ul>
          </FeatureBlock>
          <FeatureBlock title="Специализация предприятий" icon="Layers">
            <ul className="space-y-2 text-sm" style={{ color: "hsl(220 10% 65%)" }}>
              {["Предметная", "Подетальная", "Технологическая"].map((s) => (
                <li key={s} className="flex gap-2"><span style={{ color: "hsl(var(--amber))" }}>▸</span><span>{s}</span></li>
              ))}
            </ul>
          </FeatureBlock>
          <FeatureBlock title="Типы производства" icon="BarChart2">
            <ul className="space-y-2 text-sm" style={{ color: "hsl(220 10% 65%)" }}>
              {["Единичное", "Серийное", "Массовое"].map((s) => (
                <li key={s} className="flex gap-2"><span style={{ color: "hsl(var(--amber))" }}>▸</span><span>{s}</span></li>
              ))}
            </ul>
          </FeatureBlock>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* TECH */}
      <section id="tech" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="02" title="Технологические процессы и операции" />
        <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(220 10% 70%)" }}>
              К технологическим процессам ремонта относятся: разборка автомобиля, его агрегатов, узлов и деталей;
              ремонт деталей; сборка, окраска и испытание автомобиля, а также сдача его заказчику.
            </p>
            <p className="text-sm mb-8" style={{ color: "hsl(220 10% 55%)" }}>
              Разработка технологического процесса включает описание содержания работ, перечень необходимого
              оборудования, инструмента и приспособлений, нормы затрат. Информация заносится в технологические карты.
            </p>
            <div className="border border-border/60 p-5" style={{ background: "hsl(var(--steel) / 0.5)" }}>
              <div className="text-xs uppercase tracking-wider mb-3"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(var(--amber))" }}>
                Структура технологической операции
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Технологический переход", "Вспомогательный переход", "Установ", "Позиция", "Рабочий приём", "Рабочее движение"].map((el) => (
                  <div key={el} className="flex items-center gap-2 text-xs py-1.5 px-2 border border-border/40"
                    style={{ color: "hsl(220 10% 70%)" }}>
                    <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: "hsl(var(--amber))" }} />
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { num: "01", title: "Разборка", desc: "Разборка автомобиля, агрегатов, узлов и деталей с мойкой и очисткой" },
              { num: "02", title: "Дефектация", desc: "Контроль и сортировка деталей по степени износа и пригодности к дальнейшему использованию" },
              { num: "03", title: "Ремонт деталей", desc: "Восстановление изношенных деталей механической обработкой, сваркой, гальваникой и другими методами" },
              { num: "04", title: "Сборка", desc: "Сборка узлов, агрегатов и автомобиля с соблюдением технических условий" },
              { num: "05", title: "Окраска", desc: "Подготовка поверхности, грунтование и нанесение лакокрасочного покрытия" },
              { num: "06", title: "Испытание и сдача", desc: "Обкатка, регулировка, проверка параметров и сдача автомобиля заказчику" },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 p-4 border border-border/40 hover:border-amber/30 transition-colors"
                style={{ background: "hsl(var(--card))" }}>
                <div className="text-2xl font-bold flex-shrink-0 w-10 text-right"
                  style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber) / 0.4)", lineHeight: 1 }}>
                  {step.num}
                </div>
                <div>
                  <div className="font-semibold text-sm uppercase tracking-wide mb-1"
                    style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 85%)" }}>
                    {step.title}
                  </div>
                  <div className="text-xs" style={{ color: "hsl(220 10% 60%)" }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* EQUIPMENT */}
      <section id="equipment" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="03" title="Интерактивный каталог оборудования" />
        <div className="flex flex-wrap gap-2 mt-10 mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                background: activeCategory === cat ? "hsl(var(--amber))" : "hsl(var(--steel))",
                color: activeCategory === cat ? "hsl(220 15% 8%)" : "hsl(220 10% 65%)",
              }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEquipment.map((eq) => (
            <button key={eq.id}
              onClick={() => setSelectedEquipment(selectedEquipment === eq.id ? null : eq.id)}
              className="text-left p-5 border transition-all duration-200"
              style={{
                background: selectedEquipment === eq.id ? "hsl(var(--steel))" : "hsl(var(--card))",
                borderColor: selectedEquipment === eq.id ? "hsl(var(--amber))" : "hsl(var(--border))",
              }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--amber) / 0.12)" }}>
                  <Icon name={eq.icon} size={20} style={{ color: "hsl(var(--amber))" }} />
                </div>
                <span className="text-xs px-2 py-0.5"
                  style={{ background: "hsl(var(--steel))", color: "hsl(220 10% 55%)", fontFamily: "IBM Plex Mono, monospace" }}>
                  {eq.category}
                </span>
              </div>
              <div className="font-semibold mb-2"
                style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 88%)", fontSize: "1rem" }}>
                {eq.name}
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "hsl(220 10% 58%)" }}>{eq.desc}</p>
              {selectedEquipment === eq.id && (
                <div className="border-t border-border/60 pt-3 mt-1 space-y-1.5">
                  {Object.entries(eq.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span style={{ color: "hsl(220 10% 55%)", fontFamily: "IBM Plex Mono, monospace" }}>{k}</span>
                      <span style={{ color: "hsl(var(--amber))", fontFamily: "IBM Plex Mono, monospace" }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 text-xs mt-3"
                style={{ color: "hsl(var(--amber) / 0.7)", fontFamily: "IBM Plex Mono, monospace" }}>
                <Icon name={selectedEquipment === eq.id ? "ChevronUp" : "ChevronDown"} size={12} />
                {selectedEquipment === eq.id ? "Скрыть характеристики" : "Тех. характеристики"}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ORG */}
      <section id="org" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="04" title="Организационная структура АРП" />
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: "hsl(220 10% 70%)" }}>
              Организационная структура авторемонтных предприятий может быть построена по
              бесцеховой или цеховой структуре.
            </p>
            <div className="p-5 border border-border/40" style={{ background: "hsl(var(--card))" }}>
              <div className="font-semibold mb-3 uppercase text-sm tracking-wider"
                style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber))" }}>
                Бесцеховая структура
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(220 10% 65%)" }}>
                Все производственные участки возглавляются мастерами и подчинены непосредственно
                руководству АРП. Административные функции выполняет заводоуправление.
              </p>
            </div>
            <div className="p-5 border border-border/40" style={{ background: "hsl(var(--card))" }}>
              <div className="font-semibold mb-3 uppercase text-sm tracking-wider"
                style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber))" }}>
                Цеховая структура
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(220 10% 65%)" }}>
                Отдельные участки объединены в самостоятельные административные единицы — цехи.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: "По технологическому принципу", desc: "Разборка, сборка, гальваника" },
                  { title: "По предметному принципу", desc: "Двигатели, кузова, агрегаты" },
                ].map((c) => (
                  <div key={c.title} className="p-3 border border-border/40" style={{ background: "hsl(var(--steel))" }}>
                    <div className="text-xs font-medium mb-1" style={{ color: "hsl(40 15% 80%)" }}>{c.title}</div>
                    <div className="text-xs" style={{ color: "hsl(220 10% 55%)" }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(220 10% 50%)" }}>
              Типовой состав подразделений
            </div>
            <div className="space-y-2">
              {[
                { icon: "Hammer", name: "Разборочный цех", subs: ["Разборочно-моечный участок", "Контрольно-сортировочный участок"] },
                { icon: "Cog", name: "Агрегатно-сборочный цех", subs: ["Сборка агрегатов", "Обкатка и испытание"] },
                { icon: "Wrench", name: "Ремонтно-механический отдел", subs: ["Обслуживание оборудования", "Изготовление оснастки"] },
                { icon: "FlaskConical", name: "Инструментальный цех", subs: ["Хранение инструмента", "Восстановление режущего инструмента"] },
              ].map((dept) => (
                <div key={dept.name} className="p-4 border border-border/40" style={{ background: "hsl(var(--card))" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={dept.icon} size={16} style={{ color: "hsl(var(--amber))" }} />
                    <span className="font-medium text-sm"
                      style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 85%)" }}>
                      {dept.name}
                    </span>
                  </div>
                  <div className="pl-7 space-y-1">
                    {dept.subs.map((s) => (
                      <div key={s} className="text-xs flex gap-2" style={{ color: "hsl(220 10% 58%)" }}>
                        <span style={{ color: "hsl(var(--amber) / 0.6)" }}>└</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* MEDIA */}
      <section id="media" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="05" title="Видео и галерея" />
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(220 10% 50%)" }}>
              Учебное видео
            </div>
            <div className="relative w-full border border-border/40 overflow-hidden"
              style={{ background: "hsl(var(--card))", paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://vk.com/video_ext.php?oid=-139845463&id=456239050&hd=2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Авторемонтное производство"
              />
            </div>
            <p className="text-xs mt-3" style={{ color: "hsl(220 10% 50%)", fontFamily: "IBM Plex Mono, monospace" }}>
              Видеоматериал по авторемонтному производству
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "IBM Plex Mono, monospace", color: "hsl(220 10% 50%)" }}>
              Фотогалерея
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <img src={HERO_IMG} alt="Авторемонтный цех"
                  className="w-full h-48 object-cover border border-border/40 opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="h-28 border border-border/40 flex items-center justify-center"
                  style={{ background: "hsl(var(--steel))" }}>
                  <div className="text-center">
                    <Icon name="Image" size={24} style={{ color: "hsl(220 10% 40%)" }} />
                    <div className="text-xs mt-1" style={{ color: "hsl(220 10% 40%)", fontFamily: "IBM Plex Mono, monospace" }}>
                      Фото {i + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* FAQ */}
      <section id="faq" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="06" title="Вопросы и ответы" />
        <div className="mt-12 max-w-3xl space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-border/40" style={{ background: "hsl(var(--card))" }}>
              <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium" style={{ color: "hsl(40 15% 85%)", fontFamily: "IBM Plex Sans, sans-serif" }}>
                  {item.q}
                </span>
                <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className="flex-shrink-0"
                  style={{ color: "hsl(var(--amber))" }} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <div className="h-px mb-3" style={{ background: "hsl(var(--border))" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(220 10% 65%)" }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* CONTACTS */}
      <section id="contacts" className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader num="07" title="Контакты специалистов" />
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl">
          {[
            { name: "Максимов Максим", phone: "+7 924 511 64 21", address: "ул. Лесная, 45" },
            { name: "Кириченко Андрей", phone: "+7 914 365 14 85", address: "ул. Лесная, 45" },
          ].map((contact) => (
            <div key={contact.name} className="p-6 border border-border/40" style={{ background: "hsl(var(--card))" }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 flex items-center justify-center"
                  style={{ background: "hsl(var(--amber) / 0.12)", border: "1px solid hsl(var(--amber) / 0.3)" }}>
                  <Icon name="User" size={22} style={{ color: "hsl(var(--amber))" }} />
                </div>
                <div>
                  <div className="font-semibold"
                    style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 88%)", fontSize: "1.05rem" }}>
                    {contact.name}
                  </div>
                  <div className="text-xs" style={{ color: "hsl(220 10% 50%)", fontFamily: "IBM Plex Mono, monospace" }}>
                    Специалист АРП
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <a href={`tel:+79245116421`}
                  className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "hsl(220 10% 70%)" }}>
                  <Icon name="Phone" size={14} style={{ color: "hsl(var(--amber))" }} />
                  <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>{contact.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: "hsl(220 10% 70%)" }}>
                  <Icon name="MapPin" size={14} style={{ color: "hsl(var(--amber))" }} />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-8 mt-8" style={{ background: "hsl(220 15% 6%)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center" style={{ background: "hsl(var(--amber))" }}>
              <Icon name="Wrench" size={12} className="text-background" />
            </div>
            <span className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "Oswald, sans-serif", color: "hsl(220 10% 50%)" }}>
              АРП · Авторемонтное производство
            </span>
          </div>
          <div className="text-xs" style={{ color: "hsl(220 10% 40%)", fontFamily: "IBM Plex Mono, monospace" }}>
            Образовательный портал · 2024
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="text-5xl font-black leading-none opacity-20 select-none flex-shrink-0"
        style={{ fontFamily: "Oswald, sans-serif", color: "hsl(var(--amber))" }}>
        {num}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase leading-tight"
          style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 90%)" }}>
          {title}
        </h2>
        <div className="h-0.5 w-16 mt-2" style={{ background: "hsl(var(--amber))" }} />
      </div>
    </div>
  );
}

function ConceptCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 p-4 border border-border/40 hover:border-amber/30 transition-colors"
      style={{ background: "hsl(var(--card))" }}>
      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: "hsl(var(--amber) / 0.1)" }}>
        <Icon name={icon} size={18} style={{ color: "hsl(var(--amber))" }} />
      </div>
      <div>
        <div className="font-semibold text-sm mb-1 uppercase tracking-wide"
          style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 85%)" }}>
          {title}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "hsl(220 10% 60%)" }}>{desc}</p>
      </div>
    </div>
  );
}

function FeatureBlock({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="p-5 border border-border/40" style={{ background: "hsl(var(--card))" }}>
      <div className="flex items-center gap-3 mb-4">
        <Icon name={icon} size={16} style={{ color: "hsl(var(--amber))" }} />
        <div className="font-semibold text-sm uppercase tracking-wide"
          style={{ fontFamily: "Oswald, sans-serif", color: "hsl(40 15% 85%)" }}>
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}