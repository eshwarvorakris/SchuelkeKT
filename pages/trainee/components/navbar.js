function navbar() {
  
  return (
    <nav className="navbar-navigation navbar-light sticky-nav d-flex" style={{ width: 'inherit', border: "none", height: '6.5rem' }}>
      <a className="navbar-brand" style={{ fontWeight: "500" }} href="#"><h2><b>Dashboard</b></h2>
        <p style={{ marginTop: '-8px', fontSize: '10px' }}>Welcome Back!</p>
      </a>
      <div className="flex-row-reverse">
        <ul className="d-flex flex-row navbar-nav align-content-center" style={{ padding: '0px', width: '35vw' }}>
          <li className="notify-btn nav-item active" style={{ width: '50%' }}>
            <div className="form-group row">
              <input type="password" className="form-control" id="inputPassword" placeholder="Search" style={{ marginLeft: '-20px' }} />
            </div>
          </li>
          <li> <img src='/trainee-images/notification.png' alt="" style={{ marginTop: '25px' }} height={50} /></li>
          <li className="nav-item active face-tag">
            <button type="button" className="btn text-light profile-btn"
              style={{ backgroundColor: "#008bd6" }}>
              <a href="#"><img className="img-tag" src="/trainee-images/trainer.jpg"
                alt="" /></a>
              <a href="/trainee/traineeProfile.html"
                className="face-name text-light"><strong>Chandan</strong></a>
            </button>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default navbar;