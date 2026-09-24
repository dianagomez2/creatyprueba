import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Bell, BrainCircuit, CalendarDays, Check,
  CalendarCheck, ChevronRight, ClipboardCheck, Cloud, FileText, LayoutDashboard,
  Lightbulb, ListChecks, Menu, MessageSquareText, Search, Sparkles, Table as TableIcon,
  Target, Users, X,
} from "lucide-react";
import { toast } from "sonner";
import creatyLogo from "@/assets/creaty-logo.png";
import { supabase } from "@/integrations/supabase/client";

const WaitlistContext = createContext<{ open: () => void }>({ open: () => undefined });

function Section({ id, light = false, children, className = "" }: { id?: string; light?: boolean; children: ReactNode; className?: string }) {
  return <section id={id} className={`${light ? "bg-creaty-cream text-creaty-black" : "bg-creaty-black text-creaty-cream"} relative w-full scroll-mt-20 py-12 md:py-14 lg:py-16 ${className}`}><div className="site-container">{children}</div></section>;
}

function SectionHeading({ eyebrow, title, description, eyebrowClassName = "text-creaty-orange", descriptionClassName = "" }: { eyebrow?: string; title: ReactNode; description?: string; eyebrowClassName?: string; descriptionClassName?: string }) {
  return <div className="section-heading text-center"><div>{eyebrow && <p className={`text-xs font-bold uppercase ${eyebrowClassName}`}>{eyebrow}</p>}<h2 className={`type-section mx-auto font-black ${eyebrow ? "mt-3" : ""}`}>{title}</h2></div>{description && <p className={`type-support mx-auto mt-4 ${descriptionClassName}`}>{description}</p>}</div>;
}

function CTAButton({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  const { open } = useContext(WaitlistContext);
  return <button type="button" onClick={open} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 hover:brightness-105 ${dark ? "bg-creaty-black text-creaty-cream" : "bg-creaty-lime text-creaty-black shadow-[var(--shadow-cta)]"} ${className}`}>{children}<ArrowRight className="h-4 w-4" /></button>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <a href="#top" aria-label="Ir al inicio" className="inline-flex shrink-0 items-center"><img src={creatyLogo} alt="Creaty" className={`${compact ? "h-7 md:h-8" : "h-14 md:h-[72px]"} w-auto object-contain`} /></a>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const links = [["Por qué Creaty", "#problema"], ["Cómo te ayuda", "#solucion"], ["Cómo funciona", "#como-funciona"], ["Por qué es diferente", "#diferencial"]];
  return <header className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ${scrolled || menuOpen ? "border-creaty-cream/10 bg-creaty-black/95 shadow-[var(--shadow-nav)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
    <div className="site-container relative grid min-h-16 grid-cols-[1fr_auto] items-center gap-3 py-2 md:grid-cols-[1fr_auto_1fr]">
      <div className="justify-self-start"><Logo compact /></div>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 whitespace-nowrap md:flex min-[900px]:gap-5 lg:static lg:translate-x-0 lg:justify-self-center lg:gap-9">{links.map(([label, href]) => <a key={href} href={href} className="text-xs font-medium text-creaty-cream/65 transition-colors hover:text-creaty-white min-[900px]:text-[13px] lg:text-sm">{label}</a>)}</nav>
      <div className="flex items-center justify-self-end gap-2 md:col-start-3"><CTAButton className="navbar-cta whitespace-nowrap px-3 py-2 text-[11px] lg:px-5 lg:text-sm">Regístrate ahora</CTAButton><button type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-md border border-creaty-cream/15 text-creaty-cream md:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
    </div>
    {menuOpen && <nav className="border-t border-creaty-cream/10 bg-creaty-black md:hidden"><div className="site-container py-4">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-creaty-cream/10 py-3 text-sm text-creaty-cream/80 last:border-0">{label}</a>)}</div></nav>}
  </header>;
}

const ventures = [
  ["AR", "Ana Rivera", "EdTech", "hace 2 días", "En progreso", "bg-creaty-purple"],
  ["DC", "Diego Castro", "HealthTech", "hace 5 días", "Bloqueo atención", "bg-creaty-orange"],
  ["SM", "Sara Morales", "AgroTech", "hace 1 día", "En progreso", "bg-creaty-lime"],
  ["JL", "Juan López", "EdTech", "hace 14 días", "En pausa", "bg-creaty-cream"],
  ["CT", "Camila Torres", "Marketplace", "hace 3 días", "En progreso", "bg-creaty-purple"],
  ["LV", "Laura Vélez", "Sustainability", "hace 4 días", "En progreso", "bg-creaty-orange"],
];
const stages = [["Idea y validación", 100], ["Validación de problema", 80], ["Pricing y modelo de negocio", 40], ["MVP y primeras ventas", 20], ["Tracción y escalamiento", 0]] as const;

function Avatar({ initials, tone = "bg-creaty-purple" }: { initials: string; tone?: string }) { return <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tone} text-[10px] font-extrabold text-creaty-black`}>{initials}</span>; }
function SearchBox({ label }: { label: string }) { return <div className="flex items-center gap-2 rounded-md border border-creaty-black/10 bg-background px-3 py-2 text-[10px] text-creaty-black/40"><Search className="h-3.5 w-3.5" />{label}</div>; }

