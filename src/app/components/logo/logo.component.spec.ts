import { TestBed, async } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { AppModule } from 'src/app/app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();
  }));

  it('should create the logo component', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
