
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
              formatLabel={ (value) => moment(xAccesor).format('HH:mm') } // Possible error in this line, not sure.
              // I fixed aboved with a the var xAccesor °-|--|-|-|-|-|-|-|-°
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


    module.export = Component_class;