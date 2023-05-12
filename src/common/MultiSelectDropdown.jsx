
const MultiSelectDropdown = ({ options, selected, toggleOption }) => {
    const [showOption, setShowOption] = useState(false);
    return (
        <div className="w-full relative z-40">
            <div
                className="border rounded-t-md p-4 flex justify-between items-center "
                onClick={() => setShowOption(!showOption)}
            >
                <div className="flex flex-wrap ">
                    {selected.length > 0
                        ? selected.map((e) => <div key={e.id}>{e.name}, </div>)
                        : "Select Activity"}
                </div>
                <BiChevronDown className="text-xl cursor-pointer" />
            </div>
            <ul
                className={`absolute left-0 w-full p-2 rounded-b-md h-72 overflow-scroll shadow-xl  ${showOption ? "block" : "hidden"
                    } bg-white-900`}
            >
                {options.map((option) => {
                    const isSelected = selected.some((val) => val.id === option._id);
                    return (
                        <li
                            className={`flex items-center justify-between px-1 py-2 cursor-pointer w-full flex-1 border-b-2 ${isSelected ? "bg-blue-200" : ""
                                }`}
                            onClick={() =>
                                toggleOption({
                                    id: option._id,
                                    name: option.name,
                                    price: option.price,
                                    imageUrl: option.imageUrl,
                                })
                            }
                            key={option._id}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected}
                                className={`px-1 py-2 cursor-pointer hidden`}
                            ></input>

                            <span>{option.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default MultiSelectDropdown 
