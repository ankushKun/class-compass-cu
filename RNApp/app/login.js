import { useState } from "react";
import { TextInput, SafeAreaView, View, Pressable, Text, Image } from "react-native";

export default function Login() {
    const [uid, setUID] = useState("")
    const [password, setPassword] = useState("")
    const [captcha, setCaptcha] = useState("")
    const [hasUID, setHasUID] = useState(false)

    return <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "90%", gap: 10 }}>
            <TextInput style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 3 }} placeholder="CU UID"
                onChangeText={text => setUID(text)}
                editable={!hasUID}
            />
            {
                hasUID ?
                    <>
                        <TextInput style={{ borderRadius: 15, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 3 }} placeholder="Password" />
                        <Image source={{ uri: "https://uims.cuchd.in/uims/GenerateCaptcha.aspx" }} style={{ width: 133, height: 40, alignSelf: "center" }} />
                        <Pressable style={{ backgroundColor: "#d6a64f", borderWidth: 1, borderRadius: 15, paddingVertical: 5 }}>
                            <Text style={{ textAlign: "center" }}>Login</Text>
                        </Pressable>
                    </>
                    :
                    <Pressable style={{ backgroundColor: "#d6a64f", borderWidth: 1, borderRadius: 15, paddingVertical: 5 }}
                        onPress={() => {
                            if (uid) setHasUID(true)
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>Next</Text>
                    </Pressable>
            }
        </View>
    </SafeAreaView >
}