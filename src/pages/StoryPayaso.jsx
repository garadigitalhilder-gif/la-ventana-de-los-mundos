import { Link } from 'react-router-dom';
import { books } from '../data/books.js';

const book = books.find((item) => item.id === 'payaso');

export default function StoryPayaso() {
  if (!book) {
    return <main className="p-6 sm:p-8">Cuento no encontrado.</main>;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 sm:text-sm sm:tracking-[0.24em]">
            Lectura
          </p>
          <h1 className="mt-4 break-words text-3xl font-black leading-tight sm:text-5xl">
            {book.title}
          </h1>
          <p className="mt-4 break-words text-base font-semibold text-slate-700 sm:text-lg">
            Autor: {book.author}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100 sm:p-6">
              <h2 className="text-xl font-black text-slate-950">Contexto</h2>
              <p className="mt-3 break-words text-sm leading-7 text-slate-700 sm:text-base">
                {book.context}
              </p>
            </article>

            <article className="rounded-3xl bg-sky-50 p-5 ring-1 ring-sky-100 sm:p-6">
              <h2 className="text-xl font-black text-slate-950">Resumen</h2>
              <p className="mt-3 break-words text-sm leading-7 text-slate-700 sm:text-base">
                {book.summary}
              </p>
            </article>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-xl font-black text-slate-950">Personajes</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {book.characters.map((character) => (
                  <li
                    key={character}
                    className="break-words rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {character}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-xl font-black text-slate-950">Temáticas</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {book.themes.map((theme) => (
                  <li
                    key={theme}
                    className="break-words rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800"
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <section id="fullText" className="mt-6 rounded-3xl bg-slate-950 p-4 text-white sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-black">Cuento completo</h2>
              <p className="mt-4 whitespace-pre-line break-words text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
                {book.fullText || 'El cuento completo se agregará próximamente.'}
              </p>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#fullText"
              className="min-h-11 rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white transition hover:bg-teal-700"
            >
              Leer cuento completo
            </a>
            <Link
              to="/dashboard"
              className="min-h-11 rounded-2xl border border-slate-300 px-6 py-4 text-center font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
