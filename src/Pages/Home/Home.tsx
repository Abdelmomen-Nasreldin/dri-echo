import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Natiq</h1>
      <p>Natiq is a service that allows you to write Arabic text and then speak it with an electronic voice, with the last word repeated three times.</p>
      <Link to="/natiq">
        <button className="">Natiq Page</button>
      </Link>
    </div>
  );
};

export default Home;
