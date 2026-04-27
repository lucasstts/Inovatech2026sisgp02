import React from 'react';
import { Pressable, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

// Define o que o botão precisa receber (Props)
interface NavButtonProps {
    id: string;
    label: string;
    icon: ImageSourcePropType; // Tipo específico para imagens do require()
    isActive: boolean;
    onPress: () => void;
}

export function NavButton({ id, label, icon, isActive, onPress }: NavButtonProps) {
    return (
        <Pressable 
            onPress={onPress}
            // A mágica da opacidade acontece aqui dentro do style:
            style={({ pressed }) => [
                styles.container,
                { opacity: (isActive || pressed) ? 1 : 0.5 }
            ]}
        >
            {/* O Ícone PNG vindo do Photoshop */}
            <Image source={icon} style={styles.icon} />
            
            {/* O Texto abaixo do ícone */}
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 70, // Garante que o botão tenha uma área de toque boa
    },
    icon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        marginBottom: 4,
    },
    label: {
        color: '#FFFFFF', // Cor baseada na sua imagem do Photoshop
        fontSize: 14,
        fontWeight: '500',
    }
});