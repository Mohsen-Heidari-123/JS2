import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCalendarAlt, faVideo, faUser, faScroll, faUsers, faGlobe, faShip, faCar, faPaw } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search";
import { fetchFilms } from "../services/filmApi";

const HomePage: React.FC = () => {
  const [films, setFilms] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        const filmsData = await fetchFilms();
        setFilms(filmsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error  fetching data:", error);
        setLoading(false);
      }
    };
    loadFilms();
  }, []);

  const handleSearchResults = (searchResults: any[]) => {
    setFilms(searchResults);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Star Wars Films</h1>
      <Search onSearchResults={handleSearchResults} />
      {error && <div className="text-danger text-center">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Row>
          {films &&
            films.map((film: any, index: number) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={film.image_url} alt={film.title} />
                  <Card.Body>
                    <Card.Title>{film.title}</Card.Title>
                    <Card.Text>
                      <FontAwesomeIcon icon={faFilm} /> <strong>Episode:</strong> {film.episode_id}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Release Date:</strong> {film.release_date}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faUser} /> <strong>Director:</strong> {film.director}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faVideo} /> <strong>Producer:</strong> {film.producer}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faScroll} /> <strong>Opening Crawl:</strong> {film.opening_crawl}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faUsers} /> <strong>Characters Count:</strong> {film.characters_count}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faGlobe} /> <strong>Planets Count:</strong> {film.planets_count}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faShip} /> <strong>Starships Count:</strong> {film.starships_count}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faCar} /> <strong>Vehicles Count:</strong> {film.vehicles_count}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faPaw} /> <strong>Species Count:</strong> {film.species_count}
                    </Card.Text>
                    <Button variant="primary" className="btn-darkblue">
                      Watch Short Video
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
