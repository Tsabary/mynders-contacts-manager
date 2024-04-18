import React from "react";
import ReactDOM from "react-dom/client";

import Plugin from "./Plugin.tsx";
import MyndersContainer from "./layout/MyndersContainer.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyndersContainer>
      <Plugin
        user={{ _id: "Aa1234" }}
        folderId="dummy-folder-id"
        encryptData={(data) => data}
        encryptFile={(blob: Blob) => Promise.resolve(blob)}
        decryptData={(data) => data}
        decryptFile={(blob: Blob, fileName: string, fileTypeInMeta: string) =>
          Promise.resolve(new File([blob], fileName, { type: fileTypeInMeta }))
        }
        setLocalStorage={(key: string, data: string) => {
          localStorage.setItem(`dummy-plugin-id:dummy-folder-id:${key}`, data);
        }}
        getLocalStorage={(key: string) => {
          return localStorage.getItem(`dummy-plugin-id:dummy-folder-id:${key}`);
        }}
        isLosingFocus={false}
      />
    </MyndersContainer>
  </React.StrictMode>
);
