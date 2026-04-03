import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.remove(user);
  }

  findTeachers() {
    return this.userRepo.find({ where: { role: Role.TEACHER } });
  }

  findStudents() {
    return this.userRepo.find({ where: { role: Role.STUDENT } });
  }
}
