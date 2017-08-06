import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import { BUILDING_URL, MAPBOX_TOKEN } from '../common/variable';
import { json as requestJson } from 'd3-request';
import DeckGLOverlay from './DeckGLOverlay';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      buildings: null,
      trips: null,
      time: 0
    };

    requestJson(BUILDING_URL, (error, response) => {
      if (!error) {
        this.setState({buildings: response});
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange = viewport => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, buildings} = this.state;
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      buildings: null
    };


    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <DeckGLOverlay
          viewport={viewport}
          buildings={buildings}
        />
      </MapGL>
    );
  }
}

export default Map;
