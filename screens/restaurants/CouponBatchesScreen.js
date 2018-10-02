import React from "react";
import {
  Text,
  ScrollView,
  View,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import axios from "axios";
import { rootIP } from "react-native-dotenv";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-material-cards";
import { Ionicons } from '@expo/vector-icons';

class CouponBatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Coupon Batches",
      headerRight: (<Ionicons name="md-list" size={32} color="red" style={{ padding: 10}} onPress={() => navigation.navigate('CreateCouponBatch')} />),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      } 
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: {},
      res_swipe: "",
      res_impression: "",
      res_redeem: ""
    };
  }

  componentDidMount() {
    this._onFocusListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/coupon_batches`
          )
          .then(response => {
            this.setState({
              data: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/swipe`
          )
          .then(response => {
            this.setState({
              res_swipe: response.data[0].count
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/impression`
          )
          .then(response => {
            this.setState({
              res_impression: response.data[0].sum
            });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `http://${rootIP}:3001/api/restaurants/${
              this.props.currentRestaurant
            }/redeem`
          )
          .then(response => {
            this.setState({
              res_redeem: response.data[0].count
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { res_impression, res_swipe, res_redeem } = this.state;
    return (
      <View style={styles.container}>
        <Text>STATISTICS FOR ALL ADS</Text>
        <Text>Total Impressions: {res_impression}</Text>
        <Text>Total # of Swipes: {res_swipe}</Text>
        <Text>Total # of redeemed ads: {res_redeem}</Text>
        {this.state.data && (
          <ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => navigate("CouponBatchDetail", { item: item })}
                >
                  <Card>
                  <CardImage source={{ uri: item.image }} resizeMode="center" />
                    <CardTitle
                      title={item.dish_name}
                      subtitle={item.description}
                    />
                  </Card>
                </TouchableHighlight>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    fontWeight: "bold"
  }
});

function mapStateToProps({ currentRestaurant }) {
  return { currentRestaurant };
}

export default connect(
  mapStateToProps,
  actions
)(CouponBatchesScreen);
