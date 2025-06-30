import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/redux/hooks";


// Helper function to get performance rating and color based on the percentage
const getPerformance = (percentage: number) => {
  if (percentage >= 90) {
    return {
      rating: "Excellent",
      color: "bg-green-800",
      textColor: "text-green-800",
      comment: "Great job! You're mastering this topic!",
    };
  } else if (percentage >= 70) {
    return {
      rating: "Good",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      comment: "Good effort! Keep practicing to reach excellence.",
    };
  } else if (percentage >= 40) {
    return {
      rating: "Needs Improvement",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      comment: "You're getting there. Keep practicing regularly.",
    };
  } else {
    return {
      rating: "Poor",
      color: "bg-red-500",
      textColor: "text-red-500",
      comment: "Don't give up! Review the material and try again.",
    };
  }
};

const QuizSummary = () => {
  const { questions, userAnswer } = useAppSelector((state) => state.quiz);

  // calculate correct answer
  const correctAnswerCount = questions.reduce((count, question, idx) => {
    return question.correctAnswer === userAnswer[idx] ? count + 1 : count;
  }, 0);

  const correctAnswerPercentage = parseFloat(
    ((correctAnswerCount / questions.length) * 100).toFixed(2)
  );

  const { color, comment, rating, textColor } = getPerformance(correctAnswerPercentage)

  return (
    <div className="px-4">
      <Card className="w-full min-md:max-w-lg mx-auto p-6 shadow-xl rounded-md">
        <CardHeader>
          <CardTitle className="max-md:text-2xl text-4xl mb-5 text-center">
            Quiz Summery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-medium">
            Yout got {correctAnswerCount} out of {questions.length}
          </h3>

          {/* progress bar */}
          <div>
            <Progress className={`h-4 rounded-full ${color}`} value={correctAnswerPercentage} />

            <div className="mt-4 flex max-[370px]:items-start justify-between items-center">
              <span className="text-base">{correctAnswerPercentage}%</span>
              <span className={`capitalize text-base ${textColor}`}>performence: {rating} </span>
            </div>
          </div>

          <div>
            <p className="text-base">
              <strong>
                Incorrect Answer: {questions.length - correctAnswerCount}
              </strong>
            </p>
          </div>

          <div>
            <p className={`text-sm font-medium text-center ${textColor}`}>
              {comment}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSummary;
