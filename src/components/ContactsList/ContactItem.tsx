import { useEffect, useRef, useState } from "react";
import PhoneRow from "./PhoneRow";
import EmailRow from "./EmailRow";

function ContactItem({ contact }: { contact: Contact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Update max height whenever isOpen changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="py-1.5 border-b">
      <div
        className="font-semibold text-lg text-gray-800 cursor-pointer"
        onClick={toggleOpen}
      >
        {contact.name}
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight }}
        ref={contentRef}
      >
        <div>
          {contact.data.map((item) => {
            if (item.type === "email") {
              return <EmailRow item={item} key={item._id} />
            }

            if (item.type === "phone_number") {
              return <PhoneRow item={item} key={item._id} />;
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
