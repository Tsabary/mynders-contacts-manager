import React, { createContext } from "react";
import { PluginProps } from "mynders";

type MyndersContextProps = Partial<PluginProps>;
export const MyndersContext = createContext<MyndersContextProps>({});

interface MyndersProviderProps
  extends React.PropsWithChildren<{}>,
    MyndersContextProps {}

export const MyndersProvider: React.FC<MyndersProviderProps> = ({
  children,
  user,
  folderId,
  isHome,
  isLosingFocus,
  encryptData,
  encryptFile,
  decryptData,
  decryptFile,
  setLocalStorage,
  getLocalStorage,
}) => {
  return (
    <MyndersContext.Provider
      value={{
        user,
        folderId,
        isHome,
        isLosingFocus,
        encryptData,
        encryptFile,
        decryptData,
        decryptFile,
        setLocalStorage,
        getLocalStorage,
      }}
    >
      {children}
    </MyndersContext.Provider>
  );
};
