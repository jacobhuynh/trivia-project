import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchData = async () => {
      try {
        setLoading(true);
        await sleep(2000);
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const questions = response.json();
        setData(questions);
        setLoading(false);
      } catch(error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
      {isLoading ? ( 
        <CircularProgress /> 
      ) : (
      <p> Hi </p>
      )}
    </>
  )
}

export default App
