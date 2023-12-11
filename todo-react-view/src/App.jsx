import { useEffect, useState } from "react";
import axios from "axios";
import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

//const BASE_PATH = '/local_server/api/v1';
const BASE_PATH = "/api/v1"
function App() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getAllTodos();
    }, []);

    const getAllTodos = async () => {
        try {
            const response = await axios.get(`${BASE_PATH}/todos`);
            console.log(response.data);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            await axios.post(`${BASE_PATH}/todos`, { title: newTodo });
            setNewTodo('');
            getAllTodos();
        } catch (error) {
            console.error("Error adding new todo", error);
        }
    };

    const searchTodos = async () => {
        try {
            const response = await axios.post(`${BASE_PATH}/search`, { searchText });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching todos", error);
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h1>Todos</h1>
                    <Form>
                        <Form.Group controlId="newTodo">
                            <Form.Control
                                type="text"
                                placeholder="What needs to be done?"
                                autoFocus
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={addTodo}>Add Todo</Button>
                    </Form>
                </Col>
            </Row>

            <ListGroup>
                {todos.map((todo, index) => (
                    <ListGroup.Item key={index}>{todo.title}</ListGroup.Item>
                ))}
            </ListGroup>

            <Row className="mt-4">
                <Col>
                    <h3>Search Todo</h3>
                    <Form>
                        <Form.Group controlId="searchTodo">
                            <Form.Control
                                type="text"
                                placeholder="Search text?"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" onClick={searchTodos}>Search</Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <h3>Search Result</h3>
                    <ListGroup>
                        {searchResults.map((result, index) => (
                            <ListGroup.Item key={index}>{result._source.todotext}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
