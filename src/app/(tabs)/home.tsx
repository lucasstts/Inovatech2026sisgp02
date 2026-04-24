import { auth } from "@/services/firebaseConfig";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { signOut } from "firebase/auth";


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao EcoAlert!</Text>
            <Text>Você está logado como: {auth.currentUser?.email}</Text>
            
            <Button 
                label="Sair do App" 
                onPress={() => signOut(auth)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});