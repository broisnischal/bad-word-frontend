import { useRef, useState } from "react";
import "./Tags.scss";
import { BiXCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const TagsInput = ({ words, setWords, selected }) => {
  // const [tag, setTags] = useState(props.words);
  const inputRef = useRef();

  const validate = (text) => {
    return String(text)
      .toLowerCase()
      .match(/[0123456789!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);
  };

  const addTag = (e) => {
    if (e.target.value.length >= 3) {
      if (e.target.value !== "") {
        if (!validate(e.target.value)) {
          if (!words.includes(e.target.value)) {
            setWords([
              ...words,
              e.target.value.toString().toLowerCase().trim(),
            ]);
            selected([
              ...words,
              e.target.value.toString().toLowerCase().trim(),
            ]);
            inputRef.current.value = "";
          } else {
            toast.error("Duplicate entry!");
          }
        } else {
          toast.error("Invalid Entry !");
        }
      }
    } else {
      toast.info("Minimum 3 characters!");
      return console.log("Minimum 3 characters!");
    }
  };

  const removeTag = (indextoremove) => {
    setWords(words.filter((_, index) => index !== indextoremove));
    selected(words.filter((_, index) => index !== indextoremove));
  };

  return (
    <div className="Tags">
      <ul>
        {words?.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <BiXCircle className="icon" onClick={() => removeTag(index)} />
          </li>
        ))}
      </ul>

      <div className="place">
        <input
          maxLength={25}
          ref={inputRef}
          type="text"
          placeholder="Badword goes here..."
          onKeyUp={(e) => (e.key === "Enter" ? addTag(e) : null)}
        />
      </div>
    </div>
  );
};

export default TagsInput;
