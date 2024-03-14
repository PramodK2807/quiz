import React from "react";
import { useRecoilValue } from "recoil";
import { questionAtom } from "../Recoil/atom/questionAtom";

const LeftBar = () => {
  const questions = useRecoilValue(questionAtom);
  console.log(questions);

  return (
    <>
      <div className="scroll_bar">
        <h5 className="text-center py-3 border-bottom w-100">
          Total number of questions
        </h5>
        <div className="mb-3">
          <p className="mb-0">
            <span className="dot green"></span>Correct Answer
          </p>
          <p className="mb-0">
            <span className="dot red"></span>Wrong Answer
          </p>
          <p className="mb-0">
            <span className="dot blue"></span>Unanswered Answer
          </p>
          <p className="mb-0">
            <span className="dot yellow"></span>Answered Answer
          </p>
        </div>
        <div className="row m-0 p-0 ">
          {questions &&
            questions?.map((q) => (
              <p className="col-3 p-0 px-1">
                <span
                  className={`question_numbers ${
                    q?.user_answer === ""
                      ? "bg-light text-dark"
                      : q?.user_answer === q?.correct_answer
                      ? "green text-white"
                      : "red text-white"
                  }`}
                >
                  {q?.id}
                </span>
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default LeftBar;
