const BASE_URL = 'http://161.35.143.238:8000/fdiaz/';
const HEADERS = { 'bypass-tunnel-reminder': true };

//  todas las selecciones
export const fetchTeams = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: HEADERS,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching teams");
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTeamById = async (id) => {
  const URL = `${BASE_URL}${id}/`;
  try {
    const response = await fetch(URL, {
      headers: HEADERS,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error fetching team con ID ${id}`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addTeam = async (team) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        ...HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Seleccion added successfully:', data);
      return data;
    } else {
      console.error('Error adding Seleccion');
    }
  } catch (error) {
    console.error('Error adding Seleccion:', error.message);
    throw error;
  }
};

export const deleteTeam = async (id) => {
  const URL = `${BASE_URL}${id}/`;
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: HEADERS,
    });

    if (response.ok) {
      console.log(`Seleccion with ID ${id} deleted successfully.`);
    } else {
      console.error(`Error deleting team with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error deleting Seleccion with ID ${id}:`, error.message);
    throw error;
  }
};

export const updateTeam = async (id, updatedTeam) => {
  const URL = `${BASE_URL}${id}/`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        ...HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeam),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Seleccion updated successfully:', data);
      return data;
    } else {
      console.error(`Error updating seleccion with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error updating seleccion with ID ${id}:`, error.message);
    throw error;
  }
};