function DashboardMockup() {
  return <div className="relative mx-auto mt-6 md:mt-7">
    <div className="relative z-10 overflow-hidden rounded-lg border border-creaty-black/10 bg-background shadow-[var(--shadow-panel)]">
      <div className="flex h-12 items-center gap-3 border-b border-creaty-black/10 px-3 md:px-4"><span className="text-base font-black">Creaty<span className="text-creaty-orange">.</span></span><div className="ml-auto hidden w-48 sm:block"><SearchBox label="Buscar..." /></div><Bell className="h-4 w-4"/><Avatar initials="AP" tone="bg-creaty-lime" /></div>
      <div className="grid md:grid-cols-[150px_250px_1fr]">
        <aside className="hidden flex-col border-r border-creaty-black/10 p-3 md:flex">
          <div className="mb-3 flex items-center gap-2 border-b border-creaty-black/10 pb-3"><Avatar initials="AP" tone="bg-creaty-purple"/><span className="text-[9px]"><b>Alejandro Pérez</b><br/>Mentor</span></div>
          {[LayoutDashboard, Users, CalendarDays, ListChecks, FileText].map((Icon, i) => <div key={i} className={`mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-[10px] font-semibold ${i === 0 ? "bg-creaty-lime/35" : "text-creaty-black/55"}`}><Icon className="h-3.5 w-3.5" />{["Inicio", "Mis emprendimientos", "Calendario", "Tareas", "Recursos"][i]}</div>)}
        </aside>
        <div className="border-r border-creaty-black/10 p-3 md:p-4"><div className="mb-3 text-xs font-bold">Mis emprendimientos (8)</div><SearchBox label="Buscar emprendimiento..."/><div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-1">{ventures.map(([initials,name,sector,last,status,tone]) => <div key={name} className="flex min-w-0 items-center gap-2 rounded-md border border-creaty-black/8 p-2"><Avatar initials={initials} tone={tone}/><div className="min-w-0 flex-1"><div className="truncate text-[10px] font-bold">{name}</div><div className="text-[8px] text-creaty-black/50">{sector} · Últ. sesión: {last}</div></div><span className={`rounded-full px-1.5 py-1 text-[7px] font-bold ${status === "Bloqueo atención" ? "bg-danger-soft text-danger" : status === "En pausa" ? "bg-creaty-black/8 text-creaty-black/50" : "bg-success-soft text-success"}`}>{status}</span></div>)}</div></div>
        <main className="min-w-0 p-3 md:p-4">
          <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">{[["Emprendimientos activos","8","↑2 vs. semana anterior"],["Sesiones esta semana","5","↑1 vs. semana anterior"],["Requieren atención","2","↓1 vs. semana anterior"],["Avance promedio","68%","↑12% vs. mes anterior"]].map(([l,v,d],i)=><div key={l} className="min-w-[145px] rounded-md border border-creaty-black/10 p-3"><div className="flex items-center justify-between text-[8px] text-creaty-black/50">{l}{i===2&&<AlertTriangle className="h-3 w-3 text-danger"/>}</div><div className="mt-1 text-xl font-black">{v}</div><div className={`text-[7px] ${i===2?"text-danger":"text-success"}`}>{d}</div></div>)}</div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-md bg-creaty-black p-4 text-creaty-cream"><div className="text-[9px] uppercase text-creaty-lime">Tu próxima mentoría</div><div className="mt-1 text-[10px] font-semibold">Jueves, 10 de abril · 10:00 a. m.</div><div className="mt-3 flex items-center gap-2"><Avatar initials="AR"/><div className="text-[10px]"><b>Ana Rivera</b><br/><span className="text-creaty-cream/50">EdTech</span></div><button className="ml-auto rounded-md bg-creaty-lime px-2 py-1.5 text-[8px] font-bold text-creaty-black">Ver detalle →</button></div><div className="mt-4 text-[9px] font-bold">Resumen para tu sesión</div><p className="mt-1 text-[8px] leading-relaxed text-creaty-cream/65">Ha avanzado en la validación de problema. El pricing continúa pendiente. Ha entrevistado a 8 usuarios y validado la propuesta de valor.</p><div className="mt-3 rounded-md bg-creaty-purple/20 p-2 text-[8px]"><Sparkles className="mr-1 inline h-3 w-3 text-creaty-purple"/><b>Foco sugerido por IA:</b> Validar disposición a pagar y explorar modelos de pricing.</div></div>
            <div className="rounded-md border border-creaty-black/10 p-4"><div className="flex items-center justify-between text-[10px] font-bold">Avance por etapa <span className="rounded border px-2 py-1 text-[8px] font-normal">Todos</span></div><div className="mt-4 space-y-3">{stages.map(([label,p])=><div key={label}><div className="flex justify-between text-[8px]"><span>{label}</span><b>{p}%</b></div><div className="mt-1 h-1.5 rounded-full bg-creaty-black/8"><div className={`h-full rounded-full ${p===40?"bg-creaty-orange":"bg-progress"}`} style={{width:`${p}%`}}/></div></div>)}</div></div>
          </div>
          <div className="mt-3"><div className="mb-2 flex justify-between text-[10px] font-bold">Próximos pasos de tu portafolio <span className="text-[8px] font-medium">Ver todas las tareas →</span></div><div className="grid gap-2 sm:grid-cols-3">{[["Ana Rivera","Validar pricing","10 abr"],["Diego Castro","Entrevistas usuarios","12 abr"],["Sara Morales","Preparar pitch","13 abr"]].map(([n,t,d])=><div key={n} className="rounded-md border border-creaty-black/10 p-2 text-[8px]"><b>{n}</b><div className="mt-1 text-creaty-black/55">{t}</div><span className="mt-2 inline-block rounded bg-creaty-lime/45 px-1.5 py-0.5 font-bold">{d}</span></div>)}</div></div>
        </main>
      </div>
    </div>
  </div>;
}

