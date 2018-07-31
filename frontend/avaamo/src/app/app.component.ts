import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddEmpDialogComponent } from './dialog/AddEmpDialog';
import { AgileService } from './agile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public backlogs = [];
  public progress = [];
  public searchTerm = '';
  public allBoards = [];
    // {
    //   id: 22421,
    //   title: 'AVAAMO-15',
    //   'description': 'When you are familiar with these fundamental building blocks,'
    //   + 'you can explore them in more detail in the documentation',
    //   'status': 'in-progress',
    //   'Asiignee': 'John Doe',
    //   'Creator': 'Jhny Joker',
    //   'priority': 'Normal'
    // },
    // {
    //   id: 32431,
    //   title: 'AVAAMO-21',
    //   'description': 'By default, data/elements cannot be dropped in other elements. To allow a drop, we mus handling of the element.'
    //   + 'you can explore them in more detail in the documentation',
    //   'status': 'in-progress',
    //   'Asiignee': 'John Doe',
    //   'Creator': 'Jhny Joker',
    //   'priority': 'Normal'
    // }

  public done = [];
    // {
    //   id: 22491,
    //   title: 'AVAAMO-11154',
    //   'description': 'When you are familiar with these fundamental building blocks,'
    //   + 'you can explore them in more detail in the documentation',
    //   'status': 'completed',
    //   'Asiignee': 'John Doe',
    //   'Creator': 'Jhny Joker',
    //   'priority': 'Normal'
    // },


  constructor(
    private _api: AgileService,
    private dialog: MatDialog,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.done = [];
    this.backlogs = [];
    this.progress = [];
    
    this._api.getAllBoards().then( result => {

        console.log(result);

      (result.data).forEach(element => {
        const tmp_dict = {};

        tmp_dict['title'] = element.title;
        tmp_dict['description'] = element.description;
        tmp_dict['status'] = element.status;
        tmp_dict['asiignee'] = element.asiignee;
        tmp_dict['creator'] = element.creator;
        tmp_dict['priority'] = element.priority;
        tmp_dict['display'] = true;
        tmp_dict['id'] = element['_id']['$oid'];

        this.allBoards.push(tmp_dict);

        if (element.priority === 'backlog') {
          this.backlogs.push(tmp_dict);
        } else if (element.priority === 'in-progress') {
          this.progress.push(tmp_dict);
        }
      });

    });
  }

  searchBoards(term) {

      console.log(term)

      if ( term.length > 1) {
        for (const board of this.allBoards) {

          if (board.title.toUpperCase().indexOf(term.toUpperCase()) > -1) {
            board.display = true;
          }
           else {
            board.display = false;
          }
        }
      } else if (term.length === 0) {
        for (const board of this.allBoards) {
          board.display = true;
        }
      }
  }

  addBoard() {
    this.boardFormDialog({});
  }

  deleteBoard(id) {
    this._api.deleteBoard(id).then( resp => {
      console.log(resp);
        this.ngOnInit();
    });
  }

  allowDrop(event) {
    event.preventDefault();
  }

  onDragStart(event, item) {
      // console.log(event, item);
      const data = JSON.stringify(item);
      event.dataTransfer.setData('data', data);
  }

  onDragEnd(event, item) {
    for (let i = 0; i < this.backlogs.length; i++) {
      if (this.backlogs[i].id === item.id) {
        this.backlogs.splice(i, 1);
      }
    }
  }

  onDoneDragEnd(event, item) {
    for (let i = 0; i < this.backlogs.length; i++) {
      if (this.backlogs[i].id === item.id) {
        this.backlogs.splice(i, 1);
      }
    }

  }

  onDrop(ev) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('data'));
    // ev.target.appendChild(data);
    console.log(data);
    data['priority'] = 'in-progress';
    this.progress.push(data);
    this._api.editBoard(data, data['id'] ).then( result => {
        console.log(result);
    });

    console.log(this.progress);
  }

  onDropDone(ev) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('data'));
    // ev.target.appendChild(data);
    console.log(data);
    this.done.push(data);
    console.log(this.done);
  }

  openStateDialog(item) {
    this.boardFormDialog(item);
  }

  // editEmp(emp) {
  //   this.empFormDialog(emp);
  // }

  boardFormDialog(data) {
    const dialogRef = this.dialog.open(AddEmpDialogComponent, {
      data,
       width: '600px',
    });
  }

}