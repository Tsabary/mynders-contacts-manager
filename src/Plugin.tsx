import "./styles.css";
import "react-modern-drawer/dist/index.css";

import React, { useState } from "react";
import { MyndersAppProps } from "mynders";

import { MyndersProvider } from "./context/mynders-context";
import { NewContactForm } from "./components/NewContactForm";
import AddContactButton from "./components/AddContactButton";
import { FirebaseProvider } from "./context/firebase-context";
import { ContactsList } from "./components/ContactsList";

function Plugin() {
  const [showNewContact, setShowNewContact] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto h-full flex flex-col">
      <NewContactForm
        onCancel={() => setShowNewContact(false)}
        showNewContact={showNewContact}
        setShowNewContact={setShowNewContact}
      />
      <AddContactButton onClick={() => setShowNewContact(true)} />

      <ContactsList />
    </div>
  );
}
const PluginContainer = React.memo((props: MyndersAppProps) => (
  <MyndersProvider {...props}>
    <FirebaseProvider>
      <Plugin />
    </FirebaseProvider>
  </MyndersProvider>
));
export default PluginContainer;
