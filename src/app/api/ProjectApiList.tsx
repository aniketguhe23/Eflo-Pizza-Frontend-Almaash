import BackendUrl from "./BackendUrl";

export default function ProjectApiList() {
  const baseUrl = BackendUrl;
  const apiList = {
    // data apis
    api_getHomeData: `${baseUrl}/api/getall/home/all`,
    api_getValueData: `${baseUrl}/api/getall/value/all`,
    api_getFooterData: `${baseUrl}/api/getall/footer/all`,
    api_getPolicyData: `${baseUrl}/api/policies/get`,

    // menu apis
    api_getBreadSize: `${baseUrl}/api/bread-size/get`,
    api_getCategory: `${baseUrl}/api/menu/categories/get`,
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
    api_getUsedCoupons: `${baseUrl}/api/coupons/get-used-coupons`,
    api_postUsedCoupon: `${baseUrl}/api/coupons/use-coupons`,
    api_createOrder: `${baseUrl}/api/order/orders/create`,
    api_getOrderById: `${baseUrl}/api/order/orders/get-by-id`,
    api_updateStatusOrdersById: `${baseUrl}/api/reports/update-orders-status`,

    // resturant data
    api_getAllRefunds: `${baseUrl}/api/refunds/getAllRefunds`,
    api_getAllContactSupport: `${baseUrl}/api/support/getsupport`,

    // resturant data
    api_getResturantData: `${baseUrl}/api/restaurants/get`,
    api_getResturantDataById: `${baseUrl}/api/restaurants/getbyid`,
    api_getItemsOfResturant: `${baseUrl}/api/restaurant-items`,
    api_getResturantBasicSettings: `${baseUrl}/api/restaurants/basic-setting/getByRestNo`,
    api_getResturantGeneralSettings: `${baseUrl}/api/restaurants/general-setting/getByRestNo`,

    // masters
    api_getCities: `${baseUrl}/api/location/getAllcities`,
    api_getLocality: `${baseUrl}/api/location/locality-by-city`,

    //refund
    api_createRefund: `${baseUrl}/api/refunds/createRefund`,
    api_createContactSupport: `${baseUrl}/api/support/create`,

    //Chats
    apipostChatsUserMessages: `${baseUrl}/api/chat/send`,
    apigetChatsUserList: `${baseUrl}/api/chat/user-list`,
    apigetChatsUserAdminConversations: `${baseUrl}/api/chat/user-admin`,
    apipostReopenChatSession: `${baseUrl}/api/chat/reopenChatSession`,
    
    //Admin
    apigetAllAdmins: `${baseUrl}/api/auth/getall-admins`,
    
    
    //Pomts
    apigetUserPoints: `${baseUrl}/api/order/orders/points`,
  };

  return apiList;
}
