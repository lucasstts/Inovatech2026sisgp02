import { NavButton } from "@/components/navButton"
import { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { View, Text, StyleSheet, Image, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";




export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("home");

    return (

        <View style={styles.navBarWrapper}>
            {/* 1. O PNG da barra (o fundo com blur/vidro) */}
            <Image 
                source={require("@/assets/navigation-bar.png")} 
                style={styles.navBarPng} 
            />

            {/* 2. Onde os botões vão morar (em cima da imagem) */}
            <View style={styles.buttonsOverlay}>
                <NavButton 
                    id="home"
                    label="Home"
                    icon={require("@/assets/home-icon.png")}
                    isActive={activeTab === "home"}
                    onPress={() => setActiveTab("home")}
                />
                <NavButton 
                    id="alerts"
                    label="Denunciar"
                    icon={require("@/assets/alerts-icon.png")}
                    isActive={activeTab === "alerts"}
                    onPress={() => setActiveTab("alerts")}
                />
                <NavButton 
                    id="profile"
                    label="Perfil"
                    icon={require("@/assets/profile-icon.png")}
                    isActive={activeTab === "profile"}
                    onPress={() => setActiveTab("profile")}
                />
            </View>
        </View>

    //     <View style={styles.container}>
    //         <Text style={styles.title}>Bem-vindo ao EcoAlert!</Text>
    //         <Text>Você está logado como: {auth.currentUser?.email}</Text>
            
    //         <Button 
    //             label="Sair do App" 
    //             onPress={() => signOut(auth)} 
    //         />
    //     </View>
 )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    navBarWrapper: {
    position: 'absolute',
    bottom: 30,         // Distância do fundo da tela
    width: '94%',       // Largura da barra
    height: 75,         // Altura que você definiu no Photoshop
    alignSelf: 'center', // Centraliza a barra na horizontal
},
    navBarPng: {
    ...StyleSheet.absoluteFill, // Atalho para preencher 100% do pai
    width: '100%',
    height: '100%',
    resizeMode: 'stretch', // Garante que a imagem se ajuste ao container
},
    buttonsOverlay: {
    flex: 1,
    flexDirection: 'row', // Botões um ao lado do outro
    justifyContent: 'space-around', // Espaçamento igual entre eles
    alignItems: 'center', // Centraliza verticalmente
}
});