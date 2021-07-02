import Head from 'next/head'
import React, {useState, useEffect} from 'react'

function DisplayQuestion({ correct_answer, incorrect_answers, question, handleButtonClick }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [arr, setArr] = useState([]);

  if (arr.length === 0 || !arr.find(e => e === correct_answer)) {
    const arr = [correct_answer]
    for (let i = 0; i < incorrect_answers.length; i++) {
      arr.push(incorrect_answers[i])
    }
    setArr(arr.sort(() => (Math.random() > .5) ? 1 : -1))
  }

  return (
    <div className="Container">
      <h1
        className="questionTitle"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <center>
        <div className="buttonContainer">
          {arr && arr.map(answer => (
            <button style={{
              background: showAnswer ? correct_answer == answer ? 'green' : 'red' : 'white'
            }} onClick={(e) => {  setShowAnswer(true); handleButtonClick(e, setShowAnswer); }} value={answer}>{answer}</button>
          ))}
        </div>
      </center>
      <style jsx={true}>{`
        .questionTitle {
          color: white;
          font-weight: 100px;
          float: center;
        }

        .buttonContainer {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 50vw;
        }

        .buttonContainer button {
          flex: 40%;
          margin: 10px;
          height: 4vh;
          background: white;
          border: none;
        }

        .Container {
          background: #f4a261;
          padding: 10px;
          border-radius: 10px;
        }

      `}</style>
    </div>
  )


}

export default function Home() {
  const API_URL = 'https://opentdb.com/api.php?amount=10&category=14&difficulty=easy'
  const [questions, setQuestions] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, SetScore] = useState(0);

  useEffect(() => {
    fetch(API_URL).then((res) => res.json()).then((data) => setQuestions(data.results))
  }, [])

  function sleep (ms) { return new Promise(r => setTimeout(r, ms)); }

  function handleButtonClick(e, setShowAnswer) {
    e.preventDefault()
    if (e.target.value === questions[questionIndex].correct_answer) {
      SetScore(score + 1);
    }
    sleep(1000).then(() => {
      setShowAnswer(false)
      setQuestionIndex(questionIndex + 1)
    })
  }

  return (
    <div>
      <Head>
        <title>Taptap's Quiz</title>
        <meta name="description" content="A Quiz Application" />
      </Head>

      <main>
        {questions ? questionIndex != 9 ? (
          <div>
            <DisplayQuestion correct_answer={questions[questionIndex].correct_answer} incorrect_answers={questions[questionIndex].incorrect_answers} question={questions[questionIndex].question} handleButtonClick={handleButtonClick} />
          </div>
        ) : (
          <div>
            <h1>{score}</h1>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </main>
      <style jsx={true}>{`
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: #e9c46a;
        }
      `}</style>
    </div>
  )
}
