import { Link } from 'react-router-dom';
import { BookMarked, BookOpen } from 'lucide-react';
import { books } from '../data/books.js';

const bookIcons = {
  payaso: BookOpen,
  acacia: BookMarked,
};

export default function EvaluationHome() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
            Evaluaciones
          </p>
          <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">
            Selecciona un cuento para comenzar.
          </h1>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {books.map((book) => {
            const Icon = bookIcons[book.id] || BookOpen;

            return (
              <Link
                key={book.id}
                to={`/evaluation/${book.id}`}
                className="group flex min-h-[220px] flex-col justify-between rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-200 sm:min-h-[260px] sm:p-7"
              >
                <div className="min-w-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 transition duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                    <Icon className="h-7 w-7 stroke-[2.4] sm:h-8 sm:w-8" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 break-words text-xl font-black leading-tight text-slate-950 sm:text-2xl">
                    {book.title}
                  </h2>
                  <p className="mt-3 break-words font-semibold text-slate-700">{book.author}</p>
                  <p className="mt-4 line-clamp-3 break-words text-sm leading-7 text-slate-600 sm:text-base">
                    {book.summary}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 text-sm font-bold text-teal-700">
                  <span>Seleccionar cuento</span>
                  <span className="transition group-hover:translate-x-1">-&gt;</span>
                </div>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}
