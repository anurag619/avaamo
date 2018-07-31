
import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { AgileService } from './../agile.service';




@Component({
selector: 'app-addempdialog',
templateUrl: './addEmpdialog.component.html',
styleUrls: ['./addEmpdialog.component.scss']
})

export class AddEmpDialogComponent implements OnInit {

    public all_keys = [];
    public board = {
        title: '',
        description: '',
        status: '',
        asiignee: '',
        creator: '',
        priority: ''
    };
    constructor(
        private _api: AgileService,
        private router: Router,
        private dialogRef: MatDialogRef<AddEmpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogInfo: any,
      ) {}

    ngOnInit() {
        console.log(this.dialogInfo);
        // this.all_keys = Object.keys(this.dialogInfo);
        this.board = this.dialogInfo;
    }

    saveBoard(info) {
        console.log(info);
        const queryParams = {
            title: info.value.title,
            description: info.value.description || '',
            status: info.value.status || '',
            asiignee: info.value.asiignee || '',
            creator: info.value.creator,
            priority: info.value.priority
        };

        if (this.board['id']) {
            console.log(info.value);

            // this._api.editBoard(queryParams, this.board['id'] ).then( result => {
            //     console.log(result);

            // });

        } else {

            this._api.saveBoard(queryParams).then( result => {
                console.log(result);
                this.router.navigate(['/']).then(() => {
                    this.ngOnInit();
                });

            });
        }
        this.dialogRef.close();
    }

}





