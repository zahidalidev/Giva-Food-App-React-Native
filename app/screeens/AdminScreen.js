import React, { useEffect, useState } from 'react';
import { Text, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeCrossPicker from "react-native-cross-picker"

// config
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import AppTextButton from '../components/AppTextButton';

//services
import { addCategory, getCategories } from '../services/CategoryServices';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { addProduct } from '../services/ProductServices';
import { addUser, getAllNewRes, getUserRef } from '../services/UserServices';

function AdminScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeComponent, setActiveComponent] = useState('product');

    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState(false);
    const [categoryImage, setCategoryImage] = useState(false);
    const [imageCategorySelected, setCategoryImageSelected] = useState(false);
    const [riderImage, setRiderImage] = useState(false);
    const [riderImageSelected, setRiderImageSelected] = useState(false);

    const [category, setCategory] = useState('');
    const [selectedCategory, setDropCategory] = useState('')
    const [allCategories, setAllCategories] = useState([])

    const [res, setRes] = useState('');
    const [selectedRes, setDropRes] = useState('')
    const [allRes, setAllRes] = useState([])



    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    const [foodFeils, setFoodFields] = useState([
        {
            id: 0,
            placeHolder: "Title",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Price",
            value: '',
        },
        {
            id: 2,
            placeHolder: "description",
            value: '',
        },

    ]);


    const [ridersfeilds, setRidersFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
            secure: false
        },
        {
            id: 2,
            placeHolder: "Email",
            value: '',
            secure: false
        },
        {
            id: 3,
            placeHolder: "Contact Number",
            value: '',
        },
        {
            id: 4,
            placeHolder: "Address",
            value: '',
        },
        {
            id: 5,
            placeHolder: "Password",
            value: '',
            secure: true
        },
    ]);

    const [restaurantfeilds, setRestaurantFeilds] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
            secure: false
        },
        {
            id: 2,
            placeHolder: "Email",
            value: '',
            secure: false
        },
        {
            id: 3,
            placeHolder: "Contact Number",
            value: '',
            secure: false
        },
        {
            id: 4,
            placeHolder: "Password",
            value: '',
            secure: true
        }
    ]);

    const handleRidersFields = (value, index) => {
        let tempFields = [...ridersfeilds];
        tempFields[index].value = value;
        setRidersFeilds(tempFields)
    }

    const handleRestaurantFields = (value, index) => {
        let tempFields = [...restaurantfeilds];
        tempFields[index].value = value;
        setRestaurantFeilds(tempFields)
    }

    const getAllCategories = async () => {
        setActivityIndic(true)
        try {
            let categoryRef = await getCategories();

            let tempCategories = [...allCategories];
            const observer = categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        let newData = change.doc.data()

                        let hasObject = []
                        tempCategories.filter(item => {
                            if (item.label === newData.label) {
                                hasObject.push(true)
                            }
                        });

                        if (!(hasObject.includes(true))) {
                            tempCategories.push(change.doc.data())
                            setAllCategories(tempCategories)
                        }
                    }
                    if (change.type === 'modified') {
                        console.log('Modified city: ', change.doc.data());
                    }
                    if (change.type === 'removed') {
                        console.log('Removed city: ', change.doc.data());
                    }
                });
            });

        } catch (error) {
            alert("Categories not found please add them");
            console.log("Categories found: ", error)
        }
        setActivityIndic(false)
    }


    const getAllRes = async () => {
        setActivityIndic(true)
        try {
            try {
                setActivityIndic(true)
                let userRef = await getUserRef();

                const observer = userRef.onSnapshot(querySnapshot => {
                    querySnapshot.docChanges().forEach(async (change) => {
                        let res = await getAllNewRes()
                        setAllRes(res)
                    });
                });
            } catch (error) {
                console.log("Categories found: ", error)
            }
            setRefreshing(false)
            setActivityIndic(false);

        } catch (error) {
            alert("Categories not found please add them");
            console.log("Categories found: ", error)
        }
        setActivityIndic(false)
    }

    useEffect(() => {
        getAllCategories()
        getAllRes()
    }, [])

    const uploadImages = async (evetnType) => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,
                quality: 0.6
            });


            const { height, width, type, uri } = pickerResult;

            if (evetnType === 'product') {
                setImage(uri)
                setImageSelected(true)
            } else if (evetnType === 'rider') {
                setRiderImage(uri)
                setRiderImageSelected(true)
            }
            else {
                setCategoryImage(uri)
                setCategoryImageSelected(true)
            }
        } catch (error) {

        }
    }

    const handleCategory = async () => {
        setActivityIndic(true)
        if (category === '') {
            alert("Title is empty")
            return;
        }
        try {
            const res = await addCategory(category, categoryImage)
            if (res) {
                alert("Category Added")
            } else {
                alert("Something went wrong!")
            }
        } catch (error) {
            console.log("category add: ", error)
        }
        setActivityIndic(false)
    }

    const handleChangeProduct = (text, index) => {
        let tempFields = [...foodFeils];
        tempFields[index].value = text;
        setFoodFields(tempFields)
    }

    const handleProduct = async () => {
        setActivityIndic(true)

        const title = foodFeils[0].value
        const price = foodFeils[1].value
        const description = foodFeils[2].value
        const category = selectedCategory;
        const rest = selectedRes;

        if (title === '' || price === '' || description === '' || category === '' || rest === '') {
            alert("All fields are required")
            return;
        }

        let body = {
            title,
            price,
            category,
            description,
            restaurant: rest
        }

        try {
            const res = await addProduct(body, image)
            if (!res) {
                console.log("product added erro: ", res)

                alert("Product Not Added");
                return;
            }

            alert("Product Added");

        } catch (error) {
            console.log("product added erro: ", error)
        }
        setActivityIndic(false)
    }

    const handleEmploy = async (type) => {
        setActivityIndic(true)

        let body = {};

        if (type === 'rider') {
            body = {
                name: ridersfeilds[0].value,
                email: ridersfeilds[1].value.trim().toLowerCase(),
                contactNumber: ridersfeilds[2].value,
                address: ridersfeilds[3].value,
                password: ridersfeilds[4].value.trim(),
                role: "rider"
            }
        } else {
            body = {
                name: restaurantfeilds[0].value,
                email: restaurantfeilds[1].value.trim().toLowerCase(),
                address: restaurantfeilds[2].value,
                password: restaurantfeilds[3].value.trim(),
                role: "restaurant"
            }
        }

        try {
            const res = await addUser(body, type, riderImage);
            if (!res) {
                alert("Not Added !")
                return;
            }
            alert("Added")

        } catch (error) {
            console.log("add error: ", error)
        }
        setActivityIndic(false)
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />

            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title="Admin Panel" />
            </Appbar.Header>

            <View style={styles.container}>
                {activityIndic
                    ? <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                    </View>
                    : <>
                        {/* Bottom Contaienr */}
                        <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                            {/* buttons */}
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), backgroundColor: colors.primary }} >
                                <View style={{ width: "90%", flexDirection: "row" }} >
                                    <TouchableOpacity onPress={() => setActiveComponent('product')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'product' ? colors.secondary : null }} >
                                        <Text numberOfLines={1} style={{ color: colors.white, fontSize: RFPercentage(2) }} >Product</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('category')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'category' ? colors.secondary : null }} >
                                        <Text numberOfLines={1} style={{ color: colors.white, fontSize: RFPercentage(2) }} >Category</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('riders')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "20%", padding: RFPercentage(2), backgroundColor: activeComponent === 'riders' ? colors.secondary : null }} >
                                        <Text numberOfLines={1} style={{ color: colors.white, fontSize: RFPercentage(2) }} >Riders</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActiveComponent('restaurant')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "30%", padding: RFPercentage(2), backgroundColor: activeComponent === 'restaurant' ? colors.secondary : null }} >
                                        <Text numberOfLines={1} style={{ color: colors.white, fontSize: RFPercentage(2) }} >Restaurant</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                activeComponent === 'product' ?
                                    <View style={{ marginTop: RFPercentage(2), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                        {/* Text feilds */}
                                        {foodFeils.map((item, i) =>
                                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                                <AppTextInput
                                                    placeHolder={item.placeHolder}
                                                    width="100%"
                                                    value={item.value}
                                                    onChange={(text) => handleChangeProduct(text, item.id)}
                                                    secure={item.secure}
                                                />
                                            </View>
                                        )}

                                        <ReactNativeCrossPicker
                                            modalTextStyle={{ color: "rgb(0, 74, 173)" }}
                                            mainComponentStyle={{ marginTop: RFPercentage(4), width: "85%", borderWidth: 0, backgroundColor: Colors.white }}
                                            iconComponent={iconComponent}
                                            items={allCategories}
                                            setItem={setDropCategory} selectedItem={selectedCategory}
                                            placeholder="Select Category"
                                            modalMarginTop={"70%"} // popup model margin from the top 
                                        />

                                        <ReactNativeCrossPicker
                                            modalTextStyle={{ color: "rgb(0, 74, 173)" }}
                                            mainComponentStyle={{ marginTop: RFPercentage(4), width: "85%", borderWidth: 0, backgroundColor: Colors.white }}
                                            iconComponent={iconComponent}
                                            items={allRes}
                                            setItem={setDropRes} selectedItem={selectedRes}
                                            placeholder="Select Resturant"
                                            modalMarginTop={"90%"} // popup model margin from the top 
                                        />

                                        <TouchableOpacity onPress={() => uploadImages("product")} style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(4), width: "85%", }} >
                                            <View style={{ borderRadius: RFPercentage(1.3), backgroundColor: colors.mediumSecondary, width: "50%", height: RFPercentage(6), justifyContent: "center", alignItems: "center" }} >
                                                <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Upload Image</Text>
                                            </View>
                                            {imageSelected ?
                                                <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.grey, fontSize: RFPercentage(1.8) }} >Image is Selected</Text>
                                                : <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.danger, fontSize: RFPercentage(1.8) }} >* Image is Not Selected</Text>
                                            }
                                        </TouchableOpacity>

                                        {/* Add Item Button */}
                                        <View style={{ marginTop: RFPercentage(10), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                            <AppTextButton
                                                name="Add Item"
                                                borderRadius={RFPercentage(1.3)}
                                                onSubmit={() => handleProduct()}
                                                backgroundColor={colors.primary}
                                                width="100%"
                                                height={RFPercentage(5.5)}
                                            />
                                        </View>

                                    </View> : null
                            }
                            {
                                activeComponent === 'category' ?
                                    <View style={{ marginTop: RFPercentage(2), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                        {/* Text feilds */}
                                        <View style={{ marginTop: RFPercentage(6), width: "85%" }} >
                                            <AppTextInput
                                                placeHolder="Category Title"
                                                width="100%"
                                                value={category}
                                                onChange={(text) => setCategory(text)}
                                            />
                                        </View>

                                        <TouchableOpacity onPress={() => uploadImages("category")} style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(4), width: "85%", }} >
                                            <View style={{ borderRadius: RFPercentage(1.3), backgroundColor: colors.mediumSecondary, width: "50%", height: RFPercentage(6), justifyContent: "center", alignItems: "center" }} >
                                                <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Upload Image</Text>
                                            </View>
                                            {imageCategorySelected ?
                                                <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.grey, fontSize: RFPercentage(1.8) }} >Image is Selected</Text>
                                                : <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.danger, fontSize: RFPercentage(1.8) }} >* Image is Not Selected</Text>
                                            }
                                        </TouchableOpacity>

                                        {/* Add Item Button */}
                                        <View style={{ marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                            <AppTextButton
                                                name="Add Category"
                                                borderRadius={RFPercentage(1.3)}
                                                onSubmit={() => handleCategory()}
                                                backgroundColor={colors.primary}
                                                width="100%"
                                                height={RFPercentage(5.5)}
                                            />
                                        </View>

                                    </View> : null
                            }
                            {
                                activeComponent === 'riders' ?
                                    <View style={{ marginTop: RFPercentage(2), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                        {/* Text feilds */}
                                        {ridersfeilds.map((item, i) =>
                                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                                <AppTextInput
                                                    placeHolder={item.placeHolder}
                                                    width="100%"
                                                    value={item.value}
                                                    onChange={(text) => handleRidersFields(text, i)}
                                                    secure={item.secure}
                                                />
                                            </View>
                                        )}

                                        <TouchableOpacity onPress={() => uploadImages("rider")} style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(4), width: "85%", }} >
                                            <View style={{ borderRadius: RFPercentage(1.3), backgroundColor: colors.mediumSecondary, width: "50%", height: RFPercentage(6), justifyContent: "center", alignItems: "center" }} >
                                                <Text style={{ color: colors.white, fontSize: RFPercentage(2.3) }} >Upload Image</Text>
                                            </View>
                                            {riderImageSelected ?
                                                <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.grey, fontSize: RFPercentage(1.8) }} >Image is Selected</Text>
                                                : <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: colors.danger, fontSize: RFPercentage(1.8) }} >* Image is Not Selected</Text>
                                            }
                                        </TouchableOpacity>

                                        {/* Add Rider */}
                                        <View style={{ marginTop: RFPercentage(10), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                            <AppTextButton
                                                name="Add Rider"
                                                borderRadius={RFPercentage(1.3)}
                                                onSubmit={() => handleEmploy('rider')}
                                                backgroundColor={colors.primary}
                                                width="100%"
                                                height={RFPercentage(5.5)}
                                            />
                                        </View>

                                    </View> : null
                            }
                            {
                                activeComponent === 'restaurant' ?
                                    <View style={{ marginTop: RFPercentage(2), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                        {/* Text feilds */}
                                        {restaurantfeilds.map((item, i) =>
                                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                                <AppTextInput
                                                    placeHolder={item.placeHolder}
                                                    width="100%"
                                                    value={item.value}
                                                    onChange={(text) => handleRestaurantFields(text, i)}
                                                    secure={item.secure}
                                                />
                                            </View>
                                        )}

                                        {/* Add Restaurant */}
                                        <View style={{ marginTop: RFPercentage(10), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                            <AppTextButton
                                                name="Add Restaurant"
                                                borderRadius={RFPercentage(1.3)}
                                                onSubmit={() => handleEmploy('restaurant')}
                                                backgroundColor={colors.primary}
                                                width="100%"
                                                height={RFPercentage(5.5)}
                                            />
                                        </View>

                                    </View> : null
                            }

                        </View>

                    </>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default AdminScreen;