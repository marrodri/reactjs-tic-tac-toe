import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-sky-300 flex flex-col justify-start items-center mb-[80px]">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-white text-center">
        Tic Tac Toe
      </h1>
      <h2 className="font-medium leading-tight text-[20px] mt-0 mb-2 text-white text-center">
        Please click on Game to start a game
      </h2>
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <div className="border-b-2 border-black pb-2 inline-flex justify-center w-full">
      <nav className="mx-auto flex flex-row items-center space-x-4">
        <Link className="text-2xl text-white" to="/game">
          Game
        </Link>
        <p>|</p>
        <Link className="text-2xl text-white" to="/about">
          About This
        </Link>
        <p>|</p>
        <Link className="text-2xl text-white" to="/resources">
          Resources
        </Link>
      </nav>
    </div>
  );
}
