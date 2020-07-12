require('./style.mn.js');
const React = require('react');
const {render} = require('react-dom');
const get = require('mn-utils/get');
const detection = require('mn-utils/browser/detection');

document.body.className = detection(get(window, 'navigator.userAgent'));
render(<App/>, document.getElementById('app'));


function App() {
  return (
    <div className="h100vh rlv bgE-D">
      <div className="fixed sht bs b0 bb1 bcC bgF">
        <div className="tbl w h50">
          <div className="ph15">
            Header
          </div>
        </div>
      </div>
      <div className="abs shb st50 ovxH ovyA">
        <div className="tbl sq">
          <div className="p15 pb65 rlv tc">
            <div className="f30">Minimalist Notation</div>
            <div className="fCustom fCustomBig*2">Example</div>
            <div className="sq40 rlv bg0 spnr3000 mhA mt50"/>
            <div className="abs shb bs b0 bt1 bcC bgF">
              <div className="tbl w h50">
                <div className="ph15">
                  <div className="rlv st1">
                    Footer <span className="mh5">©</span> {
                      (new Date()).getFullYear()
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
