import React, { Component } from "react";
import {
    Alert,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Slider,
    ScrollView,
    TextInput
} from "react-native";
import { styles, components, nav, colors } from "../iCaresrc";
import { connect } from "react-redux";
import { changeAnswer } from "../action";
import { Client, Message } from "react-native-paho-mqtt";

import Icon from "react-native-vector-icons/FontAwesome5";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";

const screenWidth = Dimensions.get("window").width;
data = {
    labels: ["5 AM", "5 30 AM", "6 AM", "6 30 AM", "7 AM", "7 30 AM"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2 // optional
        }
    ]
};
class sign extends Component {
    constructor(props) {
        super(props);

        this.arr = [
            props.patient.flow,
            props.patient.flow,
            props.patient.flow,
            props.patient.flow,
            props.patient.flow
        ];
        this.state = {
            flow: Number(props.patient.flow) || 0,
            arr: [...this.arr]
        };
    }

    onflowChange = () => {
        let [a, b, ...c] = this.arr;
        this.arr = [...c, this.state.flow, this.state.flow];
        this.setState({ arr: [...this.arr] });
    };

    goBack = comp => {
        return (
            <TouchableOpacity
                style={styles.headerButtonStyle}
                onPress={() => nav.popToRoot(this.props.componentId)}
            >
                {comp}
            </TouchableOpacity>
        );
    };

    showAlert = () => {
        Alert.alert("Updating ...!");
    };
    render() {
        return (
            <components.ImgBack>
                <components.Headers>
                    {this.goBack([
                        <Icon
                            key={styles.headerIconStyle.name}
                            name={styles.headerIconStyle.name}
                            size={styles.headerIconStyle.size}
                            color={colors.black}
                        />,
                        <Text
                            numberOfLines={3}
                            key={"Details"}
                            style={[styles.headerTextStyle]}
                        >
                            {"Details"}
                        </Text>
                    ])}
                </components.Headers>

                <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
                    <ScrollView>
                        <components.BlankCard
                            style={{
                                height: styles.HEIGHT * 0.27,
                                margin: 0,
                                padding: 0
                            }}
                        >
                            <View style={styles.blankCardContentStyle}>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: "white",
                                        padding: 4
                                    }}
                                >
                                    {this.props.patient.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#a6a6a6",
                                        margin: 4
                                    }}
                                >
                                    Bed no:{this.props.patient.pid}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#a6a6a6",
                                        margin: 4
                                    }}
                                >
                                    Infusion Liquid:{this.props.patient.dose}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#a6a6a6",
                                        margin: 4
                                    }}
                                >
                                    Evaluated Time:{this.props.patient.hrs}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#a6a6a6",
                                        margin: 4
                                    }}
                                >
                                    Flow:{this.props.patient.flow}
                                </Text>
                            </View>
                        </components.BlankCard>
                        <components.BlankCard>
                            <View style={styles.blankCardContentStyle}>
                                <Text
                                    style={[
                                        styles.blankCardTextStyle,
                                        { fontSize: 20, color: colors.second }
                                    ]}
                                >
                                    {"Control Value"}
                                </Text>
                                <View
                                    style={{
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: "#d6d7da",
                                        marginTop: 10,
                                        margin: 10,
                                        padding: 10
                                    }}
                                >
                                    <Slider
                                        step={1}
                                        maximumValue={250}
                                        value={Number(this.state.flow)}
                                        onValueChange={flow => {
                                            this.setState({ flow });
                                            const message = new Message(
                                                "" + flow
                                            );
                                            this.onflowChange();
                                            message.destinationName = "servo";
                                            this.props.client.send(message);
                                        }}
                                        thumbTintColor="black"
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                flow: this.state.flow + 1
                                            });
                                            this.onflowChange();
                                        }}
                                    >
                                        <View
                                            style={{
                                                margin: 3,
                                                height: 35,
                                                width: 60,
                                                backgroundColor: colors.second,
                                                justifyContent: "space-between",
                                                borderRadius: 20
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 22,
                                                    marginLeft: 23
                                                }}
                                            >
                                                +
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View>
                                        <View
                                            rounded
                                            style={{
                                                marginTop: 4,
                                                marginRight: 3,
                                                padding: 4,
                                                height: 35,
                                                marginLeft: 3,
                                                width: 90,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                borderColor: "grey",
                                                borderRadius: 5,
                                                borderWidth: 0.5
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 30
                                                }}
                                            >
                                                {this.state.flow}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    flow: this.state.flow - 1
                                                });
                                                this.onflowChange();
                                            }}
                                        >
                                            <View
                                                style={{
                                                    margin: 3,
                                                    height: 35,
                                                    width: 60,
                                                    backgroundColor:
                                                        colors.second,
                                                    justifyContent:
                                                        "space-between",
                                                    borderRadius: 20
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 22,
                                                        marginLeft: 23
                                                    }}
                                                >
                                                    -
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </components.BlankCard>
                        <components.BlankCard>
                            <Text
                                style={[
                                    styles.blankCardTextStyle,
                                    { fontSize: 20, color: colors.second }
                                ]}
                            >
                                {"Flow Graph"}
                            </Text>
                            <LineChart
                                data={{
                                    labels: [
                                        "5 AM",
                                        "5 30 AM",
                                        "6 AM",
                                        "6 30 AM",
                                        "7 AM",
                                        "7 30 AM"
                                    ],
                                    datasets: [
                                        {
                                            data: this.state.arr,
                                            strokeWidth: 2 // optional
                                        }
                                    ]
                                }}
                                width={screenWidth}
                                height={220}
                                bezier
                                chartConfig={{
                                    backgroundGradientFrom: "#0693e3",
                                    backgroundGradientTo: "black",
                                    color: (opacity = 1) =>
                                        `rgba(26, 255, 146, ${opacity})`,
                                    strokeWidth: 2 // optional, default 3
                                }}
                            />
                        </components.BlankCard>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.changeAnswer("REMOVE", {
                                    ...this.props.patient
                                });
                                Navigation.pop(this.props.componentId);
                                const message = new Message("0");
                                message.destinationName = "servo";
                                this.props.client.send(message);
                            }}
                        >
                            <components.BlankCard>
                                <Text
                                    style={[
                                        styles.blankCardTextStyle,
                                        {
                                            fontSize: 20,
                                            color: "red",
                                            marginLeft: 150,
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    {"Stop"}
                                </Text>
                            </components.BlankCard>
                        </TouchableOpacity>
                    </ScrollView>
                </components.MainLayer>
            </components.ImgBack>
        );
    }
}

export default connect(
    null,
    { changeAnswer }
)(sign);

iCARE FLOW-SIH 2019 (Hardware)


A Prototype video of the project iCARE FLOW  for Smart India Hackathon 2019 (Hardware Edition)
