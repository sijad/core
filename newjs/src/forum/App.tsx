import Drawer from './Drawer';
import { withExtend } from '../common/extend';

function App() {
  return (
    <>
      <div id="app-navigation" className="App-navigation"></div>

      <Drawer />

      <main className="App-content">
        <div id="content"></div>

        <div id="flarum-loading" style={{display: 'none'}}>
          Loading...
        </div>

        <div id="flarum-loading-error" style={{display: 'none'}}>
          <div className="Alert">
            <div className="container">
              Something went wrong while trying to load the full version of this
              site. Try hard-refreshing this page to fix the error.
            </div>
          </div>
        </div>

        <div className="App-composer">
          <div className="container">
            <div id="composer"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withExtend(App);
