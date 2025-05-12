import BackendUrl from './BackendUrl';

export default function ProjectApiList() {
  let baseUrl = BackendUrl;
  let apiList = {
    api_getHomeData: `${baseUrl}/api/getall/home/all`,
    api_getMenuItems: `${baseUrl}/api/home/get-menu-items`,
    
    
  };

  return apiList;
}
