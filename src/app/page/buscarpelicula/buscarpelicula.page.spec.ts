import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscarpeliculaPage } from './buscarpelicula.page';

describe('BuscarpeliculaPage', () => {
  let component: BuscarpeliculaPage;
  let fixture: ComponentFixture<BuscarpeliculaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarpeliculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarpeliculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
