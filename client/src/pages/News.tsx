import { getNews } from "@/api/new";
import { New } from "@/Types/newType";
import { useEffect, useState } from "react";

export function News() {
  const [news, setNews] = useState<New[]>([]);

  useEffect(() => {
    async function loadNews() {
      const res = await getNews();
      setNews(res.data);
    }
    loadNews();
  }, []);

  return (
    <div className="py-12 bg-background text-foreground min-h-[89vh]">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 dark:text-gray-500">
            Novedades
          </h1>
          <p className="text-lg text-gray-600">
            Entérate de todo lo nuevo que tenemos para ti.
          </p>
        </header>

        {news.length === 0 ? (
          <p className="text-center text-gray-600">
            Todavía no hay novedades publicadas.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 w-full">
            {news.map((actualNew) => {
              const isExpired = new Date(actualNew.endDate) < new Date();
              return (
                <article
                  key={actualNew._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={actualNew.image.url}
                      alt={actualNew.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    {isExpired && (
                      <span className="absolute top-3 right-3 rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        Finalizada
                      </span>
                    )}
                    <h2 className="absolute bottom-3 left-4 right-4 line-clamp-2 text-xl font-bold text-white drop-shadow-sm">
                      {actualNew.title}
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {actualNew.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>
                        Publicado el{" "}
                        {new Date(actualNew.createdAt).toLocaleDateString(
                          "es-ES"
                        )}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary whitespace-nowrap">
                        Hasta{" "}
                        {new Date(actualNew.endDate).toLocaleDateString(
                          "es-ES"
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
