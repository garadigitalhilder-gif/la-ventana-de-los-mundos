import { Link, useParams } from 'react-router-dom';
import { books } from '../data/books.js';
import { useStudent } from '../context/StudentContext.jsx';

const passingScore = 70;

const levels = [
  {
    id: 'literal',
    title: 'Nivel Literal',
    description: 'Reconoce información explícita, personajes, hechos y detalles del cuento.',
    requirement: null,
  },
  {
    id: 'inferencial',
    title: 'Nivel Inferencial',
    description: 'Deduce ideas, interpreta situaciones y conecta pistas del texto.',
    requirement: 'Aprueba el Nivel Literal para desbloquearlo.',
  },
  {
    id: 'critico',
    title: 'Nivel Crítico',
    description: 'Evalúa el sentido del cuento y expresa una postura argumentada.',
    requirement: 'Aprueba el Nivel Inferencial para desbloquearlo.',
  },
];

function getLevelKey(bookId, levelId) {
  return `${bookId}-${levelId}`;
}

function isLevelApproved({ bookId, levelId, grades, completedLevels }) {
  const levelKey = getLevelKey(bookId, levelId);

  return (
    completedLevels.includes(levelKey) ||
    grades.some((grade) => {
      const matchesBook = grade.bookId === bookId;
      const matchesLevel = grade.level === levelId || grade.levelId === levelId;
      const approved = grade.approved === true || grade.passed === true || grade.score >= passingScore;

      return matchesBook && matchesLevel && approved;
    })
  );
}

export default function LevelSelection() {
  const { bookId } = useParams();
  const { grades, completedLevels } = useStudent();
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-8">
          <h1 className="break-words text-3xl font-black">Cuento no encontrado</h1>
          <Link className="mt-6 inline-flex min-h-11 items-center font-bold text-teal-700" to="/evaluations">
            Volver a evaluaciones
          </Link>
        </section>
      </main>
    );
  }

  const literalApproved = isLevelApproved({
    bookId,
    levelId: 'literal',
    grades,
    completedLevels,
  });
  const inferentialApproved = isLevelApproved({
    bookId,
    levelId: 'inferencial',
    grades,
    completedLevels,
  });

  const unlockedLevels = {
    literal: true,
    inferencial: literalApproved,
    critico: inferentialApproved,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
            Selección de nivel
          </p>
          <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">{book.title}</h1>
          <p className="mt-4 max-w-3xl break-words text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Elige el nivel de comprensión lectora. Los niveles avanzados se desbloquean al
            aprobar el nivel anterior.
          </p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((level, index) => {
            const unlocked = unlockedLevels[level.id];
            const approved = isLevelApproved({ bookId, levelId: level.id, grades, completedLevels });

            const card = (
              <article
                className={`flex min-h-[250px] flex-col justify-between rounded-3xl p-5 ring-1 transition sm:min-h-[290px] sm:p-7 ${
                  unlocked
                    ? 'bg-white shadow-lg shadow-slate-200 ring-slate-200 hover:-translate-y-1 hover:shadow-xl'
                    : 'bg-slate-100 opacity-75 ring-slate-200'
                }`}
              >
                <div className="min-w-0">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black ${
                      unlocked ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="break-words text-2xl font-black leading-tight text-slate-950">
                      {level.title}
                    </h2>
                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        approved
                          ? 'bg-emerald-100 text-emerald-700'
                          : unlocked
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {approved ? 'Aprobado' : unlocked ? 'Desbloqueado' : 'Bloqueado'}
                    </span>
                  </div>
                  <p className="mt-4 break-words leading-7 text-slate-600">{level.description}</p>
                  {!unlocked ? (
                    <p className="mt-5 break-words rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-600">
                      {level.requirement}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 font-bold text-teal-700">
                  {unlocked ? 'Comenzar evaluación ->' : 'Nivel no disponible'}
                </div>
              </article>
            );

            return unlocked ? (
              <Link
                key={level.id}
                to={`/quiz/${bookId}/${level.id}`}
                className="block rounded-3xl focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                {card}
              </Link>
            ) : (
              <div key={level.id} aria-disabled="true">
                {card}
              </div>
            );
          })}
        </section>

        <Link
          to="/evaluations"
          className="mt-8 inline-flex min-h-11 rounded-2xl border border-slate-300 px-6 py-4 font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
        >
          Volver a evaluaciones
        </Link>
      </section>
    </main>
  );
}
