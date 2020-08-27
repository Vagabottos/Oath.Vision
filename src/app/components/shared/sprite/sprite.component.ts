import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { get } from 'lodash';

import * as edifice from '../../../../assets/spritesheet/+edifice.json';
import * as relic from '../../../../assets/spritesheet/+relic.json';
import * as site from '../../../../assets/spritesheet/+site.json';
import * as world from '../../../../assets/spritesheet/+world.json';

const sheetTypes: any = {
  edifice: (edifice as any).default || edifice,
  relic:   (relic as any).default || relic,
  site:    (site as any).default || site,
  world:   (world as any).default || world
};

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpriteComponent implements OnInit {

  get shouldShowBack() {
    return this.showBack && this.type !== 'edifice';
  }

  get sheetUrl() {
    if (this.shouldShowBack) { return `assets/cardback/${this.type}.png`; }
    return `assets/spritesheet/+${this.type}.png`;
  }

  get spriteSheet() {
    return sheetTypes[this.type];
  }

  get imageName() {
    return this.name;
  }

  @Input()
  public name: string;

  @Input()
  public scaleX: number;

  @Input()
  public scaleY: number;

  @Input()
  public forceWidth: number;

  @Input()
  public forceHeight: number;

  @Input()
  public type: 'edifice'|'relic'|'site'|'world';

  @Input()
  public showBack: boolean;

  @Input()
  @HostBinding('class.inline-display')
  public inline: boolean;

  public get scale() {
    let scaleX = this.scaleX;
    let scaleY = this.scaleY;

    if (this.forceWidth) {
      scaleX = 1 * (this.forceWidth / this.widthNumber);
    }

    if (this.forceHeight) {
      scaleY = 1 * (this.forceHeight / this.heightNumber);
    }

    return `scale(${scaleX}, ${scaleY})`;
  }

  @HostBinding('style.max-width')
  @HostBinding('style.min-width')
  get width() {
    if (this.forceWidth) { return this.forceWidth + 'px'; }
    return (this.widthNumber * this.scaleX) + 'px';
  }

  get innerWidth() {
    return this.widthNumber + 'px';
  }

  private get widthNumber(): number {
    return get(this.spriteSheet.frames, [`${this.imageName}.png`, 'frame', 'w'], 0);
  }

  @HostBinding('style.max-height')
  @HostBinding('style.min-height')
  get height() {
    if (this.forceHeight) { return this.forceHeight + 'px'; }
    return (this.heightNumber * this.scaleY) + 'px';
  }

  get innerHeight() {
    return this.heightNumber + 'px';
  }

  private get heightNumber(): number {
    return get(this.spriteSheet.frames, [`${this.imageName}.png`, 'frame', 'h'], 0);
  }

  get coordinates() {
    if (this.shouldShowBack) { return '0px 0px'; }
    // style.object-position
    const spriteRef = this.spriteSheet.frames[this.imageName + '.png'];
    if (!spriteRef) { return '0px 0px'; }

    return `-${spriteRef.frame.x}px -${spriteRef.frame.y}px`;
  }

  ngOnInit() {
  }

}
