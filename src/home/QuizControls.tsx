import { Button } from "@/components/ui/button";
import { completeQuiz, nextQuestion, prevQuestion } from "@/redux/features/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";

const QuizControls = () => {
  const dispatch = useAppDispatch();
  const { questions, quizComplete, currentQuestionIndex, userAnswer } = useAppSelector(
    (state) => state.quiz
  );

  const isAnswerSelected = userAnswer[currentQuestionIndex] !== null;

  const handleNext = () => {
    if (isAnswerSelected) {
      dispatch(nextQuestion());
    } else {
      Swal.fire({
        icon: "warning",
        title: "উত্তর দেয়া হয়নি!",
        text: "পরবর্তী প্রশ্নে যাওয়ার আগে একটি অপশন নির্বাচন করুন।",
        showConfirmButton: true,
      });
    }
  };


    // Handle the "Complete Quiz" button click
  const handleCompleteQuiz = () => {
    dispatch(completeQuiz());
  };

  const isCompleteEnabled =
    isAnswerSelected || currentQuestionIndex !== questions.length - 1;

  return (
    <div className="flex justify-between items-center mt-16">
      <Button
        disabled={!isAnswerSelected}
        onClick={() => dispatch(prevQuestion())}
        size="default"
        className="text-xl"
      >
        Previous
      </Button>
        {/* Next Button */}
      {currentQuestionIndex < questions.length - 1 && !quizComplete && (
        <Button onClick={handleNext} disabled={!isAnswerSelected}>
          Next
        </Button>
      )}

      {/* Complete Quiz Button */}
      {currentQuestionIndex === questions.length - 1 && !quizComplete && (
        <Button onClick={handleCompleteQuiz} disabled={!isCompleteEnabled}>
          Complete Quiz
        </Button>
      )}
    </div>
  );
};

export default QuizControls;
