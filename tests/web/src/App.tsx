import React, { useEffect } from "react";
import fetcher from "./fetcher";

interface Dino {
  name: string;
  description: string;
}

export default function App() {
  // Fetch all dinos
  const allDinos = fetcher.useQuery<Dino[]>("/dinos");

  // Fetch one dino
  const singleDino = fetcher.useQuery<Dino[]>("/dinos/Aardonyx");

  // Fetch paginated dinos
  const paginatedDinos = fetcher.useQuery<Dino[]>(`/dinos`, {
    params: { offset: "0", take: "10" },
  });

  // Update one dino
  const { mutate: updateDino, data: updatedDino } = fetcher.useMutation<Dino>("/dinos", {
    method: "PATCH",
    onSuccess: refetchDinos,
  });

  // Delete one dino
  const { mutate: deleteDino, data: deletedDino } = fetcher.useMutation<Dino>("/dinos", {
    method: "DELETE",
    onSuccess: refetchDinos,
  });

  // Create one dino
  const { mutate: createDino, data: createdDino } = fetcher.useMutation<Dino>("/dinos", {
    method: "PUT",
    onSuccess: refetchDinos,
  });

  function refetchDinos() {
    allDinos.refetch();
    singleDino.refetch();
  }

  // Fetch dinos with pagination
  const offset = 0;
  const take = 10;

  return (
    <div>
      <div>
        <h3>All Dinosaurs</h3>
        {allDinos.isLoading && <p>Loading...</p>}
        {allDinos.isError && <p>Error: {allDinos?.error?.status}</p>}
        {allDinos.data && <p id="allDinos">{JSON.stringify(allDinos.data)}</p>}
      </div>

      <div>
        <h3>Single Dinosaur</h3>
        {singleDino.isLoading && <p>Loading...</p>}
        {singleDino.isError && <p>Error: {singleDino?.error?.status}</p>}
        {singleDino.data && <p id="singleDino">{JSON.stringify(singleDino.data)}</p>}
      </div>

      <div>
        <h3>Update Dinosaur</h3>
        {updatedDino && <p id="updatedDino">{JSON.stringify(updatedDino)}</p>}
      </div>

      <div>
        <h3>Delete Dinosaur</h3>
        {deletedDino && <p id="deletedDino">{JSON.stringify(deletedDino)}</p>}
      </div>

      <div>
        <h3>Create Dinosaur</h3>
        {createdDino && <p id="createdDino">{JSON.stringify(createdDino)}</p>}
      </div>

      <div>
        <h3>Paginated Dinosaurs</h3>
        {paginatedDinos.isLoading && <p>Loading...</p>}
        {paginatedDinos.isError && <p>Error: {paginatedDinos?.error?.status}</p>}
        {paginatedDinos.data && <p id="paginatedDinos">{JSON.stringify(paginatedDinos.data)}</p>}
      </div>

      <button
        id="updateDinoBtn"
        onClick={() =>
          updateDino(
            {
              name: "Aardonyx",
              description: "Updated description",
            },
            {
              pathname: "/aardonyx",
            },
          )
        }
      >
        PATCH
      </button>
      <button
        id="deleteDinoBtn"
        onClick={() =>
          deleteDino(undefined, {
            pathname: "/aardonyx",
          })
        }
      >
        DELETE
      </button>
      <button
        id="createDinoBtn"
        onClick={() =>
          createDino({
            name: "Aardonyx",
            description: "New dino description",
          })
        }
      >
        CREATE
      </button>
    </div>
  );
}
