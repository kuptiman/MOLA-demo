import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  // States for API
  const [questions, setQuestions] = useState([]);
  const [allReponses, setAllResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadCSV, setDownloadCSV] = useState(false);

  // States for user duration
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState();

  // State for radio question responses
  const [selectedOptionJSONArr, setselectedOptionJSONArr] = useState([]);

  // State for submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Retrieve question list from API with GET request
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
    console.log("qNum is "+event.target.name)
    console.log("qOptionSelected is "+event.target.value)

    // Start timer on first option click
    if (!isTiming) {
      setStartTime(new Date())
      setIsTiming(true)
    }

    let newJSONArr

    const result = selectedOptionJSONArr.some(response => {
      return response.questionnumber === event.target.name
    })

    if (!result) {
      newJSONArr = selectedOptionJSONArr
      newJSONArr.push({
        questionnumber: event.target.name,
        questionanswer: event.target.value
      })
    } else {
      newJSONArr = selectedOptionJSONArr.map(response => {
        if (response.questionnumber === event.target.name) {
          return {...response, questionanswer: event.target.value}
        } else {
          return response
        }
      })
    }
    setselectedOptionJSONArr(newJSONArr)
  }

  // Callback on change of selectedOptionJSONArr for logging
  useEffect(() => console.log(selectedOptionJSONArr), [selectedOptionJSONArr])

  const submitResponse = async (submission) => {
    try {
      const reponse = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/answers',
        data: submission
      })
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (event) => {
    // event.preventDeafult();

    const endTime = new Date()
    const durationInSeconds = (endTime - startTime)/1000

    const submit = {
      "surveyname": "mfq",
      "answers": selectedOptionJSONArr,
      "duration": durationInSeconds
    }

    submitResponse(submit);
    setIsSubmitted(true);
  }

  const retrieveResponses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/answers')
      setAllResponses(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  const handleDownloadCSV = () => {
    retrieveResponses()
    setDownloadCSV(true)
    
  }

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

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
                  <div className="col-10">
                    <div 
                      className="btn-group btn-group-toggle" 
                      data-toggle="buttons"
                      name={question.varname}
                    >
                      <label className="btn btn-secondary">
                        <input 
                          type="radio" 
                          name={question.varname} // Question number
                          id={(question.varname + "_" + question.option1).replace(/\s/g, "")} // ID currently unused
                          value={question.option1} // Option label
                          onClick={handleRadio}
                          // checked={() => isChecked(question.varname, question.option1)}
                        />
                         {question.option1}
                      </label> 
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option2).replace(/\s/g, "")}
                          value={question.option2}
                          onClick={handleRadio}
                        />
                         {question.option2}                      
                        </label>
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option3).replace(/\s/g, "")}
                          value={question.option3}
                          onClick={handleRadio}
                        />
                         {question.option3}                          
                        </label>
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option4).replace(/\s/g, "")}
                          value={question.option4}
                          onClick={handleRadio}
                        />
                         {question.option4}                          
                        </label>
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option5).replace(/\s/g, "")}
                          value={question.option5}
                          onClick={handleRadio}
                        />
                         {question.option5}                          
                        </label>
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option6).replace(/\s/g, "")}
                          value={question.option6}
                          onClick={handleRadio}
                        />
                         {question.option6}                          
                        </label>
                      <label className="btn btn-secondary">
                      <input 
                          type="radio" 
                          name={question.varname}
                          id={(question.varname + "_" + question.option7).replace(/\s/g, "")}
                          value={question.option7}
                          onClick={handleRadio}
                        />
                         {question.option7}                          
                        </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="jumbotron">
          {isSubmitted ? (
            <div>
              <p className="lead">Response submitted! Thank you!</p>
              {/* <h1 className="display-4">Thank you!</h1> */}
            </div>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary btn-lg" 
              onClick={() => handleSubmit()}
            > 
              Submit 
            </button>
          )}

          <hr className="my-4"/>
          
          <p className="lead">It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <button
            type="button" 
            className="btn btn-warning btn-lg" 
            onClick={() => handleDownloadCSV()}
          > 
            Download .csv 
          </button>
          {downloadCSV ? (
            <CSVDownload data={csvData} target="_blank" />
          ) : (
            <div></div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
