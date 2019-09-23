import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task/task';

@Pipe({
  name: 'sortviewtask'
})
export class SortviewtaskPipe implements PipeTransform {

  transform(value: Task[], sortBy?: string): any {
    console.log(value);
    console.log(sortBy);
      if (sortBy.includes('StartDate')) {
        console.log("inside start date");
        value.sort((a: Task, b: Task) => {
          return +new Date(a.startDate) - +new Date(b.startDate);
        });
      }

      if (sortBy.includes('EndDate')) {
        console.log("inside end date");
        value.sort((a: Task, b: Task) => {
          return +new Date(a.endDate) - +new Date(b.endDate);
        });
      }

      if (sortBy.includes('Priority')) {
        console.log("inside priority");
        value.sort((a: Task, b: Task) => {
          return a.priority - b.priority;
        });
      }

      /* if (sortBy.indexOf('Completed')) {
        value.sort((a: Task, b: Task) => {
          return a.status.toLocaleLowerCase().localeCompare(b.status.toLocaleLowerCase());
        }); 
      }*/

      console.log(value);

      return value;



  }

}
