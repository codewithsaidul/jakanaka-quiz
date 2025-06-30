import Question from "./home/Question";
import QuizSummary from "./home/QuizSummary";


function App() {
  const quizComplete = true
  return (
    <>
      <h1 className="text-center text-9xl my-12">Quiz App</h1>
      {!quizComplete ? <Question /> : <QuizSummary />}
    </>
  );
}

export default App;
