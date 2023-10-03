import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, Text, Pressable, Image, View, StatusBar as RNStatusBar, TextInput, ScrollView, KeyboardAvoidingView } from "react-native"
import icon from "../assets/icon.png"
import close from "../assets/close.png"
import send from "../assets/send.png"


function Message({ name, pfp, uid, isMine, message }) {
    return <View style={{ marginVertical: 3, backgroundColor: "#ffe", borderRadius: 10, padding: 5, flexDirection: "row", alignItems: "start", justifyContent: isMine ? "flex-end" : "flex-start" }}>
        {!isMine && <Image source={pfp} style={{ width: 25, height: 25, borderRadius: 20, marginRight: 5 }} alt="i icon" />}
        <View style={{}}>
            {!isMine && <Text style={{ fontWeight: "bold" }}>{name} <Text style={{ fontSize: 10 }}>{uid}</Text></Text>}
            {isMine && <Text style={{ fontWeight: "bold", textAlign: "right", paddingRight: 5 }}><Text style={{ fontSize: 10 }}>{uid}</Text> {name}</Text>}
            <Text style={{}}>{message}</Text>
        </View>
        {isMine && <Image source={pfp} style={{ width: 25, height: 25, borderRadius: 20, marginRight: 5 }} alt="i icon" />}
    </View>
}

const myUID = "22BCT10002"
const myName = "Weeblet"
const myPfp = icon

export default function CharacterData({ navigation }) {
    const inputRef = useRef()
    const demoMessages = [
        {
            name: "Kesariya",
            uid: "22BAI70016",
            pfp: icon,
            message: "Wyd? me bored"
        },
        {
            name: "Berry",
            uid: "22BAI70022",
            pfp: icon,
            message: "Chilling in room 404"
        },
        {
            name: "Kesariya",
            uid: "22BAI70016",
            pfp: icon,
            message: "Woah"
        }
    ]
    const [text, setText] = useState("")
    const [messages, setMessages] = useState(demoMessages)

    return <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar style="dark" />
        {Platform.OS == "ios" && <View style={{ height: 30, backgroundColor: "#d6a64f" }}></View>}
        {Platform.OS == "android" && <View style={{ height: RNStatusBar.currentHeight, backgroundColor: "#d6a64f" }}></View>}
        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d6a64f", paddingHorizontal: 5, paddingVertical: 26, marginBottom: 10 }}>
            <Text style={{ color: "black", fontSize: 20, textAlign: "left", paddingLeft: 72, fontWeight: "bold", position: "relative", top: 5 }}>Class Compass</Text>
            <Image source={icon} style={{ width: 65, height: 65, position: "absolute", top: 9, left: 8 }} alt="i icon" />
            <Pressable onPress={() => { navigation.navigate('Home') }} style={{ backgroundColor: "#b08431", padding: 5, paddingHorizontal: 10, borderRadius: 40, marginRight: 10, position: "relative", top: 5 }}>
                <Image source={close} style={{ width: 20, height: 20 }} alt="close icon" />
            </Pressable>
        </View>
        <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
            style={{ paddingHorizontal: 10, width: "100%", borderRadius: 5, padding: 5, gap: 5 }}>
            {messages.map((message, index) => <Message key={index} {...message} isMine={message.isMine} />)}
        </ScrollView>
        <View style={{ paddingHorizontal: 6, marginTop: 10, width: "100%", position: "absolute", bottom: 8 }}>
            <View style={{ height: 50, flexDirection: "row", padding: 5, justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "#ffe", borderColor: 'gray', borderWidth: 1, borderRadius: 30, }}>
                <TextInput ref={inputRef} onChangeText={(e) => setText(e)} placeholder="Message" style={{ height: 48, flexGrow: 1, color: "black", paddingLeft: 10, paddingRight: 44 }} />
                <Pressable style={{ borderRadius: 30, backgroundColor: "#d6a64f", position: "absolute", right: 5 }}
                    onPress={() => {
                        console.log(text)
                        setText("")
                        inputRef.current.clear()
                        setMessages([...messages, {
                            name: myName,
                            uid: myUID,
                            pfp: myPfp,
                            message: text,
                            isMine: true
                        }])
                    }}>
                    <Image source={send} style={{ width: 40, height: 40 }} alt="send icon" />
                </Pressable>
            </View>
        </View>

    </KeyboardAvoidingView>
}
