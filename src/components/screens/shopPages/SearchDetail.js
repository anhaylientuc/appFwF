import React, { useEffect, useState } from 'react'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import { View } from 'react-native-picasso'
import Icons from 'src/components/icons/Icon'
import NewHTTP from 'src/utils/http/NewHTTP'
import { Dimensions } from 'react-native';

export const SearchDetail = (props) => {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / 2;

    const { route, navigation } = props
    const { keyword } = route.params
    const [products, setproducts] = useState([])
    const [check, setcheck] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await NewHTTP.getProducts({ keyword: keyword })
            console.log(response)
            setproducts(response)
        }
        fetchData()
    }, [])
    function swapNe(x) {
        try {
            if (!products || products.length === 0)
                return;

            const newProducts = products.map(product => {
                const { images } = product;

                // Kiểm tra nếu images tồn tại và có ít nhất 2 phần tử
                if (images && images.length > x) {
                    [images[x], images[x ^ 1]] = [images[x ^ 1], images[x]];
                }

                return { ...product, images };
            });

            setproducts(newProducts);
        } catch (error) {
            console.log(error);
        }
    }

    const renderItem = ({ item }) => {
        const { name, images, base_price } = item;
        return (
            <TouchableOpacity style={{ width: itemWidth, padding: 5 }}>
                <ScrollView
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {
                        images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image.url }}
                                style={{ width: itemWidth - 10, height: 300 }}  // Adjusted height for better appearance
                            />
                        ))
                    }
                </ScrollView>
                <TouchableOpacity onPress={() => handleClickItem(item)}>
                    <Text>{name}</Text>
                    <Text>{formatCurrencyVND(base_price)}</Text>
                </TouchableOpacity>

            </TouchableOpacity>
        );
    };

    const handleClickItem = (item) => {
        const { _id, product_id } = item
        //swapNe(1)
        navigation.navigate('ProductDetail', { _id, product_id })
    }
    const formatCurrencyVND = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icons.MaterialIcons name="arrow-back" size={28} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>{keyword}</Text>
                <View style={{ width: 20 }}></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, marginBottom: 30 }}>
                <TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 19 }}>Nhóm hàng</Text>
                        <Icons.MaterialIcons name='expand-more' size={28} />
                    </View>

                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Text style={{ fontSize: 19 }}>Bộ lọc&Sắp xếp</Text>
                    <Icons.MaterialIcons name='tune' size={25} />
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        if (!check[0]) {
                            const newCheck = [...check];
                            newCheck[0] = 1;
                            newCheck[1] = 0
                            setcheck(newCheck);
                            swapNe(0);
                        }

                    }}>
                        <View>
                            <Text>Người mẫu</Text>
                            {
                                check[0]? <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}>

                                </View>:null
                            }
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                        if (!check[1]) {
                            const newCheck = [...check];
                            newCheck[1] = 1;
                            newCheck[0] = 0
                            setcheck(newCheck);
                            swapNe(1);
                        }

                    }}>
                        <View>
                            <Text>Sản phẩm</Text>
                            {
                                check[1] ? <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}>

                                </View>:null
                            }
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Text>{products ? products.length : 0} Sản phẩm</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Icons.MaterialIcons name='view-list' size={25} />
                        <Icons.MaterialIcons name='view-module' size={25} />

                    </View>
                </View>
            </View>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 6
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginBottom: 30
    }
})
