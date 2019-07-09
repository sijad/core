import { withExtend } from '../common/extend';
import PrimaryHeader from './PrimaryHeader';

function Drawer() {
  return (
    <div id="drawer" className="App-drawer">
      <header id="header" className="App-header">
        <div id="header-navigation" className="Header-navigation"></div>
        <div className="container">
          <h1 className="Header-title">
            <a href="http://localhost:8484" id="home-link">
              Test Ignore users
            </a>
          </h1>
          <PrimaryHeader items={[]} />
          <div id="header-secondary" className="Header-secondary"></div>
        </div>
      </header>
    </div>
  );
}

export default withExtend(Drawer);
