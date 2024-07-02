/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
// /* eslint-disable dot-notation */
// /* eslint-disable react-native/no-inline-styles */
// import React, {useEffect, useState} from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import {
//   purchaseErrorListener,
//   purchaseUpdatedListener,
//   flushFailedPurchasesCachedAsPendingAndroid,
//   getSubscriptions,
//   requestSubscription,
//   endConnection,
//   initConnection,
// } from 'react-native-iap';

// const items = Platform.select({
//   ios: {},
//   android: {
//     skus: ['monthly_999'],
//   },
// });

// let purchaseUpdateSubscription;
// let purchaseErrorSubscription;

// function App() {
//   const [purchased, setPurchased] = useState(false);
//   const [products, setProducts] = useState({});
//   // console.log('products.......', products);

//   useEffect(() => {
//     initConnection()
//       .catch(() => {
//         console.log('Error connecting to the store....');
//       })
//       .then(res1 => {
//         getSubscriptions(items)
//           .catch(err1 => {
//             console.log('error finding items.....', err1);
//           })
//           .then(res => {
//             // console.log('RES.....', res);
//             setProducts(res);
//           });
//       });

//     purchaseErrorSubscription = purchaseErrorListener(error => {
//       if (!(error['responseCode'] === '2')) {
//         console.log(
//           'There has been error in your purchase, error code',
//           error['code'],
//         );
//       }
//     });

//     purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
//       setPurchased(true);
//     });

//     return () => {
//       try {
//         purchaseUpdateSubscription.remove();
//       } catch (err) {}

//       try {
//         purchaseErrorSubscription.remove();
//       } catch (err) {}

//       try {
//         endConnection();
//       } catch (err) {}
//     };
//   }, []);

//   if (products?.length > 0) {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <ScrollView contentContainerStyle={{flex: 1}}>
//           <View style={styles.container}>
//             <View style={styles.contentView}>
//               <Text style={styles.title}>
//                 This App is requires subscription
//               </Text>

//               {products?.map((item, index) => {
//                 console.log('item.....', item);
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                       requestSubscription(item.productId);
//                     }}
//                     style={{
//                       backgroundColor: 'pink',
//                       marginTop: 32,
//                       padding: 10,
//                       borderRadius: 16,
//                     }}>
//                     <Text style={styles.title}>Purchase {item.name}</Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   } else {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <ScrollView contentContainerStyle={{flex: 1}}>
//           <View style={styles.container}>
//             <View style={styles.contentView}>
//               <Text style={styles.title}>
//                 FETCHING PRODUCTS PLEASE WAIT.....
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     // justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentView: {
//     marginTop: 150,
//   },
//   title: {
//     // width: 300,
//     fontSize: 22,
//     color: '#000000',
//     textAlign: 'center',
//   },
// });

// export default App;

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Alert, Button, Platform, View} from 'react-native';
// import {
//   endConnection,
//   finishTransaction,
//   getPurchaseHistory,
//   getSubscriptions,
//   initConnection,
//   purchaseErrorListener,
//   purchaseUpdatedListener,
//   requestSubscription,
// } from 'react-native-iap';
import * as RNIap from 'react-native-iap';

// Platform select will allow you to use a different array of product ids based on the platform
const items = Platform.select({
  ios: {},
  android: {
    skus: ['monthly_999'],
  },
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default function App() {
  const [purchased, setPurchased] = useState(false); //set to true if the user has active subscription
  const [products, setProducts] = useState({}); //used to store list of products

  console.log('products.....', products, purchased);
  const validate = async receipt => {
    setPurchased(true);
    Alert.alert('SUCCESS', 'YOUR purchase SUCCESS');

    // try {
    //   // send receipt to backend
    //   const deliveryReceipt = await fetch('add your backend link here', {
    //     headers: {'Content-Type': 'application/json'},
    //     method: 'POST',
    //     body: JSON.stringify({data: receipt}),
    //   }).then(res => {
    //     res.json().then(r => {
    //       // do different things based on response
    //       if (r.result.error == -1) {
    //         Alert.alert('Error', 'There has been an error with your purchase');
    //       } else if (r.result.isActiveSubscription) {
    //         setPurchased(true);
    //       } else {
    //         Alert.alert('Expired', 'your subscription has expired');
    //       }
    //     });
    //   });
    // } catch (error) {
    //   Alert.alert('Error!', error.message);
    // }
  };

  useEffect(() => {
    RNIap.initConnection()
      .catch(() => {
        console.log('Error connecting to the store....');
      })
      .then(res1 => {
        RNIap.getSubscriptions(items)
          .catch(err1 => {
            console.log('error finding items.....', err1);
          })
          .then(res => {
            // console.log('RES.....', res);
            setProducts(res);
          });

        RNIap.getPurchaseHistory()
          .catch(() => {})
          .then(res => {
            try {
              const receipt = res[res.length - 1].transactionReceipt;
              if (receipt) {
                validate(receipt);
              }
            } catch (error) {}
          });
      });

    purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
      if (!(error['responseCode'] === '2')) {
        Alert.alert(
          'Error',
          'There has been an error with your purchase, error code' +
            error['code'],
        );
      }
    });
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(purchase => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        validate(receipt);
        RNIap.finishTransaction(purchase, false);
      }
    });

    return () => {
      try {
        purchaseUpdateSubscription.remove();
      } catch (error) {}
      try {
        purchaseErrorSubscription.remove();
      } catch (error) {}
      try {
        RNIap.endConnection();
      } catch (error) {}
    };
  }, []);

  const handleRequestSub = async data => {
    console.log('data.....', data);

    try {
      RNIap.requestSubscription({
        sku: data?.productId,
        subscriptionOffers: [
          {
            sku: data?.productId,
            offerToken: data?.subscriptionOfferDetails[0].offerToken,
          },
        ],
      })
        .then(res => {
          console.log('res......', res);
        })
        .catch(err => {
          console.log('ERROR.......', err);
        });

      // const myPurchase = await RNIap.requestSubscription({
      //   sku: data?.productId,
      //   subscriptionOffers: [
      //     {
      //       sku: data?.productId,
      //       offerToken: data?.subscriptionOfferDetails[0].offerToken,
      //     },
      //   ],
      // });

      // console.log('myPurchase......', myPurchase);
    } catch (err) {
      console.log('BUY ERROR.......', err);
    }
  };

  if (purchased) {
    return (
      <View>
        <Text style={styles.title}>WELCOME TO THE APP!</Text>
        <Text style={styles.title}>YOU ARE VIP NOW</Text>
        {/* <Image source={img} style={{height: 100, width: 100}} /> */}
      </View>
    );
  }

  if (products?.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to my app!</Text>
        <Text>
          This app requires a subscription to use, a purchase of the
          subscription grants you access to the entire app
        </Text>

        {products?.map((p, index) => (
          <Button
            key={index}
            title={`Purchase ${p.title}`}
            onPress={() => handleRequestSub(p)}
          />
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fetching products please wait...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: 'red',
  },
});
