import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left d-flex">
        <svg
          preserveAspectRatio="xMidYMid meet"
          data-bbox="22.5 21.989 155 154.879"
          viewBox="22.5 21.989 155 154.879"
          height="25"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
          data-type="shape"
          role="img"
          aria-label="Homepage"
          fill="#fff"
        >
          <g>
            <path d="M76.4 44.9c3.8-.7 7.6 1.2 9.3 4.6.4.6.7 1.3 1 2 1.1 16.3 2.2 32.2 3.2 48.2 0 1.7.2 3.3.8 4.9 1.3 3.1 4.4 5.1 7.8 4.9l51.6-3.3.4.1.9.1c1.9.2 3.6 1.1 4.9 2.4 1.5 1.6 2.4 3.7 2.3 5.8-2 29.6-23.8 54.4-53.3 60.7-29.6 6.4-59.8-7.2-74.4-33.2-4.3-7.5-7-15.8-7.9-24.3-.4-2.5-.5-5.1-.5-7.6.1-31.4 22.5-58.6 53.9-65.3zM107.1 22c35.4 1.1 65 26.8 70.4 61.1v1.6c-.1 1.3-.6 2.5-1.5 3.5-1.1 1.2-2.6 2-4.3 2.1l-59.5 3.9h-1c-1.6-.1-3.2-.7-4.4-1.8-1.5-1.3-2.3-3.2-2.3-5.1l-4-58.5v-1c.1-1.6.8-3.2 2-4.3 1.3-1 2.9-1.6 4.6-1.5z"></path>
          </g>
        </svg>
        <h1 className="logo">Radix AI</h1>
      </div>
      <div className="route-div">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          AI Search
        </NavLink>
      </div>
    </header>
  );
}
