import React, { useState, useEffect } from "react";
import useFirebase from "../../hooks/useFirebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useMynders from "../../hooks/useMynders";
import AlphabetSidebar from "./AlphabetSidebar";
import ContactItem from "./ContactItem";
import { generateBackgroundPattern } from "mynders";

const ContactsList: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState("A");
  const { folderId, decryptData } = useMynders();
  const { firestore } = useFirebase();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Adjust the query as needed, for example using `where` for filtering
    const q = query(
      collection(
        firestore!,
        "plugins-data/com.mynders.contacts_manager/contacts"
      ),
      where("folder_id", "==", folderId),
      orderBy("name", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: Contact[] = snapshot.docs.map(
          (doc) =>
            ({
              _id: doc.id,
              ...doc.data(),
            } as Contact)
        );

        const serialzedContacts = docs.map((doc) => {
          return {
            ...doc,
            name: decryptData!(doc.name),
            data: doc.data.map((item) => ({
              ...item,
              value: decryptData!(item.value),
            })),
          };
        });
        setContacts(serialzedContacts);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Logic to determine the current letter based on scroll
    // This can be as simple as checking bounding box of list sections
    // Or calculating based on scroll position
    const container = event.currentTarget;
    const sections = container.getElementsByTagName("section");

    for (let section of Array.from(sections)) {
      const { top } = section.getBoundingClientRect();
      if (top < 200 && top > 50) {
        // Adjust these values based on your layout
        setCurrentLetter(section.dataset.letter || "B");
        break;
      }
    }
  };

  return (
    <>
      <div
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-y-auto pl-4 pr-16"
        style={generateBackgroundPattern("#fff","#edf4ff")}
      >
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((letter) => {
          let sectionContacts = [];
          if (letter === "#") {
            sectionContacts = contacts.filter((c) => !/^[A-Z]/i.test(c.name));
          } else {
            sectionContacts = contacts.filter((c) =>
              c.name.toLowerCase().startsWith(letter.toLowerCase())
            );
          }

          if (sectionContacts.length === 0) return null;
          return (
            <section
              className="pt-3"
              key={letter}
              data-letter={letter}
              id={`letter-${letter}`}
            >
              <h2 className="text-sm text-gray-300 border-b">{letter}</h2>
              {sectionContacts.map((contact) => (
                <ContactItem contact={contact} key={contact._id} />
              ))}
            </section>
          );
        })}
      </div>
      <AlphabetSidebar currentLetter={currentLetter} />
    </>
  );
};

export default ContactsList;
