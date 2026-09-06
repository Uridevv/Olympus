import { NavBar } from "@/components/main/NavBar";
import { Footer } from "@/components/main/Footer";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import {Toaster} from 'sonner'
// import { AnimatePresence, motion } from "framer-motion";

export function MainLayout() {
  // const location = useLocation();
  return (
    <>
      <NavBar />
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // 🔑 importante: cada ruta tiene su animación
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence> */}
      <Outlet/>
      <Toaster position="bottom-right" richColors/>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
