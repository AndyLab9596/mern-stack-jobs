import mongoose, { Types, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  _id: Types.ObjectId;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true,
    required: [true, "Please provide name"],
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true,
    default: "lastName",
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "my city",
  },
});

UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return isPasswordCorrect;
};

export default mongoose.model("User", UserSchema);
