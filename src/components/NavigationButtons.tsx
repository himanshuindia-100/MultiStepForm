
import React from "react";

type Props = {
  onBack: () => void;
  onContinue: () => void;
  isFirst: boolean;
  isLast: boolean;
  disableContinue?: boolean;
};

export default function NavigationButtons({ onBack, onContinue, isFirst, isLast, disableContinue }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={!!isFirst}
        className={"btn btn-back flex-1 py-2 rounded-md border "}
      >
        Back
      </button>

      {!isLast ? (
        <button
         type="button"
         onClick={(e) => {
         e.preventDefault();   // stops accidental submit
         onContinue();
        }}
        disabled={!!disableContinue}
        className="btn btn-continue flex-1 py-2 rounded-md text-white"
        >
       Continue
      </button>


      ) : (
        <button type="submit" disabled={!!disableContinue} className="btn btn-submit flex-1 py-2 rounded-md text-white">
          Submit
        </button>
      )}
    </div>
  );
}
