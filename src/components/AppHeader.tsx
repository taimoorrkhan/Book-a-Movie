import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

export default function AppHeader({ name, header, action }:any) {
  return (
    <View style={styles.constainer}>
      <TouchableOpacity onPress={action} style={styles.iconBackground} >
        <CustomIcon name = {name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        {header}
      </Text>
      <View style={styles.emptyContainer} />
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  textStyle: {
    flex: 1,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
  },
  emptyContainer: {
    width: SPACING.space_20 * 2,
    height: SPACING.space_20 * 2,
  },
  iconBackground: {
    width: SPACING.space_20 * 2,
    height: SPACING.space_20 * 2,
    borderRadius: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : COLORS.Orange,
  }

})