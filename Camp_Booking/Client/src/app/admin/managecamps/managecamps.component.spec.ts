import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampsComponent } from './managecamps.component';

describe('ManagecampsComponent', () => {
  let component: ManagecampsComponent;
  let fixture: ComponentFixture<ManagecampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecampsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagecampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
