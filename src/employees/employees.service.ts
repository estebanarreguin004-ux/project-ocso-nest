import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EmployeesService {

  private employees: CreateEmployeeDto[] =[{
      id: uuid(),
      name: "Alberto",
      lastName: "Costas",
      phoneNumber: "123456789", 
    },
    {
      id: uuid(),
      name: "José",
      lastName: "Pérez",
      phoneNumber: "987654321"
    }]

  
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id);
    if(!employee) throw new NotFoundException(); 
    return employee[0];
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    return {
      ...employeeToUpdate, 
      ...updateEmployeeDto
    };
  }

  remove(id: string) {
    const employeeFound = this.findOne(id);
    this.employees = this.employees.filter(employee => employee.id !== id);
    return this.employees;
  }
}
