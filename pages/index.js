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
            <button key = {Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)} style={{
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

function Quiz({ Category }) {
  const API_URL = `https://opentdb.com/api.php?amount=10&category=${Category}&difficulty=easy`
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
        <title>Taptap&apos;s Quiz</title>
        <meta name="description" content="A Quiz Application" />
      </Head>

      <main>
        {questions ? questionIndex != 9 ? (
          <div>
            <DisplayQuestion correct_answer={questions[questionIndex].correct_answer} incorrect_answers={questions[questionIndex].incorrect_answers} question={questions[questionIndex].question} handleButtonClick={handleButtonClick} />
          </div>
        ) : (
          <div>
            <h1>{score}/10</h1>
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

export default function Home() {
  const [category, setCategory] = useState('');
  console.log(category)
  return (
    <div>
      <Head>
        <title>Taptap&apos;s Quiz</title>
        <meta name="description" content="A Quiz Application" />
      </Head>

      {!category ? (
        <>
          <main>
            <h1>Taptap&apos;s Quiz</h1>
            <div>
              <button onClick={(e) => { e.preventDefault(); setCategory('10'); }}>Books</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('11'); }}>Film</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('12');}}>Music</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('14');}}>Television</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('15');}}>Video Games</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('16');}}>Board Games</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('17');}}>Science & Nature</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('18');}}>Computers</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('19');}}>Mathematics</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('20');}}>Mythology</button>
              <button onClick={(e) => { e.preventDefault(); setCategory('21');}}>Sports</button>
            </div>
          </main>
          <style jsx={true}>{`
            main {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              text-align: center;
              height: 100vh;
              color: white;
              width: 100vw;
              background: #e9c46a;
            }

            h1 {
              flex: 100%;
            }

            button {
              color: white;
              background: transparent;
              margin: 10px;
              border: 3px solid white;
              border-radius: 10px;
              padding: 10px;
              font-size: 1rem;
            }
          `}</style>
        </>
      ) : (
        <Quiz Category={category} />
      )}
    </div>
  )
}