import { useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useMynders from "../../hooks/useMynders";

function ContactsList() {
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

  return (
    <div className="relative h-full w-full flex flex-col items-stretch">
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none px-4 py-2 bg-stone-100 rounded-md mx-4"
      />
      <div className="flex flex-col overflow-y-auto pt-2">
        {contacts.map((contact) => (
          <div className="py-2 px-5 border-b">{contact.name}</div>
        ))}
      </div>
    </div>
  );
}

export default ContactsList;
