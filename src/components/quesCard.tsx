import { useState } from "react";
import { questionPropsType } from "../Types/quizTypes";


const QuesCard: React.FC<questionPropsType> = ({ question, options ,callBack }) => {
    // console.log(question, options);

    let [answer, setAnswer] = useState('')

    const submittedAnswer = (evt:any)=>{
        // console.log(evt.target.value);
        setAnswer(evt.target.value)
    }

    return <div className="question-container">
        <div className="question">
            {question.trim()}
        </div>

        <form className="question-form" onSubmit={(evt:React.FormEvent<EventTarget>)=>callBack(evt , answer)}>
            {
                options.map((opt: string, index: number) => {
                    return <div key={index}>
                        <label className="radio">
                            <input 
                            
                            type='radio' 
                            required
                            name="opt"
                            checked={answer === opt} 
                            value={opt}
                            onChange={submittedAnswer}
                            />
                            {opt}
                        </label>
                    </div>
                })
            }
            <button className="submit">Submit </button>
        </form>

    </div>

}

export default QuesCard;