function Hero() {
  const reduce = useReducedMotion();
  return <section id="top" className="relative overflow-hidden bg-creaty-black pb-14 pt-32 text-creaty-cream md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"><div className="hero-grid absolute inset-0 opacity-40"/><div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-creaty-lime/50 to-transparent"/><div className="site-container"><motion.div initial={reduce?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative mx-auto text-center"><h1 className="type-hero mx-auto font-black tracking-normal">Más emprendimientos acompañados. <span className="text-creaty-lime">Menos tiempo</span> preparando cada mentoría.</h1><p className="type-support mx-auto mt-5 text-creaty-white">Creaty centraliza los avances de tus emprendedores y te ayuda a llegar a cada sesión con el contexto y los próximos pasos claros, para que dediques tu tiempo a aportar valor.</p><div className="mt-8 flex flex-col items-center"><CTAButton>Regístrate ahora</CTAButton><span className="mt-3 text-sm font-medium text-creaty-white">Y recibe gratis un diagnóstico como mentor para iniciar</span></div></motion.div></div></section>;
}

function DashboardSection(){return <Section light className="dashboard-section"><SectionHeading title="Todo lo que necesitas saber antes de tu próxima mentoría." description="Avances, acuerdos, próximos pasos y recomendaciones de cada emprendimiento, organizados en un solo lugar." descriptionClassName="dashboard-subtitle text-creaty-black"/><DashboardMockup/></Section>}

