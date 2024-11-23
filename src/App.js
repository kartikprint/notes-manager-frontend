
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Component/Header.tsx'
import NoteForm from "./Component/NoteForm.tsx"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
     
      {/* <Route path="/search" element={<SearchBar/>} /> */}
      <Route path="/" element={<NoteForm/>} />
       </Routes>
      </BrowserRouter>
     
      
      
    </div>
  );
}

export default App;
