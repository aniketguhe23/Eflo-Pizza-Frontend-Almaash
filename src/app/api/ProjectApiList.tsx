import BackendUrl from './BackendUrl';

export default function ProjectApiList() {
  const baseUrl = BackendUrl;
  const apiList = {
    api_getHomeData: `${baseUrl}/api/getall/home/all`,
    api_getMenuItems: `${baseUrl}/api/home/get-menu-items`,
    api_getHomeMenuItems: `${baseUrl}/api/allMenu/getHomeSceenItems`,
    
    
  };

  return apiList;
}
