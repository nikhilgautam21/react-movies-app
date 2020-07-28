import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/header';
import Search from './components/search';
import Movie from './components/movie';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
 
  const getAllMovies = () =>{
    fetch(MOVIE_API_URL).then(response => response.json()).then(jsonResp =>{
      setMovies(jsonResp.Search);
      console.log(movies,"sf")
      setLoading(false);
    })
  }
  useEffect(() => {
    getAllMovies();
  }, [])

  const search = (searchValue) => {
    setLoading(true);
    setErrorMsg(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(resp => resp.json()).then(jsonResp => {
      if (jsonResp.Response === "True") {
        setMovies(jsonResp.Search);
        setLoading(false);
      } else {
        setErrorMsg(jsonResp.Error);
        setLoading(false);
        getAllMovies();
      }
    })
  }
  return (
    <div className="App">
        <Header title="Moviex"/>
        <Search search={search}/>
        <p className="App-intro">Hottest picks for you !!</p>
            {errorMsg && <div className="errorMsg">{errorMsg}</div>}
        <div className="movies">
          {loading ? (
            <span>loading...</span>
          ):(
            movies.map((movie, index)=>(
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
    </div>
  );
}

export default App;
