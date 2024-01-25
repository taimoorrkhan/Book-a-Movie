import React from "react";
import { StyleSheet, View } from 'react-native';
import { HomeScreen,  SearchScreen,  TicketScreen, UserAccountScreen } from "../screens";

import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomIcon from "../components/CustomIcon";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.Black,
        height: SPACING.space_10 *10,
        borderTopWidth: 0,
      },
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused,color,size }) => (
            <View style={[styles.activeTabBackground,
            focused ? { backgroundColor: COLORS.Orange } : { backgroundColor: COLORS.Black }
            ]}>
              <CustomIcon name="video" color={ COLORS.White} size={FONTSIZE.size_30} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.activeTabBackground,
            focused ? { backgroundColor: COLORS.Orange } : { backgroundColor: COLORS.Black }
            ]}>
              <CustomIcon name="search" color={COLORS.White} size={FONTSIZE.size_30} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.activeTabBackground,
              focused ? { backgroundColor: COLORS.Orange } : { backgroundColor: COLORS.Black }
            ]}>
              <CustomIcon name="ticket" color={COLORS.White} size={FONTSIZE.size_30} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.activeTabBackground,
            focused ? { backgroundColor: COLORS.Orange } : { backgroundColor: COLORS.Black }
            ]}>
              <CustomIcon name="user" color={COLORS.White} size={FONTSIZE.size_30} />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 *10
  },
 


})
