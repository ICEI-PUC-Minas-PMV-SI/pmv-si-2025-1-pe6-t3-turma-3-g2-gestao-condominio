import React from "react";
import { View, ScrollView } from "react-native";

type ListaDeItensProps<T> = {
  dados: T[];
  renderItem: (item: T) => React.ReactNode;
};

export default function ListaDeItens<T>({ dados, renderItem }: ListaDeItensProps<T>) {
  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {dados.map((item, index) => (
        <View key={index} style={{ width: "100%", alignItems: "center" }}>
          {renderItem(item)}
        </View>
      ))}
    </ScrollView>
  );
}