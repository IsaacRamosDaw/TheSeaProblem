import "./header.scss"
export function Header() {
  return ( 
    <header>
      <img src="Logo.svg" alt="" />
      <nav>
        <ul>
          <li><a href="http://localhost:5173/companies">Add my company</a></li>
          <li><a href="http://localhost:5173/companies/1">My company</a></li>
        </ul>
      </nav>
    </header> 
  );
}
