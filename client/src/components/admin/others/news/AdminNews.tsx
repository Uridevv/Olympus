import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { New } from '@/Types/newType'
import { AdminNewTarget } from "./AdminNewTarget";
import { getNews } from "@/api/new";

export function AdminNews() {

  const navigate = useNavigate();
  const [news, setNews] = useState<New[]>([]);

  useEffect(() => {
    async function loadNews() {
      const res = await getNews();
      setNews(res.data);
    }
    loadNews();
  }, []);

  return (
    <div className="p-6 text-foreground bg-background">
      <div className="flex justify-between">
        <h1 className="text-2xl text-foreground font-bold mb-4">News</h1>
        <Plus
          className="text-white rounded-lg hover:bg-neutral-700"
          size={30}
          onClick={() => navigate("/admin/settings/news/create")}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 justify-between">
        {news.map((actualNew) => (
          <AdminNewTarget newReceived={actualNew} key={actualNew._id} />
        ))}
      </div>
    </div>
  )
}
