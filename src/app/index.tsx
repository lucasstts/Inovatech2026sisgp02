import { auth } from "@/services/firebaseConfig"; // A ponte entre o app e o Firebase
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth"; // A função de login do Firebase

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Link, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable
} from "react-native"





export default function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [authUser, setAuthUser] = useState(null);

    const [rememberMe, setRememberMe] = useState(false)

   
    async function handleSignIn() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Campos vazios", "Preencha email e senha corretamente.")
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            
            // SALVANDO A PREFERÊNCIA
            await AsyncStorage.setItem('@remember_me', JSON.stringify(rememberMe))
            
            console.log("Login realizado. Lembrar:", rememberMe)
        } catch (error: any) {
            let message = "E-mail ou senha incorretos."
            Alert.alert("Falha no Login", message)
        }
    }

    async function handleForgotPassword() {
        if (!email.trim()) {
            return Alert.alert("E-mail necessário", "Digite seu e-mail no campo acima para recuperar a senha.");
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Recuperação de senha", "Enviamos um link para o seu e-mail.");
        } catch (error: any) {
            Alert.alert("Erro", "Verifique se o e-mail está correto.");
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

                    <View style={styles.optionsRow}>
                        {/* Checkbox à esquerda */}
                        <Pressable 
                            style={styles.checkboxRow} 
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <Ionicons 
                                name={rememberMe ? "checkbox" : "square-outline"} 
                                size={20} 
                                color="#fff" 
                            />
                            <Text style={styles.rememberText}>Manter logado</Text>
                        </Pressable>

                        {/* Esqueci senha à direita */}
                        <Pressable onPress={handleForgotPassword}>
                            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                        </Pressable>
                    </View>
                    
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
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 4,
        paddingLeft: 4
    },
    rememberText: {
        color: "#fff",
        fontSize: 14,
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 12,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    forgotPasswordText: {
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 14,
        fontWeight: "600",
    },

})

