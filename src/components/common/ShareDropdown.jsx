const ShareDropdown = () => {
  return (
    <div className="bg-white-700 absolute top-10 left-0 z-50 h-[120px] w-[140px] rounded p-2">
      <ul className="m-0 flex list-none flex-col p-0">
        <li className="cursor-pointer rounded-lg border-gray-900 px-3 py-2 hover:bg-gray-100">
          카카오톡 공유
        </li>
        <li className="cursor-pointer rounded-lg border-gray-900 px-3 py-2 hover:bg-gray-100">
          URL 공유
        </li>
      </ul>
    </div>
  );
};

export default ShareDropdown;
