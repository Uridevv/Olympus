import { Link } from "react-router-dom";
import { useAuth } from "../../store/authStore.ts";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { NavList } from "@/components/main/NavList.tsx";
import { ResponsiveNavItems } from "@/components/main/ResponsiveNavItems.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

import {
  ShoppingCart,
  LogIn,
  LogOut,
  Heart,
  UserRoundPlus,
  ShieldUser,
  UserCircle,
} from "lucide-react";

export function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { logout: logOutAuth0 } = useAuth0();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const logOut = () => {
    logout();
    logOutAuth0({
      logoutParams: { returnTo: window.location.origin + "/login-page" },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si baja, ocultamos el navbar; si sube, lo mostramos
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`flex justify-between text-foreground h-15 rounded-2xl text-lg px-20 items-center sticky top-0 z-[200] transition-transform duration-300 backdrop-blur-md bg-background/70 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex text-2xl w-2/7 items-center justify-center">
        <svg
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox={"0 0 48 48"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
            fill="currentColor"
          ></path>
        </svg>
        <p>Olympus</p>
        <p className="text-2xl font-bold">Official</p>
      </div>

      <div className="hidden max-sm:flex">
        <ResponsiveNavItems />
      </div>

      <div className="max-sm:hidden">
        <NavList />
      </div>

      <div className="w-2/7 flex items-center justify-around max-md:hidden">
        {isAuthenticated ? (
          <>
            {user?.role === "admin" || user?.role === "manager" ? (
              <Link to={"/admin"}>
                <ShieldUser />
              </Link>
            ) : (
              <>
                <Link to={"/profile"}>
                  <UserCircle />
                </Link>
                <Link to={"/wishList"}>
                  <Heart />
                </Link>

                <Link to={"/cart"}>
                  <ShoppingCart />
                </Link>
              </>
            )}

            <button
              className="principal-btn hover:cursor-pointer"
              onClick={() => {
                logOut();
              }}
            >
              <LogOut />
            </button>
          </>
        ) : (
          <>
            <Link to={"/login-page"}>
              <LogIn />
            </Link>

            <Link to={"/register-page"}>
              <UserRoundPlus />
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
