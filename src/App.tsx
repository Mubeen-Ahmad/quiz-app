import React, { useEffect, useState } from 'react';
import './App.css';
import { getDetails } from './services/dataApi';
import { QuizType, QuestionType } from './Types/quizTypes';
import QuesCard from './components/quesCard';

export default function App() {

  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [step, setStep] = useState(0)
  let [score, setScore] = useState(0)
  let [result, setResult] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await getDetails(5, 'easy')
      setQuiz(questions)
    }
    fetchData()
  }, [])

  const handleSubmit = (evt: React.FormEvent<EventTarget>, userAns: string) => {
    evt.preventDefault();
    let currentQues: QuizType = quiz[step]

    console.log('correct_ans:' + currentQues.correct_answer + ' --userAns:' + userAns);

    if (userAns === currentQues.correct_answer) {
      setScore(++score)
    }
    if (step != quiz.length - 1) {
      setStep(++step)
    } else {
      setResult(true)
    }
  }
  if (!quiz.length) {
    return <h3>Loading... </h3>
  }

  if (result) {
    return <div className='question-container result-container'>
      <h3>Result</h3>
      <p >
        You score is: <strong> {score} </strong>
        out of:  <strong>{quiz.length}</strong>
      </p>
    </div>
  }
  return (
    <div className="App">
      <h1>Quiz App</h1>
      <QuesCard
        options={quiz[step].option}
        question={quiz[step].question}
        callBack={handleSubmit}
      />
    </div>
  );
}

