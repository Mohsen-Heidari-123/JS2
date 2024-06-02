import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faEye, faRulerVertical, faWeight, faLink, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { fetchPeople } from "../services/peopleApi"; // Make sure the API function is named correctly

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const peopleData = await fetchPeople(); // Make sure the API function is named correctly
        console.log("Returned People Data:", peopleData);
        setPeople(peopleData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    loadPeople();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Star Wars Characters</h1>
      {error && <div className="text-danger text-center">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Row>
          {people.map((person: any, index: number) => (
            <Col key={index} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={person.image_url} alt={person.name} />
                <Card.Body>
                  <Card.Title>{person.name}</Card.Title>
                  <Card.Text>
                    <FontAwesomeIcon icon={faBirthdayCake} /> <strong>Birth Year:</strong> {person.birth_year}
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faRulerVertical} /> <strong>Height:</strong> {person.height} cm
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faEye} /> <strong>Eye Color:</strong> {person.eye_color}
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faUsers} /> <strong>Hair Color:</strong> {person.hair_color !== "n/a" ? person.hair_color : "Unknown"}
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faWeight} /> <strong>Mass:</strong> {person.mass} kg
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faLink} /> <strong>Wiki Link:</strong>{" "}
                    <a href={person.wiki_link} target="_blank" rel="noreferrer">
                      {person.name}
                    </a>
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faUsers} /> <strong>Affiliations:</strong> {person.affiliations.join(", ") || "Unknown"}
                  </Card.Text>
                  <Card.Text>
                    <FontAwesomeIcon icon={faHome} /> <strong>Homeworld:</strong> {person.homeworld.name}
                  </Card.Text>
                  <Button variant="primary" href={person.wiki_link} target="_blank" rel="noreferrer" className="btn-darkblue">
                    View on Wikipedia
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

export default PeoplePage;
