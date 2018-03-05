import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import moment from 'moment';

import { CADEM_COLOR_BLUE } from '../../constants/index';

//----------------------------------------------------------------------------
// RC 1.0.1 - Por Felipe Gonzalez Soft. Engr. / Developer
// I need to define the constant acctions in a separate file. 



// -----------

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

// 
// ---------------------------------

class Weather extends Component {
  renderWeather(cityData) {
    const city = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273,15)
      .slice(0, 6);
    const time = cityData.list.map(weather => moment(weather.dt_txt).toDate()).slice(0, 6);
    const icon = cityData.list.map(weather => weather.weather.map(pronos => pronos.icon))
      .slice(0, 1);
    const weatherIcon = `http://openweathermap.org/img/w/${icon}.png`;
    const humedad = cityData.list.map(weather => weather.main.humidity).slice(0, 6);

    const avgTemp = _.round(_.sum(temps.slice(0, 3)) / temps.slice(0, 3).length);
    const avgHum = _.round(_.sum(humedad) / humedad.length);

    const contentInset = { top: 20, bottom: 20 };

    return (
      <View key={ city }>
        <Text>Ciudad: { city } </Text>
        <Text>Temperatura: { avgTemp } </Text>
        <Text>Humedad: { avgHum } </Text>
        <Image style={{ width: 50, height: 50 }} source={{ uri: weatherIcon }} />

        <View style={ { width: 300, height: 200, flexDirection: 'row' } }>
          <YAxis
            data={ temps }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            formatLabel={ value => `${value}ºC` }
          />
          <LineChart
            style={ { flex: 1, marginLeft: 5 } }
            data={ temps }
            svg={{ stroke: CADEM_COLOR_BLUE }}
            contentInset={ contentInset }
          />
        </View>
        <View style={{ height: 10 }}>
        
          <XAxis
            style={{ marginHorizontal: -10, marginLeft: 30 }}
            data={ time } /*  */
            xAccesor={({ value }) => value }
            formatLabel={ (value) => moment(value).format('HH:mm') }
            contentInset={{ left: 20, right: 20 }}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
          />
        </View>
        { console.log(data) }
      </View>
    );
  }

  render() {
    return (
      <View>
        { this.props.weather.map(this.renderWeather) }
      </View>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(Weather);

Weather.propTypes = {
  weather: PropTypes.array,
};


// /
