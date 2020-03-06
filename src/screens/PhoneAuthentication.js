import React, { useState } from 'react';
import { ScrollView, TextInput, Button, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as firebase from 'firebase';
import { Linking } from 'expo';

const CAPTCHA_URL = "https://expo-firebase-phone-auth.firebaseapp.com/captcha.html";

const PhoneAuthentication = () => {
    const [captchaUrl, setCaptchaUrl] = useState(CAPTCHA_URL);
    const [phone, setPhone] = useState('+5585988424402');
    const [smsCode, setSmsCode] = useState('');
    const [confirmSMSCode, setConfirmSMSCode] = useState();
    const [showWebView, setShowWebView] = useState(false);

    const handleSendSMS = () => {
        setShowWebView(true);
    };

    const handleConfirmSMSCode = async () => {
        const result = await confirmSMSCode(smsCode);
    };

    const handleTokenEncoded = async tokenEncoded => {
        const token = decodeURIComponent(tokenEncoded);
        console.log('token', token);
        
        //fake firebase.auth.ApplicationVerifier
        const captchaVerifier = {
            type: 'recaptcha',
            verify: () => Promise.resolve(token)
        };
        try {
            const confirmationResult = await firebase
                .auth()
                .signInWithPhoneNumber(phone, captchaVerifier);

            setConfirmSMSCode(async smsCode => {
                try {
                    await confirmationResult.confirm(smsCode);
                } catch (e) {
                    console.warn(e);
                }
            });
            setShowWebView(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleWebViewNavigationStateChange = newNavState => {
        
        const { url } = newNavState;
        
        
        if (!url || url === captchaUrl) return;
        
        setCaptchaUrl(url);

        console.log('url', url);

        // const tokenEncoded = Linking.parse(url).queryParams['token'];
        // console.log('tokenEncoded', tokenEncoded);
        // if (tokenEncoded)
        //     handleTokenEncoded(tokenEncoded);
    };

    const onError = error => {
        console.log('onError', error);
        
    };



    if (showWebView) {
        return (
            <View style={{ width: '100%', height: '100%', opacity: 1 }}>

                <WebView
                    style={{ marginTop: 20 }}
                    javaScriptEnabled
                    onError={onError}
                    source={{ uri: CAPTCHA_URL }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            </View>
        );
    }

    if (!confirmSMSCode)
        return (
            <ScrollView style={{ padding: 20, marginTop: 20 }}>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="Your phone"
                />
                <Button onPress={handleSendSMS} title="SMS Login" />
            </ScrollView>
        );
    else
        return (
            <ScrollView style={{ padding: 20, marginTop: 20 }}>
                <TextInput
                    value={smsCode}
                    onChangeText={setSmsCode}
                    keyboardType="numeric"
                    placeholder="Code from SMS"
                />
                <Button
                    onPress={handleConfirmSMSCode}
                    title="Confirm SMS code"
                />
            </ScrollView>
        );
};

export default PhoneAuthentication;
