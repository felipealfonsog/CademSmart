import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import moment from 'moment';

import { CADEM_COLOR_BLUE } from '../../constants/index';

//----------------------------------------------------------------------------
// RC 1.0.1 - Soft. Engr. f.alfonso.go@gmail.com
// I'm walking like a blind |----°-----|-----°------
// I need to define the constant actions in a separate file. 


// load it to create a store ... 
import { createStore } from 'redux';
// load the reducers 
import reducers from '../root-reducers.js';

import {EnterName} from '../component/Component_class.js';
var EnterName = require('../component/Component_class');

import { CHECK_CITY_WEATHER } from '../actionTypes'

// I'm not sure if this is gonna work or not, but I'm trying to figure out how to.


export default class Weather extends Model {
  static get fields() {
      return {
          id: attr(),
          previsionText: attr(),
          iconId: attr(),
          temperature: attr(),
      }
  }

  static get modelName() {
      return 'Weather';
  }

  static reducer(action, Weather, cityData) {
      switch(action.type){
          case CHECK_CITY_WEATHER:
          const weatherID = action.weather[0].MobileLink.split("/")[6];
          Weather.create({
              id: weatherID,
              previsionText: action.weatherInfo[0].WeatherText,
              iconId: action.weatherInfo[0].icon,
              temperature: action.time[0].temps.humedad.Value,
          });
          break;
      }
  }
}

// playing around with the code !|°----°----°-----°-----°
// define the initial state ... .
const initialState = {
    todos: [],
};
// create tthe store
const store = createStore(reducers, initialState);
export default store;

// °------------------------°_------------------------°°°°


function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(Weather);

Weather.propTypes = {
  weather: PropTypes.array,
};

// °_____°°°__------|-|-|--|-|-|_°°°°°°°°°°°°°°°°°°°°°°
