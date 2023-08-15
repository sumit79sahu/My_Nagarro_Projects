'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories',[
      {
          "categoryId": 1,
          "category": "men's clothing",
          "categoryImage":"C:/Users/sumitsahu/Desktop/MyProject/react_project/react_project/frontend/src/Assets/Images/fashion.jpg"
      },
      {
          "categoryId": 2,
          "category": "jewellery",
          "categoryImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.reliancejewels.com%2F&psig=AOvVaw0pvTUQ_eEmV8X1QZBV93dk&ust=1692103667687000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDGxd6v3IADFQAAAAAdAAAAABAE"
      },
      {
          "categoryId": 3,
          "category": "electronics",
          "categoryImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fset-of-home-kitchen-appliances-in-the-room-on-the-wall-background-gm1196974664-341594506&psig=AOvVaw0ymfgHIlX2qXnNYzhcAcFD&ust"
      },
      {
           "categoryId": 4,
           "category": "women's clothing",
           "categoryImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.myntra.com%2Fwomen-clothing&psig=AOvVaw2gWJWdCs2M9tFXKGucbziq&ust=1692103784228000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICx85av3IADFQAAAAAdAAAAABAE"
      },
      {
           "categoryId": 5,
           "category": "Sports",
           "categoryImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fsports-clipart&psig=AOvVaw2RS2HqyTLtUFNJ4ofe-Wg3&ust=1692105514417000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjkxfyu3IADFQAAAAAdAAAAABAF"
      }
      ,
      {
           "categoryId": 6,
           "category": "Mobile and accessories",
           "categoryImage":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fmobile-accessories&psig=AOvVaw2zWvxcPuCWt7J9q1Zb0se_&ust=1692105601827000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCh1Nye3IADFQAAAAAdAAAAABA0"
      }
  ],{});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categories', null, {});
  }
};
