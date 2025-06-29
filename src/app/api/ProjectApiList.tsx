import BackendUrl from './BackendUrl';

export default function ProjectApiList() {
  const baseUrl = BackendUrl;
  const apiList = {
    api_getHomeData: `${baseUrl}/api/getall/home/all`,
    api_getValueData: `${baseUrl}/api/getall/value/all`,
    api_getMenuItems: `${baseUrl}/api/home/get-menu-items`,
    api_getMainMenuItems: `${baseUrl}/api/menu/categorytree/get`,
    api_getToppings: `${baseUrl}/api/topping/get`,
    api_getHomeMenuItems: `${baseUrl}/api/allMenu/getHomeSceenItems`,
    api_getUserProfileData: `${baseUrl}/api/otp-authRoutes/auth/profile`,
    api_createUserProfile: `${baseUrl}/api/otp-authRoutes/auth/create-user`,
    api_otplessCallback: `${baseUrl}/api/otp-authRoutes/auth/otpless/callback`,
    api_getBuildYourOwn: `${baseUrl}/api/build-your-own/options`,
    
    
  };

  return apiList;
}
