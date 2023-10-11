import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, ScrollView, Button, Image, Pressable, Alert, Share, SafeAreaView, StatusBar as RNStatusBar, BackHandler } from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';
import fbase from '../firebaseConfig';
import { getDatabase, get, ref as fref, set } from 'firebase/database'
import EncryptedStorage from 'react-native-encrypted-storage'
import { useIsFocused } from '@react-navigation/native';

import icon from "../assets/icon.png"
import ac from "../assets/ac.gif"
import pankha from "../assets/pankha.gif"
import computa from "../assets/computer.gif"
import info from "../assets/info.png"
import share from "../assets/share.png"
import chat from "../assets/message.png"
import { BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import analytics from '@react-native-firebase/analytics';
import MarqueeView from 'react-native-marquee-view';



const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
const BUFFER = 10 / 60; // 10 imns

export default function Index({ navigation }) {
    const isFocused = useIsFocused();
    const dev = false;
    const [blocksOpened, setBlocksOpened] = useState(false)
    const [floorsOpened, setFloorsOpened] = useState(false)
    const [dbData, setDbData] = useState()
    const [blocks, setBlocks] = useState(["B1", "B2", "B3", "B4", "C1", "C2", "D1", "D2", "D3", "D4", "D7"])
    const [floors, setFloors] = useState([])
    const [weekday, setWeekday] = useState(days[new Date().getDay() - 1])
    // const [weekday, setWeekday] = useState("MONDAY")
    const [selectedBlock, setSelectedBlock] = useState()
    const [selectedFloor, setSelectedFloor] = useState(0)
    const [emptyClasses, setEmptyClasses] = useState([])
    const [emptyClassesFloor, setEmptyClassesFloor] = useState([])
    const [futureClasses, setFutureClasses] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [classesOngoing, setClassesOngoing] = useState(true)
    const [classesOver, setClassesOver] = useState(false)
    const [classesNotStarted, setClassesNotStarted] = useState(false)

    useEffect(() => {
        if (!isFocused) {
            setEmptyClasses([])
            setEmptyClassesFloor([])
            setFutureClasses([])
        }
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()
        const currentTime = currentHour + currentMinute / 60

        function getLatest() {
            console.log("getting latest")
            const db = getDatabase(fbase);
            get(fref(db, "/BLOCKS/")).then((snapshot) => {
                if (snapshot) {
                    const data = snapshot.val()
                    setDbData(data)
                    EncryptedStorage.setItem("dbData", JSON.stringify(data))
                    EncryptedStorage.setItem("lastFetched", now.toString())
                    console.log("got new data on:", now.toString())
                    ClassesSet()
                }
            })
        }

        async function getLocal() {
            EncryptedStorage.getItem("lastFetched").then((lastFetched) => {
                const lastFetchedTime = new Date(lastFetched)
                if (lastFetchedTime.getDate() != new Date().getDate()) {
                    console.log("last fetched not today")
                    getLatest()
                } else {
                    console.log("last fetched today ", lastFetchedTime)
                    if (currentTime > 16.5 || currentTime < 9.0) {
                        console.log(currentTime, "no classes")
                        setEmptyClasses([])
                    } else {
                        EncryptedStorage.getItem("dbData").then((data) => {
                            if (data) {
                                console.log("blocks:", Object.keys(JSON.parse(data)))
                                setDbData(JSON.parse(data))
                                ClassesSet()
                            } else {
                                getLatest()
                            }
                        })
                    }
                }
            })
        }
        getLocal()
    }, [isFocused])

    function ClassesSet() {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()
        const nowTimeFlost = currentHour + currentMinute / 60
        console.log("classes set called", nowTimeFlost)
        if (nowTimeFlost >= 16.5) {
            setClassesOver(true)
            setClassesNotStarted(false)
            setClassesOngoing(false)
        } else if (currentHour < 9) {
            setClassesNotStarted(true)
            setClassesOver(false)
            setClassesOngoing(false)
        } else {
            setClassesOngoing(true)
            setClassesOver(false)
            setClassesNotStarted(false)
        }

        if (selectedBlock && dbData) {
            const classes = []
            const fuClasses = []
            setEmptyClasses([])
            const floors = []
            for (const room in dbData[selectedBlock]) {
                if (!room) continue
                const floor = room.split("-")[1][0]
                if (!floors.includes(floor))
                    floors.push(floor)
                const today = dbData[selectedBlock][room][weekday]
                if (today) {
                    for (const clas in today) {
                        const clasD = today[clas]
                        const now = new Date()
                        const currentHour = now.getHours()
                        const currentMinute = now.getMinutes() / 60
                        const from = clasD.FROM_TIME.split(":")
                        let fromHour = parseInt(from[0])
                        let fromMinute = parseInt(from[1].split(" ")[0]) / 60
                        if (from[1].split(" ")[1] == "PM" && fromHour != 12)
                            fromHour += 12
                        const to = clasD.TO_TIME.split(":")
                        let toHour = parseInt(to[0])
                        let toMinute = parseInt(to[1].split(" ")[0]) / 60
                        if (to[1].split(" ")[1] == "PM" && toHour != 12)
                            toHour += 12

                        const currentTime = currentHour + currentMinute
                        const fromTime = fromHour + fromMinute
                        const toTime = toHour + toMinute

                        // if (selectedFloor == floor) {
                        if ((currentTime >= (fromTime - BUFFER) && currentTime <= (toTime - BUFFER)) || dev) // uncomment during prod
                            // if ((currentTime <= toTime) || dev) // uncomment during prod
                            // for current classes in every floor
                            classes.push({
                                room: room,
                                to: clasD.TO_TIME,
                                from: clasD.FROM_TIME,
                                ac: clasD.AC,
                                floor: floor
                            })
                        // }
                        // for future classes in every floor
                        if (fromTime > currentTime) {
                            fuClasses.push({
                                room: room,
                                to: clasD.TO_TIME,
                                from: clasD.FROM_TIME,
                                ac: clasD.AC,
                                floor: floor
                            })
                        }

                    }
                }
            }

            //sort fuClasses according to time and floor, time has more priority
            fuClasses.sort((a, b) => {
                const aFrom = a.from.split(":")
                const aFromHour = parseInt(aFrom[0])
                const aFromMinute = parseInt(aFrom[1].split(" ")[0]) / 60
                const aFromTime = aFromHour + aFromMinute

                const bFrom = b.from.split(":")
                const bFromHour = parseInt(bFrom[0])
                const bFromMinute = parseInt(bFrom[1].split(" ")[0]) / 60
                const bFromTime = bFromHour + bFromMinute

                if (aFromTime > bFromTime)
                    return 1
                else if (aFromTime < bFromTime)
                    return -1
                else {
                    if (a.floor > b.floor)
                        return 1
                    else if (a.floor < b.floor)
                        return -1
                    else
                        return 0
                }
            })

            //sort classes according to time and floor, time has more priority
            classes.sort((a, b) => {
                const aFrom = a.from.split(":")
                const aFromHour = parseInt(aFrom[0])
                const aFromMinute = parseInt(aFrom[1].split(" ")[0]) / 60
                const aFromTime = aFromHour + aFromMinute

                const bFrom = b.from.split(":")
                const bFromHour = parseInt(bFrom[0])
                const bFromMinute = parseInt(bFrom[1].split(" ")[0]) / 60
                const bFromTime = bFromHour + bFromMinute

                if (aFromTime > bFromTime)
                    return 1
                else if (aFromTime < bFromTime)
                    return -1
                else {
                    if (a.floor > b.floor)
                        return 1
                    else if (a.floor < b.floor)
                        return -1
                    else
                        return 0
                }
            })


            // empty classes in current floor
            const empClassesFloor = classes.filter((classData) => { return classData.floor == selectedFloor })
            setEmptyClassesFloor(empClassesFloor)

            floors.sort()
            setFloors(floors)

            // setSelectedFloor(classes)
            setEmptyClasses(classes)
            setFutureClasses(fuClasses)
        }
    }

    useEffect(() => {
        if (!refreshing) {
            setInterval(() => {
                ClassesSet()
            }, 1 * 1000 * 60)
            setRefreshing(true)
        }
    }, [])

    useEffect(() => ClassesSet(), [selectedBlock, selectedFloor])

    useEffect(() => {
        // check internet access
        // if no internet access, show alert
        fetch("https://www.google.com", {
            method: "GET", headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.status == 200) {
                console.log("has internet access")
                if (selectedBlock && dbData) {
                    const fs = []
                    for (const room in dbData[selectedBlock]) {
                        if (!room) continue
                        const floor = room.split("-")[1][0]
                        if (!fs.includes(floor))
                            fs.push(floor)
                    }
                    fs.sort()
                    console.log("floors:", fs)
                    setFloors(fs)
                    setSelectedFloor(fs[0])
                }
            }
        }).catch((err) => {
            console.log("no internet access")
            Alert.alert("No internet access", "This app can't function without an internet connection, please connect to the internet and try again.", [
                {
                    text: "Exit", cancelable: false, onPress: () => {
                        BackHandler.exitApp()
                    }
                }
            ])
        })
    }, [selectedBlock])

    return (
        <SafeAreaView style={styles.base}>
            <StatusBar style="dark" />
            {Platform.OS == "ios" && <View style={{ height: 30, backgroundColor: "#d6a64f" }}></View>}
            {Platform.OS == "android" && <View style={{ height: RNStatusBar.currentHeight, backgroundColor: "#d6a64f" }}></View>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d6a64f", paddingHorizontal: 5, paddingVertical: 26, marginBottom: 10 }}>
                <Text style={{ color: "black", fontSize: 20, textAlign: "left", paddingLeft: 72, fontWeight: "bold", position: "relative", top: 5 }}>Class Compass</Text>
                <Image source={icon} style={{ width: 65, height: 65, position: "absolute", top: 9, left: 8 }} alt="i icon" />
                <Pressable onPress={() => {
                    analytics().logShare({
                        method: 'share',
                        content_type: 'text',
                        item_id: 'share',
                    });
                    Share.share({
                        message: `*Class Compass*

Tired of wandering around campus in search of a quiet place to unwind during free periods? 😵
Then Class Compass is for you 🧭

Features:

*Real-Time Classroom Availability* ⌚
Get instant updates on which classrooms on your floor are empty and ready for your visit.

*AC/Fan Indicator* ☃️
Find out if the available classrooms have AC or fans, so you can stay cool and comfortable.

*Intuitive User Interface* 🤳
A user-friendly interface for your comfort.


Download Class Compass now and make the most of your free periods with ease. 

📲 _https://play.google.com/store/apps/details?id=com.darkweeblet.classcompass_
`                    })
                }} style={{ backgroundColor: "#b08431", marginLeft: "auto", padding: 2, borderRadius: 40, marginRight: 10 }}>
                    <Image source={share} style={{ width: 27, height: 27 }} alt="i icon" />
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('Info') }} style={{ backgroundColor: "#b08431", padding: 5, borderRadius: 40, marginRight: 10 }}>
                    <Image source={info} style={{ width: 20, height: 20 }} />
                </Pressable>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 5 }}>
                {/* <SelectDropdown data={blocks} buttonStyle={{ ...styles.buttonStyle, width: "40%" }} buttonTextStyle={{ color: "white", fontSize: 15 }} dropdownStyle={styles.dropdownStyle} defaultButtonText="Select Block"
                    onSelect={(e) => {
                        analytics().logEvent("block_select", { name: e });
                        setSelectedBlock(e)
                    }} /> */}
                <DropDownPicker
                    open={blocksOpened}
                    setOpen={setBlocksOpened}
                    value={selectedBlock}
                    items={blocks.map((block) => { return { label: block, value: block } })}
                    placeholder="Select Block"
                    placeholderStyle={{ color: "whitesmoke" }}
                    labelStyle={{ color: "whitesmoke", fontWeight: "bold", fontSize: 20, marginLeft: 10, marginBottom: 2 }}
                    arrowIconStyle={{ tintColor: "whitesmoke" }}
                    containerStyle={{ height: 40, width: "40%" }} style={{ backgroundColor: '#292d2e', borderRadius: 15 }}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    dropDownStyle={{ backgroundColor: '#292d2e', borderColor: "#292d2e", borderWidth: 0, borderRadius: 15 }}
                    onSelectItem={(item) => {
                        analytics().logEvent("block_select", { name: item.value });
                        setSelectedBlock(item.value)
                    }} />
                {
                    classesOver || classesNotStarted || (new Date().getDay() == 0) ? <Pressable onPress={() => {
                        Alert.alert("Class nahi hai abhi, kal aana bhai\n( ͡° ͜ʖ ͡°)")
                    }}><Text style={{ ...styles.buttonStyle, paddingHorizontal: 30, paddingVertical: 15 }}>Select Floor</Text></Pressable> :
                        // <SelectDropdown data={floors} buttonTextAfterSelection={() => selectedFloor} buttonStyle={{ ...styles.buttonStyle, width: "40%" }} buttonTextStyle={{ color: "white", fontSize: 15 }} dropdownStyle={styles.dropdownStyle} defaultButtonText={selectedFloor || "Select Floor"} onSelect={(e) => {
                        //     analytics().logEvent("floor_select", { name: e });
                        //     setSelectedFloor(e)
                        // }} disabled={!selectedBlock} />
                        <DropDownPicker
                            open={floorsOpened}
                            setOpen={setFloorsOpened}
                            items={floors.map((floor) => { return { label: floor, value: floor } })} defaultValue={selectedFloor}
                            value={selectedFloor}
                            placeholder="Select Floor"
                            placeholderStyle={{ color: "whitesmoke" }}
                            labelStyle={{ color: "whitesmoke", fontWeight: "bold", fontSize: 20, marginLeft: 10, marginBottom: 2 }}
                            arrowIconStyle={{ tintColor: "whitesmoke" }}
                            containerStyle={{ height: 40, width: "40%" }} style={{ backgroundColor: '#292d2e', borderRadius: 15 }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{ backgroundColor: '#292d2e', borderColor: "#292d2e", borderWidth: 0, borderRadius: 15 }}
                            onSelectItem={(item) => {
                                analytics().logEvent("floor_select", { name: item.value });
                                setSelectedFloor(item.value)
                            }} />
                }
                {/* <Pressable style={{ paddingHorizontal: 6, ...styles.buttonStyle }} onPress={() => navigation.navigate("Login")}>
                    <Image source={chat} style={{ width: 50, height: 50 }} alt="msg" />
                </Pressable> */}
            </View>
            {selectedBlock == "B1" && <MarqueeView speed={0.15} style={{ width: "100%" }}>
                <Text style={{ color: "red", fontWeight: "bold" }}>The selected block has constantly changing timetable data, we are constantly in touch with the department to keep our data updated. We apologise in advance for any inconvenience</Text>
            </MarqueeView>}
            <ScrollView horizontal={false} style={{ marginTop: 5, borderRadius: 15, marginVertical: 10, marginTop: 15, flexDirection: "column", gap: 10, height: "100%", borderRadius: 15, maxWidth: "90%", alignSelf: "center", overflow: "hidden" }} removeClippedSubviews contentContainerStyle={{ alignItems: "center" }}>
                {
                    ((selectedBlock?.length > 0 && selectedFloor?.length > 0) && emptyClassesFloor.length == 0) && <View style={{ flex: 1, justifyContent: "start" }}>
                        {
                            !selectedBlock && <View>
                                <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Select a block.</Text>
                            </View>
                        }
                        {
                            (selectedBlock && !selectedFloor) && <View>
                                <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Select a floor.</Text>
                            </View>
                        }
                        {
                            classesOngoing && <View style={{ marginVertical: 10, flexDirection: "col", justifyContent: "center", backgroundColor: "#c79551", minWidth: "100%", alignSelf: "center", borderRadius: 15, paddingVertical: 15 }}>
                                <View>

                                    {
                                        (emptyClasses.length == 0 && futureClasses.length == 0) && <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>No empty classes available {":'("} </Text>
                                    }
                                    {
                                        (emptyClasses.length == 0 && futureClasses.length > 0) && <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>Empty classroom available from {futureClasses[0].from} on floor {futureClasses[0].floor}</Text>
                                    }
                                    {
                                        emptyClasses.length > 0 && <Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>Empty classroom available till {emptyClasses[0].to} on floor {emptyClasses[0].floor}</Text>
                                    }
                                </View>
                                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }}>Go to another floor or use the Library</Text>
                            </View>
                        }
                    </View>
                }
                <View>
                    {
                        classesNotStarted && <Text Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Classes have not yet started</Text>
                    }
                    {
                        classesOver && <Text Text style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: 30 }}>Classes have ended for today</Text>
                    }
                </View>
                {
                    emptyClassesFloor.map((classData, _) => {
                        return (
                            <View style={{ marginBottom: 15, flexDirection: "row", justifyContent: "flex-end", backgroundColor: "#c79551", minWidth: "100%", alignSelf: "center", borderRadius: 15, paddingVertical: 15 }} key={_}>
                                {(classData.room.includes("LAB") || classData.room.includes("SSL")) ? <Image source={computa} style={{ width: 70, height: 70, position: "absolute", left: 14, top: 12 }} /> :
                                    <View style={{ width: 70, height: 70, position: "absolute", left: 0, top: 0 }} >
                                        {classData.ac && <Image source={ac} style={{ width: 70, height: 70, position: "absolute", left: 14, top: 12 }} />}
                                        {!classData.ac && <Image source={pankha} style={{ width: 75, height: 50, position: "absolute", left: 14, top: 0 }} />}
                                    </View>}
                                <View style={{ position: "relative", right: 15 }}>
                                    <Text style={{ color: "black", textAlign: "right", fontWeight: "bold", fontSize: 30 }}>{classData.room}</Text>
                                    <Text style={{ color: "black", textAlign: "right", fontSize: 22 }}>Free till {classData.to}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={{ backgroundColor: "#c7955125" }}>
                <BannerAd
                    unitId={"ca-app-pub-5690642854294806/2965165646"}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    onAdLoaded={() => { console.log('Advert loaded') }}
                    onAdFailedToLoad={(error) => { console.log('Advert failed to load: ', error) }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: "center",
        backgroundColor: "#292d2e",
        color: "white",
        borderRadius: 15,
    },
    dropdownStyle: {
        width: "70%",
        position: "absolute",
        left: "15%"
    },
    text: {
        color: "white",
        textAlign: "center",
        padding: 5
    },
    base: {
        // paddingTop: Platform.OS == "android" ? 28 : 0,
        // paddingTop: Platform.OS == "android" ? 0 : 10,
        flex: 1,
        backgroundColor: '#e1d5c9',
        color: "white",
    },
    classText: {
        color: "black", textAlign: "center", fontWeight: "bold", fontSize: 20, paddingHorizontal: 15
    }
});
