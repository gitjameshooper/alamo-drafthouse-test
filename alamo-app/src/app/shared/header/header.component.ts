import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, state } from '@angular/animations';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('open', style({
        height: '190px'
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open => closed', [
        animate('300ms ease-out')
      ]),
      transition('closed => open', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
	public showMenu: boolean = false;
	public pageName: string;
	private elem = document.querySelector('body').addEventListener("click", (e)=> { this.closeMenu(e)}, true);
	constructor(private router: Router ) {

		switch (this.router.url) {
			case "/":
				this.pageName = 'Home';
				break;
			case "/playbook":
				this.pageName = 'Playbook';
				break;
			case "/analytics":
				this.pageName = 'Analytics';
				break;
			case "/discovery":
				this.pageName = 'Discovery';
				break;
			case "/day-scanner":
				this.pageName = 'Day Scan';
				break;
			case "/night-scanner":
				this.pageName = 'Night Scan';
				break;
			case "/auto-trading":
				this.pageName = 'Auto Scan';
				break;
			default:
				this.pageName = 'Home';
				break;
		}
	}
	private closeMenu(e){
		if(!e.srcElement.classList.value.includes('hamburger')){
			this.showMenu = false;
		}
	}
}
