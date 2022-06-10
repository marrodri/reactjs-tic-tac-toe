import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
		<Link to='/index'>index</Link>
		<Link to='/aboutThis'>About This</Link>
	  </nav>
	  <Outlet/>
    </div>
  );
}
