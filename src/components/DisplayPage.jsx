import { useEffect, useState } from "react";
import {
  fetchProfessions,
  fetchUsers,
  addUser,
  deleteUser,
  editUser,
} from "../../api";
import "../assets/styles/Display.css";
import { Table } from "./Table";
import { Form } from "./Form";

export const DisplayPage = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [selectedProf, setSelectedProf] = useState(
    "Please select your profession"
  );
  const [selectedProfId, setSelectedProfId] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayState, setDisplayState] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // Pagination //
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
    fetchProfessions().then((data) => setProfessions(data));
  }, [displayState]);
  const resetForm = () => {
    setNameInput("");
    setAgeInput("");
    setSelectedProf("Please select your profession");
    setSelectedProfId(null);
  };
  const refreshUsers = () => {
    fetchUsers().then((data) => setUsers(data));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameInput || !ageInput || !selectedProfId) {
      alert("Please fill all fields!");
      return;
    }
    if (editingUser && editingUser.id) {
      await editUser(editingUser.id, nameInput, ageInput, selectedProfId);
    } else {
      await addUser(nameInput, ageInput, selectedProfId);
    }
    resetForm();
    setDisplayState((prev) => !prev);
    setIsModalOpen(false);
  };
  const handleDelete = async (id) => {
    await deleteUser(id);
    setDisplayState((prev) => !prev);
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setNameInput(user.name);
    setAgeInput(user.age);
    setSelectedProfId(user.occupationId);
    const selectedProfession = professions.find(
      (prof) => prof.id === user.occupationId
    );
    setSelectedProf(
      selectedProfession
        ? selectedProfession.name
        : "Please select your profession"
    );
    setIsModalOpen(true);
  };

  return (
    <div className="displayContainer">
      <Table
        currentUsers={currentUsers}
        professions={professions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        refreshUsers={refreshUsers}
      />
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          {" "}
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}{" "}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(users.length / usersPerPage))
            )
          }
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>

      <button className="createUserBtn" onClick={() => setIsModalOpen(true)}>
        Add New User
      </button>
      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <Form
              professions={professions}
              selectedProf={selectedProf}
              setSelectedProf={setSelectedProf}
              setSelectedProfId={setSelectedProfId}
              setIsModalOpen={setIsModalOpen}
              setNameInput={setNameInput}
              setAgeInput={setAgeInput}
              handleSubmit={handleSubmit}
              nameInput={nameInput}
              ageInput={ageInput}
              editingUser={editingUser}
              resetForm={resetForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};
