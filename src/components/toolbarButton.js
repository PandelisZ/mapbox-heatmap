import * as React from 'react';
import './toolbarButton.css'

export default class App extends React.Component {

   render() {
    return (
      <img className="toolbar-button" src={'/assets/' + this.props.icon + '.svg'} alt={this.props.icon}/>
    );
  }
}
