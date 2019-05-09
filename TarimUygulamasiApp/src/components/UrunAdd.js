import React, { Component } from 'react';
import {
    TextInput,
    Alert,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text } from 'react-native';
import { connect } from 'react-redux';
import {
    urunAdChanged,
    urunMiktarChanged,
    urunAddPost,
} from '../actions';
import { Spinner } from '../GlobalJS';
let { height, width } = Dimensions.get('window');
class UrunAdd extends Component {
    state = {
        urunAd:'',
        urunMiktar: '',
        loading: false
    };
    clickUrunAdd() {
        const {
            tarlaId,
            urunAd,
            urunMiktar} = this.props;
        this.props.urunAddPost({tarlaId,urunAd,urunMiktar});
    }
    renderButtontarla() {
        if (!this.props.loading) {
            return(
                <TouchableOpacity
                    onPress={this.clickUrunAdd.bind(this)}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}> Ekle </Text>
                </TouchableOpacity>
            )
        }else {
            return (
                <Spinner size="small" />
            )
        }
    }

    render() {
        const { TextInputStyle } = styles;
        console.log(this);
        return (
            <ImageBackground
                source={require('../images/uyeOlTarla.jpg')}
                style={styles.backgroundImage} >
                <View style={{flex:1 ,marginTop: height/6}}>
                    <TextInput
                        placeholder="Urun Adı"
                        style={TextInputStyle}
                        value={this.props.urunAd}
                        onChangeText={urunAd => this.props.urunAdChanged(urunAd)}/>

                    <TextInput
                        placeholder="Urun Miktari"
                        style={TextInputStyle}
                        value={this.props.urunMiktar}
                        onChangeText={urunMiktar => this.props.urunMiktarChanged(urunMiktar)}/>
                    {this.renderButtontarla()}
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,

    },
    textStyle: {
        alignSelf: 'stretch',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    TextInputStyle: {
        alignSelf: 'stretch',
        color: '#636564',
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: '#ffffff99',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#636564',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginLeft: 35,
        marginRight: 35,
        position: 'relative'
    },
    buttonStyle: {
        backgroundColor: '#e3b64399',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#636564',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft:70,
        paddingRight:50,
        marginTop:5,
        marginLeft: 80,
        marginRight: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }
});
const mapStateToProps = ({ kimlikdogrulamaResponse,tarlaAddResponse }) => {
    const {
        tarlaId,
        urunAd,
        urunMiktar} = kimlikdogrulamaResponse;
    return {
        tarlaId,
        urunAd,
        urunMiktar,
    };
};

export default connect(mapStateToProps,{urunAdChanged,urunMiktarChanged,urunAddPost})(UrunAdd);
