import { ChartArea, Warehouse, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Link to={"/admin/playground/stock"}>
            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-around hover:bg-muted/70 hover:cursor-pointer">
              Stock
              <Warehouse size={90} className="m-auto" />
            </div>
          </Link>
          <Link to={"/admin/stats/sells"}>
            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-around hover:bg-muted/70 hover:cursor-pointer">
              Stats
              <ChartArea size={90} className="m-auto" />
            </div>
          </Link>
          <Link to={"/admin/settings/offers"}>
            <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-around hover:bg-muted/70 hover:cursor-pointer">
              <p className="text-xl">Settings</p>
              <Settings size={90} className="m-auto" />
            </div>
          </Link>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-[50vh] " />
      </div>
    </>
  );
}
