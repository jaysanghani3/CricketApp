import Cric from './Cric/Cric';
import Scorecard from "./Cric/Scorecard";
import Squads from "./Cric/Squads";
import News from "./Cric/News";
import { NavLink, Route, Routes } from "react-router-dom";

function App() {
  return (<>
  <div className="row">
          <NavLink to="/" className="btn col">Live Score</NavLink>
          <NavLink to="/scorecard" className="btn col">Score Card</NavLink>
          <NavLink to="/squads" className="btn col">Squads</NavLink>
          <NavLink to="/news" className="btn col">News</NavLink>
      </div>
    
    <Routes>
          <Route path="/" element={<Cric/>}/>
          <Route path="/scorecard" element={<Scorecard/>}/>
          <Route path="/squads" element={<Squads/>}/>
          <Route path="/news" element={<News/>}/>
      </Routes>
      </>
  );
}

export default App;
