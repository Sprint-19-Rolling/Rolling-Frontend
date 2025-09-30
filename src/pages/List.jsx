import Dropdown from '@/components/common/Dropdown';
import ShareDropdownWrapper from '@/components/common/ShareDropdown';

const List = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <Dropdown />

      <ShareDropdownWrapper />
    </div>
  );
};

export default List;
