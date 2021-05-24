import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';

import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
