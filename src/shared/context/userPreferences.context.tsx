import {
    createContext,
    useState,
    useContext,
    ReactNode,
    FC,
    useEffect,
  } from "react";

import {languages} from 'shared/locale';


type Preferences = {
    theme: "light" | "dark";
    language:  "en" | "es";
}

type UserPreferencesContextType = {
    preferences: Preferences;
    updatePreferences: (newPreferences: Partial<Preferences>) => void;
    translate: (key: string) => string;
}

const defaultPreferences: Preferences = {
    theme: "light",
    language: "es"
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    return storedPreferences ? JSON.parse(storedPreferences) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));
  };

  const translate = (key: string): string => {
    const keys = key.split(".");
    let translation: any = languages[preferences.language];
    for (const k of keys) {
        if (translation[k] === undefined) {
            console.warn(`Translation key "${key}" not found.`);
            return key; // Devuelve la clave original si no se encuentra
          }
          translation = translation[k];
      }
    return typeof translation === "string" ? translation : key;
  };
  

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, updatePreferences, translate }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
};