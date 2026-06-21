import payasoText from '../assets/books/payaso.txt?raw';
import acaciaText from '../assets/books/acacia.txt?raw';

export const books = [
  {
    id: 'payaso',
    title: 'Hoy decidí vestirme de payaso',
    author: 'Álvaro Cepeda Samudio',
    summary:
      'Un hombre que decide vestirse de payaso se integra a un circo sin pertenecer realmente a él. Mientras los demás cumplen sus papeles, él busca comprender el mundo que lo rodea, establecer contacto con una joven amazona y encontrar a alguien que toque una guitarra verde. Su comportamiento rompe las reglas implícitas del espectáculo y evidencia su condición de extraño frente a una realidad que no logra comprender del todo.',
    context:
      'Álvaro Cepeda Samudio fue una figura clave de la narrativa colombiana del siglo XX. Su obra se relaciona con búsquedas modernas en el cuento, el lenguaje cotidiano y la representación de personajes en tensión con su entorno.',
    themes: [
      'Identidad',
      'Soledad',
      'Inadaptación social',
      'Búsqueda de sentido',
      'Apariencia y realidad',
      'Libertad individual',
    ],
    characters: [
      'Narrador',
      'Muchacha de los caballos',
      'Director del circo',
      'Payaso de la nariz morada',
      'Hombre de la casaca roja',
      'Sammy',
    ],
    fullText: payasoText,
  },
  {
    id: 'acacia',
    title: 'La muerte de la acacia',
    author: 'Marvel Moreno',
    summary:
      'La caída de una antigua acacia provoca una conmoción en la ciudad y revive viejas historias relacionadas con doña Genoveva, don Federico y Daniel González. A través de los recuerdos y rumores de los habitantes se reconstruyen décadas de conflictos, secretos, prejuicios y relaciones de poder, mientras la acacia funciona como símbolo de memoria, permanencia y transformación.',
    context:
      'Marvel Moreno fue una escritora colombiana reconocida por su mirada crítica sobre la sociedad, la vida íntima y las estructuras familiares y culturales. Su narrativa permite analizar símbolos, conflictos y voces femeninas con gran profundidad.',
    themes: [
      'Memoria colectiva',
      'Poder social',
      'Tradición',
      'Apariencias',
      'Exclusión',
      'Condición femenina',
      'Simbolismo de la naturaleza',
    ],
    characters: [
      'Doña Genoveva',
      'Don Federico Caicedo',
      'Daniel González',
      'Padre Sixtino',
      'Padre Justo',
      'Hermana natural de doña Genoveva',
      'Habitantes del Prado',
    ],
    fullText: acaciaText,
  },
];
