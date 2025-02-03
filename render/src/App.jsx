import Header from "./comps/Header";
import { MainContainer } from "./comps/MainContainer";
import { AddComp } from "./comps/AddComp";
import { useState, useEffect } from "react";
import { initializeWindowSize } from "./comps/initWindowSize";

if (typeof window !== "undefined" && window.electronAPI) {
  initializeWindowSize();
}

function App() {
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState("en");

  const [selectedDateFormat, setSelectedDateFormat] = useState("chineseKorean");

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todo-items"));
    if (savedItems && Array.isArray(savedItems)) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todo-items", JSON.stringify(items));
    }
  }, [items]);

   const addItem = (text) => {
     const newItem = { text, completed: false };
     const updatedItems = [...items, newItem];
     setItems(updatedItems);
   };

   const toggleCompletion = (index) => {
     const updatedItems = items.map((item, i) =>
       i === index ? { ...item, completed: !item.completed } : item
     );
     setItems(updatedItems);
   };

  return (
    <div className="sm:w-full lg:w-[20%] w-full border border-[#b5b5b5] bg-[#eeeeee] h-full flex flex-col rounded-sm">
      <Header lang={lang} />

      <MainContainer
        items={items}
        toggleCompletion={toggleCompletion}
        setItems={setItems}
        lang={lang}
        selectedDateFormat={selectedDateFormat}
        setSelectedDateFormat={setSelectedDateFormat}
      />

      <AddComp
        addItem={addItem}
        lang={lang}
        setLang={setLang}
        selectedDateFormat={selectedDateFormat}
        setSelectedDateFormat={setSelectedDateFormat}
      />
    </div>
  );
}

export default App;
