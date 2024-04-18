import { FaCirclePlus } from "react-icons/fa6";
import { CiCircleMinus } from "react-icons/ci";

function EmailSection({
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
                title: "email",
                value: "",
              },
            ],
          }));
        }}
        className="flex gap-2 items-center"
      >
        <FaCirclePlus className="h-4 w-4 text-purple-400" />
        <p className="text-sm text-white">Add Email</p>
      </button>
      <div className="">
        {contact.data
          ?.filter((item) => item.title === "email")
          .map((item, i) => (
            <div className="flex gap-2 items-center mt-3" key={i}>
              <button
                onClick={() => {
                  let canDelete = true;
                  if (item.value.length > 0) {
                    canDelete = window.confirm("Delete this email?");
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
                placeholder="Email"
                value={item.value}
                onChange={(e) => {
                  const email = e.target.value;
                  let regex = /^[^\s@]*@?(?:[\w-]+\.)*[\w-]*$/;

                  if (regex.test(email)) {
                    setContact((prevContact) => ({
                      ...prevContact,
                      data: (prevContact.data || []).map((dataItem) => {
                        if (item._id === dataItem._id) {
                          return { ...dataItem, value: email };
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

export default EmailSection;
