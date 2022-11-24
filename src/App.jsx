import "./App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagsInput from "./component/Tags";
import { useState } from "react";
import axios from "axios";

function App() {
  const [words, setWords] = useState(["M**i"]);
  const [name, setName] = useState("Anonymous");

  const selected = (tags) => {
    setWords(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/words/", {
        name,
        words,
      });
      toast.success(response.data.message);
      setWords([]);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="App">
        <ToastContainer theme="dark" />
        <div className="form" onSubmit={handleSubmit}>
          <TagsInput words={words} setWords={setWords} selected={selected} />
          {words.length >= 5 ? (
            <>
              <div className="bottom">
                <input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <button onClick={handleSubmit} className="send" type="submit">
                  Submit
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <p>Powered by &copy; neeswebservices</p>
    </>
  );
}

export default App;
