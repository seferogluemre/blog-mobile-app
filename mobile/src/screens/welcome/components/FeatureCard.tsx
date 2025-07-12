import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white/10", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "white/20" }}>
    <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "white/20", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
      <Icon name={icon} size={22} color="#fff" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "semibold", color: "white" }}>{title}</Text>
      <Text style={{ fontSize: 12, color: "white/70" }}>{description}</Text>
    </View>
  </View>
);
