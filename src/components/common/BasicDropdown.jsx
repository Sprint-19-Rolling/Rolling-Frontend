const BasicDropdown = ({ onSelect }) => {
  const items = [
    'texttexttext',
    'texttexttext',
    'texttexttext',
    'texttexttext',
    'texttexttext',
  ];

  return (
    <div className="h-[220px] w-[318px] rounded-lg bg-white p-2 shadow-lg">
      <ul className="m-0 flex list-none flex-col gap-6 p-0">
        {items.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onSelect && onSelect(item)}
              className="cursor-pointer rounded-lg border-gray-900 px-3 py-2 hover:bg-gray-100">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicDropdown;
