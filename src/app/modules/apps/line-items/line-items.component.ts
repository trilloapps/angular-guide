import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface Items {
  picture: string;
  itemName: string;
  itemDescription: string;
  itemCode: string;
  weight: string;
  quantity: string;
}
@Component({
  selector: 'app-line-items',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss']
})
export class LineItemsComponent implements OnInit {

  items : Items[] = []
  searchInput: any;
  size = 10
  start = 1;
  page = 1; 
  pageSize = 10;
  totalSize : any;
  temp: Items[]=[...this.items];
  customerId: any;
  orderId: any;
  filesToUpload: any;
  filename: string;
  file: any;
  uploadImage: boolean;
  userProfileImage: string;
  constructor(private dataService: DataService, private route: ActivatedRoute,private router :Router, private DataService : DataService ) { }
  ngOnInit(): void {
    this.orderId = this.route.snapshot.queryParams['orderId'];
    this.customerId = this.route.snapshot.queryParams['customerId'];
     if(this.orderId) this.GetItemLists(this.start, this.size, this.orderId);
  }
  GetItemLists(start: number, size: number, orderId: string) {
    let body = {
      orderId: orderId,
      start: 1,
      size: 20000,
    }
    this.dataService.GetItemList(body).subscribe({
      next: (result: any) => {
        console.log("error")
        if (result.status === "success") {
          this.items = result.data.items;
          this.totalSize = result.data.totalData
          this.temp = [...this.items]
        }

    },
    error: (error) => {
      console.error(" ERROR ==> ", error);
    },
    complete: () => { },
    }
  )
  }
  // constructor(private router : Router){}
  searchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.itemName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.items = temp;

  }
  navigateToDetails(item)
  {
    this.router.navigate(['/app/item-details'],  {
      queryParams: { itemId: item.id, customerId: this.customerId, orderId: this.orderId},
    });
  }
  backToOrders()
  {
    this.router.navigate(['/app/orders'],  {
      queryParams: { customerId: this.customerId },
    });
  }
  getPaginationFromServer(oIncomingEvent: any) {
    let incommingPage = oIncomingEvent;
    let start = (incommingPage - 1) * this.size + 1;
    this.GetItemLists(start, this.size, this.customerId);
  
  }
















  // temprary code


  onFileSelect(event) {    
    const selectedFiles: FileList = event.target.files as FileList;
    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = Array.from(selectedFiles).filter(
      (file) => !validFileTypes.includes(file.type)
    );
    this.filesToUpload = event.target.files;
    this.uploadFiles();
    this.filename = "";
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.filename = this.file.name;
      console.log('File Name', this.filename);

    }
  }
  uploadFiles() {
    let functionParam = {
      itemId: this.orderId
    }
    this.uploadImage = true;
    console.log(this.filesToUpload);
    for (const file of this.filesToUpload) {
      const formData: FormData = new FormData();
      formData.append("file", file);
      formData.append("folder", "public/images");
      formData.append("makePublic", 'true');
      formData.append("functionName", "AddItemImage");
      formData.append("functionParam", JSON.stringify(functionParam));
      this.DataService.ProfileFileUpload(formData).subscribe({
        next: (response) => {
          this.userProfileImage= "https://storage.googleapis.com/" + response.bucketName + "/" + response.folderName + "/" + response.fileName;
          
        },
        error: (error) => {
          console.error(error)
          console.error(error);
        },
        complete: () => { },
      });
    }
  }


}
