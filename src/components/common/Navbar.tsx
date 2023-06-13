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
                    <li>Clear Board</li>
                    <li>Visualize</li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
