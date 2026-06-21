import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookMarked, BookOpen, ClipboardCheck, GraduationCap, UserCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext.jsx';

const progressGoal = 6;

const dashboardCards = [
  {
    title: 'Hoy decidí vestirme de payaso',
    description: 'Lee el cuento y abre una nueva ventana a la imaginación.',
    to: '/story/payaso',
    accent: 'bg-amber-100 text-amber-700',
    Icon: BookOpen,
  },
  {
    title: 'La muerte de la acacia',
    description: 'Explora una historia para pensar, inferir y conversar.',
    to: '/story/acacia',
    accent: 'bg-emerald-100 text-emerald-700',
    Icon: BookMarked,
  },
  {
    title: 'Sala de Evaluaciones',
    description: 'Elige una lectura y pon a prueba tu comprensión.',
    to: '/evaluations',
    accent: 'bg-sky-100 text-sky-700',
    Icon: ClipboardCheck,
  },
  {
    title: 'Registro de Notas',
    description: 'Consulta tus resultados y observa tu avance lector.',
    to: '/grades',
    accent: 'bg-rose-100 text-rose-700',
    Icon: GraduationCap,
  },
  {
    title: 'Mi Perfil',
    description: 'Revisa tu nombre, insignias y progreso personal.',
    to: '/profile',
    accent: 'bg-violet-100 text-violet-700',
    Icon: UserCircle,
  },
];

export default function Dashboard() {
  const { studentName, completedLevels } = useStudent();
  const completedCount = completedLevels.length;
  const progressPercentage = Math.min(Math.round((completedCount / progressGoal) * 100), 100);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-8 lg:px-10">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-200 sm:rounded-[2rem]">
          <div className="grid gap-6 px-5 py-7 sm:px-10 sm:py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12 lg:py-10">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200 sm:text-sm sm:tracking-[0.26em]">
                La Ventana de los Mundos
              </p>
              <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">
                Bienvenido {studentName || 'estudiante'}
              </h1>
              <p className="mt-4 max-w-2xl break-words text-base leading-7 text-slate-300 sm:text-lg">
                Continúa leyendo, resolviendo retos y descubriendo nuevas formas de comprender
                cada historia.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-200">Progreso general</span>
                <span className="text-2xl font-black text-white">{progressPercentage}%</span>
              </div>
              <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-teal-300 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-slate-300">
                {completedCount} de {progressGoal} niveles completados
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Link
                to={card.to}
                className="group flex min-h-[190px] flex-col justify-between rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-200 sm:min-h-[210px] sm:p-6 lg:min-h-[230px]"
              >
                <div className="min-w-0">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 sm:h-16 sm:w-16 ${card.accent}`}
                  >
                    <card.Icon className="h-7 w-7 stroke-[2.4] sm:h-8 sm:w-8" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 break-words text-xl font-black leading-tight text-slate-950 sm:text-2xl lg:text-[1.7rem]">
                    {card.title}
                  </h2>
                  <p className="mt-3 break-words text-sm leading-6 text-slate-600 sm:text-base">
                    {card.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm font-bold text-teal-700">
                  <span>Entrar</span>
                  <span className="transition group-hover:translate-x-1">-&gt;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </section>
    </main>
  );
}
