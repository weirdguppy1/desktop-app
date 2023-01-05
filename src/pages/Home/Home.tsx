import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import useFolder from "../../hooks/useFolder";
import useStreak from "../../hooks/useStreak";
import Test from "../Editor/components/Test";

export default function Home() {
  const { getCurrentStreak } = useStreak();
  const { createJournalEntry } = useFolder();

  const navigate = useNavigate();

  const handleClick = () => {
    const fileName = createJournalEntry(new Date())
    navigate(`/editor/${fileName}`)
  };

  console.log(getCurrentStreak())

  return (
    <div className="flex flex-col justify-center">
      <h1>Hello</h1>
    </div>
  );
}
