import React from 'react';
import MoviesList from "./MoviesList";
import Form from "react-bootstrap/Form";

function App() {
  return (
    <div className="App">
        <Form id="searchForm">
            <Form.Control id="searchBox" type="text" placeholder="Movie or Series title"/>
        </Form>
        {/*<MoviesList/>*/}
    </div>
  );
}

export default App;
