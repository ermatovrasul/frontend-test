import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import EditSeminarForm from "./components/Edit";

const API_URL = "http://localhost:3001/seminars";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await axios.get(API_URL);
      setSeminars(response.data);
    } catch (error) {
      console.error("Ошибка загрузки данных", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить семинар?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSeminars(seminars.filter((seminar) => seminar.id !== id));
      } catch (error) {
        console.error("Ошибка удаления", error);
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const seminar = seminars.find((seminar) => seminar.id === id);
    setSelectedSeminar(seminar);
  };

  const handleSave = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      fetchSeminars();
      setEditingId(null);
    } catch (error) {
      console.error("Ошибка сохранения", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSeminar((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Список семинаров
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {seminars.map((seminar) => (
          <div
            key={seminar.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="p-5">
              <img src={seminar.photo} alt={seminar.title} className="w-[400px] h-52" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{seminar.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{seminar.description}</p>
              <p className="text-gray-500 text-xs mb-4">
                {seminar.date} {seminar.time}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(seminar.id)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(seminar.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingId && selectedSeminar && (
        <EditSeminarForm
          seminar={selectedSeminar}
          onSave={handleSave}
          onClose={() => setEditingId(null)}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default App;