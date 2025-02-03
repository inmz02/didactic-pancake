import Header from "./comps/Header";
import { MainContainer } from "./comps/MainContainer";
import { AddComp } from "./comps/AddComp";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState("en");

  // ✅ Ensure selectedDateFormat is properly set and passed
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

  return (
    <div className="sm:w-full lg:w-[20%] w-full border border-[#b5b5b5] bg-[#eeeeee] h-full flex flex-col rounded-sm">
      <Header lang={lang} />

      {/* ✅ Pass both selectedDateFormat and setSelectedDateFormat */}
      <MainContainer
        items={items}
        toggleCompletion={() => {}}
        setItems={setItems}
        lang={lang}
        selectedDateFormat={selectedDateFormat}
        setSelectedDateFormat={setSelectedDateFormat}
      />

      <AddComp
        addItem={() => {}}
        lang={lang}
        setLang={setLang}
        selectedDateFormat={selectedDateFormat}
        setSelectedDateFormat={setSelectedDateFormat}
      />
    </div>
  );
}

export default App;
