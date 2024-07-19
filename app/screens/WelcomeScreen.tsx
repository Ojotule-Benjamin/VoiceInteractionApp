import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import Animated from "react-native-reanimated"
import { Text } from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
//import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Entypo } from "@expo/vector-icons"
import Vapi from "@vapi-ai/react-native"
import { VAPI_API_KEY } from "@env"
// import { TouchableOpacity } from "react-native-gesture-handler"
import { TouchableOpacity } from "react-native"
import { useZoomAnimation } from "../hooks/useZoomAnimation"
import { useWaveAnimation } from "../hooks/useWaveAnimation"

const welcomeLogo = require("../../assets/images/listen.png")
const welcomeFace = require("../../assets/images/welcome-face.png")
const microphone = require("../../assets/images/microphone.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  //const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const [isListening, setIsListening] = useState<boolean>(false)

  const animatedStyle = useZoomAnimation(isListening)
  const waveAnimatedStyle = useWaveAnimation(isListening)

  const vapi = new Vapi(VAPI_API_KEY)

  return (
    <SafeAreaView style={$container}>
      <View style={$topContainer}>
        <Text style={$listening} tx="welcomeScreen.listening" preset="subheading" />
        {/* <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" /> */}
        <Animated.Image
          style={[$welcomeLogo, animatedStyle]}
          source={welcomeLogo}
          resizeMode="contain"
        />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="subheading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={$microphoneContainer}>
        <View style={$iconsContainer}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
        </View>
        <TouchableOpacity onPress={() => setIsListening(!isListening)}>
          {/* <Image style={$microphoneLogo} source={microphone} resizeMode="contain" /> */}
          <Animated.Image
            style={[$microphoneLogo, waveAnimatedStyle]}
            source={microphone}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Pressable style={$iconsContainer} onPress={() => setIsListening(!isListening)}>
          {isListening ? (
            <Entypo name="controller-stop" size={24} color="white" />
          ) : (
            <Entypo name="controller-play" size={24} color="white" />
          )}
        </Pressable>
      </View>

      {/* <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
      </View> */}
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $listening: TextStyle = {
  marginBottom: spacing.lg,
  color: "white",
  textAlign: "center",
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

// const $bottomContainer: ViewStyle = {
//   flexShrink: 1,
//   flexGrow: 0,
//   flexBasis: "43%",
//   backgroundColor: colors.palette.neutral100,
//   borderTopLeftRadius: 16,
//   borderTopRightRadius: 16,
//   paddingHorizontal: spacing.lg,
//   justifyContent: "space-around",
// }
const $welcomeLogo: ImageStyle = {
  height: 196,
  width: "100%",
  marginBottom: spacing.md,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $microphoneContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
}

const $iconsContainer: ViewStyle = {
  height: 48,
  width: 48,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 48,
  backgroundColor: colors.palette.neutral300,
}

const $microphoneLogo: ImageStyle = {
  height: 198,
  width: 198,
  marginBottom: spacing.lg,
}

const $welcomeHeading: TextStyle = {
  color: "white",
  textAlign: "center",
}
