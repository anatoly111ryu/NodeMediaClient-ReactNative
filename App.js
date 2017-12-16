/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { NodePlayerView } from 'react-native-nodemediaclient';
import { NodeCameraView } from 'react-native-nodemediaclient';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = { publishBtnTitle: 'Start Publish' };
  }
  render() {
    return (
      <View >
        <NodePlayerView
          style={{ height: 200 }}
          ref={(vp) => { this.vp = vp }}
          inputUrl={"rtmp://192.168.0.10/live/stream"}
          scaleMode={"ScaleAspectFit"}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        />
        <NodeCameraView
          style={{ height: 300 }}
          ref={(vb) => { this.vb = vb }}
          outputUrl={"rtmp://192.168.0.10/live/stream1"}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
          autopreview={true}
        />
        <Button
          onPress={() => {
            if (this.state.isPublish) {
              this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
              this.vb.stop();
            } else {
              this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
              this.vb.start();
            }
          }}
          title={this.state.publishBtnTitle}
          color="#841584"
        />
      </View>
    );
  }
}
