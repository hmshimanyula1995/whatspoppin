import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { loginStyles } from '@/components/LoginStyles';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // https://docs.clerk.dev/popular-guides/passwordless-authentication
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      navigation.navigate('VerifyCode');
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '');
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const onSignInPress = () => router.push('/(modals)/login');

  return (
    <View style={login.container}>
      <View style={loginStyles.inputView}>
        <TextInput
          value={firstName}
          style={loginStyles.textInput}
          placeholder="First name..."
          placeholderTextColor="#000"
          onChangeText={(firstName) => setFirstName(firstName)}
        />
      </View>

      <View style={loginStyles.inputView}>
        <TextInput
          value={lastName}
          style={loginStyles.textInput}
          placeholder="Last name..."
          placeholderTextColor="#000"
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>

      <View style={loginStyles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={loginStyles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmailAddress(email)}
        />
      </View>

      <View style={loginStyles.inputView}>
        <TextInput
          value={password}
          style={loginStyles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={loginStyles.primaryButton}
        onPress={onSignUpPress}
      >
        <Text style={loginStyles.primaryButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={loginStyles.footer}>
        <Text>Have an account?</Text>

        <TouchableOpacity
          style={loginStyles.secondaryButton}
          onPress={onSignInPress}
        >
          <Text style={loginStyles.secondaryButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
