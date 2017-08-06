import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeckGL, { PolygonLayer } from 'deck.gl';
import { setParameters } from 'luma.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
  ambientRatio: 0.05,
  diffuseRatio: 0.6,
  specularRatio: 0.8,
  lightsStrength: [2.0, 0.0, 0.0, 0.0],
  numberOfLights: 2
};

class DeckGLOverlay extends Component {
  static propTypes = {
    viewport: PropTypes.object.isRequired,
    buildings: PropTypes.object.isRequired
  }

  static get defaultViewport() {
    return {
      longitude: -74,
      latitude: 40.72,
      zoom: 13,
      maxZoom: 16,
      pitch: 45,
      bearing: 0
    };
  }

  _initialize(gl) {
    setParameters(gl, {
      depthTest: true,
      depthFunc: gl.LEQUAL
    });
  }

  render() {
    const {viewport, buildings} = this.props;

    if (!buildings) {
      return null;
    }

    const layers = [
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        fp64: true,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: () => [74, 80, 87],
        lightSettings: LIGHT_SETTINGS
      })
    ];

    return (
      <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize} />
    );
  }
}

export default DeckGLOverlay;