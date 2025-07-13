import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { FeatureCard } from "./components/FeatureCard";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#4f46e5", "#a21caf"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {/* Başlık */}
          <Text style={styles.title}>OnlyJS</Text>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{">"}</Text>
          </View>
          
          {/* Hoşgeldin */}
          <Text style={styles.welcomeTitle}>Hoş Geldin!</Text>
          <Text style={styles.welcomeSubtitle}>
            Basit blog uygulamamıza hoş geldin
          </Text>
          
          {/* Kartlar */}
          <View style={styles.cardsContainer}>
            <FeatureCard
              icon="book"
              title="İlham Verici İçerikler"
              description="JavaScript dünyasından en güncel yazılar"
            />
            <FeatureCard
              icon="edit-3"
              title="Kendi Yazılarını Paylaş"
              description="Deneyimlerini toplulukla paylaş"
            />
            <FeatureCard
              icon="users"
              title="Geliştirici Topluluğu"
              description="JS severlerin buluşma noktası"
            />
          </View>
          
          {/* Butonlar */}
          <View style={styles.buttonsContainer}>
            <Button title="Giriş Yap" onPress={() => navigation.navigate("Login" as never)} />
            <Button title="Kayıt Ol" onPress={() => navigation.navigate("Register" as never)} />
          </View>
          
          {/* Alt bilgi */}
          <Text style={styles.footerText}>
            Güvenli • Hızlı • JavaScript Odaklı
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
    marginBottom: 4,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoText: {
    fontSize: 12,
    color: "white",
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 24,
    textAlign: "center",
  },
  cardsContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 16,
  },
});
