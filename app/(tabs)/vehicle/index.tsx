import { Page } from '@/components/shared/Page';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function KeyboardAvoidingViewExample() {
  return (
    <Page>
      {/* <KeyboardAvoidingView behavior={'padding'} style={styles.content}> */}
      <View className="max-h-[300px]">
        {/* <ScrollView> */}
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        {/* </ScrollView> */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Page>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxHeight: 600,
  },
  heading: {
    fontSize: 36,
    marginBottom: 48,
    fontWeight: '600',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 45,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 36,
    paddingLeft: 10,
  },
  button: {
    marginTop: 12,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'rgb(40, 64, 147)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
});
