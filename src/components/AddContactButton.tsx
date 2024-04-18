import { TbUserPlus } from "react-icons/tb";

function AddContactButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-black p-2.5 absolute z-50 right-4 bottom-4 md:right-6 md:bottom-6 rounded-full"
    >
      <TbUserPlus className="h-6 w-6 text-white" />
    </button>
  );
}

export default AddContactButton;
