import { useEffect, useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import { collection, doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { logEvent } from "firebase/analytics";

import PhoneSection from "./PhoneSection";
import EmailSection from "./EmailSection";
import { handleError } from "../../helpers/handleError";
import useFirebase from "../../hooks/useFirebase";
import useMynders from "../../hooks/useMynders";

function NewContactForm({
  onCancel,
  showNewContact,
  setShowNewContact,
}: {
  onCancel: () => void;
  showNewContact: boolean;
  setShowNewContact: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLosingFocus, user, folderId, encryptData } = useMynders();
  const { firestore, analytics } = useFirebase();
  const [contact, setContact] = useState<Partial<Contact>>({});

  const isContactValid = useMemo(() => {
    // Check if the name is undefined or empty
    if (contact.name && contact.name.trim().length > 0) {
      return true;
    }

    // Check if the data array is empty or all its items have empty values
    if (
      contact.data &&
      contact.data.length > 0 &&
      contact.data.some((item) => item.value.trim().length > 0)
    ) {
      return true;
    }

    // If neither condition is met, the contact is not empty
    return false;
  }, [contact]);

  const addContact = async () => {
    try {
      const newNoteRef = doc(
        collection(
          firestore!,
          "plugins-data/com.mynders.contacts_manager/contacts"
        )
      );

      const updatedContact: Partial<Contact> = {
        name: contact.name?.trim() ? encryptData!(contact.name.trim()) : "",
        data: contact.data
          ?.filter((item) => item.value.length > 0)
          .map((item) => ({ ...item, value: encryptData!(item.value) })),
      };

      await setDoc(newNoteRef, {
        ...updatedContact,
        user_id: user!._id,
        folder_id: folderId,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      if (analytics) {
        logEvent(analytics, "new_contact");
      }
      setContact({});
      setShowNewContact(false);
    } catch (err) {
      handleError(err, "Failed to add contact: ");
    }
  };

  useEffect(() => {
    if (isLosingFocus) {
      setContact({});
      setShowNewContact(false);
    }
  }, [isLosingFocus]);

  return (
    <Drawer
      open={showNewContact}
      onClose={() => setShowNewContact(false)}
      direction="bottom"
      size="80vh"
      style={{ zIndex: 1000 }}
      className="flex justify-center"
    >
      <div className="w-full bg-gray-800">
        <div className="flex gap-2 justify-between w-full p-3 px-5">
          <button
            onClick={() => {
              onCancel();
              setContact({});
            }}
            className="text-purple-400 "
          >
            Cancel
          </button>
          <p className="text-white">New Contact</p>
          <button
            onClick={() => isContactValid && addContact()}
            className={[
              isContactValid ? "text-purple-400" : "text-gray-500",
            ].join(" ")}
          >
            Done
          </button>
        </div>
        <div className="p-4 bg-gray-700 w-full mt-4">
          <input
            type="text"
            placeholder="Name"
            value={contact.name || ""}
            onChange={(e) =>
              setContact((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-transparent focus:outline-none text-white"
          />
        </div>
        <PhoneSection contact={contact} setContact={setContact} />
        <EmailSection contact={contact} setContact={setContact} />
      </div>
    </Drawer>
  );
}

export default NewContactForm;
