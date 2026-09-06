import { useEffect, useMemo, useState } from "react";
import { Verified, Tag, Truck, BellOff } from "lucide-react";
import { useAuth } from "@/store/authStore";
import {
  getNotifications,
  deleteNotifications,
  updateNotificationsStatus,
} from "@/api/notification";
import { Notification } from "@/Types/notificationType";

const typeConfig: Record<
  Notification["type"],
  { label: string; icon: typeof Truck; className: string }
> = {
  "estatus de pedidos": {
    label: "Actualización de Pedido",
    icon: Truck,
    className: "bg-blue-500/20 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400",
  },
  novedades: {
    label: "Novedades",
    icon: Verified,
    className: "bg-green-500/20 text-green-500 dark:bg-green-500/30 dark:text-green-400",
  },
  promociones: {
    label: "Oferta Especial",
    icon: Tag,
    className: "bg-purple-500/20 text-purple-500 dark:bg-purple-500/30 dark:text-purple-400",
  },
};

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    getNotifications(user._id)
      .then((res) => setNotifications(res.data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, [user?._id]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allSelected =
    notifications.length > 0 && selectedIds.size === notifications.length;

  const handleToggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(notifications.map((n) => n._id)));
  };

  const selectedUnreadIds = useMemo(
    () =>
      notifications
        .filter((n) => selectedIds.has(n._id) && n.status === "sin leer")
        .map((n) => n._id),
    [notifications, selectedIds],
  );

  const selectedReadIds = useMemo(
    () =>
      notifications
        .filter((n) => selectedIds.has(n._id) && n.status === "leido")
        .map((n) => n._id),
    [notifications, selectedIds],
  );

  const handleDeleteSelected = async () => {
    if (!user?._id || selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    setProcessing(true);
    try {
      await deleteNotifications(user._id, ids);
      setNotifications((prev) => prev.filter((n) => !selectedIds.has(n._id)));
      setSelectedIds(new Set());
    } finally {
      setProcessing(false);
    }
  };

  const handleMarkAsRead = async () => {
    if (!user?._id || selectedUnreadIds.length === 0) return;
    setProcessing(true);
    try {
      await updateNotificationsStatus(user._id, "leido", selectedUnreadIds);
      const idsSet = new Set(selectedUnreadIds);
      setNotifications((prev) =>
        prev.map((n) => (idsSet.has(n._id) ? { ...n, status: "leido" } : n)),
      );
      setSelectedIds(new Set());
    } finally {
      setProcessing(false);
    }
  };

  const handleMarkAsUnread = async () => {
    if (!user?._id || selectedReadIds.length === 0) return;
    setProcessing(true);
    try {
      await updateNotificationsStatus(user._id, "sin leer", selectedReadIds);
      const idsSet = new Set(selectedReadIds);
      setNotifications((prev) =>
        prev.map((n) => (idsSet.has(n._id) ? { ...n, status: "sin leer" } : n)),
      );
      setSelectedIds(new Set());
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {!loading && notifications.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleToggleSelectAll}
                disabled={processing}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {allSelected ? "Deseleccionar todas" : "Seleccionar todas"}
              </button>
              <button
                onClick={handleMarkAsRead}
                disabled={processing || selectedUnreadIds.length === 0}
                className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary/20 dark:hover:bg-primary/30"
              >
                Marcar como leídas
              </button>
              <button
                onClick={handleMarkAsUnread}
                disabled={processing || selectedReadIds.length === 0}
                className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary/20 dark:hover:bg-primary/30"
              >
                Marcar como no leídas
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={processing || selectedIds.size === 0}
                className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/20 dark:hover:bg-red-500/30"
              >
                Eliminar seleccionadas
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Cargando notificaciones...
          </p>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center h-[48vh]">
            <BellOff className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron notificaciones.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              const fecha = new Date(notification.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div
                  key={notification._id}
                  className={`flex items-start gap-4 rounded-lg p-4 ${
                    notification.status === "sin leer"
                      ? "bg-primary/10 dark:bg-primary/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <input
                    className="form-checkbox mt-1.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    type="checkbox"
                    checked={selectedIds.has(notification._id)}
                    onChange={() => toggleSelected(notification._id)}
                  />
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.className}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{fecha}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
