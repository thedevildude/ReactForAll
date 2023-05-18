import { ActiveLink } from "raviger";
import logo from "../logo.svg";
import { User } from "../types/userTypes";

const Header = (props: { currentUser: User }) => {
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
          ...(props.currentUser?.username?.length > 0
            ? [{ page: "Logout", onClick: () => {
              localStorage.removeItem("token");
              window.location.reload();
            } }]
            : [{ page: "Login", url: "/login" }]
          ),
        ].map((link) => (
          link.url ? (
          <ActiveLink
            key={link.page}
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase font-medium active:text-blue-600"
            exactActiveClass="text-blue-600"
          >
            {link.page}
          </ActiveLink>
        ) : (
          <button
            key={link.page}
            onClick={link.onClick}
            className="text-gray-800 p-2 m-2 uppercase font-medium active:text-blue-600"
          >
            {link.page}
          </button>
        )
        ))}
      </div>
    </div>
  );
};

export default Header;
