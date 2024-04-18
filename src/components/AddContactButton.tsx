import { generateBackgroundPattern } from "mynders";
import { TbUserPlus } from "react-icons/tb";

function AddContactButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute z-50 right-1 bottom-0 md:right-6 md:bottom-6 p-4 pl-6 pr-3 rounded-full"
      style={generateBackgroundPattern("#fff", "#edf4ff")}
    >
      <button onClick={onClick} className="bg-black p-2.5 rounded-full">
        <TbUserPlus className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

export default AddContactButton;
