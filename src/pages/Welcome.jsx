import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext.jsx';

export default function Welcome() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setStudentName } = useStudent();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Escribe tu nombre para comenzar.');
      return;
    }

    setStudentName(trimmedName);
    navigate('/dashboard');
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7fbff] text-slate-950">
      <section className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-sky-100 ring-1 ring-slate-200 sm:rounded-[2rem]"
        >
          <div className="grid lg:min-h-[620px] lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="flex min-w-0 flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.28em]">
                Comprensión lectora
              </p>
              <h1 className="break-words text-3xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                LA VENTANA DE LOS MUNDOS
              </h1>
              <p className="mt-6 max-w-xl break-words text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Explora nuevas historias, desarrolla tu pensamiento y fortalece tu comprensión
                lectora.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md sm:mt-10">
                <label htmlFor="studentName" className="text-sm font-semibold text-slate-700">
                  Nombre del estudiante
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError('');
                  }}
                  placeholder="Escribe tu nombre"
                  className="mt-3 min-h-11 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-medium text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
                {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  className="mt-6 min-h-11 w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
                >
                  Comenzar
                </button>
              </form>
            </div>

            <div className="relative hidden overflow-hidden bg-[#0f766e] lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,#fde68a_0,transparent_26%),radial-gradient(circle_at_80%_10%,#93c5fd_0,transparent_24%),linear-gradient(135deg,#0f766e,#1e293b)]" />
              <div className="relative flex h-full items-center justify-center p-12">
                <div className="grid h-[420px] w-[420px] grid-cols-2 gap-5">
                  <div className="rounded-3xl bg-white/95 p-6 shadow-xl">
                    <div className="h-16 rounded-2xl bg-amber-200" />
                    <div className="mt-6 h-3 w-24 rounded-full bg-slate-300" />
                    <div className="mt-3 h-3 w-32 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-12 rounded-3xl bg-sky-100 p-6 shadow-xl">
                    <div className="h-24 rounded-2xl bg-sky-300" />
                    <div className="mt-6 h-3 w-28 rounded-full bg-slate-300" />
                    <div className="mt-3 h-3 w-20 rounded-full bg-slate-200" />
                  </div>
                  <div className="rounded-3xl bg-emerald-100 p-6 shadow-xl">
                    <div className="h-20 rounded-2xl bg-emerald-300" />
                    <div className="mt-6 h-3 w-20 rounded-full bg-slate-300" />
                    <div className="mt-3 h-3 w-32 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-12 rounded-3xl bg-white/95 p-6 shadow-xl">
                    <div className="h-16 rounded-2xl bg-rose-200" />
                    <div className="mt-6 h-3 w-28 rounded-full bg-slate-300" />
                    <div className="mt-3 h-3 w-24 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
