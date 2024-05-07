import { FaEnvelope } from "react-icons/fa6";

function EmailRow({ item }: { item: DataItem }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <button className="bg-purple-600 p-1.5 rounded-full">
        <FaEnvelope className="h-2.5 w-2.5 text-white" />
      </button>
      <button onClick={() => navigator.clipboard.writeText(item.value)}>
        <p className="flex-1 mb-1">{item.value}</p>
      </button>
    </div>
  );
}

export default EmailRow;
