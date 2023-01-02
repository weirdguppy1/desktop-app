import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import useFolder from "../../hooks/useFolder";

export default function Home() {
  const { createJournalEntry } = useFolder();
  const navigate = useNavigate();

  const handleClick = () => {
    const fileName = createJournalEntry(new Date())
    navigate(`/editor/${fileName}`)
  };

  return (
    <div className="">
      {/* <button onClick={handleClick} className="btn-cosmic btn">Create New Entry</button> */}
    </div>
  );
}
