import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from "react";

export function Delete({ ...rest }: TouchableOpacityProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6} {...rest}>
            <Text style={styles.text}>
                delete
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#cc0000',
        padding: 10,
        borderRadius: 7,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
})