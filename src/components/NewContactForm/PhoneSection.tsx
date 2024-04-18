import { FaCirclePlus } from "react-icons/fa6";
import { CiCircleMinus } from "react-icons/ci";

function PhoneSection({
  contact,
  setContact,
}: {
  contact: Partial<Contact>;
  setContact: React.Dispatch<React.SetStateAction<Partial<Contact>>>;
}) {
  return (
    <div className="p-4 bg-gray-700 w-full mt-2">
      <button
        onClick={() => {
          setContact((prevContact) => ({
            ...prevContact,
            data: [
              ...(prevContact.data || []),
              {
                _id: new Date().getTime().toString(),
                title: "phone_number",
                value: "",
              },
            ],
          }));
        }}
        className="flex gap-2 items-center"
      >
        <FaCirclePlus className="h-4 w-4 text-purple-400" />
        <p className="text-sm text-white">Add Phone</p>
      </button>
      <div className="">
        {contact.data
          ?.filter((item) => item.title === "phone_number")
          .map((item, i) => (
            <div className="flex gap-2 items-center mt-3" key={i}>
              <button
                onClick={() => {
                  let canDelete = true;
                  if (item.value.length > 0) {
                    canDelete = window.confirm("Delete this number?");
                  }

                  if (canDelete) {
                    setContact((prevContact) => ({
                      ...prevContact,
                      data: (prevContact.data || []).filter((dataItem) => {
                        item._id !== dataItem._id;
                      }),
                    }));
                  }
                }}
              >
                <CiCircleMinus className="h-4 w-4 text-purple-400" />
              </button>
              <input
                type="text"
                placeholder="Phone"
                value={item.value}
                onChange={(e) => {
                  const number = e.target.value;
                  const regex = /^(?:\+[\d\s().-]*|\d[\d\s().-]*|)$/;

                  if (regex.test(number) && !/--/.test(number)) {
                    setContact((prevContact) => ({
                      ...prevContact,
                      data: (prevContact.data || []).map((dataItem) => {
                        if (item._id === dataItem._id) {
                          return { ...dataItem, value: number };
                        }
                        return dataItem;
                      }),
                    }));
                  }
                }}
                className="bg-transparent focus:outline-none text-white"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PhoneSection;
