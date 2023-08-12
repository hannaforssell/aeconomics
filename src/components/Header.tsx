import '../styles/Header.scss'

export const Header = () => {
  return (
    <header className='header'>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <span><strong>AEconomics</strong> - Your guide to crafting in Albion Online</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>


      {/* <div className="py-5 text-center container menu">

        <section className="container header-menu">
          <div className="row py-lg-4">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Craftable items and recipes</h1>
              <p className="lead text-body-secondary">
                Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
              <p>
                <a href="#" className="btn btn-primary my-2">Update recipes</a>
                <a href="#" className="btn btn-secondary my-2">Secondary action</a>
              </p>
            </div>
          </div>
        </section>
      </div> */}
    </header>
  );
}