const prisma = require ("../prisma");

const seed = async() => {
  for (let i=0; i<3; i++) {
    const playlists = [];
    for (let j=0; j<5; j++) {
      playlists.push({
        name: `Person ${i}${j}`,
        description: `Description ${i}${j}`,
      })
    }
    await prisma.user.create({
      data: {
        username: `User${i+1}`,
        playlists: {
          create: playlists,
      }
    }
  })
  }
}
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  