import "./docs.scss";
import { BiXCircle } from "react-icons/bi";

const Docs = ({ open, setOpen }) => {
  const change = () => {
    setOpen((prev) => !prev);
    localStorage.setItem("set", false);
  };
  return (
    <div className="docs">
      <BiXCircle onClick={change} className="icon" size={30} />
      <h2>
        What is <span className="underline">Mulaa</span> ?
      </h2>
      <p className="--color-red">
        Mulaa is a open source contribution for all the nepali peoples which
        they can contribute slang, vulgar and rough word in the community for
        API.
      </p>
      <p className="--color-green">
        If you want to filter your input via the slang and vulgar word we are
        releasing our API soon so you can stick to us.
      </p>
    </div>
  );
};

export default Docs;
