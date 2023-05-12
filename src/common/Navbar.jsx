import "../styles/Navbar.css"

const Navbar = ({ clearBoardHandler }) => {

    return (
        <nav>
            <ul>
                <li><h1>Path Visualizer</h1></li>
                <li>
                    <select>
                        <option default>Algorithms</option>
                        <option>Dijkstra's Algorithm</option>
                    </select>
                </li>
                <li>
                    <button onClick={clearBoardHandler}>
                        Clear Board
                    </button>
                </li>
                <li>
                    <button>Visulaize</button>
                </li>
            </ul>
        </nav>
    )
}


export default Navbar
