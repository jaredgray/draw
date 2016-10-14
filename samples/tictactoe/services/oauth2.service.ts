export class OAuth2Service
{
    
    loginGoogle(userName: string)
    {
        var protocol = 'https://accounts.google.com/o/oauth2/v2/auth';
        var responseType = 'token';
        var clientId = '1089075037858-b8pgna048u027uj3agfvkbvtch0iuj9a.apps.googleusercontent.com';
        var launch = protocol +
            "?response_type=" + responseType +
            "&state=" + userName +
            "&scope=profile email" +
            "&redirect_uri=" + "http://pdxcodebits.com/bin/samples/tictactoe?signin=signin-google" +
            "&client_id=" + clientId;
        
        location.href = launch;
    }
    parseGoogleResponseQueryString(queryString: string)
        : any
    {
        var params = {},
        regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) 
        {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }
}