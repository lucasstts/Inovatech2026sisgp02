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


export default function Signup() {

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
            })

            Alert.alert("Sucesso!", `Bem-vindo ao EcoAlerta, ${name}!`)
        } catch (error: any) {
            console.log(error.code) // Ajuda a debugar no console
            Alert.alert("Erro no cadastro", "Verifique os dados e tente novamente.")
        }
    }

    // PASSO C: O que aparece na tela (UI)
    return (
        <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.select({ ios: "padding", android: "height"})}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                
                <ImageBackground
                        source={require("@/assets/SignupBackground.png")}
                        style={styles.illustration}
                    >

                        <Text style={styles.title}>
                            Cadastrar
                        </Text>
                        <Text style={styles.subtitle}>
                            Crie sua conta para acessar.
                        </Text>
                        <View style={styles.form}>
                           <Input placeholder="Nome" onChangeText={setName} />
                            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />
                            <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
                            <Input placeholder="Confirmar Senha" secureTextEntry onChangeText={setConfirmPassword} />
                            <Button label="Cadastrar" onPress={handleSignup} />
                        </View>

                        <Text style= {styles.footerText}>
                            Já possui conta? {" "}
                            <Link href="/" style={styles.footerLink}>
                                Entre aqui.
                            </Link>
                        </Text>
                </ImageBackground>
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
        
        width: "100%",
        height: "100%",
        
    },
    title: {
        padding: 24,
        marginTop: 64,
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
        marginHorizontal: 32,
        marginTop: 24,
        gap: 12,

    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#585860",
        marginBottom: 24,
    },
    footerLink: {
        color: "#032AD7",
        fontWeight: 700,
    }

})