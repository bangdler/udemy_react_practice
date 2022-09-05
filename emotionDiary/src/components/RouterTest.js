import { Link, NavLink } from 'react-router-dom';

export function RouterTest() {
  return (
    <>
      <Link to={'/'}>Home</Link>
      <br />
      <Link to={'/edit'}>edit</Link>
      <br />
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/new'}>
        new
      </NavLink>
    </>
  );
}
