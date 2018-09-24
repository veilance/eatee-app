import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import axios from "axios";
import { SearchBar } from "react-native-elements";

const authToken =
  "Bearer JIba6FRPuS1u8_G-7HeYFxOEn1hP8OiBz8SNySU0VlWpzKY8hx0E9hJulfTId43tLaDk-0inreQzymHn54GF5wGULtbEUy8yggF0564R5ESptLfg4X9m_mA0FJ6mW3Yx";
const config = {
  headers: {
    Authorization: authToken
  },
  params: {
    phone: "+16046858817"
  }
};

export default class RestaurantLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      query: ""
    };
  }

  componentWillMount() {
    axios
      .get("https://api.yelp.com/v3/businesses/search/phone", config)
      // .then(response => console.log(response.data.businesses[0]))
      .then(response => {
        this.setState({
          isLoading: false,
          data: response.data.businesses
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _handleQueryChange = query =>
    this.setState(state => ({ ...state, query: query || "" }));

  _handleSearchCancel = () => this._handleQueryChange("");
  _handleSearchClear = () => this._handleQueryChange("");

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <SearchBar
          onChangeText={this._handleQueryChange}
          onCancel={this._handleSearchCancel}
          onClear={this._handleSearchClear}
          value={this.state.query}
        />
      </View>
    );
  }
}
