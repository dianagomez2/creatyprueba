import { useState, type ReactNode } from "react";
import creatyLogo from "@/assets/creaty-logo.png";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Brain,
  Compass,
  LineChart,
  Layers,
  MessagesSquare,
  Calendar,
  AlertTriangle,
  ScanSearch,
  ListChecks,
  Lightbulb,
  Check,
  X,
  ChevronRight,
  Quote,
  Users,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import { toast } from "sonner";

/* ---------- shared bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 md:px-10 lg:px-16 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/[0.02] px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-[var(--color-muted-foreground)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-neon)] shadow-[0_0_12px_var(--color-neon)]" />
      {children}
    </div>
  );
}

function NeonButton({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-neon)] text-[#10110e] hover:shadow-[0_0_30px_rgba(229,254,0,0.5)] hover:-translate-y-0.5"
      : "border border-white/10 text-[var(--color-foreground)] hover:bg-white/[0.04] hover:border-white/20";
  const cls = `${base} ${styles} ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}

/* ---------- Logo ---------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center ${className}`}>
      <img
        src={creatyLogo}
        alt="Creaty"
        className="h-7 md:h-8 w-auto object-contain"
      />
    </a>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 md:px-5 py-3">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-muted-foreground)]">
            <a href="#problema" className="hover:text-white transition">Problema</a>
            <a href="#solucion" className="hover:text-white transition">Solución</a>
            <a href="#como" className="hover:text-white transition">Cómo funciona</a>
            <a href="#beneficios" className="hover:text-white transition">Beneficios</a>
          </nav>
          <NeonButton href="#waitlist" className="!py-2 !px-4 text-xs">
            Únete a la lista
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </NeonButton>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero Dashboard mockup ---------- */

