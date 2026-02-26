import { useAuth } from "../../store/authStore.js";
import { Link, useNavigate } from "react-router-dom";

export function SideBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="text-3xl font-bold hidden max-sm:block hover:cursor-pointer">
      <i className="fa-solid fa-bars"></i>
      <div className="h-full bg-neutral-300 ">
        <ul className="flex w-4/7 items-center justify-around max-sm:hidden">
          <Link to={"/"}>
            <li>Incio</li>
          </Link>
          <Link to={"/ropa-page"}>
            <li>Ropa</li>
          </Link>
          <Link to={"/about-us"}>
            <li>About Us</li>
          </Link>
        </ul>
        {isAuthenticated ? (
          <div className="w-2/7 flex items-center justify-around max-sm:hidden">
            {user?.role === "admin" ? (
              <Link to={"/admin-page"}>Admin</Link>
            ) : (
              <></>
            )}
            <Link to={"/cart"}>Cart</Link>
            <button className="principal-btn" onClick={logOut}>
              <Link to={"/login-page"}>Cerrar Sesion</Link>
            </button>
          </div>
        ) : (
          <div className=" w-2/7 flex justify-around items-center max-sm:hidden">
            <button className="">
              <Link to={"/login-page"}>Iniciar Sesion</Link>
            </button>

            <button className="">
              <Link to={"/register-page"}>Registrarse</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
