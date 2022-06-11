import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1 class="
      font-medium 
      leading-tight 
       text-5xl 
      mt-0
       mb-2
      text-blue-600">
        Tic Tac Toe
      </h1>
      <h2 class="
        font-medium
        leading-tight
        text-4xl
        mt-0
        mb-2
        text-blue-600
      ">
         Please click on Game to start a game

      </h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link className="text-2xl" to="/Game">Game</Link> {"| "}
        <Link className="text-2xl" to="/aboutThis">About This</Link> {"| "}
        <Link className="text-2xl" to="/resources">Resources</Link>
      </nav>
      <Outlet />
    </div>
  );
}
