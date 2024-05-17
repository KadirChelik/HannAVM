import 'bootstrap/dist/css/bootstrap.min.css';
function Header({headerText,motto}) {
    return (
        <div className="page-header p-3">
        <div className="row">
          <div className="col-lg-6" style={{ height: '100vh' }}>
            <h1>
              {headerText} <small>{motto}</small>
            </h1>
          </div>
        </div>
      </div>
    );
  }
  export default Header;
  