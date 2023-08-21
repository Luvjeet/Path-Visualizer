import { useState } from "react";
import "../../styles/SelectMenu.css";

function SelectMenu({
    options,
    setAlgo,
    algo,
}: {
    algo: string;
    options: string[];
    setAlgo: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);

    return (
        <div
            className="select-container"
            onClick={() => setToggleMenu(!toggleMenu)}
        >
            <p title={algo}>
                {algo.length > 8 ? algo.slice(0, 8) + "..." : algo}
            </p>
            {toggleMenu && (
                <div className="select-options">
                    <ul>
                        {options.map((item: string, idx: number) => (
                            <li key={idx} onClick={() => setAlgo(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SelectMenu;
