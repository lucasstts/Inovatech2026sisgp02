import { auth } from "@/services/firebaseConfig"; // A ponte entre o app e o Firebase
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // A função de login do Firebase

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
    Alert,
    Image,
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
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Image
                        source={require("@/assets/logo.png")}
                        style={styles.illustration}
                    />

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
                            onChangeText={setEmail} // Toda letra digitada vai para a variável 'email'
                        />
                        

                        <Input placeholder="Senha"
                            secureTextEntry
                            onChangeText={setPassword} // Toda letra digitada vai para a variável 'password'
                        />


                        <Button label="Entrar" onPress={handleSignIn}/>
                    </View>

                    <Text style= {styles.footerText}>
                        Não possui conta? {" "}
                        <Link href="/signup" style={styles.footerLink}>
                            Cadastre-se aqui.
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        backgroundColor: "#FDFDFD",
        padding: 32,
    },
    illustration: {
        
        width: "80%",
        height: 330,
        resizeMode: "contain",
        marginTop: 62,
        marginHorizontal: "auto",
        
    },
    title: {
        fontSize: 32,
        fontWeight: 900,
        alignContent: "center",
        marginHorizontal: "auto"
        
    },
    subtitle: {
        fontSize: 16,
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
        color: "#585860"
    },
    footerLink: {
        color: "#032AD7",
        fontWeight: 700,
    }

})

