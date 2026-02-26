// src/pages/NotFoundPage.tsx o donde prefieras ubicarlo
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="p-4 items-center justify-center flex flex-col h-screen">
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
};