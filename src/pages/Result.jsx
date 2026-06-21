import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStudent } from '../context/StudentContext.jsx';

const levelLabels = {
  literal: 'Nivel Literal',
  inferencial: 'Nivel Inferencial',
  critico: 'Nivel Crítico',
};

function getFeedback(percentage) {
  if (percentage >= 90) {
    return 'Excelente';
  }

  if (percentage >= 70) {
    return 'Bueno';
  }

  if (percentage >= 50) {
    return 'Regular';
  }

  return 'Debe reforzar';
}

export default function Result() {
  const { state } = useLocation();
  const { saveGrade, completeLevel } = useStudent();
  const savedResult = useRef(false);

  useEffect(() => {
    if (!state || savedResult.current) {
      return;
    }

    const approved = state.percentage >= 70;
    const grade = {
      id: state.resultId || `${state.bookId}-${state.level}-${Date.now()}`,
      bookId: state.bookId,
      bookTitle: state.bookTitle,
      level: state.level,
      score: state.score,
      percentage: state.percentage,
      correctCount: state.correctCount,
      incorrectCount: state.incorrectCount,
      totalQuestions: state.totalQuestions,
      approved,
      date: new Date().toISOString(),
    };

    saveGrade(grade);

    if (approved) {
      completeLevel(`${state.bookId}-${state.level}`);
    }

    savedResult.current = true;
  }, [completeLevel, saveGrade, state]);

  if (!state) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-8">
          <h1 className="break-words text-3xl font-black">No hay resultado disponible</h1>
          <p className="mt-4 break-words leading-7 text-slate-600">
            Completa una evaluación para generar tu resultado.
          </p>
          <Link
            to="/evaluations"
            className="mt-6 inline-flex min-h-11 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-teal-700"
          >
            Ir a evaluaciones
          </Link>
        </section>
      </main>
    );
  }

  const feedback = getFeedback(state.percentage);
  const approved = state.percentage >= 70;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <header className="rounded-3xl bg-white p-5 text-center shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
            Resultado
          </p>
          <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">{state.bookTitle}</h1>
          <p className="mt-4 break-words text-base font-semibold text-slate-700 sm:text-lg">
            {levelLabels[state.level] || state.level}
          </p>

          <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-teal-100 text-4xl font-black text-teal-800 sm:h-40 sm:w-40 sm:text-5xl">
            {state.percentage}%
          </div>

          <p
            className={`mx-auto mt-6 inline-flex rounded-full px-5 py-2 text-sm font-black ${
              approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {feedback}
          </p>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Puntaje</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{state.score}</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Correctas</p>
            <p className="mt-3 text-3xl font-black text-emerald-700">{state.correctCount}</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Incorrectas</p>
            <p className="mt-3 text-3xl font-black text-red-600">{state.incorrectCount}</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Porcentaje</p>
            <p className="mt-3 text-3xl font-black text-teal-700">{state.percentage}%</p>
          </article>
        </section>

        {approved ? (
          <section className="mt-8 rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-100 sm:p-6">
            <h2 className="text-xl font-black text-emerald-800">Nivel aprobado</h2>
            <p className="mt-3 break-words leading-7 text-emerald-800">
              Tu avance fue guardado y el siguiente nivel quedó desbloqueado.
            </p>
          </section>
        ) : (
          <section className="mt-8 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100 sm:p-6">
            <h2 className="text-xl font-black text-amber-800">Sigue practicando</h2>
            <p className="mt-3 break-words leading-7 text-amber-800">
              Tu resultado fue guardado. Para desbloquear el siguiente nivel necesitas 70% o más.
            </p>
          </section>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/evaluation/${state.bookId}`}
            className="min-h-11 rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white transition hover:bg-teal-700"
          >
            Volver a niveles
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
