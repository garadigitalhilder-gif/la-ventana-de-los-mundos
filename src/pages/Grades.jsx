import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext.jsx';

const levelLabels = {
  literal: 'Nivel Literal',
  inferencial: 'Nivel Inferencial',
  critico: 'Nivel Crítico',
};

function formatDate(date) {
  if (!date) {
    return 'Sin fecha';
  }

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

export default function Grades() {
  const { studentName, grades } = useStudent();
  const totalEvaluations = grades.length;
  const average =
    totalEvaluations > 0
      ? Math.round(
          grades.reduce((sum, grade) => sum + (grade.score ?? grade.percentage ?? 0), 0) /
            totalEvaluations
        )
      : 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
            Registro de notas
          </p>
          <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">
            {studentName || 'Estudiante'}
          </h1>
          <p className="mt-4 max-w-3xl break-words text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Consulta tus evaluaciones realizadas y observa tu desempeño general.
          </p>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Promedio general</p>
            <p className="mt-3 text-4xl font-black text-teal-700">{average}%</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 sm:p-6">
            <p className="text-sm font-bold text-slate-500">Evaluaciones realizadas</p>
            <p className="mt-3 text-4xl font-black text-slate-950">{totalEvaluations}</p>
          </article>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200 ring-1 ring-slate-200">
          {totalEvaluations > 0 ? (
            <>
              <div className="grid gap-4 p-4 md:hidden">
                {grades.map((grade) => (
                  <article key={grade.id} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                          Cuento
                        </p>
                        <h2 className="mt-2 break-words text-lg font-black text-slate-950">
                          {grade.bookTitle || grade.bookId}
                        </h2>
                      </div>
                      <span className="w-fit rounded-full bg-teal-100 px-4 py-2 text-sm font-black text-teal-800">
                        {grade.score ?? grade.percentage ?? 0}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                          Nivel
                        </p>
                        <p className="mt-1 break-words font-semibold text-slate-800">
                          {levelLabels[grade.level] || grade.level}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                          Fecha
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">{formatDate(grade.date)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-6 py-5 text-sm font-black">Cuento</th>
                      <th className="px-6 py-5 text-sm font-black">Nivel</th>
                      <th className="px-6 py-5 text-sm font-black">Nota</th>
                      <th className="px-6 py-5 text-sm font-black">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade) => (
                      <tr key={grade.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-6 py-5 font-semibold text-slate-900">
                          {grade.bookTitle || grade.bookId}
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {levelLabels[grade.level] || grade.level}
                        </td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-black text-teal-800">
                            {grade.score ?? grade.percentage ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">{formatDate(grade.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="p-6 text-center sm:p-10">
              <h2 className="break-words text-2xl font-black">
                Todavía no hay evaluaciones registradas
              </h2>
              <p className="mx-auto mt-4 max-w-2xl break-words leading-7 text-slate-600">
                Cuando completes una evaluación, tus resultados aparecerán aquí.
              </p>
              <Link
                to="/evaluations"
                className="mt-6 inline-flex min-h-11 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-teal-700"
              >
                Ir a evaluaciones
              </Link>
            </div>
          )}
        </section>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex min-h-11 rounded-2xl border border-slate-300 px-6 py-4 font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
