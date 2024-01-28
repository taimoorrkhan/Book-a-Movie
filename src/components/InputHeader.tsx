import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
export default function InputHeader({ searchFunction }:any) {
  const [searchText, setSearchText] = useState<string>('');
  const handleSearch = () => {
    searchFunction(searchText);
  };
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={COLORS.WhiteRGBA15}
        style={styles.textInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        returnKeyLabel='search'
        returnKeyType='search'
      
      />
      <TouchableOpacity onPress={handleSearch}
        style={styles.searchIconContainer}
      >
        <CustomIcon name="search" size={FONTSIZE.size_20} color={COLORS.Orange} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  textInput: {
    width: '90%',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  searchIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },

})