import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import News from "../components/news/News/News";
import { Route, Routes } from "react-router-dom";
import { router } from "../components/news/config/config";
import LoadingBar from "react-top-loading-bar";

function NewsPage() {
  const [progress, setProgress] = useState(0);
  const pageSize = 7;
  document.body.style.backgroundColor = "rgb(36, 39, 41)";
  return (
    <>
      <LoadingBar color="#005abb" height={3} progress={progress} />
      <Routes>
        {router.map((path) => (
          <Route
            exact
            key={uuidv4()}
            path={path.path}
            element={
              <News
                setProgress={setProgress}
                key={path.key}
                category={path.category}
                pageSize={pageSize}
                country={path.country}
              />
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default NewsPage;
