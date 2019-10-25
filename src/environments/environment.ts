// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // createUser: 'https://stage.dirolabs.com:8440/Zuul-1.0/organization-2.0/createUser',
  // getUserKycInfo: 'https://stage.dirolabs.com:8440/Zuul-1.0/User-2.0/getUserKycInfo',
  // downloadDoucment: 'https://stage.dirolabs.com:8440/Zuul-1.0/uploadKyc-2.0/downloadDoucment'
  createUser: 'https://prod.dirolabs.com:8443/Zuul-1.0/organization-2.0/createUser',
  getUserKycInfo: 'https://prod.dirolabs.com:8443/Zuul-1.0/User-2.0/getUserKycInfo',
  downloadDoucment: 'https://prod.dirolabs.com:8443/Zuul-1.0/uploadKyc-2.0/downloadDoucment'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
