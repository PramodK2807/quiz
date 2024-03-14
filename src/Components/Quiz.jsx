import React, { useEffect, useState } from "react";
import Question from "./Question";
import LeftBar from "./LeftBar";
import { useRecoilState } from "recoil";
import { questionAtom } from "../Recoil/atom/questionAtom";

const Quiz = () => {
  // const [questions, setQuestions] = useState([]);
  const [_, setQuestions] = useRecoilState(questionAtom);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      let res = await fetch(
        "https://opentdb.com/api.php?amount=25&category=21&difficulty=medium&type=multiple"
      );
      let data = await res.json();

      let newQuestions = data?.results.map((item, i) => ({
        ...item,
        id: i + 1,
        user_answer: "",
        options: [...item.incorrect_answers, item.correct_answer],
      }));

      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 overflow-hidden">
          <div className="bg_grey rounded-3 px-3 py-2 ">
            <LeftBar />
          </div>
        </div>
        <div className="col-md-8 ">
          <div className="bg_grey rounded-3 px-3 py-2">
            <Question />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
