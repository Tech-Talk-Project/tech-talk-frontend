import React, { Suspense } from "react";
import Loader from "../components/Common/Loader";
import CreateBoardPageMain from "../components/Board/CreateBoard/CreateBoardPageMain";

export default function CreateBoardPage() {
  return (
    <main className="flex justify-center w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
      <Suspense fallback={<Loader />}>
        <CreateBoardPageMain />
      </Suspense>
    </main>
  );
}