import "./App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagsInput from "./component/Tags";
import { useState } from "react";
import axios from "axios";
import Docs from "./component/docs";
import { useEffect } from "react";

export const API = "https://mulaa.onrender.com/api/v1/words";

function App() {
  const [words, setWords] = useState(["M**i"]);
  const [name, setName] = useState("Anonymous");
  const [loading, setLoading] = useState(false);

  const set = JSON.parse(localStorage.getItem("set")) ?? true;

  const [open, setOpen] = useState(set);

  const selected = (tags) => {
    setWords(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API, {
        name,
        words,
      });
      toast.success(response.data.message);
      setWords([]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
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
                {loading ? (
                  <>
                    <button class="buttonload">
                      <i class="fa fa-refresh fa-spin"></i>Loading
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="send"
                      type="submit"
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </>
          ) : null}
        </div>
        {open && <Docs setOpen={setOpen} />}
      </div>
      <p>Powered by &copy; nws | Nepal</p>
    </>
  );
}

export default App;
