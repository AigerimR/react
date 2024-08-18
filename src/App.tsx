import "./App.css";
import Main from "./views/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Form1 from "./views/Form1/Form1";
import Form2 from "./views/Form2/Form2";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
