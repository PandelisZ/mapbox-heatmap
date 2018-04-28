import * as React from 'react';
import './App.css'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import ToolbarBtn from './components/toolbarButton';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

// tslint:disable-next-line:no-var-requires
const data = require('./heatmapData.json');
// tslint:disable-next-line:no-var-requires
const { token, styles } = {
  "token": "pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2o0MHp2cGtiMGFrajMycG5nbzBuY2pjaiJ9.QDApU0XH2v35viSwQuln5w",
  "styles": {
    "londonCycle": "mapbox://styles/alex3165/cj2hv9v4y00242slphcyk9oca",
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
    "basic": "mapbox://styles/mapbox/basic-v9",
    "outdoor": "mapbox://styles/mapbox/outdoors-v10"
  }
}

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  flex: 1
};

const layerPaint = {
  'heatmap-weight': {
    property: 'priceIndicator',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(33,102,172,0)',
    0.25,
    'rgb(103,169,207)',
    0.5,
    'rgb(209,229,240)',
    0.8,
    'rgb(253,219,199)',
    1,
    'rgb(239,138,98)',
    2,
    'rgb(178,24,43)'
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 50]]
  }
};

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }


   onStyleLoad = (map) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

   render() {
    this.center = [-0.109970527, 51.52916347];
    return (
      <div className="App">
        <Map
        style={styles.dark}
        center={this.center}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoad}
        >
          <Layer type="heatmap" paint={layerPaint}>
            {data.map((el, index) => (
              <Feature key={index} coordinates={el.latlng} properties={el} />
            ))}
          </Layer>
        </Map>
        <div className="InfoCard">
            <h2>Location Stats,</h2>
            <p><strong>57</strong> violent crimes in your area</p>
            <p><strong>23%</strong> average crime rate</p>
        </div>
        <div className="Toolbar">
          <div class="d-flex">
            <div class="mr-auto p-2">
              <ToolbarBtn icon="placeholder" />
              <select class="custom-select custom-select-lg mb-3 toolbar-button">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </select>
            </div>
            <div class="p-2 toolbar-button">
              <ToolbarBtn icon="calendar" />
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>
            <div class="p-2">
            <ToolbarBtn icon="handcuffs" />
              <select class="custom-select custom-select-lg mb-3 toolbar-button">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
