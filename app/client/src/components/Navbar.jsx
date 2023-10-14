import "../styles/navbar.scss"

const Navbar = ({ title }) => {
  return (
    <div className="navbar">
      <div className="brand">
        {/* <img src="" alt="LOGO" /> */}
        <span>Islamdocs</span>
      </div>
      <nav className="navbar-items left">
        <ul className="navbar-list">
          <li className="list-item">Home</li>
        </ul>
        <ul className="navbar-list">
          <li className="list-item">Quran</li>
        </ul>
        <ul className="navbar-list">
          <li className="list-item">About</li>
        </ul>
      </nav>
      <nav className="navbar-items right">
        <label className="lang-label" htmlFor="languages" for="languages" label="Languages" aria-label="Choose a language"></label>
        <select className="language-switch" name="lang" id="languages">
          <optgroup label="Choose a language">
            <option value={"ar"} defaultChecked aria-label="Arabic" label="Arabic">Arabic</option>
            <option value={"en"} aria-label="English" label="English">English</option>
          </optgroup>
        </select>
      </nav>
    </div>
  )
}

export default Navbar;