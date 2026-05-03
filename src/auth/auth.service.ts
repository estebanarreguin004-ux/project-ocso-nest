import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    private jwtService: JwtService
  ) {}


  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id
    })
    employeeToUpdate.user = user;
    return this.employeeRepository.save(employeeToUpdate)
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const manager = await this.managerRepository.preload({
      managerId: id
    })
    manager.user = user;
    return this.managerRepository.save(manager)
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    })
    if(!user) throw new UnauthorizedException();
    const match = await bcrypt.compare( loginUserDto.userPassword, user.userPassword);
    if(!match) throw new UnauthorizedException();
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    }
    const token = this.jwtService.sign(payload);
    return token;
  }

  async updateUser(userEmail: string, updateUserDto: CreateUserDto) {
    const newUserData = await this.userRepository.preload({ 
      ...updateUserDto,
      userEmail
    });
    if (!newUserData) {
      throw new UnauthorizedException();
    }
    this.userRepository.save(newUserData);
    return newUserData;
  }


}
