// src/components/CatQuery.js
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Query para obtener todos los gatos (solo id y nombre)
const GET_ALL_CATS = gql`
  query GetAllCats {
    getAllCats {
      id
      name
    }
  }
`;

// Query para obtener un gato por ID
const GET_CAT_BY_ID = gql`
  query GetCat($id: String!) {
    getCatBreed(id: $id) {
      id
      name
      description
      origin
      temperament
    }
  }
`;

export default function CatQuery() {
  const [selectedCatId, setSelectedCatId] = useState("");

  // Traer todos los gatos para llenar el dropdown
  const { data: allCatsData, loading: loadingAllCats, error: errorAllCats } = useQuery(GET_ALL_CATS);

  // Traer el gato seleccionado
  const { data: catData, loading: loadingCat, error: errorCat, refetch } = useQuery(GET_CAT_BY_ID, {
    variables: { id: selectedCatId },
    skip: !selectedCatId, // No ejecutar hasta que haya un ID
  });

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedCatId(id);
    if (id) refetch({ id }); // Ejecuta la query con el ID
  };

  return (
    <div>
      <h2>Buscar gato por ID</h2>

      {loadingAllCats && <p>Cargando gatos...</p>}
      {errorAllCats && <p>Error cargando gatos: {errorAllCats.message}</p>}

      {/* Dropdown */}
      {allCatsData && (
        <select value={selectedCatId} onChange={handleSelect}>
          <option value="">-- Selecciona un gato --</option>
          {allCatsData.getAllCats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}

      {loadingCat && <p>Cargando información del gato...</p>}
      {errorCat && <p>Error: {errorCat.message}</p>}

      {/* Mostrar información del gato */}
      {catData && catData.getCatBreed && (
        <div>
          <h3>Información del gato:</h3>
          <p><strong>ID:</strong> {catData.getCatBreed.id}</p>
          <p><strong>Nombre:</strong> {catData.getCatBreed.name}</p>
          <p><strong>Descripción:</strong> {catData.getCatBreed.description}</p>
          <p><strong>Origen:</strong> {catData.getCatBreed.origin}</p>
          <p><strong>Temperamento:</strong> {catData.getCatBreed.temperament}</p>
        </div>
      )}

      {catData && !catData.getCatBreed && <p>No se encontró un gato con ese ID.</p>}
    </div>
  );
}
