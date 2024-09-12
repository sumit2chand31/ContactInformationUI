import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../_module/Material.Module';
import { CotactService } from '../../../../_services/cotact.service';
import { IContact } from '../../../../_model/ConatctVm';
import{MatDialog} from"@angular/material/dialog";
import { AddContactComponent } from '../add-contact/add-contact.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoderService } from '../../../../_services/loder.service';


@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css',
  providers:[CotactService]
})
export class ListContactComponent implements OnInit {


  displayedColums:string[]=["id","firstName","lastName", "email","edit","delete"]
  conatactlist!: IContact[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  displayedColumns = [];
  constructor(private _cotactService :CotactService,private dialog:MatDialog, private _loder:LoderService){

  }


  ngOnInit(): void {
    this.getContactInfo();

  }

  getContactInfo(){
    this._loder.setLoading(true);
    this._cotactService.getALL("Conatct/GetContact").subscribe((conatct) => {
      if (conatct.status) {
        this.conatactlist = conatct.result;
        this.datasource = new MatTableDataSource<IContact>(this.conatactlist);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        this._loder.setLoading(false);
      }
    });
  }

  AddContect(){
    this.openPopup(0,'Create Contact');
  }

  openPopup(code:number, title:string){

    this.dialog.open(AddContactComponent,{
      width:'50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code:code,
        title:title
      }
    }).afterClosed().subscribe(result=>{
      this.getContactInfo();
    });

  }

  FunctionEdit(code:number){
    this.openPopup(code, 'Update Conatct');
  }

  FunctionDelete(code:number){
    if(confirm('do you want to remove?')){
      this._cotactService.Delete("Conatct/DeleteContact/"+code).subscribe((conatct) => {
        if (conatct.status) {
          this.getContactInfo();
        }
        });
    }
  }

  searchconatct(data: any){
   let searchText= data.toLowerCase();
   let result =this.conatactlist.filter(x=>x.firstName.toLowerCase() == searchText
    || x.lastName.toLowerCase() == searchText || x.email.toLowerCase() == searchText);
   this.datasource = new MatTableDataSource<IContact>(result);
   this.datasource.paginator = this.paginator;
   this.datasource.sort = this.sort;

  }
}
