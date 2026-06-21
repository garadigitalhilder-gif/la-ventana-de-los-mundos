import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { books } from '../data/books.js';
import { questions } from '../data/questions.js';

const levelLabels = {
  literal: 'Nivel Literal',
  inferencial: 'Nivel Inferencial',
  critico: 'Nivel Crítico',
};

function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

function createQuizAttempt(quizQuestions) {
  return shuffle(quizQuestions).map((question) => ({
    ...question,
    options: shuffle(question.options),
  }));
}

export default function Quiz() {
  const { bookId, level } = useParams();
  const navigate = useNavigate();
  const resultSent = useRef(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasConsultedStory, setHasConsultedStory] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState([]);

  const book = books.find((item) => item.id === bookId);
  const quizQuestions = useMemo(() => questions[bookId]?.[level] ?? [], [bookId, level]);
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const totalQuestions = activeQuestions.length;
  const progressPercentage = totalQuestions
    ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
    : 0;

  useEffect(() => {
    if (!answered) {
      return undefined;
    }

    const timer = setTimeout(() => {
      if (currentQuestionIndex + 1 >= totalQuestions) {
        setIsFinished(true);
        return;
      }

      setCurrentQuestionIndex((index) => index + 1);
      setSelectedAnswer('');
      setFeedback('');
      setAnswered(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [answered, currentQuestionIndex, totalQuestions]);

  useEffect(() => {
    if (!isFinished || !totalQuestions || resultSent.current) {
      return;
    }

    const incorrectCount = totalQuestions - correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const resultId = `${bookId}-${level}-${Date.now()}`;

    resultSent.current = true;

    navigate('/result', {
      replace: true,
      state: {
        resultId,
        bookId,
        level,
        bookTitle: book?.title,
        totalQuestions,
        correctCount,
        incorrectCount,
        percentage,
        score: percentage,
      },
    });
  }, [book?.title, bookId, correctCount, isFinished, level, navigate, totalQuestions]);

  function handleAnswer(option) {
    if (answered || !currentQuestion) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;

    setSelectedAnswer(option);
    setFeedback(isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect);
    setAnswered(true);

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  }

  function handleStartQuiz() {
    setActiveQuestions(createQuizAttempt(quizQuestions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setFeedback('');
    setCorrectCount(0);
    setAnswered(false);
    setIsFinished(false);
    resultSent.current = false;
    setQuizStarted(true);
    setHasConsultedStory(false);
  }

  if (!book || !levelLabels[level]) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-8">
          <h1 className="break-words text-3xl font-black">Evaluación no encontrada</h1>
          <Link className="mt-6 inline-flex min-h-11 items-center font-bold text-teal-700" to="/evaluations">
            Volver a evaluaciones
          </Link>
        </section>
      </main>
    );
  }

  if (!quizQuestions.length) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
            {levelLabels[level]}
          </p>
          <h1 className="mt-4 break-words text-3xl font-black">{book.title}</h1>
          <p className="mt-4 break-words leading-7 text-slate-600">
            Todavía no hay preguntas disponibles para este nivel.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-teal-700"
            to={`/evaluation/${bookId}`}
          >
            Volver a niveles
          </Link>
        </section>
      </main>
    );
  }

  if (!quizStarted) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
        <section className="mx-auto max-w-5xl">
          <header className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
              {levelLabels[level]}
            </p>
            <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">{book.title}</h1>
            <p className="mt-4 max-w-3xl break-words text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Antes de iniciar la evaluación puedes consultar la información principal del cuento.
              Una vez iniciada, no podrás volver a consultarla.
            </p>
          </header>

          <section className="mt-8 rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
            {!hasConsultedStory ? (
              <div className="text-center">
                <h2 className="break-words text-2xl font-black sm:text-3xl">Consultar cuento</h2>
                <p className="mx-auto mt-4 max-w-2xl break-words leading-7 text-slate-600">
                  Revisa el resumen, los personajes y las temáticas antes de responder.
                </p>
                <button
                  type="button"
                  onClick={() => setHasConsultedStory(true)}
                  className="mt-8 min-h-11 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-teal-700"
                >
                  Consultar cuento
                </button>
              </div>
            ) : (
              <div>
                <div className="grid gap-5 md:grid-cols-2">
                  <article className="rounded-3xl bg-sky-50 p-5 ring-1 ring-sky-100 sm:p-6 md:col-span-2">
                    <h2 className="text-xl font-black text-slate-950">Resumen</h2>
                    <p className="mt-3 break-words leading-7 text-slate-700">{book.summary}</p>
                  </article>

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

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="mt-8 min-h-11 w-full rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-teal-700 sm:w-auto"
                >
                  Iniciar evaluación
                </button>
              </div>
            )}
          </section>
        </section>
      </main>
    );
  }

  if (isFinished) {
    return <main className="min-h-screen bg-[#f6f8fb]" />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <header className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 sm:text-sm sm:tracking-[0.24em]">
                {levelLabels[level]}
              </p>
              <h1 className="mt-4 break-words text-3xl font-black sm:text-5xl">{book.title}</h1>
            </div>
            <div className="w-fit rounded-2xl bg-teal-100 px-5 py-3 text-sm font-black text-teal-800">
              Correctas: {correctCount}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-600">
              <span>
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </header>

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-xl shadow-slate-200 ring-1 ring-slate-200 sm:p-7 lg:p-10">
          <h2 className="break-words text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-8 grid gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = answered && isCorrect;
              const showIncorrect = answered && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  type="button"
                  disabled={answered}
                  onClick={() => handleAnswer(option)}
                  className={`min-h-11 rounded-2xl border px-5 py-4 text-left font-semibold transition ${
                    showCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : showIncorrect
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-teal-400 hover:bg-teal-50'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className="break-words">{option}</span>
                </button>
              );
            })}
          </div>

          {feedback ? (
            <div
              className={`mt-8 break-words rounded-3xl p-5 font-semibold leading-7 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100'
                  : 'bg-red-50 text-red-700 ring-1 ring-red-100'
              }`}
            >
              {feedback}
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