function DashboardMockup() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-neon)]/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="glass rounded-2xl p-3 md:p-4 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* top bar */}
        <div className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-2.5 border border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="text-[11px] text-[var(--color-muted-foreground)] font-mono">
            creaty.app / dashboard
          </div>
          <div className="text-[11px] text-[var(--color-neon)] font-medium">● live</div>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-3">
          {/* sidebar */}
          <div className="hidden md:flex col-span-3 flex-col gap-2 rounded-xl bg-white/[0.02] border border-white/5 p-3">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted-foreground)] px-2">
              Emprendedores
            </div>
            {[
              { n: "Ana Rivera", t: "Foodtech", p: 78, color: "var(--color-neon)" },
              { n: "Luis Méndez", t: "Edtech", p: 42, color: "var(--lilac)" },
              { n: "María Soto", t: "Fintech", p: 61, color: "var(--color-neon)" },
              { n: "Diego Paz", t: "Retail", p: 24, color: "var(--orange-brand)" },
              { n: "Sara León", t: "SaaS", p: 89, color: "var(--color-neon)" },
            ].map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/[0.03] transition"
              >
                <div
                  className="h-7 w-7 rounded-full grid place-items-center text-[10px] font-bold text-black"
                  style={{ background: e.color }}
                >
                  {e.n.split(" ").map((s) => s[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{e.n}</div>
                  <div className="text-[10px] text-[var(--color-muted-foreground)]">{e.t}</div>
                </div>
                <div className="text-[10px] font-mono text-[var(--color-muted-foreground)]">
                  {e.p}%
                </div>
              </motion.div>
            ))}
          </div>

          {/* main */}
          <div className="col-span-12 md:col-span-9 grid gap-3">
            {/* metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Emprendedores activos", v: "24", d: "+3 este mes", c: "var(--color-neon)" },
                { l: "Mentorías esta semana", v: "12", d: "8 completas", c: "var(--lilac)" },
                { l: "Avance promedio", v: "68%", d: "+12 pts", c: "var(--orange-brand)" },
              ].map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-black/30 p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    {m.l}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold" style={{ color: m.c }}>
                      {m.v}
                    </span>
                    <span className="text-[10px] text-[var(--color-muted-foreground)]">{m.d}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI insight + chart */}
            <div className="grid grid-cols-5 gap-3">
              {/* AI insight */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="col-span-5 md:col-span-3 rounded-xl border border-[var(--color-neon)]/20 bg-gradient-to-br from-[var(--color-neon)]/10 via-transparent to-transparent p-4"
              >
                <div className="flex items-center gap-2 text-[var(--color-neon)] text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Recomendación IA
                </div>
                <p className="mt-2 text-sm leading-snug text-[var(--color-foreground)]">
                  <span className="text-[var(--color-neon)] font-semibold">Ana</span> avanzó
                  validación de problema pero está estancada en pricing. Sugerencia:{" "}
                  <span className="font-medium">sesión enfocada en willingness-to-pay</span>{" "}
                  con plantilla 3 hipótesis.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--color-muted-foreground)]">
                  <span className="rounded-md bg-white/5 px-2 py-1">Próxima sesión: jue 10am</span>
                  <span className="rounded-md bg-white/5 px-2 py-1">Plantilla lista</span>
                </div>
              </motion.div>

              {/* chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 }}
                className="col-span-5 md:col-span-2 rounded-xl border border-white/5 bg-black/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    Avance portfolio
                  </div>
                  <div className="text-[10px] text-[var(--color-neon)]">+18%</div>
                </div>
                <svg viewBox="0 0 200 80" className="mt-2 w-full h-20">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e5fe00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#e5fe00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 L25,55 L50,45 L75,50 L100,35 L125,30 L150,25 L175,18 L200,12 L200,80 L0,80 Z"
                    fill="url(#g1)"
                  />
                  <path
                    d="M0,60 L25,55 L50,45 L75,50 L100,35 L125,30 L150,25 L175,18 L200,12"
                    stroke="#e5fe00"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </motion.div>
            </div>

            {/* next steps row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="rounded-xl border border-white/5 bg-black/30 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)]">
                  Próximos pasos sugeridos
                </div>
                <div className="text-[10px] text-[var(--color-muted-foreground)]">IA · hoy</div>
              </div>
              <div className="grid md:grid-cols-3 gap-2">
                {[
                  { t: "Ana → validar pricing", c: "var(--color-neon)" },
                  { t: "Diego → entrevistas usuario", c: "var(--orange-brand)" },
                  { t: "Sara → preparar pitch ronda", c: "var(--lilac)" },
                ].map((s) => (
                  <div
                    key={s.t}
                    className="flex items-center gap-2 rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
                    <span className="text-xs">{s.t}</span>
                    <ChevronRight className="ml-auto h-3 w-3 text-[var(--color-muted-foreground)]" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>



    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <Section id="top" className="!pt-40 !pb-20 md:!pb-32 overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg radial-fade opacity-50" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[var(--color-neon)]/15 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-[var(--lilac)]/10 blur-[140px]" />
        <div className="absolute top-1/3 right-0 h-[260px] w-[400px] rounded-full bg-[var(--orange-brand)]/8 blur-[140px]" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Mentoría empresarial · Powered by AI</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-5xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Mentorea con{" "}
          <span className="text-[var(--color-neon)] text-glow-neon">más claridad</span>
          <br className="hidden sm:block" /> y menos trabajo operativo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-base md:text-lg text-[var(--color-muted-foreground)] leading-relaxed"
        >
          Creaty usa inteligencia artificial para ayudarte a organizar la información,
          hacer seguimiento a tus emprendedores y orientar cada mentoría con mayor precisión.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-3"
        >
          <NeonButton href="#waitlist">
            Únete a la lista de espera
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </NeonButton>
          <NeonButton href="#como" variant="ghost">
            Ver cómo funciona
          </NeonButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-[var(--color-muted-foreground)]"
        >
          Accede antes que nadie a Creaty y marca una diferencia como mentor.
        </motion.p>

        <div className="mt-16 md:mt-24 w-full max-w-6xl">
          <DashboardMockup />
        </div>
      </div>
    </Section>
  );
}

/* ---------- Problema (bento) ---------- */

function Problema() {
  const items = [
    {
      icon: Layers,
      title: "Información dispersa",
      text: "Datos de tus emprendedores repartidos entre chats, hojas y memoria.",
      span: "md:col-span-2",
      accent: "var(--orange-brand)",
    },
    {
      icon: MessagesSquare,
      title: "Seguimiento frágil",
      text: "Depende de notas sueltas y conversaciones que se pierden.",
      span: "md:col-span-1",
      accent: "var(--lilac)",
    },
    {
      icon: ScanSearch,
      title: "Sin visibilidad real",
      text: "Es difícil saber el avance real de cada emprendimiento.",
      span: "md:col-span-1",
      accent: "var(--color-neon)",
    },
    {
      icon: Clock,
      title: "Preparar mentorías toma demasiado",
      text: "Repasar contexto antes de cada sesión consume tiempo valioso.",
      span: "md:col-span-2",
      accent: "var(--color-neon)",
    },
    {
      icon: AlertTriangle,
      title: "Menos espacio estratégico",
      text: "Lo operativo te quita energía para aportar valor real.",
      span: "md:col-span-3",
      accent: "var(--orange-brand)",
    },
  ];

  return (
    <Section id="problema">
      <div className="flex flex-col items-center text-center mb-14">
        <Eyebrow>El problema</Eyebrow>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-5 max-w-3xl text-balance text-3xl md:text-5xl font-bold tracking-tight"
        >
          Lo que hoy hace difícil <span className="text-[var(--color-neon)]">mentorear bien</span>.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-white/10 transition ${it.span}`}
          >
            <div
              className="absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
              style={{ background: it.accent }}
            />
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40"
              style={{ color: it.accent }}
            >
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {it.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Solución ---------- */

function Solucion() {
  return (
    <Section id="solucion">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow>La solución</Eyebrow>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 text-balance text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
          >
            Un sistema que <span className="text-[var(--color-neon)]">organiza</span> y{" "}
            <span className="text-[var(--lilac)]">potencia</span> tu mentoría.
          </motion.h2>
          <p className="mt-6 text-base md:text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
            Creaty centraliza la información de tus emprendedores, automatiza el seguimiento
            y genera recomendaciones personalizadas para cada mentoría.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              { i: Layers, t: "Centralización de datos" },
              { i: TrendingUp, t: "Seguimiento automático" },
              { i: Brain, t: "Recomendaciones IA" },
              { i: Target, t: "Decisiones estratégicas" },
            ].map((f) => (
              <div
                key={f.t}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <f.i className="h-4 w-4 text-[var(--color-neon)]" />
                <span className="text-sm">{f.t}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-8 -z-10 bg-[var(--color-neon)]/10 blur-3xl rounded-full" />
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">
                Mapa de proceso · Ana Rivera
              </div>
              <div className="text-xs text-[var(--color-neon)]">78%</div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { l: "Idea & validación", p: 100, done: true },
                { l: "Validación de problema", p: 100, done: true },
                { l: "Pricing & willingness-to-pay", p: 65, active: true },
                { l: "MVP & primeros usuarios", p: 30 },
                { l: "Tracción & métricas", p: 0 },
              ].map((s, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        s.active
                          ? "text-[var(--color-neon)] font-medium"
                          : s.done
                          ? "text-[var(--color-foreground)]"
                          : "text-[var(--color-muted-foreground)]"
                      }
                    >
                      {s.done && "✓ "}{s.l}
                    </span>
                    <span className="font-mono text-[var(--color-muted-foreground)]">{s.p}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.p}%`,
                        background: s.active
                          ? "linear-gradient(90deg, var(--color-neon), #b8cc00)"
                          : s.done
                          ? "rgba(229,254,0,0.4)"
                          : "rgba(255,255,255,0.15)",
                        boxShadow: s.active ? "0 0 12px rgba(229,254,0,0.5)" : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[var(--color-neon)]/20 bg-[var(--color-neon)]/5 p-4">
              <div className="flex items-center gap-2 text-xs text-[var(--color-neon)] font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> Próxima acción sugerida
              </div>
              <p className="mt-1.5 text-sm">
                Diseñar 3 hipótesis de pricing con plantilla y validar en 5 entrevistas esta semana.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Cómo funciona ---------- */

function Como() {
  const steps = [
    {
      n: "01",
      icon: Compass,
      t: "Diagnóstico",
      d: "Entiende tu forma de mentorear, el estado real de cada emprendimiento que acompañas y sus particularidades.",
      color: "var(--color-neon)",
    },
    {
      n: "02",
      icon: ListChecks,
      t: "Seguimiento",
      d: "Registra avances y mantiene todo actualizado automáticamente.",
      color: "var(--lilac)",
    },
    {
      n: "03",
      icon: Lightbulb,
      t: "Recomendaciones",
      d: "Recibe sugerencias para orientar mejor cada mentoría.",
      color: "var(--orange-brand)",
    },
  ];

  return (
    <Section id="como" className="relative">
      <div className="absolute inset-0 -z-10 grid-bg radial-fade opacity-30" />
      <div className="flex flex-col items-center text-center mb-16">
        <Eyebrow>Cómo funciona</Eyebrow>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-5 max-w-3xl text-balance text-3xl md:text-5xl font-bold tracking-tight"
        >
          Tres pasos. Una mentoría más inteligente.
        </motion.h2>
      </div>

      <div className="relative grid md:grid-cols-3 gap-6 md:gap-4">
        {/* connector */}
        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px neon-divider" />

        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative glass rounded-2xl p-7 hover:border-white/15 transition group"
          >
            <div
              className="absolute -top-px left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition"
              style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
            />
            <div className="flex items-start justify-between">
              <div
                className="text-5xl font-extrabold leading-none tracking-tighter opacity-90"
                style={{ color: s.color }}
              >
                {s.n}
              </div>
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}10` }}
              >
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Beneficios ---------- */

function Beneficios() {
  const benefits = [
    "Información clara y organizada en un solo lugar.",
    "Seguimiento real sin depender de memoria o chats.",
    "Mentorías mejor preparadas y más estratégicas.",
    "Menos carga operativa en tu día a día.",
    "Más impacto en cada emprendedor que acompañas.",
  ];
  return (
    <Section id="beneficios">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-2">
          <Eyebrow>Beneficios</Eyebrow>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 text-balance text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
          >
            Lo que <span className="text-[var(--color-neon)]">cambia</span> para ti.
          </motion.h2>
          <p className="mt-5 text-[var(--color-muted-foreground)] leading-relaxed max-w-md">
            Una práctica más enfocada, menos operativa y con mayor impacto medible
            en los emprendedores que acompañas.
          </p>
        </div>
        <ul className="lg:col-span-3 space-y-3">
          {benefits.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/10 transition"
            >
              <div className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-neon)] text-[#10110e] shadow-[0_0_18px_rgba(229,254,0,0.45)]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <span className="text-lg md:text-xl font-medium leading-snug">{b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Diferencial ---------- */

function Diferencial() {
  const others = [
    "Solo almacena datos",
    "Necesita actualizarlo manualmente",
    "Estructura genérica de tareas",
    "Sin contexto del proceso emprendedor",
    "Te deja con más trabajo operativo",
  ];
  const ours = [
    "Entiende el proceso emprendedor",
    "Se actualiza automáticamente",
    "Adaptado a cada etapa de la empresa",
    "Recomendaciones contextualizadas con IA",
    "Te libera para aportar valor estratégico",
  ];

  return (
    <Section id="diferencial">
      <div className="flex flex-col items-center text-center mb-14">
        <Eyebrow>Diferencial</Eyebrow>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-5 max-w-3xl text-balance text-3xl md:text-5xl font-bold tracking-tight"
        >
          No es solo <span className="line-through decoration-[var(--orange-brand)]/70 decoration-[3px]">seguimiento</span>.
        </motion.h2>
        <p className="mt-5 max-w-2xl text-[var(--color-muted-foreground)] leading-relaxed">
          Creaty no es una hoja de cálculo ni un gestor de tareas. Es un sistema que entiende
          el proceso emprendedor y te ayuda a tomar mejores decisiones en cada etapa
          de las empresas que acompañas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/5 bg-white/[0.015] p-7"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">
            Otros sistemas
          </div>
          <div className="mt-5 space-y-3">
            {others.map((o) => (
              <div key={o} className="flex items-start gap-3 text-sm text-[var(--color-muted-foreground)]">
                <X className="h-4 w-4 mt-0.5 text-[var(--orange-brand)] shrink-0" />
                {o}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[var(--color-neon)]/25 bg-gradient-to-br from-[var(--color-neon)]/8 via-transparent to-transparent p-7 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--color-neon)]/15 blur-3xl" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-neon)] relative">
            <Sparkles className="h-3.5 w-3.5" /> Creaty
          </div>
          <div className="mt-5 space-y-3 relative">
            {ours.map((o) => (
              <div key={o} className="flex items-start gap-3 text-sm font-medium">
                <Check className="h-4 w-4 mt-0.5 text-[var(--color-neon)] shrink-0" strokeWidth={3} />
                {o}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Prueba social ---------- */

function PruebaSocial() {
  const stats = [
    { v: "+120", l: "Mentores en lista de espera" },
    { v: "15h", l: "Ahorro promedio / mes" },
    { v: "3x", l: "Mayor claridad de avance" },
    { v: "97%", l: "Recomendarían Creaty" },
  ];
  const logos = ["Endeavor", "Aceler.lab", "Impulsa", "Wayra Co", "Mentor+", "FoundersHub"];

  return (
    <Section>
      <div className="flex flex-col items-center text-center mb-12">
        <Eyebrow>Construido con experiencia</Eyebrow>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-5 max-w-3xl text-balance text-2xl md:text-3xl font-medium leading-snug text-[var(--color-foreground)]"
        >
          Diseñado por personas con experiencia acompañando emprendedores y procesos
          de <span className="text-[var(--color-neon)]">mentoría empresarial</span>.
        </motion.p>
      </div>

      {/* logos */}
      <div className="mx-auto grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center opacity-60 mb-16">
        {logos.map((l) => (
          <div
            key={l}
            className="text-center text-sm md:text-base font-semibold tracking-wide text-[var(--color-muted-foreground)] hover:text-white transition"
          >
            {l}
          </div>
        ))}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-neon)]">{s.v}</div>
            <div className="mt-1 text-xs md:text-sm text-[var(--color-muted-foreground)]">{s.l}</div>
          </motion.div>
        ))}
      </div>

      {/* testimonios */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n: "Camila Restrepo",
            r: "Mentora · Aceleradora regional",
            q: "Por fin tengo un solo lugar donde ver dónde está cada emprendedor sin volverme loca con chats.",
            c: "var(--color-neon)",
          },
          {
            n: "Andrés Quintero",
            r: "Director de programa",
            q: "Las recomendaciones de Creaty me ayudaron a enfocar mentorías que antes eran demasiado generales.",
            c: "var(--lilac)",
          },
          {
            n: "Valeria Ortiz",
            r: "Mentora independiente",
            q: "Preparar cada sesión ahora me toma minutos. Llego con claridad y agrego mucho más valor.",
            c: "var(--orange-brand)",
          },
        ].map((t, i) => (
          <motion.div
            key={t.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition"
          >
            <Quote className="h-5 w-5 text-[var(--color-neon)]" />
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-foreground)]">
              "{t.q}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full grid place-items-center text-xs font-bold text-black"
                style={{ background: t.c }}
              >
                {t.n.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{t.n}</div>
                <div className="text-[11px] text-[var(--color-muted-foreground)]">{t.r}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Waitlist Form ---------- */

function Waitlist() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("¡Estás dentro! Te avisaremos pronto.", {
        description: "Revisa tu correo para confirmar tu lugar.",
      });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <Section id="waitlist" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[var(--color-neon)]/10 blur-[140px]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <Eyebrow>Lista de espera</Eyebrow>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 text-balance text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]"
          >
            Sé parte de los primeros mentores en usar{" "}
            <span className="text-[var(--color-neon)] text-glow-neon">Creaty</span>.
          </motion.h2>
          <p className="mt-6 text-[var(--color-muted-foreground)] leading-relaxed max-w-md">
            Accede antes que nadie y sé parte de la construcción de una mejor forma
            de acompañar emprendedores.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
            <Users className="h-4 w-4 text-[var(--color-neon)]" />
            <span>+120 mentores ya en la lista</span>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 space-y-5"
        >
          <Field label="Nombre completo" name="nombre" placeholder="María García" required />
          <Field label="Correo" type="email" name="email" placeholder="maria@empresa.com" required />
          <Field label="Celular" type="tel" name="celular" placeholder="+57 300 000 0000" required />

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
              ¿Acompañas emprendedores actualmente?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Sí", "No"].map((v) => (
                <label
                  key={v}
                  className="cursor-pointer rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-center hover:border-[var(--color-neon)]/40 hover:bg-[var(--color-neon)]/5 transition has-[:checked]:border-[var(--color-neon)] has-[:checked]:bg-[var(--color-neon)]/10 has-[:checked]:text-[var(--color-neon)]"
                >
                  <input type="radio" name="acompana" value={v} required className="sr-only" />
                  {v}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
              ¿Qué es lo que más te cuesta hoy en tus mentorías?
            </label>
            <textarea
              name="reto"
              rows={4}
              required
              placeholder="Cuéntanos brevemente..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm placeholder:text-[var(--color-muted-foreground)]/60 outline-none focus:border-[var(--color-neon)]/60 focus:bg-black/40 focus:shadow-[0_0_0_4px_rgba(229,254,0,0.08)] transition resize-none"
            />
          </div>

          <NeonButton type="submit" className="w-full !py-4">
            {submitting ? "Enviando..." : submitted ? "¡Estás dentro! ✓" : "Únete a la lista de espera"}
            {!submitting && !submitted && (
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            )}
          </NeonButton>

          <p className="text-center text-[11px] text-[var(--color-muted-foreground)]">
            Sin spam. Solo te avisamos cuando Creaty esté listo para ti.
          </p>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm placeholder:text-[var(--color-muted-foreground)]/60 outline-none focus:border-[var(--color-neon)]/60 focus:bg-black/40 focus:shadow-[0_0_0_4px_rgba(229,254,0,0.08)] transition"
      />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-10 lg:px-16 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Logo />
          <span className="text-xs text-[var(--color-muted-foreground)]">
            Crea. Construye. Evoluciona.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[var(--color-muted-foreground)]">
          <a href="#" className="hover:text-white transition">Privacidad</a>
          <a href="#" className="hover:text-white transition">Términos</a>
          <span>© {new Date().getFullYear()} Creaty</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function Landing() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
      <Navbar />
      <Hero />
      <Problema />
      <Solucion />
      <Como />
      <Beneficios />
      <Diferencial />
      <PruebaSocial />
      <Waitlist />
      <Footer />
    </main>
  );
}
