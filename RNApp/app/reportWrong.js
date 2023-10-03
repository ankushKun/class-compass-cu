import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, TextInput, Button, Image, Pressable, Linking, StatusBar as RNStatusBar } from 'react-native';
import icon from "../assets/icon.png"
import { useState } from 'react';
import close from "../assets/close.png"

export default function ReportWrong({ navigation }) {
    const [report, setReport] = useState("")

    function submitReport() {
        if (!report) return
        if (report.length < 10) return
        console.log(report)

    }

    return (
        <View style={{ ...styles.base }}>
            <StatusBar style="dark" />
            {Platform.OS == "ios" && <View style={{ height: 30, backgroundColor: "#d6a64f" }}></View>}
            {Platform.OS == "android" && <View style={{ height: RNStatusBar.currentHeight, backgroundColor: "#d6a64f" }}></View>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d6a64f", paddingHorizontal: 5, paddingVertical: 26, marginBottom: 10 }}>
                <Text style={{ color: "black", fontSize: 20, textAlign: "left", paddingLeft: 72, fontWeight: "bold" }}>Report Wrong Info</Text>
                <Image source={icon} style={{ width: 70, height: 70, position: "absolute", top: 5, left: 5 }} alt="i icon" />
                <Pressable onPress={() => { navigation.navigate('Info') }} style={{ backgroundColor: "#b08431", padding: 5, paddingHorizontal: 10, borderRadius: 40, marginRight: 10 }}>
                    <Image source={close} style={{ width: 20, height: 20 }} alt="close icon" />
                </Pressable>
            </View>
            <View style={{ alignItems: "center", gap: 20 }}>
                <TextInput style={{ color: "white", padding: 10, borderRadius: 15, backgroundColor: "#292d2e", width: "80%" }}
                    placeholder="Enter details about the information you think is wrong. Include Block Name, room number and timings." multiline placeholderTextColor="gray"
                    onChangeText={(e) => { setReport(e) }}
                />
                <Pressable onPress={submitReport}>
                    <Text style={{ color: "white", padding: 10, borderRadius: 15, backgroundColor: "#292d2e", width: "80%" }}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
        padding: 5
    },
    base: {
        marginTop: Platform.OS == "android" ? 35 : 0,
        // paddingTop: Platform.OS == "android" ? 0 : 10,
        flex: 1,
        backgroundColor: '#e1d5c9',
        color: "white",
    },
});
