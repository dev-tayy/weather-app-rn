// import React, {useRef} from 'react';
// import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';

// const BottomSheet = ({isVisible, onClose}) => {
//   const bottomSheetAnimatedValue = useRef(new Animated.Value(0)).current;

//   const toggleBottomSheet = () => {
//     Animated.spring(bottomSheetAnimatedValue, {
//       toValue: isVisible ? 1 : 0,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <>
//       <TouchableOpacity style={styles.backdrop} onPress={onClose} />
//       <Animated.View
//         style={[
//           styles.bottomSheet,
//           {
//             transform: [
//               {
//                 translateY: bottomSheetAnimatedValue.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [500, 0],
//                 }),
//               },
//             ],
//           },
//         ]}>
//         <Text style={styles.title}>Bottom Sheet Title</Text>
//         <Text style={styles.subtitle}>Bottom Sheet Subtitle</Text>
//         <TouchableOpacity style={styles.button} onPress={onClose}>
//           <Text style={styles.buttonText}>Close Bottom Sheet</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   bottomSheet: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 500,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#007aff',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default BottomSheet;
