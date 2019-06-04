import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions, Video } from 'expo';
import { Icon } from 'react-native-elements'


export default class CameraExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            permissionsGranted: false,
            bcolor: 'red',
            type: Camera.Constants.Type.back,
            cameraIsRecording: false,
            duration: this.props.duration / 1000,
            timer: this.props.duration / 1000
        }
        this.camera = undefined
        this.takeFilm = this.takeFilm.bind(this)
    }

    async componentWillMount() {
        let cameraResponse = await Permissions.askAsync(Permissions.CAMERA)
        if (cameraResponse.status == 'granted') {
            let audioResponse = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            if (audioResponse.status == 'granted') {
                this.setState({ permissionsGranted: true });
            }
        }
    }


    takeFilm() {
        const { duration } = this.props
        let self = this;
        if (this.camera) {
            var myTimer = setInterval(() => {
                const { timer, cameraIsRecording } = this.state

                this.setState({
                    timer: timer - 1
                })
                if (!cameraIsRecording) {
                    clearInterval(myTimer)
                }
            }, 1000)
            this.camera.recordAsync()
                .then(data =>
                    self.setState({ uri: data.uri, bcolor: 'green' },
                        () => {
                            console.log('Data', data)
                            this.done()
                        }
                    )


                )
        }
        setTimeout(() => {
            const { duration } = this.state
            if (this.camera) {
                this.camera.stopRecording();
                this.setState({ cameraIsRecording: false, timer: duration })
            }
        }, this.props.duration)


    }

    goBack() {
        const { back } = this.props

        back()
    }

    done() {
        
        const { uri } = this.state
        const { VideoUri } = this.props
        VideoUri(uri)
        console.log(uri, 'uri done chala hy herr')
    }

    retake() {
        const { duration } = this.state
        clearInterval(this.myTimer);

        this.setState({
            uri: '', timer: duration
        })
    }

    render() {
        const { uri, cameraIsRecording, permissionsGranted, duration, timer } = this.state;
        if (!this.state.permissionsGranted) {
            return <View><Text>Camera permissions not granted</Text></View>
        } else {
            return (
                <View style={{ flex: 1, position: 'relative' }}>
                    <View style={{ flex: 1 }}>
                        {
                            uri ?
                                <Video
                                    source={{ uri: uri }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping

                                    style={{ flex: 1 }}
                                // style={{ width: 350, height: 350 }}
                                />
                                :
                                <Camera ref={ref => this.camera = ref} style={{ flex: 1 }} ></Camera>
                        }
                    </View>
                    {
                        uri ?
                            <View style={[styles.btn, { paddingVertical: 5 }]}>
                                <TouchableOpacity onPress={() => this.goBack()} style={styles.opacity3}>
                                    <Text style={{ textAlign: 'center' }}>Back</Text>
                                    {/* <Icon name='arrow-back' /> */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.opacity3} onPress={() => this.retake()}>
                                    {/* <Text>Retake</Text> */}
                                    <Icon name='loop' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.done()} style={styles.opacity3} >
                                    <Text style={{ textAlign: 'center' }}>Send</Text>
                                    {/* <Icon name='done' /> */}
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={[styles.btn, { paddingVertical: 5 }]}>
                                <TouchableOpacity onPress={() => this.goBack()} style={styles.opacity2}>
                                    <Icon name='arrow-back' />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.opacity5} onPress={() => {
                                    if (cameraIsRecording) {
                                        if (this.camera) {
                                            clearInterval(this.myTimer);
                                            this.camera.stopRecording();
                                            this.setState({ cameraIsRecording: false, timer: duration })
                                        }
                                    }
                                    else {
                                        this.setState({ cameraIsRecording: true, timer: duration })
                                        this.takeFilm();
                                    }
                                }}>
                                    {
                                        this.state.cameraIsRecording ?
                                            <Text style={{paddingLeft:"22%", fontSize:14,fontWeight: 'bold'}}>SEND</Text>
                                            // <Icon name='videocam-off' />
                                            :
                                            <Text style={{paddingLeft:"17%", fontSize:14,fontWeight: 'bold'}}>Record</Text>
                                            // <Icon name='videocam' />
                                        // <Image source={{uri:video}}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                })} style={styles.opacity2}>
                                    {/* <Icon name='flip-to-front' /> */}
                                </TouchableOpacity>
                            </View>
                    }
                    {
                        cameraIsRecording &&
                        <View style={{ alignItems: 'flex-end', paddingVertical: '10%', paddingHorizontal: '4%', position: 'absolute', top: 0, width: '100%' }}>
                            <View style={{ width: 40, height: 40, borderRadius: 100, justifyContent: 'center', borderColor: 'antiquewhite', borderWidth: 2 }}>
                                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
                                    {timer}
                                </Text>
                            </View>
                        </View>
                    }
                </View>)
        }
    }
}

const styles = StyleSheet.create({
    opacity1: {
        // left: 0,
        width: 70,
        height: 70,
        borderWidth: 10,
        borderRadius: 70,
        borderColor: 'red',
        backgroundColor: 'blue',
        textAlign: 'center',
        justifyContent: 'center'
    },
    opacity2: {
        // left: 0,
        width: 70,
        height: 50,
        // borderWidth: 2,
        borderRadius: 70,
        borderColor: 'white',
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center'
    },  opacity5: {
        // left: 10,
        width: 70,
        height: 60,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center'
    },

    opacity3: {
        // left: 170,
        width: 70,
        height: 50,
        flex: 1,
        // borderWidth: 10,
        // borderRadius: 70,
        // borderColor: 'grey',
        borderRadius: 70,
        borderColor: 'white',
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center'

    },
    View: {
        flex: 0.1,
        textAlign: 'center',
        justifyContent: 'center'
    },
    btn: {
        height:"12%",
        // flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        left: 0
    }
})