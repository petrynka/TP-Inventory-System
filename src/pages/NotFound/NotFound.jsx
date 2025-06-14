import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center animate-fadeIn">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
        
        <Link to="/orders" className="btn-primary inline-block">
            Вернуться к приходам
        </Link>
      </div>
    </div>
  );
};

export default NotFound;