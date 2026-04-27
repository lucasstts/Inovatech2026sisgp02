import { Stack, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/services/firebaseConfig" // Importando a ponte
import { ActivityIndicator, View, ImageBackground, StyleSheet } from "react-native"
import { BlurView } from 'expo-blur'

export default function Layout() {
    // 1. Cria um estado para guardar o usuário logado
    const [user, setUser] = useState<User | null>(null)
    
    // 2. Cria um estado para saber se o Firebase ainda está "carregando"
    const [loading, setLoading] = useState(true)

    const segments = useSegments(); // Pega em qual "pasta" o usuário está
    const router = useRouter();


    useEffect(() => {
        // O onAuthStateChanged é um "ouvinte". 
        // Ele avisa o app toda vez que o status de login muda.
        const unsubscribe = onAuthStateChanged(auth, (userResponse) => {
            setUser(userResponse)
            setLoading(false) // Para de carregar assim que recebe uma resposta
        })

        return unsubscribe // Limpa o "ouvinte" quando o app fecha
    }, [])

    useEffect(() => {
        if (loading) return;

        const isAuthPage = segments[0] === "signup" || !segments[0];

        if (!user && !isAuthPage) {
            // Se NÃO está logado e NÃO está em uma página de login/cadastro, manda pro login
            router.replace("/");
        } else if (user && user.emailVerified && isAuthPage) {
            // SÓ ENTRA AQUI SE TIVER VERIFICADO
            router.replace("/home");
        } else if (user && !user.emailVerified && !isAuthPage) {
            // SE ESTIVER LOGADO MAS SEM VERIFICAÇÃO, FORÇA VOLTAR PRO LOGIN
            router.replace("/");
        }
    }   , [user, loading, segments]);

    // 3. Se ainda estiver carregando (verificando se há login), 
    // mostra uma animação de carregamento (o ActivityIndicator)
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#3366FF" />
            </View>
        )
    }

    // 4. Stack decide quais telas existem. 
    // Por enquanto, temo a 'index' (Login) e 'signup' (Cadastro).
    return (
        <ImageBackground
            source={require("@/assets/SignupBackground.png")}
            style={styles.illustration}
            resizeMode="cover"        
        >
            {/* <BlurView
                intensity={15}
                tint="dark"
                style={StyleSheet.absoluteFill}
            /> */}
            <Stack screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="(tabs)/home" />
            </Stack>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    
    illustration: {
        flex: 1,
        
    },

});