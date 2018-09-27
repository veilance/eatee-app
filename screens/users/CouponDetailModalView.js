import React from "react";
import {
  Modal,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from "react-native";

export default class ModalView extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      result: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      result: nextProps.result
    });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(false);
        }}
      >
        <View>
          <View>
            <Text>Id: {this.state.result.id}</Text>
            <Text>Dish Name: {this.state.result.name}</Text>
            <Text>Time Limit: {this.state.result.time_limit}</Text>
            <Text>Unit Price: ${(this.state.result.price * 1).toFixed(2)}</Text>
            <Text>Your Price: ${(this.state.result.price * (this.state.result.discount / 100)).toFixed(2)} </Text>
            <TouchableHighlight
              onPress={() => {
                this.props.setModalVisible(false);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
