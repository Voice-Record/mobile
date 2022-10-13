import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableOpacity,
  View,
  Pressable,
  Animated
} from 'react-native';
import { Button, Card, Icon, Image } from "@rneui/themed";
import { ButtonContainer, SpaceMargin } from "./Background"
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { color } from '@rneui/base';
import { Audio } from 'expo-av';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { LinearGradient } from 'expo-linear-gradient';
import { Timer, Countdown } from 'react-native-element-timer';

// const styles = StyleSheet.create({
//   inputContainer: {
//     paddingTop: 15
//   },
//   textInput: {
//     borderColor: '#CCCCCC',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     height: 50,
//     fontSize: 25,
//     paddingLeft: 20,
//     paddingRight: 20
//   },
//   saveButton: {
//     borderWidth: 1,
//     borderColor: '#007BFF',
//     backgroundColor: '#007BFF',
//     padding: 15,
//     margin: 5
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     textAlign: 'center'
//   }
// });

// const PhoneNumber = () => {

// }

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#122665',
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#122665',
    backgroundColor: '#122665',
    padding: 15,
    marginTop: 50,
    borderRadius: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center'
  },
  card: {
    width: '100%',
    margin: 'auto',
    height: '100%',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'space-between',
    // alignSelf: 'center'
  },
  recordingStyle: {
    width: 100,
    height: 100,
    backgroundColor: "#122665",
    borderRadius: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20
  },
  stopStyle: {
    width: 100,
    height: 100,
    backgroundColor: "#fc8631",
    borderRadius: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20
  },
  // item: {
  //   aspectRatio: 1,
  //   // width: '10%',
  //   // height: '5%',
  //   flex: 1,
  //   width: 20,
  //   height: 6,
  //   // marginLeft:200
  // },
  image: {
    width: 200,
    height: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#122665'

  }
});

