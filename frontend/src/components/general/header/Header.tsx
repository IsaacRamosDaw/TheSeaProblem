import "./header.scss"
export function Header() {
  return ( 
    <header>
      <img src="Logo.svg" alt="" />
      <nav className="nav">
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Report</a></li>
          <li><a href="">About</a></li>
        </ul>
      </nav>
    </header> 
  );
}
