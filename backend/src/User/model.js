import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => {
            delete ret._id;
        },
    },
  },
);

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  
  next();
});

userSchema.methods.isValidPassword = async function(password){
  const user = this;

  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const model = mongoose.model('User', userSchema);

export const { schema } = model;

export default model;