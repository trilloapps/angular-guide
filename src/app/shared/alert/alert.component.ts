import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translate(100%,0%)'}),
        animate('300ms ease-in', style({transform: 'translate(0%,0%)'}))
      ]),
      transition(':leave', [
        animate('1s ease-in', style({transform: 'translate(0%,0%)'}))
      ])
    ])
  ]
})
export class AlertComponent {
  @Input() resMessage;
}
