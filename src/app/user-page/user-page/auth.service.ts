import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  state() {
    return [
      {
        id: 1,
        name: 'Tamil Nadu',
        district: [
          {
            id: 101,
            name: 'Trichy',

            city: [
              {
                id: 101,
                name: 'TrichyBusstand',
                pincode: 12345,
              },
            ],
          },
          {
            id: 102,
            name: 'palani',
            city: [
              {
                id: 102,
                name: 'palaniBusstand',
                pincode: 12344,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Kerala',
        district: [
          {
            id: 101,
            name: 'Kolam',

            city: [
              {
                id: 101,
                name: 'KolamBusstand',
                pincode: 133456,
              },
            ],
          },
          {
            id: 102,
            name: 'Kochi',
            city: [
              {
                id: 102,
                name: 'KochiBusstand',
                pincode: 13457,
              },
            ],
          },
        ],
      },
    ];
  }
}
// city() {
//   return [
//     {
//       id: 'Tamil Nadu',
//       name: 'Trichy',
//     },
//     {
//       id: 'Tamil Nadu',
//       name: 'Thanjavur',
//     },
//     {
//       id: 'Kerala',
//       name: 'Kochi',
//     },
//     {
//       id: 'Kerala',
//       name: 'Thirssur',
//     },
//     {
//       id: 'Andhra Pradesh',
//       name: 'Tirupati',
//     },
//     {
//       id: 'Andhra Pradesh',
//       name: 'Chitoor',
//     },
//   ];
// }
// pincode() {
//   return [
//     {
//       id: 'Trichy',
//       name: '620001',
//     },
//     {
//       id: 'Thanjavur',
//       name: '620002',
//     },
//     {
//       id: 'Kochi',
//       name: '723211',
//     },
//     {
//       id: 'Thirssur',
//       name: '723212',
//     },
//     {
//       id: 'Tirupati',
//       name: '633211',
//     },
//     {
//       id: 'Chitoor',
//       name: '633212',
//     },
//   ];
// }
