import {Route, Routes, Navigate} from "react-router-dom"
import NewNote from "./pages/NewNote"
import NoteList from "./pages/NoteList"
import NoteLayot from "./pages/NoteLayot"
import EditNote from "./components/EditNote"


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<NoteList/>}/>
      <Route path="/new" element={<NewNote />}/>
      <Route path='/:id' element={<NoteLayot/>}/>
      <Route path='/:id/edit' element={<EditNote/>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default App
