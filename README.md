# La Ventana de los Mundos

La Ventana de los Mundos es una aplicación web educativa creada para fortalecer la comprensión lectora mediante cuentos, evaluación por niveles, gamificación y seguimiento del progreso estudiantil.

El proyecto permite que el estudiante lea cuentos completos, consulte información literaria clave, responda evaluaciones de comprensión y revise sus resultados, insignias y avance personal.

## Características

- Lectura interactiva de cuentos.
- Comprensión lectora guiada.
- Evaluación por niveles: literal, inferencial y crítico.
- Gamificación mediante insignias.
- Registro de notas y promedio general.
- Progreso persistente con LocalStorage.
- Responsive Design para móviles, tablets, laptops y escritorio.

## Tecnologías

- React
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Lucide React
- LocalStorage

## Instalación

```bash
npm install
npm run dev
```

La aplicación se ejecutará en el servidor local indicado por Vite.

## Producción

```bash
npm run build
```

El comando genera la carpeta `dist`, lista para despliegue.

## Despliegue

El proyecto está preparado para desplegarse en:

- GitHub
- Vercel
- Netlify

Para Vercel o Netlify, usa:

- Build command: `npm run build`
- Output directory: `dist`

## Estructura Principal

```text
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── pages/
├── App.jsx
├── main.jsx
└── styles.css
```
