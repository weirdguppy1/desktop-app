import {
  BookOpenIcon,
  DocumentIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import Sidebar from "../../components/Sidebar";
import useFolder from "../../hooks/useFolder";
import useStatistics from "../../hooks/useStatistics";
import Test from "../Editor/components/Test";

export default function Home() {
  const { getCurrentStreak, getJournalEntryCount } = useStatistics();
  const { createJournalEntry } = useFolder();

  const navigate = useNavigate();

  const handleClick = () => {
    const fileName = createJournalEntry(new Date());
    navigate(`/editor/${fileName}`);
  };

  const username = require("os").userInfo().username;
  const streak = getCurrentStreak();
  const entriesCount = getJournalEntryCount();

  return (
    <div className="w-full p-10">
      <div className="flex flex-col space-y-16">
        <div>
          <h1 className="text-8xl">
            👋 Hello,{" "}
            <span className="capitalize font-extrabold text-transparent bg-clip-text bg-gradient-to-r duration-500 from-cyan-500 to-purple-600 transition-all bg-size-200 bg-pos-0 hover:bg-pos-100">
              {username}
            </span>
            <span className="text-purple-black">.</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <label className="rounded-full py-0.5 px-4 bg-gray-600 text-sm">
              Statistics
            </label>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl">Current Writing Streak </h1>
              <div className="bg-red-500 rounded-lg p-1">
                <FireIcon className="h-6 w-6 rounded-lg fill-white" />
              </div>
            </div>
            <span className="animate-pulse">
              {"🔥".repeat(Math.floor(streak / 2))}
              {streak} {streak === 1 ? "Day" : "Days"}.
            </span>{" "}
            {streak === 0 ? "Let's get back on track!" : "Keep going!"}
          </Card>
          <Card>
            <label className="rounded-full py-0.5 px-4 bg-gray-600 text-sm">
              Statistics
            </label>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl">Jounal Entries Count </h1>
              <div className="bg-pink-500 rounded-lg p-1">
                <BookOpenIcon className="h-6 w-6 rounded-lg fill-white" />
              </div>
            </div>
            <div className="font-bold text-3xl bg-gray-500 w-fit px-2 py-0.5 rounded-lg">
              {entriesCount}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-gray-800 hover:bg-gray-900 trasition duration-500 hover:ring-4 hover:ring-cyan-500 text-white px-10 py-5 rounded-lg">
      {children}
    </div>
  );
};
