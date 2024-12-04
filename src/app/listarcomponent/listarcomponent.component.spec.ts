import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarcomponentComponent } from './listarcomponent.component';

describe('ListarcomponentComponent', () => {
  let component: ListarcomponentComponent;
  let fixture: ComponentFixture<ListarcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
