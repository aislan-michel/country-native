import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from "react";

export function Add({ ...rest }: TouchableOpacityProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6} {...rest}>
            <Text style={styles.title}>
                add
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fca103',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
})