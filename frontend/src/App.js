import React, { useState, useEffect } from "react";
// axios for API handling, react-csv for CSV download handling
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
// Styles
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // States for API
  const [questions, setQuestions] = useState([]);
  const [allReponses, setAllResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [CSVData, setCSVData] = useState([]);

  // States for user duration
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState();

  // State for radio question responses
  const [selectedOptionJSONArr, setselectedOptionJSONArr] = useState([]);

  // State for submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmissionError, setIsSubmissionError] = useState(false);

  // Retrieve question list and previous responses from API with GET request
  useEffect(() => {
    retrieveQuestions();
    retrieveResponses();
  }, [])


  // GET requests for questions
  const retrieveQuestions = async () => {
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
      
      // Set page loading false
      setIsLoading(false)
    } catch (err) {
      console.error(err);
    }
  }

  // GET request for user responses
  const retrieveResponses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/answers')
      // setAllResponses(response.data)
      // Transform and normalize data to CSV
      let aggregatedResponses = []
      for (let res = 0; res < response.data.length ; res++) {
        for (let ans = 0; ans < response.data[res].answers.length ; ans++) {
          aggregatedResponses.push(response.data[res].answers[ans])
        }
      }
      setCSVData(aggregatedResponses)
    } catch (err) {
      console.error(err);
    }
  }

  // Handle radio option clicks
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
    
    // Check if user has answered any questions
    if (isTiming) {
      submitResponse(submit);
      setIsSubmissionError(false);
      setIsSubmitted(true);
    } else {
      setIsSubmissionError(true);
    }
  }

  // Currently unused, will need for downloading realtime responses
  const handleDownloadCSV = () => {
    // retrieveResponses()
    // let aggregatedResponses = []

    // for (let res = 0; res < allReponses.length ; res++) {
    //   for (let ans = 0; ans < allReponses[res].answers.length ; ans++) {
    //     aggregatedResponses.push(allReponses[res].answers[ans])
    //   }
    // }
    // setCSVData(aggregatedResponses)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="jumbotron">
          <h1 className="display-4">Morality and Language Lab</h1>
          <p className="lead">Peter Kuptimanus, Full Stack Developer Application Demo</p>
          <hr className="my-4"/>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="container">
            {questions.map(question => (
              <div className="question-Container" key={question.varname}>
                <div className="question row justify-content-center align-items-center">
                  <div className="col-12">
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
              <p className="lead">Response submitted. Thank you!</p>
              {/* <h1 className="display-4">Thank you!</h1> */}
            </div>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary btn-lg submit-Button" 
              onClick={() => handleSubmit()}
            > 
              Submit 
            </button>
          )}
          {isSubmissionError ? (
            <p className="lead">Please answer at least one question before submitting!</p>
              ) : (
            <div/>
          )}
          <hr className="my-4"/>
          <p className="lead">Use the button below to download all responses from the database.</p>
          <CSVLink
            // type="button" 
            className="btn btn-warning btn-lg submit-Button" 
            data={CSVData}
            filename={"MOLA-demo-responses.csv"}
            asyncOnClick={true}
            onClick={(event, done) => handleDownloadCSV()}
          > 
            Download .csv 
          </CSVLink>
          <p className="footer" style={{marginTop: "50px"}}>Powered by React, Bootstrap, NodeJS, and MongoDB.</p>
          <p className="footer">Peter Kuptimanus</p>
        </div>
      </header>
    </div>
  );
}

export default App;