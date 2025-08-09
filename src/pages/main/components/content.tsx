import MainNavigation from '../../../components/main/main-navigation';
import SectionFilms from './section-films';
import Sort from './sort';
import TopRated from './top-rated';


const Content = () => (
  <>
    <MainNavigation />
    <Sort />
    <section className='films'>
      <SectionFilms />
      <TopRated />
    </section>
  </>

);

export default Content;
