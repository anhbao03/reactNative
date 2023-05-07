import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLOURS } from '../database/Database'
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {img} from '../../assets/images/arowana/silver.png'

const Home = ({navigation}) => {

  const [arowanas, setArowanas] = useState([]);
  const [accessory, setAccessory] = useState([]);

   //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async() => {
    let arowanaList = [];
    let accessoryList = [];

    const {data} = await axios.get('https://react-native-shop.onrender.com/products');
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      if (data[index].category == 'Arowana') {
        arowanaList.push(data[index]);
      } else if (data[index].category == 'Accessory') {
        accessoryList.push(data[index]);
      }
    }
  
    setArowanas(arowanaList);
    setAccessory(accessoryList);
  }

  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={{ uri: data.image}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.name}
        </Text>
        {data.category == 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text style={{fontWeight:'bold',}}>$ {data.price}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={{
      width:'100%',
      height:'100%',
      backgroundColor:COLOURS.white,
    }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          width:'100%',
          flexDirection:'row',
          justifyContent:'space-between',
          padding:16,
        }}>
          <TouchableOpacity>
            <Entypo name="shopping-bag" style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight
            }} />

          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="cart" onPress={() => navigation.navigate('MyCart')} style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLOURS.backgroundLight
            }} />

          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Hi-Fi Shop &amp; Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            Audio shop on 2477 Pham The Hien.
            {'\n'}This shop offers both products and services
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Arowanas
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                {arowanas.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {arowanas.map((data, i) => {
              return <ProductCard data={data} key={i} />;
            })}
          </View>
        </View>
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Accessories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                {accessory.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {accessory.map((data,i) => {
              return (<ProductCard data={data} key={i} />);
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  }

export default Home