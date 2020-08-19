import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavLinksComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
