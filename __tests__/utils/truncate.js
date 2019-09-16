import mongoose from 'mongoose';

export default async () => {
  const { collections } = mongoose.connections[0];

  await Promise.all(
    Object.keys(collections).map(name =>
      mongoose.connection.collections[name].deleteMany({})
    )
  );
  await mongoose.connection.dropDatabase();
};
