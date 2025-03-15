import { BrowserRouter } from 'react-router-dom';  // Importa BrowserRouter
import './App.css';
import LoginForm from './Login';

function App() {
  return (
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
}

export default App;