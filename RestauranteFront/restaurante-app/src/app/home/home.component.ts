import { HomeService } from './home.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
     private route: ActivatedRoute,
     private homeService: HomeService) { }

  ngOnInit(): void {


  }
  
}
