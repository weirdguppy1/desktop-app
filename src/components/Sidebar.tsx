import {
  UserCircleIcon,
  Cog8ToothIcon,
  CalendarDaysIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useFolder from "../hooks/useFolder";

const SideBar = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const navigate = useNavigate();
  const { createJournalEntry } = useFolder();
  const handleCreateJournalEntry = () => {
    const fileName = createJournalEntry(new Date());
    navigate(`/editor/${fileName}`);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white border-r-2 border-gray-200 shadow-lg">
      <div onClick={handleCreateJournalEntry}>
        <div className="sidebar-icon group">
          <PlusIcon className="h-12 w-12" />
          <span className="sidebar-tooltip group-hover:scale-100">
            Create journal entry for {formattedDate}
          </span>
        </div>
      </div>
      <Divider />
      <SideBarIcon
        to="/settings"
        text="Settings"
        icon={<Cog8ToothIcon className="h-12 w-12" />}
      />
      <SideBarIcon
        to="/calender"
        text="Journaling Calender"
        icon={<CalendarDaysIcon className="h-12 w-12" />}
      />
      <SideBarIcon
        to="/profile"
        text="User"
        icon={<UserCircleIcon className="h-12 w-12" />}
      />
    </div>
  );
};

interface IconProps {
  icon: React.ReactNode;
  text?: string;
  to: string;
}

const SideBarIcon = ({ icon, text = "tooltip 💡", to }: IconProps) => (
  <Link to={to}>
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </Link>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
