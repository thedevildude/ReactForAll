import { ActiveLink } from "raviger";
import logo from "../logo.svg";

const Header = () => {
  return (
    <div className="flex gap-2 items-center">
      <img
        className="animate-spin h-16 w-16"
        src={logo}
        alt="logo"
        style={{ animation: "spin 2s liner infinite" }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
          { page: "Login", url: "/login" },
        ].map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase font-medium active:text-blue-600"
            exactActiveClass="text-blue-600"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
