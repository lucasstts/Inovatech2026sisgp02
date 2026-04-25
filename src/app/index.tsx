import { auth } from "@/services/firebaseConfig"; // A ponte entre o app e o Firebase
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // A função de login do Firebase

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { BlurView } from 'expo-blur'
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"





export default function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [authUser, setAuthUser] = useState(null);

    // useEffect(() => {
        
    //     const unsub = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser({
    //                 email: user.email,
    //                 uid: user.uid
    //             })
    //             return;
    //         }
    //     })

    // })

    async function handleSignIn() {
    // Validação simples
    if (!email.trim() || !password.trim()) {
        return Alert.alert("Campos vazios", "Preencha email e senha corretamente.")
    }

    try {
        // Tentativa de login (Sintaxe modular que substitui o firebase.auth()...)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log("Usuário logado:", userCredential.user.uid)
        // useEffect(() => {
        
        //     const unsub = onAuthStateChanged(auth, (user) => {
        //         if (user) {
        //             setAuthUser({
        //                 email: user.email,
        //                 uid: user.uid
        //             })
        //             return;
        //         }
        //     })

        // })
        
    } catch (error: any) {
        // Aqui é onde entra o tratamento de erros que tinha no utils.js
        console.error(error.code)
        let message = "Erro ao tentar entrar."
        
        if (error.code === 'auth/invalid-email') message = "E-mail inválido."
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            message = "E-mail ou senha incorretos."
        }
        
        Alert.alert("Falha no Login", message)
    }
}
        
    return (
        <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.select({ ios: "padding", android: "height"})}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >   
                <Text style={styles.title}>
                    Entrar
                </Text>
                <Text style={styles.subtitle}>
                    Acesse sua conta com e-mail e senha.
                </Text>
                <View style={styles.form}>
                    <Input placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none" // Evita que o celular pegue a primeira letra maiúscula
                        onChangeText={setEmail} // Toda letra digitada vai para a variável 'email'onChangeText={setEmail}
                        placeholderTextColor="#fff"
                        style={styles.inputAlpha}
                    />
                    

                    <Input placeholder="Senha"
                        secureTextEntry
                        onChangeText={setPassword} // Toda letra digitada vai para a variável 'password'onChangeText={setEmail}
                        placeholderTextColor="#fff"
                        style={styles.inputAlpha}
                    />


                    <Button
                        label="Entrar"
                        onPress={handleSignIn}
                        style={styles.buttonWhite}
                        textStyle={ styles.buttonText }
                    />
                </View>

                <Text style= {styles.footerText}>
                    Não possui conta? {" "}
                    <Link href="/signup" style={styles.footerLink}>
                        Cadastre-se aqui.
                    </Link>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 700,
        color: "rgba(255, 255, 255, 0.8)",
        marginHorizontal: "auto"
        
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255)",
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        alignContent: "center",
        marginHorizontal: "auto"
    },
    form: {
        marginTop: 24,
        gap: 12,

    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#ffffff"
    },
    footerLink: {
        color: "#ffffff",
        fontWeight: 700,
    },
    buttonText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    buttonWhite: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: 'center', 
        alignItems: 'center',
    },
    inputAlpha: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        color: "#fff",
    },

})

