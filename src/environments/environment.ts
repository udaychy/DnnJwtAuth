export const ApiHostName: string = "http://mydnn.me"
export const NoImageUrl: string = "assets/imgs/no_image.png"

/* All the API controllers */
export enum ApiControllersUrls {
    Auth = 'http://mydnn.me/DesktopModules/JwtAuth/API/mobile/',
    User = 'http://mydnn.me/DesktopModules/DnnWebApi/API/User/'
}

/* All the action methods */
export enum ApiUserActions {
    getUser = "GetUser",
}

export enum ApiAuthActions {
    login = "login",
    logout = "logout",
}

