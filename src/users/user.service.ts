import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      return existingUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
