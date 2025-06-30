import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { setAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import QuizControls from "./QuizControls";

const Question = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, userAnswer } = useAppSelector(
    (state) => state.quiz
  );
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = userAnswer[currentQuestionIndex];

  const handleAnswerChange = (ans: string) => {
    dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer: ans }));
  };

  return (
    <div className="flex max-[370px]:justify-end justify-center">
      <Card className=" max-md:w-full w-3xl">
        <CardHeader>
          <h3 className="text-xl">
            {currentQuestion.id}. {currentQuestion.question}
          </h3>
          <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid max-md:grid-cols-1 grid-cols-2  gap-x-20 gap-y-10 mt-7">
            {currentQuestion.options.map((option, idx) => (
              <Button
                variant={option === correctAnswer ? "default" : "outline"}
                onClick={() => handleAnswerChange(option)}
                key={idx}
                size="lg"
              >
                {option}
              </Button>
            ))}
          </div>

          <QuizControls />
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
