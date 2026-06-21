import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { badges as availableBadges } from '../data/badges.js';
import { useStudent } from '../context/StudentContext.jsx';

const totalLevels = 6;

export default function Profile() {
  const { studentName, grades, completedLevels, badges } = useStudent();
  const totalEvaluations = grades.length;
  const accumulatedScore = grades.reduce((sum, grade) => sum + (grade.score ?? grade.percentage ?? 0), 0);
  const average = totalEvaluations ? Math.round(accumulatedScore / totalEvaluations) : 0;
  const progressPercentage = Math.min(Math.round((completedLevels.length / totalLevels) * 100), 100);
  const earnedBadges = availableBadges.filter((badge) => badges.includes(badge.id));

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-8 sm:py-8 lg:px-10">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-200 sm:rounded-[2rem]">
          <div className="grid gap-6 px-5 py-7 sm:px-10 sm:py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-12 lg:py-10 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200 sm:text-sm sm:tracking-[0.24em]">
                La Ventana de los Mundos
              </p>
              <h1 className="mt-4 break-words text-3xl font-black leading-tight sm:text-5xl">
                {studentName || 'Estudiante'}
              </h1>
              <p className="mt-4 max-w-2xl break-words text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Tu biblioteca interactiva guarda cada lectura, cada nivel aprobado y cada insignia
                ganada en el camino.
              </p>
            </div>

            <div className="relative min-h-[190px] overflow-hidden rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 sm:min-h-[240px] sm:p-6">
              <div className="absolute inset-x-5 bottom-6 h-4 rounded-full bg-amber-300 sm:inset-x-6" />
              <div className="absolute bottom-10 left-6 h-24 w-10 rounded-t-lg bg-sky-300 sm:left-8 sm:h-28 sm:w-12" />
              <div className="absolute bottom-10 left-20 h-32 w-10 rounded-t-lg bg-rose-300 sm:left-24 sm:h-36 sm:w-12" />
              <div className="absolute bottom-10 left-[8.5rem] h-20 w-10 rounded-t-lg bg-emerald-300 sm:left-40 sm:h-24 sm:w-12" />
              <div className="absolute bottom-10 left-48 h-28 w-10 rounded-t-lg bg-violet-300 sm:left-56 sm:h-32 sm:w-12" />
              <div className="relative">
                <p className="text-sm font-bold text-slate-200">Biblioteca personal</p>
                <p className="mt-2 text-4xl font-black">{progressPercentage}%</p>
                <p className="mt-1 text-sm text-slate-300">avance lector</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Puntaje acumulado</p>
            <p className="mt-3 break-words text-4xl font-black text-slate-950">{accumulatedScore}</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Niveles completados</p>
            <p className="mt-3 text-4xl font-black text-teal-700">
              {completedLevels.length}/{totalLevels}
            </p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Insignias obtenidas</p>
            <p className="mt-3 text-4xl font-black text-amber-600">{earnedBadges.length}</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Promedio general</p>
            <p className="mt-3 text-4xl font-black text-sky-700">{average}%</p>
          </article>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
                Porcentaje de avance
              </p>
              <h2 className="mt-3 break-words text-2xl font-black sm:text-3xl">
                Ruta de comprensión lectora
              </h2>
            </div>
            <p className="text-3xl font-black text-teal-700">{progressPercentage}%</p>
          </div>

          <div className="mt-7 h-5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-teal-500"
            />
          </div>
          <p className="mt-4 break-words text-sm font-semibold text-slate-600">
            {completedLevels.length} de {totalLevels} niveles completados.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
                Insignias
              </p>
              <h2 className="mt-3 break-words text-2xl font-black sm:text-3xl">
                Estantería de logros
              </h2>
            </div>
            <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
              {earnedBadges.length}/{availableBadges.length}
            </span>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableBadges.map((badge, index) => {
              const earned = badges.includes(badge.id);

              return (
                <motion.article
                  key={badge.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className={`rounded-3xl p-5 ring-1 sm:p-6 ${
                    earned
                      ? 'bg-teal-50 ring-teal-100'
                      : 'bg-slate-50 opacity-70 ring-slate-200'
                  }`}
                >
                  <div className="text-4xl">{badge.icon}</div>
                  <h3 className="mt-5 break-words text-lg font-black text-slate-950">{badge.name}</h3>
                  <p className="mt-3 break-words text-sm leading-6 text-slate-600">
                    {badge.description}
                  </p>
                  <p
                    className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-black ${
                      earned ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {earned ? 'Obtenida' : 'Pendiente'}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/evaluations"
            className="min-h-11 rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white transition hover:bg-teal-700"
          >
            Ir a evaluaciones
          </Link>
          <Link
            to="/dashboard"
            className="min-h-11 rounded-2xl border border-slate-300 px-6 py-4 text-center font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
