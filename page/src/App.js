import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loaded: false,
    images: []
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/FLISOL-Argentina/calcos/contents')
      .then(res => res.json())
      .then(files => {
        files = files
          .filter(({type}) => type === 'file')
          .filter(({name}) => name.includes('svg'));
        return this.getImagesTags(files);
      })
      .then(images => this.setState({images, loaded: true}))
  }

  getImage = (name, svg, png) => (
      <div className='col-xs-4' key={name}>
        <div className='panel panel-default image'>
          <div className='panel-heading'>
            <h4 className='panel-title'>{name.replace('.svg', '')} <a href={svg}>[svg]</a> <a href={png}>[png]</a></h4>
          </div>
          <div className='panel-body'>
            <a href={svg}>
              <img src={png} className='calco'/>
            </a>
          </div>
      </div>
    </div>
  )

  getImagesTags(files){
    const images = files
      .map(({name, download_url:svg}) => {
        const png = svg.replace('svg','png');
        return this.getImage(name, svg, png);
      });
    return images;
  }

  render() {
    const {loaded, images} = this.state;
    if (!loaded) return 'Cargando imagenes';
    return (
      <div className="App row">
        <header className="App-header col-xs-12">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calcos FLISOL Argentina</h1>
        </header>
        <div className='images col-xs-12'>
          { images }
        </div>
      </div>
    );
  }
}

export default App;
