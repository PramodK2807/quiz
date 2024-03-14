import React, { useState } from "react";
import { questionAtom } from "../Recoil/atom/questionAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const Question = () => {
  const questions = useRecoilValue(questionAtom);
  const [_, setQuestions] = useRecoilState(questionAtom);
  const [crrQuest, setCrrQuest] = useState(1);
  const [staticQuestion, setStaticQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  console.log(questions);
  const handlePrev = () => {
    if (crrQuest === 1 || staticQuestion === 0) {
      alert("This is first question");
      return;
    } else {
      setCrrQuest((prev) => prev - 1);
      setStaticQuestion((prev) => prev - 1);
    }
  };
  const handleNext = (data) => {
    console.log(data);
    if (userAnswer !== "") {
      const updatedQuestions = questions.map((q) => {
        if (q.id === data?.id) {
          return { ...q, user_answer: userAnswer };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    }
    setUserAnswer("");
    setCrrQuest((prev) => prev + 1);
    setStaticQuestion((prev) => prev + 1);
  };

  return (
    <div className="position-relative scroll_bar">
      {questions &&
        questions?.slice(staticQuestion, crrQuest)?.map((q, i) => (
          <>
            <div>
              <h4>
                <span className="d-block"> Q. {q?.id}? </span>
                <span className="mt-3">{q?.question}</span>
              </h4>
              <div className="row">
                {q?.options?.map((option, i) => (
                  <>
                    <div className="option col-6" key={i}>
                      <label htmlFor={`answer${[i]}`}>
                        <input
                          key={q.id}
                          className="position-relative"
                          type="radio"
                          id={`answer${[i]}`}
                          name={`question_${q.id}`}
                          value={option}
                          defaultChecked={q?.user_answer === option}
                          onChange={(e) => setUserAnswer(e.target.value)}
                        />
                        <span className="ms-2"> {option}</span>
                      </label>
                    </div>
                  </>
                ))}
              </div>
              <div className="">
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-primary rounded-pill px-5 py-2"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    className={`btn rounded-pill px-5 py-2 ${
                      crrQuest === questions?.length
                        ? "btn-warning"
                        : "btn-primary"
                    } `}
                    onClick={() => {
                      handleNext(q);
                    }}
                  >
                    {crrQuest === questions?.length ? "Submit" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Question;
