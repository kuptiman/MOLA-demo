import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, ButtonGroup, Button } from 'react-bootstrap';

// import QuestionsDataService from "./services/questions"

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedOption1, setSelectedOption1] = useState("")

  // Retrieve question list from API
  useEffect(() => {
    const retrieveQuestions = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/questions')

        // Set state for 10 random questions from database
        let selected = []
        while (selected.length < 10) {
          const select = Math.floor(Math.random() * response.data.length)
          if (!selected.some(item => item.varname === response.data[select].varname || selected.length === 0)) {
            selected.push(response.data[select]);
          }
        }
        setQuestions(selected)
        
        setIsLoading(false)
      } catch (err) {
        console.error(err);
      }
    }
    retrieveQuestions();
  }, [])

  const handleRadio = (event) => {
    console.log(event.target.name)
    setSelectedOption1(event.target.value)
  }

  const handleSubmit = (event) => {
    // event.preventDeafult();
    


    // const answer = {
    // }

    // try {
    //   const reponse = await axios.post('http://localhost:5000/api/answers', { answers })
    //   console.log(reponse)
    //   console.log(reponse.data)
    // } catch (err) {
    //   console.error(err);
    // }
    // console.log("Response submitted!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="jumbotron">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4"/>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="container">
            {questions.map(question => (
              <div className="question-Container" key={question.varname}>
                <div className="question row justify-content-center align-items-center">
                  <div className="col-8">
                    <p>{question.questiontext}</p>
                  </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div className="col-8">
                    {/* <Form className="radio-Container" onChange={() => handleRadio()}>
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option1}
                        id={question.varname + "_1"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option2}
                        id={question.varname + "_2"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option3}
                        id={question.varname + "_3"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option4}
                        id={question.varname + "_4"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option5}
                        id={question.varname + "_5"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option6}
                        id={question.varname + "_6"}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        name={question.varname}
                        label={question.option7}
                        id={question.varname + "_7"}
                      />
                    </Form> */}
                    <div 
                      className="btn-group btn-group-toggle" 
                      data-toggle="buttons"
                      name={question.varname}
                    >
                      <label className="btn btn-secondary">
                        <input 
                          type="radio" 
                          name={question.varname} 
                          id={question.option1}
                          value={question.option1}
                          onClick={handleRadio}
                          checked={question.option1 === selectedOption1}
                        />
                         {question.option1}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option2" /> {question.option2}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option3" /> {question.option3}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option4" /> {question.option4}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option5" /> {question.option5}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option6" /> {question.option6}
                      </label>
                      <label className="btn btn-secondary">
                        <input type="radio" name={question.varname} id="option7" /> {question.option7}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="jumbotron">
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => handleSubmit()}> Submit </button>
          <h1 className="display-4">Thank you!</h1>

          <hr className="my-4"/>
          
          <p className="lead">It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <button type="button" className="btn btn-warning btn-lg"> Download .csv </button>

        </div>
      </header>
    </div>
  );
}

export default App;
