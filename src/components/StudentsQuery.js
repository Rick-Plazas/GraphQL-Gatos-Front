// src/components/StudentsQuery.js
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_STUDENTS = gql`
  query GetStudents {
    getStudents {
      id
      name
      age
      career
      semester
    }
  }
`;

export default function StudentsQuery() {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  // Estado para controlar qué campos mostrar
  const [visibleFields, setVisibleFields] = useState({
    id: true,
    name: true,
    age: true,
    career: true,
    semester: true,
  });

  const handleCheckboxChange = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) return <p>Cargando estudiantes...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Lista de estudiantes</h2>

      <div style={{ marginBottom: "15px" }}>
        <p><strong>Campos a mostrar:</strong></p>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.name}
            onChange={() => handleCheckboxChange("name")}
          /> Nombre
        </label>
        {" "}
        <label>
          <input
            type="checkbox"
            checked={visibleFields.age}
            onChange={() => handleCheckboxChange("age")}
          /> Edad
        </label>
        {" "}
        <label>
          <input
            type="checkbox"
            checked={visibleFields.career}
            onChange={() => handleCheckboxChange("career")}
          /> Carrera
        </label>
        {" "}
        <label>
          <input
            type="checkbox"
            checked={visibleFields.semester}
            onChange={() => handleCheckboxChange("semester")}
          /> Semestre
        </label>
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {visibleFields.name && <th>Nombre</th>}
            {visibleFields.age && <th>Edad</th>}
            {visibleFields.career && <th>Carrera</th>}
            {visibleFields.semester && <th>Semestre</th>}
          </tr>
        </thead>
        <tbody>
          {data.getStudents.map((student) => (
            <tr key={student.id}>
              {visibleFields.name && <td>{student.name}</td>}
              {visibleFields.age && <td>{student.age}</td>}
              {visibleFields.career && <td>{student.career}</td>}
              {visibleFields.semester && <td>{student.semester}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
