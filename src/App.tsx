
import React from "react";
import MultiStepForm from "./components/MultiStepForm";
import { formConfig } from "./config";

function App() {
  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4
    bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300  ">
      <div className="w-full max-w-md ">
        <MultiStepForm chapters={formConfig} />
      </div>
    </div>
  );
}

export default App;
