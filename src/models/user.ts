import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png',
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'User',
  },
});

const User = models.User || model('User', userSchema);

export default User;
