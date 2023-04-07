import React, { useContext } from "react";
import { ContextGlobal } from "../utils/GlobalContext";
import { Button } from "@mui/material";
import FavCard from "./FavCard";
import "../Favs/Fav.css";
import Swal from "sweetalert2";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {
  const { state, dispatch } = useContext(ContextGlobal);

  const favsDentists = state.favs;

  const removeFav = (obj) => {
    Swal.fire({
      title: "Sure you want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `No delet`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Ok!", "", "success");
        dispatch({ type: "REMOVE_FAV", payload: obj });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const clearFavs = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Has been deleted.", "success");
        dispatch({ type: "CLEAR_FAV" });
      }
    });
  };

  return (
    <>
      <h1>Featured Dentists: </h1>
      <div className="containerBtn">
        {favsDentists.length ? (
          <Button onClick={clearFavs} variant="contained">
            Clear Favs
          </Button>
        ) : (
          <h2>Not have featured dentists yet</h2>
        )}
      </div>
      <div className="card-grid">
        {favsDentists.map((dentist) => (
          <FavCard
            key={dentist.id}
            dentist={dentist}
            removeFav={removeFav}
            state={state}
          />
        ))}
      </div>
    </>
  );
};

export default Favs;
