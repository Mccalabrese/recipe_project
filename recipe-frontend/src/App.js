import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm'
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Recipe Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#recipes">Recipes</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <RecipeForm recipeId={selectedRecipeId} onSubmitSuccess={handleSuccess} />
          </Col>
          <Col md={8}>
            <RecipeList 
              refresh={refresh}
              onRecipeSelect={setSelectedRecipeId} 
            />
            {selectedRecipeId && <RecipeDetail recipeId={selectedRecipeId} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;