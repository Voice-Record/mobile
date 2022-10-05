import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Header, Icon } from "@rneui/themed";
import { CaretRightOutlined } from "@ant-design/icons"
import { ButtonContainer, SpaceMargin } from "./Background"
// import { Button } from 'react-native-elements';
// import { Text, View, StyleSheet } from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

// const Background = styled. ({

// })


export default function App() {
  const [isLoggingIn, setLoggedin] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0)
  const [recordTime, setRecordTime] = useState('00:00:00')
  const [currentPositionSec, setCurrentPositionSec] = useState(0)
  const [currentDurationSec, setCurrentDurationSec] = useState(0)
  const [playTime, setPlayTime] = useState('00:00:00')
  const [duration, setDuration] = useState('00:00:00')
  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.09);

  const onStartRecord = async () => {
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log('uri>>>>>>>>>>>>>>', uri);
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('1.e:', e);
      // setState({
      setRecordSecs(e.currentPosition)
      setRecordTime(audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition)
      ))
      // });
    });
    console.log(`uri: ${uri}`);
  };

  const onStartPlay = async (e: any) => {
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

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };
  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  return (
    //   <Text>Open up App.js to start working on your app5 Roger</Text>
    //   <StatusBar style="auto" />
    // <View style={styles.container}>
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        {/* <Background> */}
        <>
          <Card.Image />
          <Text>Voice Recorder</Text>
          <Card.Title>{recordTime}</Card.Title>
          {/* <Stack row align="center" spacing={4}> */}
          <ButtonContainer>
            <Button
              // mode="contained"
              color="success"
              title="record"
              onPress={() => onStartRecord()}>
              <Icon name="mic" color="white" />
              {/* <CaretRightOutlined /> */}
              RECORD
            </Button>
            <SpaceMargin />
            <Button
              title="stop"
              color="error"
              // mode="outlined"
              // type="outlined"
              onPress={() => onStopRecord()}
            >
              <Icon name="stop" color="white" />
              STOP
            </Button>
          </ButtonContainer>
          {/* </Stack> */}
          <Card.Divider />
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
          </Button>
        </>
        {/* </Background> */}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    // flex: 1, 
    // flexDirection: 'row', 
    // backgroundColor:'blue',
    width: '90%',
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center'
  }
});
