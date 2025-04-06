import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import AnswerButton from './components/AnswerButton.jsx';
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [currQuestion, setCurrQuestion] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disable, setDisable] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // added to see loading bar
        await sleep(1000);
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const questions = await response.json();
        setData(questions);
      } catch(error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
      if (data !== null && currQuestion < data.length) {
        setShuffledAnswers([...data[currQuestion].incorrectAnswers, data[currQuestion].correctAnswer].sort(() => Math.random() - 0.5));
        setLoading(false);
      }
  }, [data, currQuestion])


  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAnswerClick = async (answer) => {
    if (disable) {
      return
    } else {
      setDisable(true);
      setSelectedAnswer(answer);

      if (answer === data[currQuestion].correctAnswer) {
        setCorrectAnswers((correctAnswers) => correctAnswers + 1);
      }

      await sleep(1000);

      setCurrQuestion((currQuestion) => currQuestion + 1);
  
      setSelectedAnswer(null);
      setDisable(false);
    }
  }


  return (
    <>
      {isLoading || data === null || shuffledAnswers === null ? ( 
        <CircularProgress /> 
      ) : (
        currQuestion < data.length ? (
          <div>
            <h1>{data[currQuestion].question.text}</h1>
            {shuffledAnswers
              .map((answer, index) => (
                <AnswerButton key={index} answer={answer} correct={answer === data[currQuestion].correctAnswer} isSelected={selectedAnswer === answer} disable={disable} onClick={() => handleAnswerClick(answer)} />
              ))
            }
          </div>
        ) : (
          <div>
            <h1>Score: {correctAnswers} / {data.length} </h1>
          </div>
        )
      )}
    </>
  )
}

export default App
