
import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Chapter, Screen, Question } from "../types";
import QuestionRenderer from "./QuestionRenderer";
import NavigationButtons from "./NavigationButtons";
import { clear } from "console";


type Props = { chapters: Chapter[] };
type FormValues = {
  [key: string]: any; // every answer is keyed by questionId
};

export default function MultiStepForm({ chapters }: Props) {
  // Flatten screens
  const screens: Screen[] = useMemo(() => chapters.flatMap((c) => c.screens), [chapters]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // react-hook-form
  const { register, handleSubmit, watch, setValue, getValues, reset, formState } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {},
  });

  // get the current screen object
  const currentScreen = screens[currentIndex];

  // compute if current screen valid (simple rule: all required questions have valid answers)
  const watched = watch(); // watch entire form (OK for small forms)
  const [isScreenValid, setIsScreenValid] = useState(false);

  useEffect(() => {
    const qList = currentScreen.questions;
    let ok = true;
    for (const q of qList) {
      if (q.required) {
        const val = watched[q.id];
        if (q.type === "text") {
          if (!val || (typeof val === "string" && val.trim() === "")) { ok = false; break; }
        } else if (q.type === "radio") {
          if (!val || val === "") { ok = false; break; }
        } else if (q.type === "checkbox") {
          if (!Array.isArray(val) || val.length === 0) { ok = false; break; }
        }
      }
    }
    setIsScreenValid(ok);
  }, [watched, currentScreen]);

  // navigation handlers
  const goBack = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };
 const goContinue = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();   // prevent accidental form submit
  if (currentIndex < screens.length - 1) {
    setCurrentIndex(currentIndex + 1);
  }
};


  // Submit final: collect answers in { questionId: answer } shape
  const onSubmit = (data: any) => {
    // Normalize: ensure checkboxes are arrays, etc.
    const answers: Record<string, string | string[] | undefined> = {};
    chapters.forEach((c) =>
      c.screens.forEach((s) =>
        s.questions.forEach((q) => {
          answers[q.id] = data[q.id];
        })
      )
    );
    console.log("Final answers:", answers);
    alert("Submitted — check console for { questionId: answer }");
   
    //back to main page
    setCurrentIndex(0);
    reset({});
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-md p-5">
      <div className="mb-4">
        <div className="bg-sky-500 pb-3 mb-5 pt-3"><h3 className="pt-5 text-3xl font-serif font-bold ">{currentScreen.title}</h3></div>
        <p className="text-sm font-bold text-gray-500">Screen {currentIndex + 1} of {screens.length}</p>
      </div>

      <div className="space-y-4">
        {currentScreen.questions.map((q: Question) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            register={register}
            setValue={setValue}
            value={getValues(q.id)}
            // pass an inline error detection so component can show message
            showError={() => {
              const v = watched[q.id];
              if (!q.required) return false;
              if (q.type === "text") return !v || (typeof v === "string" && v.trim() === "");
              if (q.type === "radio") return !v || v === "";
              if (q.type === "checkbox") return !Array.isArray(v) || v.length === 0;
              return false;
            }}
          />
        ))}
      </div>

      <div className="mt-6">
        <NavigationButtons
          isFirst={currentIndex === 0}
          isLast={currentIndex === screens.length -1}
          onBack={goBack}
          onContinue={goContinue}
          // disable Continue button if screen invalid
          disableContinue={!isScreenValid}
        />
      </div>
    </form>
    </div>
  );
}
