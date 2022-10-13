import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableOpacity
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
    color:'#122665'

  }
});

class RecordView extends React.Component {

  // const [isLoggingIn, setLoggedin] = useState(false);
  // const [recordSecs, setRecordSecs] = useState(0)
  // const [recordTime, setRecordTime] = useState('00:00:12')
  // const [currentPositionSec, setCurrentPositionSec] = useState(0)
  // const [currentDurationSec, setCurrentDurationSec] = useState(0)
  // const [playTime, setPlayTime] = useState('00:00:00')
  // const [duration, setDuration] = useState('00:00:00')
  // const audioRecorderPlayer = new AudioRecorderPlayer();
  // audioRecorderPlayer.setSubscriptionDuration(0.09);
  constructor(props) {
    super(props);
    this.state = {
          isLoggingIn: false,
          recordSecs: 0,
          recordTime: '00:00:00',
          currentPositionSec: 0,
          currentDurationSec: 0,
          playTime: '00:00:00',
          duration: '00:00:00',
          name:''
        };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
   onSubmitEdit = () => {
    // whatever you want to do on submit
  };
  //  [name, setName] = useState("")
   handleNameChange = () => {
    // setName(name);
  }
   handleSubmit = () => {
    // saveSettings(state);
  }
   onStartRecord = async () => {
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    try {
      console.log('audioSet>>>>>>>>>>>>>>', audioSet);
      this.audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('1.e::::::::::::::::', e);
        this.setState({
        // setRecordSecs(e.currentPosition)
        // setRecordTime(audioRecorderPlayer.mmssss(
        //   Math.floor(e.currentPosition)
        // ))
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition)
        )

        });
        console.log(`uri: ${uri}`);
      });
    } catch (error) {
      console.log('error:::::::::', error)
    }
    console.log(`uri: ${uri}`);
  };

   onStartPlay = async (e) => {
    console.log('2.e:', e);
    const path = 'hello.m4a'
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      // setState({
      setCurrentPositionSec(e.currentPosition)
      setCurrentDurationSec(e.duration)
      setPlayTime(audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ))
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
      // });
    });
  };

   onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

   onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };
   onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  render(){
    return (
      <Card containerStyle={styles.card}>
        {/* <Background> */}
        {/* <> */}
        <Image
          source={require("./assets/logo_simpo.png")}
          // containerStyle={styles.item}
          PlaceholderContent={<ActivityIndicator />}
          style={styles.image}
        />
        <Card.Title style={styles.titleText}>Record</Card.Title>
        <Card.Title style={styles.titleText}>your voice..</Card.Title>
        <Card.Title>{this.state.recordTime}</Card.Title>
        {/* <Stack row align="center" spacing={4}> */}
        {/* <ButtonContainer> */}
       {(true) ? ( <Button
          // mode="contained"
          // color={{  }}
          title="record"
          buttonStyle={{
            width: 100,
            height: 100,
            backgroundColor: "#122665",
            borderRadius: 100,
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 20
          }}
          // containerStyle={ { margin: 5,borderRadius:50 } }
          onPress={() => this.onStartRecord()}>
          <Icon name="play-arrow" color="white" />
          <Icon name="pause" color="white" />
          {/* <CaretRightOutlined /> */}
          {/* RECORD */}
        </Button>)
        :
        (<Button
          // mode="contained"
          // color={{  }}
          title="stop"
          buttonStyle={{
            width: 100,
            height: 100,
            backgroundColor: "#fc8631",
            borderRadius: 100,
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 20
          }}
          // containerStyle={ { margin: 5,borderRadius:50 } }
          onPress={() => onStopRecord()}>
          <Icon name="stop" color="white" />
          {/* <Icon name="" color="white" /> */}
          {/* <CaretRightOutlined /> */}
          {/* RECORD */}
        </Button>)}
        <TextInput
          style={styles.textInput}
          placeholder="Enter your tel no"
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.saveButtonText}>send</Text>
        </TouchableOpacity>
        {/* <SpaceMargin /> */}
        {/* <Button
                title="stop"
                color="error"
                // mode="outlined"
                // type="outlined"
                onPress={() => onStopRecord()}
              >
                <Icon name="stop" color="white" />
                STOP
              </Button> */}
        {/* </ButtonContainer> */}
        {/* </Stack> */}
        {/* <Card.Divider />
            <Card.Title>{playTime} / {duration}</Card.Title>
            <Button
              // mode="contained"
              title="play"
              color="success"
              onPress={() => onStartPlay}>
              <Icon name="" color="white" />
              PLAY
            </Button>
            <SpaceMargin />
            <Button
              title="pause"
              color="warning"
              // mode="contained"
              onPress={() => onPausePlay}
            >
              <Icon name="pause" color="white" />
              PAUSE
            </Button>
            <SpaceMargin />
            <Button
              title="stop"
              color="error"
              // mode="outlined"
              onPress={() => onStopPlay}
            >
              <Icon name="stop" color="white" />
              STOP
            </Button> */}
        {/* </> */}
        {/* </Background> */}
      </Card>
    )
  }
}

export default RecordView;