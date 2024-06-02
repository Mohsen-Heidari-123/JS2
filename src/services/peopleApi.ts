export const fetchPeople = async () => {
    try {
      const response = await fetch(`https://swapi.thehiveresistance.com/api/people`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data from API:", data);
      return data.data; // Accessing the films array from the response
    } catch (error) {
      console.error("Error fetching films:", error);
      throw error; // Rethrow the error so the caller can handle it
    }
  };