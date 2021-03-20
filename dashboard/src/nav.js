import React from 'react';
import { NavLink } from 'react-router-dom';

const routes = [
  { to: '/mural', label: 'Mural' },
  { to: '/skills', label: 'Art View' },
  { to: '/experience', label: 'Account View' },
  //{ to: '/projects', label: 'Projects' }
];

const Nav = () => {
  const links = routes.map(({ to, label }) => {
    return <li className="navlink"><NavLink strict exact to={to} key={to}><button className="button-success">{label}</button></NavLink></li>}
  )

  return <nav>{ links }</nav>;
}

export default Nav

