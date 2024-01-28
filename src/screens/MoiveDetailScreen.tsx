import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { movieDetails, movieCastDetails, baseImagePath } from '../api/apicalls';
import { COLORS, SPACING, FONTSIZE, FONTFAMILY, BORDERRADIUS } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const getMoviesDetails = async (movieId: any) => {
  try {
    let movieDetailsResponse = await fetch(movieDetails(movieId));
    let movieDetailsJson = await movieDetailsResponse.json();

    return movieDetailsJson

  } catch (error) {
    console.error('Something went wrong in getMoviesDetails ', error);

  }
}
const getMovieCastDetails = async (movieId: any) => {
  try {
    let movieCastDetailsResponse = await fetch(movieCastDetails(movieId));
    let movieCastDetailsJson = await movieCastDetailsResponse.json();

    return movieCastDetailsJson

  } catch (error) {
    console.error('Something went wrong in getMovieCastDetails ', error);

  }

}

export default function MoiveDetailScreen({ navigation, route }: any) {
  const [movieDetail, setMovieDetail] = useState<any>(undefined);
  const [movieCast, setMovieCast] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let movieDetailsJson = await getMoviesDetails(route.params.movieid);
      let movieCastDetailsJson = await getMovieCastDetails(route.params.movieid);
      setMovieDetail(movieDetailsJson);
      setMovieCast(movieCastDetailsJson.cast);
    })()
  }, [])
  if (
    movieDetail == undefined &&
    movieDetail == null &&
    movieCast == undefined &&
    movieCast == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground source={{
          uri: baseImagePath('w780', movieDetail?.backdrop_path),
        }} style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>

          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG} />
          <Image source={{
            uri: baseImagePath('w780', movieDetail?.poster_path),
          }} style={styles.cardImage} />
      </View>
      <View style={styles.timeContainer}>
       <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {
            Math.floor(movieDetail?.runtime / 60)
          }h{' '}{Math.floor(movieDetail?.runtime % 60)}m
        </Text>  
      </View>

      <View>
        <Text style={styles.title}>{movieDetail?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieDetail?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieDetail?.tagline}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieDetail?.vote_average.toFixed(1)} ({movieDetail?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieDetail?.release_date.substring(8, 10)}{' '}
            {new Date(movieDetail?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieDetail?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieDetail?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCast}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCast?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subtitle={item.character}
            />
          )}
        />

        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                BgImage: baseImagePath('w780', movieDetail.backdrop_path),
                PosterImage: baseImagePath('original', movieDetail.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: BORDERRADIUS.radius_10,},
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});