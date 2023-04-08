import logo from "./logo.svg";

const Header = (props: { title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <img
        className="animate-spin h-16 w-16"
        src={logo}
        alt="logo"
        style={{ animation: "spin 2s liner infinite" }}
      />
      <h1 className="text-xl text-center flex-1 font-semibold">{props.title}</h1>
    </div>
  );
};

export default Header;