const problems = [
["Llegas a la sesión sin recordar todo el contexto.","Antes de cada mentoría tienes que revisar conversaciones, avances y sesiones anteriores para volver a entender dónde está cada emprendimiento."],
["No sabes si avanzaron hasta que vuelves a verlos.","Entre una sesión y otra pierdes visibilidad sobre tareas, compromisos y bloqueos. Cuando algo se estanca, te enteras tarde."],
["No todos los emprendedores necesitan la misma mentoría.","Cada equipo está en un momento distinto, con retos y prioridades diferentes. Adaptar el acompañamiento a cada caso exige contexto y criterio."],
["Termina la mentoría, pero los próximos pasos no quedan claros y organizados.","En sesiones presenciales o virtuales, convertir lo conversado en tareas, responsables y próximos pasos claros termina siendo otro trabajo después de mentorear."],
];
function Problema(){const accents=["text-creaty-orange","text-creaty-purple","text-creaty-lime","text-creaty-cream"];return <Section id="problema"><SectionHeading title="Tu tiempo debería estar dedicado a mentorear, no a reconstruir lo que ya pasó." description="Entre una sesión y otra, el contexto se dispersa, los compromisos se enfrían y preparar cada caso vuelve a consumir tiempo." descriptionClassName="text-creaty-white"/><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">{problems.map(([t,d],i)=><article key={t} className="h-full rounded-lg border border-creaty-cream/10 bg-creaty-black p-5"><span className={`text-2xl font-black ${accents[i]}`}>0{i+1}</span><h3 className="type-card-title mt-3 font-bold lg:text-lg">{t}</h3><p className="mt-2 text-sm leading-relaxed text-creaty-cream/55">{d}</p></article>)}</div><div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-lg bg-creaty-lime p-6 text-center text-creaty-black md:p-8"><p className="text-balance text-xl font-semibold">Descubre qué puedes mejorar en tu forma de acompañar.</p><CTAButton dark>Regístrate</CTAButton><p className="text-sm font-medium">Y recibe gratis tu diagnóstico como mentor.</p></div></Section>}

const values = [
[LayersIcon,"Todo el contexto, en un solo lugar.","Avances, acuerdos y decisiones de cada emprendimiento, listos antes de tu próxima mentoría.","bg-creaty-lime"],
  [ListChecks,"Seguimiento continuo entre sesiones.","Mantén visibles los avances, compromisos y bloqueos sin esperar hasta la próxima mentoría.","bg-creaty-purple"],
[BrainCircuit,"Orientación para cada emprendimiento.","Creaty, a través de IA, conecta la etapa, los avances y las necesidades de cada equipo para ayudarte a identificar dónde enfocarte.","bg-creaty-orange"],
[MessageSquareText,"De la conversación a la acción.","Convierte lo trabajado en la sesión en tareas, responsables y próximos pasos claros para el equipo.","bg-creaty-black text-creaty-lime"],
] as const;
function LayersIcon(props:{className?:string}){return <LayoutDashboard {...props}/>}

