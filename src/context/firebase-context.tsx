import React, { createContext, useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import firebaseConfig from "../firebase";

type FirebaseContextProps = {
  auth?: Auth;
  firestore?: Firestore;
  storage?: FirebaseStorage;
  analytics?: Analytics;
};
export const FirebaseContext = createContext<FirebaseContextProps>({});

interface FirebaseProviderProps extends React.PropsWithChildren<{}> {}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    (async () => {
      const supported = await isSupported();
      if (supported) {
        setAnalytics(getAnalytics(app));
      }
    })();
  }, [app]);

  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage, analytics }}>
      {children}
    </FirebaseContext.Provider>
  );
};
