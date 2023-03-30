module.exports = () => {
  const data = { users: [] };
  // Create 50 users
  for (let i = 0; i < 50; i++) {
    data.users.push({
      id: i,
      name: `user${i}`,
      email: 'twildingro@timesonline.co.uk',
      contact: '507 623 1170',
      password: 'lRGyhYQ2R'
    });
  }
  return data;
};
