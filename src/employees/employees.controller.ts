import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/Constants/roles.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { AwsService } from 'src/aws/aws.service';
 
//@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService, 
    private readonly awsService: AwsService
  ) {}

  @Post("/:id/upload")
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const photoUrl = await this.awsService.uploadFile(file);
    return this.employeesService.update(id, {
    employeePhoto: photoUrl
  });
  }

  
  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: 'uuid',
      employeeName: 'John',
      employeeLastName: 'Doe',
      employeePhoneNumber: '12345678',
      employeeEmail: 'john@example.com',
    } as Employee
  })
  @Post()
  @UseInterceptors(FileInterceptor('employeePhoto'))
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @UploadedFile() file: Express.Multer.File) {
    if(!file){
      return this.employeesService.create(createEmployeeDto);
    } else {
      const photoUrl = await this.awsService.uploadFile(file)
      createEmployeeDto.employeePhoto = photoUrl
      return this.employeesService.create(createEmployeeDto);
    }

  }

  

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findByLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('employeePhoto'))
  async update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto,
        @UploadedFile() file: Express.Multer.File) {
      if(!file){ 
        delete updateEmployeeDto.employeePhoto;
        return this.employeesService.update(id, updateEmployeeDto);
      } else {
        const photoUrl = await this.awsService.uploadFile(file);
        updateEmployeeDto.employeePhoto = photoUrl;
        return this.employeesService.update(id, updateEmployeeDto);
      }  
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
