import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { FeatureCard } from "./components/FeatureCard";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#4f46e5", "#a21caf"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center", paddingHorizontal: 24 }}>
          {/* Başlık */}
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginTop: 8, marginBottom: 4 }}>OnlyJS</Text>
          {/* Logo */}
          <View style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: "white/10", borderWidth: 2, borderColor: "white/20", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            {/* Buraya SVG veya icon ekleyebilirsin */}
            <Text style={{ fontSize: 12, color: "white" }}>{">"}</Text>
          </View>
          {/* Hoşgeldin */}
          <Text style={{ fontSize: 16, fontWeight: "semibold", color: "white", marginBottom: 4 }}>Hoş Geldin!</Text>
          <Text style={{ fontSize: 12, color: "white/80", marginBottom: 24, textAlign: "center" }}>
            Basit blog uygulamamıza hoş geldin
          </Text>
          {/* Kartlar */}
          <View style={{ width: "100%", gap: 12, marginBottom: 32 }}>
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
          <View style={{ width: "100%", gap: 12, marginBottom: 24 }}>
            <Button title="Giriş Yap" onPress={() => navigation.navigate("Login" as never)} />
            <Button title="Kayıt Ol" onPress={() => navigation.navigate("Register" as never)} />
          </View>
          {/* Alt bilgi */}
          <Text style={{ fontSize: 12, color: "white/60", marginBottom: 16 }}>
            Güvenli • Hızlı • JavaScript Odaklı
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
