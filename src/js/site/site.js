import Home from './home/home';
import About from './about/about';

const Site = {
  getRoutes() {
    return {
      '/': Home,
      '/about': About
    };
  }
};

export default Site;
