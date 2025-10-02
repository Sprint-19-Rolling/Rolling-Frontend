import Dropdown from '@/components/common/dropbox/Dropdown';
import ShareDropdownWrapper from '@/components/common/dropbox/ShareDropdown';

const List = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <Dropdown />
      </div>

      <div className="relative w-fit">
        <ShareDropdownWrapper />
      </div>
    </div>
  );
};

export default List;
