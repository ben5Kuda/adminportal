import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturedetailsComponent } from './fixturedetails.component';

describe('FixturedetailsComponent', () => {
  let component: FixturedetailsComponent;
  let fixture: ComponentFixture<FixturedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
