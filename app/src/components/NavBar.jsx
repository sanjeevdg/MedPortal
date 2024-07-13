const NavBar = ({ theme }) => {
  return (
    <>
      <div className="navbar bg-base-100 fixed top-0 left-0 right-0 border-y z-50">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">MedPortal</a>
        </div>

        <div className="navbar-end">
          <div className="flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Themes</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </>
  );
};
export default NavBar;
