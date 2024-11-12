export const oktaConfig = {
    clientId:'0oahbqvo6137lJJuU5d7',
    issuer:'https://dev-81039992.okta.com/oauth2/default',
    redirectUri:'https://localhost:3000/login/callback',
    scopes:['openid','profile','email'],
    pkce:true,
    disableHttpsCheck:true,
}