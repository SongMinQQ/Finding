import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={'white'} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        position: 'absolute',
        zIndex: 5,
        opacity: 0.3,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
})
export default LoadingSpinner;