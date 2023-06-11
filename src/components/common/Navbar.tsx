import "../../styles/Navbar.css";

function Navbar() {
    return (
        <>
            <nav>
                <h2>Path Visualizer</h2>
                <ul className="nav-list">
                    <li>Algorithms</li>
                    <li>Clear Board</li>
                    <li>Visualize</li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
