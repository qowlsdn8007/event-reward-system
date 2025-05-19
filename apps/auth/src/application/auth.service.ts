// src/auth/infrastructure/services/local-auth.service.ts
import { Injectable } from '@nestjs/common'
import {
  EditRoleRequest,
  IAuthService,
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
} from './auth.service.interface'
import { Role, User } from '../domain/user'
import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUserRepository } from '../domain/user.repository.interface'
import { GenerateIdFactory } from '../generate-id.factory'

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly generateIdFactory: GenerateIdFactory,
  ) {}

  async login(req: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepo.findByUsername(req.username)
    if (!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(req.password, user.password)
    if (!isMatch) throw new Error('Invalid password')
    const payload = {
      username: user.username,
      userId: user.id,
      role: user.role,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(req: RegisterUserRequest): Promise<User> {
    const user = await this.userRepo.findByUsername(req.username)
    if (user) throw new Error('User already exists')
    const hashedPassword = await bcrypt.hash(req.password, 10)
    const newUser = await User.create(
      {
        username: req.username,
        password: hashedPassword,
        role: req.role as Role,
      },
      this.generateIdFactory,
    )

    const savedUser = await this.userRepo.saveUser(newUser)
    return savedUser
  }

  async editRole(req: EditRoleRequest): Promise<User> {
    const user = await this.userRepo.findById(req.userId)

    if (!user) throw new Error('User not found')

    user.updateRole(req.role as Role)
    const updatedUser = await this.userRepo.saveUser(user)
    return updatedUser
  }
}
