import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const dataFooter = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Clothes",
    link: "/ropa-page",
  },
  {
    id: 3,
    name: "About Us",
    link: "/about-us",
  },
  {
    id: 4,
    name: "Accesories",
    link: "/accesories-page",
  },
];

export function Footer() {
  return (
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex">
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
              <span className="font-bold block">OlympusOfficial</span>
              <span className="block"> E-commerce</span>
            </div>
          </div>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-foreground-description sm:mb-0">
            {dataFooter.map((item) => (
              <li key={item.id}>
                <Link to={item.link} className="mr-4 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6 border-foreground-description sm:mx-auto lg:my-8" />
        <span className="block text-sm text-foreground sm:text-center">
          &copy; 2025
          <Link to={"#"}>OlympusOfficial.</Link>
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}
