import { BlurView } from 'expo-blur'

import { Link } from "expo-router"
import { useState } from "react"
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"

// COMPONENTES
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

// CONFIGURAÇÃO DO FIREBASE
import { auth } from "@/services/firebaseConfig"

// FUNÇÕES ESPECÍFICAS DO FIREBASE
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export default function signup() {

    // Estados para guardar o que é digitado
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Lógica Assíncrona (A lógica de enviar para o Firebase)
    async function handleSignup() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            return Alert.alert("Campos vazios", "Preencha todos os campos para cadastrar.")
        }
        if (password !== confirmPassword) {
            return Alert.alert("Senhas diferentes", "A confirmação de senha deve ser igual à senha.")
        }

        try {
            // Salto 1: Criar o usuário na nuvem
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            
            // Salto 2: Colocar o nome no perfil dele
            await updateProfile(userCredential.user, {
                displayName: name
            }).catch (err => console.log("Erro no cadastro", "Verifique os dados e tente novamente.", err))
        } catch (error: any) {
            console.log("Erro completo:", error.code) 
            
            let message = "Verifique os dados e tente novamente."
            if (error.code === 'auth/email-already-in-use') message = "Este e-mail já está cadastrado."
            if (error.code === 'auth/weak-password') message = "A senha deve ter pelo menos 6 caracteres."
            
            Alert.alert("Erro no cadastro", message)
        }
         
    }

    // PASSO C: O que aparece na tela (UI)
    return (
        <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.select({ ios: "padding", android: "height"})}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                
                    <Text style={styles.title}>
                        Cadastrar
                    </Text>
                    <Text style={styles.subtitle}>
                        Crie sua conta para acessar.
                    </Text>
                    <View style={styles.form}>
                        <Input
                            value={name}
                            placeholder="Nome"
                            onChangeText={setName}
                            style={styles.inputAlpha}
                            placeholderTextColor="#fff" />
                        <Input
                            value={email}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            style={styles.inputAlpha}
                            placeholderTextColor="#fff"/>
                        <Input
                            value={password}
                            placeholder="Senha"
                            secureTextEntry
                            onChangeText={setPassword}
                            style={styles.inputAlpha}
                            placeholderTextColor="#fff"/>
                        <Input value={confirmPassword}
                            placeholder="Confirmar Senha"
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                            style={styles.inputAlpha}
                            placeholderTextColor="#fff"/>
                        <Button
                            label="Cadastrar"
                            onPress={handleSignup}
                            style={styles.buttonWhite}
                            textStyle={ styles.buttonText }
                        />
                    </View>

                    <Text style= {styles.footerText}>
                        Já possui conta? {" "}
                        <Link href="/" style={styles.footerLink}>
                            Entre aqui.
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
        padding: 24,
        marginTop: 2,
        fontSize: 32,
        fontWeight: 700,
        color: "rgba(255, 255, 255, 0.8)",
        alignContent: "center",
        marginHorizontal: "auto"
        
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        alignContent: "center",
        marginHorizontal: "auto"
    },
    form: {
        marginHorizontal: 32,
        marginTop: 24,
        gap: 12,

    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#ffffff",
        marginBottom: 24,
    },
    footerLink: {
        color: "#f9fafb",
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
    }

})


