export const badges = [
  {
    id: 'lector-inicial',
    icon: '🌱',
    name: 'Lector Inicial',
    description: 'Completa tu primer nivel de evaluación.',
  },
  {
    id: 'lector-analitico',
    icon: '📚',
    name: 'Lector Analítico',
    description: 'Aprueba al menos un nivel inferencial.',
  },
  {
    id: 'lector-critico',
    icon: '🧠',
    name: 'Lector Crítico',
    description: 'Aprueba al menos un nivel crítico.',
  },
  {
    id: 'maestro-comprension',
    icon: '🏆',
    name: 'Maestro de la Comprensión',
    description: 'Completa todos los niveles disponibles.',
  },
];

export function getEarnedBadges(completedLevels) {
  const earnedBadges = [];

  if (completedLevels.length >= 1) {
    earnedBadges.push('lector-inicial');
  }

  if (completedLevels.some((level) => level.endsWith('-inferencial'))) {
    earnedBadges.push('lector-analitico');
  }

  if (completedLevels.some((level) => level.endsWith('-critico'))) {
    earnedBadges.push('lector-critico');
  }

  if (completedLevels.length >= 6) {
    earnedBadges.push('maestro-comprension');
  }

  return earnedBadges;
}
