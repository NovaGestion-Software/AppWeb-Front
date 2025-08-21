import { FaDesktop } from 'react-icons/fa';

export default function ViewportBlocker() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center space-y-4">
        <div className="flex justify-center">
          <FaDesktop className="w-14 h-14 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Pantalla no compatible</h2>
        <p className="text-base text-gray-300">
          Esta aplicación fue diseñada para resoluciones de escritorio (mínimo 600px de ancho).
        </p>
        <p className="text-sm text-gray-400">
          Por favor, accedé desde una computadora o ampliá el tamaño de tu ventana para continuar.
        </p>
      </div>
    </div>
  );
}
