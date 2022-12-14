import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <Link to="../task/new">
    <button
    
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >

      <span className="pl-3 pr-7"> Create</span>
    </button>
    </Link>
  );
}