const processStages = [["Idea y validación","100%"],["Validación de problema","100%"],["Propuesta de valor","80%"],["Pricing y modelo de negocio","En progreso · 40%"],["MVP y primeras ventas","20%"],["Tracción y escalamiento","0%"]];
function ProcessMap(){return <div className="relative mx-auto mt-10 lg:mt-14">
<div className="relative z-10 rounded-lg border border-creaty-black/10 bg-background p-4 shadow-[var(--shadow-panel)] md:p-7"><div className="flex flex-col gap-4 border-b border-creaty-black/10 pb-5 lg:flex-row lg:items-end"><div className="flex items-start gap-3"><ArrowLeft className="mt-1 h-4 w-4"/><div><h3 className="text-xl font-black">Ana Rivera</h3><p className="text-xs text-creaty-black/45">EdTech · Educación personalizada con IA</p></div></div><div className="no-scrollbar flex gap-5 overflow-x-auto lg:ml-auto">{["Resumen","Sesiones","Tareas","Documentos","Notas"].map((x,i)=><span key={x} className={`shrink-0 pb-2 text-[10px] font-semibold ${i===0?"border-b-4 border-creaty-lime":"text-creaty-black/45"}`}>{x}</span>)}</div></div>
<div className="mt-5 grid gap-3 lg:grid-cols-[1.35fr_.8fr_.8fr]"><div className="grid rounded-md border border-creaty-black/10 p-5 sm:grid-cols-[1fr_110px]"><div><p className="text-[10px] text-creaty-black/45">Etapa actual</p><h4 className="mt-2 text-lg font-black">Validación comercial</h4><p className="mt-2 text-xs leading-relaxed text-creaty-black/50">Está validando la disposición a pagar y explorando modelos de negocio.</p></div><div className="mt-4 border-creaty-black/10 sm:mt-0 sm:border-l sm:pl-5"><p className="text-[10px] text-creaty-black/45">Avance general</p><div className="mt-3 grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(var(--creaty-progress)_60%,var(--creaty-track)_0)]"><div className="grid h-14 w-14 place-items-center rounded-full bg-background text-lg font-black">60%</div></div></div></div><div className="rounded-md bg-danger-soft p-5 text-danger"><AlertTriangle className="h-5 w-5"/><h4 className="mt-3 text-sm font-bold">Bloqueo detectado</h4><p className="mt-2 text-[10px] leading-relaxed">Aún no ha validado la disposición a pagar con usuarios reales.</p></div><div className="rounded-md bg-lime-soft p-5"><Lightbulb className="h-5 w-5"/><h4 className="mt-3 text-sm font-bold">Próximo foco sugerido por IA</h4><p className="mt-2 text-[10px] leading-relaxed">Diseñar 3 hipótesis de pricing y validarlas con 5 clientes potenciales.</p></div></div>
<div className="mt-4 rounded-md border border-creaty-black/10 p-5"><p className="text-xs font-bold">Mapa de proceso</p><div className="process-stepper mt-6">{processStages.map(([name,status],i)=><div key={name} className="process-step"><span className={`process-number ${i<3?"done":i===3?"current":"future"}`}>{i+1}</span><div><div className="text-[9px] font-semibold leading-tight">{name}</div><div className={`mt-1 flex items-center gap-1 text-[8px] font-bold ${i===3?"text-creaty-orange":i<3?"text-success":"text-creaty-black/35"}`}>{i<3?<Check className="h-3 w-3"/>:<span className="h-2 w-2 rounded-full border currentColor"/>}{status}</div></div></div>)}</div></div></div>
</div>}

