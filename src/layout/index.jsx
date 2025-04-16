import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <span className="m-5 text-blue-500">|</span>
        <NavLink to="/game" end>
          game
        </NavLink>
        <span className="m-5 text-blue-500">|</span>
        <NavLink to="/counter" end>
          counter
        </NavLink>
        <span className="m-5 text-blue-500">|</span>
        <NavLink to="/channel" end>
          channel
        </NavLink>
        <span className="m-5 text-blue-500">|</span>
        <NavLink to="/article" end>
          article
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
    
  )
}

export default Layout
