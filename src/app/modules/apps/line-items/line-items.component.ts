import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Items {
  image: string;
  name: string;
  description: string;
  code: string;
  weight: string;
  quantity: string;
}
@Component({
  selector: 'app-line-items',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss']
})
export class LineItemsComponent {

  items : Items[] = [
    {image:'https://currenwatches.com.pk/cdn/shop/products/wefew.jpg?v=1699506412', name:'Watch', description:'A watch is a timekeeping device typically worn on the wrist',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://i.insider.com/5bb239558cec63a8528b456a?width=1000&format=jpeg&auto=webp', name:'Mobile Stand', description:'Phone stand or holder, is a device designed to securely hold and display mobile phones',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://img.buzzfeed.com/buzzfeed-static/static/2019-10/13/19/asset/af762d042c03/sub-buzz-4272-1570995140-4.jpg', name:'Bottle Opener', description:'A bottle opener is a simple yet essential tool designed to remove metal caps or lids from bottles',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://img.buzzfeed.com/buzzfeed-static/static/2019-10/13/20/asset/622518a5553a/sub-buzz-8606-1570996986-1.jpg?downsize=900:*&output-format=auto&output-quality=auto', name:'Kitchen Brush', description:' kitchen brush is a versatile cleaning tool designed specifically for use in the kitchen. ',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://dmdailydeals.com/cdn/shop/files/S7689ac8351254dedb584f386073ad8b13.webp?v=1701630030&width=533', name:'Clothes Hanger', description:'A clothes hanger, also simply known as a hanger, is a device used to hang and organize clothing',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://images-na.ssl-images-amazon.com/images/I/61Q5isxviYL.jpg', name:'Dustbin', description:'Dustbin, also commonly known as a trash can or garbage bin',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://www.familyhandyman.com/wp-content/uploads/2021/08/GettyImages-679968229-e1630349408564.jpg?fit=700%2C700', name:'Brush Cup', description:'A brush cup, often known as a makeup brush holder or organizer',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkozEd70rt6cB4xT2FpGHMy36QQtw9V7Z73HToG2IYIkIXSP_Jsf-FCIaJqMgNgvcrWAw&usqp=CAU', name:'Sugar Pot', description:'A sugar pot, also known as a sugar bowl, is a container specifically designed for storing and serving sugar',  code:'fd-45486', weight:'50g', quantity:'3'},
    {image:'https://bestlifeonline.com/wp-content/uploads/sites/3/2018/02/Razor.jpg?quality=82&strip=all', name:'Safety Razor', description:'A safety razor is a type of razor designed for shaving facial or body hair.',  code:'fd-45486', weight:'50g', quantity:'3'},
  ]
  searchInput: any;
  temp: Items[]=[...this.items];

  constructor(private router : Router){}
  searchFilter(event: any) {
    this.searchInput=event.target.value
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.items = temp;

  }

  navigateToDetails(incommingItem:any)
  {
    this.router.navigateByUrl('/app/item-details')
  }
}
