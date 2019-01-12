const React = require('react');
const { render } = require('react-dom');
const { Component } = React;
const dom = React.createElement;

const ready = require('mn-services/ready');


ready(() => {
	render(<App/>, document.querySelector('[root]'));
});


const App = () => {
  return (
    <div m="h100vh rlv bgE-D">
      <div m="abs sht bsSolid b0 bb1 bcC bgF">
        <div m="tbl w h50">
          <div m="ph15">
            Header
          </div>
        </div>
      </div>
      <div m="abs shb st50 ovxHidden ovyScroll">
        <div m="tbl sq">
          <div m="p15 pb65 rlv tc">

            <div m="f30">Minimalist Notation</div>

            <div m="abs shb bsSolid b0 bt1 bcC bgF">
              <div m="tbl w h50">
                <div m="ph15">
                  <div m="rlv st1">Footer <span m="mh5">©</span> {(new Date()).getFullYear()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