function Solucion(){return <Section id="solucion" light className="solution-section"><div className="solution-overview"><SectionHeading title={<>Tu experiencia hace la mentoría. <span className="text-creaty-orange">Creaty</span> hace que llegues preparado.</>} description="Con Creaty conectas lo que ocurrió, lo que avanzó y lo que debería seguir para que tú puedas concentrarte en preguntar, analizar y orientar a tus emprendedores." descriptionClassName="text-creaty-black"/><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-5">{values.map(([Icon,t,d,c])=><article key={t} className="h-full rounded-lg border border-creaty-black/10 bg-background p-5 lg:p-5"><div className={`grid h-10 w-10 place-items-center rounded-md lg:h-9 lg:w-9 ${c}`}><Icon className="h-5 w-5 lg:h-4 lg:w-4"/></div><h3 className="type-card-title mt-4 font-extrabold lg:mt-3 lg:text-lg">{t}</h3><p className="mt-2 text-sm leading-relaxed text-creaty-black/55 lg:text-[13px] lg:leading-normal">{d}</p></article>)}</div></div><ProcessMap/></Section>}

function Como(){const steps=[["01","Prepárate","Entiende rápidamente dónde está cada emprendimiento y qué necesita atención antes de comenzar."],["02","Acompaña","Captura lo importante de la sesión y convierte acuerdos en tareas, responsables y próximos pasos claros."],["03","Da continuidad","Haz seguimiento a los avances y llega a la siguiente sesión sabiendo qué cambió y dónde aportar."]];return <Section id="como-funciona"><SectionHeading eyebrow="Tres pasos. Una mentoría más inteligente." eyebrowClassName="text-creaty-purple" title="Antes. Durante. Después. Sin perder el hilo."/><div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-6">{steps.map(([n,t,d],i)=><article key={n} className="h-full rounded-lg border border-creaty-cream/10 p-5 sm:p-6 lg:p-8"><span className={`type-step-number font-black ${i===1?"text-creaty-orange":"text-creaty-lime"}`}>{n}</span><h3 className="type-card-title mt-6 font-bold">{t}</h3><p className="mt-3 text-sm leading-relaxed text-creaty-cream/55">{d}</p></article>)}</div><div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center"><p className="text-pretty font-semibold">Descubre cómo Creaty puede ayudarte a preparar, acompañar y dar seguimiento a tus emprendedores.</p><CTAButton>Haz tu diagnóstico gratis</CTAButton></div></Section>}

const comparisonRows = [
  ["Centraliza información del emprendimiento", true, false, false, true, true],
  ["Historial de sesiones y conversaciones", true, false, false, false, true],
  ["Seguimiento de tareas y compromisos", true, true, false, false, true],
  ["Recordatorios y alertas de seguimiento", false, false, true, false, true],
  ["Visualización del proceso del emprendedor entre sesiones", false, false, true, false, true],
  ["Recomendaciones y próximos pasos con IA", true, false, false, false, true],
  ["Información adaptada a la etapa del emprendimiento", false, false, false, false, true],
  ["Todo en un solo lugar, con enfoque en mentoría", false, false, false, false, true],
] as const;

function ComparisonValue({ enabled }: { enabled: boolean }) {
  return enabled
    ? <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-comparison-success text-creaty-white"><Check aria-hidden="true" className="h-3 w-3" strokeWidth={3}/><span className="sr-only">Sí</span></span>
    : <span className="mx-auto grid h-5 w-5 place-items-center text-creaty-orange"><X aria-hidden="true" className="h-4 w-4" strokeWidth={3}/><span className="sr-only">No</span></span>;
}

function Diferencial() {
  const tools = [
    { name: "Notion", Icon: FileText },
    { name: "Excel", Icon: TableIcon },
    { name: "CRM", Icon: Cloud },
    { name: "Agenda de notas", Icon: CalendarCheck },
  ];
  return <Section id="diferencial" light className="overflow-x-clip py-10 md:py-12 lg:py-14">
    <SectionHeading title={<>Tus herramientas guardan información. <span className="text-creaty-orange">Creaty</span> te ayuda a convertirla en una mejor mentoría.</>} />
    <div className="mx-auto mt-8 max-w-[1100px] overflow-x-auto rounded-2xl border border-comparison-line bg-creaty-black">
      <table className="w-full min-w-[720px] table-fixed border-collapse text-creaty-white">
        <colgroup><col className="w-[35%]"/><col className="w-[12%]"/><col className="w-[12%]"/><col className="w-[12%]"/><col className="w-[12%]"/><col className="w-[17%]"/></colgroup>
        <thead>
          <tr className="border-b border-comparison-line">
            <th scope="col" className="sticky left-0 z-20 h-[76px] bg-creaty-black px-4 text-left text-sm font-semibold">Funcionalidad</th>
            {tools.map(({ name, Icon }) => <th key={name} scope="col" className="h-[76px] border-l border-comparison-line px-2 text-center"><Icon aria-hidden="true" className="mx-auto mb-1 h-5 w-5"/><span className="block text-xs font-medium">{name}</span></th>)}
            <th scope="col" className="h-[86px] border-x border-t border-creaty-lime bg-creaty-black px-3 text-center"><span className="block text-lg font-semibold text-creaty-lime">Con Creaty</span><span className="mt-1 block text-[11px] font-normal leading-tight text-creaty-white">Todo en un solo lugar,<br/>con enfoque en mentoría.</span></th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map(([feature, ...values], rowIndex) => <tr key={feature} className="h-10 border-b border-comparison-line last:border-b-0">
            <th scope="row" className="sticky left-0 z-10 bg-creaty-black px-4 py-2 text-left text-[13px] font-normal leading-snug text-creaty-cream">{feature}</th>
            {values.map((enabled, columnIndex) => <td key={columnIndex} className={`border-l px-2 py-2 text-center ${columnIndex === 4 ? `border-x border-creaty-lime bg-comparison-highlight text-creaty-black ${rowIndex === comparisonRows.length - 1 ? "border-b" : ""}` : "border-comparison-line"}`}><ComparisonValue enabled={enabled}/></td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  </Section>;
}

function Credibility(){return <Section light><div className="rounded-lg bg-creaty-purple/25 p-5 text-center sm:p-6 lg:p-10"><div className="mx-auto grid max-w-5xl justify-items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-full bg-creaty-purple"><Users className="h-7 w-7"/></div><SectionHeading eyebrow="Diseñado junto a mentores empresariales" eyebrowClassName="text-creaty-black/50" title="Construido con quienes saben lo que significa acompañar emprendedores." description="Estamos desarrollando Creaty junto a mentores empresariales para convertir problemas reales de tu día a día en una herramienta que realmente ahorra tiempo y mejore tu acompañamiento." descriptionClassName="text-creaty-black"/></div></div></Section>}

function FinalCTA(){return <Section><div className="mx-auto max-w-[1000px] text-center"><Target className="mx-auto h-10 w-10 text-creaty-orange"/><h2 className="type-section mx-auto mt-5 font-black">Tu siguiente mentoría empieza mucho antes de la sesión.</h2><p className="type-support mx-auto mt-4 text-creaty-white">Regístrate, recibe gratis tu diagnóstico como mentor y sé de los primeros en conocer cómo Creaty puede ayudarte a acompañar más emprendimientos dedicando menos tiempo operativo a preparar cada sesión.</p><div className="mt-8"><CTAButton>Regístrate ahora</CTAButton></div></div></Section>}

const fieldClass="mt-2 min-h-11 w-full rounded-md border border-creaty-black/15 bg-background px-3 py-2 text-sm text-creaty-black outline-none transition focus:border-creaty-black focus:ring-2 focus:ring-creaty-lime";
function Field({label,name,type="text"}:{label:string;name:string;type?:string}){return <label className="block text-sm font-semibold">{label}<input className={fieldClass} name={name} type={type} required/></label>}
function SelectField({label,name,options}:{label:string;name:string;options:string[]}){return <label className="block text-sm font-semibold">{label}<select className={fieldClass} name={name} required defaultValue=""><option value="" disabled>Selecciona una opción</option>{options.map(x=><option key={x}>{x}</option>)}</select></label>}
function WaitlistForm({onSuccess}:{onSuccess:()=>void}){const [sending,setSending]=useState(false);async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setSending(true);const data=Object.fromEntries(new FormData(e.currentTarget));const {error}=await supabase.from("mentor_waitlist").insert({name:String(data.name),email:String(data.email),phone:String(data.phone),simultaneous_ventures:String(data.simultaneous_ventures),mentorship_mode:String(data.mentorship_mode),professional_role:String(data.professional_role)});setSending(false);if(error){toast.error("No pudimos completar tu registro. Inténtalo de nuevo.");return}toast.success("Gracias por registrarte. Pronto recibirás noticias de Creaty.");onSuccess()}
return <form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Nombre" name="name"/><Field label="Correo" name="email" type="email"/><Field label="Celular" name="phone" type="tel"/><SelectField label="¿Cuántos emprendimientos acompañas usualmente en simultáneo?" name="simultaneous_ventures" options={["1-5","6-10","11-15","Más de 15"]}/></div><SelectField label="¿Cómo realizas principalmente tus mentorías?" name="mentorship_mode" options={["Por cuenta propia","A través de una incubadora, aceleradora o programa","Como parte de una red de mentores","Desde una empresa de consultoría o mentoría","Otro"]}/><SelectField label="¿Qué lugar ocupa la mentoría en tu actividad profesional?" name="professional_role" options={["Es mi actividad principal","Es una actividad complementaria frecuente","Mentoreo ocasionalmente"]}/><button disabled={sending} type="submit" className="flex min-h-12 w-full items-center justify-center rounded-md bg-creaty-lime px-5 font-bold text-creaty-black transition hover:brightness-105 disabled:opacity-60">{sending?"Enviando...":"Quiero mi diagnóstico gratis"}</button></form>}
function WaitlistModal({open,onClose}:{open:boolean;onClose:()=>void}){useEffect(()=>{if(!open)return;const key=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();document.addEventListener("keydown",key);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=""}},[open,onClose]);if(!open)return null;return <div role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e=>e.target===e.currentTarget&&onClose()} className="fixed inset-0 z-[200] grid place-items-center bg-creaty-black/85 p-5 backdrop-blur-sm md:p-8"><div className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-creaty-cream p-5 text-creaty-black shadow-[var(--shadow-modal)] sm:p-6 lg:p-8"><button type="button" onClick={onClose} aria-label="Cerrar formulario" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-creaty-black/15"><X className="h-5 w-5"/></button><p className="text-xs font-bold uppercase text-creaty-orange">Creaty para mentores</p><h2 id="modal-title" className="type-section mt-3 pr-12 font-black">Empieza conociendo cómo mentoreas.</h2><p className="mb-7 mt-4 text-pretty text-sm leading-relaxed text-creaty-black/60">Regístrate para ser de los primeros en probar Creaty y recibe gratis un diagnóstico de tu perfil como mentor.</p><WaitlistForm onSuccess={onClose}/></div></div>}
function Footer(){return <footer className="border-t border-creaty-cream/10 bg-creaty-black py-8 text-creaty-cream"><div className="site-container flex flex-col items-center justify-between gap-4 sm:flex-row"><Logo compact/><span className="text-xs text-creaty-cream/40">© 2026 Creaty. Mentorías con más contexto.</span></div></footer>}

export default function Landing(){const [open,setOpen]=useState(false);return <WaitlistContext.Provider value={{open:()=>setOpen(true)}}><Navbar/><main><Hero/><DashboardSection/><Problema/><Solucion/><Como/><Diferencial/><Credibility/><FinalCTA/></main><Footer/><WaitlistModal open={open} onClose={()=>setOpen(false)}/></WaitlistContext.Provider>}
