import SliderFilms from '../../components/main/slider-films/slider-films';
import Proposal from '../../components/proposal/proposal';
import Content from './components/content';
import SearchFilm from './components/search-film';


const Main = () => (
  <main className='maim'>
    <section className="films-section">
      <div className='wrapper-films' >
        <SearchFilm />
        <h2 className='films-section__title'>New movies on the website</h2>
        <SliderFilms />
      </div>
    </section>

    <Proposal />
    <div className='wrapper-films' >
      <Content />
    </div>
  </main>
);

export default Main;
