import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native"

type ButtonProps = TouchableOpacityProps & {
    label: string
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export function Button({ label, style, textStyle, ...rest}: ButtonProps){
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={[styles.label, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        backgroundColor: "#ffffff",
        opacity: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    label: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",

    },
})