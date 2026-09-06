import { New } from "@/Types/newType";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export function AdminNewTarget({ newReceived }: { newReceived: New }) {
  const navigate = useNavigate();

  return (
    <div
      className="border-1 rounded-lg h-[40vh] relative text-foreground hover:shadow-lg hover:shadow-neutral-500/50"
      onClick={() => navigate(`/admin/settings/news/create/${newReceived._id}`)}
    >
      <img
        src={newReceived.image?.url}
        alt="New Image"
        className="h-full w-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-end justify-between">
          <div className="max-w-4/6">
            <h2 className="text-xl font-bold">{newReceived.title}</h2>
            <p className="text-lg font-medium overflow-hidden whitespace-nowrap text-ellipsis">
              {newReceived.description}
            </p>
          </div>
          <Edit
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/settings/news/create/${newReceived._id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
