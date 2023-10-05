import Hero from "./components/Hero";
import Summary from "./components/Sumarry";
import Header from "./components/Header";
import "./App.css";


const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="app">
        <Header />
        <Hero />
        <Summary />
      </div>
    </main>
  );
};

export default App;
