import "../assets/styles/Form.css";
export const Form = ({
  professions,
  selectedProf,
  setSelectedProf,
  setSelectedProfId,
  setIsModalOpen,
  setNameInput,
  setAgeInput,
  handleSubmit,
  nameInput,
  ageInput,
  editingUser,
  resetForm,
}) => {
  return (
    <form>
      <input
        type="text"
        className="nameInput"
        onChange={(e) => setNameInput(e.target.value)}
        value={nameInput}
      />
      <input
        type="text"
        className="ageInput"
        onChange={(e) => setAgeInput(e.target.value)}
        value={ageInput}
      />
      <select
        onChange={(e) => {
          const selectedProfession = professions.find(
            (prof) => prof.name === e.target.value
          );
          setSelectedProf(selectedProfession.name);
          setSelectedProfId(selectedProfession.id);
        }}
        value={selectedProf}
      >
        <option disabled>Please select your profession</option>
        {professions.map((profession) => (
          <option key={profession.id} value={profession.name}>
            {profession.name}
          </option>
        ))}
      </select>
      <button type="submit" className="submitBtn" onClick={handleSubmit}>
        {editingUser ? "Update" : "Add"}
      </button>
      <button
        className="cancelBtn"
        onClick={() => {
          setIsModalOpen(false);
          resetForm();
        }}
      >
        Cancel
      </button>
    </form>
  );
};