export default function RecordView() {
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  //   const [isLoggingIn, setLoggedin] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0)
  const [recordTime, setRecordTime] = useState('00:00:00')
  //   const [currentPositionSec, setCurrentPositionSec] = useState(0)
  //   const [currentDurationSec, setCurrentDurationSec] = useState(0)
  //   const [playTime, setPlayTime] = useState('00:00:00')
  //   const [duration, setDuration] = useState('00:00:00')
  const audioRecorderPlayer = new AudioRecorderPlayer();
  //   audioRecorderPlayer.setSubscriptionDuration(0.09);
  //   const onSubmitEdit = () => {
  //     // whatever you want to do on submit
  //   };
  const [name, setName] = useState("")
  const [RecordedURI, SetRecordedURI] = useState("");
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [isPlaying, SetPlaying] = useState(false);
  const [consTime, setConstTime] = useState(15)
  const [recordedTime, setRecordedTime] = useState(0)
  const [spinnerKey, setSpinnerKey] = useState(false)


  const handleNameChange = () => {
    setName(name);
  }
  useEffect(() => {
    GetPermission();
  }, []);

  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    const getAudioPermOnIOS = await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    SetAudioPermission(getAudioPerm.granted || getAudioPermOnIOS);
    // SetAudioPermissionOnIOS()
  };


  function handleSubmit() {
    // saveSettings(state);
  }
  //   const onStartRecord = async () => {
  //     const path = 'hello.m4a';
  //     const audioSet = {
  //       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //       AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //       AVNumberOfChannelsKeyIOS: 2,
  //       AVFormatIDKeyIOS: AVEncodingOption.aac,
  //     };
  //     console.log('audioSet>>>>>>>>>>>>>>', audioSet);
  //     const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
  //     try {
  //       audioRecorderPlayer.addRecordBackListener((e: any) => {
  //         console.log('1.e::::::::::::::::', e);
  //         // setState({
  //         setRecordSecs(e.currentPosition)
  // setRecordTime(audioRecorderPlayer.mmssss(
  //   Math.floor(e.currentPosition)
  // ))
  //         // });
  //       });
  //     } catch (error) {
  //       console.log('error:::::', error)
  //     }
  //     console.log(`uri: ${uri}`);
  //   };

  //   const onStartPlay = async (e: any) => {
  //     console.log('2.e:', e);
  //     const path = 'hello.m4a'
  //     const msg = await audioRecorderPlayer.startPlayer(path);
  //     audioRecorderPlayer.setVolume(1.0);
  //     console.log(msg);
  //     audioRecorderPlayer.addPlayBackListener((e) => {
  //       if (e.currentPosition === e.duration) {
  //         console.log('finished');
  //         audioRecorderPlayer.stopPlayer();
  //       }
  //       // setState({
  //       setCurrentPositionSec(e.currentPosition)
  //       setCurrentDurationSec(e.duration)
  //       setPlayTime(audioRecorderPlayer.mmssss(
  //         Math.floor(e.currentPosition),
  //       ))
  //       setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
  //       // });
  //     });
  //   };

  //   const onPausePlay = async () => {
  //     await audioRecorderPlayer.pausePlayer();
  //   };

  //   const onStopRecord = async () => {
  //     const result = await audioRecorderPlayer.stopRecorder();
  //     audioRecorderPlayer.removeRecordBackListener();
  //     setRecordSecs(0);
  //     console.log(result);
  //   };
  //   const onStopPlay = async () => {
  //     console.log('onStopPlay');
  //     audioRecorderPlayer.stopPlayer();
  //     audioRecorderPlayer.removePlayBackListener();
  //   };

  // const [recording, setRecording] = React.useState();
  // async function startRecording() {
  //     try {
  //       console.log('Requesting permissions..');
  //       await Audio.requestPermissionsAsync();
  // await Audio.setAudioModeAsync({
  //   allowsRecordingIOS: true,
  //   playsInSilentModeIOS: true,
  // }); 
  //       console.log('Starting recording..');
  //       const recording = new Audio.Recording();
  //       await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  //       await recording.startAsync(); 
  //       setRecording(recording);
  //       console.log('Recording started');
  //     } catch (err) {
  //       console.error('Failed to start recording', err);
  //     }
  //   }

  //   async function stopRecording() {
  //     console.log('Stopping recording..');
  //     setRecording(undefined);
  //     await recording.stopAndUnloadAsync();
  //     const uri = recording.getURI(); 
  //     console.log('Recording stopped and stored at', uri);
  //   }
  // Function to start recording
  const StartRecording = async () => {
    try {
      // console.log('AudioRecorderPlayer::::',  AudioRecorder.current.)
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          // setRecordTime(audioRecorderPlayer.mmssss(
          //   Math.floor(e.currentPosition)
          // ))


          // Start recording
          await AudioRecorder.current.startAsync();
          SetIsRecording(true);
          countdownRef.current.start();
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) { }
  };
  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) SetRecordedURI(result);

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      countdownRef.current.stop();
      SetIsRecording(false);
    } catch (error) { }
  };
  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) { }
  };
  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetPlaying(false);
    } catch (error) { }
  };
  const _onLongPress = async () => {
    try {
      console.log('Requesting permissions..');
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setPlaying(true)
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  const _onPressOut = async () => {
    console.log('Stopping recording..');
    setPlaying(false)
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    if (!!uri) {
      navigation.navigate('audioPlay', { data: { uri: uri, time: recordedTime } })
    }
  }
  const checkTime = (time, elapsedTime) => {
    setRecordedTime(elapsedTime)
    if (!isPlaying && time !== 15 && !!recording || time == 0) {
      if (!!recording) {
        _onPressOut()
      }
    }
  }
  return (
    <Card containerStyle={styles.card}>
      <Image
        source={require("./assets/logo_simpo.png")}
        // containerStyle={styles.item}
        PlaceholderContent={<ActivityIndicator />}
        style={styles.image}
      />
      <Card.Title style={styles.titleText}>Record</Card.Title>
      <Card.Title style={styles.titleText}>your voice..</Card.Title>
      {/* {({ remainingTime, elapsedTime }) => (
        <>
        { checkTime(remainingTime, elapsedTime) } */}
      {/* {({ remainingTime, elapsedTime }) => ( */}
      {/* <Card.Title> {recordTime} </Card.Title> */}
      <Countdown
        ref={countdownRef}
        style={styles.timer}
        textStyle={styles.timerText}
        initialSeconds={15}
        onTimes={e => { }}
        onPause={e => { }}
        onEnd={(e) => { }}
      />
      {/* )} */}
      {/* </>
  )
} */}
      <Button
        // mode="contained"
        // color={{  }}
        // title="record"
        buttonStyle={IsRecording ? styles.stopStyle : styles.recordingStyle}
        // containerStyle={ { margin: 5,borderRadius:50 } }
        // onPress={() => onStartRecord()}
        onPress={IsRecording ? StopRecording : StartRecording}
      >
        {!IsRecording ?
          (<><Icon name="play-arrow" color="white" /><Icon name="pause" color="white" /></>)
          : (<Icon name="stop" color="white" />)}
        {/* <CaretRightOutlined /> */}
        {/* RECORD */}
      </Button><TextInput
        style={styles.textInput}
        placeholder="Enter your tel no"
        maxLength={20}
        onBlur={Keyboard.dismiss}
        value={name} /><TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
        >
        <Text style={styles.saveButtonText}>send</Text>
      </TouchableOpacity>
    </Card >
    //     <View style={styles.container}>
    //     <CountdownCircleTimer
    //         isPlaying={isPlaying}
    //         duration={consTime}
    //         key={spinnerKey}
    //         colors={[
    //             ['#F91561', 0.5],
    //             ['#F9195F', 0.3],
    //             ['#FADD0B', 0.2],
    //         ]}
    //     >
    //         {({ remainingTime, elapsedTime }) => (
    //             <Pressable
    //                 onLongPress={_onLongPress}
    //                 onPressOut={_onPressOut}
    //             >
    //                 {checkTime(remainingTime, elapsedTime)}
    //                 <LinearGradient
    //                     colors={['#F9195F', '#FADD0B']}
    //                     style={styles.linearGradient}>
    //                     <Animated.Text style={styles.textStyle}>
    //                         {remainingTime}
    //                     </Animated.Text>
    //                     <Text style={styles.secsStyle}>secs left</Text>
    //                 </LinearGradient>
    //             </Pressable>
    //         )}
    //     </CountdownCircleTimer>
    // </View>
  )
}