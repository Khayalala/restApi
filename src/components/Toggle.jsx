import { useState } from "react";
import "../assets/styles/Toggle.css";
import { editStatus } from "../../api";
function Toggle({ userId, status, refreshUsers }) {
  const [isOn, setIsOn] = useState(status);
  const handleToggle = async () => {
    const newStatus = !isOn; 
    setIsOn(newStatus);
    await editStatus(userId, newStatus);
    refreshUsers();
  };
  return (
    <div
      className={`toggle-container ${isOn ? "bg-green" : "bg-gray"}`}
      onClick={handleToggle}
    >
      <div className={`toggle-circle ${isOn ? "toggle-on" : "toggle-off"}`} />
    </div>
  );
}

export default Toggle;
