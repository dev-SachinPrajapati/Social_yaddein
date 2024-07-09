import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import memoriesLogo from '../../images/SACHIN.png';
import memoriesText from '../../images/SACHIN.png';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 shadow-md">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link to="/" className="flex items-center">
          <img src={memoriesText} alt="memoriesText" className="h-10 mr-2" />
          <img src={memoriesLogo} alt="memoriesLogo" className="h-8" />
        </Link>
      </div>
      <div className="flex-grow text-right">
        {user?.result ? (
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">{user?.result.name}</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
