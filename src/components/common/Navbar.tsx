import "../../styles/Navbar.css";

function Navbar() {
  return (
    <>
      <nav>
        <h2>Path Visualizer</h2>
        <ul className="nav-list">
          <li>
            <select>
              <option hidden>Algorithms</option>
              <option>Dijkstra</option>
              <option>Depth First Search</option>
            </select>
          </li>
          <li>
            <button className="nav-btn">Clear Board</button>
          </li>
          <li>
            <button className="nav-btn">Visualize</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
