import React, { useState } from "react";
import { debounce } from "lodash";

import "./App.css";

function App() {
  console.log("랜더링");
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedOnChange = debounce(onChange, 200);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" onChange={debouncedOnChange} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default App;
