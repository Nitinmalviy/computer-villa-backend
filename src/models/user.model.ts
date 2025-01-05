import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import { compare, hash } from "bcryptjs";

interface IUserModel extends Model<IUser> {
  createUser(userData: ICreateUser): Promise<IUser>;
  getUserById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  updateUser(id: string, updateData: Partial<IUpdateUser>): Promise<IUser>;
  deleteUser(id: string): Promise<boolean>;
  validateCredentials(email: string, password: string): Promise<IUser>;
  updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean>;
  updateSessionToken(id: string, sessionToken: string): Promise<void>;
  getAllUsers(
    page?: number,
    limit?: number
  ): Promise<{
    users: IUser[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  searchUsers(query: string): Promise<IUser[]>;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  sessionToken?: string;
  refreshToken?: string;
  profilePic?: string;
  nickname?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface OTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  _id: ObjectId;
  __v: number;
}

interface ICreateUser {
  username?: string;
  email: string;
  password: string;
  nickname?: string;
}

interface IUpdateUser {
  username?: string;
  email?: string;
  nickname?: string;
  profilePic?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: false,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    sessionToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
});

UserSchema.pre("save", async function (this: IUser & Document, next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await hash(this.password, 12);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.statics = {
  async createUser(userData: ICreateUser) {
    try {
      const user = new this(userData);
      return await user.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("User with this email already exists");
      }
      throw error;
    }
  },

  async getUserById(id: string) {
    try {
      const user = await this.findById(id).select("-password");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = await this.findOne({ email }).select("-password");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id: string, updateData: Partial<IUpdateUser>) {
    try {
      const user = await this.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const result = await this.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw error;
    }
  },

  async validateCredentials(email: string, password: string) {
    try {
      const user = await this.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await user.comparePassword(oldPassword);
      if (!isValid) {
        throw new Error("Current password is incorrect");
      }

      user.password = newPassword;
      await user.save();
      return true;
    } catch (error) {
      throw error;
    }
  },

  async updateSessionToken(id: string, sessionToken: string) {
    try {
      await this.findByIdAndUpdate(id, {
        $set: { sessionToken },
      });
    } catch (error) {
      throw error;
    }
  },

  async getAllUsers(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const total = await this.countDocuments();
      const users = await this.find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      return {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  },

  async searchUsers(query: string) {
    try {
      return await this.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { nickname: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } catch (error) {
      throw error;
    }
  },
};

export const UserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);

export const Otps = mongoose.model<OTP>("otps", otpSchema);
