import { createContext, useReducer } from "react";
import Swal from "sweetalert2";

const getThemeFromStorage = () => {
  const localData = localStorage.getItem("theme");
  return localData ? localData : "light";
};

const getDentistFavFromStorage = () => {
  const localData = localStorage.getItem("listDentist");
  return localData ? JSON.parse(localData) : [];
};

const setDentistInStorage = (dentist) => {
  const array = getDentistFavFromStorage();
  array.push(dentist);
  return localStorage.setItem("listDentist", JSON.stringify(array));
};

const removeDentistInStorage = (newArr) => {
  return localStorage.setItem("listDentist", JSON.stringify(newArr));
};

const clearDentistInStorage = () => {
  return localStorage.setItem("listDentist", []);
};

export const initialState = {
  theme: getThemeFromStorage(),
  users: [],
  favs: getDentistFavFromStorage(),
};

export const ContextGlobal = createContext();

function globalReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "MOD_LIGHT":
      localStorage.setItem("theme", "light");
      return { ...state, theme: "light" };
    case "MOD_DARK":
      localStorage.setItem("theme", "dark");
      return { ...state, theme: "dark" };
    case "ADD_FAV":
      let exist = state.favs.some(
        (element) => element.id === action.payload.id
      );
      if (exist) {
        Swal.fire("Warning!", `Already exists in favs`, "warning");
      } else {
        let newDentist = { ...action.payload };
        setDentistInStorage({ ...newDentist });
        Swal.fire(
          "Good job!",
          `${action.payload.name} It was successfully added`,
          "success"
        );
      }
      return { ...state, favs: getDentistFavFromStorage() };
    case "REMOVE_FAV":
      let newArray = state.favs.filter((el) => el.id !== action.payload.id);
      removeDentistInStorage(newArray);
      return { ...state, favs: getDentistFavFromStorage() };
    case "CLEAR_FAV":
      clearDentistInStorage();
      return { ...state, favs: getDentistFavFromStorage() };
    default:
      return state;
  }
}

export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};
