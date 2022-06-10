import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
	<h1>Tic Tac Toe, Please click on Game to start a game</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
		<Link to='/Game'>Game</Link> {"| "}
		<Link to='/aboutThis'>About This</Link>
	  </nav>
	  <Outlet/>
    </div>
  );
}
