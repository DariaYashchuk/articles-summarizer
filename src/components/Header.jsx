import { logo } from "../assets";

const Header = () => {
  return (
    <header className="flex w-full justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="Sumarry logo" className="w-28 object-contain" />

        <button
          type="button"
          className="black_btn"
          onClick={() =>
            window.open("https://github.com/DariaYashchuk?tab=repositories")
          }
        >
          GitHub
        </button>
      </nav>
    </header>
  );
};

export default Header;
