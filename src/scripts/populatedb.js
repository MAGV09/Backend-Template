const  prisma  = require('../lib/prisma');

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'Alice',
      email: 'alice@prisma.io',
      password:'s1967320',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  console.log('Created user:', user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
