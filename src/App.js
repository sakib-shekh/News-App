import "./App.css";
import News2 from "./components/News2";
import Navbar from "./components/Navbar";

import { BrowserRouter , Route, Routes } from "react-router-dom";

function App() {
  
let  apikey = process.env.REACT_APP_KEY;

  return (
    
    <BrowserRouter>
    {
      console.log(process.env.REACT_APP_NEWS_API)
    }
    <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <News2 key="general" country={"in"} category={"general"} apikey={`${apikey}`} PageValue={6}  />
          }
        />
        <Route
          path="/technology"
          element={
            <News2 key="technology" country={"in"} category={"technology"} apikey={`${apikey}`} PageValue={6} />
          }
        />
        <Route
          path="/business"
          element={<News2 key="business" country={"in"} category={"business"} apikey={`${apikey}`} PageValue={6} />}
        />
        <Route
          path="/science"
          element={<News2 key="science" country={"in"} category={"science"} apikey={`${apikey}`} PageValue={6} />}
        />
        <Route
          path="/sports"
          element={<News2 key="sports" country={"in"} category={"sports"} apikey={`${apikey}`} PageValue={6} />}
        />
        <Route
          path="/health"
          element={<News2 key="health" country={"in"} category={"health"} apikey={`${apikey}`} PageValue={6} />}
        />
        <Route
          path="/entertainment"
          element={
            <News2 key="entertainment" country={"in"} category={"entertainment"} apikey={`${apikey}`} PageValue={6} />
          }
        />
        <Route path="*" element={<h1>no such page</h1>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
