import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Review plan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}