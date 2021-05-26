import Search from './Search'
import { FaFilm } from 'react-icons/fa'

const  Header = () => {
  return (
    <header className="header">
      <h1><a href="/"><FaFilm/> My Movie Collection</a></h1>
      <Search/>
    </header>
  );
}

export default Header;
