import {Verified,Tag, Truck } from 'lucide-react';

export default function Notifications() {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          {/* <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Notificaciones
          </h1> */}
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
              Marcar todo como leído
            </button>
            <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
              Archivar todo
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-lg bg-primary/10 p-4 dark:bg-primary/20">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400">
              <span className="material-symbols-outlined"><Truck/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Actualización de Envío
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 1h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ¡Tu pedido #12345 ha sido enviado!
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
              <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="21 8 21 21 3 21 3 8"></polyline>
                  <rect height="5" width="22" x="1" y="3"></rect>
                  <line x1="10" x2="14" y1="12" y2="12"></line>
                </svg>
              </button>
              <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 dark:bg-green-500/30 dark:text-green-400">
              <span className="material-symbols-outlined"><Verified/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Novedades de Productos
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 2h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ¡Nuevos estilos de verano ya disponibles!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-500 dark:bg-purple-500/30 dark:text-purple-400">
              <span className="material-symbols-outlined"><Tag/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Oferta Especial
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 3h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                20% de descuento en toda la tienda. ¡Solo por tiempo limitado!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400">
              <span className="material-symbols-outlined"><Truck/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Actualización de Envío
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 4h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tu pedido #12344 ha sido entregado.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 dark:bg-green-500/30 dark:text-green-400">
              <span className="material-symbols-outlined"><Verified/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Novedades de Productos
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 5h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Descubre nuestra nueva colección de accesorios.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-500 dark:bg-purple-500/30 dark:text-purple-400">
              <span className="material-symbols-outlined"><Tag/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Oferta Especial
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 6h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Envío gratis en pedidos superiores a $50.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <input
              className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              type="checkbox"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400">
              <span className="material-symbols-outlined"><Truck/></span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Actualización de Envío
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">hace 7h</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Se espera que tu pedido #12343 llegue mañana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
