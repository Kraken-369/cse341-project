module.exports = mongoose => {
  const Contact = mongoose.model(
    'contact',
    mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      favoriteColor: String,
      birthday: Date,
    }, { versionKey: false })
  );

  return Contact;
}