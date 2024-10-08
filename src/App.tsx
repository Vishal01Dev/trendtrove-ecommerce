import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import routes from './utils/routes';

function App() {
  return (

    <>
      <section className='max-w-[2160px] mx-auto'>

        <Router>

          <Header />
          <main className='px-5 sm:px-10 md:px-16 lg:px-24 pt-20'>
            <Routes>

              {
                routes.map(route => (
                  <Route Component={route.Component} key={route.path} path={route.path} />
                ))
              }
            </Routes>
          </main>
          <Footer />
        </Router>

      </section>
    </>

  );
}

export default App;
