import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronicleEditComponent } from './chronicle-edit.component';

describe('ChronicleEditComponent', () => {
  let component: ChronicleEditComponent;
  let fixture: ComponentFixture<ChronicleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronicleEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronicleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
