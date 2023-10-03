import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, ScrollView, Button, Image, Pressable, Linking, StatusBar as RNStatusBar } from 'react-native';
import icon from "../assets/icon.png"
import MarqueeView from 'react-native-marquee-view';
import { expo } from "../app.json"
import close from "../assets/close.png"


export default function Info({ navigation }) {

    return (
        <View style={{ ...styles.base }}>
            <StatusBar style="dark" />
            {Platform.OS == "ios" && <View style={{ height: 30, backgroundColor: "#d6a64f" }}></View>}
            {Platform.OS == "android" && <View style={{ height: RNStatusBar.currentHeight, backgroundColor: "#d6a64f" }}></View>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d6a64f", paddingHorizontal: 5, paddingVertical: 26, marginBottom: 10 }}>
                <Text style={{ color: "black", fontSize: 20, textAlign: "left", paddingLeft: 72, fontWeight: "bold", position: "relative", top: 5 }}>Info</Text>
                <Image source={icon} style={{ width: 65, height: 65, position: "absolute", top: 9, left: 9 }} alt="i icon" />
                <Pressable onPress={() => { navigation.navigate('Home') }} style={{ backgroundColor: "#b08431", padding: 5, paddingHorizontal: 10, borderRadius: 40, marginRight: 10, position: "relative", top: 5 }}>
                    <Image source={close} style={{ width: 20, height: 20 }} alt="close icon" />
                </Pressable>
            </View>
            <View style={{ alignItems: "center", gap: 20 }}>
                <Pressable style={{ minWidth: "70%", padding: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: "#292d2e" }}
                    // onPress={() => { navigation.navigate('ReportWrong') }}
                    onPress={() => { Linking.openURL("mailto:darkweeblet@gmail.com") }}
                ><Text style={styles.text}>Report wrong information</Text></Pressable>
                <Pressable style={{ minWidth: "70%", padding: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: "#292d2e" }}
                    // onPress={() => { navigation.navigate('Feedback') }}
                    onPress={() => { Linking.openURL("mailto:darkweeblet@gmail.com") }}
                ><Text style={styles.text}>Give Feedback</Text></Pressable>
                <Pressable style={{ minWidth: "70%", padding: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: "#292d2e" }}
                    // onPress={() => { navigation.navigate('BugReport') }}
                    onPress={() => { Linking.openURL("mailto:darkweeblet@gmail.com") }}
                ><Text style={styles.text}>Report Bug</Text></Pressable>
                <Pressable style={{ minWidth: "70%", padding: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: "#292d2e" }}
                    onPress={() => { Linking.openURL("mailto:darkweeblet@gmail.com") }}
                ><Text style={styles.text}>E-Mail Us</Text></Pressable>
            </View>
            <Text style={{ position: "absolute", bottom: 190, textAlign: "center", width: "100%" }}>Developed by Weeblet & DarkFlash</Text>
            <Text style={{ position: "absolute", bottom: 170, textAlign: "center", width: "100%" }}>Version {expo.version} - {expo.android.versionCode}</Text>
            <Text style={{ position: "absolute", bottom: 150, textAlign: "center", width: "100%" }}>(patch: {expo.updateIdentifier})</Text>
            <MarqueeView style={{ position: "absolute", bottom: 120, textAlign: "center", width: "100%" }}>
                <View style={{ width: "100%" }}>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>This app is for educational & technical purposes only. Use it ethically.</Text>
                </View>
            </MarqueeView>
            <MarqueeView speed={0.2} style={{ position: "absolute", bottom: 100, textAlign: "center", width: "100%" }}>
                <View style={{ width: "100%" }}>
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>You are adviced to use the empty rooms in your academic block only.</Text>
                </View>
            </MarqueeView>
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
        // marginTop: Platform.OS == "android" ? 35 : 0,
        // paddingTop: Platform.OS == "android" ? 0 : 10,
        flex: 1,
        backgroundColor: '#e1d5c9',
        color: "white",
    },
});
