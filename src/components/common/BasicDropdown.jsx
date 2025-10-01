const BasicDropdown = ({ items, onSelect, className = '' }) => {
  const baseClasses =
    'rounded-lg bg-white p-2 border border-gray-200 shadow-md overflow-y-auto';

  return (
    <div className={`${baseClasses} ${className}`}>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item) => {
          return (
            <li
              key={item}
              onClick={() => onSelect && onSelect(item)}
              className="cursor-pointer rounded-lg px-3 py-2 text-gray-800 hover:bg-gray-100">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicDropdown;
