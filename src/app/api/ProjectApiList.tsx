import BackendUrl from './BackendUrl';

export default function ProjectApiList() {
  const baseUrl = BackendUrl;
  const apiList = {

    // data apis
    api_getHomeData: `${baseUrl}/api/getall/home/all`,
    api_getValueData: `${baseUrl}/api/getall/value/all`,
    api_getFooterData: `${baseUrl}/api/getall/footer/all`,

    // menu apis
    api_getMenuItems: `${baseUrl}/api/home/get-menu-items`,
    api_getMainMenuItems: `${baseUrl}/api/menu/categorytree/get`,
    api_getToppings: `${baseUrl}/api/topping/get`,
    api_getHomeMenuItems: `${baseUrl}/api/allMenu/getHomeSceenItems`,
    api_getSuggestions: `${baseUrl}/api/allMenu/getSuggestions`,

    // user apis
    api_getUserProfileData: `${baseUrl}/api/otp-authRoutes/auth/profile`,
    api_createUserProfile: `${baseUrl}/api/otp-authRoutes/auth/create-user`,
    api_updateUserProfile: `${baseUrl}/api/user/updateUserAddress`,
    api_updateUserProfileDetails: `${baseUrl}/api/user/updateUserDetails`,
    api_deleteUserAddress: `${baseUrl}/api/user/delete-address`,

    // otpless apis
    api_otplessCallback: `${baseUrl}/api/otp-authRoutes/auth/otpless/callback`,
    api_getBuildYourOwn: `${baseUrl}/api/build-your-own/options`,
    
    // order apis
    api_getCoupons: `${baseUrl}/api/coupons/get`,
    api_createOrder: `${baseUrl}/api/order/orders/create`,
    api_getOrderById: `${baseUrl}/api/order/orders/get-by-id`,
    
    
    // resturant data
    api_getResturantData: `${baseUrl}/api/restaurants/get`,
    api_getResturantDataById: `${baseUrl}/api/restaurants/getbyid`,
    api_getItemsOfResturant: `${baseUrl}/api/restaurant-items`,
    
    // masters
    api_getCities: `${baseUrl}/api/location/getAllcities`,

    
  };

  return apiList;
}
