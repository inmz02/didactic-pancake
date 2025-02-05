import Header from "./comps/Header";
import { MainContainer } from "./comps/MainContainer";
import { AddComp } from "./comps/AddComp";
import { useState, useEffect } from "react";
import { initializeWindowSize } from "./comps/initWindowSize";
import "./styles.scss";
import { use } from "react";

if (typeof window !== "undefined" && window.electronAPI) {
  initializeWindowSize();
}

function App() {
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState("en");
  const [selectedTheme, setSelectedTheme] = useState(() => 
    localStorage.getItem("selectedTheme") || "theme-blue"
  );
  const [selectedMode, setSelectedMode] = useState(() => 
    localStorage.getItem("selectedMode") || "darkMode"
  );
  const [selectedDateFormat, setSelectedDateFormat] = useState("chineseKorean");

  // ✅ Apply theme and save to localStorage
  useEffect(() => {
    document.documentElement.classList.remove("theme-blue", "theme-pink", "theme-green", "theme-purple", "theme-orange");
    document.documentElement.classList.add(selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme);
  }, [selectedTheme]);

  // ✅ Apply mode and save to localStorage
  useEffect(() => {
    document.documentElement.classList.remove("lightMode", "darkMode");
    document.documentElement.classList.add(selectedMode);
    localStorage.setItem("selectedMode", selectedMode);
  }, [selectedMode]);


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
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />
    </div>
  );
}

export default App;
