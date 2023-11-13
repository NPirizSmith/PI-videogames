import { Link } from 'react-router-dom';


export default function Landingpage() {

  return (
    <div>
        <Link to="/home">
          <button>Entrar</button>
        </Link>
    </div>
  );
}