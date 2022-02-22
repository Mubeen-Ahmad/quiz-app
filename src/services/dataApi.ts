import { useEffect } from "react";
import { QuestionType, QuizType } from "../Types/quizTypes";

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const getDetails = async (totalQ: number, level: string,): Promise<QuizType[]> => {
    let res = await fetch(`https://opentdb.com/api.php?amount=${totalQ}&difficulty=${level}&type=multiple`)
    let { results } = await res.json();
    // console.log(results);
    const quiz: QuizType[] = results.map((questionObject: QuestionType, ind: number) => {
        return {
            question: questionObject.question,
            answer: questionObject.correct_answer,
            correct_answer: questionObject.correct_answer,
            option: shuffleArray(questionObject.incorrect_answers.concat(questionObject.correct_answer))
        }
    })
    return quiz;
}