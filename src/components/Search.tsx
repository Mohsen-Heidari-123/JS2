import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

interface SearchProps {
  onSearchResults: (results: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/films?search=${query}`);
      const data = await response.json();
      if (data.results) {
        onSearchResults(data.results);
        setError(null);
      } else {
        setError("No results found");
        onSearchResults([]);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleSearch();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Form className="d-flex">
            <Form.Control
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
              className="me-2 bg-dark text-white"
              style={{ height: "calc(1.5em + .75rem + 2px)", flex: 1 }}
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
          {error && <div className="text-danger mt-3">{error}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;